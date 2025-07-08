import { NextRequest, NextResponse } from "next/server";

let categories = [
  { id: "default", name: "All Notes", color: "#0070f3" },
  { id: "personal", name: "Personal", color: "#f5a623" },
  { id: "work", name: "Work", color: "#1a202c" },
];

export async function GET() {
  return NextResponse.json(categories);
}
export async function POST(req: NextRequest) {
  const data = await req.json();
  const id = `${Math.random().toString(36).slice(2, 10)}`;
  const newCategory = { ...data, id };
  categories.push(newCategory);
  return NextResponse.json(newCategory, { status: 201 });
}
export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  categories = categories.filter((cat) => cat.id !== id && cat.id !== "default");
  return NextResponse.json({ success: true });
}
