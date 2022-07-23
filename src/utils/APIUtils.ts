import { NextApiRequest, NextApiResponse } from "next";

export const messages = {
  invalidMethod: (req: NextApiRequest) =>
    `Method, '${req.method}', is not allowed for this endpoint.`,
};

export const invalidMethodResponse = (
  res: NextApiResponse,
  req: NextApiRequest
) => {
  return res.status(405).json({ message: messages.invalidMethod(req) });
};

export const unauthorizedRequestResponse = (
  res: NextApiResponse,
  req: NextApiRequest
) => {
  return res.status(401).json({ message: "Unauthorized" });
};
