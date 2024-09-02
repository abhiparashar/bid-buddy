import Image from "next/image";
import { database } from "./db/database";
import { bids as bidSchema } from "./db/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { revalidatePath } from "next/cache";

export default async function Home() {
  const bids = await database.query.bids.findMany();
  return (
    <main className="container mx-auto py-12">
      <form
        action={async (formData: FormData) => {
          "use server";
          await database?.insert(bidSchema).values({});
          revalidatePath("/");
        }}
      >
        <Input name="bid" placeholder="Bid" />
        <Button variant="default" type="submit">
          Place bid
        </Button>
      </form>
      {bids.map((bid) => {
        return <div key={bid.id}>{bid.id}</div>;
      })}
    </main>
  );
}
