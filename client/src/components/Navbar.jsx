import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { BsMenuButtonWideFill } from "react-icons/bs";
import { CiLogin } from "react-icons/ci";

const Navbar = ({ auth, setAuth }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [navBg, setNavBg] = useState(false);
  const [navActive,setNavActive] = useState(false)

  window.addEventListener("scroll", () => {
    window.scrollY >= 20 ? setNavBg(true) : setNavBg(false);
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <nav
      className={`z-10  h-14 px-5 sm:px-10 md:px-20 lg:px-32 flex items-center justify-between fixed w-full top-0 ${
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
      <section className="font-normal text-slate-600 ">
        <ul onClick={()=>setNavActive(prev=>!prev)} className={`fixed duration-200  ${navActive?'block':'sm:m-0 -mr-48'} border-l top-14 sm:top-0 sm:relative sm:w-fit sm:border-transparent  w-48 sm:h-fit sm:bg-transparent  h-screen bg-white right-0    sm:flex items-center  sm:space-x-5 text-sm`}>
          <li
            onClick={() =>{
              navigate("/emi-calculator")
              setNavActive(prev=>!prev)
            }}
            className="hover:text-emerald-500 cursor-pointer sm:border-transparent sm:m-0 sm:bg-transparent sm:text-inherit  m-2 hover:sm:bg-gray-100 hover:bg-cyan-50 p-2 rounded border"
          >
            EMI Calculator
          </li>
          <li
            onClick={() =>{
              navigate("/emi-calculator")
              setNavActive(prev=>!prev)
            }}
            className="hover:text-emerald-500 cursor-pointer sm:border-transparent sm:m-0 sm:bg-transparent sm:text-inherit  m-2 hover:sm:bg-gray-100 hover:bg-cyan-50 p-2 rounded border"
            >
            Eligibility Calculator
          </li>
          <li
            onClick={() =>{
              navigate("/emi-calculator")
              setNavActive(prev=>!prev)
            }}
            className="hover:text-emerald-500 cursor-pointer sm:border-transparent sm:m-0 sm:bg-transparent sm:text-inherit border hover:sm:bg-gray-100  m-2 hover:bg-cyan-50 p-2 rounded "
            >
            Contact Us
          </li>
          {auth ? (
            <li
              onClick={() => navigate("/dashboard")}
              className="hover:text-emerald-500 cursor-pointer sm:border-transparent sm:m-0 sm:bg-transparent sm:text-inherit border hover:sm:bg-gray-100  m-2 hover:bg-cyan-50 p-2 rounded "
              >
              Dashborad
            </li>
          ) : null}
          <li
            className={`${
              auth ? "hover:text-red-500" : "hover:text-embrald-500 m-2 p-2 border rounded sm:border-transparent"
            } cursor-pointer flex items-center sm:block`}
          >
            <CiLogin className={`${auth?"-rotate-180":"-rotate-0"} mr-2 sm:hidden`} size={'18px'} />
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
      </section >
    
      <button className="sm:hidden" onClick={()=>setNavActive(prev=>!prev)} >
        <BsMenuButtonWideFill size={'35px'} className="text-cyan-500"/>
      </button>
    </nav>
  );
};

export default Navbar;
