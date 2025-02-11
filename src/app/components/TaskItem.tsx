'use client';

import { useState } from "react";
import { deleteDoc, doc, updateDoc} from "firebase/firestore";
import { db } from "../lib/firebase";
import { Task } from "../types/task";

interface TaskItemProps {
    task: Task;
}

export default function TaskItem({task}: TaskItemProps) {
    const [isCompleted, setIsCompleted] = useState(task.completed);
    
    const toggleCompleted = async () => {
        setIsCompleted(!isCompleted);
        await updateDoc(doc(db, 'tasks', task.id), { 
            completed: !isCompleted,
        });
    }

    const deleteTask = async () => {
        await deleteDoc(doc(db, 'tasks', task.id));
    }


    return (
        <li className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
            <div className="flex items-center space-x-4">
                <input 
                    className="form-checkbox h-5 w-5 text-blue-600"
                    type="checkbox" 
                    checked={isCompleted}
                    onChange={toggleCompleted}
                />
                <span className={isCompleted ? "line-through" : ""}>
                    {task.title}
                </span>
            </div>
            <button
                className="text-red-500 hover:text-red-700"
                onClick={deleteTask}
            >
                Delete
            </button>
        </li>
    );
}