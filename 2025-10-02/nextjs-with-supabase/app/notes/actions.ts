'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';

export async function createNote(formData: FormData) {
    const content = String(formData.get('content') || '').trim();
    if (!content) return;

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    await supabase.from('notes').insert([{ content, user_id: user.id }]);
    revalidatePath('/notes');
}

export async function updateNote(formData: FormData) {
    const id = String(formData.get('id') || '');
    const content = String(formData.get('content') || '').trim();
    if (!id || !content) return;

    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    await supabase.from('notes').update({ content }).eq('id', id).eq('user_id', user.id);
    revalidatePath('/notes');
}

export async function deleteNote(id: string) {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    await supabase.from('notes').delete().eq('id', id).eq('user_id', user.id);
    revalidatePath('/notes');
}
