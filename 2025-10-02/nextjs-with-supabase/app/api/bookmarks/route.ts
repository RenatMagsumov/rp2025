import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

type Body = { title?: string; url?: string };

export async function GET(request: Request) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const urlObj = new URL(request.url);
    const id = urlObj.searchParams.get('id');

    if (id) {
        const { data, error } = await supabase
            .from('bookmarks')
            .select('*')
            .eq('id', id)
            .eq('user_id', user.id)
            .maybeSingle();

        if (error) return NextResponse.json({ error: error.message }, { status: 500 });
        if (!data) return NextResponse.json({ error: 'Not found' }, { status: 404 });
        return NextResponse.json(data);
    }

    const { data, error } = await supabase
        .from('bookmarks')
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

    let body: Body | null = null;
    try { body = await request.json(); } catch { }
    const title = (body?.title ?? '').trim();
    const url = (body?.url ?? '').trim();

    if (!title || !url) {
        return NextResponse.json({ error: 'Title and url required' }, { status: 400 });
    }

    const { data, error } = await supabase
        .from('bookmarks')
        .insert([{ title, url, user_id: user.id }])
        .select('*')
        .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data, { status: 201 });
}

export async function PATCH(request: Request) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const urlObj = new URL(request.url);
    const id = urlObj.searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

    let body: Body | null = null;
    try { body = await request.json(); } catch { }
    if (!body || (!body.title && !body.url)) {
        return NextResponse.json({ error: 'Nothing to update' }, { status: 400 });
    }

    const toUpdate: Record<string, string> = {};
    if (typeof body.title === 'string' && body.title.trim()) toUpdate.title = body.title.trim();
    if (typeof body.url === 'string' && body.url.trim()) toUpdate.url = body.url.trim();
    if (Object.keys(toUpdate).length === 0) {
        return NextResponse.json({ error: 'Nothing to update' }, { status: 400 });
    }

    const { data, error } = await supabase
        .from('bookmarks')
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

    const urlObj = new URL(request.url);
    const id = urlObj.searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

    const { data, error } = await supabase
        .from('bookmarks')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id)
        .select('id')
        .maybeSingle();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    if (!data) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ ok: true, id: data.id });
}
