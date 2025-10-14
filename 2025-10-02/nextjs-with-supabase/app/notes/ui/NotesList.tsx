'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { deleteNote } from '../actions';

type Note = { id: number | string; title: string; created_at?: string };

export function NotesList({ notes }: { notes: Note[] }) {
    const [editingId, setEditingId] = useState<number | string | null>(null);
    const [draft, setDraft] = useState('');
    const [pending, setPending] = useState(false);
    const router = useRouter();

    function startEdit(n: Note) {
        setEditingId(n.id);
        setDraft(n.title ?? '');
    }
    function cancelEdit() {
        setEditingId(null);
        setDraft('');
    }

    async function saveEdit(id: number | string) {
        const title = draft.trim();
        if (!title) return;
        try {
            setPending(true);
            const res = await fetch(`/api/notes?id=${encodeURIComponent(String(id))}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title }),
            });
            if (!res.ok) {
                const j = await res.json().catch(() => ({}));
                throw new Error(j?.error || 'Failed to update');
            }
            cancelEdit();
            router.refresh();
        } finally {
            setPending(false);
        }
    }

    return (
        <ul className="space-y-2">
            {notes.map((note) => {
                const isEditing = editingId === note.id;
                return (
                    <li key={String(note.id)} className="flex items-center justify-between border rounded-xl p-3 gap-3">
                        <div className="flex-1">
                            {isEditing ? (
                                <input
                                    className="w-full border rounded-xl px-3 py-2"
                                    value={draft}
                                    onChange={(e) => setDraft(e.target.value)}
                                    placeholder="Edit title"
                                />
                            ) : (
                                <span className="whitespace-pre-wrap">{note.title}</span>
                            )}
                        </div>

                        <div className="flex items-center gap-2">
                            {isEditing ? (
                                <>
                                    <button
                                        className="px-3 py-1.5 rounded-md border hover:shadow"
                                        onClick={cancelEdit}
                                        type="button"
                                        disabled={pending}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="px-3 py-1.5 rounded-md border text-blue-600 hover:shadow disabled:opacity-50"
                                        onClick={() => saveEdit(note.id)}
                                        type="button"
                                        disabled={pending}
                                    >
                                        {pending ? 'Saving…' : 'Save'}
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button
                                        className="px-3 py-1.5 rounded-md border text-blue-600 hover:shadow"
                                        onClick={() => startEdit(note)}
                                        type="button"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="px-3 py-1.5 rounded-md border text-red-600 hover:shadow"
                                        onClick={() => deleteNote(String(note.id))}
                                        type="button"
                                    >
                                        Delete
                                    </button>
                                </>
                            )}
                        </div>
                    </li>
                );
            })}
        </ul>
    );
}
