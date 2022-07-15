import { Review } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = JSON.parse(req.body);

  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST requests allowed" });
    return;
  }

  if (
    await prisma.review.findFirst({
      where: {
        userId: body.userId,
        locationId: body.locationId,
      },
    }).catch(() => {console.log("gekl;kl;d");
    })
  ) {
    res.status(200).json({
      message: `There is already a review with the userId,'${body.userId}', and locationId, '${body.locationId}'.`,
    });
    return;
  }

  await prisma.review.create({
    data: {
      userId: body.userId,
      locationId: body.locationId,
      rating: +body.rating as number,
      comment: body.comment,
    },
  });

  let rev = await prisma.review.findMany({
    where: {
      userId: body.userId as string,
      locationId: body.locationId as string,
    },
  });

  console.log(rev);

  res.status(201).json({ message: "Review created sucessfully" });
}
