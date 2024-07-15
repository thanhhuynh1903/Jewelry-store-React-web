import React, { createContext, useState } from "react";

const LoginContext = createContext();

function LoginProvider({ children }) {
  const [username, setUsername] = useState("");
  const [id, setId] = useState("");
  return (
    <LoginContext.Provider value={{ username, setUsername, id, setId }}>
      {children}
    </LoginContext.Provider>
  );
}

export { LoginContext, LoginProvider };
