import { useSelector } from "react-redux";
const Profile = () => {
  const {profile} = useSelector((state) => state.franchise);
  console.log(profile);
  return <div>Profile</div>;
};

export default Profile;
