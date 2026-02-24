import express from "express";
import 'dotenv/config';
import cors from "cors";

import userRoutes from "./routes/user.routes.js"
import authRoutes from "./routes/auth.routes.js"
import postRoutes from "./routes/post.routes.js"

import { errorMiddleware } from "./middlewares/error.middleware.js";

import type { Request, Response, NextFunction } from "express";


const app = express();

app.use(express.json());

// autoryzacja adresu frontendu upoważnionego do zapytań
app.use(cors({
  origin: `${process.env.FRONTEND_URL}`, 
}));


app.use("/auth", authRoutes);

app.use("/post", postRoutes);

// podstawy endpoint GET/, weryfikacja czy nawiązano połączenie
app.get("/", (req: Request, res: Response) => { 
    console.log("connected");
    res.json({ status: "connected" })
});

// endpoint /user/me
app.use("/user", userRoutes);

// middleware służący do globalnej obsługi błędów
app.use(errorMiddleware);

// wybór portu na którym działa serwer, 
// wybrałem 4000 ze względu na to, że bazowy port czasami jest zajmowany przez losowe aplikacje
const PORT = 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));