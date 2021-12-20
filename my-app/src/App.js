import { Route, Routes } from "react-router-dom";

import Home from "./pages/home/Home.page";
import RegisterPage from "./pages/register/Register.page";
import Verify from "./pages/verify/Verify.page";
import Login from "./pages/login/Login.page";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/api/auth/verify-email" element={<Verify />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
