import Image from "next/image";
import Link from "next/link";
import { BenchReview } from "../../../types/BenchTypes";
import styles from "./Bench.module.css";

const Bench = ({
  bench: { location, longitude, latitude, description, image },
  reviews,
}: BenchReview) => {
  let coords = `https://maps.google.com/?q=${longitude},${latitude}`;

  return (
    <div className={styles.review}>
      <div>
        <h2>{location}</h2>
        <div className={styles.content}>
          <div>Average Rating: 69/420</div>
          <div>
            Location: {description ?? "No description available"} (
            <Link href={coords} className={styles.coordinates}>
              View on map
            </Link>
            )
          </div>
          <div>Something goes here.</div>
        </div>
      </div>

      <Image
        alt="image location"
        width={500}
        height={250}
        src={image ?? "/images/bench.jpg"}
      />
    </div>
  );
};

export default Bench;
