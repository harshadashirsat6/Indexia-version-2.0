import React, { useState, useEffect } from "react";

const existingLoanTypes = [
  "Personal Loan",
  "Home Loan",
  "Car Loan",
  "Gold Loan",
  "Other",
];

function App({}) {
  const [selectedItems, setSelectedItems] = useState([]);
  const [tableData, setTableData] = useState([]);

  //handle checkbox to add and delete item
  const handleCheckboxChange = (loanType) => {
    if (selectedItems.includes(loanType)) {
      setSelectedItems(selectedItems.filter((item) => item !== loanType));
      setTableData(tableData.filter((item) => item.loanType !== loanType));
    } else {
      let additionalCols = {};
      if (loanType === "Other") {
        additionalCols = {
          loanType: "",
          amount: "",
          bankName: "",
          roi: "",
          newLoanType: "",
        };
      } else {
        additionalCols = { loanType, amount: "", bankName: "", roi: "" };
      }
      setSelectedItems([...selectedItems, loanType]);
      setTableData([...tableData, additionalCols]);
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

    // If the selected loan type is "Other", handle the input differently
    if (loanType === "Other") {
      const otherIndex = updatedData.findIndex(
        (item) => item.loanType === loanType
      );
      if (field === "loanType") {
        // When changing the loan type for "Other", also clear the other fields
        updatedData[otherIndex] = {
          loanType: value,
          amount: "",
          bankName: "",
          roi: "",
          newLoanType: "",
        };
      } else {
        // For other fields, update normally
        updatedData[otherIndex] = {
          ...updatedData[otherIndex],
          [field]: value,
        };
      }
    }

    setTableData(updatedData);
  };

  // handle add row button
  const handleAddRow = () => {
    setTableData([
      ...tableData,
      { loanType: "", amount: "", bankName: "", roi: "" },
    ]);
  };

  // remove empty rows when "Other" is unselected
  useEffect(() => {
    if (!selectedItems.includes("Other")) {
      const nonEmptyRows = tableData.filter(
        (row) =>
          row.loanType !== "" ||
          row.amount !== "" ||
          row.bankName !== "" ||
          row.roi !== ""
      );
      setTableData(nonEmptyRows);
    }
  }, [selectedItems]);

  return (
    <div className="col-span-1 sm:col-span-2">
      <span className="font-semibold text-gray-500 mt-3">
        Existing Loan Types
      </span>
      <div>
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
      {(selectedItems.length && !selectedItems.includes("Other")) ||
      (selectedItems.includes("Other") && tableData.length) ? (
        <>
          <span className="font-semibold text-gray-500 mt-3">
            ENTER LOAN DETAILS
          </span>
          <div className="">
            <table className="w-full mt-3">
              <thead>
                <tr>
                  <th className="border-2">Loan Type</th>
                  <th className="border-2">Loan Amount</th>
                  <th className="border-2">Bank Name</th>
                  <th className="border-2">Current Rate of Interest</th>
                  {selectedItems.includes("Other") && (
                    <th className="border-2">New Loan Type</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {tableData.map((loan, index) => (
                  <tr key={index}>
                    <td>
                      {selectedItems.includes("Other") ? (
                        <input
                          type="text"
                          value={loan.loanType}
                          onChange={(e) =>
                            handleInputChange(
                              loan.loanType,
                              "loanType",
                              e.target.value
                            )
                          }
                          className="border-[1px] border-gray-600 pl-[3px]"
                        />
                      ) : (
                        loan.loanType
                      )}
                    </td>
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
                        className="border-[1px] border-gray-600 pl-[3px]"
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
                        className="border-[1px] border-gray-600 pl-[3px]"
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
                        className="border-[1px] border-gray-600 pl-[3px]"
                      />
                    </td>
                    {selectedItems.includes("Other") && (
                      <td>
                        <input
                          type="text"
                          value={loan.newLoanType}
                          onChange={(e) =>
                            handleInputChange(
                              loan.loanType,
                              "newLoanType",
                              e.target.value
                            )
                          }
                          className="border-[1px] border-gray-600 pl-[3px]"
                        />
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              onClick={handleAddRow}
              className="bg-blue-300 rounded-md font-black px-[5px] py-[5px] my-[10px]"
            >
              Add Other Loan Type
            </button>
          </div>
        </>
      ) : null}
    </div>
  );
}

export default App;
