import { LocationReview } from "types/LocationReview";
import { useState } from "react";
import LocationCard from "./components/LocationCard";
import LocationModal from "./components/LocationModal";
import FullscreenModal from "components/Modals/FullscreenModal";

const LocationComponent = ({ location }: { location: LocationReview }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {showModal && (
        <FullscreenModal>
          <LocationModal
            location={location}
            closeModal={() => {
              setShowModal(false);
            }}
          />
        </FullscreenModal>
      )}
      <LocationCard
        location={location}
        handleChange={() => {
          setShowModal(true);
        }}
      />
    </>
  );
};

export default LocationComponent;
