import { useState, useEffect } from "react";
import { homeLoanPropertyTypes } from "../../../../configs/selectorConfigs";

const NewProperty = ({ formik }) => {
  //New property state and city
  const [newpropertyStates, setNewpropertyState] = useState([]);
  const [selectedNewpropertyState, setSelectedNewpropertyState] = useState("");
  var newPropertyStateConfig = {
    url: "https://api.countrystatecity.in/v1/countries/In/states",
    key: "N00wMDJleEpjQ09wTjBhN0VSdUZxUGxWMlJKTGY1a0tRN0lpakh5Vw==",
  };
  const getNewPropertyStates = async () => {
    await fetch(newPropertyStateConfig.url, {
      headers: { "X-CSCAPI-KEY": newPropertyStateConfig.key },
    })
      .then((resp) => resp.json())
      .then((resp) => {
        setNewpropertyState(resp);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getNewPropertyStates();
  }, []);
  // get cities after selecting state
  const [newpropertyCities, setNewpropertyCities] = useState([]);
  var newPropertyCityConfig = {
    url: `https://api.countrystatecity.in/v1/countries/IN/states/${selectedNewpropertyState}/cities`,
    key: "N00wMDJleEpjQ09wTjBhN0VSdUZxUGxWMlJKTGY1a0tRN0lpakh5Vw==",
  };
  const getNewPropertyCities = async () => {
    await fetch(newPropertyCityConfig.url, {
      headers: { "X-CSCAPI-KEY": newPropertyCityConfig.key },
    })
      .then((resp) => resp.json())
      .then((resp) => {
        setNewpropertyCities(resp);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    if (selectedNewpropertyState) {
      getNewPropertyCities();
    }
  }, [selectedNewpropertyState]);

  return (
    <>
      {/* <div className="col-span-1 sm:col-span-2">
        <span className="font-semibold text-gray-500 underline underline-offset-4">
          Where are you planning to buy property
        </span>
      </div> */}
      <div className="">
        <span className="font-semibold text-gray-500">
          Buying Property Type (Buying property) *
        </span>
        <div className="flex gap-2 bg-gray-200/40 border-[1px] border-gray-400 rounded-md">
          <select
            className="bg-transparent w-full disabled:cursor-not-allowed py-2.5"
            {...formik.getFieldProps("newPropertyType")}
          >
            <option value="">Select</option>
            {homeLoanPropertyTypes.map((ele, i) => {
              return (
                <option key={ele} value={ele}>
                  {ele}
                </option>
              );
            })}
          </select>
        </div>
        {formik.touched.newPropertyType && formik.errors.newPropertyType && (
          <span className="text-red-500 text-xs font-bold">
            {formik.errors.newPropertyType}
          </span>
        )}
      </div>
      {formik.values.newPropertyType === "Other" && (
        <div>
          <span className=" font-semibold text-gray-500">
            Buying Property Type *
          </span>
          <div className="border-b border-slate-400 py-1">
            <input
              placeholder=""
              type="text"
              {...formik.getFieldProps("otherNewPropertyType")}
              required
              className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
            />
          </div>
        </div>
      )}
      <div>
        <span className="font-semibold text-gray-500">
          Buying Property Age *
        </span>
        <div className="border-b border-slate-400 py-1">
          <input
            placeholder="In Years (0 if property is new/under construction)"
            type="number"
            {...formik.getFieldProps("newPropertyAge")}
            className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
          />
        </div>
        {/* {formik.touched.propertyAge && formik.errors.propertyAge && (
          <span className="text-red-500 text-xs font-bold">
            {formik.errors.propertyAge}
          </span>
        )} */}
      </div>
      <div>
        <span className="font-semibold text-gray-500">
          Buying Property State *
        </span>
        <div className="flex gap-2 bg-gray-200/40 border-[1px] border-gray-400 rounded-md">
          <select
            className="bg-transparent w-full py-2.5"
            {...formik.getFieldProps("newPropertyState")}
            onChange={(e) => {
              formik.handleChange(e);
              setSelectedNewpropertyState(e.target.value);
            }}
          >
            <option value={""} className="hidden-option">Select</option>
            {newpropertyStates
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
        {formik.touched.newPropertyState && formik.errors.newPropertyState && (
          <span className="text-red-500 text-xs font-bold">
            {formik.errors.newPropertyState}
          </span>
        )}
      </div>
      <div>
        <span className="font-semibold text-gray-500">
          Buying Property City *
        </span>
        <div className="flex gap-2 bg-gray-200/40 border-[1px] border-gray-400 rounded-md">
          <select
            className="bg-transparent w-full disabled:cursor-not-allowed py-2.5"
            disabled={!selectedNewpropertyState}
            {...formik.getFieldProps("newPropertyCity")}
          >
            <option value={""} className="hidden-option">Select</option>
            {newpropertyCities.map((obj) => {
              return (
                <option key={obj.id} value={obj.name}>
                  {obj.name}
                </option>
              );
            })}
          </select>
        </div>
        {formik.touched.newPropertyCity && formik.errors.newPropertyCity && (
          <span className="text-red-500 text-xs font-bold">
            {formik.errors.newPropertyCity}
          </span>
        )}
      </div>
      <div>
        <span className=" font-semibold text-gray-500">
          Buying Property Pincode *
        </span>
        <div className="border-b border-slate-400 py-1">
          <input
            placeholder="Enter pincode"
            type="text"
            {...formik.getFieldProps("newPropertyPincode")}
            maxLength={6}
            className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
          />
        </div>
        {formik.touched.newPropertyPincode &&
          formik.errors.newPropertyPincode && (
            <span className="text-red-500 text-xs font-bold">
              {formik.errors.newPropertyPincode}
            </span>
          )}
      </div>
    </>
  );
};

export default NewProperty;
