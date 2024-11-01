"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import s from "./pointer.module.scss";

import {cn} from "@/lib/utils";

type PointerCoords = {
    x: number;
    y: number;
};

export default function Pointer() {
    const [coords, setCoords] = useState<PointerCoords>({ x: 0, y: 0 });
    const cricketRefs = useRef<(HTMLElement | null )[]>([]);

    const handleWindowMouseMove = useCallback(
        (event: { clientX: number; clientY: number }) => {
            setCoords({ x: event.clientX, y: event.clientY });
        },
        []
    );

    useEffect(() => {
        window.addEventListener("mousemove", handleWindowMouseMove);

        const moveCrickets = () => {
            cricketRefs.current.forEach((cricket) => {
                if (cricket) {
                    const offsetX = Math.random() * 20 - 10; // random offset X
                    const offsetY = Math.random() * 20 - 10; // random offset Y
                    cricket.style.top = `${
                        parseFloat(cricket.style.top || "0") + offsetY
                    }px`;
                    cricket.style.left = `${
                        parseFloat(cricket.style.left || "0") + offsetX
                    }px`;
                }
            });
        };

        const intervalId = setInterval(moveCrickets, 100); // Move crickets every 100ms

        return () => {
            window.removeEventListener("mousemove", handleWindowMouseMove);
            clearInterval(intervalId); // Cleanup interval on unmount
        };
    }, [handleWindowMouseMove]);

    return (
        <div className={'hidden md:block'}>
            <div
                style={{ left: `${coords.x}px`, top: `${coords.y}px` }}
                className={cn(s.ring1,)}
            ></div>
            {Array.from({ length: 3 }).map((_, index) => (
                <div
                    key={index}
                    ref={(el) => (cricketRefs.current[index] = el as never)}
                    style={{ left: `${coords.x - index * 5}px`, top: `${coords.y - index * 5}px` }}
                    className={s.cricket}
                ></div>
            ))}
        </div>
    );
}