import Image from "next/image";
import Link from "next/link";
import styles from "./Location.module.css";
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
    <article className={styles.location}>
      <div className={styles.imageContainer}>
        <Image
          src={location.image!}
          alt="image location"
          layout={"fixed"}
          // objectFit={""}
          // objectPosition={"cover"}
          width={256}
          height={256}
        />
      </div>

      <div className={styles.reviews}>
        <div className={styles.header}>
          <h2>{location.locationName}</h2>
          <h2>{avgRating.toFixed(1)} / 5</h2>
        </div>

        <div className={styles.content}>
          <p className={styles.description}>
            {location.description ?? "No description available."}
          </p>

          <Link href={mapLink} className={styles.coordinates}>
            View on map
          </Link>

          <h3>User Reviews ({reviews.length})</h3>
          <div>
            {reviews.map((review) => (
              <Review key={review.id} review={review} user={review.user} />
            ))}
          </div>
        </div>
      </div>
    </article>
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
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
    </div>
  );
};

export default LocationComponent;
