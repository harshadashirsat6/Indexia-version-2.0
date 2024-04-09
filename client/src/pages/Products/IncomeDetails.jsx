import { useState, useEffect } from "react";
//selector
import {
  businessNatureTypes,
  businessCompanyTypes,
  businessPlaceOwnershipTypeInputs,
  employerTypes,
  incomeRecievedAs,
  primaryBankAccountOptions,
  yearsInCurrentBusiness,
  industryTypes,
} from "../../configs/selectorConfigs";
//validation functions
// import { monthlyIncomeError } from "./Validation/IncomeDetails";

const IncomeDetails = ({
  formik,
  bankNameArr,
  setBankNameArr,
  setMonthlyIncomeErr,
  setPrevYearNetProfitErr,
  setBusinessPincodeErr,
}) => {
  //multiple transaction bank names
  const [bankName, setBankName] = useState("");
  const [bankNameErr, setBankNameErr] = useState("");

  //current business state and city
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

  //monthly Income error
  const monthlyIncomeValidation = (val) => {
    if (val < 12000) {
      setMonthlyIncomeErr(true);
      return (
        <span className="text-red-500 text-xs font-bold">
          Salary should be greater than 12000
        </span>
      );
    }
    setMonthlyIncomeErr(false);
    return "";
  };

  //previous year net proft validation
  const prevYearNetProfitValidation = (val) => {
    if (val < 0 || val === null) {
      setPrevYearNetProfitErr(true);
      return (
        <span className="text-red-500 text-xs font-bold">Invalid input</span>
      );
    } else if (val === 0) {
      setPrevYearNetProfitErr(true);
      return (
        <span className="text-red-500 text-xs font-bold">
          Previous year net profit cannot be 0
        </span>
      );
    }
    if (val > 0) {
      setPrevYearNetProfitErr(false);
      return "";
    }
    setPrevYearNetProfitErr(false);
    return "";
  };

  //business city pincode error
  const businessCityPincodeValidation = (val) => {
    if (!val || val === "") {
      setBusinessPincodeErr(true);
      return "";
    } else if (val && val.length === 6) {
      setBusinessPincodeErr(false);
      return "";
    } else {
      setBusinessPincodeErr(true);
      return (
        <span className="text-red-500 text-xs font-bold">Invalid Pincode</span>
      );
    }
  };

  //ADD COMMA IN AMOUNT INPUTS
  const [monthlyInc, setMonthlyInc] = useState("");
  const [previousYearTurnOver, setPreviousYearTurnOver] = useState("");
  const [previous2yearTurnover, setPrevious2yearTurnover] = useState("");
  const [previousYearNetProfit, setPreviousYearNetProfit] = useState("");
  const [previous2yearNetIncome, setPrevious2yearNetIncome] = useState("");

  const addCommas = (field, number) => {
    const cleanedInput = number.replace(/[^\d]/g, ""); // Remove non-numeric characters
    const formatter = new Intl.NumberFormat("en-IN");
    console.log(field);
    if (field === "monthlyincome") {
      setMonthlyInc(formatter.format(cleanedInput));
    } else if (field === "previousyearturnover") {
      setPreviousYearTurnOver(formatter.format(cleanedInput));
    } else if (field === "previous2yearturnover") {
      setPrevious2yearTurnover(formatter.format(cleanedInput));
    } else if (field === "previousyearnetprofit") {
      setPreviousYearNetProfit(formatter.format(cleanedInput));
    } else if (field === "previous2yearnetprofit") {
      setPrevious2yearNetIncome(formatter.format(cleanedInput));
    }
  };

  return (
    <>
      {/* primary bank account */}
      {formik.values.employmentType === "Salaried" ? <></> : null}

      {/* company type */}
      {/*other employment fields  */}
      {formik.values.employmentType === "Salaried" ? (
        <>
          <div>
            <span className="font-semibold text-gray-500">Company Name *</span>
            <div className="border-b border-slate-400 py-1">
              <input
                placeholder="Company full name"
                type="text"
                {...formik.getFieldProps("companyName")}
                required
                className="w-full bg-transparent border-none outline-none placeholder:text-slate-700"
              />
            </div>
          </div>
          <div>
            <span className="font-semibold text-gray-500">Company Type *</span>
            <div className="flex gap-2 bg-gray-200/40 border-[1px] border-gray-400 rounded-md">
              <select
                className="bg-transparent w-full py-2.5"
                {...formik.getFieldProps("companyType")}
                required
              >
                <option value="">Select</option>
                {employerTypes.map((ele, i) => (
                  <option key={i} value={ele}>
                    {ele}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {formik.values.companyType === "Other" && (
            <div>
              <span className=" font-semibold text-gray-500">
                Mention company Type *
              </span>
              <div className="border-b border-slate-400 py-1">
                <input
                  type="text"
                  {...formik.getFieldProps("otherCompanyType")}
                  required
                  placeholder="Enter Employer type"
                  className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
                />
              </div>
            </div>
          )}
          <div>
            <span className="font-semibold text-gray-500">
              Monthly Net Salary *
            </span>
            <div className="border-b border-slate-400 py-1">
              <input
                placeholder="Take home salary"
                type="text"
                name="monthlyInc"
                value={monthlyInc}
                onChange={(e) => {
                  addCommas("monthlyincome", e.target.value);
                  const formatedVal = e.target.value.split(",").join("");
                  formik.setFieldValue("monthlyIncome", formatedVal);
                }}
                required
                className="bg-transparent w-full outline-none  placeholder:text-slate-500 "
              />
            </div>
            {monthlyIncomeValidation(Number(formik.values.monthlyIncome))}
          </div>
          <div>
            <span className="font-semibold text-gray-500">
              Salary recieved as *
            </span>
            <div>
              <div className="flex gap-2 bg-gray-200/40 border-[1px] border-gray-400 rounded-md">
                <select
                  className="bg-transparent w-full disabled:cursor-not-allowed py-2.5"
                  {...formik.getFieldProps("salaryRecievedAs")}
                  required
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
          {formik.values.salaryRecievedAs === "Cash" ||
          formik.values.salaryRecievedAs === "" ? null : (
            <>
              {" "}
              <div>
                <span className="font-semibold text-gray-500">
                  Salary Bank Name
                </span>
                <div className="flex gap-2 bg-gray-200/40 border-[1px] border-gray-400 rounded-md">
                  <select
                    className="bg-transparent w-full py-2.5"
                    name="primaryBankAccount"
                    {...formik.getFieldProps("primaryBankAccount")}
                    required
                  >
                    <option value={""}>Select</option>
                    {primaryBankAccountOptions.map((ele) => {
                      return (
                        <option key={ele} value={ele}>
                          {ele}
                        </option>
                      );
                    })}
                  </select>
                </div>
                {formik.touched.primaryBankAccount &&
                  formik.errors.primaryBankAccount && (
                    <span className="text-red-500 text-xs font-bold">
                      {formik.errors.primaryBankAccount}
                    </span>
                  )}
              </div>
              {formik.values.primaryBankAccount === "Other" && (
                <div>
                  <span className="font-semibold text-gray-500">
                    Mention salary bank name *
                  </span>
                  <div className="border-b border-slate-400 py-1">
                    <input
                      placeholder=""
                      type="text"
                      {...formik.getFieldProps("otherPrimaryBankAccount")}
                      className="w-full bg-transparent border-none outline-none placeholder:text-slate-700"
                      required
                    />
                  </div>
                </div>
              )}
            </>
          )}
        </>
      ) : formik.values.employmentType === "Self-employed business" ? (
        <>
          <div className="col-span-1 sm:col-span-2">
            <h1 className="font-bold">Business Details</h1>
          </div>
          <div>
            <span className="font-semibold text-gray-500">Company Type *</span>
            <div className="flex gap-2 bg-gray-200/40 border-[1px] border-gray-400 rounded-md">
              <select
                className="bg-transparent w-full py-2.5"
                name="companyType"
                {...formik.getFieldProps("companyType")}
                required
              >
                <option value="">Select</option>
                {businessCompanyTypes.map((ele, i) => (
                  <option key={i} value={ele}>
                    {ele}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {formik.values.companyType === "Other" && (
            <div>
              <div>
                <span className=" font-semibold text-gray-500">
                  Mention Company Type *
                </span>
                <div className="border-b border-slate-400 py-1">
                  <input
                    placeholder=""
                    type="text"
                    {...formik.values.otherCompanyType}
                    required
                    className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
                  />
                </div>
              </div>
            </div>
          )}
          <div>
            <span className="font-semibold text-gray-500">
              Company Full Name *
            </span>
            <div className="border-b border-slate-400 py-1">
              <input
                placeholder="full name required"
                type="text"
                {...formik.getFieldProps("companyName")}
                required
                className="w-full bg-transparent border-none outline-none placeholder:text-slate-700"
              />
            </div>
          </div>
          <div>
            <span className="font-semibold text-gray-500">
              GST no (if available-please mention)
            </span>
            <div className="border-b border-slate-400 py-1">
              <input
                placeholder=""
                type="text"
                {...formik.getFieldProps("gstNo")}
                className="w-full bg-transparent border-none outline-none placeholder:text-slate-700"
              />
            </div>
          </div>
          <div>
            <span className="font-semibold text-gray-500">
              Nature Of Business *
            </span>
            <div className="flex gap-2 bg-gray-200/40 border-[1px] border-gray-400 rounded-md">
              <select
                className="bg-transparent w-full py-2.5"
                {...formik.getFieldProps("businessNature")}
                required
              >
                <option value="">Select</option>
                {businessNatureTypes.map((ele, i) => (
                  <option key={i} value={ele}>
                    {ele}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {formik.values.businessNature === "Other" && (
            <div>
              <span className=" font-semibold text-gray-500">
                Mention Nature of business *
              </span>
              <div className="border-b border-slate-400 py-1">
                <input
                  placeholder=""
                  type="text"
                  {...formik.getFieldProps("otherBusinessNature")}
                  required
                  className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
                />
              </div>
            </div>
          )}
          <div>
            <span className="font-semibold text-gray-500">Industry Type *</span>
            <div className="flex gap-2 bg-gray-200/40 border-[1px] border-gray-400 rounded-md">
              <select
                className="bg-transparent w-full py-2.5"
                {...formik.getFieldProps("industryType")}
                required
              >
                <option value="">Select</option>
                {industryTypes.map((ele, i) => (
                  <option key={i} value={ele}>
                    {ele}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {formik.values.industryType === "Other" && (
            <div>
              <span className=" font-semibold text-gray-500">
                Other Industry Type *
              </span>
              <div className="border-b border-slate-400 py-1">
                <input
                  placeholder=""
                  type="text"
                  {...formik.getFieldProps("otherIndustryType")}
                  className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
                  required
                />
              </div>
            </div>
          )}
          <div>
            <span className="font-semibold text-gray-500">Sub Industry </span>
            <div className="border-b border-slate-400 py-1">
              <input
                placeholder=""
                type="text"
                {...formik.getFieldProps("subIndustryType")}
                className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
              />
            </div>
          </div>
          <div>
            <span className="font-semibold text-gray-500">
              Date of business establishment *
            </span>
            <div className="border-b border-slate-400 py-1">
              <input
                placeholder="DD-MM-YYYY"
                type="date"
                {...formik.getFieldProps("businessEstablishmentDate")}
                className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
                required
              />
            </div>
          </div>
          {/* bank account details */}
          <div className="col-span-1 sm:col-span-2">
            <span className="font-semibold text-gray-500">
              Transaction Bank Name
            </span>
            <div className="flex gap-2 bg-gray-200/40 border-[1px] border-gray-400 rounded-md">
              <select
                className="bg-transparent w-full py-2.5"
                name="primaryBankAccount"
                {...formik.getFieldProps("primaryBankAccount")}
                required
              >
                <option value={""}>Select</option>
                {primaryBankAccountOptions.map((ele) => {
                  return (
                    <option key={ele} value={ele}>
                      {ele}
                    </option>
                  );
                })}
                <option value="Multiple transaction banks">
                  Multiple transaction banks
                </option>
              </select>
            </div>
            {formik.touched.primaryBankAccount &&
              formik.errors.primaryBankAccount && (
                <span className="text-red-500 text-xs font-bold">
                  {formik.errors.primaryBankAccount}
                </span>
              )}
          </div>
          {formik.values.primaryBankAccount === "Other" ? (
            <div className="col-span-1 sm:col-span-2">
              <span className="font-semibold text-gray-500">
                Mention bank name *
              </span>
              <div className="border-b border-slate-400 py-1">
                <input
                  placeholder=""
                  type="text"
                  {...formik.getFieldProps("otherPrimaryBankAccount")}
                  className="w-full bg-transparent border-none outline-none placeholder:text-slate-700"
                  required
                />
              </div>
              {formik.touched.otherPrimaryBankAccount &&
                formik.errors.otherPrimaryBankAccount && (
                  <span className="text-red-500 text-xs font-bold">
                    {formik.errors.otherPrimaryBankAccount}
                  </span>
                )}
            </div>
          ) : formik.values.primaryBankAccount ===
            "Multiple transaction banks" ? (
            <div className="col-span-1 sm:col-span-2">
              <span className=" font-semibold text-gray-500">
                Mention multiple transaction bank names *
              </span>
              <div className="border-b border-slate-400 py-1 flex ">
                <input
                  placeholder=""
                  type="text"
                  name="bankName"
                  value={bankName}
                  onChange={(e) => {
                    setBankNameErr();
                    setBankName(e.target.value);
                  }}
                  className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (bankName) {
                      setBankNameArr([...bankNameArr, bankName]);
                      setBankName("");
                    } else {
                      setBankNameErr("Bank name cannot be empty");
                    }
                  }}
                  className="bg-blue-300 hover:bg-blue-200 text-black  font-bold rounded-lg px-5 py-0.5 "
                >
                  Add
                </button>
              </div>
              {bankNameArr.length ? (
                <div>
                  {bankNameArr.slice(0, 3).map((bankname, i) => (
                    <p key={i} className="flex gap-2">
                      <span>{i + 1}.</span>
                      <span>{bankname}</span>
                    </p>
                  ))}
                </div>
              ) : null}
              {bankNameArr.length > 3 && (
                <span className="text-red-500 text-xs font-bold">
                  You can add upto 3 banks only
                </span>
              )}
              <span>
                {bankNameErr ? (
                  <span className="text-red-500 text-xs font-bold">
                    {bankNameErr}
                  </span>
                ) : null}
              </span>
            </div>
          ) : null}
          {/* ends */}
          <div>
            <span className="font-semibold text-gray-500">
              Last Year Turnover *
            </span>
            <div className="border-b border-slate-400 py-1">
              <input
                placeholder=""
                // type="number"
                // {...formik.getFieldProps("previousYearTurnOver")}
                type="text"
                name="previousYearTurnOver"
                value={previousYearTurnOver}
                onChange={(e) => {
                  addCommas("previousyearturnover", e.target.value);
                  const formatedVal = e.target.value.split(",").join("");
                  formik.setFieldValue("previousYearTurnOver", formatedVal);
                }}
                required
                className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
              />
            </div>
          </div>
          {/* <div>
            <span className="font-semibold text-gray-500">
              Current Year Turn Over *
            </span>
            <div className="border-b border-slate-400 py-1">
              <input
                placeholder="Current Turn Over"
                type="number"
                {...formik.getFieldProps("currentYearTurnOver")}
                required
                className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
              />
            </div>
          </div> */}
          <div>
            <span className="font-semibold text-gray-500">
              Last ( 2 Years old) Turnover
            </span>
            <div className="border-b border-slate-400 py-1">
              <input
                placeholder=""
                // type="number"
                // {...formik.getFieldProps("previous2yearTurnover")}
                type="text"
                name="previous2yearTurnover"
                value={previous2yearTurnover}
                onChange={(e) => {
                  addCommas("previous2yearturnover", e.target.value);
                  const formatedVal = e.target.value.split(",").join("");
                  formik.setFieldValue("previous2yearTurnover", formatedVal);
                }}
                required
                className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
              />
            </div>
          </div>
          {/* <div>
            <span className="font-semibold text-gray-500">
              Current Year Net Income *
            </span>
            <div className="border-b border-slate-400 py-1">
              <input
                placeholder="Current Year Net Profit"
                type="text"
                {...formik.getFieldProps("currentYearNetProfit")}
                required
                className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
              />
            </div>
            {formik.touched.currentYearNetProfit &&
              formik.errors.currentYearNetProfit && (
                <span className="text-red-500 text-xs font-bold">
                  {formik.errors.currentYearNetProfit}
                </span>
              )}
          </div> */}
          <div>
            <span className="font-semibold text-gray-500">
              Last Year Net Income *
            </span>
            <div className="border-b border-slate-400 py-1">
              <input
                placeholder="Previous Year Net Profit"
                // type="text"
                // {...formik.getFieldProps("previousYearNetProfit")}
                type="text"
                name="previousYearNetProfit"
                value={previousYearNetProfit}
                onChange={(e) => {
                  addCommas("previousyearnetprofit", e.target.value);
                  const formatedVal = e.target.value.split(",").join("");
                  formik.setFieldValue("previousYearNetProfit", formatedVal);
                }}
                required
                className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
              />
            </div>
            {prevYearNetProfitValidation(formik.values.previousYearNetProfit)}
          </div>
          <div>
            <span className="font-semibold text-gray-500">
              Last ( 2 Years old) Net Income
            </span>
            <div className="border-b border-slate-400 py-1">
              <input
                placeholder=""
                // type="number"
                // {...formik.getFieldProps("previous2yearNetIncome")}
                type="text"
                name="previous2yearNetIncome"
                value={previous2yearNetIncome}
                onChange={(e) => {
                  addCommas("previous2yearnetprofit", e.target.value);
                  const formatedVal = e.target.value.split(",").join("");
                  formik.setFieldValue("previous2yearNetIncome", formatedVal);
                }}
                required
                className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
              />
            </div>
          </div>
          <div>
            <span className="font-semibold text-gray-500">
              Current Business State *
            </span>
            <div className="flex gap-2 bg-gray-200/40 border-[1px] border-gray-400 rounded-md">
              <select
                className="bg-transparent w-full py-2.5"
                value={selectedBusinessState}
                {...formik.getFieldProps("businessState")}
                onChange={(e) => {
                  formik.handleChange(e);
                  setSelectedBusinessState(e.target.value);
                }}
                required
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
          </div>
          <div>
            <span className="font-semibold text-gray-500">
              Current Business City *
            </span>
            <div className="flex gap-2 bg-gray-200/40 border-[1px] border-gray-400 rounded-md">
              <select
                className="bg-transparent w-full disabled:cursor-not-allowed py-2.5"
                disabled={!selectedBusinessState}
                {...formik.getFieldProps("businessCity")}
                required
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
          </div>
          <div>
            <span className=" font-semibold text-gray-500">
              Current Business Pincode *
            </span>
            <div className="border-b border-slate-400 py-1">
              <input
                placeholder="Enter Pincode"
                type="text"
                {...formik.getFieldProps("businessPincode")}
                required
                maxLength={6}
                className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
              />
            </div>
            {businessCityPincodeValidation(formik.values.businessPincode)}
          </div>
          <div>
            <span className="font-semibold text-gray-500">
              Status of Business Place *
            </span>
            <div className="border-b border-slate-400 py-1">
              <select
                className="w-full"
                {...formik.getFieldProps("businessPlaceType")}
                required
              >
                <option value={""}>Select</option>
                {businessPlaceOwnershipTypeInputs.map((ele, i) => {
                  return <option key={i}>{ele}</option>;
                })}
              </select>
            </div>
          </div>
          {formik.values.businessPlaceType === "Other" && (
            <div>
              <div>
                <span className=" font-semibold text-gray-500">
                  Mention status business place *
                </span>
                <div className="border-b border-slate-400 py-1">
                  <input
                    placeholder=""
                    type="text"
                    {...formik.getFieldProps("otherBusinessPlaceType")}
                    className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
                    required
                  />
                </div>
              </div>
            </div>
          )}
        </>
      ) : formik.values.employmentType === "Self-employed professional" ? (
        <>
          <div>
            <span>Profession *</span>
            <div className="flex gap-2 bg-gray-200/40 border-[1px] border-gray-400 rounded-md">
              <select
                className="bg-transparent w-full py-2.5"
                name="profession"
                {...formik.getFieldProps("profession")}
                required
              >
                <option value="">Select</option>
                <option value="Doctor">Doctor</option>
                <option value="CA">CA</option>
                <option value="Lawyer">Lawyer</option>
                <option value="Other">other</option>
              </select>
            </div>
          </div>
          {formik.values.profession === "Other" && (
            <div>
              <div>
                <span className=" font-semibold text-gray-500">
                  Mention your profession *
                </span>
                <div className="border-b border-slate-400 py-1">
                  <input
                    placeholder=""
                    type="text"
                    className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
                    {...formik.getFieldProps("otherProfession")}
                    required
                  />
                </div>
              </div>
            </div>
          )}
          <div>
            <span className="font-semibold text-gray-500">
              Current Year Turn Over *
            </span>
            <div className="border-b border-slate-400 py-1">
              <input
                placeholder="Current Turn Over"
                type="number"
                {...formik.getFieldProps("currentYearTurnOver")}
                required
                className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
              />
            </div>
          </div>
          <div>
            <span className="font-semibold text-gray-500">
              Last ( 2 Years old) Turnover *
            </span>
            <div className="border-b border-slate-400 py-1">
              <input
                placeholder="Previous TurnOver"
                type="text"
                {...formik.getFieldProps("previousYearTurnOver")}
                required
                className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
              />
            </div>
          </div>
          <div>
            <span className="font-semibold text-gray-500">
              Current Year Net Income *
            </span>
            <div className="border-b border-slate-400 py-1">
              <input
                placeholder="Current Year Net Profit"
                type="text"
                {...formik.getFieldProps("currentYearNetProfit")}
                required
                className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
              />
            </div>
          </div>
          <div>
            <span className="font-semibold text-gray-500">
              Previous Year Net Income *
            </span>
            <div className="border-b border-slate-400 py-1">
              <input
                placeholder="Previous Year Net Profit"
                type="text"
                {...formik.getFieldProps("previousYearNetProfit")}
                required
                className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
              />
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default IncomeDetails;
