import { useState } from "react";

const CustomInputs = ({ formik }) => {
  //ADD COMMA IN AMOUNT INPUTS
  const [transferPropertyValue, setTransferPropertyValue] = useState("");
  const [balanceTransferLoanAmount, setBalancetransferloanamount] =
    useState("");
  const [topupAmount, setTopupAmount] = useState("");

  const addCommas = (field, number) => {
    const cleanedInput = number.replace(/[^\d]/g, ""); // Remove non-numeric characters
    const formatter = new Intl.NumberFormat("en-IN");
    console.log(field);
    if (field === "transferpropertyvalue") {
      setTransferPropertyValue(formatter.format(cleanedInput));
    } else if (field === "balancetransferloanamount") {
      setBalancetransferloanamount(formatter.format(cleanedInput));
    } else if (field === "topupamount") {
      setTopupAmount(formatter.format(cleanedInput));
    }
  };

  return (
    <>
      <div>
        <span className="font-semibold text-gray-500">
          Type of Balance Transfer
        </span>
        <div className="flex gap-2 bg-gray-200/40 border-[1px] border-gray-400 rounded-md">
          <select
            className="bg-transparent w-full py-2.5"
            name="typeOfBalanceTransfer"
            {...formik.getFieldProps("typeOfBalanceTransfer")}
          >
            <option value={""}>Select</option>
            <option value="personal-loan">Personal loan</option>
            <option value="business-loan">Business loan</option>
            <option value="home-loan">Home loan</option>
            <option value="loan-against-property">Loan Against Property</option>
            <option value="commercial-purchase">Commercial purchase</option>
            <option value="working-capital">Working capital</option>
            <option value="lease-rent-discount">Lease rent discount</option>
            <option value="odcc">Od cc</option>
            <option value="Other">Other</option>
          </select>
        </div>
        {formik.touched.typeOfBalanceTransfer &&
          formik.errors.typeOfBalanceTransfer && (
            <span className="text-red-500 text-xs font-bold">
              {formik.errors.typeOfBalanceTransfer}
            </span>
          )}
      </div>
      {formik.values.typeOfBalanceTransfer==='Other' ? (
        <div>
          <span className="font-semibold text-gray-500">
            Other Type of Balance Transfer *
          </span>
          <div className="border-b border-slate-400 py-1">
            <input
              placeholder=""
              type="text"
              {...formik.getFieldProps("otherTypeBalanceTransfer")}
              className="w-full bg-transparent border-none outline-none placeholder:text-slate-700"
            />
          </div>
          {formik.touched.balanceTransferLoanTenure &&
            formik.errors.balanceTransferLoanTenure && (
              <span className="text-red-500 text-xs font-bold">
                {formik.errors.balanceTransferLoanTenure}
              </span>
            )}
        </div>
      ) : null}
      <div>
        <span className="font-semibold text-gray-500">
          Current value of Property,approx-if secured{" "}
        </span>
        <div className="border-b border-slate-400 py-1">
          <input
            placeholder=""
            // type="number"
            // {...formik.getFieldProps("transferPropertyValue")}
            type="text"
            name="transferPropertyValue"
            value={transferPropertyValue}
            onChange={(e) => {
              addCommas("transferpropertyvalue", e.target.value);
              const formatedVal = e.target.value.split(",").join("");
              formik.setFieldValue("transferPropertyValue", formatedVal);
            }}
            className="w-full bg-transparent border-none outline-none placeholder:text-slate-700"
          />
        </div>
        {formik.touched.transferPropertyValue &&
          formik.errors.transferPropertyValue && (
            <span className="text-red-500 text-xs font-bold">
              {formik.errors.transferPropertyValue}
            </span>
          )}
      </div>
      <div>
        <span className="font-semibold text-gray-500">
          Balance Transfer Loan Amount *
        </span>
        <div className="border-b border-slate-400 py-1">
          <input
            placeholder=""
            // type="number"
            // {...formik.getFieldProps("balanceTransferLoanAmount")}
            type="text"
            name="balanceTransferLoanAmount"
            value={balanceTransferLoanAmount}
            onChange={(e) => {
              addCommas("balancetransferloanamount", e.target.value);
              const formatedVal = e.target.value.split(",").join("");
              formik.setFieldValue("balanceTransferLoanAmount", formatedVal);
            }}
            className="w-full bg-transparent border-none outline-none placeholder:text-slate-700"
          />
        </div>
        {formik.touched.balanceTransferLoanAmount &&
          formik.errors.balanceTransferLoanAmount && (
            <span className="text-red-500 text-xs font-bold">
              {formik.errors.balanceTransferLoanAmount}
            </span>
          )}
      </div>
      <div>
        <span className="font-semibold text-gray-500">
          Balance Transfer Loan Tenure *
        </span>
        <div className="border-b border-slate-400 py-1">
          <input
            placeholder=""
            type="number"
            {...formik.getFieldProps("balanceTransferLoanTenure")}
            className="w-full bg-transparent border-none outline-none placeholder:text-slate-700"
          />
        </div>
        {formik.touched.balanceTransferLoanTenure &&
          formik.errors.balanceTransferLoanTenure && (
            <span className="text-red-500 text-xs font-bold">
              {formik.errors.balanceTransferLoanTenure}
            </span>
          )}
      </div>
      <div>
        <span className="font-semibold text-gray-500">
          Top-up amount (if any)
        </span>
        <div className="border-b border-slate-400 py-1">
          <input
            placeholder="optional"
            // type="number"
            // {...formik.getFieldProps("topupAmount")}
            type="text"
            name="topupAmount"
            value={topupAmount}
            onChange={(e) => {
              addCommas("topupamount", e.target.value);
              const formatedVal = e.target.value.split(",").join("");
              formik.setFieldValue("topupAmount", formatedVal);
            }}
            className="w-full bg-transparent border-none outline-none placeholder:text-slate-700"
          />
        </div>
      </div>
    </>
  );
};

export default CustomInputs;
