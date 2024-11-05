import { FormRegister } from "@/components/form/form-auth.register";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { Tittle } from "@/components/auth/tittle";
import { Footer } from "@/components/auth/footer";
import { Logo } from "@/components/auth/logo";

export default async function Page() {
  const cookie = await cookies();

  const sessionID = cookie.get("sessionID")?.value;

  if (sessionID) {
    redirect("/dashboard");
  }

  return (
    <div className="h-6/7 flex w-full max-w-3xl flex-col items-center rounded-3xl border-2 border-twWhite bg-twYellow shadow-xl sm:h-4/6 sm:flex-row">
      <div className="flex w-[102%] flex-col justify-center space-y-4 rounded-3xl bg-twWhite p-10 text-lg font-normal text-sky-400 sm:h-[102%] sm:w-2/3 sm:p-20">
        <Tittle label="register" />
        <FormRegister />
        <Footer label="register" />
      </div>
      <Logo />
    </div>
  );
}
