import Navbar from "./Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import axios from "axios";
import {BASE_URL} from "../utils/constants"; 
import { useDispatch } from "react-redux";
import {addUser} from "../utils/userSlice";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);

  const fetchUser = async () => {
    if(userData) return;
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
      withCredentials: true,
    });
    dispatch(addUser(res.data));
    } catch(err) {
      if(err.status === 401) {
      navigate("/login");
      } 
      console.error(err);
    }
  };

// Without useEffect, calling fetchUser() directly inside the component body 
// would cause multiple API calls on every re-render.
// useEffect ensures fetchUser runs only when the component first loads.

  useEffect(() => {
      fetchUser();
  }, []);

  return (
    <div> 
        <Navbar/>
        <Outlet/>
        <Footer/>
    </div>
  );
};

export default Body;