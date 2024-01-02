import { useState } from "react";
import axios from "../../axios";
import Loader from "../../components/Loader";
import { toast } from "react-hot-toast";

const CustomerSignup = ({ formType, setFormType }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
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
      const resp = await axios.post("/signup", formData);
      console.log(resp);
      if (resp.data.success) {
        setFormType({
          ...formType,
          customerLogin: true,
          customerSignup: false,
        });
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
        <h2 className="text-lg font-bold text-gray-500 ">Customer Signup</h2>
        <p className="pt-2 pb-6">
          <span>Existing account?</span>
          <span
            className="px-2 cursor-pointer text-blue-800 underline"
            onClick={() =>
              setFormType({
                ...formType,
                customerLogin: true,
                customerSignup: false,
              })
            }
          >
            Login
          </span>
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
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
            htmlFor="contact"
          >
            Contact
          </label>
          <input
            type="tel"
            id="contact"
            name="contact"
            value={formData.contact}
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
          {loading ? <Loader /> : "Signup"}
        </button>
      </form>
    </div>
  );
};

export default CustomerSignup;
