import { z } from 'zod';

export const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string(),
});

export type LoginType = z.infer<typeof LoginSchema>;

export const LogOutSchema = z.object({
    token: z.string(),
});

export type LogOutType = z.infer<typeof LogOutSchema>;

