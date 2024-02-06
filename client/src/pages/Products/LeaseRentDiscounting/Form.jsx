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
import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

const Form = ({ states, cities, selectedState, setSelectedState,user }) => {
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const { formData, isOpenModal } = useSelector((store) => store.app);
  // checkbox
  const [checkBox1, setCheckBox1] = useState(false);
  const [checkBox2, setCheckBox2] = useState(true);

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
      .length(10, "Pan card number should be 10 characters")
      .matches(
        /^[A-Z0-9]{10}$/,
        "Invalid pancard number, only uppercase letters and digits allowed"
      ),

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
    console.log(formData);
    if (
      formData.employmentType === "Salaried" &&
      formData.monthlyIncome === 0
    ) {
      setIncomeError({
        status: true,
        message: "Please enter valid income",
      });
      return;
    } else if (
      formData.employmentType === "Salaried" &&
      formData.monthlyIncome < 12000
    ) {
      setIncomeError({
        status: true,
        message: "salary min 12k",
      });
      return;
    } else if (
      (formData.employmentType === "Self-employed business" ||
        formData.employmentType === "Self-employed professional") &&
      formData.yearlyIncome === 0
    ) {
      setIncomeError({
        status: true,
        message: "Invalid income",
      });
      return;
    }

    if (values.existingEmi !== 0) {
      const salary = formData.monthlyIncome || formData.yearlyIncome / 12;
      const emi = salary * 0.8;
      if (values.existingEmi > emi) {
        setEmiError({
          status: true,
          msg: "EMI should be less than 80% of your monthly income",
        });
        return;
      }
    }
    setEmiError({ status: false, msg: "" });
    setIncomeError({ status: false, message: "" });
    dispatch(setShowSubmitLoanFormPaymentModal(true));
    dispatch(setFormData({ ...formData, ...values }));
  };
  return (
    <div className="py-10">
      <div className="-mb-2.5 -ml-2.5 flex items-center space-x-2.5"></div>
      <h1 className="text-xl flex flex-col space-y-2">LeaseRentDiscounting</h1>
      <form
        className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-5 py-10 "
        onSubmit={formik.handleSubmit}
      >
        <div>
          <span>Full name</span>
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
          <span>Date of birth</span>
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
          <span>Pincode</span>
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
              value={formData.primaryBankAccount}
              onChange={(e) =>
                dispatch(
                  setFormData({
                    ...formData,
                    primaryBankAccount: e.target.value,
                  })
                )
              }
            >
              <option>Select</option>
              {primaryBankAccount.map((ele) => {
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
                name="monthlyIncome"
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
                className="bg-transparent w-full outline-none  placeholder:text-slate-500 border-b-[1px] border-slate-800"
              />
              {incomeError.status === true && (
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
                name="yearlyIncome"
                value={formData.yearlyIncome}
                onChange={(e) => {
                  dispatch(
                    setFormData({
                      ...formData,
                      yearlyIncome: e.target.value,
                    })
                  );
                  setIncomeError({ status: false, msg: "" });
                }}
                className="bg-transparent w-full outline-none  placeholder:text-slate-500 border-b-[1px] border-slate-800"
              />
              {incomeError.status === true && (
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
          {formik.touched.existingEmi && formik.errors.existingEmi && (
            <span className="text-red-500 text-xs font-bold">
              {formik.errors.existingEmi}
            </span>
          )}
          {emiError.status === true && (
            <span className="text-red-500 text-xs font-bold">
              {emiError?.msg}
            </span>
          )}
        </div>

        <div>
          <span>Email address</span>
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
          <span>Mobile number</span>
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
            <label className="pl-2">Terms & Conditions 1 & Conditions 2</label>
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
