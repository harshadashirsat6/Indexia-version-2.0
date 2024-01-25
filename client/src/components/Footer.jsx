import { motion } from "framer-motion";
import {
  BiLogoFacebookCircle,
  BiLogoTwitter,
  BiLogoYoutube,
  BiLogoLinkedin,
} from "react-icons/bi";
import { footerConfig } from "../configs/footerConfig";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#00093c] to-[#2d0b00] px-5 md:px-10 lg:px-20 xl:px-40 py-10 lg:py-20 text-slate-300 text-sm ">
      <main className="flex flex-col flex-wrap lg:flex-nowrap lg:flex-row justify-between space-y-5 ">
        <section className="space-y-3">
          <h1 className="text-xl font-acme text-slate-300 tracking-wide cursor-pointer">
            IndexiaFinance
          </h1>
          <img
            src="/rotating-earth.gif"
            alt="rotating-earth"
            className="w-52"
          />
          <div className="flex items-center space-x-3">
            <a
              href="https://www.facebook.com/IndexiaFin/"
              className="bg-slate-700 hover:bg-emerald-400 duration-200 cursor-pointer rounded-full p-1.5 w-fit"
            >
              <BiLogoFacebookCircle className="text-lg" />
            </a>
            <a
              href="https://twitter.com/Indexia_Finance"
              className="bg-slate-700 hover:bg-emerald-400 duration-200 cursor-pointer rounded-full p-1.5 w-fit"
            >
              <BiLogoTwitter className="text-lg" />
            </a>
            <a
              href="https://www.youtube.com/channel/UCNg7NyjZel9ush_CxWOPeoQ?view_as=subscriber"
              className="bg-slate-700 hover:bg-emerald-400 duration-200 cursor-pointer rounded-full p-1.5 w-fit"
            >
              <BiLogoYoutube className="text-lg" />
            </a>
            <a
              href="https://www.linkedin.com/in/indexia-finance-17800590/"
              className="bg-slate-700 hover:bg-emerald-400 duration-200 cursor-pointer rounded-full p-1.5 w-fit"
            >
              <BiLogoLinkedin className="text-lg" />
            </a>
          </div>
        </section>
        <section className="grid grid-cols-2 md:grid-cols-3 gap-8">
        <ul className="space-y-2.5 text-base ">
          {footerConfig.slice(0, 4).map((i) => (
            <motion.li
              whileHover={{ scale: 1.1, originX: 0 }}
              transition={{ type: "spring", stiffness: "300" }}
              key={i}
              className="hover:text-white cursor-pointer w-fit"
            >
              {i}
            </motion.li>
          ))}
        </ul>
        <ul className="space-y-2.5 text-base ">
          {footerConfig.slice(4, 8).map((i) => (
            <motion.li
              whileHover={{ scale: 1.1, originX: 0 }}
              transition={{ type: "spring", stiffness: "300" }}
              key={i}
              className="hover:text-white cursor-pointer w-fit"
            >
              {i}
            </motion.li>
          ))}
        </ul>
        <ul className="space-y-2.5 text-base col-span-2 sm:col-span-1">
          {footerConfig.slice(8).map((i) => (
            <motion.li
              whileHover={{ scale: 1.1, originX: 0 }}
              transition={{ type: "spring", stiffness: "300" }}
              key={i}
              className="hover:text-white cursor-pointer w-fit"
            >
              {i}
            </motion.li>
          ))}
        </ul>
        </section >
      </main>
    </footer>
  );
};

export default Footer;
