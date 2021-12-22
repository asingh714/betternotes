import { Route, Routes } from "react-router-dom";

import Home from "./pages/home/Home.page";
import RegisterPage from "./pages/register/Register.page";
import Verify from "./pages/verify/Verify.page";
import Login from "./pages/login/Login.page";
import ForgotPassword from "./pages/forgot-password/Forgot-Password.page";
import ResetPassword from "./pages/reset-password/Reset-Password.page";
import NotesDashboard from "./pages/notes-dashboard/Notes-Dashboard.page";
import SingleNoteInfo from "./pages/single-note-info/Single-Note-Info.page";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/api/auth/verify-email" element={<Verify />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/api/auth/reset-password" element={<ResetPassword />} />
      <Route path="/notes" element={<NotesDashboard />} />
      <Route path="/notes/:unique_note_id" element={<SingleNoteInfo />} />
    </Routes>
  );
}

export default App;
