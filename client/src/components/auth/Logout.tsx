import React, { Fragment } from 'react';
import { NavLink } from 'reactstrap';
import { connect } from 'react-redux';
import { logout } from '../../actions/logoutUser';
import {LogoutProps} from "../../interfaces/LogoutProps";

export const Logout = ({ logout }: LogoutProps) => {
    return (
        <Fragment>
            <NavLink onClick={logout} href="#">
                Logout
            </NavLink>
        </Fragment>
    );
};

export default connect(null, { logout })(Logout);