import Location from "components/Location";
import { LocationReview } from "types/LocationReview";
import { useEffect, useState } from "react";
import { getComparitor, Comparitor } from "utils/LocationReviewUtils";
import { colors, stdUnits } from "theme/Styles";

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
        .sort(getComparitor(search.comparitor))
        .reverse()
    );
  }, [search]);

  return (
    <section id="locations">
      <h1>Locations</h1>

      <div className="filter">
        <h2>Filter Locations</h2>
        <form>
          <input
            type="text"
            name={"filter"}
            value={search.filter}
            onChange={handleChange}
          />
        </form>

        <h2>Sort Locations</h2>
        <select onChange={handleChange} name={"comparitor"}>
          <option value={Comparitor.RATING}> Rating</option>
          <option value={Comparitor.WEIGHTED_RATING}>Weighted rating</option>
          <option value={Comparitor.DATE_ADDED}> Date Added</option>
          <option value={Comparitor.NO_RATINGS}> No. Ratings</option>
        </select>

        <style jsx>{`
          .filter {
            margin-bottom: ${2 * stdUnits.px}px;
          }

          h2 {
            margin-bottom: 0;
          }
          form {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
          }

          input {
            color: ${colors.dark};
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
