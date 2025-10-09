import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET() {
    return NextResponse.json({ message: 'GET /api/todos — not implemented yet' });
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
