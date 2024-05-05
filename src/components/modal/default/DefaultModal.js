import React from "react";
import "./DefaultModal.scss";
import { Button, Modal } from "@themesberg/react-bootstrap";

const DefaultModal = ({
  show = false,
  centered = true,
  loading = false,
  title = "Modal",
  size,
  onClose,
  children,
  ...props
}) => {
  return (
    <>
      <Modal
        as={Modal.Dialog}
        show={show}
        onHide={onClose}
        size={size}
        centered={centered}
      >
        <Modal.Header className="custom-bg">
          <Modal.Title className="h6 mb-0 mt-9 f-left pl-10 text-white">
            {title}
          </Modal.Title>
          <Button variant="close" aria-label="Close" onClick={onClose} />
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
      </Modal>
    </>
  );
};

export default DefaultModal;
