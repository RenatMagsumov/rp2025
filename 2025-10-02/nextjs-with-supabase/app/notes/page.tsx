import { createClient } from '@/lib/supabase/server';
import { createNote, updateNote, deleteNote } from './actions';

export default async function NotesPage() {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return <p className="p-6 text-red-500">Please log in</p>;

    const { data: notes } = await supabase
        .from('notes')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

    return (
        <div className="p-6 space-y-4 max-w-2xl">
            <h1 className="text-xl font-semibold">Notes</h1>

            {/* Create new note */}
            <form action={createNote} className="flex gap-2">
                <input
                    name="content"
                    placeholder="New note..."
                    className="flex-1 border rounded px-3 py-2"
                />
                <button type="submit" className="px-4 py-2 bg-black text-white rounded">
                    Add
                </button>
            </form>

            {/* Notes list */}
            <ul className="space-y-3">
                {notes?.map((note) => (
                    <li key={note.id} className="border rounded p-3 space-y-2">
                        <form action={updateNote} className="space-y-2">
                            <input type="hidden" name="id" value={note.id} />
                            <textarea
                                name="content"
                                defaultValue={note.content}
                                className="w-full border rounded px-3 py-2"
                            />
                            <div className="flex justify-between">
                                <button
                                    type="submit"
                                    className="px-3 py-1 rounded bg-blue-600 text-white"
                                >
                                    Save
                                </button>
                                <button
                                    formAction={async () => {
                                        'use server';
                                        await deleteNote(note.id);
                                    }}
                                    className="px-3 py-1 rounded bg-red-600 text-white"
                                >
                                    Delete
                                </button>
                            </div>
                        </form>
                    </li>
                ))}
            </ul>
        </div>
    );
}
