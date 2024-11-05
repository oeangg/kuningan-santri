import Link from "next/link";

export const Header = ({ nama }) => {
  return (
    <div className="flex w-full items-center justify-between rounded-3xl bg-twYellow px-6 py-2 text-sky-600">
      <h1>
        Welcome Back, <span className="font-bold">{nama}</span>
      </h1>
      <Link
        href="/dashboard/user/edit"
        className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-700 text-twWhite"
      >
        {nama.charAt(0)}
      </Link>
    </div>
  );
};
