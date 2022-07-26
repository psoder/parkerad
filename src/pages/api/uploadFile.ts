import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "lib/prisma";
import { getToken } from "next-auth/jwt";
import s3 from "lib/s3";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = await getToken({ req });

  // If the JTW is invalid.
  if (token == null) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // If method isnt POST
  if (req.method !== "POST") {
    return res.status(405).send({ message: "Only POST requests allowed" });
  }

  try {
    const { type } = JSON.parse(req.body);

    let extension = "";
    switch (type) {
      case "image/jpeg":
        extension = ".jpg";
        break;
      case "image/png":
        extension = ".png";
        break;
      default:
        return res
          .status(400)
          .json({ message: `${type} is not a suported image type` });
    }

    const key = `locations/IMG_${Math.random()
      .toString(36)
      .substring(2, 13)
      .toUpperCase()}${extension}`;

    const url = await s3.getSignedUrlPromise("putObject", {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: key,
      ContentType: type,
    });

    res.status(201).json({ url: url, key: key });
  } catch (error) {
    res.status(500).json("Something went wrong.");
  }
}

export const config = {
  api: {
    sizeLimit: "8mb",
  },
};
