import React, { useReducer } from "react";
import Auth_Global from "./Auth_Global";
import Auth_reducer from "../reducer/Auth_reducer";

const Auth = (props) => {
  const [user, dispatch] = useReducer(Auth_reducer, {
    Authenticated: null,
    userInfo: {},
  });
  return (
    <Auth_Global.Provider value={{ user, dispatch }}>
      {props.children}
    </Auth_Global.Provider>
  );
};

export default Auth;
