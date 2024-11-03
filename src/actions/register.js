"use server";

import { z } from "zod";
import { prisma } from "@/utils/prisma";
import bcrypt from "bcrypt";

//chema password by zod
const passwordSchema = z
  .string()
  .min(8, { message: "Kata sandi harus terdiri minimal 8 karakter" })
  .regex(/(?=.*?[A-Z])/, {
    message: "Kata sandi harus mengandung setidaknya satu huruf besar",
  })
  .regex(/(?=.*?[0-9])/, {
    message: "Kata sandi harus mengandung setidaknya satu angka",
  });

//schema user by zod
const UserSchema = z.object({
  name: z.string().min(5, { message: "Nama harus terdiri minimal 5 karakter" }),
  email: z.string().email({ message: "Format email tidak valid" }),
  password: passwordSchema,
});

export async function RegisterAcc(_inState, formData) {
  //validasi form user by zod

  const isValidUser = UserSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!isValidUser.success) {
    return {
      Error: isValidUser.error.flatten().fieldErrors,
    };
  }

  const { name, email, password } = isValidUser.data;

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
