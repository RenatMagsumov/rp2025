import { useEffect, useState } from "react";

/**
 * useLocalStorage — like useState, but keeps data in localStorage.
 * @param key     key in localStorage
 * @param initial initial value (or a function returning it)
 */
export function useLocalStorage<T>(key: string, initial: T | (() => T)) {
    // lazy initial value — read from localStorage only once
    const [value, setValue] = useState<T>(() => {
        try {
            const raw = localStorage.getItem(key);
            if (raw !== null) return JSON.parse(raw) as T;
            return typeof initial === "function" ? (initial as () => T)() : initial;
        } catch {
            return typeof initial === "function" ? (initial as () => T)() : initial;
        }
    });

    // when value changes — write it to localStorage
    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch {
            // ignore quota/private mode errors
        }
    }, [key, value]);

    return [value, setValue] as const;
}
