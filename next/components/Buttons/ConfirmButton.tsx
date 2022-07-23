import { Color } from "types/ColorTypes";
import SVGButton from "components/Buttons/SvgButton";

const ConfirmButton = ({
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
        <path d="M5 12l5 5l10 -10" />
      </SVGButton>
    </>
  );
};

export default ConfirmButton;
