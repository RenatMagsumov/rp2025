import { it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TodoList } from './TodoList';

globalThis.fetch = vi.fn(async () =>
    new Response(JSON.stringify({ id: 1, title: 'Edited' }), { status: 200 })
) as unknown as typeof fetch;

it('allows inline edit and save', async () => {
    render(<TodoList todos={[{ id: '1', title: 'Old' }]} />);
    await userEvent.click(screen.getByRole('button', { name: /edit/i }));
    const input = screen.getByPlaceholderText(/edit title/i);
    await userEvent.clear(input);
    await userEvent.type(input, 'New');
    await userEvent.click(screen.getByRole('button', { name: /save/i }));
    expect(globalThis.fetch).toHaveBeenCalledTimes(1);
});
