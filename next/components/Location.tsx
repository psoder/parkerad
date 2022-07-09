import Image from "next/image";
import Link from "next/link";
import { LocationReview } from "types/LocationReview";
import StarBar from "components/StarBar";
import { borders, colors, shadows } from "theme/Styles";
import * as utils from "utils/LocationReviewUtils";
import { useState } from "react";
import ReviewCard from "./ReviewCard";

const LocationComponent = ({ location }: { location: LocationReview }) => {
  const [renderOverlay, setRenderOverlay] = useState(false);
  const handleChange = () => {
    setRenderOverlay(!renderOverlay);
  };

  return (
    <>
      {renderOverlay && (
        <LocationOverlay location={location} handleChange={handleChange} />
      )}
      <MinimalLocation location={location} handleChange={handleChange} />
    </>
  );
};

const MinimalLocation = ({
  location,
  handleChange,
}: {
  location: LocationReview;
  handleChange: any;
}) => {
  const reviews = location.reviews;
  const titleSize = "2rem";

  return (
    <>
      <article onClick={handleChange}>
        <Image
          src={location.image!}
          alt="image location"
          layout={"intrinsic"}
          width={256}
          height={256}
        />

        <div className="content">
          <h2 className="title">{location.locationName}</h2>

          <div className="rating">
            {reviews.length == 0 ? (
              <>? / 5</>
            ) : (
              <StarBar
                initalStars={utils.averageRating(location)}
                size={titleSize}
              />
            )}
          </div>

          <button style={{ gridArea: "review", fontSize: "1.25rem" }}>
            Review
          </button>
        </div>
      </article>

      <style jsx>
        {`
          * {
            margin: 0;
            padding: 0;
          }

          article {
            background-color: ${colors.secondary};
            box-shadow: ${shadows.boxShadow};
            display: flex;
            flex-direction: column;
            width: 400px;
          }

          .content {
            display: grid;
            grid-area: content;
            grid-template-areas:
              "title rating"
              "review review";
            grid-template-rows: auto 3rem;
            gap: 1.5rem;

            padding: 5%;
          }

          .title {
            grid-area: title;
            align-self: center;
            font-size: ${titleSize};
          }

          .rating {
            grid-area: rating;
            align-self: center;
            justify-self: end;
            font-size: ${titleSize};
          }
        `}
      </style>
    </>
  );
};

const LocationOverlay = ({
  location,
  handleChange,
}: {
  location: LocationReview;
  handleChange: any;
}) => {
  const reviews = location.reviews;
  const lat = location.coordinates.coordinates[0];
  const long = location.coordinates.coordinates[1];
  const mapLink = `https://maps.google.com/?q=${lat},${long}`;
  const titleSize = 4; //rem

  return (
    <>
      <div className="overlay">
        <button  className="button" onClick={handleChange}>close</button>

        <div className="content">
          <div style={{ gridArea: "image" }}>
            <Image
              src={location.image!}
              alt="image location"
              layout={"responsive"}
              width={256}
              height={256}
            />
          </div>

          <h1 className="locationName">{location.locationName}</h1>

          <p className="description">
            {location.description != null ? (
              <>{location.description}</>
            ) : (
              "No description available."
            )}
            <br />
            View on{" "}
            <Link href={mapLink}>
              <a>map</a>
            </Link>
            .
          </p>

          <div className="leaveReview">
            <h2>Leave a review</h2>
            <input type="text"></input>
            <input type="number"></input>
            <button>Review</button>
          </div>

          <h2 className="reviewHeading">Reviews ({reviews.length})</h2>

          <div style={{ gridArea: "rating", justifySelf: "end" }}>
            {reviews.length == 0 ? (
              <>? / 5</>
            ) : (
              <StarBar
                initalStars={utils.averageRating(location)}
                size={`${titleSize / 2}rem`}
              />
            )}
          </div>

          <div className="reviews">
            {reviews.map((review) => {
              return (
                <ReviewCard
                  key={review.id}
                  review={review}
                  user={review.user}
                />
              );
            })}
          </div>
        </div>
      </div>

      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
        }

        .close {
          grid-area: close;
          position: relative;
          top: 0;
          right: 0;
          justift-self: end;
          width: 50px;
          hegight: 50px;
        }

        .overlay {
          position: fixed;
          width: 100vw;
          min-height: 100vh;
          top: 0;
          left: 0;
          z-index: 1;

          display: flex;
          justify-content: center;
          background-color: ${colors.darkTint};
        }

        .content {
          margin: 15%;
          background-color: ${colors.secondary};
          box-shadow: ${shadows.boxShadow};

          display: grid;
          grid-template-areas:
            "name image"
            "desc image"
            "leaveReview leaveReview"
            "review  rating"
            "reviews reviews";

          grid-template-columns: 1fr 2fr;

          gap: 32px;
          padding: 3rem;
        }

        .locationName {
          grid-area: name;
        }

        .image {
          grid-area: image;
        }

        .description {
          grid-area: desc;
        }

        .leaveReview {
          grid-area: leaveReview;
        }

        .reviewHeading {
          grid-area: review;
          font-size: ${0.5 * titleSize}rem;
        }

        .reviews {
          grid-area: reviews;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          gap: 2rem;
        }
      `}</style>
    </>
  );
};

export default LocationComponent;
