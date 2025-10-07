'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';

/**
 * Server Action: create a new todo for the current user.
 */
export async function addTodo(formData: FormData) {
    const title = String(formData.get('title') || '').trim();
    if (!title) return;

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    await supabase.from('todos').insert({ title, user_id: user.id });
    revalidatePath('/todo');
}
