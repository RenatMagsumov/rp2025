import React, { useEffect, useState } from "react";
import { List, ListItem, ListItemText, Button, Stack, TextField } from "@mui/material";

type Todo = {
    id: string;
    title: string;
    completed: boolean;
    deleted: boolean;
    createdAt: number;
    updatedAt: number | null;
};

const API = "http://localhost:3000/todos";

export default function Todos() {
    const [items, setItems] = useState<Todo[]>([]);
    const [title, setTitle] = useState("");

    const load = async () => {
        const res = await fetch(API);
        const data = await res.json();
        setItems(data);
    };

    useEffect(() => {
        load();
    }, []);

    const addTodo = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;
        await fetch(API, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title: title.trim() })
        });
        setTitle("");
        load();
    };

    const toggleCompleted = async (todo: Todo) => {
        await fetch(API, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: todo.id, completed: !todo.completed })
        });
        load();
    };

    const softDelete = async (id: string) => {
        await fetch(API, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id })
        });
        load();
    };

    return (
        <div style={{ padding: 16 }}>
            <form onSubmit={addTodo} style={{ marginBottom: 16 }}>
                <Stack direction="row" spacing={2}>
                    <TextField
                        size="small"
                        label="New TODO"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <Button type="submit" variant="contained">Add</Button>
                </Stack>
            </form>

            <List>
                {items.map((t) => (
                    <ListItem key={t.id} divider>
                        <ListItemText
                            primary={`${t.title}${t.completed ? " ✅" : ""}`}
                            secondary={`id: ${t.id}`}
                        />
                        <Stack direction="row" spacing={1}>
                            <Button variant="outlined" onClick={() => toggleCompleted(t)}>
                                {t.completed ? "Mark Incomplete" : "Mark Complete"}
                            </Button>
                            <Button color="error" variant="contained" onClick={() => softDelete(t.id)}>
                                Soft Delete
                            </Button>
                        </Stack>
                    </ListItem>
                ))}
            </List>
        </div>
    );
}
