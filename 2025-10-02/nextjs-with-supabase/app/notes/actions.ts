'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';

export async function createNote(formData: FormData) {
    const content = String(formData.get('content') || '').trim();
    if (!content) return;

    const supa = await createClient();
    const { data: { user } } = await supa.auth.getUser();
    if (!user) return;

    await supa.from('notes').insert({ content, user_id: user.id });
    revalidatePath('/notes');
}
