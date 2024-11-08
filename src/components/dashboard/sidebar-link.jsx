import Link from "next/link";
import { IoSchool, IoTodayOutline } from "react-icons/io5";

export const SideBarLink = () => {
  return (
    <div className="px-4">
      <div className="flex flex-col gap-4 text-sky-500">
        <Link
          href="/dashboard"
          className="px- flex w-full items-center gap-3 rounded-2xl border border-sky-400 px-4 py-2 hover:bg-twYellow"
        >
          <IoTodayOutline size={24} />
          <p>News</p>
        </Link>
        <Link
          href="/dashboard/pesantren/add"
          className="flex w-full items-center gap-3 rounded-2xl border border-sky-400 px-4 py-2 hover:bg-twYellow"
        >
          <IoSchool size={24} />
          <p>Pesantren</p>
        </Link>
      </div>
    </div>
  );
};
