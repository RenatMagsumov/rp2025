'use client';
import { deleteNote } from '../actions';

type Note = {
    id: string;
    content: string;
    created_at: string;
};

// Displays a list of notes with delete buttons
export function NotesList({ notes }: { notes: Note[] }) {
    return (
        <ul className="space-y-2">
            {notes.map((note) => (
                <li
                    key={note.id}
                    className="flex items-center justify-between border rounded-xl p-3"
                >
                    <span className="whitespace-pre-wrap">{note.content}</span>
                    <button
                        onClick={() => deleteNote(note.id)}
                        className="text-sm underline"
                    >
                        Delete
                    </button>
                </li>
            ))}
        </ul>
    );
}
