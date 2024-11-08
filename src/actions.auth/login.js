"use server";

import { prisma } from "@/utils/prisma";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";

export async function LoginAcc(_inState, formData) {
  //validasi form user by zod

  const { email, password } = Object.fromEntries(formData.entries());

  // cek email
  const findUser = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (!findUser) {
    return {
      status: "error",
      message: "Email tidak ditemukan, silahkan login kembali!",
    };
  }

  //cek password
  const isPasswordMatch = await bcrypt.compare(password, findUser.password);

  if (!isPasswordMatch) {
    return { status: "error", message: "Password Salah!" };
  }

  //{ status: "error", message: "Password Salah!" };

  //cek jika masih ada session aktif
  const findSession = await prisma.session.findFirst({
    where: {
      userID: findUser.id,
    },
  });

  if (findSession) {
    await prisma.session.delete({
      where: {
        userID: findSession.userID,
      },
    });
  }

  //jika password benar buat session
  //jika session sudah tidak aktif
  const sessionID = await prisma.session.create({
    data: {
      userID: findUser.id,
    },
  });

  // //buat cookies
  const cookiesID = await cookies();

  cookiesID.set("sessionID", sessionID.id);
  // redirect("/dashboard");
}
