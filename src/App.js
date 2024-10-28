import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Login from "./components/Login";
import Browse from "./components/HomePage";
import Body from "./components/Body";

const Layout = () => (
  <>
    <Body />
    <Outlet />
  </>
);

const appRouter = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",        
        element: <Login />,
      },
      {
        path: "/browse", 
        element: <Browse />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={appRouter} />;
};

export default App;
