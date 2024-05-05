import { faEdit, faEllipsisH, faEye, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, ButtonGroup, Dropdown } from "@themesberg/react-bootstrap";
import * as React from 'react';

const BasicTableApplyAction = (props) => {
  
  const {onShowClick, onApplyClick, } = props;
  
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
        {/* <Dropdown.Item onClick={onApplyClick}>
          <FontAwesomeIcon icon={faEye} className="me-2 btn"/> Apply
        </Dropdown.Item> */}
      </Dropdown.Menu>
    </Dropdown>
  )
  
};

export default BasicTableApplyAction;