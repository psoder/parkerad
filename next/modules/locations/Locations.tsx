import LocationComp from "./location/Location";
import styles from "./Location.module.css";
import { LocationReview } from "types/LocationReview";

interface LocationsProps {
  locations: LocationReview[];
}

const Locations = ({ locations }: LocationsProps) => {
  return (
    <>
      <h2>Some feature here</h2>
      <div className={styles.benchList}>
        {locations?.map((location) => (
          <LocationComp key={location.id} location={location} />
        ))}
      </div>
    </>
  );
};

export default Locations;
