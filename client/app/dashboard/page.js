"use client";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import HomePage from "@/components/dashboard/home/HomePage";

export default function Dashboard() {
  const { user } = useAuth();
  const router = useRouter();

useEffect(() => {
  if (!user) router.replace("/login");
}, [user]);


  return (
    <div>
      <div>
        <HomePage />
      </div>
    </div>
  );
}
