import { useFormik } from "formik";
import * as Yup from "yup";
import ReCAPTCHA from "react-google-recaptcha";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  setFormData,
  setShowSubmitLoanFormPaymentModal,
} from "../../../store/appSlice";
import {
  employerType,
  homeLoanAmount,
  homeLoanTenure,
  loanStartDate,
  collateralOption,
  residencyType,
  employmentType,
  incomeRecievedAs,
  newPropertyType,
  primaryBankAccount,
  yearlyIncome,
  //business
  yearsInCurrentBusiness,
  BusinessNature,
  companyType,
  industryType,
  businessPlaceOwnershipTypeInputs,
} from "../../../configs/selectorConfigs";
import { useState, useEffect } from "react";
import { changeIntoDate } from "../../../validation/function";
import DatePicker from "../../../components/DatePicker/DatePicker";
import { FaRegCalendarAlt } from "react-icons/fa";

const Form = ({ states, cities, selectedState, setSelectedState, user }) => {
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const { formData } = useSelector((store) => store.app);
  // checkbox
  const [checkBox1, setCheckBox1] = useState(true);
  const [checkBox2, setCheckBox2] = useState(false);
  const [activeCl, setActiveCl] = useState(true);

  // Yup validation
  const validationSchema = Yup.object({
    name: Yup.string("").min(5).required("Full name required"),
    dateOfBirth: Yup.string("")
      .required("Date of birth required")
      .test("age-check", "age must be between 23 and 60", function (value) {
        const currentDate = new Date();
        const selectedDate = new Date(value.split("-").reverse().join("-"));
        const age = currentDate.getFullYear() - selectedDate.getFullYear();

        // Adjust the age check as per your specific requirements
        return age >= 23 && age <= 60;
      }),
    state: Yup.string("").required("State required"),
    city: Yup.string("").required("City required"),
    pincode: Yup.number()
      .integer("Invalid pincode")
      .required("Pincode required")
      .test("length-check", "Invalid pincode", function (value) {
        return value.toString().length === 6;
      }),
    residencyType: Yup.string("").required("Residency type required"),
    panCardNum: Yup.string()
      .required("Pancard number required")
      .length(10, "Pan card number should be 10 characters")
      .matches(/^[a-zA-Z]{5}\d{4}[a-zA-Z]$/, "Invalid pancard number")
      .matches(/^[A-Z0-9]+$/, "Only alphanumeric characters are allowed"),
    loanAmount: Yup.number()
      .integer("Loan amount must be a number")
      .required("Loan amount required"),
    collateralOption: Yup.string("").required("* mandatory"),
    otherCollateralOptionType: Yup.string("").required("* required"),
    loanTenure: Yup.number()
      .integer("Loan amount must be a number")
      .required("Loan amount required")
      .min(3, "min 3")
      .max(40, "max 40"),

    // loanTenureOption: Yup.string("").required("Loan tenure required"),
    employerType: Yup.string("").required("Employer type required"),
    employerTypeOption: Yup.string("").required("Employer type required"),
    employmentType: Yup.string("").required("Employment type required"),
    employerName: Yup.string("").required("Employer name required"),
    existingEmi: Yup.number()
      .integer("EMI must be a number")
      .required("EMI required")
      .min(0, "min 0"),
    email: Yup.string("").email().required("Email required"),
    contact: Yup.number()
      .integer("Invalid contact number")
      .required("Contact number required")
      .test(
        "length-check",
        "contact number must be of 10 digits",
        function (value) {
          return value.toString().length === 10;
        }
      ),
    primaryBankAccount: Yup.string("").required(
      "Income Bank Account Name required"
    ),
    primaryBankAccountOption: Yup.string("").required(
      "Income Bank Account required"
    ),
    // propertyAge: Yup.string("").required("Income Bank Account required"),
    // newPropertyState: Yup.string("").required("State required"),
    // newPropertyCity: Yup.string("").required("City required"),
    // newPropertyPincode: Yup.number()
    //   .integer("Pincode must be a number")
    //   .required("Pincode required")
    //   .test("length-check", "Invalid pincode", function (value) {
    //     return value.toString().length === 6;
    //   }),
  });

  // Formik
  const formik = useFormik({
    initialValues: formData,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleProceed(values);
    },
  });

  const handleProceed = (values) => {
    if (emiErrStatus) {
      return;
    }
    if (loanTenureErr.status) {
      return;
    }
    dispatch(setShowSubmitLoanFormPaymentModal(true));
    dispatch(
      setFormData({
        ...formData,
        ...values,
        monthlyIncome: formData.monthlyIncome,
      })
    );
  };

  useEffect(() => {
    if (formik?.values?.primaryBankAccountOption?.trim()) {
      formik.setFieldTouched("primaryBankAccountOption", false);
    } else {
      formik.setFieldTouched("employerTypeOption", false);
    }
  }, [
    formik?.values?.primaryBankAccountOption,
    formik?.values?.employerTypeOption,
  ]);

  //emi and income
  const [incomeError, setIncomeError] = useState({});
  const [emiErr, setEmiErr] = useState("");
  const [emiErrStatus, setEmiErrStatus] = useState(false);

  //emi , salary and current turn over
  useEffect(() => {
    if (formData.employmentType === "Salaried") {
      if (!formData.monthlyIncome) {
        return setIncomeError({ status: true, msg: "please enter salary" });
      }
      if (formData.monthlyIncome === 0 && formik.values.existingEmi > 0) {
        setEmiErrStatus(true);
        return setEmiErr("salary invalid. please mention your salary");
      } else if (formData.monthlyIncome > 0) {
        if (formData.monthlyIncome < 12000) {
          setEmiErrStatus(false);
          return setIncomeError({
            status: true,
            msg: "salary should be greater 12000",
          });
        } else if (
          formData.monthlyIncome >= 12000 &&
          formik.values.existingEmi > 0
        ) {
          console.log("err3");
          const salaryVal = formData.monthlyIncome;
          console.log("salary val", salaryVal);
          const percentageVal = (salaryVal * 80) / 100;
          console.log(percentageVal);
          if (formik.values.existingEmi > percentageVal) {
            setEmiErrStatus(true);
            return setEmiErr(`existing emi should less than ${percentageVal}`);
          } else if (formik.values.existingEmi <= percentageVal) {
            setEmiErrStatus(false);
            return setEmiErr("");
          }
          return setEmiErr("");
        }
      }
    } else {
      if (
        formik.values.existingEmi > 0 &&
        formik.values.currentYearTurnOver === 0
      ) {
        setEmiErrStatus(true);
        return setEmiErr("please mention your  currnt year turnover");
      } else if (formik.values.currentYearTurnOver > 0) {
        const currentYearTurnOverValue = formik.values.currentYearTurnOver;
        const monthlyVal = currentYearTurnOverValue / 12;
        const percentageVal = (monthlyVal * 80) / 100;
        console.log(percentageVal);
        if (formik.values.existingEmi > percentageVal) {
          setEmiErrStatus(true);
          return setEmiErr(`existing emi should be <=  ${percentageVal}`);
        } else if (formik.values.existingEmi <= percentageVal) {
          setEmiErrStatus(false);
          return setEmiErr("");
        }
      }
    }
  }, [
    formik.values.existingEmi,
    formik.values.currentYearTurnOver,
    formData.monthlyIncome,
    formData.employmentType,
  ]);

  //loan tenure dob validation
  const [loanTenureErr, setLoanTenureErr] = useState({
    status: false,
    msg: "",
  });
  useEffect(() => {
    const currentDate = new Date();
    const selectedDate = new Date(
      formik.values.dateOfBirth.split("-").reverse().join("-")
    );
    const age = currentDate.getFullYear() - selectedDate.getFullYear();
    console.log(age);
    if (age >= 23 && age <= 63) {
      const tenureVal = 63 - age;
      if (tenureVal !== formik.values.loanTenure) {
        return setLoanTenureErr({
          status: true,
          msg: `for age ${age}, max loan tenure is ${tenureVal} years`,
        });
      } else {
        setLoanTenureErr({ status: false, msg: "" });
      }
    }
  }, [formik.values.dateOfBirth, formik.values.loanTenure]);

  //New property state and city
  const [newpropertyStates, setNewpropertyState] = useState([]);
  const [selectedNewpropertyState, setSelectedNewpropertyState] = useState("");
  var newPropertyStateConfig = {
    url: "https://api.countrystatecity.in/v1/countries/In/states",
    key: "N00wMDJleEpjQ09wTjBhN0VSdUZxUGxWMlJKTGY1a0tRN0lpakh5Vw==",
  };
  const getNewPropertyStates = async () => {
    await fetch(newPropertyStateConfig.url, {
      headers: { "X-CSCAPI-KEY": newPropertyStateConfig.key },
    })
      .then((resp) => resp.json())
      .then((resp) => {
        setNewpropertyState(resp);
        console.log(resp);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getNewPropertyStates();
  }, []);
  // get cities after selecting state
  const [newpropertyCities, setNewpropertyCities] = useState([]);
  var newPropertyCityConfig = {
    url: `https://api.countrystatecity.in/v1/countries/IN/states/${selectedNewpropertyState}/cities`,
    key: "N00wMDJleEpjQ09wTjBhN0VSdUZxUGxWMlJKTGY1a0tRN0lpakh5Vw==",
  };
  const getNewPropertyCities = async () => {
    await fetch(newPropertyCityConfig.url, {
      headers: { "X-CSCAPI-KEY": newPropertyCityConfig.key },
    })
      .then((resp) => resp.json())
      .then((resp) => {
        setNewpropertyCities(resp);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    if (selectedNewpropertyState) {
      getNewPropertyCities();
    }
  }, [selectedNewpropertyState]);

  //current business state and current business city
  // state city api
  const [businessStates, setBusinessStates] = useState([]);
  const [selectedBusinessState, setSelectedBusinessState] = useState("");
  var businessStateConfig = {
    url: "https://api.countrystatecity.in/v1/countries/In/states",
    key: "N00wMDJleEpjQ09wTjBhN0VSdUZxUGxWMlJKTGY1a0tRN0lpakh5Vw==",
  };
  const getBusinessStates = async () => {
    await fetch(businessStateConfig.url, {
      headers: { "X-CSCAPI-KEY": businessStateConfig.key },
    })
      .then((resp) => resp.json())
      .then((resp) => {
        setBusinessStates(resp);
        console.log(resp);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getBusinessStates();
  }, []);
  // get cities after selecting state
  const [businessCities, setBusinessCities] = useState([]);
  var businessCityConfig = {
    url: `https://api.countrystatecity.in/v1/countries/IN/states/${selectedBusinessState}/cities`,
    key: "N00wMDJleEpjQ09wTjBhN0VSdUZxUGxWMlJKTGY1a0tRN0lpakh5Vw==",
  };
  const getBusinessCities = async () => {
    await fetch(businessCityConfig.url, {
      headers: { "X-CSCAPI-KEY": businessCityConfig.key },
    })
      .then((resp) => resp.json())
      .then((resp) => {
        setBusinessCities(resp);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    if (selectedBusinessState) {
      getBusinessCities();
    }
  }, [selectedBusinessState]);

  return (
    <div className="py-10">
      <div className="-mb-2.5 -ml-2.5 flex items-center space-x-2.5"></div>
      <h1 className="text-xl flex mb-8 flex-col space-y-2 font-semibold text-gray-500">
        <span>
          Unlock best <span>home loan</span> offers suitable for your needs from{" "}
          <span>43+ lenders</span>
        </span>
        <span className="w-20 h-0.5 rounded-full bg-cyan-400"></span>
      </h1>
      <form
        className="block lg:grid lg:grid-cols-2  gap-8"
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit();
        }}
      >
        <div>
          <span className="font-semibold text-gray-500">Full name</span>
          <div className="border-b border-slate-400 py-1">
            <input
              placeholder=""
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
          <div className="border-b border-slate-400 py-1 flex relative">
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
            <div
              id="e;ljfeijfie"
              className="w-8 h-[inherit]  bg-gray-200 flex items-center justify-center rounded cursor-pointer"
              onClick={(e) => {
                if (e.target.id === "e;ljfeijfie") {
                  setActiveCl((prev) => !prev);
                  formik.setFieldTouched("dateOfBirth", true);
                }
              }}
            >
              <FaRegCalendarAlt
                onClick={(e) => {
                  setActiveCl((prev) => !prev);
                  formik.setFieldTouched("dateOfBirth", true);
                }}
              />
              <div className={activeCl ? "hidden" : "block "}>
                <DatePicker
                  setActive={() => {
                    setActiveCl(true);
                  }}
                  handaleDate={(date) => {
                    formik.setFieldValue("dateOfBirth", date);
                  }}
                  clearFun={() => {
                    formik.setFieldValue("dateOfBirth", "");
                  }}
                  date={formik.dateOfBirth}
                />
              </div>
            </div>
          </div>
          {formik.touched.dateOfBirth && formik.errors.dateOfBirth && (
            <span className="text-red-500 text-xs font-bold">
              {formik.errors.dateOfBirth}
            </span>
          )}
        </div>
        <div>
          <span className="font-semibold text-gray-500">Residence State</span>
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
          <span className="font-semibold text-gray-500"> Residence City</span>
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
          <span className="font-semibold text-gray-500">Residence Pincode</span>
          <div className="border-b border-slate-400 py-1">
            <input
              placeholder="Enter Pincode"
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
          <span className="font-semibold text-gray-500">
            {" "}
            Status of Residence
          </span>
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
          <span className="font-semibold text-gray-500">PAN Card Number</span>
          <div className="border-b border-slate-400 py-1">
            <input
              placeholder="Enter Permanent Account Number"
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
          <span className="font-semibold text-gray-500">Loan Amount</span>
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
          <span className="font-semibold text-gray-500">Loan Tenure</span>
          <div className="border-b border-slate-400 py-1">
            <input
              placeholder=""
              type="number"
              {...formik.getFieldProps("loanTenure")}
              className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
            />
          </div>
          {formik.touched.loanTenure && formik.errors.loanTenure ? (
            <span className="text-red-500 text-xs font-bold">
              {formik.errors.loanTenure}
            </span>
          ) : loanTenureErr.status ? (
            <span className="text-red-500 text-xs font-bold">
              {loanTenureErr.msg}
            </span>
          ) : null}
        </div>

        {/* {formik.values.loanTenureOption === "Other" && (
          <div>
            <span className=" font-semibold text-gray-500">
              Enter Loan Tenure
            </span>
            <div className="border-b border-slate-400 py-1">
              <input
                placeholder=""
                type="text"
                {...formik.getFieldProps("loanTenure")}
                className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
              />
            </div>
            {formik.touched.loanTenure && formik.errors.loanTenure && (
              <span className="text-red-500 text-xs font-bold">
                {formik.errors.loanTenure}
              </span>
            )}
          </div>
        )} */}
        <div>
          <span className="font-semibold text-gray-500">Employment Type</span>
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
          {formik.touched.employmentType && formik.errors.employmentType && (
            <span className="text-red-500 text-xs font-bold">
              {formik.errors.employmentType}
            </span>
          )}
        </div>
        <div>
          <span className="font-semibold text-gray-500">
            Income Bank Account
          </span>
          <div className="flex gap-2 bg-gray-200/40 border-[1px] border-gray-400 rounded-md">
            <select
              className="bg-transparent w-full py-2.5"
              name="primaryBankAccount"
              value={formik.values.primaryBankAccountOption}
              onBlur={() =>
                formik.setFieldTouched("primaryBankAccountOption", true)
              }
              onChange={(e) => {
                if (e.target.value === "Other") {
                  formik.setFieldValue(
                    "primaryBankAccountOption",
                    e.target.value
                  );
                  formik.setFieldValue("primaryBankAccount", "");
                  return;
                } else {
                  formik.setFieldValue(
                    "primaryBankAccountOption",
                    e.target.value
                  );
                  formik.setFieldValue("primaryBankAccount", e.target.value);
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
          {formik.touched.primaryBankAccountOption &&
            formik.errors.primaryBankAccountOption && (
              <span className="text-red-500 text-xs font-bold">
                {formik.errors.primaryBankAccountOption}
              </span>
            )}
        </div>

        {formik.values.primaryBankAccountOption === "Other" && (
          <div>
            <span className=" font-semibold text-gray-500">
              Salary Bank Account Name
            </span>
            <div className="border-b border-slate-400 py-1">
              <input
                placeholder=""
                type="text"
                {...formik.getFieldProps("primaryBankAccount")}
                className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
              />
            </div>
            {formik.touched.primaryBankAccount &&
              formik.errors.primaryBankAccount && (
                <span className="text-red-500 text-xs font-bold">
                  {formik.errors.primaryBankAccount}
                </span>
              )}
          </div>
        )}

        {formData.employmentType === "Salaried" ? (
          <>
            <div>
              <span className="font-semibold text-gray-500">Employer Type</span>
              <div className="flex gap-2 bg-gray-200/40 border-[1px] border-gray-400 rounded-md">
                <select
                  className="bg-transparent w-full py-2.5"
                  value={formik.values.employerTypeOption}
                  onBlur={() =>
                    formik.setFieldTouched("employerTypeOption", true)
                  }
                  onChange={(e) => {
                    if (e.target.value === "Other") {
                      formik.setFieldValue(
                        "employerTypeOption",
                        e.target.value
                      );
                      formik.setFieldValue("employerType", "");
                      return;
                    } else {
                      formik.setFieldValue(
                        "employerTypeOption",
                        e.target.value
                      );
                      formik.setFieldValue("employerType", e.target.value);
                    }
                  }}
                >
                  <optio value={""}>Select</optio>
                  {employerType.map((ele) => {
                    return (
                      <option key={ele} value={ele}>
                        {ele}
                      </option>
                    );
                  })}
                </select>
              </div>
              {formik.touched.employerTypeOption &&
                formik.errors.employerTypeOption && (
                  <span className="text-red-500 text-xs font-bold">
                    {formik.errors.employerTypeOption}
                  </span>
                )}
            </div>
            {formik.values.employerTypeOption === "Other" && (
              <div>
                <span className=" font-semibold text-gray-500">
                  Employer Type{" "}
                </span>
                <div className="border-b border-slate-400 py-1">
                  <input
                    type="text"
                    {...formik.getFieldProps("employerType")}
                    placeholder="Enter Employer type"
                    className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
                  />
                </div>
                {formik.touched.employerType && formik.errors.employerType && (
                  <span className="text-red-500 text-xs font-bold">
                    {formik.errors.employerType}
                  </span>
                )}
              </div>
            )}
            <div>
              <span className="font-semibold text-gray-500">Employer Name</span>
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
            <div>
              <span className="font-semibold text-gray-500">
                Monthly Income
              </span>
              <div className="border-b border-slate-400 py-1">
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
                  className="bg-transparent w-full outline-none  placeholder:text-slate-500 "
                />
              </div>
              {incomeError.status && (
                <span className="text-red-500 text-xs font-bold">
                  {incomeError.msg}
                </span>
              )}
            </div>
            <div>
              <span className="font-semibold text-gray-500">
                Income recieved as
              </span>
              <div>
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
            </div>
          </>
        ) : formData.employmentType === "Self-employed business" ? (
          <>
            <div className="col-span-1 sm:col-span-2">
              <h1 className="font-bold"> Business Details</h1>
            </div>
            <div>
              <span className="font-semibold text-gray-500">
                Years In Current Business
              </span>
              <div className="border-b border-slate-400 py-1">
                <select
                  className="w-full"
                  value={formData.yearsInCurrentBusiness}
                  onChange={(e) =>
                    dispatch(
                      setFormData({
                        ...formData,
                        yearsInCurrentBusiness: e.target.value,
                      })
                    )
                  }
                >
                  {yearsInCurrentBusiness.map((ele, i) => {
                    return <option key={i}>{ele}</option>;
                  })}
                </select>
              </div>
            </div>
            {formData.yearsInCurrentBusiness === "over 5 years" && (
              <div>
                <span className=" font-semibold text-gray-500">
                  Please mention current years in business
                </span>
                <div className="border-b border-slate-400 py-1">
                  <input
                    placeholder="over 5 years"
                    type="text"
                    {...formik.getFieldProps("YearsInBusinessOver5")}
                    className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
                  />
                </div>
                {formik.touched.YearsInBusinessOver5 &&
                  formik.errors.YearsInBusinessOver5 && (
                    <span className="text-red-500 text-xs font-bold">
                      {formik.errors.YearsInBusinessOver5}
                    </span>
                  )}
              </div>
            )}

            <div>
              <span className="font-semibold text-gray-500">
                Current Business State
              </span>
              <div className="flex gap-2 bg-gray-200/40 border-[1px] border-gray-400 rounded-md">
                <select
                  className="bg-transparent w-full py-2.5"
                  {...formik.getFieldProps("currentBusinessState")}
                  value={selectedBusinessState}
                  onChange={(e) => {
                    formik.handleChange(e);
                    setSelectedBusinessState(e.target.value);
                  }}
                >
                  <option value={""}>Select</option>
                  {businessStates
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
              {formik.touched.currentBusinessState &&
                formik.errors.currentBusinessState && (
                  <span className="text-red-500 text-xs font-bold">
                    {formik.errors.state}
                  </span>
                )}
            </div>
            <div>
              <span className="font-semibold text-gray-500">
                Current Business City
              </span>
              <div className="flex gap-2 bg-gray-200/40 border-[1px] border-gray-400 rounded-md">
                <select
                  className="bg-transparent w-full disabled:cursor-not-allowed py-2.5"
                  disabled={!selectedBusinessState}
                  {...formik.getFieldProps("currentBusinessCity")}
                >
                  <option value={""}>Select</option>
                  {businessCities.map((obj) => {
                    return (
                      <option key={obj.id} value={obj.name}>
                        {obj.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              {formik.touched.currentBusinessCity &&
                formik.errors.currentBusinessCity && (
                  <span className="text-red-500 text-xs font-bold">
                    {formik.errors.currentBusinessCity}
                  </span>
                )}
            </div>
            <div>
              <span className=" font-semibold text-gray-500">
                Current Business Pincode
              </span>
              <div className="border-b border-slate-400 py-1">
                <input
                  placeholder="Enter Pincode"
                  type="text"
                  {...formik.getFieldProps("currentBusinessPincode")}
                  className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
                />
              </div>
              {formik.touched.currentBusinessPincode &&
                formik.errors.currentBusinessPincode && (
                  <span className="text-red-500 text-xs font-bold">
                    {formik.errors.currentBusinessPincode}
                  </span>
                )}
            </div>
            <div>
              <span className="font-semibold text-gray-500">
                Status of Business Place
              </span>
              <div className="border-b border-slate-400 py-1">
                <select
                  onChange={(e) =>
                    dispatch(
                      setFormData({
                        ...formData,
                        businessPlaceOwnershipType: e.target.value,
                      })
                    )
                  }
                  {...formik.getFieldProps("businessPlaceOwnershipType")}
                >
                  {businessPlaceOwnershipTypeInputs.map((ele, i) => {
                    return <option key={i}>{ele}</option>;
                  })}
                </select>
              </div>
              {formik.touched.businessPlaceOwnershipType &&
                formik.errors.businessPlaceOwnershipType && (
                  <span className="text-red-500 text-xs font-bold">
                    {formik.errors.businessPlaceOwnershipType}
                  </span>
                )}
            </div>
            <div>
              <span className="font-semibold text-gray-500">Company Type</span>
              <div className="flex gap-2 bg-gray-200/40 border-[1px] border-gray-400 rounded-md">
                <select
                  className="bg-transparent w-full py-2.5"
                  name="companyType"
                  value={formData.companyType}
                  onChange={(e) =>
                    dispatch(
                      setFormData({
                        ...formData,
                        companyType: e.target.value,
                      })
                    )
                  }
                >
                  <option value="">Select</option>
                  {companyType.map((ele, i) => (
                    <option key={i} value={ele}>
                      {ele}
                    </option>
                  ))}
                </select>
              </div>
              {formik.touched.businessType && formik.errors.businessType && (
                <span className="text-red-500 text-xs font-bold">
                  {formik.errors.businessType}
                </span>
              )}
            </div>
            {formData.companyType === "Other" && (
              <div>
                <div>
                  <span className=" font-semibold text-gray-500">
                    Mention Company Type
                  </span>
                  <div className="border-b border-slate-400 py-1">
                    <input
                      placeholder=""
                      type="text"
                      className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
                    />
                  </div>
                </div>
              </div>
            )}
            <div>
              <span className="font-semibold text-gray-500">
                Nature Of Business
              </span>
              <div className="flex gap-2 bg-gray-200/40 border-[1px] border-gray-400 rounded-md">
                <select
                  className="bg-transparent w-full py-2.5"
                  name="BusinessNature"
                  value={formData.businessNature}
                  onChange={(e) => {
                    dispatch(
                      setFormData({
                        ...formData,
                        businessNature: e.target.value,
                      })
                    );
                  }}
                >
                  <option value="">Select</option>
                  {BusinessNature.map((ele, i) => (
                    <option key={i} value={ele}>
                      {ele}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {formData.businessNature === "Other" && (
              <div>
                <div>
                  <span className=" font-semibold text-gray-500">
                    Mention Nature of business
                  </span>
                  <div className="border-b border-slate-400 py-1">
                    <input
                      placeholder=""
                      type="text"
                      className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
                    />
                  </div>
                </div>
              </div>
            )}
            <div>
              <span className="font-semibold text-gray-500">Industry Type</span>
              <div className="flex gap-2 bg-gray-200/40 border-[1px] border-gray-400 rounded-md">
                <select
                  className="bg-transparent w-full py-2.5"
                  name="industryType"
                  value={formData.industryType}
                  onChange={(e) => {
                    dispatch(
                      setFormData({
                        ...formData,
                        industryType: e.target.value,
                      })
                    );
                  }}
                >
                  <option value="">Select</option>
                  {industryType.map((ele, i) => (
                    <option key={i} value={ele}>
                      {ele}
                    </option>
                  ))}
                </select>
              </div>
              {formik.touched.businessType && formik.errors.businessType && (
                <span className="text-red-500 text-xs font-bold">
                  {formik.errors.businessType}
                </span>
              )}
            </div>
            <div>
              <span className="font-semibold text-gray-500">Sub Industry</span>
              <div className="border-b border-slate-400 py-1">
                <input
                  placeholder=""
                  type="text"
                  value={formData.subIndustryType}
                  onChange={(e) => {
                    dispatch(
                      setFormData({
                        ...formData,
                        subIndustryType: e.target.value,
                      })
                    );
                  }}
                  className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
                />
              </div>
              {/* {formik.touched.name && formik.errors.name && (
                <span className="text-red-500 text-xs font-bold">
                  {formik.errors.name}
                </span>
              )} */}
            </div>
            {/* <div>
              <span className="font-semibold text-gray-500">Start Date</span>
              <div className="border-b border-slate-400 py-1">
                <input
                  placeholder="Start Date"
                  type="date"
                  {...formik.getFieldProps("companyStartDate")}
                  className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
                />
              </div>
              {formik.touched.companyStartDate &&
                formik.errors.companyStartDate && (
                  <span className="text-red-500 text-xs font-bold">
                    {formik.errors.companyStartDate}
                  </span>
                )}
            </div> */}
            <div>
              <span className="font-semibold text-gray-500">
                Current Year Turn Over
              </span>
              <div className="border-b border-slate-400 py-1">
                <input
                  placeholder="Current Turn Over"
                  type="number"
                  {...formik.getFieldProps("currentYearTurnOver")}
                  className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
                />
              </div>
              {formik.touched.currentYearTurnOver &&
                formik.errors.currentYearTurnOver && (
                  <span className="text-red-500 text-xs font-bold">
                    {formik.errors.currentYearTurnOver}
                  </span>
                )}
            </div>
            <div>
              <span className="font-semibold text-gray-500">
                Previous Year Turn over
              </span>
              <div className="border-b border-slate-400 py-1">
                <input
                  placeholder="Previous TurnOver"
                  type="text"
                  {...formik.getFieldProps("previousYearTurnOver")}
                  className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
                />
              </div>
              {formik.touched.previousYearTurnOver &&
                formik.errors.previousYearTurnOver && (
                  <span className="text-red-500 text-xs font-bold">
                    {formik.errors.previousYearTurnOver}
                  </span>
                )}
            </div>
            <div>
              <span className="font-semibold text-gray-500">
                Current Year Net Profit
              </span>
              <div className="border-b border-slate-400 py-1">
                <input
                  placeholder="Current Year Net Profit"
                  type="text"
                  {...formik.getFieldProps("currentYearNetProfit")}
                  className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
                />
              </div>
              {formik.touched.currentYearNetProfit &&
                formik.errors.currentYearNetProfit && (
                  <span className="text-red-500 text-xs font-bold">
                    {formik.errors.currentYearNetProfit}
                  </span>
                )}
            </div>
            <div>
              <span className="font-semibold text-gray-500">
                Previous Year Net Profit
              </span>
              <div className="border-b border-slate-400 py-1">
                <input
                  placeholder="Previous Year Net Profit"
                  type="text"
                  {...formik.getFieldProps("previousYearNetProfit")}
                  className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
                />
              </div>
              {formik.touched.previousYearNetProfit &&
                formik.errors.previousYearNetProfit && (
                  <span className="text-red-500 text-xs font-bold">
                    {formik.errors.previousYearNetProfit}
                  </span>
                )}
            </div>
          </>
        ) : (
          <>
            <div className="col-span-1 sm:col-span-2">
              <h1 className="font-bold"> Professional Business Details</h1>
            </div>
            <div>
              <span className="font-semibold text-gray-500">
                Current Business State
              </span>
              <div className="flex gap-2 bg-gray-200/40 border-[1px] border-gray-400 rounded-md">
                <select
                  className="bg-transparent w-full py-2.5"
                  {...formik.getFieldProps("currentBusinessState")}
                  value={selectedBusinessState}
                  onChange={(e) => {
                    formik.handleChange(e);
                    setSelectedBusinessState(e.target.value);
                  }}
                >
                  <option value={""}>Select</option>
                  {businessStates
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
              {formik.touched.currentBusinessState &&
                formik.errors.currentBusinessState && (
                  <span className="text-red-500 text-xs font-bold">
                    {formik.errors.state}
                  </span>
                )}
            </div>
            <div>
              <span className="font-semibold text-gray-500">
                Current Business City
              </span>
              <div className="flex gap-2 bg-gray-200/40 border-[1px] border-gray-400 rounded-md">
                <select
                  className="bg-transparent w-full disabled:cursor-not-allowed py-2.5"
                  disabled={!selectedBusinessState}
                  {...formik.getFieldProps("currentBusinessCity")}
                >
                  <option value={""}>Select</option>
                  {businessCities.map((obj) => {
                    return (
                      <option key={obj.id} value={obj.name}>
                        {obj.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              {formik.touched.currentBusinessCity &&
                formik.errors.currentBusinessCity && (
                  <span className="text-red-500 text-xs font-bold">
                    {formik.errors.currentBusinessCity}
                  </span>
                )}
            </div>
            <div>
              <span className=" font-semibold text-gray-500">
                Current Business Pincode
              </span>
              <div className="border-b border-slate-400 py-1">
                <input
                  placeholder=""
                  type="text"
                  {...formik.getFieldProps("currentBusinessPincode")}
                  className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
                />
              </div>
              {formik.touched.currentBusinessPincode &&
                formik.errors.currentBusinessPincode && (
                  <span className="text-red-500 text-xs font-bold">
                    {formik.errors.currentBusinessPincode}
                  </span>
                )}
            </div>
            <div>
              <span className="font-semibold text-gray-500">
                Status of Business Place
              </span>
              <div className="border-b border-slate-400 py-1">
                <select
                  onChange={(e) =>
                    dispatch(
                      setFormData({
                        ...formData,
                        businessPlaceOwnershipType: e.target.value,
                      })
                    )
                  }
                  {...formik.getFieldProps("businessPlaceOwnershipType")}
                >
                  {businessPlaceOwnershipTypeInputs.map((ele, i) => {
                    return <option key={i}>{ele}</option>;
                  })}
                </select>
              </div>
              {formik.touched.businessPlaceOwnershipType &&
                formik.errors.businessPlaceOwnershipType && (
                  <span className="text-red-500 text-xs font-bold">
                    {formik.errors.businessPlaceOwnershipType}
                  </span>
                )}
            </div>

            <div>
              <span>Profession</span>
              <div className="flex gap-2 bg-gray-200/40 border-[1px] border-gray-400 rounded-md">
                <select
                  className="bg-transparent w-full py-2.5"
                  name="profession"
                  value={formData.profession}
                  onChange={(e) =>
                    dispatch(
                      setFormData({ ...formData, profession: e.target.value })
                    )
                  }
                >
                  <option value="">Select</option>
                  <option value="Doctor">Doctor</option>
                  <option value="CA">CA</option>
                  <option value="Lawyer">Lawyer</option>
                  <option value="Other">other</option>
                </select>
              </div>
              {formik.touched.businessType && formik.errors.businessType && (
                <span className="text-red-500 text-xs font-bold">
                  {formik.errors.businessType}
                </span>
              )}
            </div>
            {formData.profession === "Other" && (
              <div>
                <div>
                  <span className=" font-semibold text-gray-500">
                    Mention your profession
                  </span>
                  <div className="border-b border-slate-400 py-1">
                    <input
                      placeholder=""
                      type="text"
                      name="otherProfession"
                      value={formData.otherProfession}
                      onChange={(e) =>
                        dispatch(
                          setFormData({
                            ...formData,
                            otherProfession: e.target.value,
                          })
                        )
                      }
                      className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
                      required
                    />
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        <div>
          <span className="font-semibold text-gray-500">Existing EMI</span>
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
          ) : emiErrStatus ? (
            <span className="text-red-500 text-xs font-bold duration-200">
              {emiErr}
            </span>
          ) : null}
        </div>
        <div>
          <span className="font-semibold text-gray-500">
            Wish To Take Loan Against
          </span>
          <div className="border-b border-slate-400 py-1 w-full">
            <select
              className="w-full"
              {...formik.getFieldProps("collateralOption")}
            >
              <option>Select</option>
              {collateralOption.map((ele, i) => {
                return (
                  <option key={i} value={ele}>
                    {ele}
                  </option>
                );
              })}
            </select>
          </div>
          {formik.touched.collateralOption &&
            formik.errors.collateralOption && (
              <span className="text-red-500 text-xs font-bold">
                {formik.errors.collateralOption}
              </span>
            )}
        </div>
        {formik.values.collateralOption === "Other" && (
          <div>
            <div>
              <span className=" font-semibold text-gray-500">
                Collateral Option Type
              </span>
              <div className="border-b border-slate-400 py-1">
                <input
                  placeholder=""
                  type="text"
                  {...formik.getFieldProps("otherCollateralOptionType")}
                  className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
                />
              </div>
              {formik.touched.otherCollateralOptionType &&
                formik.errors.otherCollateralOptionType && (
                  <span className="text-red-500 text-xs font-bold">
                    {formik.errors.otherCollateralOptionType}
                  </span>
                )}
            </div>
          </div>
        )}
        {/* <div className="">
          <span className="font-semibold text-gray-500">New Property Type</span>
          <div className="flex gap-2 bg-gray-200/40 border-[1px] border-gray-400 rounded-md">
            <select
              className="bg-transparent w-full disabled:cursor-not-allowed py-2.5"
              {...formik.getFieldProps("newPropertyType")}
              value={formData.newPropertyType}
              onChange={(e) =>
                dispatch(
                  setFormData({
                    ...formData,
                    newPropertyType: e.target.value,
                  })
                )
              }
            >
              <option value="">Select</option>
              {newPropertyType.map((ele, i) => {
                return (
                  <option key={ele} value={ele}>
                    {ele}
                  </option>
                );
              })}
            </select>
          </div>
          {formik.touched.newPropertyType && formik.errors.newPropertyType && (
            <span className="text-red-500 text-xs font-bold">
              {formik.errors.newPropertyType}
            </span>
          )}
        </div>
        {formData.newPropertyType === "Old construction" && (
          <div>
            <span className=" font-semibold text-gray-500">
              Mention new property type
            </span>
            <div className="border-b border-slate-400 py-1">
              <input
                placeholder=""
                type="text"
                {...formik.getFieldProps("propertyAge")}
                className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
              />
            </div>
            {formik.touched.propertyAge && formik.errors.propertyAge && (
              <span className="text-red-500 text-xs font-bold">
                {formik.errors.propertyAge}
              </span>
            )}
          </div>
        )}
        <div className="col-span-1 sm:col-span-2">
          <span className="font-semibold text-gray-500">
            Where are you planning to take property
          </span>
        </div>
        <div>
          <span className="font-semibold text-gray-500">
            New Property State
          </span>
          <div className="flex gap-2 bg-gray-200/40 border-[1px] border-gray-400 rounded-md">
            <select
              className="bg-transparent w-full py-2.5"
              {...formik.getFieldProps("newPropertyState")}
              value={selectedNewpropertyState}
              onChange={(e) => {
                formik.handleChange(e);
                setSelectedNewpropertyState(e.target.value);
              }}
            >
              <option value={""}>Select</option>
              {newpropertyStates
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
          {formik.touched.newPropertyState &&
            formik.errors.newPropertyState && (
              <span className="text-red-500 text-xs font-bold">
                {formik.errors.newPropertyState}
              </span>
            )}
        </div>
        <div>
          <span className="font-semibold text-gray-500">New Property City</span>
          <div className="flex gap-2 bg-gray-200/40 border-[1px] border-gray-400 rounded-md">
            <select
              className="bg-transparent w-full disabled:cursor-not-allowed py-2.5"
              disabled={!selectedNewpropertyState}
              {...formik.getFieldProps("newPropertyCity")}
            >
              <option value={""}>Select</option>
              {newpropertyCities.map((obj) => {
                return (
                  <option key={obj.id} value={obj.name}>
                    {obj.name}
                  </option>
                );
              })}
            </select>
          </div>
          {formik.touched.newPropertyCity && formik.errors.newPropertyCity && (
            <span className="text-red-500 text-xs font-bold">
              {formik.errors.newPropertyCity}
            </span>
          )}
        </div>
        <div>
          <span className=" font-semibold text-gray-500">
            New Property Pincode
          </span>
          <div className="border-b border-slate-400 py-1">
            <input
              placeholder=""
              type="text"
              {...formik.getFieldProps("newPropertyPincode")}
              className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
            />
          </div>
          {formik.touched.newPropertyPincode &&
            formik.errors.newPropertyPincode && (
              <span className="text-red-500 text-xs font-bold">
                {formik.errors.newPropertyPincode}
              </span>
            )}
        </div> */}

        <div>
          <span className="font-semibold text-gray-500">Email Address</span>
          <div className="border-b border-slate-400 py-1">
            <input
              placeholder=""
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
          <span className="font-semibold text-gray-500">Mobile Number</span>
          <div className="flex items-center space-x-2.5 border-b border-slate-400 py-1">
            <img src="/india.png" alt="india" className="w-7 h-4" />
            <span className="whitespace-nowrap">+91 -</span>
            <input
              placeholder=""
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
                setCheckBox2(true);
              }}
            />
          </div>

          <div>
            <input
              type="checkbox"
              checked={checkBox1}
              onChange={() => setCheckBox1((prev) => !prev)}
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
            disabled={!checkBox1 || !checkBox2} // disabled={!checkBox1 }
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
