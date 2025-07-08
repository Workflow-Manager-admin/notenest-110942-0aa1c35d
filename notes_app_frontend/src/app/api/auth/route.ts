import { NextRequest, NextResponse } from "next/server";

const mockUser = {
  id: "user1",
  name: "Jane Doe",
  email: "jane@example.com",
  avatar: "https://randomuser.me/api/portraits/women/75.jpg",
  authenticated: false,
};

export async function GET() {
  return NextResponse.json(mockUser.authenticated ? mockUser : null);
}
export async function POST(req: NextRequest) {
  const { email } = await req.json();
  if (email === "jane@example.com") {
    mockUser.authenticated = true;
    return NextResponse.json(mockUser);
  }
  return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
}
export async function DELETE() {
  mockUser.authenticated = false;
  return NextResponse.json({ success: true });
}
