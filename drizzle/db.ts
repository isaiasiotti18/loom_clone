import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

if (!process.env.DATABASE_URL_POSTGRES) {
  throw new Error("DATABASE_URL_POSTGRES não definida");
}

const sql = neon(process.env.DATABASE_URL_POSTGRES);

export const db = drizzle(sql);
