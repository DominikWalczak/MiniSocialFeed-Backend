import express from "express";
import 'dotenv/config';
import cors from "cors";
import type { Request, Response } from "express";
import { db } from "./db/db.js";
import { UserSchema } from "./utils/zodSchemas.js";
import authRoutes from "./routes/auth.routes.js"

const app = express();

// autoryzacja adresu frontendu upoważnionego do zapytań
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

app.use(express.json());

app.use("/auth", authRoutes);

// podstawy endpoint GET/, weryfikacja czy nawiązano połączenie
app.get("/", (req: Request, res: Response) => { 
    console.log("connected");
    res.send("connected")
});

// endpoint /user/me
app.get("/user/me", async (req: Request, res: Response) => {
  try {
    // pobranie danych z PostgreSQL
    const users = await db.user.findMany(); 

    // weryfikacja czy pobrane dane są kompletne
    const data = UserSchema.safeParse(users);

    if(!data.success){
      // Jeśli nie to rzucamy błąd który zostanie zcatchowany i odpowiednio zapisany w logach
      throw data.error.message
    }

    // Jeśli wszystko się powiedzie to zwracamy dane i status do frontendu/mobile
    res.json(data.data).status(200)
  } catch (error) {
    console.log("/user/me Endpoint error: " + error);
    res.status(404)
  }
});

// wybór portu na którym działa serwer, 
// wybrałem 3001 ze względu na to, że 3000 jest zajęty przez frontend
const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));