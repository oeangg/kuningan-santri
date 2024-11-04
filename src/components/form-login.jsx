"use client";

import { useActionState, useState } from "react";
import { LoginAcc } from "@/actions/login";
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
  email: z.string().email({ message: "Format email tidak valid" }),
  password: passwordSchema,
});

export const FormLogin = () => {
  const [state, formAction, isPending] = useActionState(LoginAcc, null);
  const [errors, setErorrs] = useState("");

  async function validasiUser(formData) {
    const isValidUser = UserSchema.safeParse(
      Object.fromEntries(formData.entries())
    );

    if (!isValidUser.success) {
      setErorrs(isValidUser.error.flatten().fieldErrors);
      return;
    }

    await formAction(formData);
  }

  const ClassName = clsx("font-light text-center text-xs -mt-2", {
    "text-teal-500": state?.succed,
    "text-red-500": !state?.succed,
  });

  return (
    <div>
      <form action={validasiUser} className="font-light text-base space-y-3">
        <div className="flex w-full flex-col">
          <label htmlFor="">Email</label>
          <input
            type="text"
            name="email"
            placeholder="Input Email ..."
            className="px-3 py-2 w-full rounded-lg border border-twBlue placeholder:text-slate-300 placeholder:text-sm placeholder:font-thin focus:outline-none focus:border-2"
          />
          {/* tampilkan error validasi */}
          {errors?.email && (
            <p className="text-red-500 text-xs font-light text-center -mt-0">
              {errors.email}
            </p>
          )}
        </div>
        <div className="flex flex-col w-full">
          <label htmlFor="">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Input Password ..."
            className="px-3 py-2 rounded-lg border border-twBlue placeholder:text-slate-300 placeholder:text-sm placeholder:font-thin focus:outline-none focus:border-2"
          />

          {/* tampilkan error validasi */}
          {errors?.password && (
            <p className="text-red-500 text-xs font-light text-center -mt-0">
              {errors.password}
            </p>
          )}
        </div>
        <button
          className="px-3 py-2 w-full bg-sky-400 text-twWhite text-lg font-normal rounded-lg hover:bg-sky-500 disabled:opacity-30"
          disabled={isPending}
        >
          {isPending ? "Login..." : "Login"}
        </button>
        {state?.message && <p className={ClassName}>{state.message}</p>}
      </form>
    </div>
  );
};
