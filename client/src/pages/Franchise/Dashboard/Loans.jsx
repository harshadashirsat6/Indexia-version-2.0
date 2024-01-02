import { useState } from "react";
import { useSelector } from "react-redux";
import Filter from "./Filter";
import Table from "./Table";
const arr = [
  {
    status: "approved",
  },
  {
    status: "approved",
  },
  {
    status: "rejected",
  },
  {
    status: "approved",
  },
  {
    status: "approved",
  },
  {
    status: "rejected",
  },
  {
    status: "approved",
  },
  {
    status: "rejected",
  },
  {
    status: "pending",
  },
  {
    status: "pending",
  },
  {
    status: "rejected",
  },
  {
    status: "approved",
  },
  {
    status: "approved",
  },
  {
    status: "rejected",
  },
  {
    status: "approved",
  },
  {
    status: "rejected",
  },
  {
    status: "pending",
  },
  {
    status: "pending",
  },
];

const Loans = () => {
  const { allLoans } = useSelector((state) => state.franchise);
  const [filterBy, setFilterBy] = useState("");

  return (
    <div className="py-5 px-10 space-y-3 w-[95%] ">
      <h1 className="font-acme text-lg ">Loan Applications</h1>
      <Filter setFilterBy={setFilterBy} />
      <Table arr={arr} filterBy={filterBy} />
    </div>
  );
};

export default Loans;
