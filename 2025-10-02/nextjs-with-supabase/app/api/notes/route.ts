import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

function normalizeId(id: string | null): number | null {
    if (!id) return null;
    return /^\d+$/.test(id) ? Number(id) : null; // TODO-стайл: ожидаем integer id
}

export async function GET(request: Request) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const url = new URL(request.url);
    const id = normalizeId(url.searchParams.get('id'));

    if (id !== null) {
        const { data, error } = await supabase
            .from('notes')
            .select('*')
            .eq('id', id)
            .eq('user_id', user.id)
            .maybeSingle();

        if (error) return NextResponse.json({ error: error.message }, { status: 500 });
        if (!data) return NextResponse.json({ error: 'Not found' }, { status: 404 });
        return NextResponse.json(data);
    }

    const { data, error } = await supabase
        .from('notes')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data ?? []);
}

export async function POST(request: Request) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    let body: { title?: string; content?: string } | null = null;
    try { body = await request.json(); } catch { }

    const title = (body?.title ?? '').trim();
    const content = (body?.content ?? '').trim();

    if (!title) {
        return NextResponse.json({ error: 'Title required' }, { status: 400 });
    }

    const { data, error } = await supabase
        .from('notes')
        .insert([{ title, content, user_id: user.id }])
        .select('*')
        .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data, { status: 201 });
}

export async function PATCH(request: Request) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const url = new URL(request.url);
    const id = normalizeId(url.searchParams.get('id'));
    if (id === null) return NextResponse.json({ error: 'ID required' }, { status: 400 });

    let body: { title?: string; content?: string } | null = null;
    try { body = await request.json(); } catch { }
    if (!body || (!body.title && !body.content)) {
        return NextResponse.json({ error: 'Nothing to update' }, { status: 400 });
    }

    const toUpdate: Record<string, string> = {};
    if (typeof body.title === 'string') {
        const t = body.title.trim();
        if (t) toUpdate.title = t;
    }
    if (typeof body.content === 'string') {
        toUpdate.content = body.content.trim(); // можно очистить контент
    }
    if (Object.keys(toUpdate).length === 0) {
        return NextResponse.json({ error: 'Nothing to update' }, { status: 400 });
    }

    const { data, error } = await supabase
        .from('notes')
        .update(toUpdate)
        .eq('id', id)
        .eq('user_id', user.id)
        .select('*')
        .maybeSingle();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    if (!data) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(data);
}

export async function DELETE(request: Request) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const url = new URL(request.url);
    const id = normalizeId(url.searchParams.get('id'));
    if (id === null) return NextResponse.json({ error: 'ID required' }, { status: 400 });

    const { data, error } = await supabase
        .from('notes')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id)
        .select('id')
        .maybeSingle();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    if (!data) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ ok: true, id: data.id });
}
