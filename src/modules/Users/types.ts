import * as PrismaTypes from "@prisma/client";

export type User = PrismaTypes.User & {
  locationsAdded: Location[];
  reviews: PrismaTypes.Review[];
};
