import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, Col, Row } from "@themesberg/react-bootstrap";
import {
    faSave,
    faArrowRight,
    faLongArrowAltRight,
    faArrowsAltH,
    faVenusMars,
    faLocationArrow,
} from "@fortawesome/free-solid-svg-icons";
import "./application.css";

export const DragAndDrop = () => {
    const [currentItem, setCurrentItem] = React.useState({});
    const [dragItem, setDragItem] = React.useState([
        { id: 1 },
        { id: 2 },
        { id: 3 },
    ]);
    const [dropItem, setDropItem] = React.useState([{ id: 4 }]);
    const [effect, setEffect] = React.useState(false);

    const onDragItem = (index, control) => {
        if (Number(currentItem.index) === NaN && !currentItem.parentList) {
            setCurrentItem({ index: index, parentList: control });
        } else {
            returnCurrentItemtoOrigin();
            setCurrentItem({ index: index, parentList: control });
        }
    };

    const onDropItem = (dropIndex, control) => {
        if (Number(currentItem.index) !== NaN && currentItem.parentList) {
            let tempItem = null;
            let dragList = JSON.parse(JSON.stringify(dragItem));
            let dropList = JSON.parse(JSON.stringify(dropItem));
            if (currentItem.parentList === "drag") {
                tempItem = dragList.splice(currentItem.index, 1)[0];
            } else if (currentItem.parentList === "drop") {
                tempItem = dropList.splice(currentItem.index, 1)[0];
            }
            if (control === "drag") {
                dragList.splice(dropIndex, 0, tempItem);
            } else if (control === "drop") {
                dropList.splice(dropIndex, 0, tempItem);
            }
            setDragItem(dragList);
            setDropItem(dropList);
            returnCurrentItemtoOrigin();
        }
    };

    const dropOnMouseOut = () => {
        returnCurrentItemtoOrigin();
    };
    // const dragElement = document.getElementById("draggable");
    // const source = document.getElementById("");
    const returnCurrentItemtoOrigin = () => {
        if (Number(currentItem.index) !== NaN && currentItem.parentList) {
            setCurrentItem({});
        }
    };
    return (
        <Row onMouseLeave={dropOnMouseOut} style={{ userSelect: "none" }}>
            <Col md={6} className="arrow-icon">
                <Card className="mt-40 p-5 ">
                    <div className="header-color pt-8 text-light text-center">
                        <h3>শূন্য পদের প্রতিষ্ঠানের তালিকা (৭০)</h3>
                    </div>
                    {dragItem?.length > 0 ? (
                        <Card.Body
                        // onMouseOut={() => {
                        //     dropOnMouseOut("drag");
                        // }}
                        >
                            <Row>
                                {dragItem?.map((itemDrag, itemIndex) => {
                                    return (
                                        <Col md={12}>
                                            {/* {itemDrag.id} */}
                                            <Card
                                                className={
                                                    effect == true
                                                        ? "p-10  mt-10 grabbing effect dragEffect"
                                                        : "p-10  mt-10 grabbing effect"
                                                }
                                                draggable="auto"
                                                // onMouseDown
                                                onMouseDown={() => {
                                                    onDragItem(
                                                        itemIndex,
                                                        "drag"
                                                    );
                                                    setEffect(true);
                                                }}
                                                // onMouseUp
                                                onMouseUp={() => {
                                                    onDropItem(
                                                        itemIndex,
                                                        "drag"
                                                    );
                                                    // setEffect(false)
                                                }}
                                            >
                                                <Card.Body>
                                                    <Row>
                                                        <Col md={10}>
                                                            <span className="text-primary fontSizeHeader fw-bold">
                                                                সহকারী শিক্ষক,
                                                                মাধ্যমিক
                                                                বিদ্যালয় (1-9)
                                                            </span>
                                                        </Col>
                                                        <Col
                                                            md={2}
                                                            className="text-right"
                                                        >
                                                            <span className="bg-primary pl-8 pr-8 fw-bold rounded-circle text-light">
                                                                {itemDrag.id}
                                                            </span>
                                                        </Col>
                                                        <Col md={12}>
                                                            <span className="fw-bold text-muted fontSizeBody">
                                                                এ কে এম কলেজ
                                                                (দিন ও রাত)
                                                            </span>
                                                        </Col>
                                                        <Col md={12}>
                                                            <Row>
                                                                <Col
                                                                    md={3}
                                                                    className="text-muted fontSize"
                                                                >
                                                                    {/* <FontAwesomeIcon
                                                                        icon={
                                                                            faSwatchbook
                                                                        }
                                                                        className="mr-3"
                                                                    /> */}
                                                                    শারীরিক
                                                                    বিজ্ঞান
                                                                </Col>
                                                                <Col
                                                                    md={3}
                                                                    className="text-muted fontSize"
                                                                >
                                                                    {/* <FontAwesomeIcon
                                                                        icon={
                                                                            faVenusMars
                                                                        }
                                                                        className="mr-3"
                                                                    /> */}
                                                                    পুরুষ/মহিলা
                                                                </Col>
                                                                <Col
                                                                    md={4}
                                                                    className="text-muted fontSize"
                                                                >
                                                                    {/* <FontAwesomeIcon
                                                                        icon={
                                                                            faLocationArrow
                                                                        }
                                                                        className="mr-3"
                                                                    /> */}
                                                                    বসুন্ধরা
                                                                    আর/এ, ঢাকা
                                                                </Col>
                                                                <Col
                                                                    md={2}
                                                                    className="text-muted fontSize"
                                                                >
                                                                    {/* <FontAwesomeIcon
                                                                        icon={
                                                                            faSchool
                                                                        }
                                                                        className="mr-3"
                                                                    /> */}
                                                                    ডিএসএইচই
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                    </Row>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    );
                                })}
                            </Row>
                        </Card.Body>
                    ) : (
                        <Card.Body
                            style={{
                                minHeight: "250px",
                                textAlign: "center",
                            }}
                            className="borderbox"
                            onMouseUp={() => {
                                onDropItem(0, "drag");
                            }}
                        >
                            <span className="f-size fw-bold">
                                পদবি অনির্বাচন করতে এখানে ড্রপ করুন
                            </span>
                        </Card.Body>
                    )}
                </Card>
                <FontAwesomeIcon
                    icon={faArrowsAltH}
                    className="me-2 arrow-icon2"
                />
            </Col>

            <Col md={6}>
                <Card className="mt-40 p-5">
                    <div className="header-color pt-8 text-light text-center">
                        <h3>নির্বাচিত পদবি (১)</h3>
                    </div>
                    {/* <div>
                        <span className="f-size fw-bold">Selected Posts</span>
                    </div> */}
                    {dropItem?.length > 0 ? (
                        <Card.Body>
                            <Row>
                                {dropItem.map((itemDrop, indexDrop) => {
                                    return (
                                        <Col md={12}>
                                            {/* {itemDrop.id} */}
                                            <Card
                                                className="p-10  mt-10 grabbing effect"
                                                id="draggable"
                                                draggable="flase"
                                                onMouseUp={() =>
                                                    onDropItem(
                                                        indexDrop,
                                                        "drop"
                                                    )
                                                }
                                                onMouseDown={() => {
                                                    onDragItem(
                                                        indexDrop,
                                                        "drop"
                                                    );
                                                }}
                                            >
                                                <Card.Body>
                                                    <Row>
                                                        <Col md={10}>
                                                            <span className="text-primary fontSizeHeader fw-bold">
                                                                <span className="bg-primary pl-8 pr-8 fw-bold rounded-circle text-light mr-10">
                                                                    {
                                                                        itemDrop.id
                                                                    }
                                                                </span>
                                                                সহকারী শিক্ষক
                                                                (9-10)
                                                            </span>
                                                        </Col>

                                                        <Col
                                                            md={2}
                                                            className="text-right"
                                                        >
                                                            <span className="bg-success pl-8 pr-8 fw-bold rounded-circle text-light">
                                                                {indexDrop + 1}
                                                            </span>
                                                        </Col>

                                                        <Col md={12}>
                                                            <span className="fw-bold text-muted fontSizeBody">
                                                                এ কে এম কলেজ
                                                                (দিন ও রাত)
                                                            </span>
                                                        </Col>
                                                        <Col md={12}>
                                                            <Row>
                                                                <Col
                                                                    md={3}
                                                                    className="text-muted fontSize"
                                                                >
                                                                    {/* <FontAwesomeIcon
                                                                        icon={
                                                                            faSave
                                                                        }
                                                                        className="mr-3"
                                                                    /> */}
                                                                    পদার্থবিদ্যা
                                                                </Col>
                                                                <Col
                                                                    md={3}
                                                                    className="text-muted fontSize"
                                                                >
                                                                    {/* <FontAwesomeIcon
                                                                        icon={
                                                                            faVenusMars
                                                                        }
                                                                        className="mr-3"
                                                                    /> */}
                                                                    পুরুষ/মহিলা
                                                                </Col>
                                                                <Col
                                                                    md={4}
                                                                    className="text-muted fontSize"
                                                                >
                                                                    {/* <FontAwesomeIcon
                                                                        icon={
                                                                            faLocationArrow
                                                                        }
                                                                        className="mr-3"
                                                                    /> */}
                                                                    বসুন্ধরা
                                                                    আর/এ, ঢাকা
                                                                </Col>
                                                                <Col
                                                                    md={2}
                                                                    className="text-muted fontSize"
                                                                >
                                                                    {/* <FontAwesomeIcon
                                                                        icon={
                                                                            faSave
                                                                        }
                                                                        className="mr-3"
                                                                    /> */}
                                                                    ডিএসএইচই
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                    </Row>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    );
                                })}
                            </Row>
                        </Card.Body>
                    ) : (
                        <Card.Body
                            onMouseUp={() => onDropItem(0, "drop")}
                            style={{
                                minHeight: "250px",
                                textAlign: "center",
                            }}
                            className="borderbox"
                        >
                            <span className="fw-bold f-size">
                                পদবি নির্বাচন করতে এখানে ড্রপ করুন
                            </span>
                        </Card.Body>
                    )}
                </Card>
            </Col>
        </Row>
    );
};
