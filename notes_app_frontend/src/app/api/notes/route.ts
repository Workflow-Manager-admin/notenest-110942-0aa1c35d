import { NextRequest, NextResponse } from "next/server";

let notes = [
  {
    id: "1",
    title: "Welcome to Notes",
    content: "This is your first note!",
    created: new Date().toISOString(),
    updated: new Date().toISOString(),
    categoryId: "default",
  },
];

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const q = searchParams.get("q")?.toLowerCase();
  let filtered = notes;
  if (category && category !== "all") filtered = filtered.filter((n) => n.categoryId === category);
  if (q) filtered = filtered.filter((n) => (n.title + n.content).toLowerCase().includes(q));
  return NextResponse.json(filtered);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const id = `${Math.random().toString(32).slice(2)}`;
  const now = new Date().toISOString();
  const note = { ...data, id, created: now, updated: now };
  notes.unshift(note);
  return NextResponse.json(note, { status: 201 });
}

export async function PUT(req: NextRequest) {
  const data = await req.json();
  const idx = notes.findIndex((n) => n.id === data.id);
  if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });
  notes[idx] = { ...notes[idx], ...data, updated: new Date().toISOString() };
  return NextResponse.json(notes[idx]);
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  notes = notes.filter((n) => n.id !== id);
  return NextResponse.json({ success: true });
}
