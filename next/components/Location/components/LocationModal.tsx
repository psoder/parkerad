import CloseButton from "components/Buttons/CloseButton";
import ReviewCard from "components/ReviewCard";
import StarBar from "components/StarBar";
import Image from "next/image";
import { colors, shadows, stdPx } from "theme/Styles";
import * as utils from "utils/LocationReviewUtils";
import { LocationReview } from "types/LocationReview";
import Link from "next/link";
import LeaveReview from "./LeaveReview";
import FullscreenModal from "components/Modals/FullscreenModal";

const LocationModal = ({
  location,
  closeModal,
}: {
  location: LocationReview;
  closeModal: () => void;
}) => {
  const reviews = location.reviews;
  const lat = location.coordinates.coordinates[0];
  const long = location.coordinates.coordinates[1];
  const mapLink = `https://maps.google.com/?q=${lat},${long}`;
  const titleSize = 4; //rem

  return (
    <FullscreenModal
      style={{ backgroundColor: colors.secondary, color: colors.text }}
      closeModal={closeModal}
    >
      <div className="content">
        <div className="image" style={{ gridArea: "image" }}>
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

      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
        }

        .content {
          height: 100%;
          background-color: ${colors.secondary};
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
    </FullscreenModal>
  );
};

export default LocationModal;
