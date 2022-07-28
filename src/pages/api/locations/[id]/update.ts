import { NextApiRequest, NextApiResponse } from "next";
import prisma from "lib/prisma";
import {
  invalidMethodResponse,
  permittedMethods,
  unauthorizedRequestResponse,
} from "utils/APIUtils";
import { getToken } from "next-auth/jwt";
import { isValidCoordinate } from "utils/LocationUtils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (permittedMethods("PUT", req.method!)) {
    return invalidMethodResponse(res, req);
  }

  const token = await getToken({ req });
  const body = JSON.parse(req.body);
  const locationId = req.query.id as string;

  const addedById = (
    await prisma.location.findUnique({ where: { id: locationId } })
  )?.addedById;

  if (
    token?.sub != addedById ||
    (token?.role != "ADMIN" && token?.sub != addedById)
  ) {
    return unauthorizedRequestResponse(res);
  }

  let coordinates: { type: string; coordinates: number[] } | null = null;

  if (body.latitude != null || body.longitude != null) {
    if (
      !isValidCoordinate(+body.latitude) ||
      !isValidCoordinate(+body.longitude)
    ) {
      return res.status(400).json({
        message: `Invalid coordinates,  Latitude: '${body.latitude}', Longitude: '${body.longitude}'`,
      });
    } else {
      coordinates = {
        type: "point",
        coordinates: [+body.latitude, +body.longitude],
      };
    }
  }

  console.log("BODY: ", body);
  console.log("COORDINATES: ", coordinates);
  console.log("LAT: ", "hello" && body.latitude != null);

  const location = await prisma.location.update({
    where: { id: locationId },
    data: {
      locationName: body.locationName || undefined,
      description: body.description || undefined,
      coordinates: coordinates || undefined,
      image: body.imageUrl || undefined,
    },
  });

  res.status(200).json({ location: location });
}
