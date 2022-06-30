import Image from "next/image";
import Link from "next/link";
import styles from "./Bench.module.css";
import { LocationReview, UserReview } from "types/LocationReview";
import { Review, User } from "@prisma/client";

interface LocationProps {
  location: LocationReview;
}

const LocationComponent = ({ location }: LocationProps) => {
  const reviews = location.reviews;

  let lat = location.coordinates.coordinates[0];
  let long = location.coordinates.coordinates[1];
  let mapLink = `https://maps.google.com/?q=${lat},${long}`;

  const avgRating: number =
    reviews
      .map((review) => review.rating)
      .reduce((acc, rating) => acc + rating, 0) / reviews.length;

  return (
    <div className={styles.review}>
      <Image
        src={location.image!}
        alt="image location"
        width={250}
        height={250}
      />

      <div>
        <h2>{location.locationName}</h2>
        <div className={styles.content}>
          <div>Average Rating: {avgRating.toFixed(1)}</div>
          <div>
            Location: {location.description ?? "No description available"} (
            <Link href={mapLink} className={styles.coordinates}>
              View on map
            </Link>
            )
          </div>

          <h3>User Reviews</h3>
          <div>
            {reviews.map((review) => (
              <Review key={review.id} review={review} user={review.user} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

interface ReviewProps {
  review: Review;
  user: User;
}

const Review = ({ review, user }: ReviewProps) => {
  return (
    <div className={styles.userReview}>
      Rating: {review.rating}, Comment: &quot;{review.comment}&quot; by{" "}
      {user.username}
    </div>
  );
};

export default LocationComponent;
