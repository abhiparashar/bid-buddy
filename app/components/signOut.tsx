"use client";
import React from "react";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

function SignOut() {
  return <Button onClick={() => signOut()}>signOut</Button>;
}

export default SignOut;
