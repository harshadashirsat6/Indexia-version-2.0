import React, { useState } from "react";
import { existingLoanTypes } from "../../../../configs/selectorConfigs";

function LoanDetails({
  selectedItems,
  setSelectedItems,
  tableData,
  setTableData,
}) {
  console.log(tableData);
  //handle checkbox to add and delete item
  const handleCheckboxChange = (loanType) => {
    if (selectedItems.includes(loanType)) {
      setSelectedItems(selectedItems.filter((item) => item !== loanType));
      setTableData(tableData.filter((item) => item.loanType !== loanType));
    } else {
      setSelectedItems([...selectedItems, loanType]);
      setTableData([
        ...tableData,
        { loanType, amount: "", bankName: "", roi: "" },
      ]);
    }
  };

  //handle inputs
  const handleInputChange = (loanType, field, value) => {
    const updatedData = tableData.map((item) => {
      if (item.loanType === loanType) {
        return { ...item, [field]: value };
      }
      return item;
    });
    setTableData(updatedData);
  };

  return (
    <>
      <div className="col-span-1 sm:col-span-2">
        <div className="col-span-1 sm:col-span-2 ">
          <h1 className="font-bold text-blue-600 underline underline-offset-4">
            EXISTING LOAN EXPOSURE
          </h1>
        </div>
        <ul>
          {existingLoanTypes.map((loanType) => (
            <li key={loanType}>
              <input
                type="checkbox"
                checked={selectedItems.includes(loanType)}
                onChange={() => handleCheckboxChange(loanType)}
              />
              {loanType}
            </li>
          ))}
        </ul>
      </div>
      {selectedItems.length ? (
        <>
          <div className="col-span-1 sm:col-span-2 ">
            <h1 className="font-bold text-blue-600 underline underline-offset-4">
              EXISTING LOAN EXPOSURE
            </h1>
          </div>
          <div className="">
            <table className="w-full mt-3">
              <thead>
                <tr>
                  <th className="border-2">Loan Type</th>
                  <th className="border-2">Loan Amount</th>
                  <th className="border-2">Bank Name</th>
                  <th className="border-2">Current Rate of Interest</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((loan, index) => (
                  <tr key={index}>
                    <td>{loan.loanType}</td>
                    <td>
                      <input
                        type="text"
                        value={loan.amount}
                        onChange={(e) =>
                          handleInputChange(
                            loan.loanType,
                            "amount",
                            e.target.value
                          )
                        }
                        className="py-2 px-2 w-full border-[0.5px] border-gray-400 rounded-xl text-black font-normal"
                        required
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={loan.bankName}
                        onChange={(e) =>
                          handleInputChange(
                            loan.loanType,
                            "bankName",
                            e.target.value
                          )
                        }
                        className="py-2 px-2 w-full border-[0.5px] border-gray-400 rounded-xl text-black font-normal"
                        required
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={loan.roi}
                        onChange={(e) =>
                          handleInputChange(
                            loan.loanType,
                            "roi",
                            e.target.value
                          )
                        }
                        className="py-2 px-2 w-full border-[0.5px] border-gray-400 rounded-xl text-black font-normal"
                        required
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : null}
    </>
  );
}

export default LoanDetails;
