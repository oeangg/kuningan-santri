"use server";

import { prisma } from "@/utils/prisma";
import bcrypt from "bcrypt";

export async function RegisterAcc(_inState, formData) {
  const { name, email, password } = Object.fromEntries(formData.entries());

  //cek jika ada email sama
  const findEmail = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (findEmail) {
    return { succed: false, message: "Email sudah ada, isikan yang lain!!" };
  }
  //hash password
  const hashPassword = await bcrypt.hash(password, 12);

  //save to DB
  try {
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashPassword,
      },
    });
    return { succed: true, message: "Berhasil register data,silahkan Login!" };
  } catch (error) {
    console.log(error);
    return { succed: false, message: "Gagal register data" };
  }
}
