import React, {useCallback, useEffect, useState} from 'react';
import {Alert, Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalHeader, NavLink} from 'reactstrap';
import {connect} from 'react-redux';
import {Login} from "../../types/Login";
import {Target} from "../../types/Target";
import {AuthProps} from "../../types/AuthProps";
import {login} from "../../actions/authActions";

const LoginModal = ({
                      isAuthenticated,
                      login}: Login) => {
  const [modal, setModal] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState(null);

  const handleToggle = useCallback(() => {

    setModal(!modal);
  }, [modal]);

  const handleChangeEmail = (e: Target) => setEmail(e.target.value);
  const handleChangePassword = (e: Target) => setPassword(e.target.value);

  const handleOnSubmit = (e: any) => {
    e.preventDefault();

    const user = {email, password};

    login(user);
  };

  useEffect(() => {
    if (modal) {
      if (isAuthenticated) {
        handleToggle();
      }
    }
  }, [handleToggle, isAuthenticated, modal]);

  return (
    <div>
      <NavLink onClick={handleToggle} href="#">
        Login
      </NavLink>

      <Modal isOpen={modal} toggle={handleToggle}>
        <ModalHeader toggle={handleToggle}>Login</ModalHeader>
        <ModalBody>
          {msg ? <Alert color="danger">{msg}</Alert> : null}
          <Form>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                className="mb-3"
                onChange={handleChangeEmail}
              />

              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                className="mb-3"
                onChange={handleChangePassword}
              />
              <Button
                color="dark"
                style={{marginTop: '2rem'}}
                block
                onClick={handleOnSubmit}
              >
                Login
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state: AuthProps) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {login})(LoginModal);
