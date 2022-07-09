import { useState } from "react";
import { Color } from "types/ColorTypes";

type StarBarProps = {
  maxStars: number;
  initalStars: number;
  rounding: number;
  color: Color;
  direction: "row" | "column";
  size: `${number}rem` | `${number}px`;
};

StarBar.defaultProps = {
  maxStars: 5,
  initalStars: 0,
  rounding: 0,
  color: "#FFFF00",
  direction: "row",
  size: "1rem",
};

function StarBar({
  maxStars,
  initalStars,
  rounding,
  color,
  direction,
  size,
}: StarBarProps) {
  const [stars, setStars] = useState<number>(initalStars!);

  let starlist = Array(maxStars!)
    .fill("")
    .map((_, i) => {
      return stars > i ? "★" : "☆";
    });

  return (
    <>
      <ul>
        {starlist.map((star, i) => {
          return <li key={i}>{star}</li>;
        })}{" "}
      </ul>

      <style jsx>{`
        * {
          color: ${color};
          font-size: ${size};
          margin: 0;
          padding: 0;
        }

        ul {
          display: flex;
          list-style-type: none;
          flex-direction: ${direction};
        }
      `}</style>
    </>
  );
}

export default StarBar;
