import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
//selectors
import { residencyType } from "../../../../configs/selectorConfigs";
// media
import { FaRegCalendarAlt } from "react-icons/fa";
import DatePicker from "../../../../components/DatePicker/DatePicker";

const ParentDetails = ({ formik }) => {

  const [activeCl, setActiveCl] = useState(true);

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
        <span className="font-semibold text-gray-500">Relation</span>
        <div className="flex gap-2 bg-gray-200/40 border-[1px] border-gray-400 rounded-md">
          <select
            className="bg-transparent w-full py-2.5"
            {...formik.getFieldProps("parentRelation")}
          >
            <option value={""}>Select</option>
            <option value="mother">Mother</option>
            <option value="father">Father</option>
          </select>
        </div>
        {formik.touched.parentRelation && formik.errors.parentRelation && (
          <span className="text-red-500 text-xs font-bold">
            {formik.errors.parentRelation}
          </span>
        )}
      </div>
      <div>
        <span className="font-semibold text-gray-500">Full name *</span>
        <div className="border-b border-slate-400 py-1">
          <input
            placeholder=""
            type="text"
            {...formik.getFieldProps("parentName")}
            className="w-full bg-transparent border-none outline-none placeholder:text-slate-700"
          />
        </div>
        {formik.touched.parentName && formik.errors.parentName && (
          <span className="text-red-500 text-xs font-bold">
            {formik.errors.parentName}
          </span>
        )}
      </div>
      <div>
        <span className="font-semibold text-gray-500">Mobile Number *</span>
        <div className="flex items-center space-x-2.5 border-b border-slate-400 py-1">
          <img src="/india.png" alt="india" className="w-7 h-4" />
          <span className="whitespace-nowrap">+91 -</span>
          <input
            placeholder=""
            type="number"
            {...formik.getFieldProps("parentContact")}
            className="w-full bg-transparent border-none outline-none placeholder:text-slate-700"
            readOnly
          />
        </div>
        {formik.touched.parentContact && formik.errors.parentContact && (
          <span className="text-red-500 text-xs font-bold">
            {formik.errors.parentContact}
          </span>
        )}
      </div>
      <div>
        <span className="font-semibold text-gray-500">Email Address *</span>
        <div className="border-b border-slate-400 py-1">
          <input
            placeholder=""
            type="email"
            {...formik.getFieldProps("parentEmail")}
            className="w-full bg-transparent border-none outline-none placeholder:text-slate-700"
          />
        </div>
        {formik.touched.parentEmail && formik.errors.parentEmail && (
          <span className="text-red-500 text-xs font-bold">
            {formik.errors.parentEmail}
          </span>
        )}
      </div>
      <div>
        <span className="font-semibold text-gray-500">
          Date of Birth (as per pan card) *
        </span>
        <div className="border-b border-slate-400 py-1 flex relative">
          <input
            placeholder="DD-MM-YYYY"
            type="text"
            onBlur={() => formik.setFieldTouched("parentDob", true)}
            value={formik.values.dateOfBirth}
            onChange={(e) => {
              const formattedDate = formatBirthdate(e.target.value);

              formik.setFieldValue("parentDob", formattedDate);
            }}
            className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
          />
          <div
            id="e;ljfeijfie"
            className="w-8 h-[inherit]  bg-gray-200 flex items-center justify-center rounded cursor-pointer"
            onClick={(e) => {
              if (e.target.id === "e;ljfeijfie") {
                setActiveCl((prev) => !prev);
                formik.setFieldTouched("parentDob", true);
              }
            }}
          >
            <FaRegCalendarAlt
              onClick={(e) => {
                setActiveCl((prev) => !prev);
                formik.setFieldTouched("parentDob", true);
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
        {formik.touched.parentDob && formik.errors.parentDob && (
          <span className="text-red-500 text-xs font-bold">
            {formik.errors.parentDob}
          </span>
        )}
      </div>
      <div className="col-span-1 sm:col-span-2">
        <span className="font-semibold text-gray-500">PAN Card Number *</span>
        <div className="border-b border-slate-400 py-1">
          <input
            placeholder="Enter Permanent Account Number"
            type="text"
            {...formik.getFieldProps("parentPanCardNum")}
            onChange={(e) =>
              formik.setFieldValue(
                "parentPanCardNum",
                e.target.value.toUpperCase()
              )
            }
            className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
          />
        </div>
        {formik.touched.parentPanCardNum && formik.errors.parentPanCardNum && (
          <span className="text-red-500 text-xs font-bold">
            {formik.errors.parentPanCardNum}
          </span>
        )}
      </div>
      <div>
        <span className="font-semibold text-gray-500">
          Current Residence State *
        </span>
        <div className="flex gap-2 bg-gray-200/40 border-[1px] border-gray-400 rounded-md">
          <select
            className="bg-transparent w-full py-2.5"
            value={selectedState}
            {...formik.getFieldProps("parentResidenceState")}
            onChange={(e) => {
              formik.handleChange(e);
              setSelectedState(e.target.value);
            }}
          >
            <option>Select</option>
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
        {formik.touched.parentResidenceState && formik.errors.parentResidenceState && (
          <span className="text-red-500 text-xs font-bold">
            {formik.errors.parentResidenceState}
          </span>
        )}
      </div>
      <div>
        <span className="font-semibold text-gray-500">
          Current Residence City *
        </span>
        <div className="flex gap-2 bg-gray-200/40 border-[1px] border-gray-400 rounded-md">
          <select
            className="bg-transparent w-full disabled:cursor-not-allowed py-2.5"
            disabled={!selectedState}
            {...formik.getFieldProps("parentResidenceCity")}
          >
            <option>Select</option>
            {cities.map((obj) => {
              return (
                <option key={obj.id} value={obj.name}>
                  {obj.name}
                </option>
              );
            })}
          </select>
        </div>
        {formik.touched.parentResidenceCity && formik.errors.parentResidenceCity && (
          <span className="text-red-500 text-xs font-bold">
            {formik.errors.parentResidenceCity}
          </span>
        )}
      </div>
      <div>
        <span className="font-semibold text-gray-500">
          Current Residence Pincode *
        </span>
        <div className="border-b border-slate-400 py-1">
          <input
            placeholder="Enter Pincode"
            type="number"
            {...formik.getFieldProps("parentResidencePincode")}
            maxLength={6}
            className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
          />
        </div>
        {formik.touched.parentResidencePincode && formik.errors.parentResidencePincode && (
          <span className="text-red-500 text-xs font-bold">
            {formik.errors.parentResidencePincode}
          </span>
        )}
      </div>
      <div>
        <span className="font-semibold text-gray-500">
          Status of Current Residence *
        </span>
        <div className="border-b border-slate-400 py-1">
          <select {...formik.getFieldProps("parentResidenceStatus")} className="w-full">
            <option value={""}>Select</option>
            {residencyType.map((ele, i) => {
              return <option key={i}>{ele}</option>;
            })}
          </select>
        </div>
        {formik.touched.parentResidenceStatus && formik.errors.parentResidenceStatus && (
          <span className="text-red-500 text-xs font-bold">
            {formik.errors.parentResidenceStatus}
          </span>
        )}
      </div>
    </>
  );
};

export default ParentDetails;
