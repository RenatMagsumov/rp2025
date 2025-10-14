import { it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CreateNoteForm } from './CreateNoteForm';


globalThis.fetch = vi.fn(async () =>
    new Response(JSON.stringify({ id: 1, title: 'New' }), { status: 201 })
) as unknown as typeof fetch;

it('submits and clears input', async () => {
    render(<CreateNoteForm />);

    const input = screen.getByPlaceholderText(/new note/i);
    await userEvent.type(input, 'Test{enter}');

    expect((input as HTMLInputElement).value).toBe('');
    expect(globalThis.fetch).toHaveBeenCalledTimes(1);
});
