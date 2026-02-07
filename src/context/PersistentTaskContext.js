'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const PersistentTaskContext = createContext();

export function PersistentTaskProvider({ children }) {
    const [tasks, setTasks] = useState([]);

    // Load tasks from localStorage on mount
    useEffect(() => {
        const savedTasks = localStorage.getItem('minimized_tasks');
        if (savedTasks) {
            try {
                setTasks(JSON.parse(savedTasks));
            } catch (e) {
                console.error('Failed to parse minimized tasks:', e);
            }
        }
    }, []);

    // Save tasks to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('minimized_tasks', JSON.stringify(tasks));
    }, [tasks]);

    const addTask = (task) => {
        setTasks(prev => {
            // If task already exists (by ID), update it
            const index = prev.findIndex(t => t.id === task.id);
            if (index !== -1) {
                const newTasks = [...prev];
                newTasks[index] = { ...newTasks[index], ...task };
                return newTasks;
            }
            return [...prev, task];
        });
    };

    const removeTask = (taskId) => {
        setTasks(prev => prev.filter(t => t.id !== taskId));
    };

    const getTask = (taskId) => {
        return tasks.find(t => t.id === taskId);
    };

    const updateTaskData = (taskId, data) => {
        setTasks(prev => prev.map(t => t.id === taskId ? { ...t, data } : t));
    };

    return (
        <PersistentTaskContext.Provider value={{ tasks, addTask, removeTask, getTask, updateTaskData }}>
            {children}
        </PersistentTaskContext.Provider>
    );
}

export function usePersistentTasks() {
    const context = useContext(PersistentTaskContext);
    if (!context) {
        throw new Error('usePersistentTasks must be used within a PersistentTaskProvider');
    }
    return context;
}
