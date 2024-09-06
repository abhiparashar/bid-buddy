"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createItemActions, createUploadUrlAction } from "./actions";

export default function CreatePage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const form = e.currentTarget as HTMLFormElement;
      const formData = new FormData(form);
      const file = formData.get("file") as File;
      const name = formData.get("name") as string;
      const startingPrice = parseInt(formData.get("startingPrice") as string);
      const priceInCents = Math.floor(startingPrice * 100);

      // Get upload URL
      const uploadUrl = await createUploadUrlAction(file.name, file.type);

      // // Upload file
      // const uploadFormData = new FormData();
      // uploadFormData.append("file", file);
      const uploadResponse = await fetch(uploadUrl, {
        method: "PUT",
        body: file,
      });

      if (!uploadResponse.ok) {
        throw new Error("Failed to upload file");
      }

      // Create item
      await createItemActions({
        name: name,
        startingPrice: priceInCents,
        fileName: file.name,
      });

      form.reset();
    } catch (error) {
      console.error("Error posting item:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="container mx-auto py-12 space-y-4">
      <h1 className="text-4xl font-bold mb-2">Post an item </h1>
      <form
        className="flex flex-col border p-8 rounded-xl space-y-4 max-w-lg"
        onSubmit={handleSubmit}
      >
        <Input
          required
          className="max-w-lg"
          name="name"
          placeholder="Item name"
        />
        <Input
          required
          className="max-w-lg"
          name="startingPrice"
          type="number"
          step="0.01"
          min="0"
          placeholder="Starting price"
        />
        <Input required type="file" name="file" accept="image/*" />
        <Button
          className="self-end"
          variant="default"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Posting..." : "Post Item"}
        </Button>
      </form>
    </main>
  );
}
