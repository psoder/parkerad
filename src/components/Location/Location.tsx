import { LocationReview } from "types/LocationReview";
import { useState } from "react";
import LocationCard from "./components/LocationCard";
import FullscreenModal from "components/Modals/FullscreenModal";

const LocationComponent = ({ location }: { location: LocationReview }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <LocationCard location={location} />
    </>
  );
};

export default LocationComponent;
