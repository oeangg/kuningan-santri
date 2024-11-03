import Link from "next/link";
import { IoSchool } from "react-icons/io5";
import { FormLogin } from "@/components/form-login";

export default function Page() {
  return (
    <div className=" max-w-3xl h-4/6 w-full bg-twYellow  border-2 border-twWhite  rounded-3xl flex items-center shadow-xl ">
      <div className="w-1/3 h-full text-sky-300 flex flex-col text-base font-bold justify-center items-center ">
        <IoSchool size={64} className="text-sky-400" />
        <h1>
          kuningan
          <span className=" text-xl text-sky-400">santri</span>{" "}
        </h1>
      </div>
      <div className="w-2/3 h-[103%] text-sky-400 font-normal text-lg bg-twWhite rounded-3xl p-20 space-y-4 flex flex-col justify-center ">
        <div>
          <h1 className=" text-2xl font-bold"> Login</h1>
          <h2 className="text-sm font-thin">
            Welcome back, please login to continue
          </h2>
        </div>
        <FormLogin />
        <p className="text-sm font-thin">
          Don't an accounts?{" "}
          <Link href="/register" className="ml-2 text-sky-400 font-bold">
            Register
          </Link>{" "}
        </p>
      </div>
    </div>
  );
}
