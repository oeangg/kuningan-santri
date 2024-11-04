"use server";

import { prisma } from "@/utils/prisma";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function LoginAcc(_inState, formData) {
  //validasi form user by zod

  const { email, password } = Object.fromEntries(formData.entries());

  //cek email
  const findUser = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (!findUser) {
    return { succed: false, message: "Email tidak ditemukan!" };
  }

  //cek password
  const isPasswordMatch = await bcrypt.compare(password, findUser.password);

  if (!isPasswordMatch) {
    return { succed: false, message: "Password Salah!" };
  }

  //jika password benar buat session
  const sessionID = await prisma.session.create({
    data: {
      userID: findUser.id,
    },
  });

  //buat cookies
  const cookiesID = await cookies();

  cookiesID.set("sessionID", sessionID.id);
  console.log("Login sukses!");
  redirect("/dashboard");
}
