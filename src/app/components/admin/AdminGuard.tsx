"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "../../lib/AuthContext";

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const { accessToken, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (!isLoading && !accessToken && !isLoginPage) {
      router.push("/admin/login");
    }
  }, [isLoading, accessToken, isLoginPage, router]);

  if (isLoading) {
    return <p className="text-white p-8">Checking session...</p>;
  }

  if (!accessToken && !isLoginPage) {
    return null; // redirecting, render nothing
  }

  return <>{children}</>;
}