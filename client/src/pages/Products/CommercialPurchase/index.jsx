import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Form from "./Form";
import { useDispatch,useSelector } from "react-redux";
import { setInitialPopup } from "../../../store/appSlice";  

const HomeLoan = () => {
  // state city api
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [homeLoanState, setHomeLoanState] = useState("");

  var stateConfig = {
    url: "https://api.countrystatecity.in/v1/countries/In/states",
    key: "N00wMDJleEpjQ09wTjBhN0VSdUZxUGxWMlJKTGY1a0tRN0lpakh5Vw==",
  };
  const getStates = async () => {
    await fetch(stateConfig.url, {
      headers: { "X-CSCAPI-KEY": stateConfig.key },
    })
      .then((resp) => resp.json())
      .then((resp) => {
        setStates(resp);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getStates();
  }, []);

  // get cities after selecting state
  const [cities, setCities] = useState([]);
  var cityConfig = {
    url: `https://api.countrystatecity.in/v1/countries/IN/states/${selectedState}/cities`,
    key: "N00wMDJleEpjQ09wTjBhN0VSdUZxUGxWMlJKTGY1a0tRN0lpakh5Vw==",
  };
  const getCities = async () => {
    await fetch(cityConfig.url, {
      headers: { "X-CSCAPI-KEY": cityConfig.key },
    })
      .then((resp) => resp.json())
      .then((resp) => {
        setCities(resp);
        // console.log("cities", resp);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    if (selectedState) {
      getCities();
      console.log(homeLoanState);
    }
  }, [selectedState]);

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
    <main className="h-auto mt-[calc(56px)] md:mt-0 mb-10 md:mb-0 mx-5 sm:mx-10 md:mx-0 space-y-5 md:space-y-0">
      <aside className="relative w-full md:w-[80%] m-auto flex justify-start md:justify-center pt-0 md:pt-[10vh]">
        <motion.div
          animate={{ opacity: 100 }}
          className="opacity-0 w-full px-0 md:px-20 space-y-5"
        >
          <Form
            states={states}
            cities={cities}
            selectedState={selectedState}
            setSelectedState={setSelectedState}
            user={userBasicDetails}
          />
        </motion.div>
      </aside>
    </main>
  );
};

export default HomeLoan;
