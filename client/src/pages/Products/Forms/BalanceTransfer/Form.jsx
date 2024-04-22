import { useState } from "react";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import ReCAPTCHA from "react-google-recaptcha";
import { Link, useParams } from "react-router-dom";
// selectors
import { employmentTypes } from "../../../../configs/selectorConfigs";
// components
import PersonalDetails from "../../PersonalDetails";
import IncomeDetails from "../../IncomeDetails";
import LoanExposure from "../../ExistingLoanExposure";
import CustomInputs from "./CustomInputs";
import LoanDetails from "./LoanDetails";

const Form = () => {
  const { param } = useParams();
  const { balanceTransfForm } = useSelector((store) => store.loanForm);
  const { userBasicDetails } = useSelector((store) => store.user);

  // checkbox
  const [checkBox1, setCheckBox1] = useState(true);
  const [checkBox2, setCheckBox2] = useState(false);

  //support fields
  const [bankNameArr = [], setBankNameArr] = useState([]);
  //add existing loan types
  const [selectedItems, setSelectedItems] = useState([]);
  const [tableData, setTableData] = useState([]);

  //ERR fields
  const [monthlyIncomeErr, setMonthlyIncomeErr] = useState(false);
  const [prevYearNetProfitErr, setPrevYearNetProfitErr] = useState(false);
  const [businessPincodeErr, setBusinessPincodeErr] = useState(false);
  const [emiErr, setEmiErr] = useState(false);
  //emi err
  const emiCalculation = (val) => {
    if (val > 0)
      if (!formik.values.employmentType) {
        setEmiErr(true);
        return (
          <span className="text-red-500 text-xs font-bold">
            Please mention your income details first
          </span>
        );
      } else if (formik.values.employmentType) {
        if (formik.values.employmentType === "Salaried") {
          if (formik.values.monthlyIncome && formik.values.monthlyIncome >= 0) {
            const calculatedEmi = Math.floor(
              (formik.values.monthlyIncome * 80) / 100
            );
            const formatter = new Intl.NumberFormat("en-IN");
            const newCalculatedEmi = formatter.format(calculatedEmi);
            if (calculatedEmi < val) {
              setEmiErr(true);
              return (
                <span className="text-red-500 text-xs font-bold">{`Emi should be less than ${newCalculatedEmi} (less than 80% of monthly salary)`}</span>
              );
            } else {
              setEmiErr(false);
              return "";
            }
          } else if (
            formik.values.monthlyIncome ||
            formik.values.monthly <= 0
          ) {
            setEmiErr(true);
            return (
              <span className="text-red-500 text-xs font-bold">
                Invalid Salary Input. As EMI will be calculated based on monthly
                salary
              </span>
            );
          }
        } else if (
          formik.values.employmentType === "Self-employed business" ||
          formik.values.employmentType === "Self-employed professional"
        ) {
          if (
            !formik.values.previousYearNetProfit &&
            formik.values.previousYearNetProfit === 0
          ) {
            setEmiErr(true);
            return (
              <span className="text-red-500 text-xs font-bold">
                Invalid. EMI will be calculated based on monthly salary
              </span>
            );
          } else if (formik.values.previousYearNetProfit > 0) {
            const calculatedEmi = Math.ceil(
              ((formik.values.previousYearNetProfit / 12) * 80) / 100
            );
            const formatter = new Intl.NumberFormat("en-IN");
            const newCalculatedEmi = formatter.format(calculatedEmi);
            if (val > calculatedEmi) {
              setEmiErr(true);
              return (
                <span className="text-red-500 text-xs font-bold">{`Emi should be less than ${newCalculatedEmi}(less than 80% of previous year net income)`}</span>
              );
            } else {
              setEmiErr(false);
            }
          }
        }

        setEmiErr(false);
        return "";
      }
  };

  //VALIDATION
  const validationSchema = Yup.object({
    existingLoanAmount: Yup.number()
      .integer("Invalid input.Must be a number")
      .required("* required"),
    existingEMI: Yup.number().required("* required").min(0, "Minimum 0"),
    //income details validation
    employmentType: Yup.string().required("* required"),
    //personal details validation
    dateOfBirth: Yup.string("")
      .required("* required")
      .test("age-check", "Age must be greater than 21", function (value) {
        const currentDate = new Date();
        const selectedDate = new Date(value.split("-").reverse().join("-"));
        const age = currentDate.getFullYear() - selectedDate.getFullYear();
        // Adjust the age check as per your specific requirements
        return age >= 23 && age <= 60;
      }),
    panCardNum: Yup.string()
      .required("* required")
      .length(10, "Pan card number should be 10 characters")
      .matches(/^[a-zA-Z]{5}\d{4}[a-zA-Z]$/, "Invalid pancard number")
      .matches(/^[A-Z0-9]+$/, "Only alphanumeric characters are allowed"),
    residenceState: Yup.string("").required("* required"),
    residenceCity: Yup.string("").required("* required"),
    residenceType: Yup.string("").required("* required"),
    residencePincode: Yup.string()
      .required("* required")
      .test("length-check", "Invalid pincode", function (value) {
        return value.length === 6;
      }),
    //custom inputs
    balanceTransferLoanTenure: Yup.number()
      .integer("Invalid")
      .required("* required"),
    balanceTransferLoanAmount: Yup.number()
      .integer("Invalid")
      .required("* required"),
    typeOfBalanceTransfer: Yup.string("").required("* required"),
    transferPropertyValue: Yup.number()
      .integer("Invalid")
      .required("* required"),
  });

  const formik = useFormik({
    initialValues: balanceTransfForm,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleProceed(values);
    },
  });

  const handleProceed = (values) => {
    alert("Form subittiming");

    if (formik.values.employmentType === "Salaried" && monthlyIncomeErr) {
      return;
    }
    if (
      formik.values.employmentType === "Self-employed business" ||
      formik.values.employmentType === "Self-employed professional"
    ) {
      if (prevYearNetProfitErr) return;
    }
    if (businessPincodeErr) {
      return;
    }
    if (emiErr) {
      return;
    }
    alert("successful submission");
    console.log("data=>", {
      ...values,
      ...userBasicDetails,
      existingLoanExposure: loanTypesArr,
    });
  };

  return (
    <form onSubmit={formik.handleSubmit} className="py-10">
      <div className="block lg:grid lg:grid-cols-2 gap-10 ">
        <CustomInputs formik={formik} />
        {/* INCOME DETAILS */}
        <div className="col-span-1 sm:col-span-2 ">
          <h1 className="font-bold text-blue-600 underline undVAerline-offset-4">
            INCOME DETAILS
          </h1>
        </div>
        {/* employment type */}
        <div className="">
          <span className="font-semibold text-gray-500">Employment Type *</span>
          <div className="flex gap-2 bg-gray-200/40 border-[1px] border-gray-400 rounded-md">
            <select
              className="bg-transparent w-full py-2.5"
              {...formik.getFieldProps("employmentType")}
            >
              <option value={""} className="hidden-option">
                Select
              </option>
              {employmentTypes.map((ele) => {
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
        <IncomeDetails
          formik={formik}
          bankNameArr={bankNameArr}
          setBankNameArr={setBankNameArr}
          setMonthlyIncomeErr={setMonthlyIncomeErr}
          setPrevYearNetProfitErr={setPrevYearNetProfitErr}
          setBusinessPincodeErr={setBusinessPincodeErr}
        />
        {/* LOAN EXPOSURE */}

        <div className="col-span-1 sm:col-span-2 ">
          <h1 className="font-bold text-blue-600 underline underline-offset-4">
            EXISTING LOAN EXPOSURE
          </h1>
        </div>
        <LoanExposure
          formik={formik}
          emiCalculation={emiCalculation}
          category={param}
        />
        <LoanDetails
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
          tableData={tableData}
          setTableData={setTableData}
        />
        {/* PERSONAL DETAILS */}
        <div className="col-span-1 sm:col-span-2 ">
          <h1 className="font-bold text-blue-600 underline underline-offset-4">
            PERSONAL DETAILS
          </h1>
        </div>
        <PersonalDetails formik={formik} />
      </div>
      {/* CHECKBOXES */}
      <div className="col-span-2  sm:col-span-2 my-6">
        <div>
          <ReCAPTCHA
            sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
            onChange={() => {
              setCheckBox2(true);
            }}
          />
        </div>
        <div className="py-2">
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

      {/* SUBMIT BUTTON */}
      <div className="py-4 flex justify-center">
        <button
          className="bg-cyan-400 py-2.5 w-[30%] rounded-lg text-lg text-white font-normal duration-200 disabled:cursor-not-allowed disabled:bg-gray-200"
          type="submit"
          disabled={!checkBox1 || !checkBox2}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default Form;
