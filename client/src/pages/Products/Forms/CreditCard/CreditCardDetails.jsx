import { useState } from "react";
import { BanksForCreditCards } from "../../../../configs/selectorConfigs";

const CreditCardDetails = ({ formik }) => {
  //ADD COMMA IN AMOUNT INPUTS
  const [exisitingCreditCardLimit, setExisitingCreditCardLimit] = useState("");

  const addCommas = (field, number) => {
    const cleanedInput = number.replace(/[^\d]/g, ""); // Remove non-numeric characters
    const formatter = new Intl.NumberFormat("en-IN");
    if (field === "exisitingcreditcardlimit") {
      setExisitingCreditCardLimit(formatter.format(cleanedInput));
    }
  };

  return (
    <>
      <div>
        <span className="font-semibold text-gray-500">
          Do you have any active credit card at present?
        </span>
        <div className="border-b border-slate-400 py-1">
          <select
            name="existingCreditCardStatus"
            className="w-full"
            {...formik.getFieldProps("anyActiveCreditCardStatus")}
          >
            <option value={""}>select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
        {formik.touched.anyActiveCreditCardStatus &&
          formik.errors.anyActiveCreditCardStatus && (
            <span className="text-red-500 text-xs font-bold">
              {formik.errors.anyActiveCreditCardStatus}
            </span>
          )}
      </div>
      {formik.values.anyActiveCreditCardStatus === "Yes" ? (
        <>
          <div>
            <span className="font-semibold text-gray-500">
              Existing Credit Card Bank Name
            </span>
            <div className="border-b border-slate-400 py-1">
              <select
                className="w-full"
                name="existingCreditCardBankName"
                {...formik.getFieldProps("existingCreditCardBankName")}
                required
              >
                <option value={""}>Select</option>
                {BanksForCreditCards.map((ele) => {
                  return (
                    <option key={ele} value={ele}>
                      {ele}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          {formik.values.existingCreditCardBankName === "Other" ? (
            <div>
              <span className=" font-semibold text-gray-500">
                Mention Existing Credit Card Bank Name
              </span>
              <div className="border-b border-slate-400 py-1">
                <input
                  placeholder=""
                  type="text"
                  {...formik.getFieldProps("otherExistingCreditCardBankName")}
                  required
                  className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
                />
              </div>
            </div>
          ) : null}
          <div>
            <span className=" font-semibold text-gray-500">
              Existing Credit Card Limit
            </span>
            <div className="border-b border-slate-400 py-1">
              <input
                placeholder=""
                type="text"
                // {...formik.getFieldProps("exisitingCreditCardLimit")}
                name="exisitingCreditCardLimit"
                value={exisitingCreditCardLimit}
                onChange={(e) => {
                  addCommas("exisitingcreditcardlimit", e.target.value);
                  const formatedVal = e.target.value.split(",").join("");
                  formik.setFieldValue("exisitingCreditCardLimit", formatedVal);
                }}
                required
                className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
              />
            </div>
          </div>
        </>
      ) : formik.values.anyActiveCreditCardStatus === "No" ? null : null}
      <div>
        <span className="font-semibold text-gray-500">Mention bank name</span>
        <div className="border-b border-slate-400 py-1">
          <select
            className="w-full"
            placeholder="Wish to apply for (Bank Name)"
            name="newCreditCardBankName"
            {...formik.getFieldProps("newCreditCardBankName")}
          >
            <option value={""}>Select</option>
            {BanksForCreditCards.map((ele) => {
              return (
                <option key={ele} value={ele}>
                  {ele}
                </option>
              );
            })}
          </select>
        </div>
        {formik.touched.newCreditCardBankName &&
          formik.errors.newCreditCardBankName && (
            <span className="text-red-500 text-xs font-bold">
              {formik.errors.newCreditCardBankName}
            </span>
          )}
      </div>
      {formik.values.newCreditCardBankName === "Other" ? (
        <div>
          <span className=" font-semibold text-gray-500">
            Other- Wish to apply for (Bank Name)
          </span>
          <div className="border-b border-slate-400 py-1">
            <input
              placeholder=""
              type="text"
              {...formik.getFieldProps("otherNewCreditCardBankName")}
              required
              className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
            />
          </div>
        </div>
      ) : null}
    </>
  );
};

export default CreditCardDetails;
