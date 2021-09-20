import { AxiosResponse } from "axios";
import {
  FC,
  useReducer,
  createContext,
  useContext,
  useRef,
  Dispatch,
} from "react";
import { api } from "../services";
import { UserRecords } from "../types";

/* Types */
interface AppState {
  sleepRecords: UserRecords[];
  isCreatingUser: boolean;
}

interface ContextShape {
  dispatch: Dispatchers;
  state: AppState;
}

/* Actions Types */
enum ActionTypes {
  getSleepRecords = "getSleepRecords",
  postUser = "postUser",
  isCreatingUser = "isCreatingUser",
  putNewSleepRecord = "putNewSleepRecord",
}

interface Action<T> {
  type: T;
}

interface ActionGetSleepRecords extends Action<ActionTypes.getSleepRecords> {
  sleepRecords: UserRecords[];
}

interface ActionPostUser extends Action<ActionTypes.postUser> {}

interface ActionIsCreatingUser extends Action<ActionTypes.isCreatingUser> {
  isCreatingUser: boolean;
}

interface ActionPutSleepRecord extends Action<ActionTypes.putNewSleepRecord> {}

type AppActions =
  | ActionGetSleepRecords
  | ActionPostUser
  | ActionIsCreatingUser
  | ActionPutSleepRecord;

/** Dispatchers */
type Dispatchers = {
  getSleepRecords: () => void;
  postUser: (data: Pick<UserRecords, "name" | "gender">) => void;
  putSleepRecord: () => void;
};

function getDispatchers(dispatch: Dispatch<AppActions>): Dispatchers {
  return {
    async getSleepRecords() {
      try {
        const response: AxiosResponse<UserRecords[]> = await api.get("/");
        const sleepRecords = response.data;
        dispatch({ type: ActionTypes.getSleepRecords, sleepRecords });
      } catch (error) {
        console.error(error);
      }
    },
    async postUser(data) {
      try {
        dispatch({ type: ActionTypes.isCreatingUser, isCreatingUser: true });
        await api.post("/", data);
      } catch (error) {
        console.error(error);
      } finally {
        dispatch({ type: ActionTypes.isCreatingUser, isCreatingUser: false });
      }
    },
    putSleepRecord() {
      return dispatch({ type: ActionTypes.putNewSleepRecord });
    },
  };
}

/** Reducer */
function reducer(state: AppState, action: AppActions): AppState {
  switch (action.type) {
    case ActionTypes.getSleepRecords: {
      return {
        ...state,
        sleepRecords: action.sleepRecords,
      };
    }
    case ActionTypes.isCreatingUser: {
      return {
        ...state,
        isCreatingUser: action.isCreatingUser,
      };
    }
    default:
      return state;
  }
}

/* Context */
const initialState: AppState = {
  sleepRecords: [],
  isCreatingUser: false,
};

const AppStateContext = createContext<ContextShape>({
  state: initialState,
} as ContextShape);

const useAppState = (): ContextShape => useContext(AppStateContext);

const isDev = process.env.NODE_ENV === "development";

const AppStateContextProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(
    isDev ? logger(reducer) : reducer,
    initialState
  );
  const dispatchersRef = useRef(getDispatchers(dispatch));

  return (
    <AppStateContext.Provider
      value={{ state, dispatch: dispatchersRef.current }}
    >
      {children}
    </AppStateContext.Provider>
  );
};

function logger<S, A extends { type: unknown }>(
  reducer: (state: S, action: A) => S
) {
  return (state: S, action: A): S => {
    const next = reducer(state, action);
    console.groupCollapsed(
      "%cAction type:",
      "color: #00A7F7; font-weight: 700;",
      action.type
    );
    console.log(
      "%cPrevious State:",
      "color: #9E9E9E; font-weight: 700;",
      state
    );
    console.log("%cAction:", "color: #00A7F7; font-weight: 700;", action);
    console.log("%cNext State:", "color: #47B04B; font-weight: 700;", next);
    console.groupEnd();
    return next;
  };
}

export { useAppState, AppStateContextProvider };
