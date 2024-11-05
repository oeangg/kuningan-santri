import { CekSession } from "@/lib/cek-session";
import { prisma } from "@/utils/prisma";
import { redirect } from "next/navigation";
import { FormUserEdit } from "@/components/form/form-user.edit";

export default async function Page() {
  const isSessionActive = await CekSession();

  if (!isSessionActive) {
    redirect("/");
  }

  const findUser = await prisma.session.findFirst({
    where: {
      id: isSessionActive,
    },
    include: {
      User: true,
    },
  });

  return (
    <div className="flex h-full w-full flex-col justify-start p-16">
      <div className="mx-auto w-1/2">
        <h1 className="text-2xl font-bold text-sky-500">Edit Profil</h1>
        <p className="mb-4 text-sm font-normal text-sky-400">
          Edit Your Profile
        </p>
        <FormUserEdit findUser={findUser} />
      </div>
    </div>
  );
}
