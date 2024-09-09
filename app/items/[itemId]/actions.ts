import { auth } from "@/lib/auth";
import { database } from "@/app/db/database";
import { bids, items } from "@/app/db/schema";
import { eq } from "drizzle-orm";

export async function createBidAction(itemId: number) {
  const session = await auth();
  if (!session || !session.user || !session.user.id) {
    throw new Error("Unauthorized user");
  }
  const item = await database.query.items.findFirst({
    where: eq(items.id, itemId),
  });
  if (!item) {
    throw new Error("item is not availabel");
  }
  await database.insert(bids).values({
    amount: item.currentBid + item.bidInterval,
    itemId,
    userId: session.user.id,
  });
  await database
    .update(items)
    .set({
      currentBid: item.currentBid + item.bidInterval,
    })
    .where(eq(items.id, itemId));
}
