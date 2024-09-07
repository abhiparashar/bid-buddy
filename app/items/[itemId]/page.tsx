import { database } from "@/app/db/database";
import { items } from "@/app/db/schema";
import { pageTitle } from "@/app/stryles";
import { Button } from "@/components/ui/button";
import { eq } from "drizzle-orm";
import Image from "next/image";
import Link from "next/link";
import notFoundImg from "../../../public/undraw_delivery_truck.svg";

export default async function ItemPage({
  params: { itemId },
}: {
  params: { itemId: string };
}) {
  const item = await database.query.items.findFirst({
    where: eq(items.id, itemId),
  });
  if (!item || !item.name)
    return (
      <div className="flex flex-col items-center justify-center space-y-8 mt-12">
        <Image src={notFoundImg} height={200} width={200} alt="not found" />
        <h1 className={pageTitle}>Item not found</h1>
        <p className="text-center">
          The item you&apos;re looking for is invalid.
          <br />
          Please go back and search for a different auction Item
        </p>
        <Button asChild>
          <Link href="/auctions">View Auctions</Link>
        </Button>
      </div>
    );
  return (
    <main className="space-y-4">
      <h1 className={pageTitle}>
        <span className="font-normal">Auction for</span>
        {item.name}
      </h1>
    </main>
  );
}
