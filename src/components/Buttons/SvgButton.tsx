import { Color } from "types/ColorTypes";

const SVGButton = ({
  children,
  onClick = () => {},
  size = 32,
  style = { outlineColor: "#000000" },
}: {
  children: React.ReactNode;
  onClick?: () => void;
  size?: number;
  style?: { outlineColor?: Color };
}) => {
  return (
    <button
      onClick={() => {
        onClick();
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        strokeWidth="1"
        stroke={style.outlineColor}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {children}
      </svg>

      <style jsx>{`
        button {
          border: none;
          background: transparent;
          padding: 0;
          margin: 0;
          width: ${size}px;
          height: ${size}px;
        }
      `}</style>
    </button>
  );
};

export default SVGButton;
