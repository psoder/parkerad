import { Location } from "@prisma/client";
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

  await prisma.location.create({
    data: {
      locationName: body.locationName,
      coordinates: {
        type: "point",
        coordinates: [+body.latitude, +body.longitude],
      },
      description: body.description,
      image: body.image,
      userId: body.userId,
    },
  });

  res.status(201).json({ message: "Location added sucessfully" });
}
