import { createClient } from '@/lib/supabase/server';
import { TodoForm } from './ui/TodoForm';
import { TodoList } from './ui/TodoList';
import { updateTodo } from './actions';

export const revalidate = 0; // fetch fresh data

type Todo = {
    id: string;
    title: string;
    created_at?: string;
};

async function getTodos(): Promise<Todo[]> {
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
        <div className="max-w-2xl mx-auto p-6 space-y-8">
            <div>
                <h1 className="text-2xl font-bold mb-4">TODO</h1>
                <TodoForm />
                <TodoList todos={todos} />
            </div>
            <div className="space-y-3">
                <h2 className="text-lg font-semibold">Server-side inline edit (demo)</h2>
                {(!todos || todos.length === 0) ? (
                    <p className="text-gray-500">No todos yet.</p>
                ) : (
                    <ul className="space-y-2">
                        {todos.map((todo) => (
                            <li key={todo.id} className="border rounded-xl p-3">
                                <form action={updateTodo} className="flex gap-2 items-center">
                                    <input type="hidden" name="id" defaultValue={todo.id} />
                                    <input
                                        name="title"
                                        defaultValue={todo.title}
                                        className="flex-1 border rounded-xl px-3 py-2"
                                        placeholder="Edit title"
                                    />
                                    <button
                                        type="submit"
                                        className="px-3 py-2 rounded-lg border"
                                        aria-label="Save server-side"
                                        title="Save (server action)"
                                    >
                                        Save (server)
                                    </button>
                                </form>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
