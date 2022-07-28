import { Review } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "lib/prisma";
import { getToken } from "next-auth/jwt";
import { invalidMethodResponse, permittedMethods } from "utils/APIUtils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (permittedMethods("POST", req.method!)) {
    return invalidMethodResponse(res, req);
  }

  const token = await getToken({ req });
  const body = JSON.parse(req.body);

  // If the JTW is invalid.
  if (token == null) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // If there already exists a review from the user on the location.
  if (
    await prisma.review.findFirst({
      where: {
        userId: token?.sub,
        locationId: body.locationId,
      },
    })
  ) {
    return res.status(200).json({
      message: `There is already a review with the userId,'${token?.sub}', and locationId, '${body.locationId}'.`,
    });
  }

  await prisma.review.create({
    data: {
      userId: token?.sub!,
      locationId: body.locationId,
      rating: +body.rating,
      comment: body.comment,
    },
  });

  res.status(201).json({ message: "Review created sucessfully" });
}
