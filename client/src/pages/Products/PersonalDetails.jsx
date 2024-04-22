import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
//selectors
import { residencyType } from "../../configs/selectorConfigs";
// media
import { FaRegCalendarAlt } from "react-icons/fa";
import DatePicker from "../../components/DatePicker/DatePicker";

const PersonalDetails = ({ formik, category }) => {
  const { userBasicDetails } = useSelector((store) => store.user);

  //residence state, city
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState("");
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
    }
  }, [selectedState]);

  //auto dash in birthdate
  const [activeCl, setActiveCl] = useState(true);
  const formatBirthdate = (inputDate) => {
    const cleanedInput = inputDate.replace(/[^\d]/g, ""); // Remove non-numeric characters
    console.log(cleanedInput);
    const day = cleanedInput.slice(0, 2);
    const month = cleanedInput.slice(2, 4);
    const year = cleanedInput.slice(4, 8);

    if (cleanedInput.length > 4) {
      return `${day}-${month}-${year}`;
    } else if (cleanedInput.length > 2) {
      return `${day}-${month}`;
    } else {
      return cleanedInput;
    }
  };

  return (
    <>
      <div>
        <span className="font-semibold text-gray-500">Full name *</span>
        <div className="border-b border-slate-400 py-1">
          <input
            placeholder=""
            type="text"
            value={userBasicDetails?.name || "ABC"}
            name="name"
            className="w-full bg-transparent border-none outline-none placeholder:text-slate-700"
            readOnly
          />
        </div>
      </div>
      <div>
        <span className="font-semibold text-gray-500">Mobile Number *</span>
        <div className="flex items-center space-x-2.5 border-b border-slate-400 py-1">
          <img src="/india.png" alt="india" className="w-7 h-4" />
          <span className="whitespace-nowrap">+91 -</span>
          <input
            placeholder=""
            type="number"
            value={userBasicDetails?.contact || "1234567890"}
            name="contact"
            className="w-full bg-transparent border-none outline-none placeholder:text-slate-700"
            readOnly
          />
        </div>
      </div>
      <div>
        <span className="font-semibold text-gray-500">Email Address *</span>
        <div className="border-b border-slate-400 py-1">
          <input
            placeholder=""
            type="email"
            value={userBasicDetails?.email || "test@gmail.com"}
            name="email"
            className="w-full bg-transparent border-none outline-none placeholder:text-slate-700"
            readOnly
          />
        </div>
      </div>
      <div>
        <span className="font-semibold text-gray-500">
          Date of Birth (as per pan card) *
        </span>
        <div className="border-b border-slate-400 py-1 flex relative">
          <input
            placeholder="DD-MM-YYYY"
            type="text"
            onBlur={() => formik.setFieldTouched("dateOfBirth", true)}
            value={formik.values.dateOfBirth}
            onChange={(e) => {
              const formattedDate = formatBirthdate(e.target.value);

              formik.setFieldValue("dateOfBirth", formattedDate);
            }}
            className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
          />
          <div
            id="e;ljfeijfie"
            className="w-8 h-[inherit]  bg-gray-200 flex items-center justify-center rounded cursor-pointer"
            onClick={(e) => {
              if (e.target.id === "e;ljfeijfie") {
                setActiveCl((prev) => !prev);
                formik.setFieldTouched("dateOfBirth", true);
              }
            }}
          >
            <FaRegCalendarAlt
              onClick={(e) => {
                setActiveCl((prev) => !prev);
                formik.setFieldTouched("dateOfBirth", true);
              }}
            />
            <div className={activeCl ? "hidden" : "block "}>
              <DatePicker
                setActive={() => {
                  setActiveCl(true);
                }}
                handaleDate={(date) => {
                  formik.setFieldValue("dateOfBirth", date);
                }}
                clearFun={() => {
                  formik.setFieldValue("dateOfBirth", "");
                }}
                date={formik.dateOfBirth}
              />
            </div>
          </div>
        </div>
        {formik.touched.dateOfBirth && formik.errors.dateOfBirth && (
          <span className="text-red-500 text-xs font-bold">
            {formik.errors.dateOfBirth}
          </span>
        )}
      </div>
      <div className="col-span-1 sm:col-span-2">
        <span className="font-semibold text-gray-500">PAN Card Number *</span>
        <div className="border-b border-slate-400 py-1">
          <input
            placeholder="Enter Permanent Account Number"
            type="text"
            {...formik.getFieldProps("panCardNum")}
            onChange={(e) =>
              formik.setFieldValue("panCardNum", e.target.value.toUpperCase())
            }
            className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
          />
        </div>
        {formik.touched.panCardNum && formik.errors.panCardNum && (
          <span className="text-red-500 text-xs font-bold">
            {formik.errors.panCardNum}
          </span>
        )}
      </div>
      <div>
        <span className="font-semibold text-gray-500">
          Current Resident State *
        </span>
        <div className="flex gap-2 bg-gray-200/40 border-[1px] border-gray-400 rounded-md">
          <select
            className="bg-transparent w-full py-2.5"
            value={selectedState}
            {...formik.getFieldProps("residenceState")}
            onChange={(e) => {
              formik.handleChange(e);
              setSelectedState(e.target.value);
            }}
          >
            <option value={""} className="hidden-option">
              Select
            </option>
            {states
              .sort((a, b) => (a.name > b.name ? 1 : -1))
              .map((obj) => {
                return (
                  <option key={obj.id} value={obj.iso2}>
                    {obj.name}
                  </option>
                );
              })}
          </select>
        </div>
        {formik.touched.residenceState && formik.errors.residenceState && (
          <span className="text-red-500 text-xs font-bold">
            {formik.errors.residenceState}
          </span>
        )}
      </div>
      <div>
        <span className="font-semibold text-gray-500">
          Current Resident City *
        </span>
        <div className="flex gap-2 bg-gray-200/40 border-[1px] border-gray-400 rounded-md">
          <select
            className="bg-transparent w-full disabled:cursor-not-allowed py-2.5"
            disabled={!selectedState}
            {...formik.getFieldProps("residenceCity")}
          >
            <option value={""} className="hidden-option">
              Select
            </option>
            {cities.map((obj) => {
              return (
                <option key={obj.id} value={obj.name}>
                  {obj.name}
                </option>
              );
            })}
          </select>
        </div>
        {formik.touched.residenceCity && formik.errors.residenceCity && (
          <span className="text-red-500 text-xs font-bold">
            {formik.errors.residenceCity}
          </span>
        )}
      </div>
      <div>
        <span className="font-semibold text-gray-500">
          Current Resident Pincode *
        </span>
        <div className="border-b border-slate-400 py-1">
          <input
            placeholder="Enter Pincode"
            type="text"
            {...formik.getFieldProps("residencePincode")}
            maxLength={6}
            className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
          />
        </div>
        {formik.touched.residencePincode && formik.errors.residencePincode && (
          <span className="text-red-500 text-xs font-bold">
            {formik.errors.residencePincode}
          </span>
        )}
      </div>
      <div>
        <span className="font-semibold text-gray-500">
          Status of Current Residence *
        </span>
        <div className="border-b border-slate-400 py-1">
          <select {...formik.getFieldProps("residenceType")} className="w-full">
            <option value={""} className="hidden-option">
              Select
            </option>
            {residencyType.map((ele, i) => {
              return <option key={i}>{ele}</option>;
            })}
          </select>
        </div>
        {formik.touched.residenceType && formik.errors.residenceType && (
          <span className="text-red-500 text-xs font-bold">
            {formik.errors.residenceType}
          </span>
        )}
      </div>
      {formik.values.residenceType === "Other" ? (
        <div>
          <span className="font-semibold text-gray-500">
            Other Status of Residence Type *
          </span>
          <div className="border-b border-slate-400 py-1">
            <input
              placeholder=""
              type="text"
              {...formik.getFieldProps("otherResidenceType")}
              className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
            />
          </div>
        </div>
      ) : null}
    </>
  );
};

export default PersonalDetails;
