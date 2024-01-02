import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setFormData, setShowCibilScore } from "../../../../store/appSlice";

const Step3= ({ totalSteps, step, setStep }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { formData, isOpenModal } = useSelector((store) => store.app);

  const handleProceed = () =>{
    // navigate("/check-loan-details-eligibility");
        dispatch(setShowCibilScore(true));

  }

  return (
    <>
      <div className="-mb-2.5 -ml-2.5 flex items-center space-x-2.5">
        <span>{`${step}/${totalSteps}`}</span>
      </div>
      <h1 className="text-xl flex flex-col space-y-2">
        <span>Project Details</span>
      </h1>
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-5">
        <div>
          <span>Project Objective</span>
          <div className="border-b border-slate-400 py-1">
            <input
              placeholder="Goal and Objective of project"
              type="text"
              value={formData.projectObjective}
              onChange={(e) =>
                dispatch(
                  setFormData({ ...formData, projectObjective: e.target.value })
                )
              }
              className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
            />
          </div>
        </div>
        <div>
          <span>Project Description</span>
          <div className="border-b border-slate-400 py-1">
            <textarea
              placeholder="ex: detail explaination about sector, field, sector, flow, material"
              type="text"
              value={formData.projectDescription}
              onChange={(e) =>
                dispatch(
                  setFormData({
                    ...formData,
                    projectDescription: e.target.value,
                  })
                )
              }
              className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
            />
          </div>
        </div>
        <div>
          <span>Scope Of Work and Deliverables</span>
          <div className="border-b border-slate-400 py-1">
            <input
              placeholder="Work & Deliverables"
              type="text"
              value={formData.scopeOfWorkandDeliverables}
              onChange={(e) =>
                dispatch(
                  setFormData({
                    ...formData,
                    scopeOfWorkandDeliverables: e.target.value,
                  })
                )
              }
              className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
            />
          </div>
        </div>
        <div>
          <span>Project Budget</span>
          <div className="border-b border-slate-400 py-1">
            <input
              placeholder="Entire Project Budget"
              type="text"
              value={formData.projectBudget}
              onChange={(e) =>
                dispatch(
                  setFormData({ ...formData, projectBudget: e.target.value })
                )
              }
              className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
            />
          </div>
        </div>
        <div className="col-span-1 sm:col-span-2">
          <span>Project Commence Date</span>
          <div className="border-b border-slate-400 py-1">
            <input
              placeholder="DD-MM-YYYY"
              type="DATE"
              value={formData.projectStartDate}
              onChange={(e) =>
                dispatch(
                  setFormData({ ...formData, projectStartDate: e.target.value })
                )
              }
              className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
            />
          </div>
        </div>
        <div className="col-span-1 sm:col-span-2">
          <span>Expected Date of Completion</span>
          <div className="border-b border-slate-400 py-1">
            <input
              placeholder="DD-MM-YYYY"
              type="DATE"
              value={formData.expectedDateOfComletion}
              onChange={(e) =>
                dispatch(
                  setFormData({
                    ...formData,
                    expectedDateOfComletion: e.target.value,
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
          onClick={handleProceed}
          disabled={
            !formData.projectObjective ||
            !formData.projectDescription ||
            !formData.scopeOfWorkandDeliverables ||
            !formData.projectBudget ||
            !formData.projectStartDate ||
            !formData.expectedDateOfComletion
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
