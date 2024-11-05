import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Body from "./Body";

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Save the current path to localStorage whenever it changes
    localStorage.setItem('lastPath', location.pathname);
  }, [location]);

  return (
    <>
      <Body />
      <Outlet /> {/* This Outlet will render child routes here */}
    </>
  );
};

export default Layout;
