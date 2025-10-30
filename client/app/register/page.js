'use client'

import RegisterForm from "@/components/auth/RegisterForm";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RegisterPage() {

     const { user } = useAuth();
     const router = useRouter();
  
    useEffect(() => {
      if (user) router.replace("/dashboard");
    }, [user, router]);
  return (
    <main className="min-h-screen flex items-center justify-center bg-linear-to-b from-slate-50 to-slate-100 p-6 bg-image">
      <RegisterForm />
    </main>
  );
}
