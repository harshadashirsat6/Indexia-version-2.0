const EligibilityCalc = () => {
  return (
    <main className="my-[calc(56px+40px)] mx-5 sm:mx-10 md:mx-20 lg:mx-32 space-y-10">
      <section>
        <h1 className="text-2xl sm:text-3xl flex flex-col space-y-1 mb-0.5 font-normal">
          <span className="w-20 h-0.5 rounded-full bg-cyan-300"></span>
          <span className="text-slate-400">
            Eligibility <span className="text-cyan-400">Calculator</span>
          </span>
        </h1>
        <p>
          This calculator will help you to determine eligibility for a loan
          based on certain criteria set by the lender.
        </p>
      </section>
      <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-5">
        <div>
          <span>Country</span>
          <div className="border-b border-slate-400 py-1">
            <input
              placeholder="Enter your country"
              type="text"
              className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
            />
          </div>
        </div>
        <div>
          <span>Product</span>
          <div className="border-b border-slate-400 py-1">
            <input
              placeholder="Choose product"
              type="text"
              className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
            />
          </div>
        </div>
        <div>
          <span>Full name</span>
          <div className="border-b border-slate-400 py-1">
            <input
              placeholder="As per on your pan card"
              type="text"
              className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
            />
          </div>
        </div>
        <div>
          <span>Date of birth</span>
          <div className="border-b border-slate-400 py-1">
            <input
              placeholder="DD-MM-YYYY"
              type="text"
              className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
            />
          </div>
        </div>
        <div>
          <span>Mobile number</span>
          <div className="border-b border-slate-400 py-1">
            <input
              placeholder="Enter your mobile number"
              type="text"
              className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
            />
          </div>
        </div>
        <div>
          <span>Email address</span>
          <div className="border-b border-slate-400 py-1">
            <input
              placeholder="Enter your email address"
              type="text"
              className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
            />
          </div>
        </div>
        <div>
          <span>Employment type</span>
          <div className="border-b border-slate-400 py-1">
            <input
              placeholder="Enter your employment type"
              type="text"
              className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
            />
          </div>
        </div>
        <div>
          <span>Monthly income</span>
          <div className="border-b border-slate-400 py-1">
            <input
              placeholder="Enter your monthly income"
              type="text"
              className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
            />
          </div>
        </div>
        <div>
          <span>Existing EMI</span>
          <div className="border-b border-slate-400 py-1">
            <input
              placeholder="Enter your existing EMI"
              type="text"
              className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
            />
          </div>
        </div>
      </section>
      <section className="mx-auto w-fit">
        <button className="bg-emerald-400 hover:bg-emerald-500 duration-200 text-white px-5 py-2.5 rounded-md text-xl shadow">
          Check your eligibility
        </button>
      </section>
    </main>
  );
};

export default EligibilityCalc;
