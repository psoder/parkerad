import Location from "components/Location";
import { LocationReview } from "types/LocationReview";
import { useEffect, useState } from "react";
import { getComparitor, Comparitor } from "utils/LocationReviewUtils";
import { colors, stdPx } from "theme/Styles";
import AddLocation from "./Components/AddLocation";

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
          return location.locationName
            .toLowerCase()
            .match(search.filter.toLowerCase());
        })
        .sort(getComparitor(search.comparitor))
        .reverse()
    );
  }, [search]);

  return (
    <section id="locations">
      <h1>Locations</h1>
      <div className="options">
        <Filter onChange={handleChange} filter={search.filter} />

        <Sort onChange={handleChange} />

        <AddLocation />
      </div>

      <div className="locations">
        {fslocations.map((location) => (
          <Location key={location.id} location={location} />
        ))}
      </div>
      <style jsx>
        {`
          h1 {
            margin: ${stdPx()} 0 ${stdPx()} 0;
          }
          .options {
            display: flex;
            flex-direction: row;
            gap: ${stdPx(2)};
            margin-bottom: ${stdPx(1.5)};
          }

          .locations {
            display: flex;
            flex-wrap: wrap;
            gap: 1.5rem;
          }
        `}
      </style>
    </section>
  );
};

const Filter = ({ onChange, filter }: { filter: string; onChange: any }) => {
  return (
    <div className="filter">
      <div>
        <h2>Filter Locations</h2>
        <form>
          <input
            type="search"
            name={"filter"}
            value={filter}
            onChange={onChange}
          />
        </form>
      </div>

      <style jsx>{`
        .filter {
          display: flex;
          gap: ${stdPx(2)};
        }

        .filter > div {
          display: flex;
        }

        h2 {
          margin: 0;
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
  );
};

const Sort = ({ onChange }: { onChange: any }) => {
  return (
    <div style={{ display: "flex" }}>
      <h2 style={{ margin: 0 }}>Sort Locations</h2>
      <select onChange={onChange} name={"comparitor"}>
        <option value={Comparitor.RATING}> Rating</option>
        <option value={Comparitor.WEIGHTED_RATING}>Weighted rating</option>
        <option value={Comparitor.DATE_ADDED}> Date Added</option>
        <option value={Comparitor.NO_RATINGS}> No. Ratings</option>
      </select>
    </div>
  );
};

export default Locations;
