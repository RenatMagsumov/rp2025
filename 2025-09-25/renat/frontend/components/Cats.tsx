import React, { useEffect, useState } from "react";
import { List, ListItem, ListItemText, Stack, Button, TextField } from "@mui/material";

type Cat = {
    id: string;
    name: string;
    createdAt: number;
    updatedAt: number | null;
    deleted: boolean;
};

const API = "http://localhost:3000/cats";

export default function Cats() {
    const [cats, setCats] = useState<Cat[]>([]);
    const [name, setName] = useState("");

    const load = async () => {
        const res = await fetch(API);
        const data = await res.json();
        setCats(data);
    };

    useEffect(() => {
        load();
    }, []);

    const createCat = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return;
        await fetch(API, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: name.trim() })
        });
        setName("");
        load();
    };

    const editCat = async (cat: Cat) => {
        const newName = window.prompt("New name:", cat.name);
        if (!newName || !newName.trim()) return;
        await fetch(API, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: cat.id, name: newName.trim() })
        });
        load();
    };

    const deleteCat = async (id: string) => {
        await fetch(API, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id })
        });
        load();
    };

    return (
        <div style={{ padding: 16 }}>
            <form onSubmit={createCat} style={{ marginBottom: 16 }}>
                <Stack direction="row" spacing={2}>
                    <TextField
                        size="small"
                        label="New cat name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <Button type="submit" variant="contained">Add Cat</Button>
                </Stack>
            </form>

            <List>
                {cats.map((c) => (
                    <ListItem key={c.id} divider>
                        <ListItemText primary={c.name} secondary={`id: ${c.id}`} />
                        <Stack direction="row" spacing={1}>
                            <Button variant="outlined" onClick={() => editCat(c)}>Edit</Button>
                            <Button color="error" variant="contained" onClick={() => deleteCat(c.id)}>Delete</Button>
                        </Stack>
                    </ListItem>
                ))}
            </List>
        </div>
    );
}
