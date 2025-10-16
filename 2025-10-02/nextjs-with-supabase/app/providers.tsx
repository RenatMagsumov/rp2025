"use client";

import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";

import { MantineProvider, ColorSchemeScript } from "@mantine/core";
import type { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
    return <MantineProvider>{children}</MantineProvider>;
}


export const ColorScheme = ColorSchemeScript;
