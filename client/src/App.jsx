import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Account from "./pages/Account";
import LoanDetails from "./pages/LoanDetails";
import Dasboard from "./pages/Dashboard";
import Products from "./pages/Products";
import EmiCalc from "./pages/EmiCalc";
import EligibilityCalc from "./pages/EligibilityCalc";
import ContactUsForm from "./pages/ContactUsForm";
import Franchise from "./pages/Franchise";
import Profile from "./pages/Franchise/Dashboard/Profile";
import Loans from "./pages/Franchise/Dashboard/Loans";
import Report from "./pages/Franchise/Dashboard/Report";

function App() {
  const [auth, setAuth] = useState("");
  return (
    <>
      <Routes>
        <Route path="/account" element={<Account />} />

        <Route element={<Layout auth={auth} setAuth={setAuth} />}>
          <Route path="/" element={<Home />} />
          <Route path="/loan/:param" element={<Products />} />
          <Route
            path="/check-loan-details-eligibility"
            element={<LoanDetails />}
          />
          <Route path="/dashboard" element={<Dasboard />} />

          <Route path="/emi-calculator" element={<EmiCalc />} />
          <Route path="/eligibility-calculator" element={<EligibilityCalc />} />
          <Route path="/contact" element={<ContactUsForm />} />
        </Route>
        <Route element={<Franchise />}>
          <Route path="/loans" element={<Loans />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/report" element={<Report />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
