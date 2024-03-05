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
import LoanAgainstShare from "./LoanAgainstShare";
import ODCC from "./ODCC";
import { useSelector } from "react-redux";
import HomeModal from "../../components/Modals/HomeModal";

const Products = () => {
  const { param } = useParams();

  const { initialPopup } = useSelector((store) => store.app);
  const homeModalShown = localStorage.getItem("homePageDetails");

  return (
    <>
      {initialPopup && !homeModalShown && (
        <main className="fixed z-10 top-0 left-0 w-full h-full bg-black/25 backdrop-blur-sm grid place-items-center">
          <HomeModal />
        </main>
      )}

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
      {param === "loan-against share" && <LoanAgainstShare />}
      {param === "OD-CC limit" && <ODCC />}
    </>
  );
};

export default Products;
