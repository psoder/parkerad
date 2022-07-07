import { useState } from "react";
import { Color } from "types/ColorTypes";

type StarBarProps = {
  maxStars: number;
  initalStars: number;
  rounding: number;
  color: Color;
  direction: "row" | "column";
  size: number;
};

StarBar.defaultProps = {
  maxStars: 5,
  initalStars: 0,
  rounding: 0,
  color: "#FFFF00",
  direction: "row",
  size: 1,
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
        {starlist.map((star) => {
          return <li>{star}</li>;
        })}{" "}
      </ul>

      <style jsx>{`
        * {
          color: ${color};
          font-size: ${size}rem;
        }

        ul {
          display: flex;
          flex-direction: ${direction};
        }
      `}</style>
    </>
  );
}

export default StarBar;
