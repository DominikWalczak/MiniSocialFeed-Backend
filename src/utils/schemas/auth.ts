import { z } from 'zod';

// plik w którym będę przechowywać schematy zod oraz otypowania do auth
export const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string(),
});

export type LoginType = z.infer<typeof LoginSchema>;

export const LogOutSchema = z.object({
    token: z.string(),
});

export type LogOutType = z.infer<typeof LogOutSchema>;

