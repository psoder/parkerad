import type { NextApiRequest, NextApiResponse } from "next";
import { Bench } from "types/BenchTypes";
import { benches } from "utils/fippel";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Bench>
) {
  res.status(200).json(benches[+req.query.id]);
}
