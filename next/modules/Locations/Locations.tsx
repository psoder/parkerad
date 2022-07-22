import Location from "components/Location";
import { LocationReview } from "types/LocationReview";
import { useEffect, useState } from "react";
import { getComparitor, Comparitor } from "utils/LocationReviewUtils";
import { colors, stdPx } from "theme/Styles";
import AddLocation from "./Components/AddLocation";
import Filter from "./Components/Filter";
import Sort from "./Components/Sort";

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

export default Locations;
