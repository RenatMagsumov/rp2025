"use client";

import { useForm } from "@mantine/form";
import { Container, Title, Paper, TextInput, Button } from "@mantine/core";
import { z } from "zod";

const schema = z.object({
    first_name: z.string().min(2, "First name"),
});

type FormValues = z.infer<typeof schema>;

export default function KontaktPage() {
    const form = useForm<FormValues>({
        initialValues: { first_name: "" },
        validateInputOnBlur: true,
        validate: (values) => {
            const parsed = schema.safeParse(values);
            if (parsed.success) return {};
            const { fieldErrors } = parsed.error.flatten();
            return fieldErrors;
        },
    });

    const handleSubmit = (values: FormValues) => {
        console.log("Form values:", values);
    };

    return (
        <Container size="sm" py="xl">
            <Title order={2} mb="md">
                Contact
            </Title>

            <Paper p="lg" radius="md" withBorder>
                <form onSubmit={form.onSubmit(handleSubmit)}>
                    <TextInput
                        label="First name"
                        placeholder="Joe"
                        {...form.getInputProps("first_name")}
                        required
                    />

                    <Button mt="md" type="submit">
                        Send
                    </Button>

                </form>
            </Paper>
        </Container>
    );
}
