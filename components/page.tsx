"use client";

import { Settings, X } from "lucide-react";
import { Timer } from "./timer";
import Image from "next/image";
import { TimeState } from "@/types/time";
import { timeReducer } from "@/lib/timeReducer";
import { useCallback, useReducer, useState } from "react";
import { motion } from "framer-motion";

export function PageComponent() {
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
    <div className="relative  min-h-screen overflow-hidden">
      <div className="fixed inset-0 w-full h-full">
        <Image
          src="/wallpaper.jpg"
          fill
          alt="hero"
          className="object-cover brightness-50 object-center"
        />
      </div>
      <div className=" w-full flex p-4  h-screen  relative z-10">
        <div className=" flex max-w-[1200px] justify-between items-centers w-full mx-auto ">
          <div className="w-full md:max-w-[360px] p-4 rounded-xl ">
            <nav className="flex  justify-between items-center">
              <h1 className="bg-white/10  p-4 px-6 rounded-xl md:text-2xl font-black text-white text-center ">
                <span className="text-green-600">/ п / </span>Помидоро
              </h1>

              <button
                onClick={toggleSettings}
                className="w-14 h-14 md:w-16 md:h-16 bg-white/10  flex justify-center hover:border-4 border-white/20 items-center backdrop-blur-sm rounded-xl text-2xl font-black text-white text-center group"
              >
                {!isSetting ? (
                  <Settings
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
              {isSetting && (
                <div className="flex gap-4 font-bold flex-col rounded-xl justify-center bg-white/10 mt-4 p-4">
                  <h1 className="text-2xl">Настройки</h1>
                  <div className="flex items-center flex-col md:flex-row justify-between">
                    <div>
                      <p className="text-center">Сессия</p>
                      <div>
                        <p
                          style={{
                            position: "absolute",
                            transform: `translateX(${
                              state.session * 1.8
                            }px)` /* adjust the multiplier (10) to match your input range width */,
                            textAlign: "center",
                            fontSize: "14px",
                            fontWeight: "bold",
                          }}
                        >
                          {state.session}
                        </p>
                        <input
                          type="range"
                          className="mt-6"
                          min={5}
                          max={60}
                          step={5}
                          value={state.session}
                          onChange={(e) =>
                            handleChange("session", e.target.value)
                          }
                          style={{
                            accentColor: "#34C759" /* changed to green */,
                            WebkitAppearance:
                              "none" /* to customize the thumb */,
                            borderRadius: "10px",
                          }}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col ">
                      <p className="text-center">Отдых</p>
                      <div>
                        <p
                          style={{
                            position: "absolute",
                            transform: `translateX(${
                              state.relax * 5.5
                            }px)` /* adjust the multiplier (10) to match your input range width */,
                            textAlign: "center",
                            fontSize: "14px",
                            fontWeight: "bold",
                          }}
                        >
                          {state.relax}
                        </p>
                        <input
                          className="mt-6"
                          type="range"
                          min={1}
                          max={20}
                          step={1}
                          value={state.relax}
                          onChange={(e) =>
                            handleChange("relax", e.target.value)
                          }
                          style={{
                            accentColor: "#34C759" /* changed to green */,
                            WebkitAppearance:
                              "none" /* to customize the thumb */,
                            borderRadius: "10px",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>

            <Timer state={state} />
          </div>
        </div>
      </div>
    </div>
  );
}
