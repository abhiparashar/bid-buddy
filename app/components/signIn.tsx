"use client";
import React from "react";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";

function SignIn() {
  return <Button onClick={() => signIn()}>signIn</Button>;
}

export default SignIn;
