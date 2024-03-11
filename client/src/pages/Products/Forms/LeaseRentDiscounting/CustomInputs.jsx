const CustomInputs = ({ formik }) => {
  return (
    <>
      <div>
        <span className="font-semibold text-gray-500">
          Lease Property Value
        </span>
        <div className="border-b border-slate-400 py-1">
          <input
            placeholder=""
            type="number"
            {...formik.getFieldProps("leasePropertyValue")}
            className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
          />
        </div>
        {formik.touched.leasePropertyValue &&
          formik.errors.leasePropertyValue && (
            <span className="text-red-500 text-xs font-bold">
              {formik.errors.leasePropertyValue}
            </span>
          )}
      </div>
      <div>
        <span className="font-semibold text-gray-500">
          Lease Property Duration
        </span>
        <div className="border-b border-slate-400 py-1">
          <input
            placeholder="In years"
            type="number"
            {...formik.getFieldProps("leasePropertyDuration")}
            className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
          />
        </div>
        {formik.touched.leasePropertyDuration &&
          formik.errors.leasePropertyDuration && (
            <span className="text-red-500 text-xs font-bold">
              {formik.errors.leasePropertyDuration}
            </span>
          )}
      </div>
      <div>
        <span className="font-semibold text-gray-500">
          Monthly Income Through Lease
        </span>
        <div className="border-b border-slate-400 py-1">
          <input
            placeholder=""
            type="number"
            {...formik.getFieldProps("monthlyIncomeThroughLease")}
            className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
          />
        </div>
        {formik.touched.monthlyIncomeThroughLease &&
          formik.errors.monthlyIncomeThroughLease && (
            <span className="text-red-500 text-xs font-bold">
              {formik.errors.monthlyIncomeThroughLease}
            </span>
          )}
      </div>
      <div>
        <span className="font-semibold text-gray-500 ">
          Total Annual Income
        </span>
        <div className="border-b border-slate-400 py-1 bg-blue-50 px-1">
          <input
            placeholder=""
            type="number"
            {...formik.getFieldProps("totalIncome")}
            value={
              formik.values.employmentType === "Salaried"
                ? Number(formik.values.monthlyIncome) * 12 +
                  Number(formik.values.monthlyIncomeThroughLease) * 12
                : Number(formik.values.previousYearNetProfit) +
                  Number(formik.values.monthlyIncomeThroughLease) * 12
            }
            className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
            readOnly
          />
        </div>
      </div>
      <div>
        <span className="font-semibold text-gray-500">
          Total amount to be recevied from lease
        </span>
        <div className="border-b border-slate-400 py-1">
          <input
            placeholder=""
            type="number"
            {...formik.getFieldProps("totalAmountToBeReceivedFromLease")}
            className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
          />
        </div>
        {formik.touched.totalAmountToBeReceivedFromLease &&
          formik.errors.totalAmountToBeReceivedFromLease && (
            <span className="text-red-500 text-xs font-bold">
              {formik.errors.totalAmountToBeReceivedFromLease}
            </span>
          )}
      </div>
    </>
  );
};

export default CustomInputs;
