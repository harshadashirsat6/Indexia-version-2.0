const Table = ({ setView, setLoanDetails }) => {
  const handleView = (id) => {
    setView(true);
    setLoanDetails(id);
  };
  return (
    <table className="border-[1px] p-2 w-full m-auto h-[30%] rounded-md border-slate-400">
      <thead>
        <tr className="text-blue-900 bg-gray-300">
          <th className="border-[1px] border-slate-400 py-1.5">No</th>
          <th className="border-[1px] border-slate-400 py-1.5">
            Application Code
          </th>
          <th className="border-[1px] border-slate-400 py-1.5">Loan Amount</th>
          <th className="border-[1px] border-slate-400 py-1.5">Tenure</th>
          <th className="border-[1px] border-slate-400 py-1.5">Emi</th>
          <th className="border-[1px] border-slate-400 py-1.5">Status</th>
          <th className="border-[1px] border-slate-400 py-1.5">Action</th>
        </tr>
      </thead>
      <tbody>
        {[...Array(5)].map((_, i) => {
          return (
            <tr key={i} className="text-black font-mono">
              <td className="border-[1px] border-slate-400 py-1.5 text-center">
                {i + 1}
              </td>
              <td className="border-[1px] border-slate-400 py-1.5 text-center">
                ccsfddh89
              </td>
              <td className="border-[1px] border-slate-400 py-1.5 text-center">
                5
              </td>
              <td className="border-[1px] border-slate-400 py-1.5 text-center">
                5
              </td>
              <td className="border-[1px] border-slate-400 py-1.5 text-center">
                5000
              </td>
              <td
                className={`border-[1px] border-slate-400 py-1.5 text-center font-bold ${
                  i % 2 === 0 ? "text-green-600" : "text-red-700"
                }`}
              >
                {i % 2 === 0 ? "Disbured" : "Rejected"}
              </td>
              <td className="border-[1px] border-slate-400 py-1.5 text-center">
                <span
                  className="underline underline-offset-2 cursor-pointer"
                  onClick={() => {
                    handleView(i);
                  }}
                >
                  View
                </span>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
