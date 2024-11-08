import React from "react";
import { CekCookies } from "@/lib/cek-cookies";
import { redirect } from "next/navigation";

export default async function Layout({ children }) {
  const cookiesSessionID = await CekCookies();

  if (cookiesSessionID) {
    redirect("/dashboard");
  }

  return (
    <section className="flex h-screen w-full items-center justify-center bg-twBlue p-4">
      {children}
    </section>
  );
}
