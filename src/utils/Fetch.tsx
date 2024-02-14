"use server";

import { base_url } from "../config";

type Props = {
  path: string;
  method: MethodType;
  body?: any;
  headers?: any;
  //   params?: string;
};

type MethodType = "GET" | "POST" | "PUT" | "DELETE";
const FETCH = async (props: Props) => {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      reject({
        msg: "request time out",
      });
    }, 1000 * 30); // time out 30s
    fetch(base_url + props.path, {
      method: props.method || "GET",
      headers: props.headers,
      body:
        typeof props.body === "string"
          ? props.body
          : JSON.stringify(props.body),
    }).then(async (response: Response) => {
      clearTimeout(timeout);
      if (!response) {
        reject({ msg: "Server error" });
        return false;
      }
      const responseJson = await response.json();
      resolve({
        status: response.ok,
        content: responseJson,
      });
    });
  });
};

export default FETCH;
