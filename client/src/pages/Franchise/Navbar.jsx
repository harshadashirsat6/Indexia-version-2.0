import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [tab, setTab] = useState("loans");
  return (
    <div className="p-1">
      <section className="border-b-[1px]  border-blue-700 text-center text-2xl font-acme pt-2 pb-3 text-gray-300 ">
        FRANCHISE
      </section>
      <section className="py-2 text-white text-md">
        <nav className="px-2 flex flex-col gap-2 font-quicksand">
          <Link
            to="/loans"
            onClick={() => setTab("loans")}
            className={` ${
              tab === "loans" ? "bg-blue-400/30" : ""
            } text-left px-3 py-2 rounded-md hover:bg-blue-100/30`}
          >
            Loans
          </Link>
          <Link
            to="/profile"
            onClick={() => setTab("profile")}
            className={` ${
              tab === "profile" ? "bg-blue-400/30" : ""
            } text-left px-3 py-2 rounded-md hover:bg-blue-100/30`}
          >
            Profile
          </Link>
          <Link
            to="/report"
            onClick={() => setTab("report")}
            className={` ${
              tab === "report" ? "bg-blue-400/30" : ""
            } text-left px-3 py-2 rounded-md hover:bg-blue-100/30`}
          >
            Report
          </Link>
        </nav>
      </section>
    </div>
  );
};

export default Navbar;
