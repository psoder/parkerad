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

    // case "PUT":
    //   {
    //     const review = await prisma.review.findFirst();

    //     const rating = body.rating as number;
    //     const comment = body.comment as string;

    //     if (body.locationId == null && body.userId != null) {
    //       // Create
    //       res.status(409).json({ message: "" });
    //     } else {
    //       await prisma.review.update({
    //         where: { id: id as string },
    //         data: { editDate: new Date(), rating: rating, comment: comment },
    //       });
    //     }
    //   }
    //   break;

    // case "DELETE":
    //   await prisma.review.delete({ where: { id: id as string } });
    //   break;

    default:
      res.status(405).json({
        message: `Method, '${req.method}', is not allowed for this endpoint`,
      });
  }
}
