import { useParams } from "react-router-dom";
import PersonalLoan from "./PersonalLoan";
import BusinessLoan from "./BusinessLoan";
// import HomeLoan from "./HomeLoan";
// import CarLoan from "./CarLoan";
// import EducationLoan from "./EducationLoan";
// import ProjectLoan from "./ProjectLoan";
// import WorkingCapital from "./WorkingCapital";
// import CreditCard from "./CreditCard";
// import BalanceTransfer from "./BalanceTransfer";
// import CommercialPurchase from "./CommercialPurchase";
// import LeaseRentDiscounting from "./LeaseRentDiscounting";
// import LoanAgainstProperty from "./LoanAgainstProperty";

const Products = () => {
  const { param } = useParams();

  return (
    <>
      {param === "personal-loan" && <PersonalLoan />}
      {param === "business-loan" && <BusinessLoan />}

      {/* {param === "home-loan" && <HomeLoan />}
      {param === "car-loan" && <CarLoan />}
      {param === "education-loan" && <EducationLoan />}
      {param === "project-loan" && <ProjectLoan />}
      {param === "working-capital" && <WorkingCapital />}
      {param === "credit-card" && <CreditCard />}
      {param === "balance-transfer" && <BalanceTransfer />}
      {param === "commercial-purchase" && <CommercialPurchase />}
      {param === "lease-rent-discounting" && <LeaseRentDiscounting />}
      {param === "loan-against-property" && <LoanAgainstProperty />} */}
    </>
  );
};

export default Products;
