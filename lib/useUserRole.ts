"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";

export type UserRole = "user" | "moderator" | "admin";

export function useUserRole() {
  const { isSignedIn, isLoaded } = useUser();
  const [role, setRole] = useState<UserRole>("user");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!isLoaded) return;
    if (!isSignedIn) {
      setRole("user");
      setLoaded(true);
      return;
    }

    fetch("/api/user/me")
      .then((r) => r.json())
      .then((data) => setRole(data.role ?? "user"))
      .catch(() => setRole("user"))
      .finally(() => setLoaded(true));
  }, [isSignedIn, isLoaded]);

  const isAdmin = role === "admin" || role === "moderator";

  return { role, isAdmin, loaded };
}
