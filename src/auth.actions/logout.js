"use server";

import { prisma } from "@/utils/prisma";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function LogoutUser(formData) {
  const sessionID = formData.get("id");

  // console.log(id);
  await prisma.session.delete({
    where: {
      id: sessionID,
    },
  });

  (await cookies()).delete("sessionID");
  redirect("/");
}
