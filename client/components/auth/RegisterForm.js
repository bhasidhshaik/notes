"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import toast from "react-hot-toast";
import RegisterStep1 from "./RegisterStep1";
import RegisterStep2 from "./RegisterStep2";
import RegisterProgressBar from "./RegisterProgress";
import { FaArrowRightToBracket } from "react-icons/fa6";
import { useAuth } from "@/context/AuthContext";

export default function RegisterForm() {
  const {login} = useAuth()
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    bio: "",
    profile: null,
  });
  const router = useRouter();

  const handleNext = () => {
    if (!form.email || !form.password || !form.confirmPassword) {
      toast.error("All fields are required.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    setStep(2);
  };

  const handleBack = () => setStep(1);

  const handleSubmit = async () => {
    if (!form.name) {
      toast.error("Name is required.");
      return;
    }

    const data = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value) data.append(key, value);
    });

    try {
      setLoading(true);
      const res = await api.post("/auth/register", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      login(res.data);
      toast.success("Account created successfully!");
      // Optionally auto-login
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-linear-to-b from-teal-100 to-neutral-50 rounded-2xl shadow-md">
      <div>
                  <span>
                      <FaArrowRightToBracket size={40} className="text-gray-800 mx-auto mb-2" />
                  </span>
              </div>
      <RegisterProgressBar step={step} />
      {step === 1 ? (
        <RegisterStep1
          form={form}
          setForm={setForm}
          handleNext={handleNext}
          loading={loading}
        />
      ) : (
        <RegisterStep2
          form={form}
          setForm={setForm}
          handleBack={handleBack}
          handleSubmit={handleSubmit}
          loading={loading}
        />
      )}
    </div>
  );
}
