'use client';
import { useFormStatus } from 'react-dom';
import { addTodo } from '../actions';

/**
 * Form for creating a new todo.
 */
export function TodoForm() {
    return (
        <form action={addTodo} className="flex gap-2 mb-4">
            <input
                name="title"
                placeholder="New task"
                className="flex-1 border rounded-xl px-3 py-2"
            />
            <SubmitBtn />
        </form>
    );
}

/** Submit button with pending state */
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
