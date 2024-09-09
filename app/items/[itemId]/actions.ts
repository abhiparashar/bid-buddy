"use server";
import { auth } from "@/lib/auth";
import { database } from "@/app/db/database";
import { bids, items } from "@/app/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { Knock } from "@knocklabs/node";

const knock = new Knock("sk_test_sV06zc4Hacf-igslfji6t--MrUvxZEYUGANtYuIrMkg");

export async function createBidAction(itemId: number) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!session || !session.user || !session.user.id) {
    throw new Error("Unauthorized user");
  }
  const item = await database.query.items.findFirst({
    where: eq(items.id, itemId),
  });
  if (!item) {
    throw new Error("item is not availabel");
  }
  const latestBidValue = item.currentBid + item.bidInterval;
  await database.insert(bids).values({
    amount: latestBidValue,
    itemId,
    userId: session.user.id,
    timestamp: new Date(),
  });

  await database
    .update(items)
    .set({
      currentBid: latestBidValue,
    })
    .where(eq(items.id, itemId));

  const currentBids = await database.query.bids.findMany({
    where: eq(items.id, itemId),
    with: {
      user: true,
    },
  });

  const receipients: {
    id: string;
    name: string;
    email: string;
  }[] = [];
  for (const bid of currentBids) {
    if (
      bid.userId !== userId &&
      receipients.find(
        (receipient: { id: string }) => receipient.id === bid.userId
      )
    ) {
      receipients.push({
        id: bid.userId + "",
        name: bid.user.name ?? "Anonymous",
        email: bid.user.email ?? "Anonymous",
      });
    }
  }
  if (receipients.length > 0) {
    await knock.workflows.trigger("user-placed-bid", {
      actor: userId,
      recipients: receipients.map((receipient) => ({
        id: receipient.id,
        name: receipient.name,
        email: receipient.email,
      })),
      data: {
        itemId,
        bidAmount: latestBidValue,
      },
    });
  }

  revalidatePath(`/items/${itemId}`);
}
