import PrivateRoutes from "../conponents/PrivateRoutes";
import LayoutDefault from "../layout/LayoutDefault";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Answers from "../pages/Answers";
import Home from "../pages/Home";
import Quiz from "../pages/Quiz";
import Result from "../pages/Result";
import Topic from "../pages/Topic";
import Logout from "../pages/Logout";

export const routes = [
  {
    path: "/",
    element: <LayoutDefault />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "register",
        element: <Register />
      },
      {
        path: "logout",
        element: <Logout />
      },
      {
        element: <PrivateRoutes />,
        children: [
          {
            path: "answers",
            element: <Answers />
          },
          {
            path: "quiz/:id",
            element: <Quiz />
          },
          {
            path: "result/:id",
            element: <Result />
          },
          {
            path: "topic",
            element: <Topic />
          }
        ]
      }
    ]
  }
]