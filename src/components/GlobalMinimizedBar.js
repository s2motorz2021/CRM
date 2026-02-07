'use client';

import React from 'react';
import { usePersistentTasks } from '@/context/PersistentTaskContext';
import { useRouter, usePathname } from 'next/navigation';

export default function GlobalMinimizedBar() {
    const { tasks, removeTask } = usePersistentTasks();
    const router = useRouter();
    const pathname = usePathname();

    if (!tasks || tasks.length === 0) return null;

    const handleRestore = (task) => {
        // Navigate to the task's page if we are not already there
        if (pathname !== task.activePage) {
            router.push(`${task.activePage}?restore=${task.id}`);
        } else {
            // If already on page, a simple state change will happen via the page's useEffect
            // But we trigger a "refresh" or just rely on the page logic detecting the task
            window.dispatchEvent(new CustomEvent('restore-task', { detail: task.id }));
        }
    };

    return (
        <div style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            display: 'flex',
            flexDirection: 'column-reverse',
            gap: '10px',
            zIndex: 9999,
            maxWidth: '350px'
        }}>
            {tasks.map(task => (
                <div
                    key={task.id}
                    style={{
                        background: 'var(--color-primary)',
                        color: 'white',
                        padding: '12px 16px',
                        borderRadius: '12px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        cursor: 'pointer',
                        animation: 'slideIn 0.3s ease-out'
                    }}
                    onClick={() => handleRestore(task)}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflow: 'hidden' }}>
                        <span style={{ fontSize: '1.2rem' }}>{task.type === 'jobcard' ? '🛠️' : '📄'}</span>
                        <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>{task.title}</div>
                            <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>Click to Restore</div>
                        </div>
                    </div>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            removeTask(task.id);
                        }}
                        style={{
                            background: 'rgba(255,255,255,0.2)',
                            border: 'none',
                            color: 'white',
                            width: '24px',
                            height: '24px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            fontSize: '1rem',
                            marginLeft: '12px'
                        }}
                    >
                        ×
                    </button>
                    <style>{`
                        @keyframes slideIn {
                            from { transform: translateX(100%); opacity: 0; }
                            to { transform: translateX(0); opacity: 1; }
                        }
                    `}</style>
                </div>
            ))}
        </div>
    );
}
