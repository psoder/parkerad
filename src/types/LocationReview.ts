import type { Location, Review, User } from "@prisma/client";

export type LocationReview = Location & {
  reviews: UserReview[];
};

export type UserReview = Review & {
  user: User;
};
