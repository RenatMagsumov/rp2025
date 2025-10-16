"use client";

import { useForm } from "@mantine/form";
import {
    Container,
    Title,
    Paper,
    TextInput,
    Button,
    Group,
    Stack,
} from "@mantine/core";
import { z } from "zod";

const schema = z.object({
    first_name: z.string().min(2, "First Name"),
    last_name: z.string().min(2, "Last Name"),
    email: z.string().email("E-mail"),
    phone: z
        .string()
        .min(5, "Tel. Number")
        .regex(/^[0-9+()\-.\s]+$/, "Tel. Number"),
});

type FormValues = z.infer<typeof schema>;

export default function KontaktPage() {
    const form = useForm<FormValues>({
        initialValues: {
            first_name: "",
            last_name: "",
            email: "",
            phone: "",
        },
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
                Kontakt
            </Title>
            <Paper p="lg" radius="md" withBorder>
                <form onSubmit={form.onSubmit(handleSubmit)}>
                    <Stack gap="md">
                        <Group grow>
                            <TextInput
                                label="First Name"
                                placeholder="John"
                                required
                                {...form.getInputProps("first_name")}
                            />
                            <TextInput
                                label="Last Name"
                                placeholder="Watkins"
                                required
                                {...form.getInputProps("last_name")}
                            />
                        </Group>

                        <TextInput
                            label="E-mail"
                            type="E-mail"
                            placeholder="joe@example.com"
                            required
                            {...form.getInputProps("email")}
                        />

                        <TextInput
                            label="Tel. Number"
                            placeholder="+372 5555 5555"
                            required
                            {...form.getInputProps("phone")}
                        />

                        <Button mt="md" type="submit">
                            Send
                        </Button>
                    </Stack>
                </form>
            </Paper>
        </Container>
    );
}
