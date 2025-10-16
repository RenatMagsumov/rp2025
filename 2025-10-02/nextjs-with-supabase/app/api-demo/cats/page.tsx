import { Container, Title, Paper, Text } from "@mantine/core";

type CatFact = {
    text: string;
    type: string;
    _id: string;
};

async function getCatFact(): Promise<CatFact> {
    const res = await fetch("https://cat-fact.herokuapp.com/facts/random", {
        cache: "no-store",
    });
    if (!res.ok) throw new Error(`Failed to fetch cat fact: ${res.status}`);
    return res.json();
}

export default async function CatFactsPage() {
    const fact = await getCatFact();

    return (
        <Container size="sm" py="xl">
            <Title order={2} mb="md">
                Random Cat Fact (Server)
            </Title>
            <Paper p="lg" radius="md" withBorder>
                <Text size="lg">{fact.text}</Text>
            </Paper>
        </Container>
    );
}
