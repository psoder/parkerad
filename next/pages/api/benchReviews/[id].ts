import type { NextApiRequest, NextApiResponse } from "next";
import { BenchReview } from "types/BenchTypes";
import { benchReviews } from "utils/fippel";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<BenchReview>
) {
  res.status(200).json(benchReviews[+req.query.id]);
}
