"use client";

import { Title, Container, Paper } from "@mantine/core";


export default function KontaktPage() {
    return (
        <Container size="sm" py="xl">
            <Title order={2} mb="md">
                Contact
            </Title>

            <Paper p="lg" radius="md" withBorder>
                <p>Contact Form Here</p>
            </Paper>
        </Container>
    );
}
