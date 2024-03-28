import { useState, useEffect } from "react";

const CustomInputs = ({ formik }) => {
  //lease property state, city
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

  return (
    <>
      <div>
        <span className="font-semibold text-gray-500">
          Monthly Income Through Lease
        </span>
        <div className="border-b border-slate-400 py-1">
          <input
            placeholder=""
            type="number"
            {...formik.getFieldProps("monthlyIncomeThroughLease")}
            className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
          />
        </div>
        {formik.touched.monthlyIncomeThroughLease &&
          formik.errors.monthlyIncomeThroughLease && (
            <span className="text-red-500 text-xs font-bold">
              {formik.errors.monthlyIncomeThroughLease}
            </span>
          )}
      </div>
      <div>
        <span className="font-semibold text-gray-500">
          Total amount to be recevied from lease
        </span>
        <div className="border-b border-slate-400 py-1">
          <input
            placeholder=""
            type="number"
            {...formik.getFieldProps("totalAmountToBeReceivedFromLease")}
            className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
          />
        </div>
        {formik.touched.totalAmountToBeReceivedFromLease &&
          formik.errors.totalAmountToBeReceivedFromLease && (
            <span className="text-red-500 text-xs font-bold">
              {formik.errors.totalAmountToBeReceivedFromLease}
            </span>
          )}
      </div>
      <div>
        <span className="font-semibold text-gray-500">
          Lease Property Duration
        </span>
        <div className="border-b border-slate-400 py-1">
          <input
            placeholder="In years"
            type="number"
            {...formik.getFieldProps("leasePropertyDuration")}
            className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
          />
        </div>
        {formik.touched.leasePropertyDuration &&
          formik.errors.leasePropertyDuration && (
            <span className="text-red-500 text-xs font-bold">
              {formik.errors.leasePropertyDuration}
            </span>
          )}
      </div>
      <div>
        <span className="font-semibold text-gray-500">
          Lease Property Value Approx
        </span>
        <div className="border-b border-slate-400 py-1">
          <input
            placeholder=""
            type="number"
            {...formik.getFieldProps("leasePropertyValue")}
            className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
          />
        </div>
        {formik.touched.leasePropertyValue &&
          formik.errors.leasePropertyValue && (
            <span className="text-red-500 text-xs font-bold">
              {formik.errors.leasePropertyValue}
            </span>
          )}
      </div>
      <div>
        <span className="font-semibold text-gray-500">Lease Property Age</span>
        <div className="border-b border-slate-400 py-1">
          <input
            placeholder=""
            type="number"
            {...formik.getFieldProps("leasePropertyAge")}
            className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
          />
        </div>
        {formik.touched.leasePropertyAge && formik.errors.leasePropertyAge && (
          <span className="text-red-500 text-xs font-bold">
            {formik.errors.leasePropertyAge}
          </span>
        )}
      </div>
      <div>
        <span className="font-semibold text-gray-500">
          Lease Property State *
        </span>
        <div className="flex gap-2 bg-gray-200/40 border-[1px] border-gray-400 rounded-md">
          <select
            className="bg-transparent w-full py-2.5"
            value={selectedState}
            {...formik.getFieldProps("leasePropertyState")}
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
        {formik.touched.leasePropertyState &&
          formik.errors.leasePropertyState && (
            <span className="text-red-500 text-xs font-bold">
              {formik.errors.leasePropertyState}
            </span>
          )}
      </div>
      <div>
        <span className="font-semibold text-gray-500">
          Lease Property City *
        </span>
        <div className="flex gap-2 bg-gray-200/40 border-[1px] border-gray-400 rounded-md">
          <select
            className="bg-transparent w-full disabled:cursor-not-allowed py-2.5"
            disabled={!selectedState}
            {...formik.getFieldProps("leasePropertyCity")}
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
        {formik.touched.leasePropertyCity &&
          formik.errors.leasePropertyCity && (
            <span className="text-red-500 text-xs font-bold">
              {formik.errors.leasePropertyCity}
            </span>
          )}
      </div>
      <div>
        <span className="font-semibold text-gray-500">
          Lease Property Pincode *
        </span>
        <div className="border-b border-slate-400 py-1">
          <input
            placeholder="Enter Pincode"
            type="number"
            {...formik.getFieldProps("leasePropertyPincode")}
            className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
          />
        </div>
        {formik.touched.leasePropertyPincode &&
          formik.errors.leasePropertyPincode && (
            <span className="text-red-500 text-xs font-bold">
              {formik.errors.leasePropertyPincode}
            </span>
          )}
      </div>
      {/* <div>
        <span className="font-semibold text-gray-500 ">
          Total Annual Income
        </span>
        <div className="border-b border-slate-400 py-1 bg-blue-50 px-1">
          <input
            placeholder=""
            type="number"
            {...formik.getFieldProps("totalIncome")}
            value={
              formik.values.employmentType === "Salaried"
                ? Number(formik.values.monthlyIncome) * 12 +
                  Number(formik.values.monthlyIncomeThroughLease) * 12
                : Number(formik.values.previousYearNetProfit) +
                  Number(formik.values.monthlyIncomeThroughLease) * 12
            }
            className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
            readOnly
          />
        </div>
      </div> */}
    </>
  );
};

export default CustomInputs;
