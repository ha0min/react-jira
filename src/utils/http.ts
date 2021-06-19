// http所需相关工
import { apiUrl } from "./constant";
import qs from "qs";
import * as auth from "../context/auth-provider";
import { useAuth } from "../context/auth-context";
import { URLSearchParamsInit, useSearchParams } from "react-router-dom";
import { useMemo } from "react";

interface httpConfigType extends RequestInit {
  token?: string;
  data?: object;
}

// 去除无意义对象键值对，其中传入对象
export const cleanObject = (object: { [key: string]: unknown }) => {
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isVoid(value)) {
      delete result[key];
    }
  });
  return result;
};

// 判断是否为假
export const isFalsy = (value: any) => {
  return value === 0 ? false : !value;
};

// 判断是否为空
export const isVoid = (value: any) => {
  return value === undefined || value === null || value === "";
};

// 封装的请求函数
export const query = async (
  endpoint: string,
  { data, token, headers, ...otherConfig }: httpConfigType = {}
) => {
  const config = {
    method: "GET", // 默认
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": data ? "application/json" : "",
    },
    ...otherConfig,
  };

  if (config.method.toUpperCase() === "GET") {
    endpoint += `?${qs.stringify(data)}`;
  } else {
    config.body = JSON.stringify(data || {});
  }

  return window
    .fetch(`${apiUrl}/${endpoint}`, config)
    .then(async (response) => {
      if (response.status === 401) {
        await auth.logout();
        window.location.reload();
        return Promise.reject({ message: "请重新登陆" });
      }
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        return Promise.reject(data);
      }
    });
};

export const useHttp = () => {
  const { user } = useAuth();
  return (...[endpoint, config]: Parameters<typeof query>) =>
    query(endpoint, { ...config, token: user?.token });
};

export const useUrlParam = <K extends string>(keys: K[]) => {
  const [searchParams, setSearchParam] = useSearchParams();
  return [
    useMemo(
      () =>
        keys.reduce((prev, key) => {
          const o = { ...prev, [key]: searchParams.get(key) || "" };
          console.log("reduce", o);
          return o;
        }, {} as { [key in K]: string }),
      [searchParams]
    ),
    (params: Partial<{ [key in K]: unknown }>) => {
      const o = cleanObject({
        ...Object.fromEntries(searchParams),
        ...params,
      }) as URLSearchParamsInit;
      console.log("clean Object", o);
      return setSearchParam(o);
    },
  ] as const;
};
