import { Link, Outlet } from "react-router";
import { useState, Suspense, lazy } from "react";
// import Onlinestatus from "./Onlinestatus";

export default function Header() {
  let [login, setLogin] = useState("Login");
  let Onlinestatus = lazy(() => import("./Onlinestatus"));
  let btnStyle = {
    backgroundColor: login == "Login" ? "black" : "rgb(255, 82, 0)",
  };

  return (
    <div>
      <div className="header w-[100%] flex justify-between m-2">
        <div className="header-logo">
          <img
            className="logo rounded-md"
            width={100}
            src="https://imgs.search.brave.com/n0SGY1gJtNo19Zd_13HKYPve1Qb4ACF5OhgT4GJaj5Q/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tYXJr/ZXRwbGFjZS5jYW52/YS5jb20vRUFHRktz/ZUxKdG8vMi8wLzE2/MDB3L2NhbnZhLW9y/YW5nZS1hbmQtYmx1/ZS1pbGx1c3RyYXRp/dmUtY2lyY2xlLWZv/b2QtbG9nby1XRjVu/anc4cW1iMC5qcGc"
            alt="hotel logo"
          />
          <h2 className="text-orange-400 relative top-2">Welcome to Gwiggy</h2>
        </div>
        <div className="header-link flex gap-4 relative right-4 top-8">
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
