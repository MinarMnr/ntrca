import React from 'react';
// import { Badge, Button, Col, Container, Row } from '@themesberg/react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEllipsisH, faEye, faTrashAlt, faUserClock, faUserTimes, faUserPlus } from "@fortawesome/free-solid-svg-icons";
// import {
//     Col,
//     Container,
//     Dropdown,
//     Form,
//     Image,
//     InputGroup,
//     ListGroup,
//     Nav,
//     Navbar,
//     Row
//   } from '@themesberg/react-bootstrap';
import { Nav } from '@themesberg/react-bootstrap';
// import {Button, ButtonGroup, Dropdown} from "@themesberg/react-bootstrap";
// import Documentation from "../../components/Documentation";


const ListsAction = (props) => {
    const { onWatingClick, onSelectedClick, onRejectedClick } = props;
    return (
        <article>
            <Nav fill  className="flex-column flex-sm-row">
                <Nav.Item onClick={onWatingClick}>
                    <a href="/applicant-waiting-list" className="" title='View Details'>
                        <FontAwesomeIcon icon={faUserClock} className="me-2 text-defult" title='Wating List' />
                    </a>
                </Nav.Item>
                <Nav.Item onClick={onSelectedClick}>
                    <a href="/applicant-final-list" className="">
                        <FontAwesomeIcon icon={faUserPlus} className="me-2 text-success" title='Selected List' />
                    </a>
                </Nav.Item>
                <Nav.Item onClick={onRejectedClick}>
                    <a href="/applicant-rejected-list" className="">
                        <FontAwesomeIcon icon={faUserTimes} className="me-2 text-danger" title='Rejected List' />
                    </a>
                </Nav.Item>
            </Nav>
            {/* <React.Fragment>
            <Badge  className="me-1" onClick={onShowClick}><FontAwesomeIcon icon={faEye} className="me-2"/> View Details</Badge>
            <Badge className="me-1" onClick={onApplyClick}><FontAwesomeIcon icon={faEdit} className="me-2"/> Apply</Badge>
        </React.Fragment> */}
        </article>
    )
};
export default ListsAction;
