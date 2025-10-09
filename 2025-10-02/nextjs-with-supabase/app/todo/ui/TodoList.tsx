'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

type Todo = {
    id: string;
    title: string;
    created_at?: string;
};

type Props = {
    todos: Todo[];
};

export function TodoList({ todos }: Props) {
    const router = useRouter();
    const [loadingId, setLoadingId] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    async function handleDelete(id: string) {
        setLoadingId(id);
        setError(null);
        try {
            const res = await fetch(`/api/todos?id=${id}`, { method: 'DELETE' });
            const data = await res.json();
            if (!res.ok) throw new Error(data?.error || 'Failed to delete');
            router.refresh();
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : 'Unknown error');
        } finally {
            setLoadingId(null);
        }
    }

    if (todos.length === 0) {
        return <p className="text-gray-500">No todos yet.</p>;
    }

    return (
        <ul className="space-y-2">
            {todos.map((todo) => (
                <li
                    key={todo.id}
                    className="flex justify-between items-center border rounded-xl p-3"
                >
                    <span>{todo.title}</span>
                    <button
                        onClick={() => handleDelete(todo.id)}
                        disabled={loadingId === todo.id}
                        className="text-sm underline text-red-600 disabled:opacity-50"
                    >
                        {loadingId === todo.id ? 'Deleting…' : 'Delete'}
                    </button>
                </li>
            ))}
            {error && <p className="text-red-600 text-sm">{error}</p>}
        </ul>
    );
}
