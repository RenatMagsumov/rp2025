import { Container, Title, Paper, Text } from "@mantine/core";
import ClientCatFact from "./refetch-client";

// ✅ новый тип под catfact.ninja
type CatFact = {
    fact: string;
    length: number;
};

async function getCatFact(): Promise<CatFact> {
    const res = await fetch("https://catfact.ninja/fact", {
        cache: "no-store",
    });
    if (!res.ok) throw new Error(`Failed to fetch cat fact: ${res.status}`);
    return res.json();
}

export default async function CatFactsPage() {
    const fact = await getCatFact();

    return (
        <Container size="sm" py="xl">
            <Title order={2} mb="md">Random Cat Fact (Server)</Title>
            <Paper p="lg" radius="md" withBorder>
                <Text size="lg">{fact.fact}</Text>
            </Paper>
            <ClientCatFact />
        </Container>
    );
}
