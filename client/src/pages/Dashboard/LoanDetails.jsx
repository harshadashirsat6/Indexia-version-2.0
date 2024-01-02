import { useState } from "react";

const stages = [
  {
    stageNo: 1,
    completedAction: "Form Submitted",
    nextAction: "Application under review",
  },
  {
    stageNo: 2,
    completedAction: "Application Approved",
    nextAction: "Waiting to upload documents",
  },
  {
    stageNo: 3,
    completedAction: "Documents uploaded",
    nextAction: "Document verification pending",
  },
  {
    stageNo: 4,
    completedAction: "Documents verified",
    nextAction: "waiting for saction letter",
  },
  {
    stageNo: 5,
    completedAction: "Loan Sactioned",
  },
];

const LoanDetails = ({ loanDetails }) => {
  const [currentStage, setCurrentStage] = useState(1);
  console.log(loanDetails);
  return (
    <div>
      <div className="p-2 rounded-md text-black font-acme">
        <div className="border-blue-200 flex justify-between py-3 overflow-x-auto">
          {stages.map((stage, i) => {
            return (
              <div
                className={`sm:w-[12rem] space-y-3 m-2 cursor-pointer hover:bg-gray-300/30 p-3 rounded-md  ${
                  i + 1 <= currentStage ? "bg-blue-50" : "bg-gray-200"
                } `}
                key={i}
              >
                <p className="flex justify-center">
                  <span
                    className={`h-6 w-6 rounded-full  text-center ${
                      i + 1 <= currentStage ? "bg-green-300" : "bg-gray-200"
                    } `}
                  >
                    {stage.stageNo}
                  </span>
                </p>
                <p
                  className={`flex flex-col text-sm text-center ${
                    i + 1 <= currentStage ? "text-blue-700" : "text-gray-600"
                  }`}
                >
                  <span>{stage?.completedAction}</span>
                  <span>{stage?.nextAction}</span>
                </p>
              </div>
            );
          })}
        </div>
      </div>
      {/* each stage detail */}
      <div className="rounded-md my-5 p-2">
        {currentStage === 1 && <div>Your application in under review</div>}
        {currentStage === 2 && (
          <div>
            Your application has been approved. Please upload required documents
          </div>
        )}
        {currentStage === 3 && (
          <div>Document verification is under process</div>
        )}
        {currentStage === 4 && (
          <div>
            Document verifed successfully. Please be patient while we saction
            your loan request.
          </div>
        )}
        {currentStage === 5 && (
          <div>Congratulations! Your loan has been sactioned</div>
        )}
      </div>
    </div>
  );
};

export default LoanDetails;
