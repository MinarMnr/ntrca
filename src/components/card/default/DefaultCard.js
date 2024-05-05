import React from "react";
import { Card, Col, Row } from "@themesberg/react-bootstrap";
import "./DefaultCard.scss";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function DefaultCard(props) {
  const {
    title,
    height,
    children,
    headerSlot,
    footerSlot,
    loader = false,
    defaultSpace = true,
  } = props;

  return (
    <Card
      border="light"
      className={`bg-white shadow-sm pspacer ${height ?? "hight93"}`}
    >
      <Card.Header className="p-10">
        <h6 className="mb-0 mt-9 f-left pl-10">{title}</h6>
        {headerSlot !== undefined && headerSlot()}
      </Card.Header>
      <Card.Body
        className={`default-card-wrapper ${!defaultSpace ? "p-0 m-0" : ""}`}
      >
        {loader && (
          <div className="default-card-loader">
            <FontAwesomeIcon
              icon={faCircleNotch}
              className="default-card-loader-icon"
            />
          </div>
        )}
        <Row className="justify-content-between align-items-center default-card-content">
          <Col xs={12} md={12} lg={12} xl={12}>
            {children}
          </Col>
        </Row>
      </Card.Body>
      {footerSlot !== undefined && <Card.Footer>{footerSlot()}</Card.Footer>}
    </Card>
  );
}
