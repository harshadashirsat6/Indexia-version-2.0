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
  residencyType,
  employmentType,
  incomeRecievedAs,
  newPropertyType,
  primaryBankAccount,
  yearlyIncome,
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
  const [incomeStatus, setIncomeStatus] = useState({
    month: false,
    year: false,
  });
  const [persionalConditionalObj, setPersionalConditionalUseObj] = useState({
    primaryBankAccount: "",
    touched: false,
    touched2: false,
  });
  const [activeCl, setActiveCl] = useState(true);

  // Yup validation
  const validationSchema = Yup.object({
    name: Yup.string("").min(5).required("Full name required"),
    dateOfBirth: Yup.string("")
      .required("Date of birth required")
      .test("age-check", "Must be at least 21 years old", function (value) {
        const currentDate = new Date();
        const selectedDate = new Date(value.split("-").reverse().join("-"));
        const age = currentDate.getFullYear() - selectedDate.getFullYear();

        // Adjust the age check as per your specific requirements
        return age >= 21;
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
    loanTenure: Yup.number()
      .integer("Loan amount must be a number")
      .required("Loan amount required")
      .min(1, "min 1")
      .max(30, "max 30"),
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
    otherPropertyTypeOption: Yup.string("").required(
      "Income Bank Account required"
    ),
    newPropertyState: Yup.string("").required("State required"),
    newPropertyCity: Yup.string("").required("City required"),
    newPropertyPincode: Yup.number()
      .integer("Pincode must be a number")
      .required("Pincode required")
      .test("length-check", "Invalid pincode", function (value) {
        return value.toString().length === 6;
      }),
  });


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
    setIncomeStatus({ month: false, year: false });
    dispatch(setShowSubmitLoanFormPaymentModal(true));
    dispatch(
      setFormData({
        ...formData,
        ...values,
        monthlyIncome: formData.monthlyIncome,
        yearlyIncome: formData.yearlyIncome,
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
  useEffect(() => {
    let salaryVal;
    if (formData.employmentType === "Salaried") {
      salaryVal = formData.monthlyIncome;
    } else {
      salaryVal = formData.yearlyIncome;
    }
    console.log(salaryVal);
    if (formik.values.existingEmi > 0 && salaryVal === 0) {
      setEmiErrStatus(true);
      return setEmiErr("please mention your salary");
    } else if (salaryVal > 0) {
      const percentageVal = (salaryVal * 80) / 100;
      if (formik.values.existingEmi > percentageVal) {
        setEmiErrStatus(true);
        return setEmiErr(`existing emi should be <=  ${percentageVal}`);
      } else if (formik.values.existingEmi <= percentageVal) {
        setEmiErrStatus(true);
        return setEmiErr("");
      }
    }
    setEmiErrStatus(false);
  }, [
    formik.values.existingEmi,
    formData.monthlyIncome,
    formData.yearlyIncome,
    formData.employmentType,
  ]);

  //New property state and city
  const [newpropertyStates, setNewpropertyState] = useState([]);
  const [selectedNewpropertyState, setSelectedNewpropertyState] = useState("");
  var stateConfig = {
    url: "https://api.countrystatecity.in/v1/countries/In/states",
    key: "N00wMDJleEpjQ09wTjBhN0VSdUZxUGxWMlJKTGY1a0tRN0lpakh5Vw==",
  };
  const getNewPropertyStates = async () => {
    await fetch(stateConfig.url, {
      headers: { "X-CSCAPI-KEY": stateConfig.key },
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
  var cityConfig = {
    url: `https://api.countrystatecity.in/v1/countries/IN/states/${selectedNewpropertyState}/cities`,
    key: "N00wMDJleEpjQ09wTjBhN0VSdUZxUGxWMlJKTGY1a0tRN0lpakh5Vw==",
  };
  const getNewPropertyCities = async () => {
    await fetch(cityConfig.url, {
      headers: { "X-CSCAPI-KEY": cityConfig.key },
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
          setIncomeStatus({ month: true, year: true });
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
          <span className="font-semibold text-gray-500">Residence Type</span>
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
        <div>
          <span className="font-semibold text-gray-500">Residence Pincode</span>
          <div className="border-b border-slate-400 py-1">
            <input
              placeholder="As per PAN card"
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
          {formik.touched.loanTenure && formik.errors.loanTenure && (
            <span className="text-red-500 text-xs font-bold">
              {formik.errors.loanTenure}
            </span>
          )}
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
            Salary Bank Account
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

        <div>
          <span className="font-semibold text-gray-500">Employer Type</span>
          <div className="flex gap-2 bg-gray-200/40 border-[1px] border-gray-400 rounded-md">
            <select
              className="bg-transparent w-full py-2.5"
              value={formik.values.employerTypeOption}
              onBlur={() => formik.setFieldTouched("employerTypeOption", true)}
              onChange={(e) => {
                if (e.target.value === "Other") {
                  formik.setFieldValue("employerTypeOption", e.target.value);
                  formik.setFieldValue("employerType", "");
                  return;
                } else {
                  formik.setFieldValue("employerTypeOption", e.target.value);
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
            <span className=" font-semibold text-gray-500">Employer Type </span>
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
        {/* salary monthly /yearly */}

        <div className=" py-1">
          {formData.employmentType === "Salaried" &&
          formData.employmentType === "Salaried" ? (
            <div>
              <span className="font-semibold text-gray-500">
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
              <span className="font-semibold text-gray-500">
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
          ) : emiErr ? (
            <span className="text-red-500 text-xs font-bold duration-200">
              {emiErr}
            </span>
          ) : null}
        </div>

        <div className="">
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
        {formData.newPropertyType === "Other" && (
          <div>
            <span className=" font-semibold text-gray-500">
              Mention new property type
            </span>
            <div className="border-b border-slate-400 py-1">
              <input
                placeholder=""
                type="text"
                {...formik.getFieldProps("otherPropertyTypeOption")}
                className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
              />
            </div>
            {formik.touched.otherPropertyTypeOption &&
              formik.errors.otherPropertyTypeOption && (
                <span className="text-red-500 text-xs font-bold">
                  {formik.errors.otherPropertyTypeOption}
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
        </div>

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
            disabled={!checkBox1 || !checkBox2}            // disabled={!checkBox1 }
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
