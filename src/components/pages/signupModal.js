import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";

export default class SignUpModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: this.props.activeItem,
    };
  }

  handleChange = (e) => {
    let { name, value } = e.target;

    if (e.target.type === "checkbox") {
      value = e.target.checked;
    }

    const activeItem = { ...this.state.activeItem, [name]: value };

    this.setState({ activeItem });
  };

  render() {
    const { toggle, onSave } = this.props;

    return (
      <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}>New Users</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="users-username">Username</Label>
              <Input
                type="text"
                id="users-username"
                name="username"
                value={this.state.activeItem.username}
                onChange={this.handleChange}
                placeholder="Enter Username"
              />
            </FormGroup>
            <FormGroup>
              <Label for="users-first_name">First name</Label>
              <Input
                type="text"
                id="users-first_name"
                name="first_name"
                value={this.state.activeItem.first_name}
                onChange={this.handleChange}
                placeholder="Enter your first name"
              />
            </FormGroup>
            <FormGroup>
              <Label for="users-last_name">Last name</Label>
              <Input
                type="text"
                id="users-last_name"
                name="last_name"
                value={this.state.activeItem.last_name}
                onChange={this.handleChange}
                placeholder="Enter your last name"
              />
              <FormGroup>
              <Label for="users-email">E-Mail</Label>
              <Input
                type="text"
                id="users-email"
                name="email"
                value={this.state.activeItem.email}
                onChange={this.handleChange}
                placeholder="Enter your email"
              />
              <FormGroup>
              <Label for="users-password">Password</Label>
              <Input
                type="text"
                id="users-password"
                name="password"
                value={this.state.activeItem.password}
                onChange={this.handleChange}
                placeholder="Enter your password"
              />
            </FormGroup>
            </FormGroup>
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input
                  type="checkbox"
                  name="is_superuser"
                  checked={this.state.activeItem.is_superuser}
                  onChange={this.handleChange}
                />
                Is Superuser
              </Label>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            color="success"
            onClick={() => onSave(this.state.activeItem)}
          >
            Save
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}