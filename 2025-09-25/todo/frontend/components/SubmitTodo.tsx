import React, { useState } from "react";
import { TextField, Button, Stack } from "@mui/material";

const API = "http://localhost:3000/todos";

export default function SubmitTodo() {
    const [title, setTitle] = useState("");

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;
        await fetch(API, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title: title.trim() })
        });
        setTitle("");
    };

    return (
        <form onSubmit={submit}>
            <Stack direction="row" spacing={2}>
                <TextField
                    label="New TODO"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    size="small"
                />
                <Button type="submit" variant="contained">Add</Button>
            </Stack>
        </form>
    );
}
