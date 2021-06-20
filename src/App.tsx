import "./wdry";
import React from "react";
import "./App.css";
import { SignIn } from "./pages/sign-in/sign-in";
import { useAuth } from "./context/auth-context";
import { AuthenticatedApp } from "./authenticated-app";
import { ErrorBoundary } from "./component/base/error-boundary";
import { BaseFullPageError } from "./component/base/base-fullpage-message";

function App() {
  const { user } = useAuth();

  return (
    <div className="App">
      <ErrorBoundary fallbackRender={BaseFullPageError}>
        {user ? <AuthenticatedApp /> : <SignIn />}
      </ErrorBoundary>
    </div>
  );
}

export default App;
