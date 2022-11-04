import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

export default class DetailModal extends Component {

  render (){
    const { toggledetail } = this.props;

  return (
    <Modal isOpen={true} toggle={toggledetail}>
        <ModalHeader toggle={toggledetail}>Todo Item</ModalHeader>
        <ModalBody>
          
        </ModalBody>
        <ModalFooter>
          <Button
            color="success"
          >
            Save
          </Button>
        </ModalFooter>
      </Modal>
  );
  }
};