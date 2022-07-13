import Image from "next/image";
import Link from "next/link";
import { LocationReview } from "types/LocationReview";
import StarBar from "components/StarBar";
import { borders, colors, shadows, stdUnits } from "theme/Styles";
import * as utils from "utils/LocationReviewUtils";
import { useState } from "react";
import ReviewCard from "./ReviewCard";
import { Location, Review } from "@prisma/client";

const stdPx = stdUnits.px;

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
            width: ${25 * stdPx}px;
          }

          .content {
            display: grid;
            grid-area: content;
            grid-template-areas:
              "title rating"
              "review review";
            grid-template-rows: auto 3rem;
            gap: ${stdPx}px;

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
        <div className="content">
          <div className="image" style={{ gridArea: "image" }}>
            <button className="button" onClick={handleChange}>
              close
            </button>

            <Image
              src={location.image!}
              alt="image location"
              layout={"intrinsic"}
              width={400}
              height={300}
            />
          </div>

          <div style={{ gridArea: "titleDescription" }}>
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
          </div>

          <LeaveReview location={location} />

          <div className="reviews" style={{ gridArea: "reviews" }}>
            <h2 style={{ gridArea: "reviewTitle" }}>
              Reviews ({reviews.length})
            </h2>

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

            <div className="reviewContainer">
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
      </div>

      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
        }

        .overlay {
          position: fixed;
          width: 100vw;
          height: 100vh;
          top: 0;
          left: 0;
          z-index: 1;
          background-color: ${colors.darkTint};

          display: flex;
          flex-direction: column;
          justify-content: center;

          padding: 5%;
          padding-left: 25%;
          padding-right: 25%;
        }

        .content {
          background-color: ${colors.secondary};
          box-shadow: ${shadows.boxShadow};
          display: grid;
          grid-template-areas:
            "titleDescription image"
            "leaveReview leaveReview"
            "reviews reviews";

          grid-template-columns: 1fr 2fr;
        }

        .content > *:not(:first-child) {
          padding: ${2 * stdPx}px;
        }
        .reviewHeading {
          font-size: ${0.5 * titleSize}rem;
        }

        .image {
          position: relative;
          display: grid;
          justify-content: end;
        }

        .button {
          position: absolute;
          right: ${stdPx}px;
          top: ${stdPx}px;
          z-index: 1;
        }

        .reviews {
          display: grid;
          gap: ${0.5 * stdPx}px;
          grid-template-areas:
            "reviewTitle rating"
            "reviewContainer reviewContainer";
        }

        .reviewContainer {
          grid-area: "reviewContainer";
          display: flex;
          gap: ${stdPx}px;
          flex-wrap: wrap;
          justify-content: space-between;
        }
      `}</style>
    </>
  );
};

const LeaveReview = ({ location }: { location: Location }) => {
  const [state, setState] = useState<{
    userId: string;
    rating: number;
    comment?: string;
  }>({ rating: 0, userId: "anon" });

  const handleChange = (event: any) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    fetch("/api/reviews/create", {
      method: "POST",
      body: JSON.stringify({ locationId: location.id, ...state }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
      });
  };

  return (
    <div className="root">
      <h2>Leave a review</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Score
          <input
            type="number"
            value={state?.rating}
            onChange={handleChange}
            name="rating"
          />
        </label>

        <label>
          Comment (Optional)
          <input
            type="text"
            value={state?.comment || ""}
            onChange={handleChange}
            name="comment"
          />
        </label>

        <input type="submit" value="Submit" />
      </form>
      <style jsx>{`
        * {
          margin: 0;
        }
        .root {
          margin-left: ${2 * stdPx}px;
        }

        form {
          display: flex;
          flex-direction: column;
        }

        label {
          display: flex;
          flex-direction: column;
        }
      `}</style>
    </div>
  );
};

export default LocationComponent;
