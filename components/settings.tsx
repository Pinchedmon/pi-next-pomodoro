import { TimeState } from "@/types/time";
import React from "react";

interface Props {
  state: TimeState;
  handleChange: (x: "session" | "relax", y: string) => void;
}

const Settings = (props: Props) => {
  const { state, handleChange } = props;

  const incrementSession = () => {
    if (state.session < 60) {
      handleChange("session", (state.session + 5).toString());
    }
  };

  const decrementSession = () => {
    if (state.session > 5) {
      handleChange("session", (state.session - 5).toString());
    }
  };

  const incrementRelax = () => {
    if (state.relax < 20) {
      handleChange("relax", (state.relax + 1).toString());
    }
  };

  const decrementRelax = () => {
    if (state.relax > 1) {
      handleChange("relax", (state.relax - 1).toString());
    }
  };

  return (
    <div className="flex gap-4 font-bold flex-col rounded-xl justify-center bg-white/10 mt-4 p-4">
      <h1 className="text-2xl">Настройки</h1>
      <div className="flex items-center flex-col md:flex-row justify-between">
        <div>
          <p className="text-center">Сессия</p>
          <div className="flex justify-center items-center">
            <button
              onClick={decrementSession}
              className="px-4 py-2 border-2 hover:text-red-500 border-red-600 text-white rounded-xl"
            >
              -
            </button>
            <p
              className="mx-4"
              style={{ fontSize: "20px", fontWeight: "bold" }}
            >
              {state.session}
            </p>
            <button
              onClick={incrementSession}
              className="px-4 py-2 border-2 hover:text-green-500 border-green-600 text-white rounded-xl"
            >
              +
            </button>
          </div>
        </div>
        <div className="flex flex-col ">
          <p className="text-center">Отдых</p>
          <div className="flex justify-center items-center">
            <button
              onClick={decrementRelax}
              className="px-4 py-2 border-2 hover:text-red-500 border-red-600 text-white rounded-xl "
            >
              -
            </button>
            <p
              className="mx-4"
              style={{ fontSize: "20px", fontWeight: "bold" }}
            >
              {state.relax}
            </p>
            <button
              onClick={incrementRelax}
              className="px-4 py-2 border-2 hover:text-green-500 border-green-600 text-white rounded-xl"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
