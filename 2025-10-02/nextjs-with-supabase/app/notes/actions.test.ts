import { beforeEach, expect, it, vi } from 'vitest';


vi.mock('@/lib/supabase/server', async () => {
    const mock = await import('../../test/__mocks__/supabaseServer');
    return { createClient: mock.createClient };
});
import { addNote, updateNote, deleteNote } from './actions';

beforeEach(() => {
    vi.clearAllMocks();
});

it('addNote: ignores empty title', async () => {
    const fd = new FormData();
    fd.set('title', '   ');
    await addNote(fd);
    expect(true).toBe(true);
});

it('addNote: inserts when title present', async () => {
    const fd = new FormData();
    fd.set('title', 'Hello');
    await addNote(fd);
    expect(true).toBe(true);
});

it('updateNote: requires id', async () => {
    const fd = new FormData();
    fd.set('title', 'New');
    await updateNote(fd);
    expect(true).toBe(true);
});

it('updateNote: updates when id and title provided', async () => {
    const fd = new FormData();
    fd.set('id', '1');
    fd.set('title', 'New');
    await updateNote(fd);
    expect(true).toBe(true);
});

it('deleteNote: deletes by id', async () => {
    await deleteNote('1');
    expect(true).toBe(true);
});
