import { motion } from "framer-motion";
import Form from "./Form";
import { useDispatch, useSelector } from "react-redux";
import { setInitialPopup } from "../../../../store/appSlice";

const ODCC = () => {
  const dispatch = useDispatch();
  //get basic user details
  const { userBasicDetails } = useSelector((state) => state.user);
  if (
    !userBasicDetails?.name ||
    !userBasicDetails?.email ||
    !userBasicDetails?.contact
  ) {
    dispatch(setInitialPopup(true));
    localStorage.removeItem("homePageDetails");
  }

  return (
    <main className="h-auto mt-[calc(56px)] md:mt-0 mb-10 md:mb-0 mx-5 sm:mx-10 md:mx-0  md:space-y-0">
      <div className="relative w-full md:w-[80%] m-auto flex justify-start md:justify-center pt-0 md:pt-[10vh]">
        <motion.div
          animate={{ opacity: 100 }}
          className="opacity-0 w-full px-0 md:px-20 "
        >
          <h1 className="text-2xl flex mb-8 flex-col space-y-2 font-semibold text-gray-500 mt-7">
            <span>
              Unlock the best <span>OD/CC</span> offers suitable for your needs
              from <span>43+ lenders</span>
            </span>
          </h1>
          <p className="font-bold text-sm text-gray-400">
            Fields with asterik mark (*) are mandatory
          </p>
          <Form />
        </motion.div>
      </div>
    </main>
  );
};

export default ODCC;
