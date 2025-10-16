"use client";

import { useState } from "react";
import { Button, Text } from "@mantine/core";

type CatFact = { text: string; type: string; _id: string };

export default function ClientCatFact() {
    const [fact, setFact] = useState<CatFact | null>(null);

    return (
        <>
            <Button></Button>
            {fact && <Text mt="sm">Client fact: {fact.text}</Text>}
        </>
    );
}
