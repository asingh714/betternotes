import React from "react";
import { useSearchParams } from "react-router-dom";
import { connect } from "react-redux";

import Button from "../../components/button/button.component";
import { verifyUser } from "../../redux/actions/user.actions";

function Verify({ verifyUser }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const email = searchParams.get("email") || "";
  const token = searchParams.get("token") || "";

  const handleSubmit = (event) => {
    verifyUser(email, token);
  };

  return (
    <>
      <span>Email: {email}</span>
      <Button type="submit" handleSubmit={handleSubmit}>
        Click to Verify
      </Button>
    </>
  );
}

const mapStateToProps = (state) => {
  return {};
};
export default connect(mapStateToProps, { verifyUser })(Verify);
