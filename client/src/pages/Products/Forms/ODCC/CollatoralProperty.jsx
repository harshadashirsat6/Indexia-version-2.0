import { useState, useEffect } from "react";

const CollatoralProperty = ({ formik, category }) => {
  //collatoral state and city
  const [states, setPropertyStates] = useState([]);
  const [selectedCollatoralState, setSelectedCollatoralState] = useState("");
  var newPropertyStateConfig = {
    url: "https://api.countrystatecity.in/v1/countries/In/states",
    key: "N00wMDJleEpjQ09wTjBhN0VSdUZxUGxWMlJKTGY1a0tRN0lpakh5Vw==",
  };
  const getStates = async () => {
    await fetch(newPropertyStateConfig.url, {
      headers: { "X-CSCAPI-KEY": newPropertyStateConfig.key },
    })
      .then((resp) => resp.json())
      .then((resp) => {
        setPropertyStates(resp);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getStates();
  }, []);
  // get cities after selecting state
  const [propertyCities, setPropertyCities] = useState([]);
  var newPropertyCityConfig = {
    url: `https://api.countrystatecity.in/v1/countries/IN/states/${selectedCollatoralState}/cities`,
    key: "N00wMDJleEpjQ09wTjBhN0VSdUZxUGxWMlJKTGY1a0tRN0lpakh5Vw==",
  };
  const getCities = async () => {
    await fetch(newPropertyCityConfig.url, {
      headers: { "X-CSCAPI-KEY": newPropertyCityConfig.key },
    })
      .then((resp) => resp.json())
      .then((resp) => {
        console.log("cities", resp);
        setPropertyCities(resp);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    if (selectedCollatoralState) {
      getCities();
    }
  }, [selectedCollatoralState]);

  //ADD COMMA IN AMOUNT INPUTS
  const [collatoralPropertyValue, setCollatoralPropertyValue] = useState("");

  const addCommas = (field, number) => {
    const cleanedInput = number.replace(/[^\d]/g, ""); // Remove non-numeric characters
    const formatter = new Intl.NumberFormat("en-IN");

    if (field === "propertyval") {
      setCollatoralPropertyValue(formatter.format(cleanedInput));
    }
  };

  return (
    <>
      <div>
        <span className="font-semibold text-gray-500">
          Collateral Property Market Value (Approx) *
        </span>
        <div className="border-b border-slate-400 py-1">
          <input
            // type="Number"
            // {...formik.getFieldProps("collatoralPropertyValue")}
            type="text"
            name="collatoralPropertyValue"
            value={collatoralPropertyValue}
            onChange={(e) => {
              addCommas("propertyval", e.target.value);
              const formatedVal = e.target.value.split(",").join("");
              formik.setFieldValue("collatoralPropertyValue", formatedVal);
            }}
            required
            className="w-full bg-transparent border-none outline-none placeholder:text-slate-700"
          />
        </div>
      </div>
      <div>
        <span className="font-semibold text-gray-500">
          Collateral Property Age (in years) *
        </span>
        <div className="border-b border-slate-400 py-1">
          <input
            type="Number"
            {...formik.getFieldProps("collateralPropertyAge")}
            className="w-full bg-transparent border-none outline-none placeholder:text-slate-700"
            required
          />
        </div>
      </div>
      <div>
        <span className="font-semibold text-gray-500">
          Collateral Property State *
        </span>
        <div className="flex gap-2 bg-gray-200/40 border-[1px] border-gray-400 rounded-md">
          <select
            className="bg-transparent w-full py-2.5"
            name="selectedCollatoralState"
            value={selectedCollatoralState}
            {...formik.getFieldProps("collatoralPropertyState")}
            onChange={(e) => {
              formik.handleChange(e);
              setSelectedCollatoralState(e.target.value);
              console.log("e.target.value", e.target.value);
            }}
            required
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
      </div>
      <div>
        <span className="font-semibold text-gray-500">
          Collateral Property City *
        </span>
        <div className="flex gap-2 bg-gray-200/40 border-[1px] border-gray-400 rounded-md">
          <select
            className="bg-transparent w-full disabled:cursor-not-allowed py-2.5"
            disabled={!selectedCollatoralState}
            {...formik.getFieldProps("collatoralPropertyCity")}
            required
          >
            <option value={""} className="hidden-option">
              Select
            </option>
            {propertyCities.map((obj) => {
              return (
                <option key={obj.id} value={obj.name}>
                  {obj.name}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div>
        <span className=" font-semibold text-gray-500">
          Collateral Property Pincode *
        </span>
        <div className="border-b border-slate-400 py-1">
          <input
            placeholder="Enter pincode"
            type="text"
            {...formik.getFieldProps("collatoralPropertyPincode")}
            maxLength={6}
            className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
            required
          />
        </div>
      </div>
    </>
  );
};

export default CollatoralProperty;
