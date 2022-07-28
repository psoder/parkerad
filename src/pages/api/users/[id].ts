import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "lib/prisma";
import { getToken } from "next-auth/jwt";
import { invalidMethodResponse, permittedMethods } from "utils/APIUtils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (permittedMethods("GET", req.method!)) {
    return invalidMethodResponse(res, req);
  }

  const token = await getToken({ req });
  const { id } = req.query;

  // If the JTW is invalid or wrong id.
  if (token == null || token.sub != id) {
    return res.status(401).json({ message: "Unauthorized" });
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
