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


export async function POST() {
    return NextResponse.json({ message: 'POST /api/todos — not implemented yet' });
}

export async function PUT() {
    return NextResponse.json({ message: 'PUT /api/todos — not implemented yet' });
}

export async function DELETE() {
    return NextResponse.json({ message: 'DELETE /api/todos — not implemented yet' });
}
