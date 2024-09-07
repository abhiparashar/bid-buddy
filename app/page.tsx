import Image from "next/image";
import { database } from "./db/database";
import ItemCards from "./components/itemCards";

export default async function Home() {
  const items = await database.query.items.findMany();

  return (
    <main className="container mx-auto py-12 space-y-4">
      <h1 className="text-2xl font-bold">Items for sale</h1>
      <div className="grid grid-cols-4 gap-8">
        {items.map((item) => (
          <ItemCards key={item.id} item={item} />
        ))}
      </div>
    </main>
  );
}
