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

function getErrorMessage(err: unknown) {
    if (err instanceof Error) return err.message;
    if (typeof err === 'string') return err;

    if (err && typeof err === 'object' && 'error' in err) {

        return String(err.error);
    }
    return 'Unknown error';
}

export function TodoList({ todos }: Props) {
    const router = useRouter();

    const [loadingId, setLoadingId] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const [editingId, setEditingId] = useState<string | null>(null);
    const [draft, setDraft] = useState<string>('');

    function startEdit(todo: Todo) {
        setEditingId(todo.id);
        setDraft(todo.title);
        setError(null);
    }

    function cancelEdit() {
        setEditingId(null);
        setDraft('');
    }

    async function saveEdit(id: string) {
        const title = draft.trim();
        if (!title) { setError('Title required'); return; }

        setLoadingId(id);
        setError(null);

        try {
            const res: Response = await fetch(`/api/todos?id=${encodeURIComponent(id)}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title }), // id в query, в body только то, что меняем
            });

            if (!res.ok) {
                const body = (await res.json().catch(() => ({}))) as { error?: string };
                throw new Error(body.error || 'Failed to update');
            }

            setEditingId(null);
            setDraft('');
            router.refresh();
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : 'Unknown error');
        } finally {
            setLoadingId(null);
        }
    }


    async function handleDelete(id: string) {
        setLoadingId(id);
        setError(null);

        try {
            const res: Response = await fetch('/api/todos?id=' + encodeURIComponent(id), {
                method: 'DELETE',
            });

            if (!res.ok) {
                const body = (await res.json().catch(() => ({}))) as { error?: string };
                throw new Error(body.error || 'Failed to delete');
            }

            router.refresh();
        } catch (err: unknown) {
            setError(getErrorMessage(err));
        } finally {
            setLoadingId(null);
        }
    }

    if (!todos || todos.length === 0) {
        return <p className="text-gray-500">No todos yet.</p>;
    }

    return (
        <div className="space-y-2">
            <ul className="space-y-2">
                {todos.map((todo) => {
                    const isEditing = editingId === todo.id;
                    const isBusy = loadingId === todo.id;

                    return (
                        <li
                            key={todo.id}
                            className="flex items-center justify-between border rounded-xl p-3 gap-3"
                        >
                            {!isEditing ? (
                                <span className="flex-1 break-words">{todo.title}</span>
                            ) : (
                                <input
                                    value={draft}
                                    onChange={(e) => setDraft(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') saveEdit(todo.id);
                                        if (e.key === 'Escape') cancelEdit();
                                    }}
                                    autoFocus
                                    className="flex-1 border rounded-xl px-3 py-2"
                                    placeholder="Edit title"
                                />
                            )}

                            {!isEditing ? (
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => startEdit(todo)}
                                        className="text-sm px-3 py-1.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(todo.id)}
                                        disabled={isBusy}
                                        className="text-sm px-3 py-1.5 rounded-lg bg-red-600 text-white disabled:opacity-50"
                                    >
                                        {isBusy ? 'Deleting…' : 'Delete'}
                                    </button>
                                </div>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => saveEdit(todo.id)}
                                        disabled={!draft.trim() || isBusy}
                                        className="text-sm px-3 py-1.5 rounded-lg bg-emerald-600 text-white disabled:opacity-50"
                                    >
                                        Save
                                    </button>
                                    <button
                                        onClick={cancelEdit}
                                        className="text-sm px-3 py-1.5 rounded-lg bg-gray-200 text-gray-800"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            )}
                        </li>
                    );
                })}
            </ul>

            {error && <p className="text-red-600 text-sm">{error}</p>}
        </div>
    );
}
