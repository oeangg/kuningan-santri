import { IoSchool, IoTodayOutline } from "react-icons/io5";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/utils/prisma";

export default async function Layout({ children }) {
  //cek cookies
  const cookie = await cookies();
  //cek sessionID
  const sessionID = cookie.get("sessionID")?.value;

  if (!sessionID) {
    redirect("/");
  }

  const findUser = await prisma.session.findFirst({
    where: {
      id: sessionID,
    },
    include: {
      User: true,
    },
  });

  //   jika tidak ditemukan keluar
  if (!findUser) {
    redirect("/");
  }

  const nama = findUser.User.name;

  async function LogoutUser() {
    "use server";

    await prisma.session.delete({
      where: {
        id: findUser.id,
      },
    });

    (await cookies()).delete("sessionID");
    redirect("/");
  }

  return (
    <section className="w-full flex h-screen py-4 px-6  bg-twBlue">
      <div className="w-1/6 space-y-16 relative  ">
        <div className="text-lg font-semibold p-4 ">
          <h1 className="text-sky-400">
            kuningan
            <span className=" text-xl  text-sky-500">santri</span>{" "}
          </h1>
        </div>
        <div className="px-8">
          <div className="flex flex-col gap-4 text-sky-500">
            <Link
              href="/dashboard"
              className="flex rounded-2xl gap-3 w-full border border-sky-400 px-4 py-2 items-center hover:bg-twYellow "
            >
              <IoTodayOutline size={24} />
              <p>News</p>
            </Link>
            <Link
              href="/pesantren"
              className="flex rounded-2xl gap-3 w-full border border-sky-400 px-4 py-2 items-center hover:bg-twYellow "
            >
              <IoSchool size={24} />
              <p>Pesantren</p>
            </Link>
          </div>
        </div>
        <div className="absolute bottom-20 left-0   w-full  px-8">
          <form action={LogoutUser}>
            <button className=" bg-sky-500 flex justify-center font-bold  w-full rounded-2xl  px-4 py-2 items-center hover:bg-sky-600">
              Logout
            </button>
          </form>
        </div>
      </div>
      <div className="w-5/6 pb-8 space-y-4 flex flex-col ">
        <div className="bg-twYellow rounded-3xl w-full flex justify-between items-center py-2  text-sky-600 px-6">
          <h1>
            Welcome Back, <span className="font-bold">{nama}</span>
          </h1>
          <Link
            href="/profil"
            className=" flex justify-center text-twWhite items-center rounded-full w-10 h-10 bg-sky-700"
          >
            {nama.charAt(0)}
          </Link>
        </div>
        <div className="bg-twWhite  rounded-3xl w-full h-full p-4 overflow-y-auto">
          {children}
        </div>
      </div>
    </section>
  );
}
