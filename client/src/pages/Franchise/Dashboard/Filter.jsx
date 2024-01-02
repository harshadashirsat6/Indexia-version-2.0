const Filter = ({ filterBy, setFilterBy }) => {
  return (
    <div>
      <div>
        <section className="w-[15%] rounded-md pr-5 pl-2 border-2 border-gray-300 ">
          <select
            name="filterBy"
            value={filterBy}
            onChange={(e) => {
              setFilterBy(e.target.value);
            }}
            className="bg-transparent w-full  py-2 focus:outline-none"
          >
            <option value="">All</option>
            <option value="approved">Approved</option>
            <option value="pending">Pending</option>
            <option value="rejected">Rejected</option>
          </select>
        </section>
      </div>
    </div>
  );
};

export default Filter;
