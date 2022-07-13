import { useState } from "react";
import { Color } from "types/ColorTypes";

function StarBar({
  maxStars = 5,
  initalStars = 0,
  rounding = 0,
  color = "#FFFF00",
  direction = "row",
  size = "1rem",
}: {
  maxStars?: number;
  initalStars?: number;
  rounding?: number;
  color?: Color;
  direction?: "row" | "column";
  size?: `${number}rem` | `${number}px`;
}) {
  const [stars, setStars] = useState<number>(initalStars!);

  let starlist = Array(Math.floor(stars % (maxStars + 1)))
    .fill("")
    .map((_, i) => {
      return <Star fill={1} />;
    });

  if ((stars % (maxStars + 1)) - Math.floor(stars % (maxStars + 1)) > 0) {
    starlist.push(
      <Star
        fill={(stars % (maxStars + 1)) - Math.floor(stars % (maxStars + 1))}
      />
    );
  }

  while (maxStars > starlist.length) {
    starlist.push(<Star fill={0} />);
  }

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

const Star = ({
  fill = 0,
  outlineColor = "#2C3E50",
  fillColor = "#FFFF00",
  size = 24,
}: {
  fill?: number;
  outlineColor?: Color;
  fillColor?: Color;
  size?: number;
}) => {
  if (fill > 1) {
    fill = 1;
  } else if (fill < 0) {
    fill = 0;
  }

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox={`0 0 24 24`}
        strokeWidth="1"
        stroke={outlineColor}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <defs>
          <linearGradient id={`grad-${fill}`}>
            <stop offset={`${fill * 100}%`} stopColor={fillColor} />
            <stop offset="0" stopColor="transparent" />
          </linearGradient>
        </defs>
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path
          fill={`url(#grad-${fill})`}
          d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z"
        />
      </svg>
    </>
  );
};

export default StarBar;
