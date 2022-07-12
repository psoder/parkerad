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
        .sort(getComparitor(search.comparitor))
        .reverse()
    );
  }, [search]);

  return (
    <section id="locations">
      <h1>Bänkar</h1>

      <div className="filter">
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

          <div>
            <RadioButton
              caption={"Rating"}
              name={"comparitor"}
              onChange={handleChange}
              checked={search.comparitor === Comparitor.RATING}
              value={Comparitor.RATING}
            />

            <RadioButton
              caption={"Weighted rating"}
              name={"comparitor"}
              onChange={handleChange}
              checked={search.comparitor === Comparitor.WEIGHTED_RATING}
              value={Comparitor.WEIGHTED_RATING}
            />

            <RadioButton
              caption={"Date Added"}
              name={"comparitor"}
              onChange={handleChange}
              checked={search.comparitor === Comparitor.DATE_ADDED}
              value={Comparitor.DATE_ADDED}
            />

            <RadioButton
              name={"comparitor"}
              caption={"No. Ratings"}
              onChange={handleChange}
              checked={search.comparitor === Comparitor.NO_RATINGS}
              value={Comparitor.NO_RATINGS}
            />
          </div>
        </form>

        <style jsx>{`
          .filter {
            margin-bottom: 3%;
          }

          form {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
          }

          input {
            color: black;
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

const RadioButton = ({
  caption = "No caption.",
  name = "",
  checked = false,
  value = "",
  onChange = null,
}: {
  caption?: string;
  name?: string;
  checked?: boolean;
  value?: any;
  onChange?: any;
}) => {
  return (
    <label>
      <input
        type={"radio"}
        name={name}
        onChange={onChange}
        checked={checked}
        value={value}
      />
      {caption}

      <style jsx>{``}</style>
    </label>
  );
};

export default Locations;
