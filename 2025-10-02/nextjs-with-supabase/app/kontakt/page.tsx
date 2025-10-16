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

import { createClient } from "@/lib/supabase/client";


const schema = z.object({
    first_name: z.string().min(2, "First name must be at least 2 characters long"),
    last_name: z.string().min(2, "Last name must be at least 2 characters long"),
    email: z.string().email("Invalid email address"),
    phone: z
        .string()
        .min(5, "Phone number is required")
        .regex(/^[0-9+\(\)\-\.\s]+$/, "Please enter a valid phone number"),
    requested_at: z.date(),
    message: z.string().max(2000, "Maximum length is 2000 characters").optional(),
});

type FormValues = z.infer<typeof schema>;

export default function ContactPage() {
    const [submitted, setSubmitted] = useState<null | FormValues>(null);
    const [loading, setLoading] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

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
            if (!values.requested_at) {
                fieldErrors.requested_at = ["Date and time are required"];
            }
            return fieldErrors;
        },
    });

    // ⬇️ ОБНОВЛЁННЫЙ submit: пишем прямо в Supabase (анонимно, по RLS)
    const handleSubmit = async (values: FormValues) => {
        setLoading(true);
        setSubmitError(null);
        try {
            const supabase = createClient();
            const payload = {
                first_name: values.first_name,
                last_name: values.last_name,
                email: values.email,
                phone: values.phone,
                requested_at: dayjs(values.requested_at).toISOString(),
                message: values.message ?? null,
            };

            const { error } = await supabase.from("contacts").insert(payload);
            if (error) {
                setSubmitError("Failed to save your message. Please try again.");
                return;
            }

            setSubmitted(values);
            form.reset();
        } catch {
            setSubmitError("Unexpected error. Please try again.");
        } finally {
            setLoading(false);
        }
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
                            <TextInput label="First name" placeholder="John" required {...form.getInputProps("first_name")} />
                            <TextInput label="Last name" placeholder="Doe" required {...form.getInputProps("last_name")} />
                        </Group>

                        <TextInput label="Email" type="email" placeholder="john@example.com" required {...form.getInputProps("email")} />
                        <TextInput label="Phone number" placeholder="+1 555 123 4567" required {...form.getInputProps("phone")} />

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

                        <Group justify="flex-start" mt="xs" gap="md">
                            <Button type="submit" loading={loading}>Send</Button>
                            {submitError && (
                                <div className="rounded-full bg-red-100 px-3 py-1 text-sm text-red-800">
                                    {submitError}
                                </div>
                            )}
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
