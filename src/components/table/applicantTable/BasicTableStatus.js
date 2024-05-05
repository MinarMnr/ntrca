import * as React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faEllipsisH, faEye, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import {Button, ButtonGroup, Dropdown} from "@themesberg/react-bootstrap";

const BasicTableStatus = (props) => {
  
  const {onWatingClick, onSelectedClick, onRejectedClick} = props;
  
  return (
    <Dropdown as={ButtonGroup}>
      <Dropdown.Toggle as={Button} split variant="link" className="text-dark m-0 p-0">
        <span className="icon icon-sm">
          <FontAwesomeIcon icon={faEllipsisH} className="icon-light"/>
        </span>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={onWatingClick}>
          <FontAwesomeIcon icon={faEye} className="me-2" title='Wating List'/> Wating List
        </Dropdown.Item>
        <Dropdown.Item onClick={onSelectedClick}>
          <FontAwesomeIcon icon={faEdit} className="me-2" title='Selected List'/> Selected List
        </Dropdown.Item>
        <Dropdown.Item onClick={onRejectedClick}>
          <FontAwesomeIcon icon={faEdit} className="me-2" title='Rejected List'/> Rejected List
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
  
};

export default BasicTableStatus;