import {
  FC,
  useReducer,
  createContext,
  useContext,
  useRef,
  Dispatch,
} from "react";

/* Types */
interface AppState {}

interface ContextShape {
  dispatch: Dispatchers;
  state: AppState;
}

/* Actions Types */
enum ActionTypes {
  getSleepRecords = "getSleepRecords",
  postUser = "postUser",
  putNewSleepRecord = "putNewSleepRecord",
}

interface Action<T> {
  type: T;
}

interface ActionGetSleepRecords extends Action<ActionTypes.getSleepRecords> {}

interface ActionPostUser extends Action<ActionTypes.postUser> {}

interface ActionPutSleepRecord extends Action<ActionTypes.putNewSleepRecord> {}

type AppActions = ActionGetSleepRecords | ActionPostUser | ActionPutSleepRecord;

/** Dispatchers */
type Dispatchers = {
  getSleepRecords: () => void;
  postUser: () => void;
  putSleepRecord: () => void;
};

function getDispatchers(dispatch: Dispatch<AppActions>): Dispatchers {
  return {
    getSleepRecords() {
      return dispatch({ type: ActionTypes.getSleepRecords });
    },
    postUser() {
      return dispatch({ type: ActionTypes.postUser });
    },
    putSleepRecord() {
      return { type: ActionTypes.putNewSleepRecord };
    },
  };
}

/** Reducer */
function reducer(state: AppState, action: AppActions): AppState {
  switch (action.type) {
    default:
      return state;
  }
}

/* Context */
const initialState: AppState = {};

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