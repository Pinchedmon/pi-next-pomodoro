import { TimeState } from "@/types/time";
import React, { useEffect, useState } from "react";
import CricketAnimationButton from "@/components/start-button";

interface Props {
  state: TimeState;
}

export const Timer: React.FC<Props> = ({ state }) => {
  const [timer, setTimer] = useState(state.session * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isRelax, setIsRelax] = useState(false);

  useEffect(() => {
    const handleSpaceKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Space") {
        event.preventDefault();
        setIsRunning((prevIsRunning) => !prevIsRunning);
      }
    };
    document.addEventListener("keydown", handleSpaceKeyDown);
    return () => {
      document.removeEventListener("keydown", handleSpaceKeyDown);
    };
  }, []);

  useEffect(() => {
    setTimer(isRelax ? state.relax * 60 : state.session * 60);
  }, [isRelax, state]);

  useEffect(() => {
    let intervalId: number | NodeJS.Timeout;
    if (isRunning && timer > 0) {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [isRunning, timer]);

  useEffect(() => {
    if (timer === 0) {
      if (isRelax) {
        setIsRelax(false);
        setTimer(state.session * 60);
        setIsRunning(false);
      } else {
        setIsRelax(true);
        setIsRunning(false);
        setTimer(state.relax * 60);
      }
    }
  }, [timer, isRelax, state.relax, state.session]);

  const handleToggle = () => {
    setIsRunning((prevIsRunning) => !prevIsRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimer(isRelax ? state.relax * 60 : state.session * 60);
  };

  return (
    <div className="flex mt-4  gap-4 h-full flex-col ">
      <div className="flex justify-center bg-white/10  p-2 rounded-xl">
        <p className="font-bold text-center">{isRelax ? "Отдых" : "Работа"}</p>
      </div>
      <button
        className="bg-white/10  rounded-xl text-white text-7xl md:text-8xl font-black p-4"
        onClick={handleToggle}
      >
        {formatTime(timer)}
      </button>

      <div className="flex justify-between gap-4">
        <CricketAnimationButton handleToggle={handleToggle} isRunning={isRunning} />
        <button
          className="text-white box-border h-12 w-full font-bold bg-white/10 rounded-xl border-4 border-transparent  hover:border-white/20 "
          onClick={() => resetTimer()}
        >
          Сбросить
        </button>
      </div>
    </div>
  );
};

const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};
