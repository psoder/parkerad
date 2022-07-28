import { NextApiRequest, NextApiResponse } from "next";
import prisma from "lib/prisma";
import {
  invalidMethodResponse,
  permittedMethods,
  unauthorizedRequestResponse,
} from "utils/APIUtils";
import { getToken } from "next-auth/jwt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (permittedMethods("DELETE", req.method!)) {
    return invalidMethodResponse(res, req);
  }

  const token = await getToken({ req });
  const id = req.query.id as string;

  if (token == null) {
    return unauthorizedRequestResponse(res);
  }

  await prisma.review.delete({
    where: { id: id },
  });

  res.status(200).json({ message: "Successfully deleted review" });
}
