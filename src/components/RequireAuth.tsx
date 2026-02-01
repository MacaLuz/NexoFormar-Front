"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getToken } from "@/lib/authStorage";

export default function RequireAuth({
  children,
  nextOverride,
}: {
  children: React.ReactNode;
  nextOverride?: string;
}) {
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    if (!token) {
      const next = nextOverride || window.location.pathname;
      router.replace(`/login?next=${encodeURIComponent(next)}`);
    }
  }, [router, nextOverride]);

  return <>{children}</>;
}
