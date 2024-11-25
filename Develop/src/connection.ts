import dotenv from "dotenv";
dotenv.config();

import pg from "pg";
const { Pool } = pg;

const pool = new Pool({
  user: "postgres",
  password: process.env.DB_PASSWORD,
  host: "localhost",
  database: ProcessingInstruction.env.DB_NAME,
  port: 5432,
});

const connectToDB = async () => {
  try {
    await pool.connect();
    console.log("Connected to DB");
  } catch (error) {
    console.log("Error connecting to DB", error);
    process.exit(1);
  }
};

export { pool, connectToDB };
