import { useSelector } from "react-redux";
import VerifyOtpModal from "./VerifyOtpModal";
import FeedbackForm from "./FeedbackForm";
import SubmitLoamFormPayment from "./SubmitLoamFormPayment";
import HomeModal from "./HomeModal";

const Modal = () => {
  const {
    isOpenModal,
    isFeedbackFormOpen,
    showSubmitLoanFormPaymentModal,
    initialPopup,
  } = useSelector((store) => store.app);
  const homeModalShown = localStorage.getItem("homePageDetails");
  return (
    <>
      {isOpenModal.label && (
        <main className="fixed z-10 top-0 left-0 w-full h-full bg-black/25 backdrop-blur-sm grid place-items-center">
          <VerifyOtpModal />
        </main>
      )}
      {isFeedbackFormOpen === true && (
        <main className="fixed z-10 top-0 left-0 w-full h-full bg-black/25 backdrop-blur-sm grid place-items-center">
          <FeedbackForm />
        </main>
      )}
      {showSubmitLoanFormPaymentModal === true && (
        <main className="fixed z-10 top-0 left-0 w-full h-full bg-black/25 backdrop-blur-sm grid place-items-center">
          <SubmitLoamFormPayment />
        </main>
      )}
      {initialPopup === true && !homeModalShown && (
        <main className="fixed z-10 top-0 left-0 w-full h-full bg-black/25 backdrop-blur-sm grid place-items-center">
          <HomeModal />
        </main>
      )}
    </>
  );
};

export default Modal;
