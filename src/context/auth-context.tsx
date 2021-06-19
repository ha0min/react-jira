import React, { ReactNode, useState } from "react";
import * as auth from "./auth-provider";
import { User } from "../utils/constant";
import { query } from "../utils/http";
import { useMount } from "../utils/base";
import { useAsync } from "../utils/use-async";
import {
  BaseFullPageError,
  BaseFullPageLoading,
} from "../component/base/base-fullpage-message";

interface AuthForm {
  username: string;
  password: string;
}

interface ContextType {
  user: User | null;
  register: (form: AuthForm) => Promise<void>;
  login: (form: AuthForm) => Promise<void>;
  logout: () => Promise<void>;
}

const initUser = async () => {
  let user = null;
  const token = auth.getToken();
  if (token) {
    const data = await query("me", { token });
    user = data.user;
  }
  return user;
};

const AuthContext = React.createContext<ContextType | undefined>(undefined);
AuthContext.displayName = "AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const {
    run,
    error,
    data: user,
    setData: setUser,
    isLoading,
    isIdle,
    isError,
    isSuccess,
  } = useAsync<User | null>();

  const login = (form: AuthForm) => auth.login(form).then(setUser);
  const register = (form: AuthForm) => auth.register(form).then(setUser);
  const logout = () => auth.logout().then(() => setUser(null));

  useMount(() => {
    run(initUser());
  });

  if (isIdle || isLoading) {
    return <BaseFullPageLoading />;
  }

  if (isError) {
    return (
      <BaseFullPageError
        error={error}
        handleButtonClick={() => {
          auth.logout().then(() => setUser(null));
        }}
      />
    );
  }

  return (
    <AuthContext.Provider
      children={children}
      value={{ user, login, register, logout }}
    />
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth需要在AuthProvider中使用！");
  }
  return context;
};
