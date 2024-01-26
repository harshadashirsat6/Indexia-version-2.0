import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
// import { useNavigate } from "react-router-dom";
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
const Form = ({ states, cities, selectedState, setSelectedState }) => {
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const { formData, isOpenModal } = useSelector((store) => store.app);
  // checkbox
  const [checkBox1, setCheckBox1] = useState(true);
  const [checkBox2, setCheckBox2] = useState(false);
  const [incomeStatus,setIncomeStatus] = useState({month:false,year:false})
   

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
    name: Yup.string("").min(5).required("Full name should be filled"),
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
        /^[a-zA-Z]{5}.*[a-zA-Z]$/,
        "Invalid pancard number"
      )
      .matches(/^[A-Z0-9]+$/, 'Only alphanumeric characters are allowed')      ,

    loanAmount: Yup.number()
      .integer("Loan amount must be a number")
      .required("Loan amount should be filled")
      .min(100000, "min 1 lakh"),
    collateralOption: Yup.string("").required("* mandatory"),
    existingEmi: Yup.number()
      .integer("EMI must be a number")
      .required("EMI should be filled")
      .min(0, "min 0")
      .max(30000, "max 30k"),
    email: Yup.string("").email().required("Email should be filled"),
    contact: Yup.number()
      .integer("Invalid contact number")
      .required("Contact number should be filled")
      .test(
        "length-check",
        "contact number must be of 10 digits",
        function (value) {
          return value.toString().length === 10;
        }
      ),
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



  return (
    <div className="py-10 ">
      <div className="-mb-2.5 -ml-2.5 flex items-center space-x-2.5"></div>
      <h1 className="text-xl flex flex-col space-y-2">
        <span>
          Unlock best <span>business loan</span> offers suitable for your needs
          from <span>43+ lenders</span>
        </span>
        <span className="w-20 h-0.5 rounded-full bg-cyan-400"></span>
      </h1>
      <form
          className='block lg:grid lg:grid-cols-2  gap-8'        
          onSubmit={(e)=>{
          e.preventDefault()
          setIncomeStatus({month:true,year:true})
          formik.handleSubmit()
        }}
      >
        <div>
          <span>Full name</span>
          <div className="border-b border-slate-400 py-1">
            <input
              placeholder="As per on your pan card"
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
        <div >
          <span>Ownsership of Residence/ Business Place</span>
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
          <span>Employment type</span>
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
              <option>Select</option>
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
                onBlur={()=>setIncomeStatus(prev=>({...prev,year:true}))}

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
              {incomeError.status&&incomeStatus.year && (
                <span className="text-red-500 text-xs font-bold">
                  {incomeError?.message}
                </span>
              )}
            </div>
          )}
        </div>
        <div>
          <span>Income Bank Account</span>
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
          <span>Years In Current Business</span>
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
              <span>Current Business City</span>
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
              <span>Company Type</span>
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
              <span>Nature Of Business</span>
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
              <span>Industry Type</span>
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
              <span>Sub Industry</span>
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
              <span>Start Date</span>
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
              <span>Current Year Turn Over</span>
              <div className="border-b border-slate-400 py-1">
                <input
                  placeholder="Current TurnOver"
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
              <span>Previous Year Turn over</span>
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
              <span>Current Business City</span>
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
              <span>Years In Current Profession</span>
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
              <span>Profession Business Registration Number</span>
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
              <span>Start Date</span>
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
          <span>Wish To Take Loan Against</span>
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
          <span>Existing EMI</span>
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
          <span>Email address</span>
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
          <span>Mobile number</span>
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
            <label className="pl-2">Terms & Conditions 1 & Conditions 2</label>
          </div>
          
        </div>
        <div className="w-1/2 mx-auto pt-2.5">
          <button
            className="bg-cyan-400 py-2.5 w-full rounded-lg text-lg text-white font-normal duration-200 disabled:cursor-not-allowed disabled:bg-gray-200"
            type="submit"
            disabled={!checkBox1 }
            // disabled={!checkBox1 || !checkBox2 }

          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
