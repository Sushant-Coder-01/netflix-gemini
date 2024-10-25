import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import SignUp from "./SignUp";
import Login from "./Login";


const Body = () => {

const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <SignUp />
    },
    {
        path: "/in",
        element: <SignUp />
    },
    {
        path: "/login",
        element: <Login />
    }
])
  return <RouterProvider router={appRouter} />;
};

export default Body;
