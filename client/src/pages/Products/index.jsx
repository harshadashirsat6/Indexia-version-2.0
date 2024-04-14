import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
// FORM COMPONENTS
import PersonalLoan from "./Forms/PersonalLoan";
import BusinessLoan from "./Forms/BusinessLoan";
import HomeLoan from "./Forms/HomeLoan";
import LoanAgainstProperty from "./Forms/LoanAgainstProperty";
import BalanceTransfer from "./Forms/BalanceTransfer";
import ProjectLoan from "./Forms/ProjectLoan";
import CarLoan from "./Forms/CarLoan";
import EducationLoan from "./Forms/EducationLoan";
import CreditCard from "./Forms/CreditCard";
import CommercialPurchase from "./Forms/CommercialPurchase";
import WorkingCapital from "./Forms/WorkingCapital";
import LeaseRentDiscounting from "./Forms/LeaseRentDiscounting";
import ODCC from "./Forms/ODCC";
import LoanAgainstShare from "./Forms/LoanAgainstShare";

// MODAL
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
      {param === "balance-transfer" && <BalanceTransfer />}
      {param === "project-loan" && <ProjectLoan />}
      {param === "car-loan" && <CarLoan />}
      {param === "education-loan" && <EducationLoan />}
      {param === "credit-card" && <CreditCard />}
      {param === "commercial-purchase" && <CommercialPurchase />}
      {param === "working-capital" && <WorkingCapital />}
      {param === "lease-rental-discounting" && <LeaseRentDiscounting />}
      {param === "OD-CC limit" && <ODCC />}
      {param === "loan-against share" && <LoanAgainstShare />}
    </>
  );
};

export default Products;
