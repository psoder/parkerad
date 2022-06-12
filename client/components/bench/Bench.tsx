import Image from "next/image";
import Link from "next/link";
import styles from "./Bench.module.css";
interface BenchProps {
  image?: string;
  location?: [long: number, lat: number, location: string];
}

const Bench = ({
  image = "/images/bench.jpg",
  location = [51.59692093054883, 12.584517806189458, "Fippelistan"],
}: BenchProps) => {
  let coords = `https://maps.google.com/?q=${location[0]},${location[1]}`;

  return (
    <div className={styles.review}>
      <div>
        <h2>Review</h2>
        <div className={styles.content}>
          <div>Rating: 420/69</div>
          <div>
            Location: {location[2]} (
            <Link href={coords} className={styles.coordinates}>
              View on map
            </Link>
            )
          </div>
          <div>
            Something goes here.
          </div>
        </div>
      </div>

      <Image alt="image location" width={500} height={250} src={image} />
    </div>
  );
};

export default Bench;
