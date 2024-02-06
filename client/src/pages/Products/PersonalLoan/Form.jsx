import React, { useState, useRef, useEffect } from "react";
import YupString from "../../../validation/form";
import {
  loanTenure,
  residencyType,
  employmentType,
  employerType,
  primaryBankAccount,
  incomeRecievedAs,
} from "../../../configs/selectorConfigs";

// import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";

import { useSelector, useDispatch } from "react-redux";
import {
  setFormData,
  setShowSubmitLoanFormPaymentModal,
} from "../../../store/appSlice";
import { Link } from "react-router-dom";
import { changeIntoDate } from "../../../validation/function";
import DatePicker from "../../../components/DatePicker/DatePicker";
import { FaRegCalendarAlt } from "react-icons/fa";

const FormAB = ({ states, cities, setSelectedState, selectedState, user }) => {
  const { formData } = useSelector((store) => store.app);
  const dispatch = useDispatch();

  const [checkBox2, setCheckBox2] = useState(true);
  const [checkBox1, setCheckBox1] = useState(false);
  const [activeCl, setActiveCl] = useState(true);

  const [persionalLoanObj, setPersionalUseObj] = useState({
    ...formData,
    loanTenureOption: "",
  });

  const [persionalConditionalObj, setPersionalConditionalUseObj] = useState({
    primaryBankAccount: "",
  });

  const [employerTypeCondition, setEmployerCondition] = useState({
    employerType: "",
  });

  const [touchedInputs, setTouchedInputs] = useState({
    name: false,
    dateOfBirth: false,
    state: false,
    city: false,
    pincode: false,
    residencyType: false,
    panCardNum: false,
    loanAmount: false,
    loanTenure: false,
    employmentType: false,
    employerType: false,
    employerName: false,
    yearlyIncome: false,
    monthlyIncome: false,
    existingEmi: false,
    contact: false,
    email: false,
    primaryBankAccount: false,
    primaryBankAccountCon: false,
    employerType2: false,
    loanTenureOption: false,
  });

  // ref
  const renderInputBankRef = useRef();

  function checkAge() {
    const currentDate = new Date();
    const selectedDate = new Date(
      persionalLoanObj.dateOfBirth.split("-").reverse().join("-")
    );
    const age = currentDate.getFullYear() - selectedDate.getFullYear();
    return age <= 21;
  }

  function calculateEmi() {
    if (persionalLoanObj.existingEmi != 0) {
      const salary =
        persionalLoanObj.monthlyIncome || persionalLoanObj.yearlyIncome / 12;
      const emi = salary * 0.8;
      if (persionalLoanObj.existingEmi > emi) {
        return true;
      }
    }
    return false;
  }

  const handaleMail = () => {
    if (
      !persionalLoanObj?.email?.includes(".com") ||
      !persionalLoanObj?.email?.includes("@")
    ) {
      return true;
    }
    return false;
  };

  const handaleContact = () => {
    if (
      persionalLoanObj?.contact?.length > 10 ||
      persionalLoanObj?.contact?.length < 10
    ) {
      return true;
    }
    return false;
  };
  const validationSchema = {
    dateOfBirth: YupString(persionalLoanObj.dateOfBirth)
      .test(checkAge, "Must be at least 21 years old")
      .required("Date of birth required"),
    state: YupString(persionalLoanObj.state).required("State required"),
    city: YupString(persionalLoanObj.city).required("City required"),
    pincode: YupString(persionalLoanObj.pincode)
      .isInt("Pincode must be a number")
      .required("Pincode required"),
    residencyType: YupString(persionalLoanObj.residencyType).required(
      "Residency type required"
    ),
    panCardNum: YupString(persionalLoanObj.panCardNum + "".toLowerCase())
      .matches(/^[A-Z0-9]+$/, "Only alphanumeric characters are allowed")
      .required("Pancard number required")
      .length(10, "Pan card number should be 10 characters")
      .matches(/^[a-zA-Z]{5}\d{4}[a-zA-Z]$/, "Invalid pancard number"),
    loanAmount: YupString(persionalLoanObj.loanAmount)
      .isInt("Loan amount must be a number")
      .minNumber(0, "min 1 lakh")
      .required("Loan amount required"),
    loanTenure: YupString(persionalLoanObj.loanTenure).required(
      "Loan tenure required"
    ),
    loanTenureOption: YupString(persionalLoanObj.loanTenureOption).required(
      "Loan tenure required"
    ),
    employmentType: YupString(persionalLoanObj.employmentType).required(
      "Employment type required"
    ),
    employerType: YupString(persionalLoanObj.employerType).required(
      " Employer type required"
    ),
    employerType2: YupString(persionalLoanObj.employerType).required(
      "Employer type required"
    ),
    employerName: YupString(persionalLoanObj.employerName).required(
      "Employer name required"
    ),
    yearlyIncome: YupString(persionalLoanObj.yearlyIncome || "").required(
      "Please enter valid income"
    ),
    monthlyIncome: YupString(persionalLoanObj.monthlyIncome || "")
      .minNumber(12000, "Salary min 12k")
      .required("Please enter valid income"),
    existingEmi: YupString(persionalLoanObj.existingEmi + "")
      .test(calculateEmi, "EMI should be less than 80% of your monthly income")
      .required("EMI required"),

    primaryBankAccount: YupString(persionalLoanObj.primaryBankAccount).required(
      "Salary account required"
    ),
  };

  const handaleChange = (e) => {
    setPersionalUseObj((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // console.log(persionalLoanObj.panCardNum)

  const handleSubmit = (e) => {
    e.preventDefault(); // Corrected to include parentheses
    const val =
      persionalLoanObj.employmentType === "Salaried"
        ? "monthlyIncome"
        : "yearlyIncome";
    // console.log(validationSchema)
    let active = true;

    for (const obj in validationSchema) {
      if (["monthlyIncome", "yearlyIncome"].includes(obj)) {
        if (active && validationSchema[val].errorMessages.trim()) {
          active = false;
        }
      } else if (!["monthlyIncome", "yearlyIncome"].includes(obj)) {
        if (active && validationSchema[obj].errorMessages.trim()) {
          active = false;
          console.log(validationSchema[obj].errorMessages);
        }
      }
    }

    setTouchedInputs({
      name: true,
      dateOfBirth: true,
      state: true,
      city: true,
      pincode: true,
      residencyType: true,
      panCardNum: true,
      loanAmount: true,
      loanTenure: true,
      employmentType: true,
      employerType: true,
      employerName: true,
      yearlyIncome: true,
      monthlyIncome: true,
      existingEmi: true,
      contact: true,
      email: true,
      primaryBankAccount: false,
      primaryBankAccountCon: false,
      employerType2: false,
      loanTenureOption: false,
    });
    if (active) {
      dispatch(setShowSubmitLoanFormPaymentModal(true));
      dispatch(setFormData({ ...persionalLoanObj }));
    }
  };

  useEffect(() => {
    setPersionalUseObj((prev) => ({ ...prev, existingEmi: prev.existingEmi }));
  }, [persionalLoanObj.monthlyIncome, persionalLoanObj.yearlyIncome]);

  console.log(persionalLoanObj.dateOfBirth.split("-").join(""));

  return (
    <div className="py-4 ">
      <h1 className="flex flex-col mb-8 text-xl font-semibold text-gray-500">
        <span>
          Unlock best <span>personal loan</span> offers suitable for your needs
          from <span>43+ lenders</span>
        </span>
        <span className="w-20 h-0.5 rounded-full bg-cyan-400 mt-3"></span>
      </h1>
      <form
        className="block lg:grid lg:grid-cols-2  gap-8"
        onSubmit={handleSubmit}
      >
        <div className="py-1 border-b border-slate-400 ">
          <span className=" text-gray-500 font-semibold">Full Name</span>
          <input
            placeholder="As per PAN card"
            type="text"
            onChange={handaleChange}
            onBlur={() => setTouchedInputs((prev) => ({ ...prev, name: true }))}
            value={user?.name}
            name={"name"}
            className="w-full bg-transparent border-none outline-none placeholder:text-slate-700"
            readOnly
          />

          {/* {touchedInputs.name ? (
            <span className="text-xs font-bold text-red-500">
              {validationSchema.name.validate()}
            </span>
          ) : (
            ""
          )} */}
        </div>
        <div className="py-1 border-b border-slate-400 ">
          <span className=" text-gray-500 font-semibold">
            Date of Birth (As per PAN card){" "}
          </span>
          <div className={"flex relative"}>
            <input
              placeholder="DD-MM-YYYY"
              type="text"
              onChange={(e) => {
                const formattedDate = changeIntoDate(
                  e.target.value,
                  "DD-MM-YYYY"
                );
                if (formattedDate.length > 10) {
                  return;
                }
                handaleChange({
                  target: { value: formattedDate, name: "dateOfBirth" },
                });
              }}
              onBlur={() =>
                setTouchedInputs((prev) => ({ ...prev, dateOfBirth: true }))
              }
              name={"dateOfBirth"}
              className="w-full bg-transparent border-none outline-none placeholder:text-slate-500"
              value={persionalLoanObj.dateOfBirth}
            />

            <div
              id="e;ljfeijfie"
              className="w-8 h-[inherit]  bg-gray-200 flex items-center justify-center rounded cursor-pointer"
              onClick={(e) => {
                if (e.target.id === "e;ljfeijfie") {
                  setActiveCl((prev) => !prev);
                  setTouchedInputs((prev) => ({ ...prev, dateOfBirth: true }));
                }
              }}
            >
              <FaRegCalendarAlt
                onClick={(e) => {
                  setActiveCl((prev) => !prev);
                  setTouchedInputs((prev) => ({ ...prev, dateOfBirth: true }));
                }}
              />
              <div className={activeCl ? "hidden" : "block "}>
                <DatePicker
                  setActive={() => {
                    setActiveCl(true);
                  }}
                  handaleDate={(date) => {
                    handaleChange({
                      target: { value: date, name: "dateOfBirth" },
                    });
                  }}
                  clearFun={() => {
                    handaleChange({
                      target: { value: "", name: "dateOfBirth" },
                    });
                  }}
                  date={persionalLoanObj.dateOfBirth}
                />
              </div>
            </div>
          </div>
          {touchedInputs.dateOfBirth ? (
            <span className="text-xs font-bold text-red-500">
              {validationSchema.dateOfBirth.validate()}
            </span>
          ) : (
            ""
          )}
        </div>

        <div className="col-span-1 sm:col-span-2">
          <span className=" text-gray-500 font-semibold">PAN Card Number</span>
          <div className="py-1 border-b border-slate-400">
            <input
              placeholder="Enter Permanent Account Number"
              type="text"
              onChange={(e) => {
                handaleChange({
                  target: {
                    name: "panCardNum",
                    value: e.target.value.toUpperCase(),
                  },
                });
              }}
              name="panCardNum"
              value={persionalLoanObj.panCardNum}
              onBlur={() =>
                setTouchedInputs((prev) => ({ ...prev, panCardNum: true }))
              }
              className="w-full bg-transparent border-none outline-none placeholder:text-slate-500"
            />
          </div>

          {touchedInputs.panCardNum ? (
            <span className="text-xs font-bold text-red-500">
              {validationSchema.panCardNum.validate()}
            </span>
          ) : (
            ""
          )}
        </div>
        <div>
          <span className=" text-gray-500 font-semibold">Loan Amount</span>
          <div className="py-1 border-b border-slate-400">
            <input
              placeholder=""
              type="number"
              onBlur={() =>
                setTouchedInputs((prev) => ({ ...prev, loanAmount: true }))
              }
              onChange={handaleChange}
              value={persionalLoanObj.loanAmount}
              name="loanAmount"
              className="w-full bg-transparent border-none outline-none placeholder:text-slate-500"
            />
          </div>
          {touchedInputs.loanAmount ? (
            <span className="text-xs font-bold text-red-500">
              {validationSchema.loanAmount.validate()}
            </span>
          ) : (
            ""
          )}
        </div>
        <div>
          <span className=" text-gray-500 font-semibold">Loan Tenure</span>
          <div className="flex gap-2 bg-gray-200/40 border-[1px] border-gray-400 rounded-md">
            <select
              className="bg-transparent w-full py-2.5"
              name="loanTenureOption"
              value={persionalLoanObj.loanTenureOption}
              onBlur={() =>
                setTouchedInputs((prev) => ({
                  ...prev,
                  loanTenureOption: true,
                }))
              }
              onChange={(e) => {
                handaleChange({
                  target: { name: "loanTenureOption", value: e.target.value },
                });
                handaleChange({
                  target: {
                    name: "loanTenure",
                    value: e.target.value === "Other" ? "" : e.target.value,
                  },
                });
              }}
            >
              <option value="">Select</option>
              {loanTenure.map((tenure, i) => (
                <option key={i} value={tenure}>
                  {tenure}
                </option>
              ))}
            </select>
          </div>
          {touchedInputs.loanTenureOption ? (
            <span className="text-xs font-bold text-red-500">
              {validationSchema.loanTenureOption.validate()}
            </span>
          ) : (
            ""
          )}
        </div>
        {persionalLoanObj.loanTenureOption === "Other" && (
          <div className="col-span-1 sm:col-span-2">
            <span className=" text-gray-500 font-semibold">Loan Tenure </span>
            <div className="py-1 border-b border-slate-400">
              <input
                placeholder="Loan Tenure"
                type="text"
                onChange={handaleChange}
                name="loanTenure"
                value={persionalLoanObj.loanTenure}
                onBlur={() =>
                  setTouchedInputs((prev) => ({ ...prev, loanTenure: true }))
                }
                className="w-full bg-transparent border-none outline-none placeholder:text-slate-500"
              />
            </div>

            {touchedInputs.loanTenure ? (
              <span className="text-xs font-bold text-red-500">
                {validationSchema.loanTenure.validate()}
              </span>
            ) : (
              ""
            )}
          </div>
        )}
        <div>
          <span className=" text-gray-500 font-semibold">Employment Type</span>
          <div className="flex gap-2 bg-gray-200/40 border-[1px] border-gray-400 rounded-md">
            <select
              className="bg-transparent w-full py-2.5"
              value={persionalLoanObj.employmentType}
              onChange={handaleChange}
              name="employmentType"
              onBlur={() =>
                setTouchedInputs((prev) => ({ ...prev, employmentType: true }))
              }
            >
              <option value={""}>Select</option>
              {employmentType.map((ele) => {
                return (
                  <option key={ele} value={ele}>
                    {ele}
                  </option>
                );
              })}
            </select>
          </div>
          {touchedInputs.employmentType ? (
            <span className="text-xs font-bold text-red-500">
              {validationSchema.employmentType.validate()}
            </span>
          ) : (
            ""
          )}
        </div>
        <div>
          <span className=" text-gray-500 font-semibold">
            Salary Bank Account
          </span>
          <div className="flex gap-2 bg-gray-200/40 border-[1px] border-gray-400 rounded-md">
            <select
              className="bg-transparent w-full py-2.5"
              name="primaryBankAccount"
              value={
                persionalConditionalObj.primaryBankAccount ||
                persionalLoanObj.primaryBankAccount
              }
              onChange={(e) => {
                if (e.target.value === "Other") {
                  setPersionalConditionalUseObj((prev) => ({
                    ...prev,
                    primaryBankAccount: e.target.value,
                  }));
                  handaleChange({
                    target: { value: "", name: "primaryBankAccount" },
                  });
                } else {
                  setPersionalConditionalUseObj((prev) => ({
                    ...prev,
                    primaryBankAccount: "",
                  }));
                  handaleChange(e);
                }
              }}
              onBlur={() =>
                setTouchedInputs((prev) => ({
                  ...prev,
                  primaryBankAccount: true,
                }))
              }
            >
              <option value={""}>Select</option>
              {primaryBankAccount.map((ele) => {
                return (
                  <option key={ele} value={ele}>
                    {ele}
                  </option>
                );
              })}
            </select>
          </div>
          {touchedInputs.primaryBankAccount &&
          persionalConditionalObj.primaryBankAccount !== "Other" ? (
            <span className="text-xs font-bold text-red-500  ">
              {validationSchema.primaryBankAccount.validate()}
            </span>
          ) : (
            ""
          )}
        </div>

        {persionalConditionalObj.primaryBankAccount === "Other" && (
          <div>
            <span className=" text-gray-500 font-semibold">
              Salary Account Bank Name
            </span>
            <div className="py-1 border-b border-slate-400 duration-200">
              <input
                placeholder="Enter Salary Account Bank Name"
                type="text"
                name="primaryBankAccount"
                onBlur={() =>
                  setTouchedInputs((prev) => ({
                    ...prev,
                    primaryBankAccountCon: true,
                  }))
                }
                value={persionalLoanObj.primaryBankAccount}
                onChange={handaleChange}
                className="w-full bg-transparent border-none outline-none placeholder:text-slate-500"
              />
              {touchedInputs.primaryBankAccountCon ? (
                <span className="text-xs font-bold text-red-500">
                  {validationSchema.primaryBankAccount.validate()}
                </span>
              ) : (
                ""
              )}
            </div>
          </div>
        )}

        <div>
          <span className=" text-gray-500 font-semibold">Employer Type</span>
          <div className="flex gap-2 bg-gray-200/40 border-[1px] border-gray-400 rounded-md">
            <select
              className="bg-transparent w-full py-2.5"
              onBlur={() =>
                setTouchedInputs((prev) => ({ ...prev, employerType: true }))
              }
              value={
                employerTypeCondition.employerType ||
                persionalLoanObj.employerType
              }
              onChange={(e) => {
                if (e.target.value === "Other") {
                  setEmployerCondition((prev) => ({
                    ...prev,
                    employerType: e.target.value,
                  }));
                  handaleChange({
                    target: { value: "", name: "employerType" },
                  });
                } else {
                  setEmployerCondition((prev) => ({
                    ...prev,
                    employerType: e.target.value,
                  }));
                  handaleChange(e);
                }
              }}
              name="employerType"
            >
              <option value={""}>Select</option>
              {employerType.map((ele) => {
                return (
                  <option key={ele} value={ele}>
                    {ele}
                  </option>
                );
              })}
            </select>
          </div>

          {touchedInputs.employerType &&
          employerTypeCondition.employerType !== "Other" ? (
            <span className="text-xs font-bold text-red-500">
              {validationSchema.employerType.validate()}
            </span>
          ) : (
            ""
          )}
        </div>
        {employerTypeCondition.employerType === "Other" && (
          <div>
            <span className=" text-gray-500 font-semibold">Employer Type</span>
            <div className="py-1 border-b border-slate-400 duration-200">
              <input
                placeholder="Enter Employer Type"
                type="text"
                name="employerType"
                onBlur={() =>
                  setTouchedInputs((prev) => ({ ...prev, employerType2: true }))
                }
                value={persionalLoanObj.employerType}
                onChange={handaleChange}
                className="w-full bg-transparent border-none outline-none placeholder:text-slate-500"
              />
              {touchedInputs.employerType2 ? (
                <span className="text-xs font-bold text-red-500">
                  {validationSchema.employerType2.validate()}
                </span>
              ) : (
                ""
              )}
            </div>
          </div>
        )}

        <div>
          <span className=" text-gray-500 font-semibold">Employer Name</span>
          <div className="py-1 border-b border-slate-400">
            <input
              placeholder="Enter your company name"
              type="text"
              value={persionalLoanObj.employerName}
              className="w-full bg-transparent border-none outline-none placeholder:text-slate-500"
              onBlur={() =>
                setTouchedInputs((prev) => ({ ...prev, employerName: true }))
              }
              onChange={handaleChange}
              name="employerName"
            />
          </div>
          {touchedInputs.employerName ? (
            <span className="text-xs font-bold text-red-500">
              {validationSchema.employerName.validate()}
            </span>
          ) : (
            ""
          )}
        </div>

        <div className="py-1 ">
          {persionalLoanObj.employmentType === "Salaried" &&
          persionalLoanObj.employmentType === "Salaried" ? (
            <div>
              <span className=" text-gray-500 font-semibold">
                <span className="px-1">
                  {" "}
                  {persionalLoanObj.employmentType === "Salaried"
                    ? "Monthly"
                    : "Yearly "}{" "}
                </span>
                Income
              </span>
              <input
                placeholder="Enter your monthly income"
                type="number"
                name="monthlyIncome"
                value={persionalLoanObj.monthlyIncome}
                onChange={handaleChange}
                className="bg-transparent w-full outline-none  placeholder:text-slate-500 border-b-[1px] border-slate-800"
                onBlur={() =>
                  setTouchedInputs((prev) => ({ ...prev, monthlyIncome: true }))
                }
              />
              {touchedInputs.monthlyIncome ? (
                <span className="text-xs font-bold text-red-500">
                  {validationSchema.monthlyIncome.validate()}
                </span>
              ) : (
                ""
              )}
            </div>
          ) : (
            <div>
              <span className=" text-gray-500 font-semibold">
                <span className="px-1">
                  {persionalLoanObj.employmentType === "Salaried"
                    ? "Monthly Net"
                    : "Yearly "}
                </span>
                Income
              </span>
              <input
                placeholder="Enter your Monthly Income"
                type="number"
                name="yearlyIncome"
                value={persionalLoanObj.yearlyIncome}
                onChange={handaleChange}
                className="bg-transparent w-full outline-none  placeholder:text-slate-500 border-b-[1px] border-slate-800"
                onBlur={() =>
                  setTouchedInputs((prev) => ({ ...prev, yearlyIncome: true }))
                }
              />
              {touchedInputs.yearlyIncome ? (
                <span className="text-xs font-bold text-red-500">
                  {validationSchema.yearlyIncome.validate()}
                </span>
              ) : (
                ""
              )}
            </div>
          )}
        </div>

        <div>
          <span className=" text-gray-500 font-semibold">
            Income recieved as
          </span>
          <div className="flex gap-2 bg-gray-200/40 border-[1px] border-gray-400 rounded-md">
            <select
              className="bg-transparent w-full disabled:cursor-not-allowed py-2.5"
              name="incomeRecievedAs"
              value={persionalLoanObj.incomeRecievedAs}
              onChange={handaleChange}
              onBlur={() =>
                setTouchedInputs((prev) => ({
                  ...prev,
                  incomeRecievedAs: true,
                }))
              }
            >
              <option value="">Select</option>
              {incomeRecievedAs.map((ele, i) => {
                return (
                  <option key={ele} value={ele}>
                    {ele}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div>
          <span className=" text-gray-500 font-semibold">Existing EMI</span>
          <div className="py-1 border-b border-slate-400">
            <input
              placeholder="Enter your Existing EMI if any"
              type="number"
              value={persionalLoanObj.existingEmi}
              onChange={handaleChange}
              onBlur={() =>
                setTouchedInputs((prev) => ({ ...prev, existingEmi: true }))
              }
              name="existingEmi"
              className="w-full bg-transparent border-none outline-none placeholder:text-slate-500"
            />
          </div>
          {touchedInputs.existingEmi ? (
            <span className="text-xs font-bold text-red-500">
              {validationSchema.existingEmi.validate()}
            </span>
          ) : (
            ""
          )}
        </div>

        <div>
          <span className=" text-gray-500 font-semibold">State</span>
          <div className="flex gap-2 bg-gray-200/40 border-[1px] border-gray-400 rounded-md">
            <select
              className="bg-transparent w-full py-2.5"
              onChange={(e) => {
                handaleChange(e);
                setSelectedState(e.target.value);
              }}
              value={persionalLoanObj.state}
              name={"state"}
              onBlur={() =>
                setTouchedInputs((prev) => ({ ...prev, state: true }))
              }
            >
              <option value={""}>Select</option>
              {states
                .sort((a, b) => (a.name > b.name ? 1 : -1))
                .map((obj) => {
                  return (
                    <option key={obj.id} value={obj.iso2}>
                      {obj.name}
                    </option>
                  );
                })}
            </select>
          </div>
          {touchedInputs.state ? (
            <span className="text-xs font-bold text-red-500">
              {validationSchema.state.validate()}
            </span>
          ) : (
            ""
          )}
        </div>
        <div>
          <span className=" text-gray-500 font-semibold">City</span>
          <div className="flex gap-2 bg-gray-200/40 border-[1px] border-gray-400 rounded-md">
            <select
              className="bg-transparent w-full disabled:cursor-not-allowed py-2.5"
              value={persionalLoanObj.city}
              name="city"
              onBlur={() =>
                setTouchedInputs((prev) => ({ ...prev, city: true }))
              }
              disabled={!selectedState}
              onChange={handaleChange}
            >
              <option value={""}>Select</option>
              {cities.map((obj) => {
                return (
                  <option key={obj.id} value={obj.name}>
                    {obj.name}
                  </option>
                );
              })}
            </select>
          </div>
          {touchedInputs.city ? (
            <span className="text-xs font-bold text-red-500">
              {validationSchema.city.validate()}
            </span>
          ) : (
            ""
          )}
        </div>
        <div>
          <span className=" text-gray-500 font-semibold">
            Residence Pincode
          </span>
          <div className="py-1 border-b border-slate-400">
            <input
              // type="number"
              placeholder="Enter Residence Pincode"
              onChange={handaleChange}
              // {...formik.getFieldProps("pincode")}.
              onBlur={() =>
                setTouchedInputs((prev) => ({ ...prev, pincode: true }))
              }
              name="pincode"
              value={persionalLoanObj.pincode}
              className="w-full bg-transparent border-none outline-none placeholder:text-slate-500"
            />
          </div>
          {touchedInputs.pincode ? (
            <span className="text-xs font-bold text-red-500">
              {validationSchema.pincode.validate()}
            </span>
          ) : (
            ""
          )}
        </div>
        <div>
          <span className=" text-gray-500 font-semibold">Residence Type</span>
          <div className="py-1 border-b border-slate-400">
            <select
              onChange={handaleChange}
              name="residencyType"
              value={persionalLoanObj.residencyType}
              onBlur={() =>
                setTouchedInputs((prev) => ({ ...prev, residencyType: true }))
              }
              placeholder="Enter Residence Type"
            >
              <option value={""}>Select Residency Type</option>
              {residencyType.map((ele, i) => {
                return <option key={i}>{ele}</option>;
              })}
            </select>
          </div>
          {touchedInputs.residencyType ? (
            <span className="text-xs font-bold text-red-500">
              {validationSchema.residencyType.validate()}
            </span>
          ) : (
            ""
          )}
        </div>

        <div>
          <span className=" text-gray-500 font-semibold">Email Address</span>
          <div className="py-1 border-b border-slate-400">
            <input
              placeholder="Enter your Email Address"
              type="text"
              value={user?.email}
              onChange={handaleChange}
              onBlur={() =>
                setTouchedInputs((prev) => ({ ...prev, email: true }))
              }
              name="email"
              className="w-full bg-transparent border-none outline-none placeholder:text-slate-500"
              readOnly
            />
          </div>
          {/* {touchedInputs.email ? (
            <span className="text-xs font-bold text-red-500">
              {validationSchema.email.validate()}
            </span>
          ) : (
            ""
          )} */}
        </div>
        <div>
          <span className=" text-gray-500 font-semibold">Mobile Number</span>
          <div className="flex items-center space-x-2.5 border-b border-slate-400 py-1">
            <img src="/india.png" alt="india" className="h-4 w-7" />
            <span className="whitespace-nowrap">+91 -</span>
            <input
              type="number"
              value={user?.contact}
              onChange={handaleChange}
              onBlur={() =>
                setTouchedInputs((prev) => ({ ...prev, contact: true }))
              }
              name="contact"
              className="w-full bg-transparent border-none outline-none"
              readOnly
            />
          </div>
          {/* {touchedInputs.contact ? (
            <span className="text-xs font-bold text-red-500">
              {validationSchema.contact.validate()}
            </span>
          ) : (
            ""
          )} */}
        </div>
        <div className="col-span-2 sm:col-span-2">
          <div>
            {/* <input 
              type="checkbox"
              checked={checkBox1}
              onChange={() => setCheckBox1(!checkBox1)}
            />
            <label className="pl-2">Terms & Conditions 1</label> */}

            <ReCAPTCHA
              sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
              onChange={(res) => {
                setCheckBox1((prev) => !prev);
              }}
            />
          </div>
          <div>
            <input
              type="checkbox"
              checked={checkBox2}
              onChange={() => setCheckBox2((prev) => !prev)}
            />
            <label className="pl-2 font-semibold">
              By continuing, you agree to Indexia Finance.
              <Link className="text-blue-800"> Terms of Use </Link>
              and <Link className="text-blue-800"> Privacy Policy</Link>.
            </label>
          </div>
        </div>
        <div className="w-1/2 mx-auto pt-2.5">
          <button
            className="bg-cyan-400 py-2.5 w-full rounded-lg text-lg text-white font-normal duration-200 disabled:cursor-not-allowed disabled:bg-gray-200"
            type="submit"
            disabled={!checkBox1 || !checkBox2}
            // disabled={(!checkBox2) }
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormAB;
