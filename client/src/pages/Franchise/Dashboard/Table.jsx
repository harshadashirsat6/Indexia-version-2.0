const Table = ({ arr, filterBy }) => {
  //   const handleView = (id) => {
  //     setView(true);
  //     setLoanDetails(id);
  //   };
  return (
    <div>
      <table className="border-[1px] p-2 w-full m-auto  rounded-md border-slate-400 ">
        <thead>
          <tr className="text-blue-900 bg-gray-300">
            <th className="border-[1px] border-slate-400 py-1.5 px-3">No</th>
            <th className="border-[1px] border-slate-400 py-1.5">
              Application Code
            </th>
            <th className="border-[1px] border-slate-400 py-1.5 ">
              Loan Amount
            </th>
            <th className="border-[1px] border-slate-400 py-1.5 ">Tenure</th>
            <th className="border-[1px] border-slate-400 py-1.5 px-5">Emi</th>
            <th className="border-[1px] border-slate-400 py-1.5">Status</th>
            <th className="border-[1px] border-slate-400 py-1.5">Action</th>
          </tr>
        </thead>
        <tbody>
          {arr
            .filter((ele) => {
              if (ele.status === filterBy && ele.status !== "") {
                return ele;
              }
              if (filterBy === "") {
                return ele;
              }
            })
            .map((ele, i) => {
              return (
                <tr key={i} className="text-black font-mono">
                  <td className="border-[1px] border-slate-400 py-1.5  text-center">
                    {i + 1}
                  </td>
                  <td className="border-[1px] border-slate-400 py-1.5 text-center">
                    ccsfddh89
                  </td>
                  <td className="border-[1px] border-slate-400 py-1.5 text-center">
                    450000
                  </td>
                  <td className="border-[1px] border-slate-400 py-1.5 text-center">
                    2
                  </td>
                  <td className="border-[1px] border-slate-400 py-1.5 text-center">
                    5000
                  </td>
                  <td className="border-[1px] border-slate-400 py-1.5 text-center font-bold ">
                    {ele.status}
                  </td>
                  <td className="border-[1px] border-slate-400 py-1.5 text-center">
                    <span
                      className="underline underline-offset-2 cursor-pointer text-blue-700"
                      //   onClick={() => { handleView(i)}}
                    >
                      view
                    </span>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
