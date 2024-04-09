import { useEffect, useState } from "react";
import {
  existingWokringCapitalLoanTypes,
  primaryBankAccount,
  primaryBankAccountOptions,
} from "../../configs/selectorConfigs";
import { toast } from "react-hot-toast";

const LoanExposure = ({
  formik,
  loanTypesArr,
  setLoanTypesArr,
  banksLoanArr,
  setBanksLoanArr,
  emiCalculation,
  category,
}) => {
  //add loan type
  const handleAddLoanType = (product) => {
    const isExist = loanTypesArr.find((ele) => ele === product);
    if (isExist) {
      const arr = loanTypesArr.filter((ele) => ele !== product);
      setLoanTypesArr(arr);
    } else {
      setLoanTypesArr([...loanTypesArr, product]);
    }
    if (product === "none") {
      setLoanTypesArr([product]);
    }
  };

  // add bank name
  const [bankName, setBankName] = useState("");
  const [otherBanks, setOtherBanks] = useState([]);
  const handleAddBankName = (product) => {
    console.log(product);
    const isExist = banksLoanArr.find((ele) => ele === product);
    if (isExist) {
      const arr = banksLoanArr.filter((ele) => ele !== product);
      setBanksLoanArr(arr);
    } else {
      setBanksLoanArr([...banksLoanArr, product]);
    }
    if (product === "none") {
      setBanksLoanArr([product]);
    }
  };

  // useEffect(() => {
  //   if (category !== "balance-transfer") {
  //     if (bankName) {
  //       setBanksLoanArr([...banksLoanArr, ...otherBanks]);
  //     }
  //   }
  // }, [bankName, handleAddBankName]);

  //ADD COMMA IN AMOUNT INPUTS
  const [existingEMI, setExistingEMI] = useState("");
  const [existingLoanAmount, setExistingLoanAmount] = useState("");

  const addCommas = (field, number) => {
    const cleanedInput = number.replace(/[^\d]/g, ""); // Remove non-numeric characters
    const formatter = new Intl.NumberFormat("en-IN");
    if (field === "emi") {
      setExistingEMI(formatter.format(cleanedInput));
    } else if (field === "existingloanamount") {
      setExistingLoanAmount(formatter.format(cleanedInput));
    }
  };

  return (
    <>
      <div>
        <span className="font-semibold text-gray-500">
          Existing Total EMI *
        </span>
        <div className="border-b border-slate-400 py-1">
          <input
            // placeholder="Enter your existing EMI amount, If any"
            // type="number"
            // {...formik.getFieldProps("existingEMI")}
            type="text"
            name="existingEMI"
            value={existingEMI}
            onChange={(e) => {
              addCommas("emi", e.target.value);
              const formatedVal = e.target.value.split(",").join("");
              formik.setFieldValue("existingEMI", formatedVal);
            }}
            className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
          />
        </div>
        {formik.touched.existingEMI && formik.errors.existingEMI ? (
          <span className="text-red-500 text-xs font-bold">
            {formik.errors.existingEMI}
          </span>
        ) : (
          emiCalculation(formik.values.existingEMI)
        )}
      </div>
      {/* <div>
        <span className="font-semibold text-gray-500">
          Existing  Loan Amount (Total) *
        </span>
        <div className="border-b border-slate-400 py-1">
          <input
            placeholder=""
            type="number"
            {...formik.getFieldProps("existingLoanAmount")}
            className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
          />
        </div>
        {formik.touched.existingLoanAmount &&
          formik.errors.existingLoanAmount && (
            <span className="text-red-500 text-xs font-bold">
              {formik.errors.existingLoanAmount}
            </span>
          )}
      </div> */}
      {/* existing loan bank names */}
      {category === "balance-transfer" ? (
        <div>
          <span className="font-semibold text-gray-500">
            Existing Loan Amount (Total) *
          </span>
          <div className="border-b border-slate-400 py-1">
            <input
              placeholder=""
              // type="number"
              // {...formik.getFieldProps("existingLoanAmount")}
              type="text"
              name="existingLoanAmount"
              value={existingLoanAmount}
              onChange={(e) => {
                addCommas("existingloanamount", e.target.value);
                const formatedVal = e.target.value.split(",").join("");
                formik.setFieldValue("existingLoanAmount", formatedVal);
              }}
              className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
              required
            />
          </div>
        </div>
      ) : (
        <>
          <div>
            <span className="font-semibold text-gray-500">
              Existing Total Loan Amount *
            </span>
            <div className="border-b border-slate-400 py-1">
              <input
                placeholder=""
                // type="number"
                // {...formik.getFieldProps("existingLoanAmount")}
                type="text"
                name="existingLoanAmount"
                value={existingLoanAmount}
                onChange={(e) => {
                  addCommas("existingloanamount", e.target.value);
                  const formatedVal = e.target.value.split(",").join("");
                  formik.setFieldValue("existingLoanAmount", formatedVal);
                }}
                className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
                required
              />
            </div>
          </div>
          <div className="col-span-1 sm:col-span-2 py ">
            <span className="font-semibold text-gray-500">
              Existing Loan Bank`s Name
            </span>
            <section className="">
              {primaryBankAccountOptions.map((ele) => {
                return (
                  <div key={ele} className="flex gap-2 text-black text-lg">
                    <span>
                      <input
                        type="checkbox"
                        checked={!!banksLoanArr.find((item) => item === ele)}
                        onChange={() => handleAddBankName(ele)}
                      />
                    </span>
                    <span>{ele}</span>
                  </div>
                );
              })}
            </section>
          </div>
          {banksLoanArr.includes("Other") ? (
            <>
              <div>
                <span className=" font-semibold text-gray-500">
                  Other Existing loan bank Name
                </span>
                <div className="border-b border-slate-400 py-1 flex">
                  <input
                    placeholder=""
                    type="text"
                    name="bankName"
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                    className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
                  />
                  <button
                    className="rounded-lg bg-blue-300 px-3 py-2 font-bold"
                    onClick={() => {
                      if (bankName) {
                        otherBanks.push(bankName);
                        setBankName("");
                      } else {
                        toast.error("bank name cannot be empty");
                      }
                    }}
                  >
                    Add
                  </button>
                </div>
              </div>
              {otherBanks.length > 0 ? (
                <div className="flex flex-col gap-3  py-3 ">
                  {otherBanks.map((ele, i) => {
                    return (
                      <p
                        key={i}
                        className=" border-gray-400 text-black rounded-md px-4 py-0.5 capitalize flex gap-2"
                      >
                        <span>{i + 1}.</span>
                        <span>{ele}</span>
                      </p>
                    );
                  })}
                </div>
              ) : null}
            </>
          ) : null}
          {/* existing loan types */}
          <div className="col-span-1 sm:col-span-2 ">
            <span className="font-semibold text-gray-500 ">
              Existing Loan Types
            </span>
            <section className="">
              {existingWokringCapitalLoanTypes.map((ele) => {
                return (
                  <div key={ele} className="flex gap-2 text-black text-lg">
                    <span>
                      <input
                        type="checkbox"
                        checked={!!loanTypesArr.find((item) => item === ele)}
                        onChange={() => handleAddLoanType(ele)}
                      />
                    </span>
                    <span>{ele}</span>
                  </div>
                );
              })}
            </section>
          </div>
          {loanTypesArr.includes("Other") ? (
            <div>
              <div>
                <span className=" font-semibold text-gray-500">
                  Other existing loan type
                </span>
                <div className="border-b border-slate-400 py-1">
                  <input
                    placeholder=""
                    type="text"
                    {...formik.getFieldProps("otherExistingLoanExposure")}
                    className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
                  />
                </div>
              </div>
            </div>
          ) : null}
        </>
      )}
    </>
  );
};

export default LoanExposure;
