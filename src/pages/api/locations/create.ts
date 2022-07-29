import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "lib/prisma";
import { getToken } from "next-auth/jwt";
import { isValidCoordinate } from "utils/LocationUtils";
import {
  invalidMethodResponse,
  permittedMethods,
  unauthorizedRequestResponse,
} from "utils/APIUtils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = await getToken({ req });

  // If the JTW is invalid.
  if (token == null) {
    return unauthorizedRequestResponse(res);
  }

  // If method is not permitted
  if (permittedMethods("POST", req.method!)) {
    return invalidMethodResponse(res, req);
  }

  const body = JSON.parse(req.body);

  console.log(body);

  let coordinates: { type: string; coordinates: number[] } | undefined;

  if (isValidCoordinate(+body.latitude) && isValidCoordinate(+body.longitude)) {
    coordinates = {
      type: "point",
      coordinates: [+body.latitude, +body.longitude],
    };
  } else if (body.latitude && body.longitude) {
    return res.status(400).send("Invalid coordinates");
  }

  const location = await prisma.location.create({
    data: {
      locationName: body.locationName,
      coordinates: coordinates || undefined,
      description: body.description || undefined,
      image: body.image || undefined,
      addedById: token?.sub!,
    },
  });
  res
    .status(201)
    .json({ message: "Location added sucessfully", location: location });
}
