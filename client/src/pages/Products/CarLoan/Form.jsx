import { useFormik } from "formik";
import * as Yup from "yup";
// import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  setFormData,
  setShowSubmitLoanFormPaymentModal,
} from "../../../store/appSlice";
import ReCAPTCHA from "react-google-recaptcha";

import {
  loanTenure,
  residencyType,
  employmentType,
  incomeRecievedAs,
  employerType,
  loanStartDate,
  primaryBankAccount,
} from "../../../configs/selectorConfigs";
import { useState, useEffect } from "react";
import { changeIntoDate } from "../../../validation/function";

const Form = ({ states, cities, selectedState, setSelectedState, user }) => {
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const { formData, isOpenModal } = useSelector((store) => store.app);
  // checkbox
  const [checkBox1, setCheckBox1] = useState(false);
  const [checkBox2, setCheckBox2] = useState(true);

  const [incomeStatus, setIncomeStatus] = useState({
    month: false,
    year: false,
  });
  const [persionalConditionalObj, setPersionalConditionalUseObj] = useState({
    primaryBankAccount: "",
    touched: false,
    touched2: false,
  });

  function calculateEmi(value, onsumbit) {
    if (value !== 0 || onsumbit) {
      const salary = formData.monthlyIncome || formData.yearlyIncome / 12;
      const emi = salary * 0.8;
      setEmiError({
        status: value > emi,
        msg: "EMI should be less than 80% of your monthly income",
      });
      return value > emi;
    }
    return true;
  }

  function handaleBsTypeError(formData) {
    if (
      formData.employmentType === "Salaried" &&
      formData.monthlyIncome === 0
    ) {
      setIncomeError({
        status: true,
        message: "Please enter valid income",
      });
      return false;
    } else if (
      formData.employmentType === "Salaried" &&
      formData.monthlyIncome < 12000
    ) {
      setIncomeError({
        status: true,
        message: "salary min 12k",
      });
      return false;
    } else if (
      (formData.employmentType === "Self-employed business" ||
        formData.employmentType === "Self-employed professional") &&
      !(formData.yearlyIncome >= 120000)
    ) {
      setIncomeError({
        status: true,
        message: "Income Should be min 120000 or Greater ",
      });
      return false;
    } else if (
      formData.employmentType === "Salaried"
        ? +formData.monthlyIncome
        : +formData.yearlyIncome
    ) {
      setIncomeError({
        status: false,
        message: "",
      });
      return true;
    }
  }

  // Yup validation
  const validationSchema = Yup.object({
    dateOfBirth: Yup.string("")
      .required("Date of birth required")
      .test("age-check", "Must be at least 21 years old", function (value) {
        const currentDate = new Date();
        const selectedDate = new Date(value.split("-").reverse().join("-"));
        const age = currentDate.getFullYear() - selectedDate.getFullYear();

        // Adjust the age check as per your specific requirements
        return age >= 21;
      }),
    state: Yup.string("").required("State should be filled"),
    city: Yup.string("").required("City should be filled"),
    pincode: Yup.number()
      .integer("Pincode must be a number")
      .required("Pincode should be filled")
      .test("length-check", "Invalid pincode", function (value) {
        return value.toString().length === 6;
      }),
    residencyType: Yup.string("").required("select residency type"),
    panCardNum: Yup.string()
      .required("Pancard number should be filled")
      .length(10, "Pan card number should be 10 characters")
      .matches(/^[a-zA-Z]{5}.*[a-zA-Z]$/, "Invalid pancard number")
      .matches(/^[A-Z0-9]+$/, "Only alphanumeric characters are allowed"),
    loanAmount: Yup.number()
      .integer("Loan amount must be a number")
      .required("Loan amount should be filled")
      .min(100000, "min 1 lakh"),
    loanTenure: Yup.string("").required("select loan tenure "),
    employerType: Yup.string("").required("select employer type"),
    employmentType: Yup.string("").required("select employment type"),
    employerName: Yup.string("").required("employer name should be filled"),
    existingEmi: Yup.number()
      .integer("EMI must be a number")
      .required("EMI should be filled")
      .min(0, "min 0")
      .max(30000, "max 30k"),
    carManufacturer: Yup.string("").required("*required"),
    carModel: Yup.string("").required("*required"),
    carPrice: Yup.number().integer("invalid price input").required("*required"),
  });
  // Formik
  const formik = useFormik({
    initialValues: formData,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleProceed(values);
    },
  });

  //income error
  const [incomeError, setIncomeError] = useState({
    status: false,
    message: "",
  });
  const [emiError, setEmiError] = useState({
    status: false,
    msg: "",
  });
  const handleProceed = (values) => {
    if (
      emiError.status ||
      incomeError.status ||
      !formData.primaryBankAccount.trim()
    ) {
      return;
    }
    setIncomeStatus({ month: false, year: false });
    dispatch(setShowSubmitLoanFormPaymentModal(true));
    dispatch(
      setFormData({
        ...formData,
        ...values,
        monthlyIncome: formData.monthlyIncome,
        yearlyIncome: formData.yearlyIncome,
        primaryBankAccount: formData.primaryBankAccount,
      })
    );
  };

  useEffect(() => {
    calculateEmi(formik.values.existingEmi, true);
    handaleBsTypeError(formData);
  }, [
    formData.monthlyIncome,
    formData.yearlyIncome,
    formik.values.existingEmi,
  ]);

  const handaleChange = (e) => {
    dispatch(setFormData({ ...formData, [e.target.name]: e.target.value }));
  };

  return (
    <div className="py-10">
      <div className="-mb-2.5 -ml-2.5 flex items-center space-x-2.5"></div>
      <h1 className="text-xl flex flex-col space-y-2">
        <span>
          Unlock best <span>car loan</span> offers suitable for your needs from{" "}
          <span>43+ lenders</span>
        </span>
        <span className="w-20 h-0.5 rounded-full bg-cyan-400"></span>
      </h1>
      <form
        className="block lg:grid lg:grid-cols-2  gap-8"
        onSubmit={(e) => {
          e.preventDefault();
          setIncomeStatus({ month: true, year: true });
          formik.handleSubmit();
        }}
      >
        <div>
          <span>Full name</span>
          <div className="border-b border-slate-400 py-1">
            <input
              placeholder="As per your pan card"
              type="text"
              value={user?.name}
              name="name"
              className="w-full bg-transparent border-none outline-none placeholder:text-slate-700"
              readOnly
            />
          </div>
          {/* {formik.touched.name && formik.errors.name && (
            <span className="text-red-500 text-xs font-bold">
              {formik.errors.name}
            </span>
          )} */}
        </div>

        <div>
          <span className="font-semibold text-gray-500">
            Date of Birth (As per PAN card){" "}
          </span>
          <div className="border-b border-slate-400 py-1">
            <input
              placeholder="DD-MM-YYYY"
              type="text"
              onBlur={() => formik.setFieldTouched("dateOfBirth", true)}
              value={formik.values.dateOfBirth}
              onChange={(e) => {
                const formattedDate = changeIntoDate(
                  e.target.value,
                  "DD-MM-YYYY"
                );

                if (formattedDate.length > 10) {
                  return;
                }

                e.target.value = formattedDate;
                formik.setFieldValue("dateOfBirth", formattedDate);
              }}
              className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
            />
          </div>
          {formik.touched.dateOfBirth && formik.errors.dateOfBirth && (
            <span className="text-red-500 text-xs font-bold">
              {formik.errors.dateOfBirth}
            </span>
          )}
        </div>

        <div>
          <span>State</span>
          <div className="flex gap-2 bg-gray-200/40 border-[1px] border-gray-400 rounded-md">
            <select
              className="bg-transparent w-full py-2.5"
              {...formik.getFieldProps("state")}
              value={selectedState}
              onChange={(e) => {
                formik.handleChange(e);
                setSelectedState(e.target.value);
              }}
            >
              <option>Select</option>
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
          {formik.touched.state && formik.errors.state && (
            <span className="text-red-500 text-xs font-bold">
              {formik.errors.state}
            </span>
          )}
        </div>
        <div>
          <span>City</span>
          <div className="flex gap-2 bg-gray-200/40 border-[1px] border-gray-400 rounded-md">
            <select
              className="bg-transparent w-full disabled:cursor-not-allowed py-2.5"
              disabled={!selectedState}
              {...formik.getFieldProps("city")}
            >
              <option>Select</option>
              {cities.map((obj) => {
                return (
                  <option key={obj.id} value={obj.name}>
                    {obj.name}
                  </option>
                );
              })}
            </select>
          </div>
          {formik.touched.city && formik.errors.city && (
            <span className="text-red-500 text-xs font-bold">
              {formik.errors.city}
            </span>
          )}
        </div>
        <div>
          <span>Residency Pincode</span>
          <div className="border-b border-slate-400 py-1">
            <input
              placeholder=""
              type="number"
              {...formik.getFieldProps("pincode")}
              className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
            />
          </div>
          {formik.touched.pincode && formik.errors.pincode && (
            <span className="text-red-500 text-xs font-bold">
              {formik.errors.pincode}
            </span>
          )}
        </div>
        <div>
          <span>Residency Type</span>
          <div className="border-b border-slate-400 py-1">
            <select
              onChange={(e) =>
                dispatch(
                  setFormData({ ...formData, residencyType: e.target.value })
                )
              }
              {...formik.getFieldProps("residencyType")}
            >
              {residencyType.map((ele, i) => {
                return <option key={i}>{ele}</option>;
              })}
            </select>
          </div>
          {formik.touched.residencyType && formik.errors.residencyType && (
            <span className="text-red-500 text-xs font-bold">
              {formik.errors.residencyType}
            </span>
          )}
        </div>
        <div className="col-span-1 sm:col-span-2">
          <span>PAN card number</span>
          <div className="border-b border-slate-400 py-1">
            <input
              placeholder="Enter permanent account number"
              type="text"
              {...formik.getFieldProps("panCardNum")}
              onChange={(e) =>
                formik.setFieldValue("panCardNum", e.target.value.toUpperCase())
              }
              className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
            />
          </div>
          {formik.touched.panCardNum && formik.errors.panCardNum && (
            <span className="text-red-500 text-xs font-bold">
              {formik.errors.panCardNum}
            </span>
          )}
        </div>
        <div>
          <span>Loan amount</span>
          <div className="border-b border-slate-400 py-1">
            <input
              placeholder=""
              type="number"
              {...formik.getFieldProps("loanAmount")}
              className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
            />
          </div>
          {formik.touched.loanAmount && formik.errors.loanAmount && (
            <span className="text-red-500 text-xs font-bold">
              {formik.errors.loanAmount}
            </span>
          )}
        </div>
        <div>
          <span>Loan tenure</span>

          <div className="flex gap-2 bg-gray-200/40 border-[1px] border-gray-400 rounded-md">
            <select
              className="bg-transparent w-full py-2.5"
              name="loanTenure"
              {...formik.getFieldProps("loanTenure")}
            >
              <option value="">Select</option>
              {loanTenure.map((tenure, i) => (
                <option key={i} value={tenure}>
                  {tenure}
                </option>
              ))}
            </select>
          </div>
          {formik.touched.loanTenure && formik.errors.loanTenure && (
            <span className="text-red-500 text-xs font-bold">
              {formik.errors.loanTenure}
            </span>
          )}
        </div>

        <div>
          <span>Loan tenure</span>

          <div className="flex gap-2 bg-gray-200/40 border-[1px] border-gray-400 rounded-md">
            <select
              className="bg-transparent w-full py-2.5"
              name="loanTenure"
              {...formik.getFieldProps("loanTenure")}
            >
              <option value="">Select</option>
              {loanTenure.map((tenure, i) => (
                <option key={i} value={tenure}>
                  {tenure}
                </option>
              ))}
            </select>
          </div>
          {formik.touched.loanTenure && formik.errors.loanTenure && (
            <span className="text-red-500 text-xs font-bold">
              {formik.errors.loanTenure}
            </span>
          )}
        </div>

        <div>
          <span>Employment type</span>
          <div className="flex gap-2 bg-gray-200/40 border-[1px] border-gray-400 rounded-md">
            <select
              className="bg-transparent w-full py-2.5"
              {...formik.getFieldProps("employmentType")}
              value={formData.employmentType}
              onChange={(e) =>
                dispatch(
                  setFormData({ ...formData, employmentType: e.target.value })
                )
              }
            >
              <option>Select</option>
              {employmentType.map((ele) => {
                return (
                  <option key={ele} value={ele}>
                    {ele}
                  </option>
                );
              })}
            </select>
          </div>
          {formik.touched.employmentType && formik.errors.employmentType && (
            <span className="text-red-500 text-xs font-bold">
              {formik.errors.employmentType}
            </span>
          )}
        </div>
        <div>
          <span>Salary Bank Account</span>
          <div className="flex gap-2 bg-gray-200/40 border-[1px] border-gray-400 rounded-md">
            <select
              className="bg-transparent w-full py-2.5"
              value={
                persionalConditionalObj.primaryBankAccount ||
                formData.primaryBankAccount
              }
              onBlur={() =>
                setPersionalConditionalUseObj((prev) => ({
                  ...prev,
                  touched: true,
                }))
              }
              name="primaryBankAccount"
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
          {persionalConditionalObj.touched &&
          !formData.primaryBankAccount?.trim() &&
          persionalConditionalObj.primaryBankAccount !== "Other" ? (
            <span className="text-xs font-bold text-red-500  ">*required</span>
          ) : (
            ""
          )}
        </div>

        {persionalConditionalObj.primaryBankAccount === "Other" && (
          <div>
            <span>Salary Bank Account Name</span>
            <div className="py-1 border-b border-slate-400 duration-200">
              <input
                placeholder="Enter Salary Bank Account Name"
                type="text"
                // onChange={handaleChange}
                name="primaryBankAccount"
                onBlur={() =>
                  setPersionalConditionalUseObj((prev) => ({
                    ...prev,
                    touched2: true,
                  }))
                }
                value={formData.primaryBankAccount}
                onChange={handaleChange}
                className="w-full bg-transparent border-none outline-none placeholder:text-slate-500"
              />
              {persionalConditionalObj.touched &&
              !formData.primaryBankAccount?.trim() &&
              persionalConditionalObj.primaryBankAccount === "Other" ? (
                <span className="text-xs font-bold text-red-500  ">
                  *required
                </span>
              ) : (
                ""
              )}
            </div>
          </div>
        )}
        <div>
          <span>Employer type</span>
          <div className="flex gap-2 bg-gray-200/40 border-[1px] border-gray-400 rounded-md">
            <select
              className="bg-transparent w-full py-2.5"
              {...formik.getFieldProps("employerType")}
            >
              <option>Select</option>
              {employerType.map((ele) => {
                return (
                  <option key={ele} value={ele}>
                    {ele}
                  </option>
                );
              })}
            </select>
          </div>
          {formik.touched.employerType && formik.errors.employerType && (
            <span className="text-red-500 text-xs font-bold">
              {formik.errors.employerType}
            </span>
          )}
        </div>
        <div>
          <span>Employer name</span>
          <div className="border-b border-slate-400 py-1">
            <input
              placeholder="Enter your company name"
              type="text"
              value={formData.companyName}
              {...formik.getFieldProps("employerName")}
              className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
            />
          </div>
          {formik.touched.employerName && formik.errors.employerName && (
            <span className="text-red-500 text-xs font-bold">
              {formik.errors.employerName}
            </span>
          )}
        </div>
        {/* salary monthly /yearly */}
        <div className=" py-1">
          {formData.employmentType === "Salaried" &&
          formData.employmentType === "Salaried" ? (
            <div>
              <span className="pr-1 gap-2">
                <span className="px-1">
                  {" "}
                  {formData.employmentType === "Salaried"
                    ? "Monthly"
                    : "Yearly "}{" "}
                </span>
                Income
              </span>
              <input
                placeholder="Enter your monthly income"
                type="number"
                name="monthlyIncomeno"
                value={formData.monthlyIncome}
                onChange={(e) => {
                  dispatch(
                    setFormData({
                      ...formData,
                      monthlyIncome: e.target.value,
                    })
                  );

                  setIncomeError({ status: false, msg: "" });
                }}
                onBlur={() =>
                  setIncomeStatus((prev) => ({ ...prev, month: true }))
                }
                className="bg-transparent w-full outline-none  placeholder:text-slate-500 border-b-[1px] border-slate-800"
              />
              {incomeError.status && incomeStatus.month && (
                <span className="text-red-500 text-xs font-bold">
                  {incomeError?.message}
                </span>
              )}
            </div>
          ) : (
            <div>
              <span className="pr-1 gap-2">
                <span className="px-1">
                  {formData.employmentType === "Salaried"
                    ? "Monthly"
                    : "Yearly "}
                </span>
                Income
              </span>
              <input
                placeholder="Enter your monthly income"
                type="number"
                name="yearlyIncomeno"
                value={formData.yearlyIncome}
                onBlur={() =>
                  setIncomeStatus((prev) => ({ ...prev, year: true }))
                }
                onChange={(e) => {
                  dispatch(
                    setFormData({
                      ...formData,
                      yearlyIncome: e.target.value,
                    })
                  );
                  // setIncomeError({ status: false, msg: "" });
                }}
                className="bg-transparent w-full outline-none  placeholder:text-slate-500 border-b-[1px] border-slate-800"
              />
              {incomeError.status && incomeStatus.year && (
                <span className="text-red-500 text-xs font-bold">
                  {incomeError?.message}
                </span>
              )}
            </div>
          )}
        </div>
        <div>
          <span>Income recieved as</span>
          <div className="flex gap-2 bg-gray-200/40 border-[1px] border-gray-400 rounded-md">
            <select
              className="bg-transparent w-full disabled:cursor-not-allowed py-2.5"
              {...formik.getFieldProps("incomeRecievedAs")}
              onChange={(e) =>
                dispatch(
                  setFormData({
                    ...formData,
                    incomeRecievedAs: e.target.value,
                  })
                )
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
          <span>Existing EMI</span>
          <div className="border-b border-slate-400 py-1">
            <input
              placeholder="Enter your existing EMI if any"
              type="number"
              {...formik.getFieldProps("existingEmi")}
              className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
            />
          </div>
          {formik.touched.existingEmi && formik.errors.existingEmi ? (
            <span className="text-red-500 text-xs font-bold duration-200">
              {formik.errors.existingEmi}
            </span>
          ) : emiError.status === true ? (
            <span className="text-red-500 text-xs font-bold duration-200">
              {emiError?.msg}
            </span>
          ) : (
            ""
          )}
        </div>

        <div className="col-span-2 sm:col-span-1">
          <h1 className="font-bold">Vehicle Details</h1>
        </div>
        <div>
          <span>Car Manufacture</span>
          <div className="border-b border-slate-400 py-1">
            <input
              placeholder="ex: TATA,Volkswagen, Hyundai"
              type="text"
              {...formik.getFieldProps("carManufacturer")}
              className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
            />
          </div>
          {formik.touched.carManufacturer && formik.errors.carManufacturer && (
            <span className="text-red-500 text-xs font-bold">
              {formik.errors.carManufacturer}
            </span>
          )}
        </div>
        <div>
          <span>Car Model</span>
          <div className="border-b border-slate-400 py-1">
            <input
              placeholder="ex:Camry, Civic, Corolla"
              type="text"
              {...formik.getFieldProps("carModel")}
              className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
            />
          </div>
          {formik.touched.carModel && formik.errors.carModel && (
            <span className="text-red-500 text-xs font-bold">
              {formik.errors.carModel}
            </span>
          )}
        </div>
        <div>
          <span>Car Price</span>
          <div className="border-b border-slate-400 py-1">
            <input
              type="number"
              {...formik.getFieldProps("carPrice")}
              className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
            />
          </div>
          {formik.touched.carPrice && formik.errors.carPrice && (
            <span className="text-red-500 text-xs font-bold">
              {formik.errors.carPrice}
            </span>
          )}
        </div>

        <div>
          <span>Email address</span>
          <div className="border-b border-slate-400 py-1">
            <input
              placeholder="As per your pan card"
              type="email"
              value={user?.email}
              name="email"
              className="w-full bg-transparent border-none outline-none placeholder:text-slate-700"
              readOnly
            />
          </div>
          {/* {formik.touched.email && formik.errors.email && (
            <span className="text-red-500 text-xs font-bold">
              {formik.errors.email}
            </span>
          )} */}
        </div>
        <div>
          <span>Mobile number</span>
          <div className="flex items-center space-x-2.5 border-b border-slate-400 py-1">
            <img src="/india.png" alt="india" className="w-7 h-4" />
            <span className="whitespace-nowrap">+91 -</span>
            <input
              placeholder="As per your pan card"
              type="number"
              value={user?.contact}
              name="contact"
              className="w-full bg-transparent border-none outline-none placeholder:text-slate-700"
              readOnly
            />
          </div>
          {/* {formik.touched.contact && formik.errors.contact && (
            <span className="text-red-500 text-xs font-bold">
              {formik.errors.contact}
            </span>
          )} */}
        </div>
        <div className="col-span-2  sm:col-span-2">
          <div>
            <ReCAPTCHA
              sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
              onChange={(res) => {
                setCheckBox1(true);
              }}
            />
          </div>
          <div>
            <input
              type="checkbox"
              checked={checkBox2}
              onChange={() => setCheckBox2((prev) => !prev)}
            />
            <label className="pl-2">Terms & Condition 1 & Conditions 2</label>
          </div>
        </div>
        <div className="w-1/2 mx-auto pt-2.5">
          <button
            className="bg-cyan-400 py-2.5 w-full rounded-lg text-lg text-white font-normal duration-200 disabled:cursor-not-allowed disabled:bg-gray-200"
            type="submit"
            // disabled={!checkBox1 || !checkBox2 }
            disabled={!checkBox2}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
