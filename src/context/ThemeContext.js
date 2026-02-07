'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState('light');
    const [accentColor, setAccentColor] = useState('#00B8D4');

    // Load settings from localStorage on mount
    useEffect(() => {
        const savedTheme = localStorage.getItem('s2_theme') || 'light';
        const savedAccent = localStorage.getItem('s2_accent_color') || '#00B8D4';

        setTheme(savedTheme);
        setAccentColor(savedAccent);

        applyTheme(savedTheme, savedAccent);
    }, []);

    const applyTheme = (newTheme, newAccent) => {
        const root = document.documentElement;

        // Apply theme class
        if (newTheme === 'dark') {
            root.classList.add('dark-theme');
        } else {
            root.classList.remove('dark-theme');
        }

        // Apply accent color variables
        root.style.setProperty('--color-primary', newAccent);

        // Generate a slightly darker/lighter versions for shadows and hover (simple hex manipulation or hardcoded maps)
        // For simplicity, we'll just set the main one, but we could add logic for --color-primary-dark
    };

    const toggleTheme = (newTheme) => {
        setTheme(newTheme);
        localStorage.setItem('s2_theme', newTheme);
        applyTheme(newTheme, accentColor);
    };

    const changeAccentColor = (color) => {
        setAccentColor(color);
        localStorage.setItem('s2_accent_color', color);
        applyTheme(theme, color);
    };

    return (
        <ThemeContext.Provider value={{ theme, accentColor, toggleTheme, changeAccentColor }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}
