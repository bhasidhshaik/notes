"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";
import { MdOutlineMail } from "react-icons/md";
import { MdLockOutline } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import Link from "next/link";
import { FaArrowRightToBracket } from "react-icons/fa6";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errorMsg, setErrorMsg] = useState("")
  const router = useRouter();
  const { login } = useAuth();


   const { user } = useAuth();

  useEffect(() => {
    if (user) router.replace("/dashboard");
  }, [user, router]);
const [passwordVisible, setPasswordVisible] = useState(false)
  const handleSubmit = async (e) => {
    e.preventDefault();
   try {
  const res = await api.post("/auth/login", form);
  console.log("✅ Login response:", res.data);
  login(res.data, res.data.token);
  toast.success("Welcome back!");
  router.push("/dashboard");
} catch (err) {
  console.error("❌ Login error:", err);
  setErrorMsg(err.response?.data?.message || err.message || "Login failed");
}

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 bg-image">
      <form
        onSubmit={handleSubmit}
        className="bg-linear-to-b from-teal-100 to-neutral-50 p-4 py-10 rounded-3xl shadow-lg w-full max-w-sm space-y-4"
      >
        <div>
            <span>
                <FaArrowRightToBracket size={40} className="text-gray-800 mx-auto mb-2" />
            </span>
        </div>
        <div className="w-full flex items-center flex-col">
            <h3 className=" font-semibold text-black text-2xl mb-1">Sign in with email</h3>
            <p className=" font-normal text-gray-600 text-[12px] text-center">Your all-in-one platform for tracking, analyzing, and improving your notes.</p>
        </div>
        <div className=" mb-2.5">
            <div>
                <div className="flex items-center rounded-lg mb-2.5 px-3 py-2 bg-gray-200 focus-within:ring-1 focus-within:ring-gray-300">
                    <MdOutlineMail className="text-gray-400 mr-2" size={20} />
                    <input

                        type="email"
                        id="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        required
                        className="w-full border-none focus:ring-0 outline-none"
                        placeholder="Enter your email"
                    />
                </div>
            </div>
            <div>
                <div className="flex items-center relative rounded-lg px-3 py-2 bg-gray-200 focus-within:ring-1 focus-within:ring-gray-300">
                    <MdLockOutline
                     className="text-gray-400 mr-2" size={20} />
                    <input
                        type={passwordVisible ? "text" : "password"}
                        id="password"
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                        required
                        className="w-full border-none focus:ring-0 outline-none"
                        placeholder="Enter your password"
                    />
                    <button className=" flex items-center" type="button" onClick={()=> setPasswordVisible(!passwordVisible) }  > 
                       {passwordVisible ?  <FaRegEyeSlash className="text-gray-400 absolute right-3" size={20} /> :  <FaRegEye className="text-gray-400 absolute right-3" size={20} />}
                         </button>
                </div>
            </div>
        </div>
        <div className=" flex justify-end">
            <Link href="/forgot-password" className="text-sm text-black hover:underline">

                Forgot Password?
            </Link>
        </div>

{
    errorMsg && (
        <div>
            <p className=" text-red-600 text-sm"> {errorMsg} </p>
        </div>
    )
}

        <div className="w-full">
            <button type="submit" className="w-full cursor-pointer">
                <span className="w-full bg-linear-to-b from-gray-700 from-3% to-slate-900 to-97% text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors duration-300 block text-center">
                    Sign In
                </span> 

                 </button>
        </div>
        <div>
            <p className="text-center text-sm text-gray-600">
                Don't have an account?{' '}
                <Link href="/register" className="text-black font-medium hover:underline">

                    Sign Up
                </Link>
            </p>
        </div>
       
      </form>
    </div>
  );
}
