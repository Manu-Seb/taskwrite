import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

// Zod schema to validate the incoming data
const userDeletedSchema = z.object({
  id: z.string().min(1),
});

export async function handleUserDeleted(data: unknown): Promise<NextResponse> {
  const result = userDeletedSchema.safeParse(data);

  if (!result.success) {
    return NextResponse.json({ error: result.error.flatten() }, { status: 400 });
  }
  const { id: clerkId } = result.data;

  try {
    await prisma.user.delete({
      where: { clerkId },
    });

    console.log(`User ${clerkId} deleted successfully.`);
    return new NextResponse("User deleted successfully", { status: 200 });
  } catch (error) {
    console.error("Database deletion failed:", error);
    return new NextResponse("Failed to delete user with database", { status: 500 });
  }
}
