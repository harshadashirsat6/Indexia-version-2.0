import {
  existingWokringCapitalLoanTypes,
  primaryBankAccountOptions,
} from "../../configs/selectorConfigs";

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
  const handleAddBankName = (product) => {
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

  return (
    <>
      <div>
        <span className="font-semibold text-gray-500">
          Existing Total EMI *
        </span>
        <div className="border-b border-slate-400 py-1">
          <input
            placeholder="Enter your existing EMI amount, If any"
            type="number"
            {...formik.getFieldProps("existingEMI")}
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
      {category === "balance-transfer" ? null : (
        <>
          <div>
            <span className="font-semibold text-gray-500">
              Existing Total Loan Amount *
            </span>
            <div className="border-b border-slate-400 py-1">
              <input
                placeholder=""
                type="number"
                {...formik.getFieldProps("existingLoanAmount")}
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
            <div>
              <div>
                <span className=" font-semibold text-gray-500">
                  Other Existing Bank Loan Name
                </span>
                <div className="border-b border-slate-400 py-1">
                  <input
                    placeholder=""
                    type="text"
                    {...formik.getFieldProps("otherExistingBankLoanName")}
                    className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
                  />
                </div>
              </div>
            </div>
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
                  Other existing loan bank name
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
