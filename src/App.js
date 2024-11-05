import { createBrowserRouter, Outlet, RouterProvider, useLocation } from "react-router-dom";
import Login from "./components/Login";
import Browse from "./components/HomePage";
import Body from "./components/Body";
import MovieTrailerPage from "./components/MovieTrailerPage";
import GptSearchPage from "./components/GptSearchPage";
import { useEffect } from "react";

const Layout = () => {

  const location = useLocation();

  useEffect(() => {
    localStorage.setItem('lastPath', location.pathname);
  }, [location]);
  
  return (
  <>
    <Body />
    <Outlet /> 
  </>
);
};

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
      {
        path: "/browse/gpt-search-page",
        element: <GptSearchPage />
      },
      {
        path: "/browse/trailer/:id",
        element: <MovieTrailerPage />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={appRouter} />;
};

export default App;
