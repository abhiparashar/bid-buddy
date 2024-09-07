import Image from "next/image";
import React from "react";
import notFoundImg from "../../public/undraw_delivery_truck.svg";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center space-y-8">
      <Image src={notFoundImg} width={200} height={200} alt="not-found" />
      <h2 className="text-2xl font-bold">You have no auctions yet</h2>
      <Button asChild>
        <Link href="/items/create">Create Auction</Link>
      </Button>
    </div>
  );
}
