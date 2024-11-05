import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { addUser, removeUser } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );

        const lastPath = localStorage.getItem("lastPath");

        if (lastPath === "/") {
          navigate("/browse"); 
        } else {
          navigate(lastPath || "/browse"); 
        }
      } else {
        dispatch(removeUser());
        navigate("/"); 
      }
    });

    return () => unsubscribe();
  }, [dispatch, navigate]); 

  return null;
};

export default Body;
