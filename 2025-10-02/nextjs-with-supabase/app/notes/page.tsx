import { createClient } from '@/lib/supabase/server';
import { CreateNoteForm } from './ui/CreateNoteForm';
import { NotesList } from './ui/NotesList';

export const revalidate = 0; // fetch fresh data

async function getNotes() {
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
        <div className="max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Notes</h1>
            <CreateNoteForm />
            <NotesList notes={notes} />
        </div>
    );
}
