import { database } from "../db/database";
import ItemCards from "../components/itemCards";
import { eq } from "drizzle-orm";
import { items } from "../db/schema";
import { auth } from "@/lib/auth";
import { EmptyState } from "./empty-state";

export default async function MyAuctionPage() {
  const session = await auth();
  if (!session || !session.user) {
    throw new Error("Unauthorized user");
  }
  const allItems = await database.query.items.findMany({
    where: eq(items.userId, session.user.id!),
  });
  const hasItems = allItems.length > 0;
  return (
    <main className="space-y-4">
      <h1 className="text-2xl font-bold">Items for sale</h1>
      {hasItems ? (
        <div className="grid grid-cols-4 gap-8">
          {allItems.map((item) => (
            <ItemCards key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <EmptyState />
      )}
    </main>
  );
}
