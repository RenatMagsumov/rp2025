'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { deleteBookmark } from '../actions';

type Bookmark = { id: string; title: string; url: string; created_at?: string };

export function BookmarksList({ bookmarks }: { bookmarks: Bookmark[] }) {
    const [editingId, setEditingId] = useState<string | null>(null);
    const [draftTitle, setDraftTitle] = useState('');
    const [draftUrl, setDraftUrl] = useState('');
    const [pending, setPending] = useState(false);
    const router = useRouter();

    function startEdit(b: Bookmark) {
        setEditingId(b.id);
        setDraftTitle(b.title);
        setDraftUrl(b.url);
    }
    function cancelEdit() {
        setEditingId(null);
        setDraftTitle('');
        setDraftUrl('');
    }

    async function saveEdit(id: string) {
        const title = draftTitle.trim();
        const url = draftUrl.trim();
        if (!title && !url) return;
        try {
            setPending(true);
            const res = await fetch(`/api/bookmarks?id=${encodeURIComponent(id)}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, url }),
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
            {bookmarks.map((b) => {
                const isEditing = editingId === b.id;
                return (
                    <li key={b.id} className="flex items-center justify-between border rounded-xl p-3 gap-3">
                        <div className="flex-1 space-y-1">
                            {isEditing ? (
                                <>
                                    <input
                                        className="w-full border rounded-xl px-3 py-2"
                                        value={draftTitle}
                                        onChange={(e) => setDraftTitle(e.target.value)}
                                        placeholder="Edit title"
                                    />
                                    <input
                                        className="w-full border rounded-xl px-3 py-2"
                                        value={draftUrl}
                                        onChange={(e) => setDraftUrl(e.target.value)}
                                        placeholder="Edit URL"
                                    />
                                </>
                            ) : (
                                <>
                                    <div className="font-medium">{b.title}</div>
                                    <a href={b.url} target="_blank" rel="noreferrer" className="text-blue-600 underline break-all">
                                        {b.url}
                                    </a>
                                </>
                            )}
                        </div>

                        <div className="flex items-center gap-2">
                            {isEditing ? (
                                <>
                                    <button className="px-3 py-1.5 rounded-md border hover:shadow" onClick={cancelEdit} disabled={pending} type="button">
                                        Cancel
                                    </button>
                                    <button
                                        className="px-3 py-1.5 rounded-md border text-blue-600 hover:shadow disabled:opacity-50"
                                        onClick={() => saveEdit(b.id)}
                                        disabled={pending}
                                        type="button"
                                    >
                                        {pending ? 'Saving…' : 'Save'}
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button className="px-3 py-1.5 rounded-md border text-blue-600 hover:shadow" onClick={() => startEdit(b)} type="button">
                                        Edit
                                    </button>
                                    <button className="px-3 py-1.5 rounded-md border text-red-600 hover:shadow" onClick={() => deleteBookmark(b.id)} type="button">
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
