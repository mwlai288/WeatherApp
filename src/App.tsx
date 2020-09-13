import React from "react";
import "./App.css";
import Search from "./components/Search";
import { GlobalProvider } from "./context/GlobalState";

const App = () => {
  return (
    <>
      <GlobalProvider>
        <Search />
      </GlobalProvider>
    </>
  );
};

export default App;
