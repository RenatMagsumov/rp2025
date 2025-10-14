'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';


export async function addTodo(formData: FormData) {
    const title = String(formData.get('title') || '').trim();
    if (!title) return;

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    await supabase.from('todos').insert({ title, user_id: user.id });
    revalidatePath('/todo');
}

export async function deleteTodo(id: string) {
    const supabase = await createClient();
    await supabase.from('todos').delete().eq('id', id);
    revalidatePath('/todo');
}


export async function updateTodo(formData: FormData) {
    const id = String(formData.get('id') || '').trim();
    const title = String(formData.get('title') || '').trim();

    if (!id) return;
    if (!title) return;

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    await supabase
        .from('todos')
        .update({ title })
        .eq('id', id)
        .eq('user_id', user.id);

    revalidatePath('/todo');
}
