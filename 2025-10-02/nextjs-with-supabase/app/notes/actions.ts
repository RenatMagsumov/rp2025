'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';


export async function addNote(formData: FormData) {
    const title = String(formData.get('title') ?? '').trim();
    const content = String(formData.get('content') ?? '').trim();
    if (!title) return;

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    await supabase.from('notes').insert({
        title,
        content,
        user_id: user.id,
    });

    revalidatePath('/notes');
}


export async function deleteNote(id: string) {
    const idNorm = String(id ?? '').trim();
    if (!idNorm) return;

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    await supabase
        .from('notes')
        .delete()
        .eq('id', idNorm)
        .eq('user_id', user.id);

    revalidatePath('/notes');
}

export async function updateNote(formData: FormData) {
    const id = String(formData.get('id') ?? '').trim();
    const titleRaw = formData.get('title');
    const contentRaw = formData.get('content');

    if (!id) return;

    const dataToUpdate: Record<string, string> = {};
    if (typeof titleRaw === 'string') {
        const title = titleRaw.trim();
        if (title) dataToUpdate.title = title;
    }
    if (typeof contentRaw === 'string') {
        const content = contentRaw.trim();

        dataToUpdate.content = content;
    }

    if (Object.keys(dataToUpdate).length === 0) return;

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    await supabase
        .from('notes')
        .update(dataToUpdate)
        .eq('id', id)
        .eq('user_id', user.id);

    revalidatePath('/notes');
}
