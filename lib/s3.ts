import {
  S3Client,
  ListBucketsCommand,
  ListObjectsV2Command,
  GetObjectCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3Client({
  region: "auto",
  endpoint: `https://a082bd0b370bc24b29e85834b159959e.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: "4820d0754cf5a4ffac80fbc4a2704474",
    secretAccessKey:
      "db57ab0d6404a523ff1054c01baeebe3a3ac08a5e9a2743f120490e9aca69991",
  },
});

export async function getSignedUrlobjectForS3Object(key: string) {
  return await getSignedUrl(
    s3Client,
    new GetObjectCommand({ Bucket: "bud-buddy", Key: key }),
    { expiresIn: 3600 }
  );
}
