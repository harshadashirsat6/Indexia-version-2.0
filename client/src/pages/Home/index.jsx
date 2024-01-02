import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Banner from "./Banner";
import OurPartners from "./OurPartners";
import Products from "./Products";
import { setInitialPopup } from "../../store/appSlice";

const Home = () => {
  const { userProfileDetails } = useSelector((store) => store.app);
  console.log(userProfileDetails);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setInitialPopup(true));
  });
  return (
    <>
      <Banner />
      <Products />
      <OurPartners />
    </>
  );
};

export default Home;
