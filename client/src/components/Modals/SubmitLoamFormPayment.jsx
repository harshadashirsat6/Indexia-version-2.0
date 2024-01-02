import { useDispatch } from "react-redux";
import { setShowSubmitLoanFormPaymentModal } from "../../store/appSlice";
import { motion } from "framer-motion";
import "react-circular-progressbar/dist/styles.css";

const SubmitLoamFormPayment = () => {
  const dispatch = useDispatch();
  const v = Math.floor(Math.random() * (900 - 300) + 300);

  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 100 }}
      transition={{ type: "spring", stiffness: 300 }}
      className=" bg-white rounded-xl p-5 shadow w-90 md:w-96 m-4 space-y-2.5 flex flex-col items-center"
    >
      <section className="w-full space-y-3 py-5  ">
        {/* <div className="w-[10rem] h-[10rem] m-auto">
          <p></p>
          <CircularProgressbar
            value={v}
            minValue={300}
            maxValue={900}
            strokeWidth={9}
            text={v}
            styles={buildStyles({
              rotation: 0,
              strokeLinecap: "round", // 'round' or 'butt'
              textSize: "16px",
              textColor:
                v > 300 && v <= 500
                  ? "red"
                  : v > 500 && v <= 700
                  ? "orange"
                  : v > 700 && v <= 900
                  ? "green"
                  : null,
              trailColor: "#E5E4E2",
              pathColor:
                v > 300 && v <= 500
                  ? "red"
                  : v > 500 && v <= 700
                  ? "orange"
                  : v > 700 && v <= 900
                  ? "green"
                  : null,
            })}
          />
        </div>
        <div className="text-center">
          {" "}
          {v >= 300 && v <= 500
            ? "Poor Credit Score"
            : v > 500 && v <= 700
            ? "Fair Credit Score"
            : v > 700
            ? "Excellent Credit Score"
            : null}
        </div>
      </section> */}
        <h1 className="text-center text-2xl font-acme">Congratulations!</h1>
      </section>
      <section className="space-y-1 ">
        <p>
          To proceed with your application, Kindly proceed with the payment of
          <sapn className="font-bold px-1">Rs.100</sapn>. Your cooperation in
          settling this fee is appreciated, and it will facilitate the seamless
          processing of your application.
        </p>
        <p> Thank you for your prompt attention to this matter.</p>
      </section>
      <section className="flex w-full space-x-2.5">
        <button
          // onClick={handleSubmit}
          className="bg-blue-400 hover:bg-blue-500 duration-200 w-full py-2 px-1.5 rounded-md text-white text-sm"
        >
          Proceed for payment
        </button>
        <button
          onClick={() => dispatch(setShowSubmitLoanFormPaymentModal(false))}
          className="bg-red-400 hover:bg-red-500 duration-200 w-full py-2 px-1 rounded-md text-white text-sm"
        >
          Close
        </button>
      </section>
    </motion.div>
  );
};

export default SubmitLoamFormPayment;
