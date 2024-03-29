import { useState } from "react";

const Table = () => {
  const [rows, setRows] = useState([
    {
      loanType: "",
      loanAmount: "",
      bankName: "",
      interestRate: "",
    },
  ]);

  const addRow = () => {
    setRows([
      ...rows,
      {
        loanType: "",
        loanAmount: "",
        bankName: "",
        interestRate: "",
      },
    ]);
  };

  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    const updatedRows = [...rows];
    updatedRows[index][name] = value;
    setRows(updatedRows);
  };

  return (
    <>
      <div>
        <span className="font-semibold text-gray-500">
          Existing Loan Details
        </span>
      </div>
      <table className="w-full  mt-3">
        <thead>
          <tr>
            <th></th>
            <th className="border-2">Loan Type</th>
            <th className="border-2">Loan Amount</th>
            <th className="border-2">Bank Name</th>
            <th className="border-2">Current Rate of Interest</th>
            <th>
              <button
                onClick={addRow}
                className="w-[5rem] px-2 py-2 bg-blue-300 rounded-xl hover:bg-blue-100"
              >
                Add
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>{index + 1}.</td>
              <td>
                <input
                  type="text"
                  name="loanType"
                  value={row.loanType}
                  onChange={(e) => handleInputChange(index, e)}
                  placeholder="Loan type name"
                  className="py-2 px-2 w-full border-[0.5px] border-gray-400 rounded-xl"
                  required
                />
              </td>
              <td>
                <input
                  type="number"
                  name="loanAmount"
                  value={row.loanAmount}
                  onChange={(e) => handleInputChange(index, e)}
                  placeholder="Amount"
                  className="py-2 px-2 w-full border-[0.5px] border-gray-400 rounded-xl"
                  required
                />
              </td>
              <td>
                <input
                  type="text"
                  name="bankName"
                  value={row.bankName}
                  onChange={(e) => handleInputChange(index, e)}
                  placeholder="Lender bank name"
                  className="py-2 px-2 w-full border-[0.5px] border-gray-400 rounded-xl"
                  required
                />
              </td>
              <td>
                <input
                  type="number"
                  name="interestRate"
                  value={row.interestRate}
                  onChange={(e) => handleInputChange(index, e)}
                  placeholder="ROI"
                  className="py-2 px-2 w-full border-[0.5px] border-gray-400 rounded-xl"
                  required
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Table;
