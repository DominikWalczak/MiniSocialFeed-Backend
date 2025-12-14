import express from "express";
import 'dotenv/config';
import cors from "cors";
import type { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { UserSchema } from "./utils/zodSchemas.js";

const app = express();

// autoryzacja adresu frontendu upoważnionego do zapytań
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

app.use(express.json());

//uzyskanie url-u z env
const connectionString = process.env.DATABASE_URL; 

// Utworzenie puli połączeń do PostgreSQL
const pool = new Pool({ connectionString });

// Utworzenie adaptera Prisma wykorzystującego pg Pool
const adapter = new PrismaPg(pool);

// Inicjalizacja klienta Prisma z adapterem PostgreSQL
const prisma = new PrismaClient({ adapter });

// podstawy endpoint GET/, weryfikacja czy nawiązano połączenie
app.get("/", (req: Request, res: Response) => { 
    console.log("connected");
    res.send("connected")
});

// endpoint /user/me
app.get("/user/me", async (req: Request, res: Response) => {
  try {
    // pobranie danych z PostgreSQL
    const users = await prisma.user.findMany(); 

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