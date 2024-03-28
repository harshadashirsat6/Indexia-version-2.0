import { useState, useEffect } from "react";
import { commercialPropertyTypes } from "../../../../configs/selectorConfigs";

const CustomInputs = ({ formik }) => {
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
      <div className="">
        <span className="font-semibold text-gray-500">
          New Property Type (Buying property) *
        </span>
        <div className="flex gap-2 bg-gray-200/40 border-[1px] border-gray-400 rounded-md">
          <select
            className="bg-transparent w-full disabled:cursor-not-allowed py-2.5"
            {...formik.getFieldProps("propertyType")}
          >
            <option value="">Select</option>
            {commercialPropertyTypes.map((ele, i) => {
              return (
                <option key={ele} value={ele}>
                  {ele}
                </option>
              );
            })}
          </select>
        </div>
        {formik.touched.propertyType && formik.errors.propertyType && (
          <span className="text-red-500 text-xs font-bold">
            {formik.errors.propertyType}
          </span>
        )}
      </div>
      {formik.values.propertyType === "Other" && (
        <div>
          <span className=" font-semibold text-gray-500">
            Mention Buying Property Type *
          </span>
          <div className="border-b border-slate-400 py-1">
            <input
              placeholder=""
              type="text"
              {...formik.getFieldProps("otherPropertyType")}
              required
              className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
            />
          </div>
        </div>
      )}
      <div>
        <span className="font-semibold text-gray-500">Property Value *</span>
        <div className="border-b border-slate-400 py-1">
          <input
            placeholder="In Lacs"
            type="number"
            {...formik.getFieldProps("propertyValue")}
            className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
          />
        </div>
        {formik.touched.propertyValue && formik.errors.propertyValue && (
          <span className="text-red-500 text-xs font-bold">
            {formik.errors.propertyValue}
          </span>
        )}
      </div>
      <div>
        <span className="font-semibold text-gray-500">Property Age *</span>
        <div className="border-b border-slate-400 py-1">
          <input
            placeholder="In Years"
            type="number"
            {...formik.getFieldProps("propertyAge")}
            className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
          />
        </div>
        {formik.touched.propertyAge && formik.errors.propertyAge && (
          <span className="text-red-500 text-xs font-bold">
            {formik.errors.propertyAge}
          </span>
        )}
      </div>
      <div>
        <span className="font-semibold text-gray-500">
          New Property State *
        </span>
        <div className="flex gap-2 bg-gray-200/40 border-[1px] border-gray-400 rounded-md">
          <select
            className="bg-transparent w-full py-2.5"
            {...formik.getFieldProps("newPropertyState")}
            value={selectedNewpropertyState}
            onChange={(e) => {
              formik.handleChange(e);
              setSelectedNewpropertyState(e.target.value);
            }}
          >
            <option value={""}>Select</option>
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
        <span className="font-semibold text-gray-500">New Property City *</span>
        <div className="flex gap-2 bg-gray-200/40 border-[1px] border-gray-400 rounded-md">
          <select
            className="bg-transparent w-full disabled:cursor-not-allowed py-2.5"
            disabled={!selectedNewpropertyState}
            {...formik.getFieldProps("newPropertyCity")}
          >
            <option value={""}>Select</option>
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
          New Property Pincode *
        </span>
        <div className="border-b border-slate-400 py-1">
          <input
            placeholder="Enter pincode"
            type="text"
            {...formik.getFieldProps("newPropertyPincode")}
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

export default CustomInputs;
