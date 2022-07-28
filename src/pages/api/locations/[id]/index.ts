import { Location } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "lib/prisma";
import { invalidMethodResponse, permittedMethods } from "utils/APIUtils";

type Response = Location | { message: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  if (permittedMethods("GET", req.method!)) {
    return invalidMethodResponse(res, req);
  }

  const id = req.query.id as string;

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
    res.status(404).send({ message: `No location with id, '${id}', exists` });
  } else {
    res.status(200).json(location);
  }
}
