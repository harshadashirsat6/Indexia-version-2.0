const CustomInputs = ({ formik }) => {
  return (
    <>
      <div>
        <span className="font-semibold text-gray-500">
          Company Share Name *
        </span>
        <div className="border-b border-slate-400 py-1">
          <input
            placeholder=""
            type="text"
            name="companyShareName"
            {...formik.getFieldProps("companyShareName")}
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
            type="number"
            {...formik.getFieldProps("valueOfOneShare")}
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
        <span className="font-semibold text-gray-500">Quantity *</span>
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
        <span className="font-semibold text-gray-500">Total share price *</span>
        <div className="border-b border-slate-400 py-1">
          <input
            placeholder=""
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
            type="number"
            {...formik.getFieldProps("marektValue")}
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
