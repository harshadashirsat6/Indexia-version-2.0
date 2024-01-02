import  { useState } from "react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log("Form submitted:", formData);
  };

  return (
    <div className="container mx-auto my-[7rem] py-2">
      <div className="max-w-md mx-auto bg-blue-700/40 p-8 border rounded-md shadow-lg shadow-gray-400 ">
        <h2 className="text-2xl font-semibold mb-6">Contact Us</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-600 font-medium">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:outline-[0.5px] focus:outline-blue-200"
              placeholder="Your Name"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600 font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:outline-[0.5px] focus:outline-blue-200"
              placeholder="Your Email"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="contact"
              className="block text-gray-600 font-medium"
            >
              Contact Number
            </label>
            <input
              type="tel"
              id="contact"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:outline-[1px] focus:outline-blue-600"
              placeholder="Your Contact Number"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="message"
              className="block text-gray-600 font-medium"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:outline-[0.5px] focus:outline-blue-200"
              rows="4"
              placeholder="Your Message"
              required
            ></textarea>
          </div>

          <div className="flex items-center justify-end">
            <button
              type="submit"
              disabled={!formData.name||!formData.contact||!formData.email||!formData.message}
              className="bg-blue-500 text-white px-4 py-2 rounded-md disabled:cursor-not-allowed"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
