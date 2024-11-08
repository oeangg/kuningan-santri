import { cookies } from "next/headers";

export const CekCookies = async () => {
  const cookie = await cookies();

  const sessionID = cookie.get("sessionID")?.value;

  return sessionID;
};
