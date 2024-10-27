"use client";
import React, { useCallback, useReducer, useState } from "react";
import { Timer } from "./timer";
import { motion } from "framer-motion";
import { TimeState } from "@/types/time";
import { timeReducer } from "@/lib/timeReducer";
import { Settings as SettingIcon, X } from "lucide-react";
import Settings from "./settings";

const Pomodoro = () => {
  const initialState: TimeState = { session: 25, relax: 5 };
  const [state, dispatch] = useReducer(timeReducer, initialState);
  const [isSetting, setIsSetting] = useState<boolean>(false);

  const handleChange = useCallback(
    (type: "session" | "relax", value: string) => {
      const parsedValue = parseInt(value, 10);
      if (!isNaN(parsedValue) && parsedValue >= 1 && parsedValue <= 60) {
        dispatch({ type: `changed_${type}`, [type]: parsedValue });
      }
    },
    []
  );

  const toggleSettings = () => {
    setIsSetting((prev) => !prev);
  };

  return (
    <div className="w-full md:max-w-[360px] p-4 rounded-xl ">
      <nav className="flex  justify-between items-center">
        <h1 className="bg-white/10  p-4 px-6 rounded-xl md:text-2xl font-black text-white text-center ">
          <span className="text-green-600">/ п / </span>Помидоро
        </h1>

        {/* <Pointer /> */}
        <button
          onClick={toggleSettings}
          className="w-14 h-14 md:w-16 md:h-16 bg-white/10  flex justify-center hover:border-4 border-white/20 items-center backdrop-blur-sm rounded-xl text-2xl font-black text-white text-center group"
        >
          {!isSetting ? (
            <SettingIcon
              size={24}
              className="group-hover:animate-spin group-hover:text-white/80"
            />
          ) : (
            <X
              size={24}
              className="group-hover:animate-spin group-hover:text-white/80"
            />
          )}
        </button>
      </nav>
      <motion.div
        key={isSetting ? "open" : "closed"}
        initial={isSetting ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
        animate={isSetting ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        {isSetting && <Settings state={state} handleChange={handleChange} />}
      </motion.div>

      <Timer state={state} />
    </div>
  );
};

export default Pomodoro;
