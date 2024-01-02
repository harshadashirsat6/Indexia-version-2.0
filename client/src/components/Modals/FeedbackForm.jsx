import { useDispatch } from "react-redux";
import { setIsOpenFeedbackForm } from "../../store/appSlice";
import { motion } from "framer-motion";

const FeedbackForm = () => {
  const dispatch = useDispatch();


  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 100 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="bg-white rounded-xl p-5 shadow w-90 md:w-96 m-4 space-y-2.5 flex flex-col items-center"
    >
      <section>
        <h1 className="text-xl">Your feedback is valubale for us</h1>
      </section>
      <form className="w-full space-y-3 py-3 ">
        <section className="">
          <input
            type="text"
            placeholder="Name"
            className="px-1 py-1.5 border-[0.5px]  rounded-lg focus:outline-[0.5px] focus:outline-blue-300 w-full"
          />
        </section>
        <section>
          <input
            type="text"
            placeholder="Email"
            className="px-1 py-1.5 border-[0.5px]  rounded-lg focus:outline-[0.5px] focus:outline-blue-300 w-full"
          />
        </section>
        <section>
          <textarea
            type="text"
            placeholder="Feedback"
            className="px-1 py-1.5 border-[0.5px] rounded-lg focus:outline-[0.5px] focus:outline-blue-300 w-full min-h-[10rem] max-h-[15rem]"
          />
        </section>
      </form>
      <section className="flex w-full space-x-2.5">
        <button
          // onClick={handleSubmit}
          className="bg-blue-400 hover:bg-blue-500 duration-200 w-full py-1 px-1 rounded-md text-white text-lg"
        >
          Sumbit
        </button>
        <button
          onClick={() => dispatch(setIsOpenFeedbackForm(false))}
          className="bg-red-400 hover:bg-red-500 duration-200 w-full py-1 px-1 rounded-md text-white text-lg"
        >
          Close
        </button>
      </section>
    </motion.div>
  );
};

export default FeedbackForm ;
