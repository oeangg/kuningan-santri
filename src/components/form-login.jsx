"use client";

import { useActionState } from "react";
import { LoginAcc } from "@/actions/login";
import clsx from "clsx";

export const FormLogin = () => {
  const [state, formAction, isPending] = useActionState(LoginAcc, null);

  const ClassName = clsx("font-light text-center text-xs -mt-2", {
    "text-teal-500": state?.succed,
    "text-red-500": !state?.succed,
  });

  return (
    <div>
      <form action={formAction} className="font-light text-base space-y-3">
        <div className="flex w-full flex-col">
          <label htmlFor="">Email</label>
          <input
            type="text"
            name="email"
            placeholder="Input Email ..."
            className="px-3 py-2 w-full rounded-lg border border-twBlue placeholder:text-slate-300 placeholder:text-sm placeholder:font-thin focus:outline-none focus:border-2"
          />
          <p
            id="email-error"
            aria-atomic="true"
            aria-live="polite"
            className="text-red-500 text-xs font-light text-center -mt-0"
          >
            {state?.Error?.email}
          </p>
        </div>
        <div className="flex flex-col w-full">
          <label htmlFor="">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Input Password ..."
            className="px-3 py-2 rounded-lg border border-twBlue placeholder:text-slate-300 placeholder:text-sm placeholder:font-thin focus:outline-none focus:border-2"
          />
          <p
            id="password-error"
            aria-atomic="true"
            aria-live="polite"
            className="text-red-500 text-xs font-light text-center -mt-0"
          >
            {state?.Error?.password}
          </p>
        </div>
        <button
          className="px-3 py-2 w-full bg-sky-400 text-twWhite text-lg font-normal rounded-lg hover:bg-sky-500 disabled:opacity-30"
          disabled={isPending}
        >
          {isPending ? "Login..." : "Login"}
        </button>
        <p className={ClassName} aria-live="polite">
          {state?.message}
        </p>
      </form>
    </div>
  );
};
