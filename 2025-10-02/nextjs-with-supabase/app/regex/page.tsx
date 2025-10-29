'use client';

import { useState } from 'react';
import {
    Container,
    Stack,
    Title,
    Text,
    Code,
    List,
    TextInput,
    Paper,
    Group,
    Badge,
} from '@mantine/core';

type Pattern = {
    id: string;
    label: string;
    source: string;
    flags?: string;
    sampleInput: string;
    expected: string;
};

const PATTERNS: Pattern[] = [
    { id: 'zip', label: '5-digit postal code', source: '^\\d{5}$', sampleInput: '12345', expected: '12345' },
    { id: 'capital-word', label: 'Word starting with a capital letter', source: '\\b[A-Z][a-z]*\\b', sampleInput: 'Tere maailm', expected: 'Tere' },
    { id: 'date-ddmmyyyy', label: 'Date in DD/MM/YYYY', source: '^(0[1-9]|[12][0-9]|3[01])\\/(0[1-9]|1[0-2])\\/\\d{4}$', sampleInput: '16/10/2025', expected: '16/10/2025' },
    { id: 'hashtag', label: 'Hashtag word', source: '#[A-Za-z0-9_]+', sampleInput: '#Regex', expected: '#Regex' },
    { id: 'url', label: 'URL (http/https)', source: 'https?:\\/\\/[^\\s/$.?#].[^\\s]*', sampleInput: 'https://example.com', expected: 'https://example.com' },
];

export default function RegexPage() {
    const [inputs, setInputs] = useState<Record<string, string>>(
        Object.fromEntries(PATTERNS.map((p) => [p.id, p.sampleInput])),
    );

    return (
        <main>
            <Container size="md" py="xl">
                <Stack gap="lg">
                    <Stack gap={4}>
                        <Title order={2}>Regular Expressions</Title>
                        <Text c="dimmed">
                            Below are the regex patterns required by the assignment. Email example:{' '}
                            <a href="https://regexr.com/3e48o" target="_blank" rel="noreferrer">regexr.com/3e48o</a>
                        </Text>
                    </Stack>

                    <Stack gap="xs">
                        <Title order={3}>Patterns</Title>
                        <List type="ordered" spacing="sm">
                            <List.Item>5-digit postal code: <Code>{'^\\d{5}$'}</Code></List.Item>
                            <List.Item>Word starting with a capital letter: <Code>{'\\b[A-Z][a-z]*\\b'}</Code></List.Item>
                            <List.Item>Date in DD/MM/YYYY: <Code>{'^(0[1-9]|[12][0-9]|3[01])\\/(0[1-9]|1[0-2])\\/\\d{4}$'}</Code></List.Item>
                            <List.Item>Hashtag word: <Code>{'#[A-Za-z0-9_]+'}</Code></List.Item>
                            <List.Item>URL (http/https): <Code>{'https?:\\/\\/[^\\s/$.?#].[^\\s]*'}</Code></List.Item>
                        </List>
                    </Stack>

                    <Stack gap="md">
                        <Title order={3}>Tester</Title>

                        {PATTERNS.map((p) => {
                            let regex: RegExp | null = null;
                            try {
                                regex = new RegExp(p.source, p.flags ?? '');
                            } catch {
                                regex = null;
                            }

                            const value = inputs[p.id] ?? '';
                            const match = regex ? value.match(regex) : null;
                            const matched = !!match && (match[0] ?? '') === p.expected;

                            return (
                                <Paper key={p.id} withBorder p="md" radius="md">
                                    <Stack gap="xs">
                                        <Group justify="space-between" align="center">
                                            <Text fw={600}>{p.label}</Text>
                                            <Badge color={matched ? 'green' : 'gray'}>
                                                {matched ? 'Match' : 'Try'}
                                            </Badge>
                                        </Group>

                                        <Text size="sm">
                                            Pattern: <Code>{`/${p.source}/${p.flags ?? ''}`}</Code>
                                        </Text>

                                        <TextInput
                                            label="Input"
                                            placeholder="Type input to test"
                                            value={value}
                                            onChange={(e) =>
                                                setInputs((prev) => ({ ...prev, [p.id]: e.currentTarget.value }))
                                            }
                                        />

                                        <Text size="sm" c="dimmed">
                                            Expected match: <Code>{p.expected}</Code>
                                        </Text>

                                        <Text size="sm">
                                            Result:{' '}
                                            {match ? <Code>{match[0]}</Code> : <Text span c="red">no match</Text>}
                                        </Text>
                                    </Stack>
                                </Paper>
                            );
                        })}
                    </Stack>
                </Stack>
            </Container>
        </main>
    );
}
