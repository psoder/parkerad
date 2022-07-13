import { Prisma, Review } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Review | { message: string }>
) {
  const id = req.query.id;

  let review = await prisma.review
    .findUnique({
      where: { id: id as string },
      include: { location: {}, user: {} },
    })
    .catch((reason: any) => {
      res.status(400).json(reason);
    });

  if (review == null) {
    res.status(404).json({ message: `No review with id, '${id}', exists` });
  } else {
    res.status(200).json(review);
  }
}
