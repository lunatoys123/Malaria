import React, { useReducer } from "react";
import Auth_Global from "./Auth_Global";

const Auth = (props) => {
    const[user, dispatch] = useReducer()
  return <Auth_Global>{props.children}</Auth_Global>;
};

export default Auth;
