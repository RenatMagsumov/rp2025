import React, { useEffect, useState } from "react";
import { List, ListItem, ListItemText, Button, Stack } from "@mui/material";

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

    const load = async () => {
        const res = await fetch(API);
        const data = await res.json();
        setItems(data);
    };

    useEffect(() => {
        load();
    }, []);

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
        <List>
            {items.map(t => (
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
    );
}
