import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "../components/Navbar";
import Modal from "../components/Modals";
import Footer from "../components/Footer";
import FeedbackButton from "../components/FeedbackButton.jsx";
import { setUserProfileDetails } from "../store/appSlice.js";

const Layout = ({ auth, setAuth }) => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      setAuth(token);
    }
  }, [token]);

  const user = {
    name: "John Doe",
    age: "male",
  };
  // fetch user profile
  const getUserDetails = async () => {
    dispatch(setUserProfileDetails(user));
  };
  useEffect(() => {
    if (auth) {
      getUserDetails();
    }
  }, [auth]);

  return (
    <main className="font-quicksand text-slate-700 font-extralight">
      <Toaster position="top-right" />
      <Navbar auth={auth} setAuth={setAuth} />
      <Outlet />
      <Footer />
      <Modal />
      <FeedbackButton />
    </main>
  );
};

export default Layout;
