import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";
import { UserJSON } from "@clerk/nextjs/server";

// Zod schema to validate the incoming data
const UserSchema = z.object({
  id: z.string().min(1),
  email: z.string().email(),
  name: z.string().min(1).max(100).nullable().optional(),
});

type WebhookUserData = {
  id: string;
  email_addresses: { email_address: string }[];
  first_name: string | null;
  last_name: string | null;
};

export async function handleUserCreated(data: UserJSON): Promise<NextResponse> {
  const { id, email_addresses, first_name, last_name } = data;

  const name = [first_name, last_name].filter(Boolean).join(" ") || null;
  const email = email_addresses?.[0]?.email_address || null;

  const result = UserSchema.safeParse({ id, email, name });

  if (!result.success) {
    console.error("Zod validation failed:", result.error.flatten());
    return NextResponse.json({ error: result.error.flatten() }, { status: 400 });
  }

  const { id: clerkId, email: userEmail, name: userName } = result.data;

  try {
    await prisma.user.upsert({
      where: { clerkId },
      update: {
        email: userEmail,
        name: userName,
      },
      create: {
        clerkId,
        email: userEmail,
        name: userName,
      },
    });

    console.log(`User ${clerkId} synced successfully.`);
    return new NextResponse("User synced successfully", { status: 200 });
  } catch (error) {
    console.error("Database upsert failed:", error);
    return new NextResponse("Failed to sync user with database", { status: 500 });
  }
}
