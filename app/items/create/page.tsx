"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createItemActions, createUploadUrlAction } from "./actions";

export default function CreatePage() {
  return (
    <main className="container mx-auto py-12 space-y-4">
      <h1 className="text-4xl font-bold mb-2">Post an item </h1>
      <form
        className="flex flex-col border p-8 rounded-xl space-y-4 max-w-lg"
        onSubmit={async (e) => {
          e.preventDefault();
          const form = e.currentTarget as HTMLFormElement;
          const formData = new FormData(form);
          const file = formData.get("file") as File;
          const uploadUrl = await createUploadUrlAction(file.name, file.type);
          const uploadFormData = new FormData();
          uploadFormData.append("file", file);
          await fetch(uploadUrl, {
            method: "PUT",
            body: uploadFormData,
            headers: {
              "Content-type": file.type,
            },
          });
          await createItemActions({
            name: formData.get("name") as string,
            startingPrice: formData.get("startingPrice") as string,
            fileName: file.name,
          });
        }}
      >
        <Input
          required
          className="max-w-lg"
          name="name"
          placeholder="item-name"
        />
        <Input
          required
          className="max-w-lg"
          name="startingPrice"
          type="number"
          placeholder="what is your starting price"
        />
        <Input type="file" name="file" />
        <Button className="self-end" variant="default" type="submit">
          Post Item
        </Button>
      </form>
    </main>
  );
}
