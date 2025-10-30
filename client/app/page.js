"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Home() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (loading) return; // wait until session check completes

    if (user) router.replace("/dashboard");
    else router.replace("/login");
  }, [user, loading, router]);

  // show loading spinner (optional)
  return loading ? (
    <div className="flex items-center justify-center h-screen text-gray-600">
      Checking session...
    </div>
  ) : null;
}
