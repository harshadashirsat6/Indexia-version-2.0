import { useNavigate } from "react-router-dom";
import { GiCheckMark } from "react-icons/gi";
import { useSelector, useDispatch } from "react-redux";
import { setFormData, setIsOpenModal } from "../../../../store/appSlice";
import { TbSquareRoundedChevronLeftFilled } from "react-icons/tb";
import {
  homeLoanTenure,
  residencyType,
} from "../../../../configs/selectorConfigs";
import { MdRadioButtonChecked, MdRadioButtonUnchecked } from "react-icons/md";
import { toast } from "react-hot-toast";

const Step1 = ({ totalSteps, step, setStep }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { formData, isOpenModal } = useSelector((store) => store.app);

  const handleProceed = (e) => {
    e.preventDefault();
    if (formData?.pincode?.length !== 6) {
      return;
    }
    if (formData?.loanAmount !== 100000 && formData?.loanAmount < 100000) {
      return;
    }
    if (formData.phone.length !== 10) {
      return;
    }
    if (!formData.email.includes("@gmail.com")) {
      return;
    }

    isOpenModal.tracker
      ? setStep(step + 1)
      : dispatch(setIsOpenModal({ ...isOpenModal, label: "verify-otp" }));
  };

  return (
    <>
      <div className="-mb-2.5 -ml-2.5 flex items-center space-x-2.5">
        <span>{`${step}/${totalSteps}`}</span>
      </div>
      <h1 className="text-xl flex flex-col space-y-2">
        <span>
          Unlock best <span>personal loan</span> offers suitable for your needs
          from <span>43+ lenders</span>
        </span>
        <span className="w-20 h-0.5 rounded-full bg-cyan-400"></span>
      </h1>
      <form
        className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-5"
        onSubmit={handleProceed}
      >
        <div>
          <span>Full name</span>
          <div className="border-b border-slate-400 py-1">
            <input
              placeholder="As per on your pan card"
              type="text"
              value={formData.name}
              onChange={(e) =>
                dispatch(setFormData({ ...formData, name: e.target.value }))
              }
              className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
            />
          </div>
        </div>
        <div>
          <span>Date of birth</span>
          <div className="border-b border-slate-400 py-1">
            <input
              placeholder="DD-MM-YYYY"
              type="date"
              value={formData.dateOfBirth}
              onChange={(e) =>
                dispatch(
                  setFormData({ ...formData, dateOfBirth: e.target.value })
                )
              }
              className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
            />
          </div>
        </div>
        <div>
          <span>Pincode</span>
          <div className="border-b border-slate-400 py-1">
            <input
              placeholder="Enter your residential pincode"
              type="number"
              value={formData.pincode}
              onChange={(e) =>
                dispatch(setFormData({ ...formData, pincode: e.target.value }))
              }
              className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
            />
          </div>
          {formData?.pincode?.length > 0 && formData?.pincode?.length !== 6 ? (
            <span className="text-red-500 text-xs font-bold">
              Invalid pincode
            </span>
          ) : null}
        </div>
        <div>
          <span>Residency Type</span>
          <div className="border-b border-slate-400 py-1">
            <select
              onChange={(e) =>
                dispatch(
                  setFormData({ ...formData, residencyType: e.target.value })
                )
              }
            >
              {residencyType.map((ele, i) => {
                return <option key={i}>{ele}</option>;
              })}
            </select>
          </div>
        </div>
        <div>
          <span>PAN card number</span>
          <div className="border-b border-slate-400 py-1">
            <input
              placeholder="Enter permanent account number"
              type="text"
              value={formData.panCardNum}
              onChange={(e) =>
                dispatch(
                  setFormData({ ...formData, panCardNum: e.target.value })
                )
              }
              className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
            />
          </div>
        </div>
        <div className="col-span-1 sm:col-span-2">
          <span>Loan amount</span>
          <div className="border-b border-slate-400 py-1">
            <input
              placeholder="Enter loan amount"
              type="number"
              value={formData.loanAmount}
              onChange={(e) =>
                dispatch(
                  setFormData({ ...formData, loanAmount: e.target.value })
                )
              }
              className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
            />
          </div>
          {formData?.loanAmount?.length > 0 && formData?.loanAmount < 100000 ? (
            <span className="text-red-500 text-xs font-bold">
              min loan amount 1 Lakh
            </span>
          ) : null}
        </div>
        <div className="col-span-1 sm:col-span-2">
          <span>Loan tenure</span>
          <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mt-2">
            {homeLoanTenure.map((i) => (
              <li
                key={i}
                onClick={() =>
                  dispatch(setFormData({ ...formData, homeLoanTenure: i }))
                }
                style={{
                  borderColor: formData.homeLoanTenure === i && "#06b6d4",
                }}
                className={`w-full border border-slate-300 rounded-lg flex items-center justify-between p-2.5 hover:border-cyan-500 cursor-pointer ${
                  formData.homeLoanTenure === i && "bg-cyan-50"
                }`}
              >
                <span>{i}</span>
                {formData.homeLoanTenure === i ? (
                  <MdRadioButtonChecked className="text-cyan-400" />
                ) : (
                  <MdRadioButtonUnchecked className="text-cyan-400" />
                )}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <span>Email address</span>
          <div className="border-b border-slate-400 py-1">
            <input
              placeholder="Enter your email address"
              type="text"
              value={formData.email}
              onChange={(e) =>
                dispatch(setFormData({ ...formData, email: e.target.value }))
              }
              className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
            />
          </div>
          {formData.email.length >= 1 &&
          !formData?.email?.includes("@gmail.com") ? (
            <span className="text-red-500 text-xs font-bold">
              should contain @gmail.com
            </span>
          ) : null}
        </div>
        <div>
          <span>Mobile number</span>
          <div className="flex items-center space-x-2.5 border-b border-slate-400 py-1">
            <img src="/india.png" alt="india" className="w-7 h-4" />
            <span className="whitespace-nowrap">+91 -</span>
            <input
              type="number"
              value={formData.phone}
              onChange={(e) =>
                dispatch(setFormData({ ...formData, phone: e.target.value }))
              }
              className="bg-transparent w-full outline-none border-none"
            />
          </div>
          {formData?.phone?.length > 0 && formData?.phone?.length !== 10 ? (
            <span className="text-red-500 text-xs font-bold">
              phone number should be 10 digits
            </span>
          ) : null}
        </div>
        <div className="w-1/2 mx-auto pt-2.5">
          <button
            type="submit"
            disabled={
              !formData.name ||
              !formData.dateOfBirth ||
              !formData.pincode ||
              !formData.panCardNum ||
              !formData.loanAmount ||
              !formData.homeLoanTenure ||
              !formData.email ||
              !formData.phone ||
              !formData.residencyType
            }
            className="bg-cyan-400 py-2.5 w-full rounded-lg text-lg text-white font-normal duration-200 disabled:cursor-not-allowed"
          >
            {isOpenModal.tracker ? "Proceed" : "Verify"}
          </button>
        </div>
      </form>
    </>
  );
};

export default Step1;
