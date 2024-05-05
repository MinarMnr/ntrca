import * as React from "react";
import { Card } from "@themesberg/react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPause } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const DashboardWidget = ({
    title,
    icon = faPause,
    count = 0,
    link = "/",
    theme = "l-bg-orange2",
}) => {
    return (
        <Link to={link}>
            <Card
                className={`info-box ${theme} order-info-box mt-10 mb-10`}
                border="secondary"
                style={{ width: "100%" }}
            >
                <Card.Body className="info-box-block">
                    <Card.Title>{title}</Card.Title>
                    <FontAwesomeIcon className="float-start" icon={icon} />
                    <Card.Subtitle className="text-end">
                        <h1>{count}</h1>
                    </Card.Subtitle>
                </Card.Body>
            </Card>
        </Link>
    );
};

export default DashboardWidget;
