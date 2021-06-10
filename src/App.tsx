import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { ProjectList } from "./pages/project-list";
import { Login } from "./pages/login/login";

function App() {
  return (
    <div className="App">
      {/*<ProjectList />*/}
      <Login />
    </div>
  );
}

export default App;
