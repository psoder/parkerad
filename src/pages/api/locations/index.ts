import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "lib/prisma";
import { invalidMethodResponse, permittedMethods } from "utils/APIUtils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (permittedMethods("GET", req.method!)) {
    return invalidMethodResponse(res, req);
  }

  res.status(200).json(
    await prisma.location.findMany({
      include: { reviews: { include: { user: {} } }, addedBy: {} },
    })
  );
}
