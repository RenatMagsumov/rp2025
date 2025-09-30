import React, { useEffect, useState } from "react";
import {
    List,
    ListItem,
    ListItemText,
    Stack,
    Button,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from "@mui/material";

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
    const [editOpen, setEditOpen] = useState(false);
    const [editCat, setEditCat] = useState<Cat | null>(null);
    const [editName, setEditName] = useState("");

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
            body: JSON.stringify({ name: name.trim() }),
        });
        setName("");
        load();
    };

    const openEdit = (cat: Cat) => {
        setEditCat(cat);
        setEditName(cat.name);
        setEditOpen(true);
    };

    const confirmEdit = async () => {
        if (!editCat || !editName.trim()) return;
        await fetch(API, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: editCat.id, name: editName.trim() }),
        });
        setEditOpen(false);
        setEditCat(null);
        setEditName("");
        load();
    };

    const deleteCat = async (id: string) => {
        await fetch(API, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id }),
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
                    <Button type="submit" variant="contained">
                        Add Cat
                    </Button>
                </Stack>
            </form>

            <List>
                {cats.map((c) => (
                    <ListItem key={c.id} divider>
                        <ListItemText primary={c.name} secondary={`id: ${c.id}`} />
                        <Stack direction="row" spacing={1}>
                            <Button variant="outlined" onClick={() => openEdit(c)}>
                                Edit
                            </Button>
                            <Button
                                color="error"
                                variant="contained"
                                onClick={() => deleteCat(c.id)}
                            >
                                Delete
                            </Button>
                        </Stack>
                    </ListItem>
                ))}
            </List>

            <Dialog open={editOpen} onClose={() => setEditOpen(false)}>
                <DialogTitle>Edit Cat</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Cat name"
                        fullWidth
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setEditOpen(false)}>Cancel</Button>
                    <Button onClick={confirmEdit} variant="contained">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
