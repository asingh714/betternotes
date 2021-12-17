import { Route, Routes } from "react-router-dom";

import Home from "./pages/home/Home.page";
import Register from "./pages/register/Register.page";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;
