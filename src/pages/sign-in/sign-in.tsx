import React, { useState } from "react";
import { Login } from "./login";
import { Register } from "./register";

export const SignIn = () => {
  const [registerNow, setRegisterNow] = useState(false);

  return (
    <div>
      {registerNow ? <Register /> : <Login />}
      <button onClick={() => setRegisterNow(!registerNow)}>
        切换至{registerNow ? "登陆" : "注册"}
      </button>
    </div>
  );
};
