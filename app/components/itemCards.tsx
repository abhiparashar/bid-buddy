import React from "react";
import { Item } from "../db/schema";
import Image from "next/image";
import { getImageUrl } from "../util/files";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { convertToDollar } from "../util/currency";

function ItemCards({ item }: { item: Item }) {
  return (
    <div
      className="flex flex-col items-center border p-8 rounded-xl space-y-2"
      key={item.id}
    >
      <Image
        src={getImageUrl(item.fileKey)}
        alt={item.name}
        objectFit="cover"
        unoptimized
        height={200}
        width={200}
      />
      <h2 className="text-xl font-bold">{item.name}</h2>
      <p className="text-lg">
        startingPrice: ${convertToDollar(item.startingPrice)}
      </p>
      <Button asChild>
        <Link href={`/items/${item.id}`}>Place bid</Link>
      </Button>
    </div>
  );
}

export default ItemCards;
