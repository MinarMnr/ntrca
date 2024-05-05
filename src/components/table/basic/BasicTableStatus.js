import * as React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEllipsisH, faEye, faTrashAlt, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { Button, ButtonGroup, Dropdown } from "@themesberg/react-bootstrap";
import { Badge } from '@themesberg/react-bootstrap';
import { Form, Field } from "formik/dist/index";
const BasicTableStatus = (props) => {

  const { onDefultClick, onActiveClick, onInActiveClick, onHoldClick, status } = props;

  if (status.recordStatus === "ACTIVE") {

    return (

      <Dropdown as={ButtonGroup}>
        <Dropdown.Toggle as={Button} split variant="link" className="text-dark m-0 p-0" >
          <span className="" onClick={onDefultClick}>
            <Badge bg="success" className="me-1 text-center" style={{ padding: '0.5rem 0.5rem'  }}>ACTIVE
              <FontAwesomeIcon icon={faCaretDown} className=" ml-8 " title='Down' />
            </Badge>
  
          </span>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={onInActiveClick} className='text-center py-1'>
            <Badge bg="dark">Inactive</Badge>
          </Dropdown.Item>
          {/* <Dropdown.Item onClick={onHoldClick} className='text-center py-1'>
            <Badge bg="warning" text="dark" className="me-1">Hold</Badge>
          </Dropdown.Item> */}
        </Dropdown.Menu>
      </Dropdown>
  
  
  
    )

  } else if (status.recordStatus === "INACTIVE") {
    return (

      <Dropdown as={ButtonGroup}>
        <Dropdown.Toggle as={Button} split variant="link" className="text-dark m-0 p-0" >
          <span className="" onClick={onDefultClick}>
            <Badge bg="dark" className="me-1 text-center" style={{ padding: '0.5rem 0.5rem'  }}>Inactive
              <FontAwesomeIcon icon={faCaretDown} className=" ml-8 " title='Down' />
            </Badge>
  
          </span>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={onActiveClick} className='text-center py-1'>
            <Badge bg="success" className="me-1 text-center" style={{ padding: '0.5rem 0.5rem'  }}>Active
            <FontAwesomeIcon icon={faCaretDown} className=" ml-8 " title='Down' />
            </Badge>
            {/* <FontAwesomeIcon icon={faEye} className="me-2" title='Wating List'/>  */}
          </Dropdown.Item>
          {/* <Dropdown.Item onClick={onHoldClick} className='text-center py-1'>
            <Badge bg="warning" text="dark" className="me-1">Hold</Badge>
          </Dropdown.Item> */}
        </Dropdown.Menu>
      </Dropdown>
  
  
  
    )

  } 
  // else if (status.recordStatus === "HOLD") {
  //   return (

  //     <Dropdown as={ButtonGroup}>
  //       <Dropdown.Toggle as={Button} split variant="link" className="text-dark m-0 p-0" >
  //         <span className="" onClick={onDefultClick}>
  //           <Badge bg="warning" className="me-1 text-center" style={{ padding: '0.5rem 0.5rem'  }}>Hold
  //             <FontAwesomeIcon icon={faCaretDown} className=" ml-8 " title='Down' />
  //           </Badge>
  
  //         </span>
  //       </Dropdown.Toggle>
  //       <Dropdown.Menu>
  //         <Dropdown.Item onClick={onActiveClick} className='text-center py-1'>
  //           <Badge bg="success" className="me-1">Active</Badge>
  //           {/* <FontAwesomeIcon icon={faEye} className="me-2" title='Wating List'/>  */}
  //         </Dropdown.Item>
  //         <Dropdown.Item onClick={onInActiveClick} className='text-center py-1'>
  //           <Badge bg="dark">Inactive</Badge>
  //         </Dropdown.Item>
  //       </Dropdown.Menu>
  //     </Dropdown>
  
  
  
  //   )

  // } 
  else {

    return (

      <Dropdown as={ButtonGroup}>
        <Dropdown.Toggle as={Button} split variant="link" className="text-dark m-0 p-0" >
          <span className="" onClick={onDefultClick}>
            <Badge bg="primary" className="me-1 text-center" style={{ padding: '0.5rem 0.5rem'  }}>Default
              <FontAwesomeIcon icon={faCaretDown} className=" ml-8 " title='Down' />
            </Badge>
  
          </span>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={onActiveClick} className='text-center py-1'>
            <Badge bg="success" className="me-1">Active</Badge>
            {/* <FontAwesomeIcon icon={faEye} className="me-2" title='Wating List'/>  */}
          </Dropdown.Item>
          <Dropdown.Item onClick={onInActiveClick} className='text-center py-1'>
            <Badge bg="dark">Inactive</Badge>
          </Dropdown.Item>
          {/* <Dropdown.Item onClick={onHoldClick} className='text-center py-1'>
            <Badge bg="warning" text="dark" className="me-1">Hold</Badge>
          </Dropdown.Item> */}
        </Dropdown.Menu>
      </Dropdown>
  
  
  
    )

  }

};

export default BasicTableStatus;