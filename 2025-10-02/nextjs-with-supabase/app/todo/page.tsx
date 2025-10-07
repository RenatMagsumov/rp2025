import { createClient } from '@/lib/supabase/server';
import { TodoForm } from './ui/TodoForm';
import { TodoList } from './ui/TodoList';

export const revalidate = 0; // fetch fresh data

async function getTodos() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];

    const { data } = await supabase
        .from('todos')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

    return data ?? [];
}

export default async function TodoPage() {
    const todos = await getTodos();

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">TODO</h1>
            <TodoForm />
            <TodoList todos={todos} />
        </div>
    );
}
