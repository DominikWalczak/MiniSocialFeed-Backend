import type { Request, Response, NextFunction } from 'express';

// middleware służący do globalnej obsługi błędów
interface ErrorMid extends Error {
    status?: number;
    message: string;
    stack?: string;
}

const errorMiddleware = (
    err: ErrorMid,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const status: number = err.status || 500;
    const message: string = err.message || "Undefined server error occurred";

    console.log(err.stack);

    res.status(status).json({
        message: message,
        status: status,
        error: err.stack,
    });
};

export {errorMiddleware};