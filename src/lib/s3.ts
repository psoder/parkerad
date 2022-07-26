import { S3 } from "aws-sdk";

const s3 = new S3({
  region: process.env.S3_REGION,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY!,
    secretAccessKey: process.env.S3_ACCESS_SECRET!,
  },
});

export default s3;
