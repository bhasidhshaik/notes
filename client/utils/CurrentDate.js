"use client";

export default function CurrentDate() {
  const date = new Date();

  const day = date.toLocaleString("en-GB", { day: "2-digit" });
  const month = date.toLocaleString("en-GB", { month: "short" });
  const year = date.toLocaleString("en-GB", { year: "numeric" });

  return (
    <span className="text-xl flex items-center gap-2 mt-4 border border-black rounded-4xl justify-center w-fit px-4 py-2">
      <span className=" bg-black rounded-full p-1 text-white w-[34px] h-[34px] flex justify-center items-center " >{day}</span>{" "}
      <span className="">{month}</span>{" "}
      <span>{year}</span>
    </span>
  );
}
