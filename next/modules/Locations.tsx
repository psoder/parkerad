import Location from "components/Location";
import { LocationReview } from "types/LocationReview";
import { useEffect, useState } from "react";
import { getComparitor, Comparitor } from "utils/LocationReviewUtils";

const Locations = ({ locations }: { locations: LocationReview[] }) => {
  const [fslocations, setFSLocations] = useState(locations);
  const [search, setSearch] = useState<{
    filter: string;
    comparitor: Comparitor;
  }>({
    filter: "",
    comparitor: Comparitor.RATING,
  });

  const handleChange = (e: any) => {
    setSearch({
      ...search,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    setFSLocations(
      locations
        .filter((location) => {
          return location.locationName.match(search.filter);
        })
        .sort(getComparitor(search.comparitor)).reverse()
    );
  }, [search]);

  return (
    <section id="locations">
      <h1>Bänkar</h1>

      <div>
        <h2>Filter Locations</h2>
        <form>
          <label>
            Search for locations
            <input
              type="text"
              name={"filter"}
              value={search.filter}
              onChange={handleChange}
            />
          </label>
        </form>

        <div>
          <h2>Sort Locations</h2>
          <form className="sorting">
            <label>
              <input
                type={"radio"}
                name={"comparitor"}
                onChange={handleChange}
                checked={search.comparitor === Comparitor.DATE_ADDED}
                value={Comparitor.DATE_ADDED}
                disabled={true}
              />
              Date Added
            </label>
            <label>
              <input
                type={"radio"}
                name={"comparitor"}
                onChange={handleChange}
                checked={search.comparitor === Comparitor.RATING}
                value={Comparitor.RATING}
              />
              Rating
            </label>
            <label>
              <input
                type={"radio"}
                name={"comparitor"}
                onChange={handleChange}
                checked={search.comparitor === Comparitor.WEIGHTED_RATING}
                value={Comparitor.WEIGHTED_RATING}
              />
              Weighted rating
            </label>
            <label>
              <input
                type={"radio"}
                name={"comparitor"}
                onChange={handleChange}
                checked={search.comparitor === Comparitor.NO_RATINGS}
                value={Comparitor.NO_RATINGS}
              />
              No. Ratings
            </label>
          </form>
        </div>

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

          .sorting {
            display: flex;
            flex-direction: column;
          }

          .sorting > label {
            display: flex;
          }

          .sorting input {
            margin: 0;
            background-color: red;
          }
        `}</style>
      </div>

      <div className="locations">
        {fslocations.map((location) => (
          <Location key={location.id} location={location} />
        ))}

        <style jsx>
          {`
            .locations {
              display: flex;
              flex-wrap: wrap;
              gap: 1.5rem;
            }
          `}
        </style>
      </div>
    </section>
  );
};

export default Locations;
