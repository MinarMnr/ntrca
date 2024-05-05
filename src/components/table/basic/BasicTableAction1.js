import { faEdit, faEllipsisH, faEye, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, ButtonGroup, Dropdown } from "@themesberg/react-bootstrap";
import * as React from 'react';

const BasicTableAction1 = (props) => {
  
  const {onShowClick, onEditClick, onDeleteClick, onApproveClick} = props;
  if (props.data === "process") {
    return (
      <Dropdown as={ButtonGroup}>
        <Dropdown.Toggle as={Button} split variant="link" className="text-dark m-0 p-0">
          <span className="icon icon-sm">
            <FontAwesomeIcon icon={faEllipsisH} className="icon-dark"/>
          </span>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={onShowClick}>
            <FontAwesomeIcon icon={faEye} className="me-2" title='View Details'/> 
          </Dropdown.Item>
          <Dropdown.Item onClick={onApproveClick}>
            <FontAwesomeIcon icon={faEdit} className="me-2" title='Approve'/> 
          </Dropdown.Item>
          <Dropdown.Item  onClick={onDeleteClick}>
            <FontAwesomeIcon icon={faTrashAlt} className="me-2" title=' Waiting'/>
          </Dropdown.Item>
          <Dropdown.Item className="text-danger" onClick={onDeleteClick}>
            <FontAwesomeIcon icon={faTrashAlt} className="me-2" title=' Reject'/> 
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    )
  } else {
    return (
      <Dropdown as={ButtonGroup}>
        <Dropdown.Toggle as={Button} split variant="link" className="text-dark m-0 p-0">
          <span className="icon icon-sm">
            <FontAwesomeIcon icon={faEllipsisH} className="icon-dark"/>
          </span>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={onShowClick}>
            <FontAwesomeIcon icon={faEye} className="me-2"/> View Details
          </Dropdown.Item>
          {/* <Dropdown.Item className="text-danger" onClick={onDeleteClick}>
            <FontAwesomeIcon icon={faTrashAlt} className="me-2"/> Reject
          </Dropdown.Item> */}
        </Dropdown.Menu>
      </Dropdown>
    )

  }
  
  
  
};

export default BasicTableAction1;