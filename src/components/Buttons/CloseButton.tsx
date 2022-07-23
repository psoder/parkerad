import Image from "next/image";
import { CSSProperties, MouseEventHandler } from "react";

const CloseButton = ({
  size,
  onClick,
  className,
  style,
}: {
  size: number | string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  style?: CSSProperties;
}) => {
  const zize = typeof size === "number" ? `${size}px` : size;

  return (
    <button className={className} style={style} onClick={onClick}>
      <Image src={"/icons/x-black.svg"} width={size} height={size} />
      <style jsx>
        {`
          button {
            margin: 0;
            padding: 0;
            border: none;
            background-color: transparent;
            width: ${zize};
            height: ${zize};
          }
        `}
      </style>
    </button>
  );
};

export default CloseButton;
