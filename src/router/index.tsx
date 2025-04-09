import { lazy } from "react";
import Home from "../view/Home";
// import About from "../view/About";

const Page1 = lazy(() => import("../view/Page1"));
const Page2 = lazy(() => import("../view/Page2"));
const About = lazy(() => import("../view/About"));
const Header = lazy(() => import("../components/Header/Header"));

//navigate to redirect to home page
import { Navigate } from "react-router-dom";
import path from "path";

const routes = [
  {
    path: "/",
    element: <Navigate to="/" />, // redirect to home page
  },
  {
    path: "/",
    element: <Header />,
  },
  // {
  //   path: "/",
  //   element: <Home />,
  //   children: [
  //     {
  //       path: "/page1",
  //       element: <Page1 />,
  //     },
  //     {
  //       path: "/page2",
  //       element: <Page2 />,
  //     },
  //     {
  //       path: "/page3/301",
  //       element: <About />,
  //     },
  //     {
  //       path: "/page4",
  //       element: <About />,
  //     },
  //     {
  //       path: "/page5",
  //       element: <About />,
  //     },
  //   ],
  // },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
];

export default routes;
