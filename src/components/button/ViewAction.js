import React from 'react';
// import { Badge, Button, Col, Container, Row } from '@themesberg/react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEllipsisH, faEye, faTrashAlt, faUserClock, faUserTimes, faUserPlus } from "@fortawesome/free-solid-svg-icons";

import { Nav } from '@themesberg/react-bootstrap';


const ViewAction = (props) => {
    const { onShowClick ,onDeleteClick} = props;
    return (
        <article>
            <Nav fill defaultActiveKey="home" className="flex-column flex-sm-row">
                <Nav.Item onClick={onShowClick}>
                    <FontAwesomeIcon icon={faEye} className="me-2 text-success" title='View Details' />
                </Nav.Item>
            </Nav>
        </article>
    )
};
export default ViewAction;
