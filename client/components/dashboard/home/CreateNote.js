import { CiCirclePlus } from "react-icons/ci";
import React from 'react'
import CurrentDate from "@/utils/CurrentDate";

const CreateNote = () => {
  return (
    <div className="border p-4 rounded-4xl mb-6 cursor-pointer hover:shadow-md transition bg-white flex flex-col lg:flex-1 lg:max-h-fit lg:p-5">
        <div className=" flex justify-between items-center mb-4">
            <h3 className=" text-black text-2xl ">Create Note</h3>
            <div>
            <CiCirclePlus size={40} />
            </div>
        </div>
        <div>
            <span className=" block max-w-fit p-5 py-3 bg-black text-white rounded-full text-xl">Today</span>
        </div>
        <div className=" mb-1.5">
           <CurrentDate />
        </div>
        <div>
            <p>Create your today's note now.</p>
        </div>
    </div>
  )
}

export default CreateNote