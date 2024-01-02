import { useDispatch } from "react-redux";
import { setInitialPopup } from "../../store/appSlice";
import { motion } from "framer-motion";
import { useState } from "react";

const HomeModal = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
  });
  const handleInputs = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = async () => {
    dispatch(setInitialPopup(false));
    localStorage.setItem("homePageDetails", true);
  };
  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 100 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="bg-white rounded-xl p-5 shadow w-90 md:w-96 m-4 space-y-2.5 flex flex-col items-center"
    >
      <section>
        <h1 className="text-xl">Please fill your contact details</h1>
      </section>
      <form className="w-full space-y-3 py-3 ">
        <section className="">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={formData.name}
            onChange={handleInputs}
            className="px-1 py-1.5 border-[0.5px]  rounded-lg focus:outline-[0.5px] focus:outline-blue-300 w-full"
          />
        </section>
        <section>
          <input
            type="text"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleInputs}
            className="px-1 py-1.5 border-[0.5px]  rounded-lg focus:outline-[0.5px] focus:outline-blue-300 w-full"
          />
        </section>
        <section>
          <input
            type="text"
            placeholder="Contact"
            name="contact"
            value={formData.contact}
            onChange={handleInputs}
            className="px-1 py-1.5 border-[0.5px]  rounded-lg focus:outline-[0.5px] focus:outline-blue-300 w-full"
          />
        </section>
      </form>
      <section className="flex w-full space-x-2.5">
        <button
          onClick={handleSubmit}
          disabled={!formData.name || !formData.contact || !formData.email}
          className="bg-blue-400 hover:bg-blue-500 duration-200 w-full py-1 px-1 rounded-md text-white text-lg disabled:cursor-not-allowed"
        >
          Sumbit
        </button>
      </section>
    </motion.div>
  );
};

export default HomeModal;
