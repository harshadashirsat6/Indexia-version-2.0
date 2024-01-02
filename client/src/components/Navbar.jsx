import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = ({ auth, setAuth }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [navBg, setNavBg] = useState(false);
  window.addEventListener("scroll", () => {
    window.scrollY >= 20 ? setNavBg(true) : setNavBg(false);
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <nav
      className={`z-10 h-14 px-5 sm:px-10 md:px-20 lg:px-32 flex items-center justify-between fixed w-full top-0 ${
        navBg ? "bg-gray-100 shadow" : "bg-gray-100"
      }`}
    >
      <section>
        <img
          onClick={() => navigate("/")}
          src="./logo-indexia.gif"
          alt="logo-indexia"
          className="h-10 cursor-pointer"
        />
      </section>
      <section className="font-normal text-slate-600">
        <ul className="flex items-center space-x-5 text-sm">
          <li
            onClick={() => navigate("/emi-calculator")}
            className="hover:text-emerald-500 cursor-pointer"
          >
            EMI Calculator
          </li>
          <li
            onClick={() => navigate("/eligibility-calculator")}
            className="hover:text-emerald-500 cursor-pointer"
          >
            Eligibility Calculator
          </li>
          <li
            onClick={() => navigate("/contact")}
            className="hover:text-emerald-500 cursor-pointer"
          >
            Contact Us
          </li>
          {auth ? (
            <li
              onClick={() => navigate("/dashboard")}
              className="hover:text-emerald-500 cursor-pointer"
            >
              Dashborad
            </li>
          ) : null}
          <li
            className={`${
              auth ? "hover:text-red-500" : "hover:text-embrald-500"
            } cursor-pointer`}
          >
            {auth ? (
              <span
                onClick={() => {
                  setAuth("");
                  localStorage.removeItem("account");
                  localStorage.removeItem("token");

                }}
              >
                SignOut
              </span>
            ) : (
              <span onClick={() => navigate("/account")}>Login</span>
            )}
          </li>
        </ul>
      </section>
    </nav>
  );
};

export default Navbar;
