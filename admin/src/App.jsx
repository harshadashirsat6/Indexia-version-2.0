import { Routes, Route } from "react-router-dom";
import Account from "./pages/Account";
import ProtectedLayout from "./pages/ProtectedLayout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Account />} />
      <Route path="/dashboard" element={<ProtectedLayout />} />
    </Routes>
  );
}

export default App;
