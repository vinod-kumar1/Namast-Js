import { createContext } from "react";

let LoggedIn = createContext({ login: true, setLogin: false });
export default LoggedIn;
