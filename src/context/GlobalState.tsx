import React, { useReducer, createContext } from "react";

interface IState {
  currentWeather: [];
  forecastWeather: [];
  fiveDay: [];
}

const initialState: IState = {
  currentWeather: [],
  forecastWeather: [],
  fiveDay: [],
};

export const GlobalContext = createContext<IState | any>(initialState);

type Action = {
  type: string;
  payload: any;
};

// Reducers
function reducer(state: IState, action: Action) {
  switch (action.type) {
    case "search":
      return {
        ...state,
        currentWeather: action.payload,
      };
    case "forecast":
      return {
        ...state,
        fiveDay: action.payload,
      };
    case "celcius":
      return {
        ...state,
        celcius: true,
      };
    case "farenheit":
      return {
        ...state,
        celcius: false,
      };
    default:
      return state;
  }
}

export const GlobalProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GlobalContext.Provider
      value={{
        dispatch,
        currentWeather: state.currentWeather,
        fiveDay: state.fiveDay,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
