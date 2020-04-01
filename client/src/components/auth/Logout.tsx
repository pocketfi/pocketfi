import React, {Fragment} from 'react';
import {NavLink} from 'reactstrap';
import {connect} from 'react-redux';
import {LogoutProps} from "../../types/LogoutProps";
import {logout} from "../../actions/authActions";

export const Logout = ({logout}: LogoutProps) => {
  return (
    <Fragment>
      <NavLink onClick={logout} href="#">
        Logout
      </NavLink>
    </Fragment>
  );
};

export default connect(null, {logout})(Logout);
