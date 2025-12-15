import type { ZodTypeAny } from "zod";
import type { Request, Response, NextFunction } from "express";

// middleware wielokrotnego użytku służący do weryfikacji typów
export const validationMiddleware = (schema: ZodTypeAny) =>
    (req: Request, res: Response, next: NextFunction) => {
        const result = schema.safeParse(req.body)

        if (!result.success) {
            return res.status(400).json({
                error: "Invalid data",
                details: result.error.issues.map(i => ({
                    path: i.path.join('.'),
                    message: i.message,
                    code: i.code,
                })),
            });
        }

        req.body = result.data;
        next();
    };