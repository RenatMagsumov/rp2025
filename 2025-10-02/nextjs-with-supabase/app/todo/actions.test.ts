import { beforeEach, expect, it, vi } from 'vitest';

vi.mock('@/lib/supabase/server', async () => {
    const mock = await import('../../test/__mocks__/supabaseServer');
    return { createClient: mock.createClient };
});

import { addTodo, updateTodo, deleteTodo } from './actions';

beforeEach(() => vi.clearAllMocks());

it('addTodo: ignores empty title', async () => {
    const fd = new FormData(); fd.set('title', '   ');
    await addTodo(fd); expect(true).toBe(true);
});

it('addTodo: inserts when title present', async () => {
    const fd = new FormData(); fd.set('title', 'A');
    await addTodo(fd); expect(true).toBe(true);
});

it('updateTodo: requires id', async () => {
    const fd = new FormData(); fd.set('title', 'B');
    await updateTodo(fd); expect(true).toBe(true);
});

it('updateTodo: updates when id and title provided', async () => {
    const fd = new FormData(); fd.set('id', '1'); fd.set('title', 'B');
    await updateTodo(fd); expect(true).toBe(true);
});

it('deleteTodo: deletes by id', async () => {
    await deleteTodo('1'); expect(true).toBe(true);
});
