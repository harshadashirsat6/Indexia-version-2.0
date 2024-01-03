import { useParams } from "react-router-dom";
import PersonalLoan from "./PersonalLoan";
import BusinessLoan from "./BusinessLoan";
import HomeLoan from "./HomeLoan";
import LoanAgainstProperty from "./LoanAgainstProperty";
import CreditCard from "./CreditCard";
import BalanceTransfer from "./BalanceTransfer";
import CommercialPurchase from "./CommercialPurchase";
import LeaseRentDiscounting from "./LeaseRentDiscounting";
import WorkingCapital from "./WorkingCapital";
import CarLoan from "./CarLoan";
import ProjectLoan from "./ProjectLoan";
import EducationLoan from "./EducationLoan";

const Products = () => {
  const { param } = useParams();

  return (
    <>
      {param === "personal-loan" && <PersonalLoan />}
      {param === "business-loan" && <BusinessLoan />}
      {param === "home-loan" && <HomeLoan />}
      {param === "loan-against-property" && <LoanAgainstProperty />}
      {param === "credit-card" && <CreditCard />}
      {param === "balance-transfer" && <BalanceTransfer />}
      {param === "commercial-purchase" && <CommercialPurchase />}
      {param === "lease-rent-discounting" && <LeaseRentDiscounting />}
      {param === "working-capital" && <WorkingCapital />}
      {param === "car-loan" && <CarLoan />}
      {param === "project-loan" && <ProjectLoan />}
      {param === "education-loan" && <EducationLoan />}
    </>
  );
};

export default Products;
