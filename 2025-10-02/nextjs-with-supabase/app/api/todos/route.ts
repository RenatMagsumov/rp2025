import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET() {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user)
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { data, error } = await supabase
        .from('todos')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

    if (error)
        return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json(data ?? []);
}


export async function POST(request: Request) {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user)
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await request.json().catch(() => null) as { title?: string } | null;
    const title = (body?.title || '').trim();

    if (!title)
        return NextResponse.json({ error: 'Title required' }, { status: 400 });

    const { data, error } = await supabase
        .from('todos')
        .insert([{ title, user_id: user.id }])
        .select('*')
        .single();

    if (error)
        return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json(data, { status: 201 });
}


export async function PUT(request: Request) {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user)
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await request.json().catch(() => null) as { id?: string; title?: string } | null;
    if (!body?.id)
        return NextResponse.json({ error: 'ID required' }, { status: 400 });

    const { data, error } = await supabase
        .from('todos')
        .update({ title: body.title })
        .eq('id', body.id)
        .eq('user_id', user.id)
        .select('*')
        .maybeSingle();

    if (error)
        return NextResponse.json({ error: error.message }, { status: 500 });
    if (!data)
        return NextResponse.json({ error: 'Not found' }, { status: 404 });

    return NextResponse.json(data);
}


export async function DELETE() {
    return NextResponse.json({ message: 'DELETE /api/todos — not implemented yet' });
}
