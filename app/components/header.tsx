import Image from "next/image";
import React from "react";
import logo from "../../public/logo.png";
import SignOut from "./signOut";
import SignIn from "./signIn";
import { auth } from "@/lib/auth";
import Link from "next/link";

async function Header() {
  const session = await auth();
  return (
    <div className="bg-gray-200 py-2">
      <div className="container flex justify-between items-center">
        <div className="flex items-center gap-12">
          <Link href="/" className="flex items-center gap-1 hover:underline">
            <Image src={logo} alt="logo" width="50" height="50" />
            Bidbuddy.com
          </Link>
          <Link
            href="/items/create"
            className="flex items-center gap-1 hover:underline"
          >
            Auction an item
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <div>{session?.user?.name}</div>
          <div>{session ? <SignOut /> : <SignIn />}</div>
        </div>
      </div>
    </div>
  );
}

export default Header;
