import Image from "next/image";
import { database } from "./db/database";

function getImageUrl(fileKey: string) {
  return `https://pub-56a7e5852f544d8598594d4fbe082cc2.r2.dev/${fileKey}`;
}

export default async function Home() {
  const items = await database.query.items.findMany();

  return (
    <main className="container mx-auto py-12 space-y-4">
      <h1 className="text-2xl font-bold">Items for sale</h1>
      <div className="grid grid-cols-4 gap-8">
        {items.map((item) => (
          <div className="border p-8 rounded-xl" key={item.id}>
            <div
              style={{ position: "relative", width: "200px", height: "200px" }}
            >
              <Image
                src={getImageUrl(item.fileKey)}
                alt={item.name}
                layout="fill"
                objectFit="cover"
                unoptimized
              />
            </div>
            <div>{item.name}</div>
            <div>startingPrice: ${(item.startingPrice / 100).toFixed(2)}</div>
          </div>
        ))}
      </div>
    </main>
  );
}
