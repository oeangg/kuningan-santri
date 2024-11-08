import { prisma } from "@/utils/prisma";

export async function IsSessionActive(sessionID) {
  const findUser = await prisma.session.findFirst({
    where: {
      id: sessionID,
    },
    include: {
      User: true,
    },
  });

  return findUser;
}
