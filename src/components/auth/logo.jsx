import { IoSchool } from "react-icons/io5";

export const Logo = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center p-2 text-base font-bold text-sky-300 sm:w-1/3">
      <IoSchool size={64} className="text-sky-400" />
      <h1>
        kuningan
        <span className="text-xl text-sky-400">santri</span>{" "}
      </h1>
    </div>
  );
};
