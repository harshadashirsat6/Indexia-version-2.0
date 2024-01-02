import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

const ProtectedLayout = () => {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default ProtectedLayout;
