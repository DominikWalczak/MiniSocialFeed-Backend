import { z } from 'zod';

export const LogOutSchema = z.object({
    token: z.string(),
});

export type LogOutType = z.infer<typeof LogOutSchema>;

