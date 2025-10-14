'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';

export async function addBookmark(fd: FormData) {
    const title = String(fd.get('title') ?? '').trim();
    const url = String(fd.get('url') ?? '').trim();
    if (!title || !url) return;

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    await supabase.from('bookmarks').insert({ title, url, user_id: user.id });
    revalidatePath('/bookmarks');
}

export async function deleteBookmark(id: string) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user || !id) return;

    await supabase.from('bookmarks').delete().eq('id', id).eq('user_id', user.id);
    revalidatePath('/bookmarks');
}

export async function updateBookmark(fd: FormData) {
    const id = String(fd.get('id') ?? '').trim();
    const title = String(fd.get('title') ?? '').trim();
    const url = String(fd.get('url') ?? '').trim();
    if (!id || (!title && !url)) return;

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const update: Record<string, string> = {};
    if (title) update.title = title;
    if (url) update.url = url;

    await supabase.from('bookmarks').update(update).eq('id', id).eq('user_id', user.id);
    revalidatePath('/bookmarks');
}
