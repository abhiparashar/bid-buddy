import Image from "next/image";
import { database } from "./db/database";
import { bids as bidSchema, items as itemsSchema } from "./db/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { revalidatePath } from "next/cache";
import SignIn from "./components/signIn";
import { getServerSession } from "next-auth";
import { v4 as uuidv4 } from "uuid";
import { useSession } from "next-auth/react";

export default async function Home() {
  const items = await database.query.items.findMany();
  console.log(items);
  return (
    <main className="container mx-auto py-12">
      {<SignIn />}
      <form
        action={async (formData: FormData) => {
          "use server";
          await database?.insert(itemsSchema).values({
            id: uuidv4(),
            name: formData.get("name") as string,
          });
          revalidatePath("/");
        }}
      >
        <Input name="name" placeholder="item-name" />
        <Button variant="default" type="submit">
          Post your Item
        </Button>
      </form>
      {items.map((item) => {
        return <div key={item.id}>{item.name}</div>;
      })}
    </main>
  );
}
