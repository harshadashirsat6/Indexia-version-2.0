import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFormData, setShowCibilScore } from "../../../../store/appSlice";
import { MdRadioButtonUnchecked, MdRadioButtonChecked } from "react-icons/md";
import { newPropertyType } from "../../../../configs/selectorConfigs";

const Step3 = ({ totalSteps, step, setStep }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { formData } = useSelector((store) => store.app);

  //handle proceed
  const handleProceed = async () => {
    if (formData?.newPropertyPincode?.length !== 6) {
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
      <div>New Property Details</div>
      <div>
        <span>Property Type</span>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 pt-2">
          {newPropertyType.map((i, j) => (
            <li
              key={i[0]}
              onClick={() =>
                dispatch(setFormData({ ...formData, newPropertyType: i }))
              }
              style={{
                borderColor: formData.newPropertyType === i && "#06b6d4",
              }}
              className={`w-full border border-slate-300 rounded-lg flex items-center justify-between p-2.5 hover:border-cyan-500 cursor-pointer ${
                formData.employmentType === i && "bg-cyan-50"
              }`}
            >
              <span>{i}</span>
              {formData.newPropertyType === i ? (
                <MdRadioButtonChecked className="text-cyan-400" />
              ) : (
                <MdRadioButtonUnchecked className="text-cyan-400" />
              )}
            </li>
          ))}
        </ul>
      </div>
      <div>Address</div>
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-5">
        <div>
          <span>House No</span>
          <div className="border-b border-slate-400 py-1">
            <input
              placeholder="Flat / House No."
              type="text"
              value={formData.newHouseNumber}
              onChange={(e) =>
                dispatch(
                  setFormData({ ...formData, newHouseNumber: e.target.value })
                )
              }
              className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
            />
          </div>
        </div>
        <div>
          <span>Locality</span>
          <div className="border-b border-slate-400 py-1">
            <input
              placeholder="Locality"
              type="text"
              value={formData.newPropertyLocality}
              onChange={(e) =>
                dispatch(
                  setFormData({
                    ...formData,
                    newPropertyLocality: e.target.value,
                  })
                )
              }
              className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
            />
          </div>
        </div>
        <div>
          <span>City</span>
          <div className="border-b border-slate-400 py-1">
            <input
              placeholder="City"
              type="text"
              value={formData.newPropertyCity}
              onChange={(e) =>
                dispatch(
                  setFormData({ ...formData, newPropertyCity: e.target.value })
                )
              }
              className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
            />
          </div>
        </div>
        <div>
          <span>State</span>
          <div className="border-b border-slate-400 py-1">
            <input
              placeholder="State"
              type="text"
              value={formData.newPropertyState}
              onChange={(e) =>
                dispatch(
                  setFormData({ ...formData, newPropertyState: e.target.value })
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
              placeholder="Enter pincode of new property"
              type="number"
              value={formData.newPropertyPincode}
              onChange={(e) =>
                dispatch(
                  setFormData({
                    ...formData,
                    newPropertyPincode: e.target.value,
                  })
                )
              }
              className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
            />
          </div>
          {formData?.newPropertyPincode?.length > 0 &&
          formData?.newPropertyPincode?.length < 6 ? (
            <span className="text-red-500 text-xs font-bold">
              Invalid pincode
            </span>
          ) : null}
        </div>
      </section>
      <div className="w-1/2 mx-auto pt-2.5">
        <button
          onClick={() => handleProceed()}
          disabled={
            !formData.newHouseNumber ||
            !formData.newPropertyLocality ||
            !formData.newPropertyCity ||
            !formData.newPropertyState ||
            !formData.newPropertyPincode
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
