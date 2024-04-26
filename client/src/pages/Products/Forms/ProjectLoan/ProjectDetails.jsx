import { useState, useEffect } from "react";
//selectors
import { projectTypes } from "../../../../configs/selectorConfigs";

const ProjectDetails = ({ formik }) => {
  //project state, city
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedProjectState] = useState("");
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

  //ADD COMMA IN AMOUNT INPUTS
  const [projectCost, setProjectCost] = useState("");
  const [ownInvestmentOnProject, setOwnInvestmentOnProject] = useState("");

  const addCommas = (field, number) => {
    const cleanedInput = number.replace(/[^\d]/g, ""); // Remove non-numeric characters
    const formatter = new Intl.NumberFormat("en-IN");
    if (field === "projectcost") {
      setProjectCost(formatter.format(cleanedInput));
    } else if ((field = "owninvestmentonproject")) {
      setOwnInvestmentOnProject(formatter.format(cleanedInput));
    }
  };

  return (
    <>
      {/* <div className="">
        <span className="font-semibold text-gray-500">Project Objective *</span>
        <div className="border-b border-slate-400 py-1">
          <input
            placeholder="Goal and Objective of project"
            type="text"
            {...formik.getFieldProps("projectObjective")}
            className="bg-transparent w-full outline-none border-none placeholder:text-slate-500 placeholder:text-xs"
          />
        </div>
        {formik.touched.projectObjective && formik.errors.projectObjective && (
          <span className="text-red-500 text-xs font-bold">
            {formik.errors.projectObjective}
          </span>
        )}
      </div>
      <div className="col-span-1 sm:col-span-2">
        <span className="font-semibold text-gray-500">
          Project Description *
        </span>
        <div className="border-b border-slate-400 py-1">
          <textarea
            placeholder="ex: detail explaination about sector, field, sector, flow, material"
            type="text"
            {...formik.getFieldProps("projectDescription")}
            className="bg-transparent w-full outline-none border-none placeholder:text-slate-500 placeholder:text-xs"
          />
        </div>
        {formik.touched.projectDescription &&
          formik.errors.projectDescription && (
            <span className="text-red-500 text-xs font-bold">
              {formik.errors.projectDescription}
            </span>
          )}
      </div>
      <div className="col-span-1 sm:col-span-2">
        <span className="font-semibold text-gray-500">
          Scope Of Work and Deliverables *
        </span>
        <div className="border-b border-slate-400 py-1">
          <input
            placeholder="Work & Deliverables"
            type="text"
            {...formik.getFieldProps("scopeOfWorkandDeliverables")}
            className="bg-transparent w-full outline-none border-none placeholder:text-slate-500 placeholder:text-xs"
          />
        </div>
        {formik.touched.scopeOfWorkandDeliverables &&
          formik.errors.scopeOfWorkandDeliverables && (
            <span className="text-red-500 text-xs font-bold">
              {formik.errors.scopeOfWorkandDeliverables}
            </span>
          )}
      </div> */}
      <div>
        <span className="font-semibold text-gray-500">Project Type *</span>
        <div className="border-b border-slate-400 py-1 w-full">
          <select className="w-full" {...formik.getFieldProps("projectType")}>
            <option className="hidden-option" value={""}  >Select</option>
            {projectTypes.map((ele, i) => {
              return (
                <option key={i} value={ele}>
                  {ele}
                </option>
              );
            })}
          </select>
        </div>
        {formik.touched.projectType && formik.errors.projectType && (
          <span className="text-red-500 text-xs font-bold">
            {formik.errors.projectType}
          </span>
        )}
      </div>
      {formik.values.projectType === "Other" && (
        <div>
          <div>
            <span className=" font-semibold text-gray-500">
              Mention Project Type *
            </span>
            <div className="border-b border-slate-400 py-1">
              <input
                placeholder=""
                type="text"
                {...formik.getFieldProps("otherProjectType")}
                className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
              />
            </div>
            {formik.touched.otherProjectType &&
              formik.errors.otherProjectType && (
                <span className="text-red-500 text-xs font-bold">
                  {formik.errors.otherProjectType}
                </span>
              )}
          </div>
        </div>
      )}
      <div className="">
        <span className="font-semibold text-gray-500">
          Total Project Cost *
        </span>
        <div className="border-b border-slate-400 py-1">
          <input
            placeholder=""
            // type="number"
            // {...formik.getFieldProps("projectCost")}
            type="text"
            name="projectCost"
            value={projectCost}
            onChange={(e) => {
              addCommas("projectcost", e.target.value);
              const formatedVal = e.target.value.split(",").join("");
              formik.setFieldValue("projectCost", formatedVal);
            }}
            className="bg-transparent w-full outline-none border-none placeholder:text-slate-500 placeholder:text-xs"
          />
        </div>
        {formik.touched.projectCost && formik.errors.projectCost && (
          <span className="text-red-500 text-xs font-bold">
            {formik.errors.projectCost}
          </span>
        )}
      </div>
      <div>
        <span className="font-semibold text-gray-500">
          Project Start Date *
        </span>
        <div className="border-b border-slate-400 py-1">
          <input
            placeholder="DD-MM-YYYY"
            type="date"
            {...formik.getFieldProps("projectStartDate")}
            className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
          />
        </div>
        {formik.touched.projectStartDate && formik.errors.projectStartDate && (
          <span className="text-red-500 text-xs font-bold">
            {formik.errors.projectStartDate}
          </span>
        )}
      </div>
      <div>
        <span className="font-semibold text-gray-500">
          Project Date of Completion *
        </span>
        <div className="border-b border-slate-400 py-1">
          <input
            placeholder="DD-MM-YYYY"
            type="date"
            {...formik.getFieldProps("expectedDateOfComletion")}
            className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
          />
        </div>
        {formik.touched.expectedDateOfComletion &&
          formik.errors.expectedDateOfComletion && (
            <span className="text-red-500 text-xs font-bold">
              {formik.errors.expectedDateOfComletion}
            </span>
          )}
      </div>
      {/* <div>
        <span className=" font-semibold text-gray-500">
          Project Completion Time *
        </span>
        <div className="border-b border-slate-400 py-1">
          <input
            placeholder="In months"
            type="number"
            {...formik.getFieldProps("projectCompletionTime")}
            className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
          />
        </div>
        {formik.touched.projectCompletionTime &&
          formik.errors.projectCompletionTime && (
            <span className="text-red-500 text-xs font-bold">
              {formik.errors.projectCompletionTime}
            </span>
          )}
      </div> */}
      <div>
        <span className=" font-semibold text-gray-500">
          Own investment on project *
        </span>
        <div className="border-b border-slate-400 py-1">
          <input
            placeholder=""
            // type="number"
            // {...formik.getFieldProps("ownInvestmentOnProject")}
            type="text"
            name="ownInvestmentOnProject"
            value={ownInvestmentOnProject}
            onChange={(e) => {
              addCommas("owninvestmentonproject", e.target.value);
              const formatedVal = e.target.value.split(",").join("");
              formik.setFieldValue("ownInvestmentOnProject", formatedVal);
            }}
            className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
          />
        </div>
        {formik.touched.ownInvestmentOnProject &&
          formik.errors.ownInvestmentOnProject && (
            <span className="text-red-500 text-xs font-bold">
              {formik.errors.ownInvestmentOnProject}
            </span>
          )}
      </div>
      {/* <div>
        <span className="font-semibold text-gray-500">Project State *</span>
        <div className="flex gap-2 bg-gray-200/40 border-[1px] border-gray-400 rounded-md">
          <select
            className="bg-transparent w-full py-2.5"
            value={selectedState}
            {...formik.getFieldProps("projectState")}
            onChange={(e) => {
              formik.handleChange(e);
              setSelectedProjectState(e.target.value);
            }}
          >
            <option value={""}>Select</option>
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
        {formik.touched.projectState && formik.errors.projectState && (
          <span className="text-red-500 text-xs font-bold">
            {formik.errors.projectState}
          </span>
        )}
      </div>
      <div>
        <span className="font-semibold text-gray-500">Project City *</span>
        <div className="flex gap-2 bg-gray-200/40 border-[1px] border-gray-400 rounded-md">
          <select
            className="bg-transparent w-full disabled:cursor-not-allowed py-2.5"
            disabled={!selectedState}
            {...formik.getFieldProps("projectCity")}
          >
            <option value={""}>Select</option>
            {cities.map((obj) => {
              return (
                <option key={obj.id} value={obj.name}>
                  {obj.name}
                </option>
              );
            })}
          </select>
        </div>
        {formik.touched.projectCity && formik.errors.projectCity && (
          <span className="text-red-500 text-xs font-bold">
            {formik.errors.projectCity}
          </span>
        )}
      </div>
      <div>
        <span className=" font-semibold text-gray-500">Project Pincode *</span>
        <div className="border-b border-slate-400 py-1">
          <input
            placeholder="Enter pincode"
            type="text"
            {...formik.getFieldProps("projectPincode")}
            className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
          />
        </div>
        {formik.touched.projectPincode && formik.errors.projectPincode && (
          <span className="text-red-500 text-xs font-bold">
            {formik.errors.projectPincode}
          </span>
        )}
      </div> */}
    </>
  );
};

export default ProjectDetails;
