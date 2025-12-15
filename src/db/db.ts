import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import "dotenv/config";


//uzyskanie url-u z env
const connectionString = process.env.DATABASE_URL; 

// Utworzenie puli połączeń do PostgreSQL
const pool = new Pool({ connectionString });

// Utworzenie adaptera Prisma wykorzystującego pg Pool
const adapter = new PrismaPg(pool);

// Inicjalizacja klienta Prisma z adapterem PostgreSQL
const db = new PrismaClient({ adapter });

export { db }