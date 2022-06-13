import Image from "next/image";
import Link from "next/link";
import { BenchReview, Review } from "../../../types/BenchTypes";
import { User } from "../../../types/UserTypes";
import styles from "./Bench.module.css";

const Bench = ({
  bench: { location, longitude, latitude, description, image },
  reviews,
}: BenchReview) => {
  let coords = `https://maps.google.com/?q=${longitude},${latitude}`;

  let averageRating = 4.2;

  return (
    <div className={styles.review}>
      <Image
        alt="image location"
        width={500}
        height={250}
        src={image ?? "/images/bench.jpg"}
      />
      
      <div>
        <h2>{location}</h2>
        <div className={styles.content}>
          <div>Average Rating: {averageRating}</div>
          <div>
            Location: {description ?? "No description available"} (
            <Link href={coords} className={styles.coordinates}>
              View on map
            </Link>
            )
          </div>

          <h3>User Reviews</h3>
          <div>
            {reviews.map((review) => (
              <UserReview
                key={review.id}
                id={review.id}
                rating={review.rating}
                text={review.text}
                user={review.user}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const UserReview = ({ rating, text, user }: Review) => {
  return (
    <div className={styles.userReview}>
      Rating: {rating}, Comment: &quot;{text}&quot; by {user.name}
    </div>
  );
};

export default Bench;
