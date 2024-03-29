const BalaceTransferTypes = ({ formik }) => {
  return (
    <div>
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
    </div>
  );
};

export default BalaceTransferTypes;
