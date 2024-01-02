import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../axios";
import Loader from "../../components/Loader";
import { toast } from "react-hot-toast";

const FranchiseLogin = ({ formType, setFormType }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission logic here
    try {
      setLoading(true);
      const resp = await axios.post("/franchise/login", formData);
      console.log(resp.data.token);
      if (resp.data.success) {
        localStorage.setItem("token", resp.data.token);
        localStorage.setItem("account", "franchise");
        navigate("/loans");
        toast.success(resp.data.msg);
        setLoading(false);
        return;
      }
      setLoading(false);
      return toast.error(resp.data.msg);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  return (
    <div className="mx-auto mt-8 p-6 bg-white/30 shadow-md rounded-md">
      <div>
        <h2 className="text-lg font-bold text-gray-500 ">Franchise Login</h2>
        <p className="pt-2 pb-6">
          <span>Create Account?</span>
          <span
            className="px-2 cursor-pointer text-blue-800 underline"
            onClick={() =>
              setFormType({
                ...formType,
                franchiseLogin: false,
                franchiseSignup: true,
              })
            }
          >
            Signup
          </span>
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          {loading ? <Loader /> : "Login"}
        </button>
      </form>
    </div>
  );
};

export default FranchiseLogin;
