import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "lib/prisma";
import { getToken } from "next-auth/jwt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = await getToken({ req });
  const { id } = req.query;

  // If the JTW is invalid or wrong id.
  if (token == null || token.sub != id) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // If method isnt POST
  if (req.method !== "GET") {
    return res.status(405).send({ message: "Only GET requests allowed" });
  }

  res.status(200).json(
    await prisma.user.findUnique({
      where: { id: token.sub },
      include: {
        locationsAdded: true,
        reviews: { include: { location: true } },
      },
    })
  );
}
