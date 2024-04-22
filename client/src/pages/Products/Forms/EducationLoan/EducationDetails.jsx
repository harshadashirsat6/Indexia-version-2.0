import { useState } from "react";
import {
  countries,
  educationFields,
} from "../../../../configs/selectorConfigs";

const EducationDetails = ({ formik }) => {
  //ADD COMMA IN AMOUNT INPUTS
  const [educationCost, setEducationCost] = useState("");

  const addCommas = (field, number) => {
    const cleanedInput = number.replace(/[^\d]/g, ""); // Remove non-numeric characters
    const formatter = new Intl.NumberFormat("en-IN");
    if (field === "educationcost") {
      setEducationCost(formatter.format(cleanedInput));
    }
  };

  return (
    <>
      <div>
        <span className="font-semibold text-gray-500">
          Country for Education *
        </span>
        <div className="flex gap-2 bg-gray-200/40 border-[1px] border-gray-400 rounded-md">
          <select
            className="bg-transparent w-full py-2.5"
            {...formik.getFieldProps("country")}
          >
            <option value={""} className="hidden-option">
              Select
            </option>
            {countries.map((ele) => {
              return (
                <option key={ele} value={ele}>
                  {ele}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div>
        <span className="font-semibold text-gray-500">Field of study*</span>
        <div className="flex gap-2 bg-gray-200/40 border-[1px] border-gray-400 rounded-md">
          <select
            className="bg-transparent w-full py-2.5"
            {...formik.getFieldProps("fieldOfStudy")}
          >
            <option value={""} className="hidden-option">
              Select
            </option>
            {educationFields.map((ele) => {
              return (
                <option key={ele} value={ele}>
                  {ele}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      {formik.values.fieldOfStudy === "Other" ? (
        <div>
          <span>Other Field of Study *</span>
          <div className="border-b border-slate-400 py-1">
            <input
              placeholder=""
              type="text"
              {...formik.getFieldProps("otherFieldOfStudy")}
              required
              className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
            />
          </div>
        </div>
      ) : null}
      <div>
        <span>Course Name *</span>
        <div className="border-b border-slate-400 py-1">
          <input
            placeholder=""
            type="text"
            {...formik.getFieldProps("courseName")}
            className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
          />
        </div>
        {formik.touched.courseName && formik.errors.courseName && (
          <span className="text-red-500 text-xs font-bold">
            {formik.errors.courseName}
          </span>
        )}
      </div>
      <div>
        <span>University *</span>
        <div className="border-b border-slate-400 py-1">
          <input
            placeholder=""
            type="text"
            {...formik.getFieldProps("university")}
            className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
          />
        </div>
        {formik.touched.university && formik.errors.university && (
          <span className="text-red-500 text-xs font-bold">
            {formik.errors.university}
          </span>
        )}
      </div>
      <div>
        <span>Institute Name *</span>
        <div className="border-b border-slate-400 py-1">
          <input
            placeholder=""
            type="text"
            {...formik.getFieldProps("instituteName")}
            className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
          />
        </div>
        {formik.touched.instituteName && formik.errors.instituteName && (
          <span className="text-red-500 text-xs font-bold">
            {formik.errors.instituteName}
          </span>
        )}
      </div>
      <div>
        <span>Enrollment Status *</span>
        <div className="flex gap-2 bg-gray-200/40 border-[1px] border-gray-400 rounded-md">
          <select
            className="bg-transparent w-full py-2.5"
            {...formik.getFieldProps("enrollmentStatus")}
          >
            <option value="Select" className="hidden-option">
              Select
            </option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
        {formik.touched.enrollmentStatus && formik.errors.enrollmentStatus && (
          <span className="text-red-500 text-xs font-bold">
            {formik.errors.enrollmentStatus}
          </span>
        )}
      </div>
      <div>
        <span>Course Duration *</span>
        <div className="border-b border-slate-400 py-1">
          <input
            placeholder="In Years"
            type="number"
            {...formik.getFieldProps("courseDuration")}
            className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
          />
        </div>
        {formik.touched.courseDuration && formik.errors.courseDuration && (
          <span className="text-red-500 text-xs font-bold">
            {formik.errors.courseDuration}
          </span>
        )}
      </div>
      <div>
        <span>Education Cost *</span>
        <div className="border-b border-slate-400 py-1">
          <input
            placeholder="Fees/Cost of entire Course in Lakhs"
            // {...formik.getFieldProps("educationCost")}
            type="text"
            name="educationCost"
            value={educationCost}
            onChange={(e) => {
              addCommas("educationcost", e.target.value);
              const formatedVal = e.target.value.split(",").join("");
              formik.setFieldValue("educationCost", formatedVal);
            }}
            className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
          />
        </div>
        {formik.touched.educationCost && formik.errors.educationCost && (
          <span className="text-red-500 text-xs font-bold">
            {formik.errors.educationCost}
          </span>
        )}
      </div>
    </>
  );
};

export default EducationDetails;
