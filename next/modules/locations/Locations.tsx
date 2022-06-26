import { useEffect, useState } from "react";
import { Review, BenchReview } from "types/BenchTypes";
import LocationComp from "./location/Location";
import styles from "./Location.module.css";
import type { Location } from "@prisma/client";

interface props {
  locations: Location[];
}

const Locations = ({ locations }: props) => {
  return (
    <>
      <h2>Some feature here</h2>
      <div className={styles.benchList}>
        {locations?.map((loc) => (
          <LocationComp location={loc} />
        ))}
      </div>
    </>
  );
};

export default Locations;
