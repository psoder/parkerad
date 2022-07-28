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
  if (permittedMethods("PUT", req.method!)) {
    return invalidMethodResponse(res, req);
  }

  const token = await getToken({ req });
  const body = JSON.parse(req.body);
  const id = req.query.id as string;

  if (
    token == null ||
    (await prisma.review.findUnique({ where: { id: id } }))?.userId != token.sub
  ) {
    return unauthorizedRequestResponse(res);
  }

  await prisma.review.update({
    where: { id: id },
    data: {
      rating: +body.rating || undefined,
      comment: body.comment || undefined,
      editDate: new Date(),
    },
  });

  res.status(200).json({ message: "Successfully updated review" });
}
