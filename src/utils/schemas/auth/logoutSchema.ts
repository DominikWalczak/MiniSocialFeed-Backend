import { z } from 'zod';

export const LogOutSchema = z.object({
    id: z.string(),
    token: z.string(),
});

export type LogOutType = z.infer<typeof LogOutSchema>;

