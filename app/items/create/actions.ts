"use server";
import { database } from "@/app/db/database";
import { items as itemsSchema } from "@/app/db/schema";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { v4 as uuidv4 } from "uuid";

export async function createItemActions(formData: FormData) {
  const session = await auth();
  const user = session?.user;
  if (!session) {
    throw new Error("unauthorized user");
  }
  if (!user || !user.id) {
    throw new Error("unauthorized user");
  }
  await database?.insert(itemsSchema).values({
    id: uuidv4(),
    name: formData.get("name") as string,
    userId: user.id,
  });
  revalidatePath("/");
}
