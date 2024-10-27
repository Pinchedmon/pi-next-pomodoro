"use client";

import { useState, useCallback, useEffect } from "react";
import s from "./pointer.module.scss";

type PointerCoords = {
  x: number;
  y: number;
};

export default function Pointer() {
  const [coords, setCoords] = useState<PointerCoords>({ x: 0, y: 0 });
  const [crickets, setCrickets] = useState<NodeListOf<HTMLElement> | null>(
    null
  );

  const handleWindowMouseMove = useCallback(
    (event: { clientX: number; clientY: number }) => {
      setCoords({ x: event.clientX, y: event.clientY });
    },
    []
  );

  useEffect(() => {
    // This will run only on the client side
    const cricketElements = document.querySelectorAll(
      ".cricket"
    ) as NodeListOf<HTMLElement>;
    setCrickets(cricketElements);

    window.addEventListener("mousemove", handleWindowMouseMove);

    const moveCrickets = () => {
      if (crickets) {
        crickets.forEach((cricket) => {
          const offsetX = Math.random() * 20 - 10; // random offset X
          const offsetY = Math.random() * 20 - 10; // random offset Y
          cricket.style.top = `${
            parseFloat(cricket.style.top || "0") + offsetY
          }px`;
          cricket.style.left = `${
            parseFloat(cricket.style.left || "0") + offsetX
          }px`;
        });
      }
    };

    const intervalId = setInterval(moveCrickets, 100); // Move crickets every 100ms

    return () => {
      window.removeEventListener("mousemove", handleWindowMouseMove);
      clearInterval(intervalId); // Cleanup interval on unmount
    };
  }, [handleWindowMouseMove, crickets]);

  return (
    <>
      <div
        style={{ left: `${coords.x}px`, top: `${coords.y}px` }}
        className={s.ring1}
      ></div>
      <div
        style={{ left: `${coords.x - 5}px`, top: `${coords.y - 5}px` }}
        className={s.cricket}
      ></div>
      <div
        style={{ left: `${coords.x - 10}px`, top: `${coords.y - 10}px` }}
        className={s.cricket}
      ></div>
      <div
        style={{ left: `${coords.x}px`, top: `${coords.y}px` }}
        className={s.cricket}
      ></div>
    </>
  );
}
