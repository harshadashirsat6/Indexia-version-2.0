// ref - https://www.elearnmarkets.com/emi-calculator
import { useState } from "react";
import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import { defaults } from "chart.js/auto";
import { Pie } from "react-chartjs-2";

defaults.responsive = true;
defaults.maintainAspectRatio = false;
defaults.plugins.legend.display = false;

const CustomSlider = styled(Slider)({
  color: "#6ee7b7",
  height: 6,
  "& .MuiSlider-track": {
    border: "none",
    color: "#6ee7b7",
  },
  "& .MuiSlider-thumb": {
    color: "#6ee7b7",
    backgroundColor: "#fff",
    border: "5px solid currentColor",
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "inherit",
    },
    "&:before": {
      display: "none",
    },
  },
});

const EmiCalc = () => {
  const [vals, setVals] = useState({
    loanAmount: 2500000,
    interestRate: 10.5,
    loanTenure: 20,
  });
  const handleChange = (params) => (e) => {
    console.log(vals);
    setVals({ ...vals, [params]: e.target.value });
  };

  return (
    <main className="mt-[calc(56px+40px)] mb-14 mx-5 sm:mx-10 md:mx-20 lg:mx-32 space-y-10">
      <section>
        <h1 className="text-2xl sm:text-3xl flex flex-col space-y-1 mb-0.5 font-normal">
          <span className="w-20 h-0.5 rounded-full bg-cyan-300"></span>
          <span className="text-slate-400">
            EMI <span className="text-cyan-400">Calculator</span>
          </span>
        </h1>
        <p>
          This calculator will help you to calculate the expected EMI on your
          loan amount by taking into consideration the Principal Amount, Loan
          Tenure and Interest.
        </p>
      </section>
      <main className="flex flex-col md:flex-row space-y-10 md:space-y-0">
        <section className="w-full md:w-1/2 space-y-5 px-5 py-7 border border-slate-300 rounded-xl">
          <div>
            <p className="flex justify-between text-slate-500">
              <span>Loan amount</span>
              <span>
                <span className="text-sm">INR</span>{" "}
                {new Intl.NumberFormat("en").format(vals.loanAmount)}
              </span>
            </p>
            <CustomSlider
              value={vals.loanAmount}
              defaultValue={vals.loanAmount}
              onChange={handleChange("loanAmount")}
              step={10000}
              min={50000}
              max={10000000}
            />
          </div>
          <div>
            <p className="flex justify-between text-slate-500">
              <span>Interest rate</span>
              <span>
                {vals.interestRate}
                <span className="text-sm">%</span>
              </span>
            </p>
            <CustomSlider
              value={vals.interestRate}
              defaultValue={vals.interestRate}
              onChange={handleChange("interestRate")}
              step={0.5}
              min={0.5}
              max={100}
            />
          </div>
          <div>
            <p className="flex justify-between text-slate-500">
              <span>Loan amount</span>
              <span>
                {vals.loanTenure} <span className="text-sm">Months</span>
              </span>
            </p>
            <CustomSlider
              value={vals.loanTenure}
              defaultValue={vals.loanTenure}
              onChange={handleChange("loanTenure")}
              step={1}
              min={1}
              max={1000}
            />
          </div>
        </section>
        <section className="w-full md:w-1/2 flex flex-col justify-between">
          <h1 className="text-center">
            EMI of{" "}
            <span className="text-xl">
              {new Intl.NumberFormat("en").format(
                Math.round(
                  vals.loanAmount *
                    (vals.interestRate / 12 / 100) *
                    (Math.pow(
                      1 + vals.interestRate / 12 / 100,
                      vals.loanTenure
                    ) /
                      (Math.pow(
                        1 + vals.interestRate / 12 / 100,
                        vals.loanTenure
                      ) -
                        1))
                )
              )}
            </span>{" "}
            on a principal loan amount of ₹
            {new Intl.NumberFormat("en").format(vals.loanAmount)} at{" "}
            {vals.interestRate}% for {vals.loanTenure} years.
          </h1>
          <div className="h-[calc(284.8px-52px)] w-full">
            <Pie
              data={{
                labels: ["Interest rate", "Principle loan amount"],
                datasets: [
                  {
                    label: "",
                    data: [
                      Math.round(
                        vals.loanAmount *
                          (vals.interestRate / 12 / 100) *
                          (Math.pow(
                            1 + vals.interestRate / 12 / 100,
                            vals.loanTenure
                          ) /
                            (Math.pow(
                              1 + vals.interestRate / 12 / 100,
                              vals.loanTenure
                            ) -
                              1))
                      ) *
                        vals.loanTenure -
                        vals.loanAmount,
                      vals.loanAmount,
                    ],
                    backgroundColor: [
                      "rgb(96, 165, 250, 0.25)",
                      "rgb(248, 113, 113, 0.25)",
                    ],
                  },
                ],
              }}
            />
          </div>
        </section>
      </main>
      <section className="space-y-2.5">
        <h2 className="text-xl">What is an EMI?</h2>
        <p>
          Equated Monthly Instalment, often known as EMI, is a set sum that a
          borrower pays to the lender each month on a particular date that is
          pre-determined at the time the loan, product, or service is obtained.
        </p>
        <p>
          These payments are applied to the main and interest balances, making
          it simple to pay back the borrowed money over a certain number of
          years.
        </p>
        <p>
          Equated Monthly Instalments, or EMI, is a concept that works
          particularly well with several loan types, such as auto loans,
          mortgages on real estate, student loans, and many others, where the
          borrower makes fixed monthly payments to the lender over a number of
          years to pay off the entire loan amount.
        </p>
        <p>
          In order to calculate, Equated Monthly Instalments or EMI we use an
          EMI calculator, which helps us to determine what amount we need to pay
          every month.
        </p>
      </section>
      <section className="space-y-2.5">
        <h2 className="text-xl">What factors affect EMI?</h2>
        <p>The following are the elements that influence an EMI:</p>
        <ul className="list-inside list-decimal">
          <li>
            The principal borrowed refers to the entire amount of loans taken
            out by the borrower.
          </li>
          <li>
            Interest rate: This is the rate of interest applied to the amount
            borrowed.
          </li>
          <li>
            The length of the loan, or its tenure, is determined by the borrower
            and lender.
          </li>
          <li>
            Whether the loan is fixed or floating, the "Rest" component will
            have an impact on the EMI.
          </li>
        </ul>
        <p>
          The EMI for a fixed loan type stays constant during the course of the
          loan. The EMI amount, however, may change in the floating kind
          depending on when the interest rate increases.
        </p>
      </section>
      <section className="space-y-2.5">
        <h2 className="text-xl">
          How does an EMI (Equated Monthly Instalment) Work?
        </h2>
        <p>
          Before we get into the EMI calculation, we should remember the
          following three points.
        </p>
        <ul className="list-inside list-decimal">
          <li>
            The EMI payments are directly proportional to loan amount and
            interest rates. But inversely proportional to loan tenure.
          </li>
          <li>
            The EMI payments increase in proportion to the loan amount or
            interest rate, and vice versa.
          </li>
          <li>
            Even though the total amount of interest that must be paid rises as
            the loan period lengthens, the EMI payments fall as the loan tenure
            lengthens.
          </li>
        </ul>
      </section>
      <section className="space-y-2.5">
        <h2 className="text-xl">How do calculate EMI?</h2>
        <p>The mathematical formula EMI is as following:</p>
        <p>
          These payments are applied to the main and interest balances, making
          it simple to pay back the borrowed money over a certain number of
          years.
        </p>
        <p>
          EMI = Loan Amount × Rate of Return × (1 + Rate of Return) ^ Tenure /
          ((1 + Rate of Return) ^ Tenure- 1. Is this formula looking like a
          Greek to you? Let us explain the calculation with an example: Suppose
          our amount for Rs 1 lakh, interest rate is 10% and 12 months tenure,
          then putting the values in the formula- EMI= 1,00,000 x 0.10 x
          (1+0.10) ^12/ ((1 + 0.10) ^12- 1 = Rs. 8,792
        </p>
        <p>
          In order to calculate, Equated Monthly Instalments or EMI we use an
          EMI calculator, which helps us to determine what amount we need to pay
          every month.
        </p>
      </section>
    </main>
  );
};

export default EmiCalc;
