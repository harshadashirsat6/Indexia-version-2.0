import { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import LoanDetails from "./LoanDetails";
import Table from "./Table";

const Dashboard = () => {
  const [view, setView] = useState(false);
  const [loanDetails, setLoanDetails] = useState({});

  return (
    <div className="h-screen  pt-[4rem]  w-[95%] sm:w-[80%] m-auto">
      <h1 className="py-4">Dashboard/ Loan Applications</h1>
      {view ? (
        <button
          onClick={() => setView(false)}
          className=" my-1 rounded-md p-1 bg-blue-200 text-black font-semibold shadow-lg"
        >
          <IoIosArrowBack />
        </button>
      ) : null}

      {view ? (
        <div className="border-[1px] p-2 rounded-md">
          <h1>Track you application</h1>
          <LoanDetails loanDetails={loanDetails} setView={setView} />
        </div>
      ) : (
        <div className="">
          <h1 className="py-2">Loan Details</h1>
          <Table setView={setView} setLoanDetails={setLoanDetails} />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
