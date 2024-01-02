import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFormData, setShowCibilScore } from "../../../../store/appSlice";
import { MdRadioButtonUnchecked, MdRadioButtonChecked } from "react-icons/md";
import {
  employmentType,
  incomeRecievedAs,
  employerType,
} from "../../../../configs/selectorConfigs";

const Step = ({ totalSteps, step, setStep }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { formData } = useSelector((store) => store.app);

  // handle process
  const handleProceed = () => {
    if (
      formData?.employmentType === "Salaried" &&
      formData?.monthlyIncome > 0 &&
      formData.monthlyIncome < 12000
    ) {
      return;
    }
    if (formData?.existingEmi > 0 && formData?.existingEmi > 30000) {
      return;
    }
    // navigate("/check-loan-details-eligibility");
    dispatch(setShowCibilScore(true));
  };

  return (
    <>
      <div className="-mb-2.5 -ml-2.5 flex items-center space-x-2.5">
        <span>{`${step}/${totalSteps}`}</span>
      </div>
      <div>
        <span>Employment type</span>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 pt-2">
          {employmentType.map((i, j) => (
            <li
              key={i[0]}
              onClick={() =>
                dispatch(setFormData({ ...formData, employmentType: i[0] }))
              }
              style={{
                borderColor: formData.employmentType === i[0] && "#06b6d4",
              }}
              className={`w-full border border-slate-300 rounded-lg flex items-center justify-between p-2.5 hover:border-cyan-500 cursor-pointer ${
                formData.employmentType === i[0] && "bg-cyan-50"
              }`}
            >
              <span>{i[0]}</span>
              {formData.employmentType === i[0] ? (
                <MdRadioButtonChecked className="text-cyan-400" />
              ) : (
                <MdRadioButtonUnchecked className="text-cyan-400" />
              )}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <span>
          <span>
            {formData.employmentType === "Salaried" ? "Monthly" : "Yearly"}
          </span>{" "}
          income
        </span>
        <div className="border-b border-slate-400 py-1">
          {formData.employmentType === "Salaried" ? (
            <>
              <input
                placeholder="Enter your monthly income"
                type="number"
                value={formData.monthlyIncome}
                onChange={(e) =>
                  dispatch(
                    setFormData({
                      ...formData,
                      monthlyIncome: e.target.value,
                    })
                  )
                }
                className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
              />
            </>
          ) : (
            <input
              placeholder="Enter your yearly income"
              type="number"
              value={formData.yearlyIncome}
              onChange={(e) =>
                dispatch(
                  setFormData({ ...formData, yearlyIncome: e.target.value })
                )
              }
              className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
            />
          )}
        </div>
      </div>
      {formData?.employmentType === "Salaried" &&
      formData?.monthlyIncome > 0 &&
      formData.monthlyIncome < 12000 ? (
        <span className="text-red-500 text-xs font-bold">min salary 12k</span>
      ) : null}

      <div>
        <span>Income recieved as</span>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 pt-2">
          {incomeRecievedAs.map((i, j) => (
            <li
              key={i}
              onClick={() =>
                dispatch(setFormData({ ...formData, incomeRecievedAs: i }))
              }
              style={{
                borderColor: formData.incomeRecievedAs === i && "#06b6d4",
              }}
              className={`w-full border border-slate-300 rounded-lg flex items-center justify-between p-2.5 hover:border-cyan-500 cursor-pointer ${
                formData.incomeRecievedAs === i && "bg-cyan-50"
              }`}
            >
              <span>{i}</span>
              {formData.incomeRecievedAs === i ? (
                <MdRadioButtonChecked className="text-cyan-400" />
              ) : (
                <MdRadioButtonUnchecked className="text-cyan-400" />
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-5">
        <div>
          <span>Existing EMI</span>
          <div className="border-b border-slate-400 py-1">
            <input
              placeholder="Enter your existing EMI if any"
              type="number"
              value={formData.existingEmi}
              onChange={(e) =>
                dispatch(
                  setFormData({ ...formData, existingEmi: e.target.value })
                )
              }
              className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
            />
          </div>
          {formData?.existingEmi > 0 && formData?.existingEmi > 30000 ? (
            <span className="text-red-500 text-xs font-bold">
              max existing emi 30k
            </span>
          ) : null}
        </div>
        <div>
          <span>Company name</span>
          <div className="border-b border-slate-400 py-1">
            <input
              placeholder="Enter your company name"
              type="text"
              value={formData.companyName}
              onChange={(e) =>
                dispatch(
                  setFormData({ ...formData, companyName: e.target.value })
                )
              }
              className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
            />
          </div>
        </div>
      </div>
      <div>
        <span>Company type</span>
        <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2">
          {employerType.map((i) => (
            <li
              key={i}
              onClick={() =>
                dispatch(setFormData({ ...formData, employerType: i }))
              }
              style={{
                borderColor: formData.employerType === i && "#06b6d4",
              }}
              className={`w-full border border-slate-300 rounded-lg flex items-center justify-between p-2.5 hover:border-cyan-500 cursor-pointer ${
                formData.employerType === i && "bg-cyan-50"
              }`}
            >
              <span>{i}</span>
              {formData.employerType === i ? (
                <MdRadioButtonChecked className="text-cyan-400" />
              ) : (
                <MdRadioButtonUnchecked className="text-cyan-400" />
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className="w-1/2 mx-auto pt-2.5">
        <button
          onClick={handleProceed}
          disabled={
            !formData.employmentType ||
            !formData.incomeRecievedAs ||
            !formData.existingEmi ||
            !formData.employerType
          }
          className="bg-cyan-400 py-2.5 w-full rounded-lg text-lg text-white font-normal duration-200 disabled:cursor-not-allowed"
        >
          Submit
        </button>
      </div>
    </>
  );
};

export default Step;
