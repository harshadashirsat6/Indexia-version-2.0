import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setFormData, setShowCibilScore } from "../../../../store/appSlice";
import { TbSquareRoundedChevronLeftFilled } from "react-icons/tb";
import { loanTenure } from "../../../../configs/selectorConfigs";
import { MdRadioButtonChecked, MdRadioButtonUnchecked } from "react-icons/md";

const Step2 = ({ totalSteps, step, setStep }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { formData, isOpenModal } = useSelector((store) => store.app);

  const handleProceed = () => {
    if (formData?.courseDuration > 0 && formData?.courseDuration < 1) {
     return
    }
    if(formData?.educationCost>0 && formData?.educationCost<30000){
      return
    }
    // navigate("/check-loan-details-eligibility");
    dispatch(setShowCibilScore(true));
  }
  
  return (
    <>
      <div className="-mb-2.5 -ml-2.5 flex items-center space-x-2.5">
        <span>{`${step}/${totalSteps}`}</span>
      </div>
      <h1 className="text-xl flex flex-col space-y-2">
        <span>
          Unlock best <span>education loan</span> offers suitable for your needs
          from <span>30+ lenders</span>
        </span>
        <span className="w-20 h-0.5 rounded-full bg-cyan-400"></span>
      </h1>
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-5">
        <div>
          <span>Field Of Study</span>
          <div className="border-b border-slate-400 py-1">
            <input
              placeholder="Major or Field of study"
              type="text"
              value={formData.fieldOfStudy}
              onChange={(e) =>
                dispatch(
                  setFormData({ ...formData, fieldOfStudy: e.target.value })
                )
              }
              className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
            />
          </div>
        </div>
        <div>
          <span>Unviersity</span>
          <div className="border-b border-slate-400 py-1">
            <input
              placeholder="Name of University"
              type="text"
              value={formData.universityName}
              onChange={(e) =>
                dispatch(
                  setFormData({ ...formData, universityName: e.target.value })
                )
              }
              className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
            />
          </div>
        </div>
        <div>
          <span>Institute Name</span>
          <div className="border-b border-slate-400 py-1">
            <input
              placeholder="Institue name with address"
              type="text"
              value={formData.instituteName}
              onChange={(e) =>
                dispatch(
                  setFormData({ ...formData, instituteName: e.target.value })
                )
              }
              className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
            />
          </div>
        </div>
        <div>
          <span>Enrollment Status</span>
          <div className="border-b border-slate-400 py-1">
            <input
              placeholder="Full-time, Part-time"
              type="text"
              value={formData.enrollmentStatus}
              onChange={(e) =>
                dispatch(
                  setFormData({ ...formData, enrollmentStatus: e.target.value })
                )
              }
              className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
            />
          </div>
        </div>
        <div className="col-span-1 sm:col-span-2">
          <span>Course Duration</span>
          <div className="border-b border-slate-400 py-1">
            <input
              placeholder="in Years : 1, 4"
              type="number"
              value={formData.courseDuration}
              onChange={(e) =>
                dispatch(
                  setFormData({ ...formData, courseDuration: e.target.value })
                )
              }
              className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
            />
          </div>
          {formData?.courseDuration > 0 && formData?.courseDuration < 1 ? (
            <span className="text-red-500 text-xs font-bold">
              min course duration 1 year
            </span>
          ) : null}
        </div>

        <div>
          <span>Education Cost</span>
          <div className="border-b border-slate-400 py-1">
            <input
              placeholder="Fees/Cost of entire Course in Lakhs"
              type="number"
              value={formData.educationCost}
              onChange={(e) =>
                dispatch(
                  setFormData({ ...formData, educationCost: e.target.value })
                )
              }
              className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
            />
          </div>
          {formData?.educationCost > 0 && formData?.educationCost < 30000 ? (
            <span className="text-red-500 text-xs font-bold">
              min value 30k
            </span>
          ) : null}
        </div>
      </section>
      <div className="w-1/2 mx-auto pt-2.5">
        <button
          onClick={handleProceed}
          disabled={
            !formData.fieldOfStudy ||
            !formData.universityName ||
            !formData.instituteName ||
            !formData.enrollmentStatus ||
            !formData.courseDuration ||
            !formData.educationCost
          }
          className="bg-cyan-400 py-2.5 w-full rounded-lg text-lg text-white font-normal duration-200 disabled:cursor-not-allowed"
        >
          Submit
        </button>
      </div>
    </>
  );
};

export default Step2;
