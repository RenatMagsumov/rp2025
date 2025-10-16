"use client";

import { useState } from "react";
import { Button, Text } from "@mantine/core";

type CatFact = { text: string; type: string; _id: string };

export default function ClientCatFact() {
    const [fact, setFact] = useState<CatFact | null>(null);

    const getNewFact = async () => {
        const res = await fetch("https://cat-fact.herokuapp.com/facts/random");
        const data = (await res.json()) as CatFact;
        setFact(data);
    };

    return (
        <>
            <Button onClick={getNewFact}>Get new cat fact</Button>
            {fact && <Text mt="sm">Client fact: {fact.text}</Text>}
        </>
    );
}
