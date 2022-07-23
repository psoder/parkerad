import { useState } from "react";
import { Color } from "types/ColorTypes";
import SVGButton from "components/Buttons/SvgButton";

const EditButton = ({
  onEdit = () => {},
  onSave = () => {},
  size = 32,
  style = { color: "#000000" },
}: {
  size?: number;
  style?: { color?: Color };
  onEdit?: () => void;
  onSave?: () => void;
}) => {
  const [editing, setEditing] = useState(true);

  return (
    <SVGButton
      onClick={() => {
        setEditing(!editing);
        if (editing) {
          onEdit();
        } else {
          onSave();
        }
      }}
      size={size}
      style={{ outlineColor: style.color }}
    >
      {editing ? (
        <>
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M9 7h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />
          <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />
          <line x1="16" y1="5" x2="19" y2="8" />
        </>
      ) : (
        <>
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M6 4h10l4 4v10a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2" />
          <circle cx="12" cy="14" r="2" />
          <polyline points="14 4 14 8 8 8 8 4" />
        </>
      )}
    </SVGButton>
  );
};

export default EditButton;
