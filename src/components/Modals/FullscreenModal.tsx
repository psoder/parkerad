import CloseButton from "components/Buttons/CloseButton";
import { Color } from "types/ColorTypes";
import ClientOnlyPortal from "./ClientOnlyPortal";

const FullscreenModal = ({
  children,
  closeModal,
  style,
  closeButton = true,
}: {
  children: React.ReactNode;
  closeModal?: () => void;
  style?: {
    size?: number | string;
    color?: string;
    backgroundColor?: string | Color;
    padding?: number | string;
  };
  closeButton?: boolean;
}) => {
  return (
    <ClientOnlyPortal>
      <div className="background">
        <div className="dialog">
          {closeButton && (
            <CloseButton
              size={style?.size || 48}
              onClick={closeModal}
              style={{
                position: "absolute",
                top: 8,
                right: 8,
                zIndex: 1,
              }}
            />
          )}
          {children}
        </div>
      </div>
      <style jsx>{`
        .background {
          width: 100%;
          height: 100%;
          position: fixed;
          background-color: rgba(0, 0, 0, 0.2);
          display: flex;
          justify-content: center;
          align-items: center;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
        }

        .dialog {
          color: ${style?.color || "black"};
          background-color: ${style?.backgroundColor || "white"};
          position: relative;
          height: 50%;
          width: 50%;
          box-shadow: 0 15px 30px 0 rgba(0, 0, 0, 0.11),
            0 5px 15px 0 rgba(0, 0, 0, 0.08);
          padding: ${typeof style?.size === "number"
            ? `${style?.size}px`
            : style?.size};
          display: flex;
          flex-direction: column;
          overflow-y: auto;
        }
      `}</style>
    </ClientOnlyPortal>
  );
};

export default FullscreenModal;
