'use client';

import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../lib/firebase";

interface TaskFormProps {
    groupId: string;
}

export default function TaskForm({groupId}: TaskFormProps) {
    const [title, setTitle] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim() || !db) return;
        
        try {
        await addDoc(collection(db, 'tasks'), {
            title: title.trim(),
            completed: false,
            createdAt: new Date(),
            groupId,
        });
        setTitle('');
        setError(null);
        } catch (error) {
            console.error('Error adding task: ', error);
            setError("Error adding task");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" 
                value={title} 
                onChange={e => setTitle(e.target.value)}
                placeholder="Add a new task here"
            />
            <button type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
            >
                Add Task
            </button>
        </form>
    );
}