import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";
import type { UserJSON } from "@clerk/nextjs/server";

// Zod schema to validate the incoming data
const UserUpdatedSchema = z.object({
  id: z.string().min(1),
  email: z.string().email().optional(),
  name: z.string().min(1).max(100).nullable().optional(),
});

type WebhookUserData = {
  id: string;
  email_addresses: { email_address: string }[];
  first_name: string | null;
  last_name: string | null;
};

export async function handleUserUpdated(data: UserJSON): Promise<NextResponse> {
  const { id, email_addresses, first_name, last_name } = data;

  const name = [first_name, last_name].filter(Boolean).join(" ") || null;
  const email = email_addresses?.[0]?.email_address || null;

  const result = UserUpdatedSchema.safeParse({ id, email, name });

  if (!result.success) {
    console.error("Zod validation failed for user.updated event:", result.error.flatten());
    return NextResponse.json({ error: result.error.flatten() }, { status: 400 });
  }

  const { id: clerkId, email: userEmail, name: userName } = result.data;

  try {
    // Upsert is ideal here. If the user doesn't exist, create them. If they do, update them.
    await prisma.user.upsert({
      where: { clerkId },
      update: {
        email: userEmail,
        name: userName,
      },
      create: {
        clerkId,
        email: userEmail!, // Non-null assertion is needed if email is non-nullable in Prisma
        name: userName,
      },
    });

    console.log(`User ${clerkId} updated successfully.`);
    return new NextResponse("User updated successfully", { status: 200 });
  } catch (error) {
    console.error("Database upsert failed for user.updated event:", error);
    return new NextResponse("Failed to update user in database", { status: 500 });
  }
}
