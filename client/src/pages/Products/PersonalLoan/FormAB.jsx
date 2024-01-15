import React,{useState,useRef, useEffect} from 'react'
import YupString from '../../../validation/form'
import { loanTenure, residencyType,employmentType,employerType,primaryBankAccount,incomeRecievedAs } from '../../../configs/selectorConfigs';

// import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";

import { useSelector, useDispatch } from "react-redux";
import {
  setFormData,
  setShowSubmitLoanFormPaymentModal,
} from "../../../store/appSlice";

const FormAB = ({states,cities,setSelectedState,selectedState}) => {
    const { formData} = useSelector((store) => store.app);
    // const [checkBox1, setCheckBox1] = useState(false);
    const dispatch = useDispatch();

    const [checkBox2, setCheckBox2] = useState(true);
    const [checkBox3,setCheckBox3] = useState(true)
    // const [checkBox3, setCheckBox3] = useState(false);

    const [persionalLoanObj,setPersionalUseObj] = useState({...formData})

    const [persionalConditionalObj,setPersionalConditionalUseObj] = useState({
      primaryBankAccount:''
    })
  
    const [touchedInputs, setTouchedInputs] = useState({
        name:false, dateOfBirth:false, state:false,city:false,
        pincode:false,residencyType:false,panCardNum:false,
        loanAmount:false,loanTenure:false,employmentType:false,
        employerType:false,employerName:false,yearlyIncome:false,
        monthlyIncome:false,existingEmi:false,contact:false,
        email:false
        
        // primaryBankAccount:false,primaryBankAccountCon:false
    });

    // ref 
    const renderInputBankRef = useRef()
   
   
    function checkAge() {
        const currentDate = new Date();
        const selectedDate = new Date(persionalLoanObj.dateOfBirth);
        const age = currentDate.getFullYear() - selectedDate.getFullYear();
        // Adjust the age check as per your specific requirements
        return age <= 21;
    }
    function calculateEmi(){
      if (persionalLoanObj.existingEmi !== 0) {
        const salary = persionalLoanObj.monthlyIncome || persionalLoanObj.yearlyIncome / 12;
        const emi = salary * 0.8;
        if (persionalLoanObj.existingEmi > emi) {
          return true;
        }
      }
      return false
    }

    const handaleMail  = ()=>{
      if(!persionalLoanObj?.email?.includes('@gmail.com')){
        return true
      }
      return false
    }

    const handaleContact  = ()=>{
      if(persionalLoanObj?.contact?.length!==10){
        return true
      }
      return false
    }
    const validationSchema = {
        name: YupString(persionalLoanObj.name).min(5,'Full Name  must be at least 5 characters')
        .required("Full name should be filled"),
        dateOfBirth: YupString(persionalLoanObj.dateOfBirth).test(checkAge,'Must be at least 21 years old')
        .required("Date of birth required"),
        state: YupString(persionalLoanObj.state).required("State should be filled"),
        city: YupString(persionalLoanObj.city).required("City should be filled"),
        pincode:YupString(persionalLoanObj.pincode).isInt('Pincode must be a number').required("Pincode should be filled"),
        residencyType: YupString(persionalLoanObj.residencyType).required("Select residency type"),
        panCardNum: YupString(persionalLoanObj.panCardNum).required("Pancard number should be filled")
        .length(10, "Pan card number should be 10 characters"),
        loanAmount: YupString(persionalLoanObj.loanAmount)
        .isInt("Loan amount must be a number")
        .minNumber(100000, "min 1 lakh")
        .required("Loan amount should be filled"),
        loanTenure:YupString(persionalLoanObj.loanTenure).required("Select loan tenure "),
        employmentType: YupString(persionalLoanObj.employmentType).required("Select Employment type"),
        employerType: YupString(persionalLoanObj.employerType).required("Select employer type"),
        employerName: YupString(persionalLoanObj.employerName).required("Select employer name"),
        yearlyIncome:YupString(persionalLoanObj.yearlyIncome||'').required("Please enter valid income"),
        monthlyIncome:YupString(persionalLoanObj.monthlyIncome||'')
        .minNumber(12000, "Salary min 12k").required("Please enter valid income"),
        existingEmi: YupString(persionalLoanObj.existingEmi||'').test(calculateEmi,'EMI should be less than 80% of your monthly income').required("EMI should be filled"),
        email: YupString(persionalLoanObj.email).test(handaleMail,'Please enter correct email').required("Email should be filled"),
        contact: YupString(persionalLoanObj.contact).test(handaleContact, "Contact number must be of 10 digits").required("Contact number should be filled"),

      };


    const handaleChange = (e)=>{
        setPersionalUseObj(prev=>({...prev,[e.target.name]:e.target.value}))
    }



//   console.log(validationSchema.state.validate(),persionalLoanObj.state)

const handleSubmit = (e) => {
    e.preventDefault(); // Corrected to include parentheses
    const val =   persionalLoanObj.employmentType ==='Salaried'?'monthlyIncome':'yearlyIncome' 

      let active = true

      for (const obj in validationSchema){
        console.log(validationSchema[obj].validate())
          if(active &&validationSchema[obj].validate() &&(['monthlyIncome','yearlyIncome']
          .includes(obj)&& validationSchema[val].validate()) ){

            console.log('fnjefjkn','-0399ru',obj)
            active=false
          }       
      }
      setTouchedInputs({
        name:true, dateOfBirth:true, state:true,city:true,
        pincode:true,residencyType:true,panCardNum:true,
        loanAmount:true,loanTenure:true,employmentType:true,
        employerType:true,employerName:true,yearlyIncome:true,
        monthlyIncome:true,existingEmi:true,contact:true,
        email:true
    })
    if (active) {  
      dispatch(setShowSubmitLoanFormPaymentModal(true));
      dispatch(setFormData({ ...persionalLoanObj}));
    }
  };

  useEffect(()=>{
        setPersionalUseObj(prev=>({...prev,existingEmi:prev.existingEmi}))    
  },[persionalLoanObj.monthlyIncome,persionalLoanObj.yearlyIncome])
  
  return (
    <div className='py-4 ' >
       <h1 className="flex flex-col mb-8 text-xl">
        <span>
          Unlock best <span>personal loan</span> offers suitable for your needs
          from <span>43+ lenders</span>
        </span>
        <span className="w-20 h-0.5 rounded-full bg-cyan-400 mt-3"></span>

      </h1>
      <form className='grid w-full grid-cols-2 gap-8 ' onSubmit={handleSubmit} > 

      <div className="py-1 border-b border-slate-400 ">
           <span>Full name</span>

            <input
              placeholder="As per on your pan card"
              type="text"
              onChange={handaleChange}
              onBlur={()=>setTouchedInputs(prev=>({...prev,name:true}))}
              value={persionalLoanObj.name}
              name={"name"}
              className="w-full bg-transparent border-none outline-none placeholder:text-slate-500"
            />
            
                {touchedInputs.name? (
                <span className="text-xs font-bold text-red-500">
                  {validationSchema.name.validate()}
                </span>
              ):''}
     </div>
     <div className="py-1 border-b border-slate-400 ">
           <span>Date of birth</span>

            <input
              placeholder="DD-MM-YYYY"
              type="date"
              onChange={handaleChange}
              onBlur={()=>setTouchedInputs(prev=>({...prev,dateOfBirth:true}))}
              name={"dateOfBirth"}
              className="w-full bg-transparent border-none outline-none placeholder:text-slate-500"
              value={persionalLoanObj.dateOfBirth}
            />
             {touchedInputs.dateOfBirth? (
                <span className="text-xs font-bold text-red-500">
                  {validationSchema.dateOfBirth.validate()}
                </span>
              ):''}
     </div>

     <div>
          <span>State</span>
          <div className="flex gap-2 bg-gray-200/40 border-[1px] border-gray-400 rounded-md">
            <select
              className="bg-transparent w-full py-2.5"
              onChange={
                (e)=>{
                  handaleChange(e)
                  setSelectedState(e.target.value);
                }}
            
              value={persionalLoanObj.state}
              name={"state"}
              onBlur={()=>setTouchedInputs(prev=>({...prev,state:true}))}



            >
              <option value={''}>Select</option>
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
          {touchedInputs.state? (
                <span className="text-xs font-bold text-red-500">
                  {validationSchema.state.validate()}
                </span>
              ):''}
        </div>
        <div>
          <span>City</span>
          <div className="flex gap-2 bg-gray-200/40 border-[1px] border-gray-400 rounded-md">
            <select
              className="bg-transparent w-full disabled:cursor-not-allowed py-2.5"
              value={persionalLoanObj.city}
              name='city'
              onBlur={()=>setTouchedInputs(prev=>({...prev,city:true}))}
              disabled={!selectedState}
              onChange={handaleChange}
            >
              <option value={''}>Select</option>
              {cities.map((obj) => {
                return (
                  <option key={obj.id} value={obj.name}>
                    {obj.name}
                  </option>
                );
              })}
            </select>
          </div>
          {touchedInputs.city? (
                <span className="text-xs font-bold text-red-500">
                  {validationSchema.city.validate()}
                </span>
              ):''}
        </div>
        <div>
          <span>Residency Pincode</span>
          <div className="py-1 border-b border-slate-400">
            <input
              placeholder=""
              // type="number"
              onChange={handaleChange}
              // {...formik.getFieldProps("pincode")}.
              onBlur={()=>setTouchedInputs(prev=>({...prev,pincode:true}))}
              name='pincode'
              value={persionalLoanObj.pincode}
              className="w-full bg-transparent border-none outline-none placeholder:text-slate-500"
            />
          </div>
          {touchedInputs.pincode? (
                <span className="text-xs font-bold text-red-500">
                  {validationSchema.pincode.validate()}
                </span>
              ):''}
        </div>
        <div>
          <span>Residency Type</span>
          <div className="py-1 border-b border-slate-400">
            <select
              onChange={handaleChange}
              name='residencyType'
              value={persionalLoanObj.residencyType}
              onBlur={()=>setTouchedInputs(prev=>({...prev,residencyType:true}))}

            >
               <option value={""}>Select Residency Type</option>
              {residencyType.map((ele, i) => {
                return <option key={i}>{ele}</option>;
              })}
            </select>
          </div>
          {touchedInputs.residencyType? (
                <span className="text-xs font-bold text-red-500">
                  {validationSchema.residencyType.validate()}
                </span>
              ):''}
        </div>
        <div className="col-span-1 sm:col-span-2">
          <span>PAN card number</span>
          <div className="py-1 border-b border-slate-400">
            <input
              placeholder="Enter permanent account number"
              type="text"
              onChange={handaleChange}
              name='panCardNum'
              value={persionalLoanObj.panCardNum}
              onBlur={()=>setTouchedInputs(prev=>({...prev,panCardNum:true}))}
              className="w-full bg-transparent border-none outline-none placeholder:text-slate-500"
            />
          </div>

             {touchedInputs.panCardNum? (
                <span className="text-xs font-bold text-red-500">
                  {validationSchema.panCardNum.validate()}
                </span>
              ):''}
        </div>
        <div>
          <span>Loan amount</span>
          <div className="py-1 border-b border-slate-400">
            <input
              placeholder=""
              type="number"
              // {...formik.getFieldProps("loanAmount")}
              onBlur={()=>setTouchedInputs(prev=>({...prev,loanAmount:true}))}
              onChange={handaleChange}
              value={persionalLoanObj.loanAmount}
              name='loanAmount'
              className="w-full bg-transparent border-none outline-none placeholder:text-slate-500"
            />
          </div>
          {touchedInputs.loanAmount? (
                <span className="text-xs font-bold text-red-500">
                  {validationSchema.loanAmount.validate()}
                </span>
             ):''}
        </div>
        <div>
          <span>Loan tenure</span>
          <div className="flex gap-2 bg-gray-200/40 border-[1px] border-gray-400 rounded-md">
            <select
              className="bg-transparent w-full py-2.5"
              name="loanTenure"
              value={persionalLoanObj.loanTenure}
              onChange={handaleChange}
              onBlur={()=>setTouchedInputs(prev=>({...prev,loanTenure:true}))}

            >
              <option value="">Select</option>
              {loanTenure.map((tenure, i) => (
                <option key={i} value={tenure}>
                  {tenure}
                </option>
              ))}
            </select>
          </div>
          {touchedInputs.loanTenure? (
                <span className="text-xs font-bold text-red-500">
                  {validationSchema.loanTenure.validate()}
                </span>
             ):''}
        </div>
        <div>
          <span>Employment type</span>
          <div className="flex gap-2 bg-gray-200/40 border-[1px] border-gray-400 rounded-md">
            <select
              className="bg-transparent w-full py-2.5"
              value={persionalLoanObj.employmentType}
              onChange={handaleChange}
              name='employmentType'
              onBlur={()=>setTouchedInputs(prev=>({...prev,employmentType:true}))}


            >
              <option value={''}>Select</option>
              {employmentType.map((ele) => {
                return (
                  <option key={ele} value={ele}>
                    {ele}
                  </option>
                );
              })}
            </select>
          </div>
          {touchedInputs.employmentType? (
                <span className="text-xs font-bold text-red-500">
                  {validationSchema.employmentType.validate()}
                </span>
             ):''}
        </div>
        <div>
          <span>Salary Bank Account</span>
          <div className="flex gap-2 bg-gray-200/40 border-[1px] border-gray-400 rounded-md">
            <select
              className="bg-transparent w-full py-2.5"
              name='primaryBankAccount'
              value={persionalConditionalObj.primaryBankAccount||persionalLoanObj.primaryBankAccount}
              onChange={(e)=>{
                if(e.target.value==='Other'){
                  setPersionalConditionalUseObj
                  (prev=>({...prev,primaryBankAccount:e.target.value}))
                  handaleChange({target:{value:'',name:'primaryBankAccount'}})
                }else{
                  setPersionalConditionalUseObj
                  (prev=>({...prev,primaryBankAccount:''}))
                  handaleChange(e)
                }      
              }}
              onBlur={()=>setTouchedInputs(prev=>({...prev,primaryBankAccount:true}))}
            >
              <option value={''}>Select</option>
              {primaryBankAccount.map((ele) => {
                return (
                  <option key={ele} value={ele}>
                    {ele}
                  </option>
                );
              })}
            </select>
          </div>
          {/* {touchedInputs.primaryBankAccount&&persionalConditionalObj.primaryBankAccount!=='Other'? (
                <span className="text-xs font-bold text-red-500  ">
                  {validationSchema.primaryBankAccount.validate()}
                </span>
             ):''} */}
        </div>

        {persionalConditionalObj.primaryBankAccount ==='Other'&& <div>
          <span>Salary Bank Account</span>
          <div className="py-1 border-b border-slate-400 duration-200">
            <input
              placeholder="Enter Salary Bank Account"
              type="text"
              // onChange={handaleChange}
              ref={renderInputBankRef}
              name='primaryBankAccount'
              onBlur={()=>setTouchedInputs(prev=>({...prev,primaryBankAccountCon:true}))}
              value={persionalLoanObj.primaryBankAccount}
              onChange={handaleChange}
              className="w-full bg-transparent border-none outline-none placeholder:text-slate-500"
            />
          {/* {touchedInputs.primaryBankAccountCon? (
                <span className="text-xs font-bold text-red-500">
                  {validationSchema.primaryBankAccount.validate()}
                </span>
             ):''} */}
        </div>
        </div>}



        <div>
          <span>Employer type</span>
          <div className="flex gap-2 bg-gray-200/40 border-[1px] border-gray-400 rounded-md">
            <select
              className="bg-transparent w-full py-2.5"
              onBlur={()=>setTouchedInputs(prev=>({...prev,employerType:true}))}
              onChange={handaleChange}
              value={persionalLoanObj.employerType}
              name='employerType'
            >
              
              <option value={''}>Select</option>
              {employerType.map((ele) => {
                return (
                  <option key={ele} value={ele}>
                    {ele}
                  </option>
                );
              })}
            </select>
          </div>
          {/* {formik.touched.employerType && formik.errors.employerType && (
            <span className="text-xs font-bold text-red-500">
              {formik.errors.employerType}
            </span>
          )} */}
             {touchedInputs.employerType? (
                <span className="text-xs font-bold text-red-500">
                  {validationSchema.employerType.validate()}
                </span>
             ):''}
        </div>
<div>
          <span>Employer name</span>
          <div className="py-1 border-b border-slate-400">
            <input
              placeholder="Enter your company name"
              type="text"
              value={persionalLoanObj.employerName}
              className="w-full bg-transparent border-none outline-none placeholder:text-slate-500"
              onBlur={()=>setTouchedInputs(prev=>({...prev,employerName:true}))}
              onChange={handaleChange}
              name='employerName'
            />
          </div>
           {touchedInputs.employerName? (
                <span className="text-xs font-bold text-red-500">
                  {validationSchema.employerName.validate()}
                </span>
             ):''}
        </div>

        <div className="py-1 ">
          {persionalLoanObj.employmentType === "Salaried" &&
          persionalLoanObj.employmentType === "Salaried" ? (
            <div>
              <span className="gap-2 pr-1">
                <span className="px-1">
                  {" "}
                  {persionalLoanObj.employmentType === "Salaried"
                    ? "Monthly"
                    : "Yearly "}{" "}
                </span>
                Income
              </span>
              <input
                placeholder="Enter your monthly income"
                type="number"
                name="monthlyIncome"
                value={persionalLoanObj.monthlyIncome}
                onChange={handaleChange}
                className="bg-transparent w-full outline-none  placeholder:text-slate-500 border-b-[1px] border-slate-800"
                onBlur={()=>setTouchedInputs(prev=>({...prev,monthlyIncome:true}))}
              />
                {touchedInputs.monthlyIncome? (
                <span className="text-xs font-bold text-red-500">
                  {validationSchema.monthlyIncome.validate()}
                </span>
             ):''}
            </div>
          ) : (
            <div>
              <span className="gap-2 pr-1">
                <span className="px-1">
                  {persionalLoanObj.employmentType === "Salaried"
                    ? "Monthly"
                    : "Yearly "}
                </span>
                Income
              </span>
              <input
                placeholder="Enter your monthly income"
                type="number"
                name="yearlyIncome"
                value={persionalLoanObj.yearlyIncome}
                onChange={handaleChange}
                className="bg-transparent w-full outline-none  placeholder:text-slate-500 border-b-[1px] border-slate-800"
                onBlur={()=>setTouchedInputs(prev=>({...prev,yearlyIncome:true}))}
              />
               {touchedInputs.yearlyIncome? (
                <span className="text-xs font-bold text-red-500">
                  {validationSchema.yearlyIncome.validate()}
                </span>
             ):''}
            </div>
          )}
        </div>

        <div>
          <span>Income recieved as</span>
          <div className="flex gap-2 bg-gray-200/40 border-[1px] border-gray-400 rounded-md">
            <select
              className="bg-transparent w-full disabled:cursor-not-allowed py-2.5"
              name='incomeRecievedAs'
              value={persionalLoanObj.incomeRecievedAs}
              onChange={handaleChange}
              onBlur={()=>setTouchedInputs(prev=>({...prev,incomeRecievedAs:true}))}

            >
              <option value="">Select</option>
              {incomeRecievedAs.map((ele, i) => {
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
          <span>Existing EMI</span>
          <div className="py-1 border-b border-slate-400">
            <input
              placeholder="Enter your existing EMI if any"
              type="number"
              value={persionalLoanObj.existingEmi}
              onChange={handaleChange}
              onBlur={()=>setTouchedInputs(prev=>({...prev,existingEmi:true}))}
              name='existingEmi'
              className="w-full bg-transparent border-none outline-none placeholder:text-slate-500"
            />
          </div>
          {touchedInputs.existingEmi? (
                <span className="text-xs font-bold text-red-500">
                  {validationSchema.existingEmi.validate()}
                </span>
             ):''}
        
        </div>

        <div>
          <span>Email address</span>
          <div className="py-1 border-b border-slate-400">
            <input
              placeholder="Enter your email address"
              type="text"
              value={persionalLoanObj.email}
              onChange={handaleChange}
              onBlur={()=>setTouchedInputs(prev=>({...prev,email:true}))}
              name='email'
              className="w-full bg-transparent border-none outline-none placeholder:text-slate-500"
            />
          </div>
          {touchedInputs.email? (
                <span className="text-xs font-bold text-red-500">
                  {validationSchema.email.validate()}
                </span>
             ):''}
        </div>
        <div>
          <span>Mobile number</span>
          <div className="flex items-center space-x-2.5 border-b border-slate-400 py-1">
            <img src="/india.png" alt="india" className="h-4 w-7" />
            <span className="whitespace-nowrap">+91 -</span>
            <input
              type="number"
              value={persionalLoanObj.contact}
              onChange={handaleChange}
              onBlur={()=>setTouchedInputs(prev=>({...prev,contact:true}))}
              name='contact'
              className="w-full bg-transparent border-none outline-none"
            />
          </div>
          {touchedInputs.contact? (
                <span className="text-xs font-bold text-red-500">
                  {validationSchema.contact.validate()}
                </span>
             ):''}
        </div>
        <div className="col-span-2 sm:col-span-2">
          <div>
            {/* <input
              type="checkbox"
              checked={checkBox1}
              onChange={() => setCheckBox1(!checkBox1)}
            />
            <label className="pl-2">Terms & Conditions 1</label> */}

            <ReCAPTCHA
    sitekey="6Lfg1FEpAAAAAEdYwmMkPI462Xy9HCDH6InIkL0j"
    onChange={(res)=>{
      setCheckBox3(true)
    }}
  />
          </div>
          <div>
            <input
              type="checkbox"
              checked={checkBox2}
              onChange={() => setCheckBox2(prev=>!prev)}
            />
            <label className="pl-2">Terms & Conditions 2</label>
          </div>
         
        </div>
        <div className="w-1/2 mx-auto pt-2.5">
          <button
            className="bg-cyan-400 py-2.5 w-full rounded-lg text-lg text-white font-normal duration-200 disabled:cursor-not-allowed disabled:bg-gray-200"
            type="submit"
            disabled={!checkBox2 && !checkBox3}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}

export default FormAB
