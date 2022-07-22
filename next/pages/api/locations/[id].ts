import { Location } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "lib/prisma";

type Response = Location | { message: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  const id = req.query.id as string;

  switch (req.method) {
    case "GET":
      {
        const location = await prisma.location
          .findUnique({
            where: { id: id as string },
            include: {
              reviews: { include: { user: {} } },
              addedBy: {},
            },
          })
          .catch((reason: any) => {
            res.status(400).json(reason);
          });

        if (location == null) {
          res
            .status(404)
            .json({ message: `No location with id, '${id}', exists` });
        } else {
          res.status(200).json(location);
        }
      }
      break;

    default:
      res.status(405).json({
        message: `Method, '${req.method}', is not allowed for this endpoint`,
      });
  }
}
