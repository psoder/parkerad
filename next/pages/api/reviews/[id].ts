import { Review } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "lib/prisma";

type Response = Review | { message: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  const { body } = req.body;
  const id = req.query.id as string;

  switch (req.method) {
    case "GET":
      {
        const review = await prisma.review
          .findUnique({
            where: { id: id as string },
            include: { location: {}, user: {} },
          })
          .catch((reason: any) => {
            res.status(400).json(reason);
          });

        if (review == null) {
          res
            .status(404)
            .json({ message: `No review with id, '${id}', exists` });
        } else {
          res.status(200).json(review);
        }
      }
      break;

    default:
      res.status(405).json({
        message: `Method, '${req.method}', is not allowed for this endpoint`,
      });
  }
}
