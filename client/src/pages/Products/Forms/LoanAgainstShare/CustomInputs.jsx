import { useState } from "react";

const CustomInputs = ({ formik }) => {
  //ADD COMMA IN AMOUNT INPUTS
  const [valueOfOneShare, setValueOfOneShare] = useState("");
  const [marektValue, setMarektValue] = useState("");

  const addCommas = (field, number) => {
    const cleanedInput = number.replace(/[^\d]/g, ""); // Remove non-numeric characters
    const formatter = new Intl.NumberFormat("en-IN");
    if (field === "valueofoneshare") {
      setValueOfOneShare(formatter.format(cleanedInput));
    } else if (field === "marketvalue") {
      setMarektValue(formatter.format(cleanedInput));
    }
  };

  return (
    <>
      <div>
        <span className="font-semibold text-gray-500">
          Share Company Name *
        </span>
        <div className="border-b border-slate-400 py-1">
          <input
            placeholder=""
            type="text"
            name="companyShareName"
            // {...formik.getFieldProps("companyShareName")}
            className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
          />
        </div>
        {formik.touched.companyShareName && formik.errors.companyShareName && (
          <span className="text-red-500 text-xs font-bold">
            {formik.errors.companyShareName}
          </span>
        )}
      </div>
      <div>
        <span className="font-semibold text-gray-500">
          Value of one share *
        </span>
        <div className="border-b border-slate-400 py-1">
          <input
            placeholder=""
            // type="number"
            // {...formik.getFieldProps("valueOfOneShare")}
            type="text"
            name="valueOfOneShare"
            value={valueOfOneShare}
            onChange={(e) => {
              addCommas("valueofoneshare", e.target.value);
              const formatedVal = e.target.value.split(",").join("");
              formik.setFieldValue("valueOfOneShare", formatedVal);
            }}
            className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
          />
        </div>
        {formik.touched.valueOfOneShare && formik.errors.valueOfOneShare && (
          <span className="text-red-500 text-xs font-bold">
            {formik.errors.valueOfOneShare}
          </span>
        )}
      </div>
      <div>
        <span className="font-semibold text-gray-500">Quantity of share *</span>
        <div className="border-b border-slate-400 py-1">
          <input
            placeholder=""
            type="number"
            name="shareQuantity"
            {...formik.getFieldProps("shareQuantity")}
            className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
          />
        </div>
        {formik.touched.shareQuantity && formik.errors.shareQuantity && (
          <span className="text-red-500 text-xs font-bold">
            {formik.errors.shareQuantity}
          </span>
        )}
      </div>
      <div>
        <span className="font-semibold text-gray-500">Total Share value *</span>
        <div className="border-b border-slate-400 py-1">
          <input
            placeholder="Total market value"
            type="number"
            value={
              Number(formik.values.valueOfOneShare) *
              Number(formik.values.shareQuantity)
            }
            {...formik.getFieldProps("totalSharePrice")}
            readOnly
            className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
          />
        </div>
        {formik.touched.totalSharePrice && formik.errors.totalSharePrice && (
          <span className="text-red-500 text-xs font-bold">
            {formik.errors.totalSharePrice}
          </span>
        )}
      </div>
      <div>
        <span className="font-semibold text-gray-500">Market Value</span>
        <div className="border-b border-slate-400 py-1">
          <input
            placeholder=""
            // type="number"
            // {...formik.getFieldProps("marektValue")}
            type="text"
            name="marektValue"
            value={marektValue}
            onChange={(e) => {
              addCommas("marektvalue", e.target.value);
              const formatedVal = e.target.value.split(",").join("");
              formik.setFieldValue("marektValue", formatedVal);
            }}
            className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
          />
        </div>
        {formik.touched.marektValue && formik.errors.marektValue && (
          <span className="text-red-500 text-xs font-bold">
            {formik.errors.marektValue}
          </span>
        )}
      </div>
    </>
  );
};

export default CustomInputs;
