'use client';

import { useState, useRef, useEffect } from 'react';

// Sample suggestions based on context
const smartSuggestions = [
    { id: 1, icon: '📅', text: 'Show today\'s appointments', category: 'Appointments' },
    { id: 2, icon: '🔧', text: 'List pending job cards', category: 'Job Cards' },
    { id: 3, icon: '📦', text: 'Check low stock items', category: 'Inventory' },
    { id: 4, icon: '💰', text: 'Show monthly revenue', category: 'Finance' },
    { id: 5, icon: '📊', text: 'How is the business performing?', category: 'Reports' },
];

export default function JessiAIPage() {
    const [messages, setMessages] = useState([
        { id: 1, type: 'bot', text: 'Hello! I\'m JESSI. I have access to your live workshop data. How can I assist you today?', time: 'Just now' }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [activeTab, setActiveTab] = useState('chat');
    const [liveData, setLiveData] = useState({
        appointments: [],
        jobCards: [],
        inventory: null,
        finance: null,
        isLoading: true
    });
    const messagesEndRef = useRef(null);

    // Configuration State
    const [config, setConfig] = useState({
        aiProvider: 'builtin',
        openaiApiKey: '',
        geminiApiKey: '',
        assistantName: 'JESSI',
        personality: 'professional',
        language: 'en',
        autoGreet: true,
        voiceEnabled: false,
        notifyOnInsights: true,
        enabledModules: {
            appointments: true,
            jobCards: true,
            inventory: true,
            finance: true,
            customers: true,
            billing: true
        },
        customPrompt: 'You are JESSI, an AI assistant for S2 Motorz workshop. Help users with their queries about appointments, job cards, inventory, and business insights.',
        maxTokens: 500,
        temperature: 0.7
    });
    const [showSaveSuccess, setShowSaveSuccess] = useState(false);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        fetchLiveData();
        loadConfig();
    }, []);

    const loadConfig = () => {
        const saved = localStorage.getItem('jessiConfig');
        if (saved) {
            try {
                setConfig(JSON.parse(saved));
            } catch (e) {
                console.error('Error loading config:', e);
            }
        }
    };

    const saveConfig = () => {
        localStorage.setItem('jessiConfig', JSON.stringify(config));
        setShowSaveSuccess(true);
        setTimeout(() => setShowSaveSuccess(false), 2000);
    };

    const fetchLiveData = async () => {
        try {
            const [appRes, jcRes, invRes, finRes] = await Promise.all([
                fetch('/api/appointments'),
                fetch('/api/job-cards'),
                fetch('/api/inventory/summary'),
                fetch('/api/finance/summary')
            ]);

            setLiveData({
                appointments: await appRes.json(),
                jobCards: await jcRes.json(),
                inventory: await invRes.json(),
                finance: await finRes.json(),
                isLoading: false
            });
        } catch (error) {
            console.error('Error fetching live data for JESSI:', error);
            setLiveData(prev => ({ ...prev, isLoading: false }));
        }
    };

    const generateBotResponse = (input) => {
        const lowerInput = input.toLowerCase();
        const { appointments, jobCards, inventory, finance } = liveData;

        // Appointments query
        if (lowerInput.includes('appointment') || lowerInput.includes('schedule')) {
            const today = new Date().toISOString().split('T')[0];
            const todayApps = appointments.filter(a => a.date?.startsWith(today));
            if (todayApps.length === 0) return "You have no appointments scheduled for today.";
            return `You have ${todayApps.length} appointments today:\n\n` +
                todayApps.map((a, i) => `${i + 1}. ${new Date(a.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${a.customerId?.name || 'Walk-in'} (${a.vehicleId?.model || 'Vehicle'})`).join('\n') +
                "\n\nWould you like me to notify the customers?";
        }

        // Job Cards query
        if (lowerInput.includes('job') || lowerInput.includes('service')) {
            const active = jobCards.filter(jc => !['completed', 'delivered'].includes(jc.status)).length;
            const completed = jobCards.filter(jc => jc.status === 'completed').length;
            return `Current status of your workshop floor:\n\n📊 Active Jobs: ${active}\n✅ Completed (Pending Delivery): ${completed}\n\nTop Priority: ${jobCards[0]?.jobCardNo || 'N/A'} for ${jobCards[0]?.customerId?.name || 'Customer'}.`;
        }

        // Inventory query
        if (lowerInput.includes('stock') || lowerInput.includes('inventory') || lowerInput.includes('parts')) {
            if (!inventory || inventory.lowStockParts === 0) return "Your stock levels look healthy! No critical low stock alerts.";
            return `Inventory Alert!\n\n⚠️ Low Stock Items: ${inventory.lowStockParts}\n📦 Total Parts: ${inventory.totalParts}\n💰 Total Valuation: ₹${inventory.totalStockValue?.toLocaleString()}\n\nShould I prepare a purchase order for the low stock items?`;
        }

        // Finance query
        if (lowerInput.includes('revenue') || lowerInput.includes('finance') || lowerInput.includes('money') || lowerInput.includes('sales')) {
            if (!finance) return "I'm still calculating your financial summary. Please check back in a moment.";
            return `Monthly Performance Update:\n\n💰 Total Revenue: ₹${finance.totalRevenue?.toLocaleString()}\n📉 Total Expenses: ₹${finance.totalExpenses?.toLocaleString()}\n📈 Net Profit: ₹${finance.netProfit?.toLocaleString()}\n\nYour revenue is ${finance.profitMargin > 20 ? 'looking strong!' : 'stable.'}`;
        }

        if (lowerInput.includes('help')) {
            return "I can help you monitor your workshop in real-time. Try asking:\n- 'Show my appointments'\n- 'How many active job cards?'\n- 'Any low stock?'\n- 'What's my monthly revenue?'";
        }

        return "I understand your query. Based on your live data, I can provide specific insights on stock, appointments, or finance. What would you like to see details for?";
    };

    const handleSend = () => {
        if (!inputValue.trim()) return;

        const userMessage = { id: Date.now(), type: 'user', text: inputValue, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsTyping(true);

        setTimeout(() => {
            const botMessage = {
                id: Date.now() + 1,
                type: 'bot',
                text: generateBotResponse(inputValue),
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessages(prev => [...prev, botMessage]);
            setIsTyping(false);
        }, 1000);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const getInsights = () => {
        const insights = [];
        if (liveData.inventory?.lowStockParts > 0) {
            insights.push({ id: 1, type: 'alert', icon: '⚠️', title: 'Low Stock Alert', message: `${liveData.inventory.lowStockParts} items are below minimum levels.`, action: 'Order Parts', priority: 'high' });
        }
        if (liveData.finance?.totalExpenses > liveData.finance?.totalRevenue * 0.5) {
            insights.push({ id: 2, type: 'alert', icon: '🔔', title: 'High Expenses', message: 'Operating costs are over 50% of revenue this month.', action: 'Review Expenses', priority: 'medium' });
        }
        if (liveData.appointments.length > 10) {
            insights.push({ id: 3, type: 'opportunity', icon: '📈', title: 'High Demand', message: 'Appointment volume is high. Consider adding a shift.', action: 'View Schedule', priority: 'low' });
        }

        if (insights.length === 0) {
            insights.push({ id: 0, type: 'info', icon: '✨', title: 'All Clear', message: 'Your business metrics are currently optimal.', action: 'View Dashboard', priority: 'low' });
        }
        return insights;
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'high': return { bg: 'rgba(244, 67, 54, 0.1)', border: '#F44336', text: '#D32F2F' };
            case 'medium': return { bg: 'rgba(255, 152, 0, 0.1)', border: '#FF9800', text: '#F57C00' };
            case 'low': return { bg: 'rgba(76, 175, 80, 0.1)', border: '#4CAF50', text: '#388E3C' };
            default: return { bg: 'var(--color-gray-100)', border: 'var(--color-gray-200)', text: 'var(--text-primary)' };
        }
    };

    return (
        <div>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-xl)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
                    <div style={{
                        width: '50px', height: '50px', borderRadius: '50%',
                        background: 'linear-gradient(135deg, #00B8D4, #E30613)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem',
                        boxShadow: '0 4px 20px rgba(0, 184, 212, 0.3)',
                    }}>🤖</div>
                    <div>
                        <h1 style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: '4px', background: 'linear-gradient(135deg, #00B8D4, #E30613)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{config.assistantName} AI</h1>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Real-time Workshop Intelligence</p>
                    </div>
                </div>
                <div style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
                    <span style={{ padding: '6px 12px', background: liveData.isLoading ? 'var(--color-gray-200)' : 'rgba(76, 175, 80, 0.1)', color: liveData.isLoading ? 'var(--text-muted)' : '#4CAF50', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 500 }}>
                        ● {liveData.isLoading ? 'Syncing...' : 'Connected'}
                    </span>
                    <span style={{ padding: '6px 12px', background: config.aiProvider === 'builtin' ? 'rgba(33, 150, 243, 0.1)' : 'rgba(76, 175, 80, 0.1)', color: config.aiProvider === 'builtin' ? '#2196F3' : '#4CAF50', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 500 }}>
                        {config.aiProvider === 'builtin' ? '🧠 Built-in AI' : config.aiProvider === 'openai' ? '🤖 OpenAI' : '✨ Gemini'}
                    </span>
                </div>
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: 'var(--spacing-sm)', marginBottom: 'var(--spacing-lg)', background: 'white', padding: '6px', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', width: 'fit-content' }}>
                {[{ id: 'chat', label: '💬 Chat' }, { id: 'insights', label: '💡 Insights' }, { id: 'config', label: '⚙️ Configuration' }].map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        style={{
                            padding: '10px 20px', border: 'none', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontWeight: 500, fontSize: '0.9rem',
                            background: activeTab === tab.id ? 'linear-gradient(135deg, #00B8D4, #0097A7)' : 'transparent',
                            color: activeTab === tab.id ? 'white' : 'var(--text-secondary)',
                            transition: 'all 0.2s ease',
                        }}
                    >{tab.label}</button>
                ))}
            </div>

            {/* Main Content */}
            <div style={{ display: 'grid', gridTemplateColumns: activeTab === 'chat' ? '1fr 320px' : '1fr', gap: 'var(--spacing-lg)' }}>
                {activeTab === 'chat' && (
                    <>
                        <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', display: 'flex', flexDirection: 'column', height: '550px' }}>
                            <div style={{ flex: 1, overflowY: 'auto', padding: 'var(--spacing-lg)' }}>
                                {messages.map((msg) => (
                                    <div key={msg.id} style={{ display: 'flex', justifyContent: msg.type === 'user' ? 'flex-end' : 'flex-start', marginBottom: 'var(--spacing-md)' }}>
                                        <div style={{
                                            maxWidth: '70%', padding: 'var(--spacing-md)',
                                            borderRadius: msg.type === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                                            background: msg.type === 'user' ? 'linear-gradient(135deg, #00B8D4, #0097A7)' : 'var(--color-gray-100)',
                                            color: msg.type === 'user' ? 'white' : 'var(--text-primary)',
                                        }}>
                                            <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: 1.5, whiteSpace: 'pre-line' }}>{msg.text}</p>
                                            <span style={{ fontSize: '0.7rem', opacity: 0.7, marginTop: '4px', display: 'block' }}>{msg.time}</span>
                                        </div>
                                    </div>
                                ))}
                                {isTyping && <div style={{ padding: 'var(--spacing-md)', fontSize: '0.8rem', color: 'var(--text-muted)' }}>{config.assistantName} is thinking...</div>}
                                <div ref={messagesEndRef} />
                            </div>

                            <div style={{ padding: 'var(--spacing-md)', borderTop: '1px solid var(--color-gray-200)' }}>
                                <div style={{ display: 'flex', gap: 'var(--spacing-sm)', alignItems: 'flex-end' }}>
                                    <textarea
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        onKeyPress={handleKeyPress}
                                        placeholder="Ask about stock, appointments, or finance..."
                                        rows={1}
                                        style={{ flex: 1, padding: '12px 16px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-gray-200)', resize: 'none', fontSize: '0.9rem' }}
                                    />
                                    <button onClick={handleSend} disabled={!inputValue.trim()} style={{
                                        width: '48px', height: '48px', borderRadius: '50%', border: 'none',
                                        background: inputValue.trim() ? 'linear-gradient(135deg, #00B8D4, #0097A7)' : 'var(--color-gray-200)',
                                        color: 'white', cursor: 'pointer', fontSize: '1.2rem'
                                    }}>➤</button>
                                </div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
                            <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', padding: 'var(--spacing-lg)', boxShadow: 'var(--shadow-sm)' }}>
                                <h3 style={{ margin: '0 0 var(--spacing-md) 0', fontSize: '1rem', fontWeight: 600 }}>💡 Suggestions</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xs)' }}>
                                    {smartSuggestions.map((suggestion) => (
                                        <button key={suggestion.id} onClick={() => { setInputValue(suggestion.text); }} style={{
                                            display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)', padding: '10px 12px', background: 'var(--color-gray-100)',
                                            border: 'none', borderRadius: 'var(--radius-md)', cursor: 'pointer', textAlign: 'left', fontSize: '0.85rem'
                                        }}>
                                            <span>{suggestion.icon}</span>
                                            <span>{suggestion.text}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {activeTab === 'insights' && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: 'var(--spacing-lg)' }}>
                        {getInsights().map((insight) => {
                            const colors = getPriorityColor(insight.priority);
                            return (
                                <div key={insight.id} style={{
                                    background: 'white', borderRadius: 'var(--radius-lg)', padding: 'var(--spacing-lg)', boxShadow: 'var(--shadow-sm)', borderLeft: `4px solid ${colors.border}`,
                                }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--spacing-md)' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
                                            <span style={{ fontSize: '1.5rem' }}>{insight.icon}</span>
                                            <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 600 }}>{insight.title}</h4>
                                        </div>
                                        <span style={{ padding: '4px 10px', borderRadius: '12px', fontSize: '0.7rem', fontWeight: 600, background: colors.bg, color: colors.text }}>{insight.priority}</span>
                                    </div>
                                    <p style={{ margin: '0 0 var(--spacing-md) 0', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{insight.message}</p>
                                    <button style={{ padding: '8px 16px', background: colors.bg, border: `1px solid ${colors.border}`, borderRadius: 'var(--radius-md)', color: colors.text, cursor: 'pointer', fontWeight: 500, fontSize: '0.85rem' }}>{insight.action}</button>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Configuration Tab */}
                {activeTab === 'config' && (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                        {/* AI Provider Settings */}
                        <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', padding: '24px', boxShadow: 'var(--shadow-sm)' }}>
                            <h3 style={{ margin: '0 0 20px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>🤖 AI Provider</h3>

                            <div style={{ marginBottom: '16px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.9rem' }}>Select AI Engine</label>
                                <select value={config.aiProvider} onChange={(e) => setConfig({ ...config, aiProvider: e.target.value })} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}>
                                    <option value="builtin">🧠 Built-in (Rule-based)</option>
                                    <option value="openai">🤖 OpenAI GPT-4</option>
                                    <option value="gemini">✨ Google Gemini</option>
                                </select>
                            </div>

                            {config.aiProvider === 'openai' && (
                                <div style={{ marginBottom: '16px' }}>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.9rem' }}>OpenAI API Key</label>
                                    <input type="password" value={config.openaiApiKey} onChange={(e) => setConfig({ ...config, openaiApiKey: e.target.value })} placeholder="sk-..." style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd', fontFamily: 'monospace' }} />
                                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>Get your API key from platform.openai.com</p>
                                </div>
                            )}

                            {config.aiProvider === 'gemini' && (
                                <div style={{ marginBottom: '16px' }}>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.9rem' }}>Google Gemini API Key</label>
                                    <input type="password" value={config.geminiApiKey} onChange={(e) => setConfig({ ...config, geminiApiKey: e.target.value })} placeholder="AIza..." style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd', fontFamily: 'monospace' }} />
                                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>Get your API key from aistudio.google.com</p>
                                </div>
                            )}

                            {config.aiProvider !== 'builtin' && (
                                <>
                                    <div style={{ marginBottom: '16px' }}>
                                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.9rem' }}>Max Response Tokens</label>
                                        <input type="number" value={config.maxTokens} onChange={(e) => setConfig({ ...config, maxTokens: parseInt(e.target.value) })} min={100} max={2000} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }} />
                                    </div>

                                    <div style={{ marginBottom: '16px' }}>
                                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.9rem' }}>Temperature (Creativity): {config.temperature}</label>
                                        <input type="range" value={config.temperature} onChange={(e) => setConfig({ ...config, temperature: parseFloat(e.target.value) })} min={0} max={1} step={0.1} style={{ width: '100%' }} />
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                            <span>Precise</span><span>Creative</span>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Assistant Settings */}
                        <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', padding: '24px', boxShadow: 'var(--shadow-sm)' }}>
                            <h3 style={{ margin: '0 0 20px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>👤 Assistant Settings</h3>

                            <div style={{ marginBottom: '16px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.9rem' }}>Assistant Name</label>
                                <input type="text" value={config.assistantName} onChange={(e) => setConfig({ ...config, assistantName: e.target.value })} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }} />
                            </div>

                            <div style={{ marginBottom: '16px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.9rem' }}>Personality</label>
                                <select value={config.personality} onChange={(e) => setConfig({ ...config, personality: e.target.value })} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}>
                                    <option value="professional">💼 Professional</option>
                                    <option value="friendly">😊 Friendly</option>
                                    <option value="concise">⚡ Concise</option>
                                    <option value="detailed">📋 Detailed</option>
                                </select>
                            </div>

                            <div style={{ marginBottom: '16px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.9rem' }}>Language</label>
                                <select value={config.language} onChange={(e) => setConfig({ ...config, language: e.target.value })} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}>
                                    <option value="en">🇬🇧 English</option>
                                    <option value="hi">🇮🇳 Hindi</option>
                                    <option value="mixed">🔀 Hinglish (Mixed)</option>
                                </select>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                                    <input type="checkbox" checked={config.autoGreet} onChange={(e) => setConfig({ ...config, autoGreet: e.target.checked })} style={{ width: '18px', height: '18px' }} />
                                    <span>Auto-greet on page load</span>
                                </label>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                                    <input type="checkbox" checked={config.notifyOnInsights} onChange={(e) => setConfig({ ...config, notifyOnInsights: e.target.checked })} style={{ width: '18px', height: '18px' }} />
                                    <span>Notify on critical insights</span>
                                </label>
                            </div>
                        </div>

                        {/* Data Access */}
                        <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', padding: '24px', boxShadow: 'var(--shadow-sm)' }}>
                            <h3 style={{ margin: '0 0 20px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>🔐 Data Access Permissions</h3>
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '16px' }}>Select which modules JESSI can access:</p>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                {[
                                    { key: 'appointments', label: '📅 Appointments', color: '#00B8D4' },
                                    { key: 'jobCards', label: '🔧 Job Cards', color: '#4CAF50' },
                                    { key: 'inventory', label: '📦 Inventory', color: '#FF9800' },
                                    { key: 'finance', label: '💰 Finance', color: '#9C27B0' },
                                    { key: 'customers', label: '👥 Customers', color: '#2196F3' },
                                    { key: 'billing', label: '🧾 Billing', color: '#F44336' },
                                ].map(module => (
                                    <label key={module.key} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px', background: config.enabledModules[module.key] ? `${module.color}15` : 'var(--color-gray-100)', borderRadius: '8px', cursor: 'pointer', border: config.enabledModules[module.key] ? `1px solid ${module.color}` : '1px solid transparent' }}>
                                        <input type="checkbox" checked={config.enabledModules[module.key]} onChange={(e) => setConfig({ ...config, enabledModules: { ...config.enabledModules, [module.key]: e.target.checked } })} style={{ width: '18px', height: '18px' }} />
                                        <span style={{ fontSize: '0.9rem' }}>{module.label}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Custom System Prompt */}
                        <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', padding: '24px', boxShadow: 'var(--shadow-sm)' }}>
                            <h3 style={{ margin: '0 0 20px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>📝 Custom System Prompt</h3>
                            <textarea value={config.customPrompt} onChange={(e) => setConfig({ ...config, customPrompt: e.target.value })} rows={6} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '0.9rem', resize: 'vertical' }} placeholder="Define how the AI should behave..." />
                            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '8px' }}>This prompt will be used to guide AI responses when using OpenAI or Gemini.</p>
                        </div>

                        {/* Save Button */}
                        <div style={{ gridColumn: 'span 2', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                            {showSaveSuccess && (
                                <span style={{ padding: '12px 20px', background: 'rgba(76, 175, 80, 0.1)', color: '#4CAF50', borderRadius: '8px', fontWeight: 600 }}>✅ Settings saved!</span>
                            )}
                            <button onClick={saveConfig} className="btn btn-primary" style={{ padding: '12px 32px', fontSize: '1rem' }}>
                                💾 Save Configuration
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
