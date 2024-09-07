import React from "react";
import { Item } from "../db/schema";
import Image from "next/image";
import { getImageUrl } from "../util/files";

function ItemCards({ item }: { item: Item }) {
  return (
    <div
      className="flex flex-col items-center border p-8 rounded-xl space-y-2"
      key={item.id}
    >
      <div style={{ position: "relative", width: "200px", height: "200px" }}>
        <Image
          src={getImageUrl(item.fileKey)}
          alt={item.name}
          layout="fill"
          objectFit="cover"
          unoptimized
        />
      </div>
      <h2 className="text-xl font-bold">{item.name}</h2>
      <p className="text-lg">
        startingPrice: ${(item.startingPrice / 100).toFixed(2)}
      </p>
    </div>
  );
}

export default ItemCards;
