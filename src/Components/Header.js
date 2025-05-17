import { Link, Outlet } from "react-router";
import { useState, Suspense, lazy } from "react";
// import Onlinestatus from "./Onlinestatus";

export default function Header() {
  let [login, setLogin] = useState("Login");
  let Onlinestatus = lazy(() => import("./Onlinestatus"));
  let [theme, setTheme] = useState("light");

  return (
    <div
      className={`${
        theme == "light" ? " dark:!bg-white" : " dark:!bg-slate-800"
      } ${theme == "light" ? "dark:!text-black" : "dark:!text-white"}`}
    >
      <div className="header w-[100%] flex justify-between">
        <div className="header-logo relative top-1">
          <img
            className="logo rounded-md"
            width={100}
            src="https://imgs.search.brave.com/n0SGY1gJtNo19Zd_13HKYPve1Qb4ACF5OhgT4GJaj5Q/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tYXJr/ZXRwbGFjZS5jYW52/YS5jb20vRUFHRktz/ZUxKdG8vMi8wLzE2/MDB3L2NhbnZhLW9y/YW5nZS1hbmQtYmx1/ZS1pbGx1c3RyYXRp/dmUtY2lyY2xlLWZv/b2QtbG9nby1XRjVu/anc4cW1iMC5qcGc"
            alt="hotel logo"
          />
        </div>
        <p className="font-serif h-max py-4 w-[40%] px-12 rounded-r-2xl text-white relative top-4 text-5xl bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400">
          Gwiggy
        </p>
        <div className="header-link flex gap-4 relative right-4 top-8">
          <abbr title={theme == "light" ? "Dark mode" : "Light mode"}>
            <button
              onClick={() => {
                setTheme((p) => (p == "light" ? "dark" : "light"));
              }}
              className={`${
                theme == "light" ? "text-grey-700" : "text-white"
              } border-black relative -translate-y-4`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-12 h-12"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M21 12.79C20.44 12.93 19.86 13 19.25 13
             C14.14 13 10 8.86 10 3.75C10 3.14 10.07 2.56 10.21 2
             C6.06 2.64 3 6.39 3 10.75C3 16.14 7.61 20.75 13 20.75
             C17.36 20.75 21.11 17.69 21.75 13.54
             C21.51 13.63 21.26 13.7 21 13.75V12.79Z"
                />
              </svg>
            </button>
          </abbr>

          <Suspense fallback={<p className="signal">Loading...</p>}>
            <Onlinestatus />
          </Suspense>
          <Link className="hover:underline" to="/">
            Home
          </Link>
          <Link to="/about" className="hover:underline">
            About
          </Link>
          <button
            className="bg-blue-400 h-8 px-4 py-1 rounded-md hover:scale-[1.01]"
            onClick={() => setLogin((p) => (p == "Login" ? "Logout" : "Login"))}
          >
            {login}
          </button>
        </div>
      </div>
      <hr className="relative top-2" />
      <Outlet />
    </div>
  );
}
