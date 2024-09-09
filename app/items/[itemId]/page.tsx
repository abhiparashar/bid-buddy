import { database } from "@/app/db/database";
import { items } from "@/app/db/schema";
import { pageTitle } from "@/app/stryles";
import { Button } from "@/components/ui/button";
import { eq } from "drizzle-orm";
import Image from "next/image";
import Link from "next/link";
import notFoundImg from "../../../public/undraw_delivery_truck.svg";
import { getImageUrl } from "@/app/util/files";
import { formatDistance } from "date-fns";
import { convertToDollar } from "@/app/util/currency";

function formatTimeStamp(timestamp: Date) {
  return formatDistance(timestamp, new Date(), {
    addSuffix: true,
  });
}

export default async function ItemPage({
  params: { itemId },
}: {
  params: { itemId: string };
}) {
  const item = await database.query.items.findFirst({
    where: eq(items.id, parseInt(itemId)),
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

  const bidItems = [
    {
      id: 1,
      amount: 100,
      userName: "Alice",
      timestamp: new Date(),
    },
    {
      id: 2,
      amount: 200,
      userName: "Bob",
      timestamp: new Date(),
    },
    {
      id: 3,
      amount: 300,
      userName: "Charlie",
      timestamp: new Date(),
    },
  ];
  // const bidItems: any[] = [];
  const hasBids = bidItems.length > 0;
  return (
    <main className="space-y-4">
      <div className="flex gap-8">
        <div className="flex flex-col gap-6">
          <h1 className={pageTitle}>
            <span className="font-normal">Auction for </span>
            {item.name}
          </h1>
          <Image
            src={getImageUrl(item.fileKey)}
            alt={item.name}
            objectFit="cover"
            unoptimized
            height={400}
            width={400}
            className="rounded-xl"
          />
          <div className="text-xl space-y-4">
            Starting Prcie of{" "}
            <span className="font-bold">
              ${convertToDollar(item.startingPrice)}
            </span>
          </div>
          <div>
            Bid interval{" "}
            <span className="font-bold">
              ${convertToDollar(item.bidInterval)}
            </span>
          </div>
        </div>
        <div className="space-y-6 flex-1">
          <h2 className="text-2xl font-bold">Current bids</h2>
          {hasBids ? (
            <>
              <ul className="space-y-4">
                {bidItems.map((bidItem) => {
                  return (
                    <li key={bidItem.id} className="bg-gray-100 rounded-xl p-8">
                      <div className="flex gap-4">
                        <div>
                          <span className="font-bold">${bidItem.amount}</span>{" "}
                          by{" "}
                          <span className="font-bold">{bidItem.userName}</span>{" "}
                        </div>
                        <div>{formatTimeStamp(bidItem.timestamp)}</div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </>
          ) : (
            <>
              <div className="flex flex-col items-center gap-8 bg-gray-100 rounded-xl p-12">
                <Image
                  src={notFoundImg}
                  width={400}
                  height={400}
                  alt="not-found"
                />
                <h2>No bids yet</h2>
                <Button asChild>
                  <Link href={""}>Place a bid</Link>
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
