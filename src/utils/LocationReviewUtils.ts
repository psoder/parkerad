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

export type Comparitor = "rating" | "weightedRating" | "noRatings" | "dateAdded";

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
    case "rating":
      return (a: LocationReview, b: LocationReview) => {
        return averageRating(a) - averageRating(b);
      };

    case "weightedRating":
      return (a: LocationReview, b: LocationReview) => {
        const reviewSum = (reviews: Review[]) => {
          return reviews.reduce((acc, review) => acc + review.rating, 0);
        };
        return reviewSum(a.reviews) - reviewSum(b.reviews);
      };

    case "noRatings":
      return (a: LocationReview, b: LocationReview) => {
        return a.reviews.length - b.reviews.length;
      };

    case "dateAdded":
      return (a: LocationReview, b: LocationReview) => {
        return (
          new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime()
        );
      };
  }
}
