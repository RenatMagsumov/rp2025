"use client";

import { useState } from "react";
import {
    Container,
    Title,
    Paper,
    TextInput,
    Textarea,
    Button,
    Group,
    Stack,
} from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { z } from "zod";
import dayjs from "dayjs";

// Validation schema (English messages)
const schema = z.object({
    first_name: z.string().min(2, "First name > 2 characters long"),
    last_name: z.string().min(2, "Last name > 2 characters long"),
    email: z.string().email("Invalid email address"),
    phone: z
        .string()
        .min(5, "Phone number is required")
        .regex(/^[0-9+()\-.\s]+$/, "Please enter a valid phone number"),
    requested_at: z.date(),
    message: z.string().max(2000, "Maximum length is 2000 characters").optional(),
});

type FormValues = z.infer<typeof schema>;

export default function ContactPage() {
    const [submitted, setSubmitted] = useState<null | FormValues>(null);

    const form = useForm<FormValues>({
        initialValues: {
            first_name: "",
            last_name: "",
            email: "",
            phone: "",
            requested_at: new Date(),
            message: "",
        },
        validateInputOnBlur: true,
        validate: (values) => {
            const parsed = schema.safeParse(values);
            if (parsed.success) return {};

            const { fieldErrors } = parsed.error.flatten();

            // Provide friendly required message for requested_at when empty
            if (!values.requested_at) {
                fieldErrors.requested_at = ["Date and time are required"];
            }

            return fieldErrors;
        },
    });

    const handleSubmit = (values: FormValues) => {
        console.log("Contact form submitted:", {
            ...values,
            requested_at_iso: dayjs(values.requested_at).toISOString(),
        });
        setSubmitted(values);
        form.reset();
    };


    const handleDateChange = (d: Date | string | null) => {
        const asDate = d instanceof Date ? d : d ? new Date(d) : null;
        form.setFieldValue("requested_at", asDate ?? new Date());
    };

    return (
        <Container size="sm" py="xl">
            <Title order={2} mb="md">Contact form</Title>
            <Paper p="lg" radius="md" withBorder>
                <form onSubmit={form.onSubmit(handleSubmit)}>
                    <Stack gap="md">
                        <Group grow>
                            <TextInput
                                label="First name"
                                placeholder="John"
                                required
                                {...form.getInputProps("first_name")}
                            />
                            <TextInput
                                label="Last name"
                                placeholder="Doe"
                                required
                                {...form.getInputProps("last_name")}
                            />
                        </Group>

                        <TextInput
                            label="Email"
                            type="email"
                            placeholder="john@example.com"
                            required
                            {...form.getInputProps("email")}
                        />

                        <TextInput
                            label="Phone number"
                            placeholder="+372 5555 5555"
                            required
                            {...form.getInputProps("phone")}
                        />

                        <DateTimePicker
                            label="Date and time"
                            placeholder="Select date and time"
                            value={form.values.requested_at}
                            onChange={handleDateChange}
                            minDate={new Date()}
                            required
                            error={form.errors.requested_at}
                        />

                        <Textarea
                            label="Message"
                            placeholder="Enter additional details (optional)"
                            autosize
                            minRows={4}
                            {...form.getInputProps("message")}
                        />

                        <Group justify="flex-start" mt="xs">
                            <Button type="submit">Send</Button>
                        </Group>
                    </Stack>
                </form>
            </Paper>

            {submitted && (
                <div className="mt-4 rounded-lg bg-green-50 p-3 text-green-700">
                    Thank you! Your message has been submitted. Chosen date:{" "}
                    {dayjs(submitted.requested_at).format("YYYY-MM-DD HH:mm")}
                </div>
            )}
        </Container>
    );
}