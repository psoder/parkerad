import { useEffect, useState } from "react";
import { Review, BenchReview } from "types/BenchTypes";
import clientPromise from "lib/mongodb";
import { api } from "utils/utils";
import Bench from "./bench/Bench";
import styles from "./Benches.module.css";

const Benches = () => {
  const [benchReviews, setBenchReviews] = useState();

  useEffect(() => {

  }, []);

  return (
    <div className={styles.benchList}>
      {/* {benchReviews?.map((br) => (
        <Bench key={br.bench.id} bench={br.bench} reviews={br.reviews} />
      ))} */}
      benchlist
    </div>
  );
};

export default Benches;
