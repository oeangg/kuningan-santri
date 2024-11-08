import { redirect } from "next/navigation";

import { CekCookies } from "@/lib/cek-cookies";
import { IsSessionActive } from "@/actions.other/session.find";
import { SideBarTop } from "@/components/dashboard/sidebar-top";
import { FormLogout } from "@/components/form/form-auth.logout";
import { Header } from "@/components/dashboard/header";

export default async function Layout({ children }) {
  //cek cookies
  const cookiesSessionID = await CekCookies();

  if (!cookiesSessionID) {
    redirect("/");
  }

  const findUser = await IsSessionActive(cookiesSessionID);

  //   jika user tidak ditemukan keluar
  if (!findUser) {
    redirect("/");
  }

  const nama = findUser.User.name;
  const sessionID = findUser.id; //sessionID

  return (
    <section className="flex w-full flex-col">
      <Header nama={nama} />

      <div className="fixed bottom-0 left-0 top-0 flex w-1/6 flex-col justify-between border-r-2 bg-twBlue p-1">
        <SideBarTop nama={nama} />
        <FormLogout sessionID={sessionID} />
      </div>

      {children}
    </section>
  );
}
