"use client";

import { useState } from "react";
import { Button, Text, Code } from "@mantine/core";

type CatFact = { text: string; type: string; _id: string };

export default function ClientCatFact() {
    const [fact, setFact] = useState<CatFact | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const getNewFact = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch("https://cat-fact.herokuapp.com/facts/random");
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const data = (await res.json()) as CatFact;
            setFact(data);
        } catch (e: any) {
            setError(e?.message ?? "Request failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Button onClick={getNewFact} loading={loading}>
                Get new cat fact
            </Button>
            {error && <Code color="red" mt="sm">{error}</Code>}
            {fact && <Text mt="sm"><strong>Client fact:</strong> {fact.text}</Text>}
        </>
    );
}
