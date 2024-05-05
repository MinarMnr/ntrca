import React from "react";
import "./SideModal.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@themesberg/react-bootstrap";

const SideModal = ({
  show = false,
  loading = false,
  width = "0%",
  onClose,
  children,
  ...props
}) => {
  return (
    <>
      <div className="">
        <div
          className="side-modal fade-in-right  overflow_class98"
          style={{ width: width }}
        >
          <div className="side-modal-header">
            <Button
              variant="link"
              className="m-0 btn-sm text-black f-right"
              type="reset"
              onClick={() => onClose()}
            >
              <FontAwesomeIcon icon={faTimesCircle} className="m-0 p-0" />
            </Button>
          </div>
          <div className="side-modal-content">{children}</div>
        </div>
      </div>
    </>
  );
};

export default SideModal;
