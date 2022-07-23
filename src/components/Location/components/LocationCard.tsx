import StarBar from "components/StarBar";
import Image from "next/image";
import { colors, shadows, stdPx } from "theme/Styles";
import { LocationReview } from "types/LocationReview";
import * as utils from "utils/LocationReviewUtils";

const LocationCard = ({
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
                size={"3rem"}
                style={{ outlineColor: "#FFFF00", fillColor: "#FFFF00" }}
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
            color: ${colors.highlight};
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

export default LocationCard;
