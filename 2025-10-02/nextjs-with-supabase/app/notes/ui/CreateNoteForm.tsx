'use client';
import { useFormStatus } from 'react-dom';
import { createNote } from '../actions';

export function CreateNoteForm() {
    return (
        <form action={createNote} className="flex gap-2 mb-4">
            <input
                name="content"
                placeholder="New note"
                className="flex-1 border rounded-xl px-3 py-2"
            />
            <SubmitBtn />
        </form>
    );
}

// Submit button with pending state from <form action=...>
function SubmitBtn() {
    const { pending } = useFormStatus();
    return (
        <button
            type="submit"
            disabled={pending}
            className="px-4 py-2 rounded-xl border hover:shadow"
        >
            {pending ? 'Adding…' : 'Add'}
        </button>
    );
}
