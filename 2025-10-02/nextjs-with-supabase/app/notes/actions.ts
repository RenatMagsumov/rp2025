'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';

export async function addNote(formData: FormData) {
    const title = String(formData.get('title') ?? '').trim();
    if (!title) return;

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    await supabase.from('notes').insert({ title, user_id: user.id });
    revalidatePath('/notes');
}

export async function deleteNote(id: string) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    await supabase.from('notes').delete().eq('id', id).eq('user_id', user.id);
    revalidatePath('/notes');
}

export async function updateNote(formData: FormData) {
    const id = String(formData.get('id') ?? '').trim();
    const title = String(formData.get('title') ?? '').trim();
    if (!id || !title) return;

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    await supabase.from('notes').update({ title }).eq('id', id).eq('user_id', user.id);
    revalidatePath('/notes');
}
