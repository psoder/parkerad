import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "lib/prisma";
import { getToken } from "next-auth/jwt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = await getToken({ req });
  const body = JSON.parse(req.body);

  // If the JTW is invalid.
  if (token == null) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // If method isnt POST
  if (req.method !== "POST") {
    return res.status(405).send({ message: "Only POST requests allowed" });
  }

  const location = await prisma.location.create({
    data: {
      locationName: body.locationName,
      coordinates: {
        type: "point",
        coordinates: [+body.latitude, +body.longitude],
      },
      description: body.description,
      image: body.image || null,
      userId: token?.sub!,
    },
  });
  res
    .status(201)
    .json({ message: "Location added sucessfully", location: location });
}
