import { Review } from "@prisma/client";
import { LocationReview, UserReview } from "types/LocationReview";

/**
 * Calculates the average rating of a location.
 *
 * @param locationReview is the locations and reviews to use.
 * @returns the average rating for the location. If there are no reviews 0 is returned.
 */
export const averageRating = (locationReview: LocationReview) => {
  if (locationReview?.reviews.length <= 0) return 0;

  return (
    locationReview?.reviews
      .map((review) => review.rating)
      .reduce((acc, rating) => acc + rating, 0) / locationReview?.reviews.length
  );
};

export enum Comparitor {
  RATING = "rating",
  WEIGHTED_RATING = "weightedRating",
  NO_RATINGS = "noRatings",
  DATE_ADDED = "dateAdded",
}

/**
 * Returns a comparitor for `LocationReview`s based on the provided enum.
 *
 * @param comparitor the type of comparitor.
 * @returnsa comparitor that compares two `LocationReview`.
 */
export function getComparitor(
  comparitor: Comparitor
): (a: LocationReview, b: LocationReview) => number {
  switch (comparitor) {
    default:
    case Comparitor.RATING:
      return (a: LocationReview, b: LocationReview) => {
        return averageRating(a) - averageRating(b);
      };

    case Comparitor.WEIGHTED_RATING:
      return (a: LocationReview, b: LocationReview) => {
        const reviewSum = (reviews: Review[]) => {
          return reviews.reduce((acc, review) => acc + review.rating, 0);
        };
        return reviewSum(a.reviews) - reviewSum(b.reviews);
      };

    case Comparitor.NO_RATINGS:
      return (a: LocationReview, b: LocationReview) => {
        return a.reviews.length - b.reviews.length;
      };

    case Comparitor.DATE_ADDED:
      return (a: LocationReview, b: LocationReview) => {
        return a.dateAdded.getTime() - b.dateAdded.getTime();
      };
  }
}
