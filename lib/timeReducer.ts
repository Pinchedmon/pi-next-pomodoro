import { TimeState, TimeAction } from "@/types/time";

const timeReducer = (state: TimeState, action: TimeAction): TimeState => {
  switch (action.type) {
    case "changed_session":
      return { ...state, session: action.session as number };
    case "changed_relax":
      return { ...state, relax: action.relax as number };
    default:
      return state;
  }
};

export { timeReducer };
