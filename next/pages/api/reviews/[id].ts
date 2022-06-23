import type { NextApiRequest, NextApiResponse } from "next";
import { Review } from "types/BenchTypes";
import { reviews } from "utils/fippel";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Review>
) {
  res.status(200).json(reviews[+req.query.id]);
}
