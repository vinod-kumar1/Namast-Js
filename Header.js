import { Link, Outlet } from "react-router";
import { useState } from "react";

export default function Header() {
  let [login, setLogin] = useState("Login");

  let btnStyle = {
    backgroundColor: login == "Login" ? "black" : "rgb(255, 82, 0)",
  };

  return (
    <div>
      <div className="header">
        <div className="header-logo">
          <img
            className="logo"
            width={100}
            src="https://imgs.search.brave.com/n0SGY1gJtNo19Zd_13HKYPve1Qb4ACF5OhgT4GJaj5Q/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tYXJr/ZXRwbGFjZS5jYW52/YS5jb20vRUFHRktz/ZUxKdG8vMi8wLzE2/MDB3L2NhbnZhLW9y/YW5nZS1hbmQtYmx1/ZS1pbGx1c3RyYXRp/dmUtY2lyY2xlLWZv/b2QtbG9nby1XRjVu/anc4cW1iMC5qcGc"
            alt="hotel logo"
          />
          <h2>Welcome to Gwiggy</h2>
        </div>
        <div className="header-link">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <button
            className="btn"
            style={btnStyle}
            onClick={() => setLogin((p) => (p == "Login" ? "Logout" : "Login"))}
          >
            {login}
          </button>
        </div>
      </div>
      <Outlet />
    </div>
  );
}
