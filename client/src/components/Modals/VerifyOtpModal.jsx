import { useState } from "react";
import { useDispatch } from "react-redux";
import { setIsOpenModal } from "../../store/appSlice";
import { motion } from "framer-motion";

const VerifyOtpModal = () => {
  const dispatch = useDispatch();
  const [otp, setOtp] = useState("");

  const handleChange = (e) => {
    const val = e.target.value;
    val.length <= 4 ? setOtp(val) : null;
  };

  const handleSubmit = () => {
    console.log(otp);
    dispatch(setIsOpenModal({ label: "", tracker: true }));
  };

  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 100 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="bg-white rounded-xl p-5 shadow w-90 md:w-96 m-4 space-y-2.5 flex flex-col items-center"
    >
      <section>
        <h1 className="text-xl">OTP Verification</h1>
      </section>
      <section>
        <p>Enter 4-digit OTP sent to your mobile number!</p>
      </section>
      <section className="w-1/2 border-b border-slate-400 flex justify-center">
        <input
          type="number"
          className="outline-none bg-transparent w-[51px] text-xl"
          placeholder="####"
          value={otp}
          onChange={handleChange}
        />
      </section>
      <section className="flex w-full space-x-2.5 pt-2.5">
        <button
          onClick={handleSubmit}
          className="bg-blue-400 hover:bg-blue-500 duration-200 w-full p-2.5 rounded-md text-white text-lg"
        >
          Verify
        </button>
        <button
          onClick={() =>
            dispatch(setIsOpenModal({ label: "", tracker: false }))
          }
          className="bg-red-400 hover:bg-red-500 duration-200 w-full p-2.5 rounded-md text-white text-lg"
        >
          Cancel
        </button>
      </section>
    </motion.div>
  );
};

export default VerifyOtpModal;
