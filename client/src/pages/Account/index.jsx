import { useState } from "react";
import { useNavigate } from "react-router-dom";
// components
import CustomerLogin from "../Account/CustomerLogin";
import CustomerSignup from "./CustomerSignup";
import FranchiseLogin from "./FranchiseLogin";
import FranchiseSignup from "../Account/FranchiseSignup";

const Account = () => {
  const navigate = useNavigate();

  const [accountType, setAccountType] = useState("customer");
  const [formType, setFormType] = useState({
    customerLogin: true,
    customerSignup: false,
    franchiseLogin: false,
    franchiseSignup: false,
  });

  return (
    <div className="h-screen w-screen relative flex justify-center items-center bg-blue-900/40">
      <div className="absolute top-0 left-0 h-[10rem] w-20 bg-blue-200 rounded-e-full"></div>
      <div className="absolute bottom-0 right-0 h-[10rem] w-20 bg-blue-200 rounded-s-full"></div>
      {/* home button */}
      <div className="z-10 absolute top-3 left-10 ">
        <h1
          className="text-2xl font-acme text-black tracking-wide cursor-pointer animate-pulse"
          onClick={() => navigate("/")}
        >
          IndexiaFinance
        </h1>
      </div>
      {/* account type toggle option */}
      <div className="flex flex-col z-30">
        <div
          className={` w-full m-auto bg-blue-100  flex rounded-xl font-serif`}
        >
          <p
            className={`w-[50%] ${
              accountType === "customer"
                ? "bg-blue-900  text-white rounded-xl shadow-xl shadow-black"
                : "text-blue-900"
            } px-3 py-2  cursor-pointer`}
            onClick={() => {
              setAccountType("customer");
              setFormType({
                customerLogin: true,
                customerSignup: false,
                franchiseLogin: false,
                franchiseSignup: false,
              });
            }}
          >
            Customer
          </p>
          <p
            className={`w-[50%]  ${
              accountType === "franchise"
                ? "bg-blue-900  text-white rounded-xl shadow-xl shadow-black"
                : "text-blue-900"
            } px-3 py-2 cursor-pointer`}
            onClick={() => {
              setAccountType("franchise");
              setFormType({
                customerLogin: false,
                customerSignup: false,
                franchiseLogin: true,
                franchiseSignup: false,
              });
            }}
          >
            Franchise
          </p>
        </div>
        {/* forms */}
        <div className="w-[20rem] md:w-[25rem] z-30 ">
          {accountType === "customer" ? (
            <div>
              {formType.customerLogin ? (
                <CustomerLogin formType={formType} setFormType={setFormType} />
              ) : formType.customerSignup ? (
                <CustomerSignup formType={formType} setFormType={setFormType} />
              ) : null}
            </div>
          ) : null}
          {accountType === "franchise" ? (
            <div>
              {formType.franchiseLogin ? (
                <FranchiseLogin formType={formType} setFormType={setFormType} />
              ) : formType.franchiseSignup ? (
                <FranchiseSignup
                  formType={formType}
                  setFormType={setFormType}
                />
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Account;
