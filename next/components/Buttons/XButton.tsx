import { Color } from "types/ColorTypes";
import SVGButton from "components/Buttons/SvgButton";

const XButton = ({
  onClick = () => {},
  size = 32,
  style = { color: "#000000" },
}: {
  size?: number;
  style?: { color?: Color };
  onClick?: () => void;
}) => {
  return (
    <>
      <SVGButton
        style={{ outlineColor: style.color }}
        onClick={onClick}
        size={size}
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </SVGButton>
    </>
  );
};

export default XButton;
