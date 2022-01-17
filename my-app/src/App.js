import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { connect } from "react-redux";

import Header from "./components/header/header.component";
import Footer from "./components/footer/footer.component";
import Home from "./pages/home/Home.page";
import RegisterPage from "./pages/register/Register.page";
import Verify from "./pages/verify/Verify.page";
import Login from "./pages/login/Login.page";
import ForgotPassword from "./pages/forgot-password/Forgot-Password.page";
import ResetPassword from "./pages/reset-password/Reset-Password.page";
import NotesDashboard from "./pages/notes-dashboard/Notes-Dashboard.page";
import SingleNoteInfo from "./pages/single-note-info/Single-Note-Info.page";
import Author from "./pages/author/Author.page";
import Profile from "./pages/profile/Profile.page";
import EditProfilePageFrom from "./pages/edit-profile/EditProfilePageForm.component";
import ProfileForSale from "./pages/profile-forSale/Profile-ForSale.pages";
import ProfilePurchasedItems from "./pages/profile-purchased/Profile-Purchased.pages";

import { userLoggedIn } from "./redux/actions/user.actions";

function App({ userLoggedIn, ...props }) {
  useEffect(() => {
    userLoggedIn();
  }, [userLoggedIn]);
  return (
    <div className="page-container">
      <Header />
      <div className="content-container">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/api/auth/verify-email" element={<Verify />} />
          <Route path="/login" element={<Login {...props} />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/api/auth/reset-password" element={<ResetPassword />} />

          <Route exact path="/notes" element={<NotesDashboard />} />
          <Route path="/notes/:unique_note_id" element={<SingleNoteInfo />} />
          <Route
            path="/user/:unique_user_id/notes/:user_id"
            element={<Author />}
          />

          <Route exact path="/profile" element={<Profile />} />
          <Route path="/profile/edit" element={<EditProfilePageFrom />} />

          <Route path="/profile/forSale" element={<ProfileForSale />} />
          <Route
            path="/profile/purchased"
            element={<ProfilePurchasedItems />}
          />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default connect(null, { userLoggedIn })(App);
