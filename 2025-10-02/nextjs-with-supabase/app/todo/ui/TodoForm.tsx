'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

//type Todo = { id: string; title: string; created_at?: string };
type ApiError = { error?: string };

export function TodoForm() {
    const [title, setTitle] = useState('');
    const [pending, setPending] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!title.trim()) return;

        setPending(true);
        setError(null);

        try {
            const res = await fetch('/api/todos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title }),
            });

            const json: unknown = await res.json();

            if (!res.ok) {
                const msg =
                    typeof json === 'object' &&
                        json !== null &&
                        'error' in json &&
                        typeof (json as ApiError).error === 'string'
                        ? (json as ApiError).error!
                        : 'Failed to create';
                throw new Error(msg);
            }

            if (
                typeof json === 'object' &&
                json !== null &&
                'id' in json &&
                'title' in json
            ) {
                setTitle('');
                router.refresh();
            } else {
                setTitle('');
                router.refresh();
            }
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : 'Unknown error');
        } finally {
            setPending(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="New task"
                className="flex-1 border rounded-xl px-3 py-2"
            />
            <button
                type="submit"
                disabled={pending}
                className="px-4 py-2 rounded-xl border hover:shadow disabled:opacity-50"
            >
                {pending ? 'Adding…' : 'Add'}
            </button>
            {error && <span className="text-red-600 text-sm">{error}</span>}
        </form>
    );
}
