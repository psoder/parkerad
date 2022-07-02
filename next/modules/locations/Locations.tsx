import LocationComp from "./location/Location";
import styles from "./Locations.module.css";
import { LocationReview } from "types/LocationReview";

interface LocationsProps {
  locations: LocationReview[];
}

const Locations = ({ locations }: LocationsProps) => {
  return (
    <>
      <h2>Some feature here</h2>
      <div className={styles.locations}>
        {locations?.map((location) => (
          <LocationComp key={location.id} location={location} />
        ))}
      </div>
    </>
  );
};

export default Locations;
