import { CekCookies } from "@/lib/cek-cookies";
import { IsSessionActive } from "@/actions.other/session.find";
import { redirect } from "next/navigation";
import { FormUserEdit } from "@/components/form/form-user.edit";
import { Suspense } from "react";

import React from "react";
import Loading from "./loading";

export default async function Page() {
  //cek cookies
  const cookiesSessionID = await CekCookies();

  if (!cookiesSessionID) {
    redirect("/");
  }

  const findUser = await IsSessionActive(cookiesSessionID);

  return (
    <div className="mx-auto mt-24 max-w-3xl">
      <h1 className="text-2xl font-bold text-sky-500">Edit Profil</h1>
      <p className="mb-4 text-sm font-normal text-sky-400">Edit Your Profile</p>
      <Suspense fallback={<Loading />}>
        <FormUserEdit findUser={findUser} />
      </Suspense>
    </div>
  );
}
