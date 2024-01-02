import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import Navbar from "./Navbar";
import { setProfileDetails } from "../../store/franchiseSlice";

const Franchise = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setProfileDetails("hello"));
  });

  return (
    <div className="h-screen flex">
      <div className="w-[30%] sm:w-[15%] bg-blue-900">
        <Navbar />
      </div>
      <div className="w-[70%] sm:w-[85%] p-2 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Franchise;
