import ClientOnlyPortal from "components/Modals/ClientOnlyPortal";
import { useState } from "react";
import { Color } from "types/ColorTypes";
import SVGButton from "components/Buttons/SvgButton";
import ConfirmButton from "./ConfirmButton";
import XButton from "./XButton";

const DeleteButton = ({
  onClick = () => {},
  size = 32,
  style = { color: "#000000", dialogColor: "#666666" },
}: {
  size?: number;
  style?: { color?: Color; dialogColor?: Color };
  onClick?: () => void;
}) => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  return (
    <div id="delete">
      <SVGButton
        style={{ outlineColor: style.color }}
        onClick={() => {
          setShowConfirmation(!showConfirmation);
        }}
        size={size}
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <line x1="4" y1="7" x2="20" y2="7" />
        <line x1="10" y1="11" x2="10" y2="17" />
        <line x1="14" y1="11" x2="14" y2="17" />
        <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
        <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
      </SVGButton>

      {showConfirmation && (
        <ClientOnlyPortal selector="#delete">
          <div>
            <ConfirmButton
              style={{ color: "#00FF00" }}
              onClick={() => {
                setShowConfirmation(true);
                onClick();
              }}
            />
            <XButton
              style={{ color: "#FF0000" }}
              onClick={() => {
                setShowConfirmation(false);
              }}
            />
          </div>
          <style jsx>{`
            div {
              position: absolute;
              left: 16px;
              background-color: ${style.dialogColor};
              display: flex;
              border-radius: 4px;
              box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px,
                rgba(0, 0, 0, 0.22) 0px 15px 12px;
            }
          `}</style>
        </ClientOnlyPortal>
      )}
    </div>
  );
};

export default DeleteButton;
