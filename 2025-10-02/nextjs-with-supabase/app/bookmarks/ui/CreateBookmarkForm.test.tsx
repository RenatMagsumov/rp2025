import { it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CreateBookmarkForm } from './CreateBookmarkForm';

globalThis.fetch = vi.fn(async () =>
    new Response(JSON.stringify({ id: 1, title: 'Site', url: 'https://ex.com' }), { status: 201 })
) as unknown as typeof fetch;

it('submits and clears inputs', async () => {
    render(<CreateBookmarkForm />);
    const title = screen.getByPlaceholderText(/title/i);
    const url = screen.getByPlaceholderText(/https?:\/\//i);
    await userEvent.type(title, 'A');
    await userEvent.type(url, 'https://example.com{enter}');
    expect((title as HTMLInputElement).value).toBe('');
    expect((url as HTMLInputElement).value).toBe('');
    expect(globalThis.fetch).toHaveBeenCalledTimes(1);
});
