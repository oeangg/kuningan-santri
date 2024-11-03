import Link from "next/link";
import { IoSchool } from "react-icons/io5";
import { FormRegister } from "@/components/form-register";

export default function Page() {
  return (
    <div className=" max-w-3xl h-4/6 w-full bg-twYellow  border-2 border-twWhite  rounded-3xl flex items-center shadow-xl ">
      <div className="w-2/3 h-[103%] text-sky-400 font-normal text-lg bg-twWhite rounded-3xl p-20 space-y-3 flex flex-col justify-center">
        <div className="-space-y-1">
          <h1 className=" text-2xl font-bold"> Register</h1>
          <h2 className="text-sm font-thin">Create an account to continue</h2>
        </div>
        <FormRegister />
        <p className="text-sm font-thin ">
          Have an accounts?
          <Link href="/login" className="ml-2 text-sky-400 font-bold">
            Login
          </Link>{" "}
        </p>
      </div>
      <div className="w-1/3 h-full text-sky-300 flex flex-col text-base font-bold justify-center items-center ">
        <IoSchool size={64} className="text-sky-400" />
        <h1>
          kuningan
          <span className=" text-xl text-sky-400">santri</span>{" "}
        </h1>
      </div>
    </div>
  );
}
