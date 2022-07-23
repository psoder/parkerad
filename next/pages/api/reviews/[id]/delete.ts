import { NextApiRequest, NextApiResponse } from "next";
import prisma from "lib/prisma";
import {
  invalidMethodResponse,
  unauthorizedRequestResponse,
} from "utils/APIUtils";
import { getToken } from "next-auth/jwt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = await getToken({ req });
  const id = req.query.id as string;

  if (token == null) {
    return unauthorizedRequestResponse(res, req);
  }

  if (req.method !== "DELETE") {
    return invalidMethodResponse(res, req);
  }

  await prisma.review.delete({
    where: { id: id },
  });

  res.status(200).json({ message: "Successfully deleted review" });
}
