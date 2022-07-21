import Image from "next/image";
import Link from "next/link";
import { LocationReview } from "types/LocationReview";
import StarBar from "components/StarBar";
import { colors, shadows, stdPx } from "theme/Styles";
import * as utils from "utils/LocationReviewUtils";
import { useState } from "react";
import ReviewCard from "./ReviewCard";
import { Location, Review } from "@prisma/client";
import { getSession, useSession } from "next-auth/react";

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
            More Information
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
            width: ${stdPx(25)};
          }

          .content {
            display: grid;
            grid-area: content;
            grid-template-areas:
              "title rating"
              "review review";
            grid-template-rows: auto 3rem;
            gap: ${stdPx()};

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
              <Image
                src={"/icons/x-black.svg"}
                width={stdPx(3)}
                height={stdPx(3)}
              />
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
                <a target={"_blank"}>map</a>
              </Link>
              .
            </p>
          </div>

          <LeaveReview location={location} />

          <div className="reviews" style={{ gridArea: "reviews" }}>
            <h2 style={{ gridArea: "reviewTitle" }}>
              Reviews ({reviews.length})
            </h2>

            <div
              style={{
                gridArea: "rating",
                justifySelf: "end",
                alignSelf: "center",
              }}
            >
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
          padding: ${stdPx(2)};
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
          right: ${stdPx()};
          top: ${stdPx()};
          z-index: 1;
          border: none;
          background-color: transparent;
        }

        .reviews {
          display: grid;
          gap: ${stdPx(0.5)};
          grid-template-areas:
            "reviewTitle rating"
            "reviewContainer reviewContainer";
        }

        .reviewContainer {
          grid-area: "reviewContainer";
          display: flex;
          gap: ${stdPx()};
          flex-wrap: wrap;
          justify-content: space-between;
        }
      `}</style>
    </>
  );
};

const LeaveReview = ({ location }: { location: Location }) => {
  const { data: session, status } = useSession();
  const [state, setState] = useState<{
    rating: number;
    comment?: string;
  }>({ rating: 0 });

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
      body: JSON.stringify({
        ...state,
        locationId: location.id,
        userId: session?.user.id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

  let content = <></>;
  if (status === "authenticated") {
    content = (
      <>
        <h2>Leave a review</h2>
        <form onSubmit={handleSubmit}>
          <StarBar
            editable={true}
            onChange={(value: number) => {
              setState({ ...state, rating: value });
            }}
          />

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
          h2 {
            margin: 0;
            margin-bottom: ${stdPx(0.5)};
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
      </>
    );
  } else {
    content = (
      <h2>
        <Link href={"/api/auth/signin"}>
          <a>Sign in</a>
        </Link>{" "}
        to leave a review!
      </h2>
    );
  }

  return (
    <div
      style={{
        marginLeft: stdPx(2),
      }}
    >
      {content}
    </div>
  );
};

export default LocationComponent;
