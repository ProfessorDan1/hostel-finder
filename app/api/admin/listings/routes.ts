import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

// ✅ GET — all listings or single by ID
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  try {
    let query = "SELECT * FROM listings ORDER BY created_at DESC";
    let values: any[] = [];

    if (id) {
      query = "SELECT * FROM listings WHERE id = $1";
      values = [id];
    }

    const result = await pool.query(query, values);

    if (id && result.rows.length === 0) {
      return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: result.rows });
  } catch (err) {
    console.error("❌ Error fetching admin listings:", err);
    return NextResponse.json({ success: false, error: "Database error" }, { status: 500 });
  }
}

// ✅ DELETE — remove listing by ID
export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ success: false, error: "Missing ID" }, { status: 400 });
  }

  try {
    const result = await pool.query("DELETE FROM listings WHERE id = $1 RETURNING *", [id]);

    if (result.rows.length === 0) {
      return NextResponse.json({ success: false, error: "Listing not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Listing deleted successfully",
      deleted: result.rows[0],
    });
  } catch (err) {
    console.error("❌ Error deleting listing:", err);
    return NextResponse.json({ success: false, error: "Database error" }, { status: 500 });
  }
}
