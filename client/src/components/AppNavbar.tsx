import React, {Fragment, useState} from 'react';
import {Collapse, Container, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem} from 'reactstrap';
import {connect} from 'react-redux';
import Register from './auth/Register';
import Login from './auth/Login';
import Logout from './auth/Logout';
import {AuthProps} from "../types/AuthProps";
import {NavbarApp} from "../types/NavbarApp";

const AppNavbar = ({auth}: NavbarApp) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => setIsOpen(!isOpen);

  const authLinks = (
    <Fragment>
      <NavItem>
        <span className="navbar-text mr-3">
          <strong>
            {auth && auth.user ? `Welcome ${auth.user.name}` : ''}
          </strong>
        </span>
      </NavItem>
      <NavItem>
        <Logout/>
      </NavItem>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <NavItem>
        <Register/>
      </NavItem>
      <NavItem>
        <Login/>
      </NavItem>
    </Fragment>
  );

  return (
    <div>
      <Navbar color="dark" dark expand="sm" className="mb-5">
        <Container>
          <NavbarBrand href="/">Expense Tracker</NavbarBrand>
          <NavbarToggler onClick={handleToggle}/>
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
              {auth && auth.isAuthenticated ? authLinks : guestLinks}
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

const mapStateToProps = (state: AuthProps) => ({
  auth: state.auth
});

export default connect(mapStateToProps, null)(AppNavbar);
