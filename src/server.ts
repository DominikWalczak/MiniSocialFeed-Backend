import express from "express";
import 'dotenv/config';
import cors from "cors";

import userRoutes from "./routes/user.rotues.js"
import authRoutes from "./routes/auth.routes.js"
import postRoutes from "./routes/post.routes.js"

import { errorMiddleware } from "./middlewares/error.middleware.js";

import type { Request, Response, NextFunction } from "express";


const app = express();

// autoryzacja adresu frontendu upoważnionego do zapytań
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

app.use(express.json());

app.use("/auth", authRoutes);

app.use("/post", authRoutes);

// podstawy endpoint GET/, weryfikacja czy nawiązano połączenie
app.get("/", (req: Request, res: Response) => { 
    console.log("connected");
    res.send("connected")
});

// endpoint /user/me
app.use("/user", userRoutes);

// middleware służący do globalnej obsługi błędów
app.use(errorMiddleware);

// wybór portu na którym działa serwer, 
// wybrałem 3001 ze względu na to, że 3000 jest zajęty przez frontend
const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));