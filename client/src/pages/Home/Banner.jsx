import { motion } from "framer-motion";

const Banner = () => {
  return (
    <main className="h-auto lg:h-screen flex flex-col lg:flex-row space-y-10 lg:space-y-0 items-center justify-center lg:justify-between mx-5 sm:mx-10 md:mx-20 lg:mx-32 mt-[calc(56px+20px)] lg:mt-0">
      <motion.section className="w-full lg:w-[600px] space-y-5">
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-slate-500 lg:leading-none">
          The Next{" "}
          <span className="bg-gradient-to-br from-cyan-400 to-emerald-300 bg-clip-text text-transparent">
            Generation
          </span>{" "}
          Finance Method
        </h1>
        <p className="text-gray-600 font-[500]">
           Discover the world of smart loans at IndexiaFinance. We bring you
          financial solutions that make living smoother. Because managing your
          dreams shouldn't be complicated anymore.
        </p>
        <div className="space-x-2.5 text-sm sm:text-base flex whitespace-nowrap overflow-x-scroll scrollbar-none pb-1">
          <button className="px-5 pb-2.5 pt-[9px] rounded-full border border-slate-500 hover:bg-cyan-400 hover:border-cyan-400 hover:text-white duration-200 text-lg">
            Get credit score for free
          </button>
        </div>
      </motion.section>
      <motion.img
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 100, scale: 1 }}
        transition={{ type: "spring", stiffness: 300 }}
        src="./robot.png"
        alt="robot-img"
        className="w-full lg:w-[45%]"
      />
    </main>
  );
};

export default Banner;
