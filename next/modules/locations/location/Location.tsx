import Image from "next/image";
import Link from "next/link";
import { LocationReview } from "types/LocationReview";
import { Review, User } from "@prisma/client";
import StarBar from "components/starbar/StarBar";

interface LocationProps {
  location: LocationReview;
}

const LocationComponent = ({ location }: LocationProps) => {
  const reviews = location.reviews;
  const lat = location.coordinates.coordinates[0];
  const long = location.coordinates.coordinates[1];
  const mapLink = `https://maps.google.com/?q=${lat},${long}`;
  const avgRating: number =
    reviews
      .map((review) => review.rating)
      .reduce((acc, rating) => acc + rating, 0) / reviews.length;

  const LocationImage = () => {
    return (
      <div>
        <Image
          src={location.image!}
          alt="image location"
          layout={"fixed"}
          width={256}
          height={256}
        />

        <style jsx>
          {`
            div {
              position: relative;
            }
          `}
        </style>
      </div>
    );
  };

  const LocationHeader = () => {
    return (
      <div className="header">
        <h2>{location.locationName}</h2>
        {reviews.length == 0 ? (
          <div>? / 5</div>
        ) : (
          <StarBar initalStars={avgRating} size={2} color={"#F5F5F5"} />
        )}

        <style jsx>
          {`
            .header {
              display: grid;
              font-size: 2rem;
              align-items: center;
              grid-template-columns: 1fr auto;
              border-bottom: 1px white solid;
              margin-bottom: 1rem;
            }

            h2 {
              margin: 0;
              font-size: xx-large;
            }
          `}
        </style>
      </div>
    );
  };

  const LocationContent = () => {
    return (
      <div className="content">
        <p className="description">
          {location.description ?? "No description available."}
        </p>

        <div className="buttons">
          <Link href={mapLink} className="coordinates">
            View on map
          </Link>

          <button>Review</button>
        </div>

        <h3>User Reviews ({reviews.length})</h3>
        <div>
          {reviews.map((review) => (
            <Review key={review.id} review={review} user={review.user} />
          ))}
        </div>

        <style jsx>
          {`
            .content {
              display: flex;
              flex-direction: column;
              gap: 0.75rem;
            }

            .description {
              margin: 0;
              margin-bottom: 0.5rem;
            }

            h3 {
              font-size: 1.5rem;
            }

            .buttons {
              display: grid;
              justify-content: space-between;
              grid-template-columns: auto auto;
              align-items: center;
              font-size: 1.25rem;
            }

            .buttons > button {
              background-color: var(--primary);
              padding: 8px;
            }

            .buttons > button:hover {
              background-color: blue;
            }
          `}
        </style>
      </div>
    );
  };

  return (
    <article>
      <LocationImage />

      <div>
        <LocationHeader />
        <LocationContent />
      </div>

      <style jsx>
        {`
          article {
            background-color: var(--secondary);
            display: grid;
            grid-template-columns: auto 1fr;
            box-shadow: var(--box-shadow);
          }

          article > div {
            padding: 1.5rem;
          }
        `}
      </style>
    </article>
  );
};

interface ReviewProps {
  review: Review;
  user: User;
}

const Review = ({ review, user }: ReviewProps) => {
  return (
    <div className="review">
      <p>
        {review.rating} / 5
        {review.comment != null && <i>,&quot;{review.comment}&quot;</i>}
        {" - "} <i>{user.username}</i>
      </p>

      <style jsx>{`
        .review {
          background-color: chocolate;
          display: flex;
          padding: 0.25rem;
          font-size: 1rem;
        }
      `}</style>
    </div>
  );
};

export default LocationComponent;
