import { z } from 'zod';

const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string(),
});

type LoginType = z.infer<typeof LoginSchema>;

export type {LoginSchema, LoginType};