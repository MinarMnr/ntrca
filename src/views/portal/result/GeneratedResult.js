import React from "react";
import { Card } from "@themesberg/react-bootstrap";
import { DefaultCard } from "components/card";
import { Button, Col, Row } from "@themesberg/react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome/index";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
const GeneratedResult = () => {
    const history = useHistory();
    return (
        <DefaultCard title="বিশেষ গণবিজ্ঞপ্তি ২০২২">
            <div className="mt-80 mb-80">
                <Row>
                    <Col lg={3} md={1}></Col>
                    <Col lg={4} md={6} className="text-center">
                        <Card className="bg-primary m-2">
                            <Card.Body>
                                <span
                                    className="text-light fw-bold"
                                    onClick={() =>
                                        history.push(
                                            "/portal/selected-applicant-list"
                                        )
                                    }
                                >
                                    বিশেষ গণবিজ্ঞপ্তি ২০২২ (Phase-1)
                                </span>
                            </Card.Body>
                        </Card>
                    </Col>
                    {/* <Col lg={2} md={3}>
                        <Button
                            variant="success"
                            className="m-5"
                            type="submit"
                        // disabled={!clickedData}
                        >
                         
                            Call for PV
                        </Button>
                    </Col> */}
                    <Col lg={3} md={1}></Col>
                </Row>
                <Row className="mt-5">
                    <Col lg={3} md={1}></Col>
                    <Col lg={4} md={6} className="text-center m-2">
                        <Card
                            className="bg-primary"
                            onClick={() =>
                                history.push("/portal/selected-applicant-list")
                            }
                        >
                            <Card.Body>
                                <span
                                    className="text-light fw-bold"
                                    onClick={() =>
                                        history.push(
                                            "/portal/selected-applicant-list"
                                        )
                                    }
                                >
                                    বিশেষ গণবিজ্ঞপ্তি ২০২২ (Phase-2)
                                </span>
                            </Card.Body>
                        </Card>
                    </Col>
                    {/* <Col lg={2} md={3}>
                        <Button
                            variant="success"
                            className="m-5"
                            type="submit"
                        // disabled={!clickedData}
                        >
                         
                            Call for PV
                        </Button>
                    </Col> */}
                    <Col lg={3} md={1}></Col>
                </Row>
                <Row className="mt-5">
                    <Col lg={3} md={1}></Col>
                    <Col
                        lg={4}
                        md={6}
                        className="text-center m-2"
                        onClick={() =>
                            history.push("/portal/selected-applicant-list")
                        }
                    >
                        <Card className="bg-primary">
                            <Card.Body>
                                <span className="text-light fw-bold">
                                    বিশেষ গণবিজ্ঞপ্তি ২০২২ (Phase-3)
                                </span>
                            </Card.Body>
                        </Card>
                    </Col>
                    {/* <Col lg={2} md={3}>
                        <Button
                            variant="success"
                            className="m-5"
                            type="submit"
                        // disabled={!clickedData}
                        >
                         
                            Call for PV
                        </Button>
                    </Col> */}
                    <Col lg={3} md={1}></Col>
                </Row>
                <Row className="mt-5">
                    <Col lg={3} md={1}></Col>
                    <Col lg={4} md={6} className="text-center m-2">
                        <Card
                            className="bg-primary"
                            onClick={() =>
                                history.push("/portal/selected-applicant-list")
                            }
                        >
                            <Card.Body>
                                <span className="text-light fw-bold">
                                    বিশেষ গণবিজ্ঞপ্তি ২০২২ (Phase-4)
                                </span>
                            </Card.Body>
                        </Card>
                    </Col>
                    {/* <Col lg={2} md={3}>
                        <Button
                            variant="success"
                            className="m-5"
                            type="submit"
                        // disabled={!clickedData}
                        >
                         
                            Call for PV
                        </Button>
                    </Col> */}
                    <Col lg={3} md={1}></Col>
                </Row>

                <Row className="mt-5">
                    <Col lg={3} md={1}></Col>
                    <Col lg={4} md={6} className="text-center m-2">
                        <nav aria-label="..." className="f-right">
                            <ul class="pagination">
                                <li class="page-item disabled">
                                    <a class="page-link" href="#" tabindex="-1">
                                        Previous
                                    </a>
                                </li>
                                <li class="page-item active">
                                    <a class="page-link" href="#">
                                        1
                                    </a>
                                </li>
                                <li class="page-item">
                                    <a class="page-link" href="#">
                                        2 <span class="sr-only">(current)</span>
                                    </a>
                                </li>
                                <li class="page-item">
                                    <a class="page-link" href="#">
                                        3
                                    </a>
                                </li>
                                <li class="page-item">
                                    <a class="page-link" href="#">
                                        Next
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </Col>
                    <Col lg={3} md={1}></Col>
                </Row>
            </div>
        </DefaultCard>
    );
};

export default GeneratedResult;
