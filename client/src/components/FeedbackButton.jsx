import { VscFeedback } from "react-icons/vsc";
import { useDispatch } from "react-redux";
import { setIsOpenFeedbackForm } from "../store/appSlice";

const FeedbackButton = () => {
  const dispatch = useDispatch(); // Fix the typo here
  return (
    <div className="bg-blue-300 fixed  right-0 bottom-0 rounded-t-full w-[15rem] flex justify-center items-center gap-3 py-1.5 font-bold cursor-pointer hover:animate-pulse"
     onClick={()=>dispatch(setIsOpenFeedbackForm(true))}>
      <span>Feedback</span>
      <VscFeedback />
    </div>
  );
};

export default FeedbackButton;
