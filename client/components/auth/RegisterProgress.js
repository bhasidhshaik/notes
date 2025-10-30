"use client";
export default function RegisterProgressBar({ step }) {
  return (
    <div className="flex items-center justify-center mb-6">
      <div
        className={`h-2 w-1/2 rounded-l-full transition-all duration-300 ${
          step === 1 ? "bg-slate-900" : "bg-slate-400"
        }`}
      ></div>
      <div
        className={`h-2 w-1/2 rounded-r-full transition-all duration-300 ${
          step === 2 ? "bg-slate-900" : "bg-slate-400"
        }`}
      ></div>
    </div>
  );
}
