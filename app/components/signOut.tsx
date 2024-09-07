import React from "react";
import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/auth";

export function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut({
          redirectTo: "/",
        });
      }}
    >
      <Button type="submit">Sign Out</Button>
    </form>
  );
}
