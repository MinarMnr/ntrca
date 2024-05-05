import * as React from "react";
import { Button, Col, Modal, Row } from "@themesberg/react-bootstrap";

const ConfirmationModal = ({
  show,
  title,
  onConfirm,
  onClose,
  children,
  type = "button",
}) => {
  return (
    <React.Fragment>
      <Modal as={Modal.Dialog} show={show} onHide={onClose}>
        <Modal.Header>
          <Modal.Title className="h5">{title}</Modal.Title>
          <Button
            variant="close"
            aria-label="Close"
            onClick={() => onClose()}
          />
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={12}>{children}</Col>
            <Col md={12} className="mb-20">
              <Button
                variant="success"
                className="f-right ml-5"
                onClick={() => onConfirm()}
                type={type}
              >
                Yes
              </Button>
              <Button
                variant="default"
                className="f-right"
                onClick={() => onClose()}
              >
                No
              </Button>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

export default ConfirmationModal;
