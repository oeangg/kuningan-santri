import Link from "next/link";
import { SideBarLink } from "./sidebar-link";

export const SideBarTop = ({ nama }) => {
  return (
    <div className="flex flex-col gap-20 px-5 py-3 text-lg font-semibold">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-sky-400">
          kuningan
          <span className="text-xl text-sky-500">santri</span>{" "}
        </h1>
        <Link
          href="/dashboard/user/edit"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-700 text-twWhite"
        >
          {nama.charAt(0)}
        </Link>
      </div>
      <div>
        <SideBarLink />
      </div>
    </div>
  );
};
