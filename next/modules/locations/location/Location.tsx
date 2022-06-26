import Image from "next/image";
import Link from "next/link";
import styles from "./Bench.module.css";
import { Location, Review, Coordinates, User } from "@prisma/client";
import prisma from "lib/prisma";

let location: Location = {
  id: "0",
  locationName: "Trippeln",
  description: "Tre bänkar vid västra Lappkärret",
  location: {
    type: "Point",
    coordinates: [59.3689071, 18.0672525],
  },
  dateAdded: new Date(),
  image: "/locations/IMG_20220619_221117.jpg",
  noRatings: 1337,
  averageRating: 4.2,
};

interface LocationProps {
  location: Location
}

const LocationComponent = ({ location }: LocationProps) => {
  // let reviews = await prisma.review.findMany({ where: {} });

  return (
    <div className={styles.review}>
      {location.locationName}
      {/* <Image
        alt="image location"
        width={500}
        height={250}
        src={"/images/bench.jpg"}
      />

      <div>
        <h2>{locationName}</h2>
        <div className={styles.content}>
          <div>Average Rating: {averageRating}</div>
          <div>
            Location: {description ?? "No description available"} (
            <Link href={mapLink} className={styles.coordinates}>
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
      </div> */}
    </div>
  );
};

// const UserReview = ({ rating, text, user }: Review) => {
//   return (
//     <div className={styles.userReview}>
//       Rating: {rating}, Comment: &quot;{text}&quot; by {user.name}
//     </div>
//   );
// };

export default LocationComponent;
