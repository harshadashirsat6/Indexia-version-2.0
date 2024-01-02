import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFormData, setShowCibilScore } from "../../../../store/appSlice";
import { TbSquareRoundedChevronLeftFilled } from "react-icons/tb";
import {
} from "../../../../configs/selectorConfigs";

const Step3 = ({ totalSteps, step, setStep }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { formData } = useSelector((store) => store.app);


  // current year
  let todayDate = new Date()
  const currentYear = todayDate.getFullYear()
  console.log(currentYear)
  
  //handle proceed
  const handleProceed = async () => {
    if (
      (formData?.manufacturingYear > 0 &&
        formData.manufacturingYear > currentYear + 1) ||
      formData.manufacturingYear < currentYear - 1
    ) {
      return
    }
    // navigate("/check-loan-details-eligibility");
    dispatch(setShowCibilScore(true));
  };

  return (
    <>
      <div className="-mb-2.5 -ml-2.5 flex items-center space-x-2.5">
        <span>{`${step}/${totalSteps}`}</span>
      </div>
      <div>Vehicle Details</div>
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-5">
        <div>
          <span>Car Manufacturer</span>
          <div className="border-b border-slate-400 py-1">
            <input
              placeholder="ex: TATA,Volkswagen, Hyundai"
              type="text"
              value={formData.carManufacturer}
              onChange={(e) =>
                dispatch(
                  setFormData({ ...formData, carManufacturer: e.target.value })
                )
              }
              className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
            />
          </div>
        </div>
        <div>
          <span>Car Model</span>
          <div className="border-b border-slate-400 py-1">
            <input
              placeholder="ex:Camry, Civic, Corolla"
              type="text"
              value={formData.carModel}
              onChange={(e) =>
                dispatch(
                  setFormData({
                    ...formData,
                    carModel: e.target.value,
                  })
                )
              }
              className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
            />
          </div>
        </div>
        <div>
          <span>Manufacturing Year</span>
          <div className="border-b border-slate-400 py-1">
            <input
              placeholder="Manufacturing Year of the vehicle"
              type="number"
              value={formData.manufacturingYear}
              onChange={(e) =>
                dispatch(
                  setFormData({
                    ...formData,
                    manufacturingYear: e.target.value,
                  })
                )
              }
              className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
            />
          </div>
          {(formData?.manufacturingYear > 0 &&
            formData.manufacturingYear > currentYear + 1) ||
          formData.manufacturingYear < currentYear - 1 ? (
            <span className="text-red-500 text-xs font-bold">
              {`manufaturing should be between ${currentYear - 1} and ${
                currentYear + 1
              } `}
            </span>
          ) : null}
        </div>
        <div>
          <span>Vehicle identification number</span>
          <div className="border-b border-slate-400 py-1">
            <input
              placeholder="VIN"
              type="number"
              value={formData.vehicleVIN}
              onChange={(e) =>
                dispatch(
                  setFormData({
                    ...formData,
                    vehicleVIN: e.target.value,
                  })
                )
              }
              className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
            />
          </div>
        </div>
      </section>
      <div className="w-1/2 mx-auto pt-2.5">
        <button
          onClick={() => handleProceed()}
          disabled={
            !formData.carManufacturer ||
            !formData.carModel ||
            !formData.manufacturingYear ||
            !formData.vehicleVIN
          }
          className="bg-cyan-400 py-2.5 w-full rounded-lg text-lg text-white font-normal duration-200 disabled:cursor-not-allowed"
        >
          Submit
        </button>
      </div>
    </>
  );
};

export default Step3;
