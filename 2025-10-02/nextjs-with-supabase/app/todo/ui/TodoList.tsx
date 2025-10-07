'use client';
import { deleteTodo } from '../actions';

type Todo = {
    id: string;
    title: string;
    created_at: string;
};

/**
 * Renders a list of todos with a delete button for each item.
 */
export function TodoList({ todos }: { todos: Todo[] }) {
    return (
        <ul className="space-y-2">
            {todos.map((todo) => (
                <li
                    key={todo.id}
                    className="flex items-center justify-between border rounded-xl p-3"
                >
                    <span>{todo.title}</span>
                    <button
                        onClick={() => deleteTodo(todo.id)}
                        className="text-sm underline"
                    >
                        Delete
                    </button>
                </li>
            ))}
        </ul>
    );
}
