import { useState } from "react";
import { Color } from "types/ColorTypes";

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
    <button
      onClick={() => {
        setEditing(!editing);
        if (editing) {
          onEdit();
        } else {
          onSave();
        }
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        strokeWidth="1"
        stroke={style.color}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
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

export default EditButton;
