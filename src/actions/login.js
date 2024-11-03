"use server";

import { z } from "zod";
import { prisma } from "@/utils/prisma";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

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
  email: z.string().email({ message: "Format email tidak valid" }),
  password: passwordSchema,
});

export async function LoginAcc(_inState, formData) {
  //validasi form user by zod

  const isValidUser = UserSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!isValidUser.success) {
    return {
      Error: isValidUser.error.flatten().fieldErrors,
    };
  }

  const { email, password } = isValidUser.data;

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
