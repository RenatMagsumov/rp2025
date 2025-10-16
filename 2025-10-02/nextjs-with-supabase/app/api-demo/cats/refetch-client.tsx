"use client";

import { useState } from "react";
import { Button, Paper, Stack, Text, Code } from "@mantine/core";

// ✅ новый тип
type CatFact = { fact: string; length: number };

export default function ClientCatFact() {
    const [fact, setFact] = useState<CatFact | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const getNewFact = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch("https://catfact.ninja/fact");
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const data: CatFact = await res.json();
            setFact(data);
        } catch (e: unknown) {
            const message = e instanceof Error ? e.message : "Request failed";
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Paper p="lg" radius="md" withBorder className="mt-6">
            <Stack gap="sm">
                <Button onClick={getNewFact} loading={loading}>
                    Get new cat fact
                </Button>
                {error && <Code color="red">{error}</Code>}
                {fact && (
                    <Text>
                        <strong>Client fact:</strong> {fact.fact}
                    </Text>
                )}
            </Stack>
        </Paper>
    );
}
