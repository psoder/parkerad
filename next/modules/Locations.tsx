import Location from "components/Location";
import { LocationReview } from "types/LocationReview";
import { useState } from "react";

interface LocationsProps {
  locations: LocationReview[];
}

const Locations = ({ locations }: LocationsProps) => {
  const [filterInput, setInput] = useState<string>("");

  const handleChange = (e: any) => {
    setInput(e.target.value);
  };

  return (
    <section id="locations">
      <h1>Bänkar</h1>

      <div>
        <h2>Filter Locations</h2>
        <form>
          <label>
            Filter:
            <input type="text" value={filterInput} onChange={handleChange} />
          </label>
        </form>

        <style jsx>{`
          div {
            margin-bottom: 2rem;
          }

          input {
            color: black;
          }

          label {
            display: flex;
            flex-direction: column;
          }

          form {
            display: grid;
            grid-template-columns: 1fr;
          }
        `}</style>
      </div>

      <div className="locations">
        {locations?.map((location) => (
          <Location key={location.id} location={location} />
        ))}

        <style jsx>
          {`
            .locations {
              display: grid;
              grid-template-columns: 1fr;
              flex-direction: column;
              gap: 1.5rem;
            }

            @media (min-width: 1000px) {
              .locations {
                grid-template-columns: 1fr 1fr;
              }
            }
          `}
        </style>
      </div>
    </section>
  );
};

export default Locations;
