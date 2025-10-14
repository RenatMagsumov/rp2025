import { it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BookmarksList } from './BookmarksList';

globalThis.fetch = vi.fn(async () =>
    new Response(JSON.stringify({ id: 1, title: 'Edited', url: 'https://ex.com' }), { status: 200 })
) as unknown as typeof fetch;

it('allows inline edit and save (title + url)', async () => {
    render(<BookmarksList bookmarks={[{ id: '1', title: 'Old', url: 'https://old.com' }]} />);
    await userEvent.click(screen.getByRole('button', { name: /edit/i }));
    const title = screen.getByPlaceholderText(/edit title/i);
    const url = screen.getByPlaceholderText(/edit url/i);
    await userEvent.clear(title);
    await userEvent.type(title, 'New');
    await userEvent.clear(url);
    await userEvent.type(url, 'https://new.com');
    await userEvent.click(screen.getByRole('button', { name: /save/i }));
    expect(globalThis.fetch).toHaveBeenCalledTimes(1);
});
