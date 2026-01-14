import { z } from "zod";

// plik w którym będę przechowywać schematy zod oraz otypowania
export const UserSchema = z.object({
    id: z.number(),
    name: z.string(),
    vorname: z.string(),
    password: z.string(),
    email: z.string().email(),
})