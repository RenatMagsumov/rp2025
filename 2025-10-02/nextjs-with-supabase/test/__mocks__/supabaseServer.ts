import { vi } from 'vitest';


export const createClient = vi.fn(() => {
    return {
        auth: {
            getUser: vi.fn(async () => ({ data: { user: { id: 'u1' } } })),
        },
        from: vi.fn(() => {
            const chain = {
                select: vi.fn(() => chain),
                single: vi.fn(async () => ({ data: { id: 1, title: 't' } })),
                maybeSingle: vi.fn(async () => ({ data: { id: 1 } })),
                order: vi.fn(async () => ({ data: [] })),
                eq: vi.fn(() => chain),
            };
            return {
                insert: vi.fn(() => chain),
                update: vi.fn(() => chain),
                delete: vi.fn(() => chain),
                select: chain.select,
            };
        }),
    };
});
