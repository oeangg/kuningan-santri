import Link from "next/link";

export const Footer = ({ label }) => {
  return (
    <p className="text-sm font-thin">
      {label === "login" ? `Don't have accounts?` : `Have an accounts?`}
      <Link
        href={label === "login" ? `/register` : `/login`}
        className="ml-2 font-bold text-sky-400"
      >
        {label === "login" ? `Register` : `Login`}
      </Link>{" "}
    </p>
  );
};
