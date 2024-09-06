import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createItemActions } from "./actions";

export default async function CreatePage() {
  return (
    <main className="container mx-auto py-12 space-y-4">
      <h1 className="text-4xl font-bold mb-2">Post an item </h1>
      <form
        className="flex flex-col border p-8 rounded-xl space-y-4 max-w-lg"
        action={createItemActions}
      >
        <Input className="max-w-lg" name="name" placeholder="item-name" />
        <Button className="self-end" variant="default" type="submit">
          Post your Item
        </Button>
      </form>
    </main>
  );
}
