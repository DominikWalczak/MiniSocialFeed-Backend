import { z } from "zod";

// plik w którym będę przechowywać schematy zod oraz otypowania do posts
export const PostSchema = z.array(z.object({
    id: z.number(),
    authorId: z.number(),
    content: z.string(),
    createdAt: z.date(),
}));

export const PostCreateSchema = z.object({
    id: z.number(),
    content: z.string().min(1),
});