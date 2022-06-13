import { useEffect, useState } from "react";
import { Review, BenchReview} from "../../types/BenchTypes";
import { api } from "../../utils/utils";
import Bench from "./bench/Bench";
import styles from "./Benches.module.css"


const Benches = () => {
  const [benchReviews, setBenchReviews] = useState<BenchReview[]>();
  const url = "http://localhost:8008";

  useEffect(() => {
    api<BenchReview[]>(`${url}/benchReviews`).then((benchReviews) => {
      setBenchReviews(benchReviews);
    });
  }, []);

  return (
    <div className={styles.benchList}>
      {benchReviews?.map(br => 
        <Bench key={br.bench.id} bench={br.bench} reviews={br.reviews} />
      )}

      {/* {myCollection.map((member) => (
        <div key={member} className={myCondition ? styles.variant1 : styles.variant2}>
          {member}
        </div>
      ))} */}

      {/* <Bench bench={{}} reviews={[]}  /> */}
      {/* {benchReviews?.[  at(0)?.bench.description} */}
    </div>
  );
};

export default Benches;
