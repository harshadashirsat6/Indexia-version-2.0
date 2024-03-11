import { existingWokringCapitalLoanTypes } from "../../configs/selectorConfigs";

const LoanExposure = ({
  formik,
  loanTypesArr,
  setLoanTypesArr,
  emiCalculation,
  category,
}) => {
  const handleCheckboxChange = (product) => {
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
  // useEffect(() => {
  // console.log(loanTypesArr);
  // }, [handleCheckboxChange]);

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
      {category && category === "balance-transfer" ? null : (
        <div>
          <span className="font-semibold text-gray-500">
            Existing Loan Tenure (in years) *
          </span>
          <div className="border-b border-slate-400 py-1">
            <input
              placeholder=""
              type="number"
              {...formik.getFieldProps("existingLoanTenure")}
              className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
            />
          </div>
          {formik.touched.existingLoanTenure &&
            formik.errors.existingLoanTenure && (
              <span className="text-red-500 text-xs font-bold">
                {formik.errors.existingLoanTenure}
              </span>
            )}
        </div>
      )}

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
          />
        </div>
        {formik.touched.existingLoanAmount &&
          formik.errors.existingLoanAmount && (
            <span className="text-red-500 text-xs font-bold">
              {formik.errors.existingLoanAmount}
            </span>
          )}
      </div>
      <div className="col-span-1 sm:col-span-2 ">
        <span className="font-semibold text-gray-500">Loan Types</span>
        <section className="">
          {existingWokringCapitalLoanTypes.map((ele) => {
            return (
              <div key={ele} className="flex gap-2 text-black text-lg">
                <span>
                  <input
                    type="checkbox"
                    checked={!!loanTypesArr.find((item) => item === ele)}
                    onChange={() => handleCheckboxChange(ele)}
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
              Other Existing Loan Type
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
  );
};

export default LoanExposure;
