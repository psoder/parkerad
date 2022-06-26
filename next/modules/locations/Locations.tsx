import { useEffect, useState } from "react";
import { Review, BenchReview } from "types/BenchTypes";
import Location from "./location/Location";
import styles from "./Location.module.css";

interface BenchProps {
  locations: Location[];
}

const Locations = ({ locations }: BenchProps) => {
  const [benchReviews, setBenchReviews] = useState();

  return (
    <>
      <h2>Some feature here</h2>
      <div className={styles.benchList}>
        {/* {benchReviews?.map((br) => (
        <Bench key={br.bench.id} bench={br.bench} reviews={br.reviews} />
      ))} */}
        benchlist
      </div>
    </>
  );
};

export default Locations;
