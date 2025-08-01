import { headers } from "next/headers";
import { Webhook } from "svix";
import { NextResponse } from "next/server";
import type { WebhookEvent } from "@clerk/nextjs/server";
import { handleUserCreated } from "@/lib/handlers/handleUserCreated";
import { handleUserDeleted } from "@/lib/handlers/handleUserDeleted";
import { handleUserUpdated } from "@/lib/handlers/handleUserUpdated";

const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

if (!WEBHOOK_SECRET) {
  throw new Error("Please add CLERK_WEBHOOK_SECRET to your .env.local file");
}

export async function POST(req: Request) {
  const payload = await req.text();
  const headersList = await headers();
  const headerPayload = Object.fromEntries(headersList.entries());

  const wh = new Webhook(WEBHOOK_SECRET!);

  let evt: WebhookEvent | null = null;
  try {
    evt = wh.verify(payload, headerPayload) as WebhookEvent;
  } catch (err) {
    console.error("Webhook verification failed:", err);
    return new NextResponse("Invalid signature", { status: 400 });
  }

  // Delegate the handling of specific events to separate functions
  switch (evt.type) {
    case "user.created":
      return handleUserCreated(evt.data); // ✅ Call the handler and return its response directly
    case "user.deleted":
      return handleUserDeleted(evt.data);
    case "user.updated":
      return handleUserUpdated(evt.data);
    // You can add more cases here for other event types.
    // case "user.deleted":
    //   return handleUserDeleted(evt.data);

    default:
      console.warn(`Event type "${evt.type}" ignored.`);
      return new NextResponse("Event ignored", { status: 200 });
  }
}

// Disable body parser for this route
export const config = {
  api: {
    bodyParser: false,
  },
};
