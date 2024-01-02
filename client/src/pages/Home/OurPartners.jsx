import { ourPartners } from "../../configs/ourPartnersConfig";

const OurPartners = () => {
  return (
    <main className="md:h-auto lg:h-[calc(100vh-56px)] bg-slate-50 px-5 sm:px-10 md:px-20 lg:px-32 py-10 lg:py-0 grid place-items-center">
      <main className="w-full">
        <h1 className="text-2xl sm:text-3xl flex flex-col space-y-1 mb-3.5 sm:mb-5 font-normal">
          <span className="w-20 h-0.5 rounded-full bg-cyan-300"></span>
          <span className="text-slate-400">
            Our financial <span className="text-cyan-400">partners</span>
          </span>
        </h1>
        <section className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2.5 sm:gap-5">
          {ourPartners.map((i, j) => (
            <div
              key={j}
              style={{ backgroundImage: `url(${i})` }}
              className="h-16 bg-white bg-contain bg-center bg-no-repeat rounded-lg shadow"
            ></div>
          ))}
        </section>
      </main>
    </main>
  );
};

export default OurPartners;
