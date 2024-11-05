"use client";

import { useActionState, useState } from "react";
import { RegisterAcc } from "@/auth.actions/register";
import clsx from "clsx";
import { z } from "zod";

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

export const FormRegister = () => {
  const [state, formAction, isPending] = useActionState(RegisterAcc, null);
  const [errors, setErrors] = useState([]);

  //validasi zod
  async function validasiData(formData) {
    const isValidUser = UserSchema.safeParse(
      Object.fromEntries(formData.entries()),
    );

    if (!isValidUser.success) {
      setErrors(isValidUser.error.flatten().fieldErrors);
      return;
    }

    await formAction(formData);
  }

  const ClassName = clsx("font-light text-center text-xs -mt-2", {
    "text-teal-500": state?.status === "OK",
    "text-red-500": state?.status === "error",
  });

  return (
    <div>
      <form action={validasiData} className="space-y-2 text-base font-light">
        <div className="flex w-full flex-col">
          <label htmlFor="">Full Name</label>
          <input type="text" name="name" placeholder="Input Fullname ..." />

          {errors?.name && (
            <p className="-mt-0 text-center text-xs font-light text-red-500">
              {errors.name}
            </p>
          )}
        </div>
        <div className="flex w-full flex-col">
          <label htmlFor="">Email</label>
          <input type="text" name="email" placeholder="Input Email ..." />
          {errors?.email && (
            <p className="-mt-0 text-center text-xs font-light text-red-500">
              {errors.email}
            </p>
          )}
        </div>
        <div className="flex w-full flex-col">
          <label htmlFor="">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Input Password ..."
          />

          {errors?.password && (
            <p className="-mt-0 text-center text-xs font-light text-red-500">
              {errors.password}
            </p>
          )}
        </div>

        <button className="disabled:opacity-30" disabled={isPending}>
          {isPending ? "Registering..." : "Register"}
        </button>

        {state?.message && <p className={ClassName}>{state.message}</p>}
      </form>
    </div>
  );
};
