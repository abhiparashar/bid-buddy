"use server";
import { database } from "@/app/db/database";
import { items as itemsSchema } from "@/app/db/schema";
import { auth } from "@/lib/auth";
import { getSignedUrlobjectForS3Object } from "@/lib/s3";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

export async function createUploadUrlAction(key: string, type: string) {
  return await getSignedUrlobjectForS3Object(key, type);
}

export async function createItemActions({
  fileName,
  name,
  startingPrice,
}: {
  fileName: string;
  name: string;
  startingPrice: number;
}) {
  const session = await auth();
  const user = session?.user;
  if (!session) {
    throw new Error("Unauthorized user");
  }
  if (!user || !user.id) {
    throw new Error("Unauthorized user");
  }
  await database?.insert(itemsSchema).values({
    name,
    startingPrice,
    fileKey: fileName,
    userId: user.id,
  });
  revalidatePath("/");
  redirect("/");
}
