import { z } from "zod";

// plik w którym będę przechowywać schematy zod oraz otypowania
export const UserSchema = z.array(z.object({
    id: z.number().min(1),
    name: z.string().min(1),
    email: z.string().email().min(5),
}))