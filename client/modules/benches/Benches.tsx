import { useEffect, useState } from "react";
import { Review, BenchReview} from "types/BenchTypes";
import { api } from "utils/utils";
import Bench from "./bench/Bench";
import styles from "./Benches.module.css"

export async function getServerSideProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  };
}

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
    </div>
  );
};

Benches.getInitalProps = (props: any) => {};

export default Benches;
