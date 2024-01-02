import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const LoanDetails = () => {
  const { formData } = useSelector((store) => store.app);

  // return to home if no loan details
  if (Object.keys(formData).length === 0) {
    return <Navigate to="/" />;
  }

  return (
    <main className="mx-32 mt-[calc(56px+20px)]">
      <h1 className="font-bold text-lg">Loan Application: <span className="capitalize text-blue-400">{ formData.category.replace('-'," ")}</span></h1>
      <section className="p-5 rounded-xl space-y-2.5 border-2 my-5">
        <div className="relative">
          <span>Mobile number: </span>
          <span className="absolute left-40">{formData.phone || "---"}</span>
        </div>
        <div className="relative">
          <span>Email Address: </span>
          <span className="absolute left-40">{formData.email || "---"}</span>
        </div>
        <div className="relative">
          <span>Employment type: </span>
          <span className="absolute left-40">
            {formData.employmentType || "---"}
          </span>
        </div>
        <div className="relative">
          <span>
            {formData.yearlyIncome ? "Yearly income:" : "Monthly Income"}{" "}
          </span>
          <span className="absolute left-40">
            {formData.yearlyIncome || formData.monthlyIncome || "---"}
          </span>
        </div>
        <div className="relative">
          <span>Company name: </span>
          <span className="absolute left-40">
            {formData.companyName || "---"}
          </span>
        </div>
        <div className="relative">
          <span>Loan amount: </span>
          <span className="absolute left-40">
            {formData.loanAmount || "---"}
          </span>
        </div>
      </section>
    </main>
  );
};

export default LoanDetails;
