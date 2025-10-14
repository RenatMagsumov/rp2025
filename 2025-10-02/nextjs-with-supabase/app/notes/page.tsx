import { createClient } from '@/lib/supabase/server';
import { CreateNoteForm } from './ui/CreateNoteForm';
import { NotesList } from './ui/NotesList';
import { updateNote } from './actions';

export const revalidate = 0; // fetch fresh data

type Note = {
    id: string;
    title: string;
    created_at?: string;
};

async function getNotes(): Promise<Note[]> {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];

    const { data } = await supabase
        .from('notes')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

    return data ?? [];
}

export default async function NotesPage() {
    const notes = await getNotes();

    return (
        <div className="max-w-2xl mx-auto p-6 space-y-8">
            <div>
                <h1 className="text-2xl font-bold mb-4">NOTES</h1>
                <CreateNoteForm />
                <NotesList notes={notes} />
            </div>
            <div className="space-y-3">
                <h2 className="text-lg font-semibold">Server-side inline edit (demo)</h2>
                {(!notes || notes.length === 0) ? (
                    <p className="text-gray-500">No notes yet.</p>
                ) : (
                    <ul className="space-y-2">
                        {notes.map((note) => (
                            <li key={note.id} className="border rounded-xl p-3">
                                <form action={updateNote} className="flex gap-2 items-center">
                                    <input type="hidden" name="id" defaultValue={note.id} />
                                    <input
                                        name="title"
                                        defaultValue={note.title}
                                        className="flex-1 border rounded-xl px-3 py-2"
                                        placeholder="Edit title"
                                    />
                                    <button
                                        type="submit"
                                        className="px-3 py-2 rounded-lg border"
                                        aria-label="Save server-side"
                                        title="Save (server action)"
                                    >
                                        Save (server)
                                    </button>
                                </form>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
