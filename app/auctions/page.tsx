import { database } from "../db/database";
import ItemCards from "../components/itemCards";
import { eq } from "drizzle-orm";
import { items } from "../db/schema";
import { auth } from "@/lib/auth";

export default async function MyAuctionPage() {
  const session = await auth();
  if (!session || !session.user) {
    throw new Error("Unauthorized user");
  }
  const allItems = await database.query.items.findMany({
    where: eq(items.userId, session.user.id!),
  });
  return (
    <main className="container mx-auto py-12 space-y-4">
      <h1 className="text-2xl font-bold">Items for sale</h1>
      <div className="grid grid-cols-4 gap-8">
        {allItems.map((item) => (
          <ItemCards key={item.id} item={item} />
        ))}
      </div>
    </main>
  );
}
