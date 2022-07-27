import * as PrismaTypes from "@prisma/client";

export type User = PrismaTypes.User & {
  locationsAdded: (PrismaTypes.Location & { reviews: PrismaTypes.Review[] })[];
  reviews: (PrismaTypes.Review & {
    location: PrismaTypes.Location;
  })[];
};

export type Location = PrismaTypes.Location & { reviews: PrismaTypes.Review[] };
