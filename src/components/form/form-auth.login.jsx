"use client";

import { useActionState, useState } from "react";
import { LoginAcc } from "@/actions.auth/login";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

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

  const [eye, setEye] = useState(true);

  function SeePassword() {
    setEye(!eye);
  }

  async function validasiUser(formData) {
    const isValidUser = UserSchema.safeParse(
      Object.fromEntries(formData.entries()),
    );

    if (!isValidUser.success) {
      setErorrs(isValidUser.error.flatten().fieldErrors);
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
      <form action={validasiUser} className="space-y-3 text-base font-normal">
        <div className="flex w-full flex-col">
          <label htmlFor="">Email</label>
          <input
            type="text"
            name="email"
            placeholder="Input Email ..."
            className="input-primary"
          />
          {/* tampilkan error validasi */}
          {errors?.email && (
            <p className="-mt-0 cursor-pointer text-center text-xs font-light text-red-500">
              {errors.email}
            </p>
          )}
        </div>
        <div className="relative flex w-full flex-col">
          <label htmlFor="">Password</label>
          <input
            type={eye ? "password" : "text"}
            name="password"
            placeholder="Input Password ..."
            className="input-primary"
          />
          <p
            className="absolute right-5 top-9 cursor-pointer"
            onClick={SeePassword}
          >
            {eye ? <IoEyeOffOutline size={20} /> : <IoEyeOutline size={20} />}
          </p>

          {/* tampilkan error validasi */}
          {errors?.password && (
            <p className="-mt-0 text-center text-xs font-light leading-3 text-red-500">
              {errors.password}
            </p>
          )}
        </div>
        <button className="disabled:opacity-30" disabled={isPending}>
          {isPending ? "Login..." : "Login"}
        </button>

        {state?.message && <p className={ClassName}>{state.message}</p>}
      </form>
    </div>
  );
};
