import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const ClientOnlyPortal = ({
  children,
  selector = "#__next",
}: {
  children: React.ReactNode;
  selector?: string;
}) => {
  const ref = useRef();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    ref.current = document.querySelector(selector) as any;
    setMounted(true);
  }, [selector]);

  return mounted ? createPortal(children, ref.current!) : null;
};

export default ClientOnlyPortal;
