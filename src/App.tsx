import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { SignIn } from "./pages/sign-in/sign-in";
import { useAuth } from "./context/auth-context";
import { AuthenticatedApp } from "./authenticated-app";

function App() {
  const { user } = useAuth();

  return <div className="App">{user ? <AuthenticatedApp /> : <SignIn />}</div>;
}

export default App;
