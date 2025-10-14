import { it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TodoForm } from './TodoForm';

globalThis.fetch = vi.fn(async () =>
    new Response(JSON.stringify({ id: 1, title: 'New' }), { status: 201 })
) as unknown as typeof fetch;

it('submits and clears input', async () => {
    render(<TodoForm />);
    const input = screen.getByPlaceholderText(/new task/i);
    await userEvent.type(input, 'Task{enter}');
    expect((input as HTMLInputElement).value).toBe('');
    expect(globalThis.fetch).toHaveBeenCalledTimes(1);
});
