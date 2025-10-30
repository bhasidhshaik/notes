"use client";

import Link from "next/link";

export default function RegisterStep1({ form, setForm, handleNext, loading }) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-center mb-4">Create Account</h2>

      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="you@example.com"
          className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Password</label>
        <input
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          placeholder="••••••••"
          className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Confirm Password</label>
        <input
          type="password"
          value={form.confirmPassword}
          onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
          placeholder="••••••••"
          className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-500"
        />
      </div>

      <button
        onClick={handleNext}
        disabled={loading}
        className={`w-full mt-4 py-2 rounded-lg font-semibold text-white transition 
          ${loading ? "bg-slate-400" : "bg-slate-900 hover:bg-slate-800"}`}
      >
        {loading ? "Loading..." : "Next"}
      </button>

      <div>
                  <p className="text-center text-sm text-gray-600">
                     Already have an account?{' '}
                      <Link href="/login" className="text-black font-medium hover:underline">
      
                          Sign in
                      </Link>
                  </p>
              </div>
    </div>
  );
}
