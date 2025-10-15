import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

async function ensureTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS listings (
      id SERIAL PRIMARY KEY,
      form_type TEXT NOT NULL,
      type TEXT,
      gender TEXT,
      location TEXT,
      religion TEXT,
      rent TEXT,
      phone TEXT,
      name TEXT,
      description TEXT,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `);
}

// POST — Save listing
export async function POST(req: Request) {
  try {
    await ensureTable();
    const body = await req.json();
    const {
      formType,
      type,
      gender,
      location,
      religion,
      rent,
      phone,
      name,
      description,
    } = body;

    await pool.query(
      `
      INSERT INTO listings (form_type, type, gender, location, religion, rent, phone, name, description)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
    `,
      [
        formType,
        type || null,
        gender || null,
        location || null,
        religion || null,
        rent || null,
        phone || null,
        name || null,
        description || null,
      ]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error saving to database:", error);
    return NextResponse.json({ success: false, error: "Database error" }, { status: 500 });
  }
}

// GET — Fetch listings by formType
export async function GET(req: Request) {
  try {
    await ensureTable();
    const { searchParams } = new URL(req.url);
    const formType = searchParams.get("formType");

    let query = "SELECT * FROM listings";
    let values: any[] = [];

    if (formType) {
      query += " WHERE form_type = $1 ORDER BY created_at DESC";
      values = [formType];
    } else {
      query += " ORDER BY created_at DESC";
    }

    const result = await pool.query(query, values);
    return NextResponse.json({ success: true, data: result.rows });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json({ success: false, error: "Database error" }, { status: 500 });
  }
}
