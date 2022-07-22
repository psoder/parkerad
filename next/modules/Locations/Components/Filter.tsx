import { colors, stdPx } from "theme/Styles";

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

export default Filter;
