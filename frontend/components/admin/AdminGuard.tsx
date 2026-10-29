"use client";

import { useEffect, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import { getToken } from "@/lib/admin-api";

const subscribe = (cb: () => void) => {
  window.addEventListener("storage", cb);
  return () => window.removeEventListener("storage", cb);
};

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  // During hydration this is `false` (server snapshot), so the redirect below
  // must read the real token instead of relying on this value.
  const authed = useSyncExternalStore(subscribe, () => !!getToken(), () => false);

  useEffect(() => {
    if (!getToken()) router.replace("/admin/login/");
  }, [router]);

  return authed ? <>{children}</> : null;
}
