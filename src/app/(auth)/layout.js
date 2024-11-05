import React from "react";
import { CekSession } from "@/lib/cek-session";
import { redirect } from "next/navigation";

export default async function Layout({ children }) {
  const isSessionActive = await CekSession();

  if (isSessionActive) {
    redirect("/dashboard");
  }

  return (
    <section className="flex h-screen w-full items-center justify-center bg-twBlue p-4">
      {children}
    </section>
  );
}
