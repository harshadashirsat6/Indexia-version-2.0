import React,{useEffect, useState} from 'react'
import { FaAngleDoubleLeft } from "react-icons/fa";
import { FaAngleLeft } from "react-icons/fa6";
import { FaArrowDownLong } from "react-icons/fa6";

const DatePicker = ({setActive,handaleDate,date,clearFun}) => {
    const [stylePosition,setStylePosition] = useState({
        month:new Date().getMonth(),
        year:new Date().getFullYear(),
        selectedDate: {
          date:new Date().getDate(),
          month:new Date().getMonth(),
          year:new Date().getFullYear(),
        }
    })

    const [calenderData,setCalender] = useState([])
    const [isActiveClDr,setActiveClDr] = useState({
      month:false,
      year:false,
    })

    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
      ];
      
      const weekNames = [
        'Sun', 'Mon', 'Tus', 'Wed', 'Thu', 'Fri', 'Sat'
      ];

const HnadaleYear = (year)=>{      
const yearData = [];

for (let month = 1; month <= 12; month++) {
  const firstDayOfMonth = new Date(year, month - 1, 1);
  const lastDayOfMonth = new Date(year, month, 0);
  const daysInMonth = lastDayOfMonth.getDate();
  const weekNumber =firstDayOfMonth.getDay() ;

  yearData.push([
        ...Array.from({ length: weekNumber }, (_, index) => '')
        ,...Array.from({ length: daysInMonth }, (_, index) => index + 1)]
    );
}
setCalender(yearData)
}

 const handaleMonth = (num)=>{
    if(num ===1){
        setStylePosition(prev=>({...prev,
            month:(prev.month +num)<12?prev.month +num:0,
            year:(prev.month +num)<12?prev.year:prev.year+1,

         }))
    }else{
        setStylePosition(prev=>({...prev,
            month:(prev.month)>0?prev.month +num:11,
            year:(prev.month)>0?prev.year:prev.year+num,
         }))
    }
 }

 const handaleYear = (num)=>{
        setStylePosition(prev=>({...prev,
            year:(prev.year +num)>0?prev.year+num:prev.year,
         }))
 }

 useEffect(()=>{
    HnadaleYear(stylePosition.year)
 },[stylePosition.year])
 

  const toCheckActiveDate = (obj1,obj2)=>{
    return obj1.year===obj2.year&&
           obj1.month===obj2.month&&
           obj1.date===obj2.date
  }


  useEffect(()=>{
    if(date?.length ===10){
      const dateArr = date.split('-')
      setStylePosition(prev=>({...prev,selectedDate:{
        date:+dateArr[0],
        month:(+dateArr[1])-1,
        year:+dateArr[2],
      },
      month:(+dateArr[1])-1,
      year:+dateArr[2],
    }))
    }
  },[date])

  return (
    <div className={'h-fit duration-200 py-3 w-[320px] shadow-lg rounded-xl overflow-hidden border absolute right-0 top-[calc(100%+10px)] bg-white'} >
          <div className=' text-center w-[320px] '>
              
                {/* <p className='w-40 text-lg  font-semibold text-center mx-auto mb-1'>{stylePosition.year}</p> */}
               
            </div>
          <div className=' text-center w-[320px] font-[400] px-3'>
                <div className='flex justify-center items-center '>
                <button type='button' onClick={()=>{handaleYear(-1)}}  className='border-2 border-gray-200 rounded-lg p-1.5 mr-2  '>
                <FaAngleDoubleLeft size={'15px'} />
               </button>

               <button type='button' onClick={()=>{handaleMonth(-1)}} className='border-2 border-gray-200 rounded-lg p-1.5   '>
               <FaAngleLeft size={'15px'}/>
               </button> 
                <p className='w-44  rounded-md text-center  relative 
                 font-semibold mx-2'>
                    <button type='button' onClick={()=>{setActiveClDr(prev=>({...prev,month:!prev.month,year:false}))}} className='hover:bg-gray-100 mr-1 p-1 rounded-md'>{monthNames[stylePosition.month]}</button>
                    <button type='button' onClick={()=>{setActiveClDr(prev=>({...prev,year:!prev.year,month:false}))}}  className='hover:bg-gray-100 p-1  rounded-md'> {stylePosition.year}</button> 
                   {isActiveClDr.month&& <ul className='absolute duration-200 grid grid-cols-3 gap-1 w-40 bg-white z-[4] shadow-xl border top-full left-0 rounded p-1'>
                     {monthNames.map((el,i)=><li onClick={()=>{
                      setStylePosition(prev=>({...prev,month:i}))
                      setActiveClDr(prev=>({...prev,month:false,year:false}))
                      }} className='hover:bg-gray-100 text-sm p-1 rounded'>{el.slice(0,3)}</li>)}
                   </ul>}
                    {isActiveClDr.year&& <ul className='absolute duration-200 grid grid-cols-4 h-64 overflow-y-scroll gap-1 w-56 bg-white z-[4] shadow-xl border top-full left-0 rounded p-1'>
                    <li className='hover:bg-gray-100 text-sm  rounded col-span-4 '>
                    <button onClick={()=>{handaleYear(-100)}} className='text-cyan-400 p-2 m-1   border rounded-md'><FaArrowDownLong/></button>    
                    <span className='mx-2 '>{stylePosition.year}</span>
                    <button onClick={()=>{handaleYear(100)}} className='text-cyan-400 p-2 m-1 -rotate-180 border rounded-md' ><FaArrowDownLong/></button>
                    </li>
                     {Array.from({ length: 100 }, (_, index) =>stylePosition.year +1+index)
                     .map((el)=><li 
                     onClick={()=>{
                      setStylePosition(prev=>({...prev,year:el}))
                      setActiveClDr(prev=>({...prev,month:false,year:false}))
                    }}
                      className={el?'hover:bg-gray-100 text-sm p-1 rounded cursor-pointer':''}>{el}</li>)}
                   </ul>}
                </p>
                <button type='button' onClick={()=>{handaleMonth(1)}} className='border-2 border-gray-200 rounded-lg p-1.5  '>
                <FaAngleLeft size={'15px'} className='-rotate-180' />
               </button> 
               <button type='button' onClick={()=>{handaleYear(1)}} className='border-2 border-gray-200 rounded-lg p-1.5  ml-2   '>
                <FaAngleDoubleLeft  size={'15px'} className='-rotate-180' />
               </button> 
               </div>
            </div>

        <div style={{left:-(stylePosition.month*320)+"px"}} className='w-[3880px] flex relative duration-200 '>
      
    {calenderData.map((el,i)=>
         <div className=' w-[320px]   text-center overflow-hidden p-3'>
            <ul className='grid grid-cols-7 gap-2 px-3'>
               {weekNames.map((el)=><li className='grid place-content-center h-4 w-4 text-sm font-semibold'>{el}</li>)}
               {el.map((el)=><li className={`h-8 w-8 text-sm  grid place-content-center
                ${toCheckActiveDate(stylePosition.selectedDate,{
                  year:stylePosition.year,
                  month:stylePosition.month,
                  date:el
                } )?'bg-cyan-500 text-white':el?'hover:bg-gray-200':''}
               font-semibold  p-[2px] rounded-md cursor-pointer`}
               onClick={(e)=>{
                setActive()
                handaleDate(`${(el+"").length>1?el:"0"+el}-${(stylePosition.month+"").length>1?stylePosition.month+1:"0"
                +(stylePosition.month+1)}-${stylePosition.year}`)
                setStylePosition(prev=>({...prev,selectedDate:{
                  date:el,
                  month:stylePosition.month,
                  year:stylePosition.year,
                }}))
                }}>
               {el}</li>)}
            </ul>
         
         </div>
    )}
   
    </div>
    <div className='flex  justify-between w-full px-4 bg-gray-50 font-semibold mt-2   '>
        <button type='button'  className='border p-1 px-8  rounded-md ' 
        onClick={(e)=>{
          setActive()
          }}>
          Cancel</button>
        <button type='button' className='bg-cyan-500 p-1 px-8 text-white rounded-md '
        onClick={(e)=>{
          clearFun()
          }}
        >Clear</button>
    </div>
    </div>
  )
}

export default DatePicker

