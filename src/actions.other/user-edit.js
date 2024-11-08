"use server";
import { prisma } from "@/utils/prisma";
import { revalidatePath } from "next/cache";

export async function EditUserProfile(_state, formData) {
  const id = formData.get("id");
  const name = formData.get("name");

  try {
    await prisma.user.update({
      data: {
        name,
      },
      where: {
        id,
      },
    });
    revalidatePath("/dashboard");
    return { status: "OK", message: "Berhasil update data" };
  } catch (error) {
    console.log(error);
    return { status: "error", message: "Gagal update data" };
  }
}
