import rdom from "react-dom/client";
import App from "./app.js";
import { RouterProvider } from "react-router";
import About from "./Components/About.js";
import Header from "./Components/Header.js";
import RestCard from "./Components/RestCard.js";
import { createBrowserRouter } from "react-router";
import MyCart from "./Components/MyCart.js";
import CartProvider from "./Components/CartProvider.js";
import { createContext } from "react";
import LoggedIn from "./Components/loginContext.js";

let LoggedIn = createContext();

// let routerConfig = createBrowserRouter([
//   {
//     path: "/",
//     element: <Header />,
//     children: [
//       {
//         path: "/",
//         element: <App />,
//       },
//       {
//         path: "/:restId/:restName",
//         element: <RestCard />,
//         children: [
//           {
//             path: "cart",
//             element: <MyCart />,
//           },
//         ],
//       },

//       {
//         path: "/about",
//         element: <About />,
//       },
//     ],
//   },
// ]);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Header />, // Top-level layout (optional)
    children: [
      {
        element: <CartProvider />, // Wrap shared state routes
        children: [
          {
            path: ":restId/:restName",
            element: <RestCard />,
          },
          {
            path: "cart",
            element: <MyCart />,
          },
        ],
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        index: true,
        element: <App />,
      },
    ],
  },
]);

rdom
  .createRoot(document.getElementById("root"))
  .render(<RouterProvider router={router} />);

export { LoggedIn };
