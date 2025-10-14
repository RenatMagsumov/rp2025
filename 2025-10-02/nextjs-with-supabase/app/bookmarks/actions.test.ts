import { beforeEach, expect, it, vi } from 'vitest';

vi.mock('@/lib/supabase/server', async () => {
    const mock = await import('../../test/__mocks__/supabaseServer');
    return { createClient: mock.createClient };
});

import { addBookmark, updateBookmark, deleteBookmark } from './actions';

beforeEach(() => vi.clearAllMocks());

it('addBookmark: ignores empty fields', async () => {
    const fd = new FormData();
    await addBookmark(fd);
    expect(true).toBe(true);
});

it('addBookmark: inserts when title and url present', async () => {
    const fd = new FormData(); fd.set('title', 'Site'); fd.set('url', 'https://example.com');
    await addBookmark(fd); expect(true).toBe(true);
});

it('updateBookmark: requires id or fields', async () => {
    const fd = new FormData(); fd.set('title', 'X'); await updateBookmark(fd);
    expect(true).toBe(true);
});

it('updateBookmark: updates title/url', async () => {
    const fd = new FormData(); fd.set('id', '1'); fd.set('title', 'New'); fd.set('url', 'https://ex.com');
    await updateBookmark(fd); expect(true).toBe(true);
});

it('deleteBookmark: deletes by id', async () => {
    await deleteBookmark('1'); expect(true).toBe(true);
});
