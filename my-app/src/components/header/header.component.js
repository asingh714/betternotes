import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { IconContext } from "react-icons";
import { BsCart3, BsSearch } from "react-icons/bs";
import { connect } from "react-redux";

import { logoutUser } from "../../redux/actions/user.actions";
import Button from "../button/button.component";
import SearchBar from "../search-bar/SearchBar.component";
import "./header.styles.scss";

function Header({
  isLoggedIn,
  logoutUser,
  profileData,
  dropdown,
  setDropdown,
  name,
  handleChange,
  value,
  searchBarFilter,
}) {
  const navigate = useNavigate();

  function handleLogout() {
    logoutUser();
    setDropdown(false);
    // navigate("/");
  }

  function handleSearch(e) {
    e.preventDefault();
    searchBarFilter();
    navigate("/notes");
  }

  return (
    <header className="full-header-container">
      <span onClick={() => navigate("/")} className="logo">
        BETTER NOTE
      </span>
      <form action="submit" onSubmit={(e) => handleSearch(e)}>
        <SearchBar
          name={name}
          handleChange={handleChange}
          placeholder="&#x1F50D; Search by class subject"
          type="text"
          inputStyle="long-search-input"
          value={value}
        />
      </form>
      <nav className="right-header-container">
        <span onClick={() => navigate("/notes")} className="nav-notes">
          Notes
        </span>
        <IconContext.Provider
          value={{
            style: {
              verticalAlign: "middle",
              fontSize: "2em",
              cursor: "pointer",
              color: "#0552b5",
            },
          }}
        >
          <BsCart3 onClick={() => navigate("/")} />
        </IconContext.Provider>
        {isLoggedIn ? (
          // <Button handleSubmit={handleLogout} buttonStyle="small-bluesix-btn">
          //   Logout
          // </Button>
          <>
            <img
              src={profileData.profile_image}
              alt="profile"
              className="nav-profile-img"
              onClick={() => setDropdown(!dropdown)}
            />
            {dropdown && (
              <div className="nav-profile-dropdown">
                <NavLink
                  to="/profile"
                  className="profile-nav-link"
                  onClick={() => setDropdown(false)}
                >
                  Profile
                </NavLink>
                <NavLink
                  onClick={handleLogout}
                  to="/"
                  // buttonStyle="small-bluesix-btn"
                >
                  Logout
                </NavLink>
              </div>
            )}
          </>
        ) : (
          <div className="nav-button-container">
            <Button
              handleSubmit={() => navigate("/login")}
              buttonStyle="small-plain-btn"
            >
              Log In
            </Button>
            <Button
              handleSubmit={() => navigate("/register")}
              buttonStyle="small-bluesix-btn"
            >
              Sign Up
            </Button>
          </div>
        )}
      </nav>
    </header>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    profileData: state.user.profileData,
  };
};

export default connect(mapStateToProps, { logoutUser })(Header);
