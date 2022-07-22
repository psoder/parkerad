import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.status(200).json(
    await prisma.location.findMany({
      include: { reviews: { include: { user: {} } }, addedBy: {} },
    })
  );
}
