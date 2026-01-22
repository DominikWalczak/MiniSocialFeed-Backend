import { z } from "zod";

// plik w którym będę przechowywać schematy zod oraz otypowania do users
export const UserSchema = z.object({
    id: z.number(),
    name: z.string(),
    vorname: z.string(),
    password: z.string(),
    email: z.string().email(),
})

export const createUserSchema = z.object({
    email: z.string().email(),
    name: z.string(),
    vorname: z.string(),
    password: z.string()
})