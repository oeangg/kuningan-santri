import { cookies } from "next/headers";

export const CekSession = async () => {
  const cookie = await cookies();

  const sessionID = cookie.get("sessionID")?.value;

  return sessionID;
};
