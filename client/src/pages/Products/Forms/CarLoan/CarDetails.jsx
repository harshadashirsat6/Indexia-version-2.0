import { useState, useEffect } from "react";
import {
  transmissionTypes,
  buyingVehicleTypes,
} from "../../../../configs/selectorConfigs";

const CarDetails = ({ formik }) => {
  //new car registration state
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

  //ADD COMMA IN AMOUNT INPUTS
  const [valueOfOldCar, setValueOfOldCar] = useState("");
  const [carOnroadPrice, setCarOnroadPrice] = useState("");
  const [carShowroomPrice, setCarShowroomPrice] = useState("");
  const addCommas = (field, number) => {
    const cleanedInput = number.replace(/[^\d]/g, ""); // Remove non-numeric characters
    const formatter = new Intl.NumberFormat("en-IN");
    if (field === "valueofoldcar") {
      setValueOfOldCar(formatter.format(cleanedInput));
    } else if (field === "caronroadprice") {
      setCarOnroadPrice(formatter.format(cleanedInput));
    } else if (field === "carshowroomprice") {
      setCarShowroomPrice(formatter.format(cleanedInput));
    }
  };

  return (
    <>
      {/* <div className="col-span-2 sm:col-span-2">
        <h1 className="font-bold">Vehicle Details</h1>
      </div> */}
      <div>
        <span className="font-semibold text-gray-500">Buying vehicle type</span>
        <div className="flex gap-2 bg-gray-200/40 border-[1px] border-gray-400 rounded-md">
          <select
            className="bg-transparent w-full py-2.5"
            {...formik.getFieldProps("vehicleType")}
          >
            <option value={""}>Select</option>
            {buyingVehicleTypes.map((ele) => {
              return <option value={ele}>{ele}</option>;
            })}
          </select>
        </div>
        {formik.touched.buyCarType && formik.errors.buyCarType && (
          <span className="text-red-500 text-xs font-bold">
            {formik.errors.buyCarType}
          </span>
        )}
      </div>
      {formik.values.vehicleType === "Other" ? (
        <div>
          <span>Other Buying vehicle type </span>
          <div className="border-b border-slate-400 py-1">
            <input
              placeholder="ex:Camry, Civic, Corolla"
              type="text"
              {...formik.getFieldProps("otherVehicleType")}
              required
              className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
            />
          </div>
        </div>
      ) : null}
      <div>
        <span className="font-semibold text-gray-500">
          Buying vehicle Transmission Type
        </span>
        <div className="flex gap-2 bg-gray-200/40 border-[1px] border-gray-400 rounded-md">
          <select
            className="bg-transparent w-full py-2.5"
            {...formik.getFieldProps("transmission")}
          >
            <option value={""}>Select</option>
            {transmissionTypes.map((ele) => {
              return (
                <option key={ele} value={ele}>
                  {ele}
                </option>
              );
            })}
          </select>
        </div>
        {formik.touched.transmission && formik.errors.transmission && (
          <span className="text-red-500 text-xs font-bold">
            {formik.errors.transmission}
          </span>
        )}
      </div>
      {formik.values.transmission === "Other" ? (
        <div>
          <span>Other Buying vehicle type </span>
          <div className="border-b border-slate-400 py-1">
            <input
              placeholder="ex:Camry, Civic, Corolla"
              type="text"
              {...formik.getFieldProps("otherTransmissionType")}
              required
              className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
            />
          </div>
        </div>
      ) : null}
      <div>
        <span>Vehicle Manufacture</span>
        <div className="border-b border-slate-400 py-1">
          <input
            placeholder="ex: TATA,Volkswagen, Hyundai"
            type="text"
            {...formik.getFieldProps("carManufacturer")}
            className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
          />
        </div>
        {formik.touched.carManufacturer && formik.errors.carManufacturer && (
          <span className="text-red-500 text-xs font-bold">
            {formik.errors.carManufacturer}
          </span>
        )}
      </div>
      <div>
        <span>Vehicle Model</span>
        <div className="border-b border-slate-400 py-1">
          <input
            placeholder="ex:Camry, Civic, Corolla"
            type="text"
            {...formik.getFieldProps("carModel")}
            className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
          />
        </div>
        {formik.touched.carModel && formik.errors.carModel && (
          <span className="text-red-500 text-xs font-bold">
            {formik.errors.carModel}
          </span>
        )}
      </div>
      <div>
        <span className="font-semibold text-gray-500">
          Wants to buy a vehicle?
        </span>
        <div className="flex gap-2 bg-gray-200/40 border-[1px] border-gray-400 rounded-md">
          <select
            className="bg-transparent w-full py-2.5"
            {...formik.getFieldProps("buyCarType")}
          >
            <option value={""}>Select</option>
            <option value="new">New</option>
            <option value="old">Used</option>
          </select>
        </div>
        {formik.touched.buyCarType && formik.errors.buyCarType && (
          <span className="text-red-500 text-xs font-bold">
            {formik.errors.buyCarType}
          </span>
        )}
      </div>
      {formik.values.buyCarType === "old" ? (
        <>
          <div>
            <span>Registartion year of old vehicle</span>
            <div className="border-b border-slate-400 py-1">
              <inputc
                placeholder=""
                type="text"
                {...formik.getFieldProps("oldVehicleRegistrationYear")}
                required
                className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
              />
            </div>
          </div>
          <div>
            <span>Old Vehicle number</span>
            <div className="border-b border-slate-400 py-1">
              <input
                placeholder=""
                type="text"
                name="oldCarVehicleNumber"
                {...formik.getFieldProps("oldVehicleNumber")}
                required
                className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
              />
            </div>
          </div>
          <div>
            <span>Approximate value of old car</span>
            <div className="border-b border-slate-400 py-1">
              <input
                placeholder=""
                type="text"
                // {...formik.getFieldProps("valueOfOldCar")}
                name="valueOfOldCar"
                value={valueOfOldCar}
                onChange={(e) => {
                  addCommas("valueofoldcar", e.target.value);
                  const formatedVal = e.target.value.split(",").join("");
                  formik.setFieldValue("valueOfOldCar", formatedVal);
                }}
                required
                className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
              />
            </div>
          </div>
          <div>
            <span>Old Car insurance number (if any)</span>
            <div className="border-b border-slate-400 py-1">
              <input
                placeholder="If any"
                type="text"
                {...formik.getFieldProps("carInsuranceNumber")}
                className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
              />
            </div>
          </div>
        </>
      ) : formik.values.buyCarType === "new" ? (
        <>
          <div>
            <span>Car on-road price</span>
            <div className="border-b border-slate-400 py-1">
              <input
                placeholder=""
                type="text"
                // {...formik.getFieldProps("carOnroadPrice")}
                name="carOnroadPrice"
                value={carOnroadPrice}
                onChange={(e) => {
                  addCommas("caronroadprice", e.target.value);
                  const formatedVal = e.target.value.split(",").join("");
                  formik.setFieldValue("carOnroadPrice", formatedVal);
                }}
                required
                className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
              />
            </div>
          </div>
          <div>
            <span>Car ex-showroom price</span>
            <div className="border-b border-slate-400 py-1">
              <input
                placeholder=""
                type="text"
                name="carShowroomPrice"
                value={carShowroomPrice}
                // {...formik.getFieldProps("carShowroomPrice")}
                onChange={(e) => {
                  addCommas("carshowroomprice", e.target.value);
                  const formatedVal = e.target.value.split(",").join("");
                  formik.setFieldValue("carShowroomPrice", formatedVal);
                }}
                required
                className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
              />
            </div>
          </div>
          <div>
            <span className="font-semibold text-gray-500">
              Car Insurance Type
            </span>
            <div className="flex gap-2 bg-gray-200/40 border-[1px] border-gray-400 rounded-md">
              <select
                className="bg-transparent w-full py-2.5"
                name="carInsuranceType"
                {...formik.getFieldProps("carInsuranceType")}
                required
              >
                <option value={""}>Select</option>
                <option value="self">Self</option>
                <option value="indexia-finance">Indexia Policy</option>
              </select>
            </div>
          </div>
          <div>
            <span className="font-semibold text-gray-500">
              Registartion state for new car *
            </span>
            <div className="flex gap-2 bg-gray-200/40 border-[1px] border-gray-400 rounded-md">
              <select
                className="bg-transparent w-full py-2.5"
                value={selectedState}
                {...formik.getFieldProps("newCarRegistrationState")}
                onChange={(e) => {
                  formik.handleChange(e);
                  setSelectedState(e.target.value);
                }}
                required
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
          </div>
        </>
      ) : null}
    </>
  );
};

export default CarDetails;
