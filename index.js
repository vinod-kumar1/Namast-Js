import rdom from "react-dom/client";
import App from "./app";
import { BrowserRouter, Routes, Route } from "react-router";
import About from "./About";
import Header from "./Header";
import RestCard from "./RestCard";

rdom.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route element={<Header />} path="/">
        <Route path="/" element={<App />}></Route>
        <Route path="/:restId" element={<RestCard />} />
        <Route path="/about" element={<About />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
