import { useEffect, useState } from "react";
import { Color } from "types/ColorTypes";

function StarBar({
  maxStars = 5,
  initalStars = 0,
  direction = "row",
  size = "1rem",
  editable = false,
  style = { fillColor: "#FFFF00", outlineColor: "#000000" },
  onChange = () => {},
}: {
  maxStars?: number;
  initalStars?: number;
  direction?: "row" | "column";
  size?: `${number}rem` | `${number}px`;
  editable?: boolean;
  style?: { fillColor?: Color; outlineColor?: Color };
  onChange?: (value: number) => any | void;
}) {
  const [stars, setStars] = useState(initalStars!);
  const [hoverStars, setHoverStars] = useState(initalStars);
  const [isSettingStars, setIsSettingStars] = useState(false);

  let starlist = Array(maxStars).fill(0);

  useEffect(() => {
    onChange(stars);
  }, [stars]);

  return (
    <>
      <ul
        onMouseEnter={() => {
          setIsSettingStars(true);
        }}
        onMouseLeave={() => {
          setIsSettingStars(false);
        }}
      >
        {starlist.map((_, i) => {
          return (
            <li key={i}>
              <Star
                fill={(isSettingStars && editable ? hoverStars : stars) - i}
                value={i + 1}
                handleClick={editable ? setStars : () => {}}
                handleMouseEnter={setHoverStars}
                handleMouseLeave={setHoverStars}
                style={style}
              />
            </li>
          );
        })}{" "}
      </ul>
      <style jsx>{`
        * {
          color: ${style.fillColor};
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
  style = { fillColor: "#FFFF00", outlineColor: "#000000" },
  size = 24,
  value = -1,
  handleClick,
  handleMouseEnter,
  handleMouseLeave,
}: {
  fill?: number;
  style?: { fillColor?: Color; outlineColor?: Color };
  size?: number;
  value?: number;
  handleClick?: any;
  handleMouseEnter?: any;
  handleMouseLeave?: any;
}) => {
  if (fill > 1) {
    fill = 1;
  } else if (fill < 0) {
    fill = 0;
  }

  return (
    <div
      onClick={() => {
        handleClick(value);
      }}
      onMouseEnter={() => {
        handleMouseEnter(value);
      }}
      onMouseLeave={() => {
        handleMouseLeave(value);
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox={`0 0 24 24`}
        strokeWidth="1"
        stroke={style.outlineColor}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <defs>
          <linearGradient id={`grad-${fill}`}>
            <stop offset={`${fill * 100}%`} stopColor={style.fillColor} />
            <stop offset="0" stopColor="transparent" />
          </linearGradient>
        </defs>
        <path
          fill={`url(#grad-${fill})`}
          d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z"
        />
      </svg>
      <style jsx>{`
        div {
          height: ${size}px;
          display: flex;
          z-index: 1;
        }
      `}</style>
    </div>
  );
};

export default StarBar;
