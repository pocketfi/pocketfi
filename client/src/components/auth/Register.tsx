import React, {useCallback, useEffect, useState} from 'react';
import {Alert, Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalHeader, NavLink} from 'reactstrap';
import {connect} from 'react-redux';
import {Target} from "../../types/Target";
import {Register} from "../../types/Register";
import {AuthProps} from "../../types/AuthProps";
import {register} from "../../actions/authActions";

const RegisterModal = ({
                         isAuthenticated,
                         register
                       }: Register) => {
  const [modal, setModal] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState(null);

  const handleToggle = useCallback(() => {

    setModal(!modal);
  }, [modal]);

  const handleChangeName = (e: Target) => setName(e.target.value);
  const handleChangeEmail = (e: Target) => setEmail(e.target.value);
  const handleChangePassword = (e: Target) => setPassword(e.target.value);

  const handleOnSubmit = (e: any) => {
    e.preventDefault();

    const user = {
      name,
      email,
      password
    };

    register(user);
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
        Register
      </NavLink>

      <Modal isOpen={modal} toggle={handleToggle}>
        <ModalHeader toggle={handleToggle}>Register</ModalHeader>
        <ModalBody>
          {msg ? <Alert color="danger">{msg}</Alert> : null}
          <Form onSubmit={handleOnSubmit}>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                type="text"
                name="name"
                id="name"
                placeholder="Name"
                className="mb-3"
                onChange={handleChangeName}
              />

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
              <Button color="dark" style={{marginTop: '2rem'}} block>
                Register
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

export default connect(mapStateToProps, {register})(
  RegisterModal
);
