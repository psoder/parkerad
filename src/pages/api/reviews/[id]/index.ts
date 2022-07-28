import { Review } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "lib/prisma";
import { invalidMethodResponse, permittedMethods } from "utils/APIUtils";

type Response = Review | { message: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  if (permittedMethods("GET", req.method!)) {
    return invalidMethodResponse(res, req);
  }

  const id = req.query.id as string;

  const review = await prisma.review
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
