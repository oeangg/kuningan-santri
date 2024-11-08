"use client";

import { useActionState } from "react";
import { EditUserProfile } from "@/actions.other/user-edit";
import clsx from "clsx";

export const FormUserEdit = ({ findUser }) => {
  const [state, formAction, isPending] = useActionState(EditUserProfile, null);

  const ClassName = clsx("font-light text-center text-xs -mt-2", {
    "text-teal-500": state?.status === "OK",
    "text-red-500": state?.status === "error",
  });
  return (
    <form
      action={formAction}
      className="grid max-w-sm space-y-2 text-lg font-normal text-sky-500"
    >
      <input type="text" name="id" defaultValue={findUser.User.id} hidden />
      <input
        type="text"
        name="name"
        defaultValue={findUser.User.name}
        className="input-primary"
      />
      <input
        type="text"
        name="email"
        defaultValue={findUser.User.email}
        className="input-primary disabled:bg-slate-100 disabled:text-sky-200"
        disabled
      />
      <button className="w-full rounded-lg bg-sky-400 px-3 py-2 text-lg font-normal text-twWhite hover:bg-sky-500 disabled:opacity-30">
        {isPending ? "Updating..." : "Update"}
      </button>
      {state?.message && <p className={ClassName}>{state.message}</p>}
    </form>
  );
};
