import { transmissionTypes } from "../../../../configs/selectorConfigs";

const CarDetails = ({ formik }) => {
  return (
    <>
      <div className="col-span-2 sm:col-span-2">
        <h1 className="font-bold">Vehicle Details</h1>
      </div>
      <div>
        <span className="font-semibold text-gray-500">Transmission</span>
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
      <div>
        <span>Car Manufacture</span>
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
        <span>Car Model</span>
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
        <span className="font-semibold text-gray-500">Wants to buy a car?</span>
        <div className="flex gap-2 bg-gray-200/40 border-[1px] border-gray-400 rounded-md">
          <select
            className="bg-transparent w-full py-2.5"
            {...formik.getFieldProps("buyCarType")}
          >
            <option value={""}>Select</option>
            <option value="new">New</option>
            <option value="old">Old</option>
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
            <span>Registartion year of old car</span>
            <div className="border-b border-slate-400 py-1">
              <input
                placeholder=""
                type="text"
                {...formik.getFieldProps("oldVehicleRegistrationYear")}
                required
                className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
              />
            </div>
          </div>
          <div>
            <span>Old car number</span>
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
                {...formik.getFieldProps("valueOfOldCar")}
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
                {...formik.getFieldProps("carOnroadPrice")}
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
                {...formik.getFieldProps("carShowroomPrice")}
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
        </>
      ) : null}
    </>
  );
};

export default CarDetails;
