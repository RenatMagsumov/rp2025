'use client';

import { Container, Stack, Title, Text, Code, List } from '@mantine/core';

export default function RegexPage() {
    return (
        <main>
            <Container size="md" py="xl">
                <Stack gap="sm">
                    <Title order={2}>Regular Expressions</Title>
                    <Text c="dimmed">
                        Regex
                    </Text>

                    <Title order={3} mt="md">
                        Patterns
                    </Title>

                    <List type="ordered" spacing="sm">
                        <List.Item>
                            5-digit postal code:{' '}
                            <Code>{'^\\d{5}$'}</Code>
                        </List.Item>

                        <List.Item>
                            Word starting with a capital letter:{' '}
                            <Code>{'\\b[A-Z][a-z]*\\b'}</Code>
                        </List.Item>

                        <List.Item>
                            Date in DD/MM/YYYY:{' '}
                            <Code>{'^(0[1-9]|[12][0-9]|3[01])\\/(0[1-9]|1[0-2])\\/\\d{4}$'}</Code>
                        </List.Item>

                        <List.Item>
                            Hashtag word:{' '}
                            <Code>{'#[A-Za-z0-9_]+'}</Code>
                        </List.Item>

                        <List.Item>
                            URL (http/https):{' '}
                            <Code>{'https?:\\/\\/[^\\s/$.?#].[^\\s]*'}</Code>
                        </List.Item>
                    </List>
                </Stack>
            </Container>
        </main>
    );
}
