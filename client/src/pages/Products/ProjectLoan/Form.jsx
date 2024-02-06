import { useFormik } from "formik";
import * as Yup from "yup";
// import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  setFormData,
  setShowSubmitLoanFormPaymentModal,
} from "../../../store/appSlice";
import {
  loanTenure,
  residencyType,
  employmentType,
  incomeRecievedAs,
  employerType,
  loanStartDate,
  primaryBankAccount,
} from "../../../configs/selectorConfigs";
import ReCAPTCHA from "react-google-recaptcha";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const Form = ({ states, cities, selectedState, setSelectedState,user }) => {
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

  // Yup validation
  const validationSchema = Yup.object({
    dateOfBirth: Yup.string("")
      .required("Date of birth required")
      .test("age-check", "Must be at least 21 years old", function (value) {
        const currentDate = new Date();
        const selectedDate = new Date(value);
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
      .length(10)
      .matches(/^[a-zA-Z]{5}.*[a-zA-Z]$/, "Invalid pancard number")
      .matches(/^[A-Z0-9]+$/, "Only alphanumeric characters are allowed"),
    loanAmount: Yup.number()
      .integer("Loan amount must be a number")
      .required("Loan amount should be filled"),
    loanTenure: Yup.string("").required("select loan tenure "),
    employerType: Yup.string("").required("select employer type"),
    employmentType: Yup.string("").required("select employment type"),
    employerName: Yup.string("").required("employer name should be filled"),
    existingEmi: Yup.number()
      .integer("EMI must be a number")
      .required("EMI should be filled")
      .min(0, "min 0")
      .max(30000, "max 30k"),

    projectObjective: Yup.string("").required("*required"),
    projectDescription: Yup.string("").required("*required"),
    scopeOfWorkandDeliverables: Yup.string("").required("*required"),
    projectBudget: Yup.string("").required("*required"),
    projectStartDate: Yup.string("").required("*required"),
  });
  // Formik
  const formik = useFormik({
    initialValues: formData,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleProceed(values);
    },
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
        message: "Invalid income",
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
      <h1 className="font-semibold text-gray-500 text-xl flex flex-col space-y-2">
        <span>
          Unlock best <span>project loan</span> offers suitable for your needs
          from <span>43+ lenders</span>
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
          <span className="font-semibold text-gray-500">Date of birth</span>
          <div className="border-b border-slate-400 py-1">
            <input
              placeholder="DD-MM-YYYY"
              type="date"
              {...formik.getFieldProps("dateOfBirth")}
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
          <span className="font-semibold text-gray-500">State</span>
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
          <span className="font-semibold text-gray-500">City</span>
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
          <span className="font-semibold text-gray-500">Residency Pincode</span>
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
          <span className="font-semibold text-gray-500">Residency Type</span>
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
          <span className="font-semibold text-gray-500">PAN card number</span>
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
          <span className="font-semibold text-gray-500">Loan amount</span>
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
          <span className="font-semibold text-gray-500">Loan tenure</span>
          <div className="flex gap-2 bg-gray-200/40 border-[1px] border-gray-400 rounded-md">
            <select
              className="bg-transparent w-full py-2.5"
              name="loanTenure"
              value={formData.loanTenure}
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
          <span className="font-semibold text-gray-500">Employment type</span>
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
          <span className="font-semibold text-gray-500">
            Salary Bank Account
          </span>
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
            <span className="font-semibold text-gray-500">
              Salary Bank Account Name
            </span>
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
          <span className="font-semibold text-gray-500">Employer type</span>
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
          <span className="font-semibold text-gray-500">Employer name</span>
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
          ) : emiError.status === true ? (
            <span className="text-red-500 text-xs font-bold duration-200">
              {emiError?.msg}
            </span>
          ) : (
            ""
          )}
        </div>

        <div className="col-span-1 sm:col-span-2">
          <h1 className="font-bold ">Project Details</h1>
        </div>
        <div className="">
          <span className="font-semibold text-gray-500">Project Objective</span>
          <div className="border-b border-slate-400 py-1">
            <input
              placeholder="Goal and Objective of project"
              type="text"
              {...formik.getFieldProps("projectObjective")}
              className="bg-transparent w-full outline-none border-none placeholder:text-slate-500 placeholder:text-xs"
            />
          </div>
          {formik.touched.projectObjective &&
            formik.errors.projectObjective && (
              <span className="text-red-500 text-xs font-bold">
                {formik.errors.projectObjective}
              </span>
            )}
        </div>
        <div className="col-span-1 sm:col-span-2">
          <span className="font-semibold text-gray-500">
            Project Description
          </span>
          <div className="border-b border-slate-400 py-1">
            <textarea
              placeholder="ex: detail explaination about sector, field, sector, flow, material"
              type="text"
              {...formik.getFieldProps("projectDescription")}
              className="bg-transparent w-full outline-none border-none placeholder:text-slate-500 placeholder:text-xs"
            />
          </div>
          {formik.touched.projectDescription &&
            formik.errors.projectDescription && (
              <span className="text-red-500 text-xs font-bold">
                {formik.errors.projectDescription}
              </span>
            )}
        </div>
        <div className="col-span-1 sm:col-span-2">
          <span className="font-semibold text-gray-500">
            Scope Of Work and Deliverables
          </span>
          <div className="border-b border-slate-400 py-1">
            <input
              placeholder="Work & Deliverables"
              type="text"
              {...formik.getFieldProps("scopeOfWorkandDeliverables")}
              className="bg-transparent w-full outline-none border-none placeholder:text-slate-500 placeholder:text-xs"
            />
          </div>
          {formik.touched.scopeOfWorkandDeliverables &&
            formik.errors.scopeOfWorkandDeliverables && (
              <span className="text-red-500 text-xs font-bold">
                {formik.errors.scopeOfWorkandDeliverables}
              </span>
            )}
        </div>

        <div className="col-span-1 sm:col-span-2">
          <span className="font-semibold text-gray-500">Project Budget</span>
          <div className="border-b border-slate-400 py-1">
            <textarea
              placeholder="Entire Project Budget"
              type="text"
              {...formik.getFieldProps("projectBudget")}
              className="bg-transparent w-full outline-none border-none placeholder:text-slate-500 placeholder:text-xs"
            />
          </div>
          {formik.touched.projectBudget && formik.errors.projectBudget && (
            <span className="text-red-500 text-xs font-bold">
              {formik.errors.projectBudget}
            </span>
          )}
        </div>
        <div>
          <span className="font-semibold text-gray-500">
            Project Commence Date
          </span>
          <div className="border-b border-slate-400 py-1">
            <input
              placeholder="DD-MM-YYYY"
              type="date"
              {...formik.getFieldProps("projectStartDate")}
              className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
            />
          </div>
          {formik.touched.projectStartDate &&
            formik.errors.projectStartDate && (
              <span className="text-red-500 text-xs font-bold">
                {formik.errors.projectStartDate}
              </span>
            )}
        </div>
        <div>
          <span className="font-semibold text-gray-500">
            Expected Date of Completion
          </span>
          <div className="border-b border-slate-400 py-1">
            <input
              placeholder="DD-MM-YYYY"
              type="date"
              {...formik.getFieldProps("expectedDateOfComletion")}
              className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
            />
          </div>
          {formik.touched.expectedDateOfComletion &&
            formik.errors.expectedDateOfComletion && (
              <span className="text-red-500 text-xs font-bold">
                {formik.errors.expectedDateOfComletion}
              </span>
            )}
        </div>
        <div>
          <span className="font-semibold text-gray-500">Email address</span>
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
          {formik.touched.email && formik.errors.email && (
            <span className="text-red-500 text-xs font-bold">
              {formik.errors.email}
            </span>
          )}
        </div>
        <div>
          <span className="font-semibold text-gray-500">Mobile number</span>
          <div className="flex items-center space-x-2.5 border-b border-slate-400 py-1">
            <img src="/india.png" alt="india" className="w-7 h-4" />
            <span className="whitespace-nowrap">+91 -</span>
            <input
              placeholder=""
              type="number"
              value={user?.contact}
              name="number"
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
