"use client";
import Image from "next/image";
import logo from "../../public/logo.png";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRef, useState, useEffect } from "react";
import {
  NotificationFeedPopover,
  NotificationIconButton,
  useKnockClient,
} from "@knocklabs/react";
import { Button } from "@/components/ui/button";

function Header() {
  const [isVisible, setIsVisible] = useState(false);
  const notifButtonRef = useRef(null);
  const { data: session, status } = useSession();
  const knockClient = useKnockClient();

  useEffect(() => {
    if (status === "authenticated" && session?.user?.id) {
      knockClient.authenticate(session.user.id);
    }
  }, [status, session, knockClient]);

  const handleSignOut = async () => {
    // Clear Knock authentication before signing out
    // knockClient.deauthenticate();
    await signOut({
      callbackUrl: "/",
    });
  };

  return (
    <div className="bg-gray-200 py-2">
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="flex items-center gap-12">
          <Link href="/" className="flex items-center gap-1 hover:underline">
            <Image src={logo} alt="logo" width="50" height="50" />
            Bidbuddy.com
          </Link>
          {status === "authenticated" && session && (
            <>
              <Link
                href="/items/create"
                className="flex items-center gap-1 hover:underline"
              >
                All Auctions
              </Link>
              <Link
                href="/items/create"
                className="flex items-center gap-1 hover:underline"
              >
                Auction an item
              </Link>
              <Link
                href="/auctions"
                className="flex items-center gap-1 hover:underline"
              >
                My Auctions
              </Link>
            </>
          )}
        </div>
        <div className="flex items-center gap-4">
          {status === "authenticated" && session && (
            <>
              <NotificationIconButton
                ref={notifButtonRef}
                onClick={(e) => setIsVisible(!isVisible)}
              />
              <NotificationFeedPopover
                buttonRef={notifButtonRef}
                isVisible={isVisible}
                onClose={() => setIsVisible(false)}
              />
            </>
          )}
          {session?.user.image && (
            <Image
              src={session?.user.image}
              alt={"avatar image"}
              height={50}
              width={50}
              className="rounded-full"
            />
          )}
          <div className="font-semibold">{session?.user?.name}</div>
          <div>
            {status === "authenticated" ? (
              <Button onClick={handleSignOut}>Sign Out</Button>
            ) : (
              <Button onClick={() => signIn()}>Sign In</Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
