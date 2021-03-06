import { useState, useEffect } from "react";
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
import Cart from "./pages/cart/Cart.page";
import Checkout from "./pages/checkout/Checkout.page";
import Successful from "./pages/successful/Successful.pages";
import PageNotFound from "./pages/page-not-found/PageNotFound.page";

import {
  userLoggedIn,
  fetchOwnProfileData,
} from "./redux/actions/user.actions";

import { fetchNotes } from "./redux/actions/note.actions";

function App({
  notes,
  userLoggedIn,
  fetchOwnProfileData,
  fetchNotes,
  isUserLoggedIn,
  profileData,
  ...props
}) {
  const [dropdown, setDropdown] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredNotes, setFilteredNotes] = useState([]);

  useEffect(() => {
    if (isUserLoggedIn === false) {
      userLoggedIn();
    }
    // if (isUserLoggedIn && Object.entries(profileData).length === 0) {
    //   fetchOwnProfileData();
    // }

    fetchNotes();
  }, [
    isUserLoggedIn,
    userLoggedIn,
    // fetchOwnProfileData,
    fetchNotes,
    // profileData,
    // notes,
    // notes.length,
  ]);

  function searchBarFilter(event) {
    let filtered = notes.filter((note) => {
      let subject = note.subject.toLowerCase();
      return subject.includes(search.toLowerCase());
    });
    setFilteredNotes(filtered);
    setSearch("");
  }
  function handleChange(event) {
    setSearch(event.target.value);
  }
  return (
    <div className="page-container">
      <Header
        dropdown={dropdown}
        handleChange={handleChange}
        name="search"
        setDropdown={setDropdown}
        value={search}
        searchBarFilter={searchBarFilter}
      />
      <div className="content-container" onClick={() => setDropdown(false)}>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/api/auth/verify-email" element={<Verify />} />
          <Route path="/login" element={<Login {...props} />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/api/auth/reset-password" element={<ResetPassword />} />

          <Route
            exact
            path="/notes"
            element={<NotesDashboard filteredNotes={filteredNotes} />}
          />
          <Route path="/notes/:unique_note_id" element={<SingleNoteInfo />} />
          <Route
            path="/user/:unique_user_id/notes/:user_id"
            element={<Author />}
          />

          <Route exact path="/profile" element={<Profile />} />
          <Route path="/profile/edit" element={<EditProfilePageFrom />} />

          <Route path="/profile/forSale" element={<ProfileForSale />} />
          {/* <Route
            path="/profile/purchased"
            element={<ProfilePurchasedItems />}
          /> */}
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/successful" element={<Successful />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    notes: state.notes.notes,
    isUserLoggedIn: state.user.isUserLoggedIn,
    profileData: state.user.profileData,
  };
};

export default connect(mapStateToProps, {
  userLoggedIn,
  fetchOwnProfileData,
  fetchNotes,
})(App);
