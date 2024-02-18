"use client";
import { useState, useRef, useEffect, forwardRef } from "react";

const withClickOutside = (WrappedComponent) => {
  const Component = forwardRef((props, ref) => {
    const [open, setOpen] = useState(false);

    const wrapperRef = useRef();

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (!wrapperRef.current || !wrapperRef.current.contains(event.target)) {
          setOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [wrapperRef]);

    return (
      <WrappedComponent {...props} open={open} setOpen={setOpen} ref={ref} />
    );
  });
  Component.displayName = "Component";

  return Component;
};

export default withClickOutside;
