"use client";
import { KnockFeedProvider, KnockProvider } from "@knocklabs/react";
import "@knocklabs/react/dist/index.css";
import { useSession } from "next-auth/react";
import React from "react";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  const session = useSession();
  return (
    <KnockProvider
      apiKey="pk_test_9wpq6fpCu3BA-G5d-DcFsGwOi5hH8c-yugnZYQWeUp8"
      userId={session?.data?.user?.id || ""}
    >
      <KnockFeedProvider feedId="e0fa4475-743d-4a13-abee-c6a0f0bda8eb">
        {children}
      </KnockFeedProvider>
    </KnockProvider>
  );
};
