import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import ReCAPTCHA from "react-google-recaptcha";
import {
  setFormData,
  setShowSubmitLoanFormPaymentModal,
} from "../../../store/appSlice";
import {} from "../../../store/appSlice";
import {
  businessLoanTenure,
  residencyType,
  businessLoanEmploymentType,
  collateralOption,
  loanStartDate,
  primaryBankAccount,
  yearsInCurrentBusiness,
  BusinessNature,
  companyType,
  industryType,
} from "../../../configs/selectorConfigs";
import { validationPenCard } from "../../../validation/validationFun";
import { Link } from "react-router-dom";
import { changeIntoDate } from "../../../validation/function";
const Form = ({ states, cities, selectedState, setSelectedState }) => {
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const { formData, isOpenModal } = useSelector((store) => store.app);
  // checkbox
  const [checkBox1, setCheckBox1] = useState(true);
  const [checkBox2, setCheckBox2] = useState(false);
  const [incomeStatus,setIncomeStatus] = useState({month:false,year:false})
  const [bankInValue,setBankInValue] = useState('')  

function calculateEmi(value,onsumbit){
    if (value !== 0||onsumbit) {
      const salary = formData.monthlyIncome || formData.yearlyIncome / 12;
      const emi = salary * 0.8;
        setEmiError({
          status: value > emi,
          msg: "EMI should be less than 80% of your monthly income",
        });
        return value > emi;
    }
    return true
  }


function handaleBsTypeError(formData){
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
    !(+formData.yearlyIncome) 
  ) {
    setIncomeError({
      status: true,
      message: "Invalid income",
    });
    return false;
  }else if(formData.employmentType === "Salaried"?
  +formData.monthlyIncome:+formData.yearlyIncome){
    setIncomeError({
      status: false,
      message: "",
    });
    return true;
  }
}  

  
  

  // Yup validation
  const validationSchema = Yup.object({
    name: Yup.string("").min(5).required("Full name required"),
    dateOfBirth: Yup.string("")
      .required("Date of birth required")
      .test("age-check", "Must be at least 21 years old", function (value) {
        const currentDate = new Date();
        const selectedDate = new Date(value.split('-').reverse().join('-'));
        console.log(selectedState)
        const age = currentDate.getFullYear() - selectedDate.getFullYear();

        // Adjust the age check as per your specific requirements
        return age >= 21;
      }),
    state: Yup.string("").required("State required"),
    city: Yup.string("").required("City required"),
    pincode: Yup.number()
      .integer("Pincode must be a number")
      .required("Pincode required")
      .test("length-check", "Invalid pincode", function (value) {
        return value.toString().length === 6;
      }),
    residencyType: Yup.string("").required("select residency type"),
    panCardNum: Yup.string()
      .required("Pancard number required")
      .length(10, "Pan card number should be 10 characters")
      .matches(
        /^[a-zA-Z]{5}\d{4}[a-zA-Z]$/,
        "Invalid pancard number"
      )
      .matches(/^[A-Z0-9]+$/, 'Only alphanumeric characters are allowed')      ,

    loanAmount: Yup.number()
      .integer("Loan amount must be a number")
      .required("Loan amount required")
      .min(100000, "min 1 lakh"),
    collateralOption: Yup.string("").required("* mandatory"),
    existingEmi: Yup.number()
      .integer("EMI must be a number")
      .required("EMI required")
      .min(0, "min 0")
      .max(30000, "max 30k"),
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
      primaryBankAccount:Yup.string("").required("*Income Bank Account Name required"),
      primaryBankAccountOption:Yup.string("").required("*Income Bank Account required"),
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

    if(emiError.status || incomeError.status){
      return 
    }
    setIncomeStatus({month:false,year:false})
    dispatch(setShowSubmitLoanFormPaymentModal(true));
    dispatch(setFormData({ ...formData, ...values,
      monthlyIncome:formData.monthlyIncome,
      yearlyIncome:formData.yearlyIncome }));
  };

  //income error
  const [incomeError, setIncomeError] = useState({
    status: false,
    message: "",
  });
  const [emiError, setEmiError] = useState({
    status: false,
    msg: "",
  });

  useEffect(()=>{
    calculateEmi(formik.values.existingEmi,true)
    handaleBsTypeError(formData)
  },[formData.monthlyIncome,
    formData.yearlyIncome,
    formik.values.existingEmi])


    useEffect(()=>{
      if(formik?.values?.primaryBankAccountOption?.trim()){
        formik.setFieldTouched('primaryBankAccountOption',false)
      }else{
        formik.setFieldTouched('employerTypeOption',false)
      }
    },[formik?.values?.primaryBankAccountOption,
      formik?.values?.employerTypeOption
    ])
  return (
    <div className="py-10 ">
      <div className="-mb-2.5 -ml-2.5 flex items-center space-x-2.5"></div>
      <h1 className="text-xl flex mb-8 flex-col space-y-2 font-semibold text-gray-500" >
        <span>
          Unlock best <span>home loan</span> offers suitable for your needs from{" "}
          <span>43+ lenders</span>
        </span>
        <span className="w-20 h-0.5 rounded-full bg-cyan-400 "></span>
      </h1>
      <form
          className='block lg:grid lg:grid-cols-2  gap-8 '        
          onSubmit={(e)=>{
          e.preventDefault()
          setIncomeStatus({month:true,year:true})
          formik.handleSubmit()
        }}
      >
        <div>
          <span className="font-semibold text-gray-500">Full Name</span>
          <div className="border-b border-slate-400 py-1">
            <input
              placeholder="As per PAN card"
              type="text"
              {...formik.getFieldProps("name")}
              className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
            />
          </div>
          {formik.touched.name && formik.errors.name && (
            <span className="text-red-500 text-xs font-bold">
              {formik.errors.name}
            </span>
          )}
        </div>

        <div>
          <span className="font-semibold text-gray-500">Date of Birth (As per PAN card) </span>
          <div className="border-b border-slate-400 py-1">
            <input
              placeholder="DD-MM-YYYY"
              type="text"
               onBlur={()=>formik.setFieldTouched('dateOfBirth',true)}
               value={formik.values.dateOfBirth}
               onChange={(e) => {
                

                const formattedDate = changeIntoDate(e.target.value,'DD-MM-YYYY')

                if(formattedDate.length>10){
                    return
                }

                e.target.value = formattedDate
                formik.setFieldValue('dateOfBirth',formattedDate)
                
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
      
        <div className="col-span-1 sm:col-span-2">
          <span className="font-semibold text-gray-500" >PAN Card Number</span>
          <div className="border-b border-slate-400 py-1">
            <input
              placeholder="Enter Permanent Account Number"
              type="text"
              {...formik.getFieldProps("panCardNum")}
              onChange={(e) => formik.setFieldValue("panCardNum", e.target.value.toUpperCase())}
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
          <span className="font-semibold text-gray-500" >Loan Amount</span>
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
          <span className="font-semibold text-gray-500" >Loan Tenure</span>
          <div className="flex gap-2 bg-gray-200/40 border-[1px] border-gray-400 rounded-md">
            <select
              className="bg-transparent w-full py-2.5"
              name="loanTenure"
              value={formData.loanTenure}
              onChange={(e) =>
                dispatch(
                  setFormData({ ...formData, loanTenure: e.target.value })
                )
              }
            >
              <option value="">Select</option>
              {businessLoanTenure.map((tenure, i) => (
                <option key={i} value={tenure}>
                  {tenure}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <span className="font-semibold text-gray-500" >Employment Type</span>
          <div className="flex gap-2 bg-gray-200/40 border-[1px] border-gray-400 rounded-md">
            <select
              className="bg-transparent w-full py-2.5"
              value={formData.employmentType}
              name="employmentType"
              onChange={(e) =>
                dispatch(
                  setFormData({ ...formData, employmentType: e.target.value })
                )
              }
            >
              <option value="">Select</option>
              {businessLoanEmploymentType.map((ele) => {
                return (
                  <option key={ele} value={ele}>
                    {ele}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        {/* salary monthly /yearly */}
        <div className=" py-1">
          {formData.employmentType === "Salaried" &&
          formData.employmentType === "Salaried" ? (
            <div>
              <span className="font-semibold text-gray-500">
                <span >
                  {" "}
                  {formData.employmentType === "Salaried"
                    ? "Monthly Net"
                    : "Yearly "}{" "}
                </span>
                Income
              </span>
              <input
                placeholder="Enter your Monthly Income"
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
                onBlur={()=>setIncomeStatus(prev=>({...prev,month:true}))}
                className="bg-transparent w-full outline-none  placeholder:text-slate-500 border-b-[1px] border-slate-800"
              />
              {incomeError.status && incomeStatus.month&& (
                <span className="text-red-500 text-xs font-bold">
                  {incomeError?.message}
                </span>
              )}
            </div>
          ) : (
            <div>
              <span className="font-semibold text-gray-500">
                <span className="font-semibold text-gray-500">
                  {formData.employmentType === "Salaried"
                    ? "Monthly"
                    : "Yearly "}
                </span>
                Income
              </span>
              <input
                placeholder="Enter your Monthly Income"
                type="number"
                name="yearlyIncome"
                value={formData.yearlyIncome}
                onBlur={()=>setIncomeStatus(prev=>({...prev,year:true}))}

                onChange={(e) => {
                  
                  dispatch(
                    setFormData({
                      ...formData,
                      yearlyIncome: e.target.value,
                    })
                  );
                }}
                className="bg-transparent w-full outline-none  placeholder:text-slate-500 border-b-[1px] border-slate-800"
              />
              {incomeError.status&&incomeStatus.year && (
                <span className="text-red-500 text-xs font-bold">
                  {incomeError?.message}
                </span>
              )}
            </div>
          )}
        </div>
        <div>
          <span className="font-semibold text-gray-500">Income Bank Account</span>
          <div className="flex gap-2 bg-gray-200/40 border-[1px] border-gray-400 rounded-md">
            <select
              className="bg-transparent w-full py-2.5"
              value={formik.values.primaryBankAccountOption}
              onBlur={()=>formik.setFieldTouched('primaryBankAccountOption',true)}
              onChange={(e) =>{
                if(e.target.value==='Other'){
                  formik.setFieldValue('primaryBankAccountOption',e.target.value)
                  formik.setFieldValue('primaryBankAccount','')
                  return 
                }else{                  
                  formik.setFieldValue('primaryBankAccountOption',e.target.value)
                  formik.setFieldValue('primaryBankAccount',e.target.value)
                }
             
              }}
            >
              <option value={''}>Select</option>
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
       {formik.values.primaryBankAccountOption ==='Other'&&  <div>
              <span className=" font-semibold text-gray-500" >Enter Income Bank Account Name</span>
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
         </div>}

        <div>
          <span className="font-semibold text-gray-500" >Years In Current Business</span>
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
        {formData.employmentType === "Self-employed business" ? (
          <>
            <div className="col-span-1 sm:col-span-2">
              <h1 className="font-bold"> Business Details</h1>
            </div>
            <div>
              <span className="font-semibold text-gray-500" >Current Business City</span>
              <div className="border-b border-slate-400 py-1">
                <input
                  placeholder=""
                  type="text"
                  value={formData.businessCity}
                  {...formik.getFieldProps("currentBusinessCity")}
                  className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
                />
              </div>
              {formik.touched.currentBusinessCity &&
                formik.errors.currentBusinessCity && (
                  <span className="text-red-500 text-xs font-bold">
                    {formik.errors.currentBusinessCity}
                  </span>
                )}
            </div>
            <div>
              <span className="font-semibold text-gray-500" >Company Type</span>
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
            <div>
              <span className="font-semibold text-gray-500">Nature Of Business</span>
              <div className="flex gap-2 bg-gray-200/40 border-[1px] border-gray-400 rounded-md">
                <select
                  className="bg-transparent w-full py-2.5"
                  name="BusinessNature"
                  value={formData.BusinessNature}
                  onChange={(e) => {
                    dispatch(
                      setFormData({
                        ...formData,
                        BusinessNature: e.target.value,
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
            <div>
              <span className="font-semibold text-gray-500" >Industry Type</span>
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
              <span className="font-semibold text-gray-500" >Sub Industry</span>
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
                    s;
                  }}
                  className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
                />
              </div>
              {formik.touched.name && formik.errors.name && (
                <span className="text-red-500 text-xs font-bold">
                  {formik.errors.name}
                </span>
              )}
            </div>
            <div>
              <span className="font-semibold text-gray-500" >Start Date</span>
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
            </div>
            <div>
              <span className="font-semibold text-gray-500" >Current Year Turn Over</span>
              <div className="border-b border-slate-400 py-1">
                <input
                  placeholder="Current Turn Over"
                  type="text"
                  {...formik.getFieldProps("companyCurrentYearTurnOverRange")}
                  className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
                />
              </div>
              {formik.touched.companyCurrentYearTurnOverRange &&
                formik.errors.companyCurrentYearTurnOverRange && (
                  <span className="text-red-500 text-xs font-bold">
                    {formik.errors.companyCurrentYearTurnOverRange}
                  </span>
                )}
            </div>
            <div>
              <span className="font-semibold text-gray-500" >Previous Year Turn over</span>
              <div className="border-b border-slate-400 py-1">
                <input
                  placeholder="Previous TurnOver"
                  type="text"
                  {...formik.getFieldProps("companyLastYearTurnOverRange")}
                  className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
                />
              </div>
              {formik.touched.companyLastYearTurnOverRange &&
                formik.errors.companyLastYearTurnOverRange && (
                  <span className="text-red-500 text-xs font-bold">
                    {formik.errors.companyLastYearTurnOverRange}
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
              <span className=" font-semibold text-gray-500" >Current Business City</span>
              <div className="border-b border-slate-400 py-1">
                <input
                  placeholder=""
                  type="text"
                  {...formik.getFieldProps("currentBusinessCity")}
                  className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
                />
              </div>
              {formik.touched.currentBusinessCity &&
                formik.errors.currentBusinessCity && (
                  <span className="text-red-500 text-xs font-bold">
                    {formik.errors.currentBusinessCity}
                  </span>
                )}
            </div>
            <div>
              <span className="font-semibold text-gray-500" >Years In Current Profession</span>
              <div className="border-b border-slate-400 py-1">
                <select
                  className="w-full"
                  onChange={(e) =>
                    dispatch(
                      setFormData({
                        ...formData,
                        yearsInCurrentBusiness: e.target.value,
                      })
                    )
                  }
                  {...formik.getFieldProps("yearsInCurrentBusiness")}
                >
                  {yearsInCurrentBusiness.map((ele, i) => {
                    return <option key={i}>{ele}</option>;
                  })}
                </select>
              </div>
              {formik.touched.yearsInCurrentBusiness &&
                formik.errors.yearsInCurrentBusiness && (
                  <span className="text-red-500 text-xs font-bold">
                    {formik.errors.yearsInCurrentBusiness}
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
                  <option value="other">other</option>
                </select>
              </div>
              {formik.touched.businessType && formik.errors.businessType && (
                <span className="text-red-500 text-xs font-bold">
                  {formik.errors.businessType}
                </span>
              )}
            </div>
            <div>
              <span className="flex flex-col mb-8 text-xl font-semibold text-gray-500">Profession Business Registration Number</span>
              <div className="border-b border-slate-400 py-1">
                <input
                  placeholder=""
                  type="text"
                  value={formData.registrationNumber}
                  onChange={(e) =>
                    dispatch(
                      setFormData({
                        ...formData,
                        registrationNumber: e.target.value,
                      })
                    )
                  }
                  className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
                />
              </div>
            </div>
            <div>
              <span className="font-semibold text-gray-500" >Start Date</span>
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
            </div>
          </>
        )}
        <div>
          <span className="font-semibold text-gray-500">Wish To Take Loan Against</span>
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
        <div>
          <span className="font-semibold text-gray-500" >Existing EMI</span>
          <div className="border-b border-slate-400 py-1">
            <input
              placeholder="Enter your existing EMI if any"
              type="number"
              {...formik.getFieldProps("existingEmi")}
              className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
            />
          </div>
          {(formik.touched.existingEmi && formik.errors.existingEmi)? (
            <span className="text-red-500 text-xs font-bold duration-200">
              {formik.errors.existingEmi}
            </span>
          ):emiError.status === true? 
          (
            <span className="text-red-500 text-xs font-bold duration-200">
              {emiError?.msg}
            </span>
          ):''
        }
      
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
              <option value={''}>Select</option>
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
              <option value={''}>Select</option>
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
        <div >
          <span className="font-semibold text-gray-500">Ownsership of Residence/ Business Place</span>
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
          <span className="font-semibold text-gray-500" >Email address</span>
          <div className="border-b border-slate-400 py-1">
            <input
              placeholder="Enter your email address"
              type="text"
              {...formik.getFieldProps("email")}
              className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
            />
          </div>
          {formik.touched.email && formik.errors.email && (
            <span className="text-red-500 text-xs font-bold">
              {formik.errors.email}
            </span>
          )}
        </div>
        <div>
          <span className="font-semibold text-gray-500" >Mobile number</span>
          <div className="flex items-center space-x-2.5 border-b border-slate-400 py-1">
            <img src="/india.png" alt="india" className="w-7 h-4" />
            <span className="whitespace-nowrap">+91 -</span>
            <input
              type="number"
              {...formik.getFieldProps("contact")}
              className="bg-transparent w-full outline-none border-none"
            />
          </div>
          {formik.touched.contact && formik.errors.contact && (
            <span className="text-red-500 text-xs font-bold">
              {formik.errors.contact}
            </span>
          )}
        </div>
        <div className="col-span-2  sm:col-span-2">
          <div>
          <ReCAPTCHA
              sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
             onChange={(res)=>{
              setCheckBox2(true)
            }}
           />
         
          </div>
          <div>
            <input
              type="checkbox"
              checked={checkBox1}
              onChange={() => setCheckBox1(prev=>!prev)}
            />
        <label className="pl-2 font-semibold">
             By continuing, you agree to Indexia Finance.
              <Link className='text-blue-800'> Terms of Use </Link>
               and <Link className='text-blue-800'> Privacy Policy</Link>.</label>
                         </div>
          
        </div>
        <div className="w-1/2 mx-auto pt-2.5">
          <button
            className="bg-cyan-400 py-2.5 w-full rounded-lg text-lg text-white font-normal duration-200 disabled:cursor-not-allowed disabled:bg-gray-200"
            type="submit"
            // disabled={!checkBox1 }
            disabled={!checkBox1 || !checkBox2 }
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
