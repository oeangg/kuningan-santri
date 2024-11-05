import { redirect } from "next/navigation";
import { prisma } from "@/utils/prisma";
import { CekSession } from "@/lib/cek-session";
import { SideBarTop } from "@/components/dashboard/sidebar-top";
import { SideBarLink } from "@/components/dashboard/sidebar-link";
import { SideBarLogout } from "@/components/dashboard/sidebar-logout";
import { Header } from "@/components/dashboard/header";

export default async function Layout({ children }) {
  //cek cookies
  const isSessionActive = await CekSession();

  if (!isSessionActive) {
    redirect("/");
  }

  const findUser = await prisma.session.findFirst({
    where: {
      id: isSessionActive,
    },
    include: {
      User: true,
    },
  });

  //   jika user tidak ditemukan keluar
  if (!findUser) {
    redirect("/");
  }

  const nama = findUser.User.name;
  const sessionID = findUser.id; //sessionID

  return (
    <section className="flex h-screen w-full bg-twBlue px-6 py-4">
      <div className="relative w-1/6 space-y-16">
        <SideBarTop />
        <SideBarLink />
        <SideBarLogout sessionID={sessionID} />
      </div>
      <div className="flex w-5/6 flex-col space-y-4 pb-8">
        <Header nama={nama} />
        <div className="h-full w-full overflow-y-auto rounded-3xl bg-twWhite p-4">
          {children}
        </div>
      </div>
    </section>
  );
}
