import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { role, level, exp } = await req.json();

    const updatedUser = await prisma.user.update({
      where: { id },
      data: { 
        role, 
        level: level !== undefined ? parseInt(level) : undefined, 
        exp: exp !== undefined ? parseInt(exp) : undefined 
      },
    });

    return NextResponse.json({ success: true, data: updatedUser });
  } catch (error) {
    console.error("User update error:", error);
    return NextResponse.json({ error: "Gagal update data pengguna" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request, 
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.user.delete({ 
      where: { id } 
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("User delete error:", error);
    return NextResponse.json({ error: "Gagal menghapus pengguna" }, { status: 500 });
  }
}