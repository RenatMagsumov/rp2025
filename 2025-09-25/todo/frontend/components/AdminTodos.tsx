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

export default function AdminTodos() {
    const [items, setItems] = useState<Todo[]>([]);

    const load = async () => {
        const res = await fetch(`${API}?includeDeleted=true`, { cache: "no-store" });
        const data = await res.json();
        setItems(data);
    };

    useEffect(() => {
        load();
    }, []);

    const toggleDeleted = async (id: string) => {
        const prev = items;
        setItems((curr) =>
            curr.map((t) => (t.id === id ? { ...t, deleted: !t.deleted } : t))
        );
        try {
            await fetch(`${API}/${id}/toggle-deleted`, {
                method: "PATCH",
                headers: { "Cache-Control": "no-cache" }
            });
        } catch {
            setItems(prev);
        }
    };

    return (
        <List>
            {items.map((t) => (
                <ListItem key={t.id} divider>
                    <ListItemText
                        primary={`${t.title} ${t.deleted ? "(deleted)" : ""}`}
                        secondary={`id: ${t.id}`}
                    />
                    <Stack direction="row" spacing={1}>
                        <Button variant="outlined" onClick={() => toggleDeleted(t.id)}>
                            Toggle Deleted
                        </Button>
                    </Stack>
                </ListItem>
            ))}
        </List>
    );
}
