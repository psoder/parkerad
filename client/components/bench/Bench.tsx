import Image from "next/image";
import Link from "next/link";
import img from "../../public/images/bench.jpg";
import styles from "./Bench.module.css";

const Bench = () => {
  let x = 18.070502;
  let y = 59.37815;
  let coords = `https://maps.google.com/?q=${y},${x}`;

  https: return (
    <div className={styles.review}>
      <div>
        <h2>Review</h2>
        <div className={styles.content}>
          <div>Rating: 420/69</div>
          <div>
            Location: Fippelistan (
            <Link href={coords} className={styles.coordinates}>
              View on map
            </Link>)
          </div>
          <div>
            <h3>User Comments</h3>
            <p>
              Nam libero justo laoreet sit amet. Ut porttitor leo a diam. Lorem
              ipsum dolor sit amet. Faucibus pulvinar elementum integer enim
              neque volutpat ac tincidunt.
            </p>
          </div>
        </div>
      </div>

      <Image alt="image location" width={500} height={250} src={img} />
    </div>
  );
};

export default Bench;
