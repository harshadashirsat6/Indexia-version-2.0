const CustomInputs = ({ formik }) => {
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
            <option value="HL">Home loan(HL) with ROI</option>
            <option value="LAP">Loan against property(LAP) with ROI</option>
            <option value="HL-LAP">HL-LAP with ROI</option>
          </select>
        </div>
        {formik.touched.typeOfBalanceTransfer &&
          formik.errors.typeOfBalanceTransfer && (
            <span className="text-red-500 text-xs font-bold">
              {formik.errors.typeOfBalanceTransfer}
            </span>
          )}
      </div>
      {formik.values.typeOfBalanceTransfer ? (
        <div>
          <span className="font-semibold text-gray-500">
            Existing Loan Tenure (in years) and ROI
          </span>
          <div>
            {formik.values.typeOfBalanceTransfer === "HL" ? (
              <div className=" py-1 flex gap-2">
                <label className="py-1.5 pr-2">HOME LOAN</label>
                <input
                  placeholder="Tenure"
                  type="number"
                  {...formik.getFieldProps("homeLoanTenure")}
                  required
                  className="w-[7rem] rounded-lg border border-slate-400 bg-transparent  outline-none  placeholder:text-slate-500 py-2 px-1"
                />
                <input
                  placeholder="ROI"
                  type="number"
                  {...formik.getFieldProps("homeLoanROI")}
                  required
                  className="rounded-lg border border-slate-400 bg-transparent w-[7rem] outline-none  placeholder:text-slate-500 py-2 px-1"
                />
              </div>
            ) : formik.values.typeOfBalanceTransfer === "LAP" ? (
              <div className=" py-1 flex gap-2">
                <label className="py-1.5 pr-[4.5rem]">LAP</label>
                <input
                  placeholder="Tenure"
                  type="number"
                  {...formik.getFieldProps("lapTenure")}
                  required
                  className="rounded-lg border border-slate-400 bg-transparent w-[7rem] outline-none  placeholder:text-slate-500 py-2 px-1"
                />
                <input
                  placeholder="ROI"
                  type="number"
                  {...formik.getFieldProps("lapROI")}
                  required
                  className="rounded-lg border border-slate-400 bg-transparent w-[7rem] outline-none  placeholder:text-slate-500 py-2 px-1"
                />
              </div>
            ) : formik.values.typeOfBalanceTransfer === "HL-LAP" ? (
              <div className="flex flex-column flex-wrap gap-2 w-full">
                {/* HL */}
                <div className=" py-1 flex gap-2">
                  <label className="py-1.5 pr-2">HOME LOAN</label>
                  <input
                    placeholder="Tenure"
                    type="number"
                    {...formik.getFieldProps("homeLoanTenure")}
                    required
                    className="w-[7rem] rounded-lg border border-slate-400 bg-transparent  outline-none  placeholder:text-slate-500 py-2 px-1"
                  />
                  <input
                    placeholder="ROI"
                    type="number"
                    {...formik.getFieldProps("homeLoanROI")}
                    required
                    className="rounded-lg border border-slate-400 bg-transparent w-[7rem] outline-none  placeholder:text-slate-500 py-2 px-1"
                  />
                </div>
                {/* LAP */}
                <div className=" py-1 flex gap-2">
                  <label className="py-1.5 pr-[4.5rem]">LAP</label>
                  <input
                    placeholder="Tenure"
                    type="number"
                    name="lapTenure"
                    {...formik.getFieldProps("lapTenure")}
                    required
                    className="rounded-lg border border-slate-400 bg-transparent w-[7rem] outline-none  placeholder:text-slate-500 py-2 px-1"
                  />
                  <input
                    placeholder="ROI"
                    type="number"
                    name="lapROI"
                    {...formik.getFieldProps("lapROI")}
                    required
                    className="rounded-lg border border-slate-400 bg-transparent w-[7rem] outline-none  placeholder:text-slate-500 py-2 px-1"
                  />
                </div>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
      <div>
        <span className="font-semibold text-gray-500">
          Top-up amount (if any)
        </span>
        <div className="border-b border-slate-400 py-1">
          <input
            placeholder="optional"
            type="number"
            {...formik.getFieldProps("topupAmount")}
            className="w-full bg-transparent border-none outline-none placeholder:text-slate-700"
          />
        </div>
      </div>
      <div>
        <span className="font-semibold text-gray-500">
          Approximate Value of property
        </span>
        <div className="border-b border-slate-400 py-1">
          <input
            placeholder=""
            type="number"
            {...formik.getFieldProps("transferPropertyValue")}
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
    </>
  );
};

export default CustomInputs;
