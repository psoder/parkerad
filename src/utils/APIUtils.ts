import { NextApiRequest, NextApiResponse } from "next";

type Method = "GET" | "PUT" | "POST" | "DELETE";

export const messages = {
  invalidMethod: (req: NextApiRequest) =>
    `Method, '${req.method}', is not allowed for this endpoint.`,
};

export const invalidMethodResponse = (
  res: NextApiResponse,
  req: NextApiRequest
) => {
  return res.status(405).send(messages.invalidMethod(req));
};

export const unauthorizedRequestResponse = (res: NextApiResponse) => {
  return res.status(401).send("Unauthorized");
};

export const permittedMethods = (
  permittedMethod: Method | Method[],
  method: string
) => {
  if (typeof method === "string") {
    return permittedMethod !== method;
  } else {
    return false;
  }
};

export const uploadImage = async (image: File): Promise<string | null> => {
  const res = await fetch("/api/uploadFile", {
    method: "POST",
    body: JSON.stringify({
      type: image.type,
    }),
  });

  if (res.status >= 300) {
    return null;
  }

  const { url, key } = await res.json();

  // Upload image
  return await fetch(url, {
    method: "PUT",
    headers: {
      "Content-type": image.type,
      "Access-Control-Allow-Origin": "*",
    },
    body: new File([image], key), // Rename image to key
  })
    .then(() => {
      return key;
    })
    .catch(() => {
      return null;
    });
};
