import rdom from "react-dom/client";
import App from "./app.js";
import { BrowserRouter, Routes, Route, RouterProvider } from "react-router";
import About from "./Components/About.js";
import Header from "./Components/Header.js";
import RestCard from "./Components/RestCard.js";
import Error from "./Components/Error.js";
import { createBrowserRouter } from "react-router";

//   <BrowserRouter>
//     <Routes>
//       <Route element={<Header />} path="/">
//         <Route path="/" element={<App />}></Route>
//         <Route path="/:restId" element={<RestCard />} />
//         <Route path="/about" element={<About />} />
//       </Route>
//     </Routes>
//   </BrowserRouter>

let routerConfig = createBrowserRouter([
  {
    path: "/",
    element: <Header />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/:restId/:restName",
        element: <RestCard />,
      },

      {
        path: "/about",
        element: <About />,
      },
    ],
  },
]);

rdom.createRoot(document.getElementById("root")).render(
  <Error>
    <RouterProvider router={routerConfig} />
  </Error>
);
