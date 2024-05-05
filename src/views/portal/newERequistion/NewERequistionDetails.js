import { DefaultCard } from "components/card";
import React from "react";
import { Button, Card, Col, Row } from "@themesberg/react-bootstrap";
import {
    faSave,
    faCheck,
    faTimes,
    faUndo,
    faPlusSquare,
    faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const NewERequistionDetails = () => {
    const dataDemo = [
        {
            sl: "1",
            instituteType: "Dakhil Madrasah",
            post: "Assistant Moulavi ",
            subject: "Assistant Moulavi ",
            candidateType: "General",
            postCount: "1",
            postType: "MPO",
        },
        {
            sl: "2",
            instituteType: "Dakhil Madrasah",
            post: "Assistant Moulavi ",
            subject: "Assistant Moulavi ",
            candidateType: "General",
            postCount: "1",
            postType: "MPO",
        },
        {
            sl: "3",
            instituteType: "Dakhil Madrasah",
            post: "Assistant Teacher ",
            subject: "Bangla ",
            candidateType: "Female Quota",
            postCount: "1",
            postType: "MPO",
        },
        {
            sl: "4",
            instituteType: "Dakhil Madrasah",
            post: "Assistant Teacher ",
            subject: "English ",
            candidateType: "General",
            postCount: "1",
            postType: "MPO",
        },
        {
            sl: "5",
            instituteType: "Dakhil Madrasah",
            post: "Assistant Teacher,Physical Science",
            subject: "Physics ",
            candidateType: "Female Quota",
            postCount: "1",
            postType: "MPO",
        },
        {
            sl: "6",
            instituteType: "Dakhil Madrasah",
            post: "Assistant Moulavi ",
            subject: "Physical Education ",
            candidateType: "General",
            postCount: "1",
            postType: "MPO",
        },
        {
            sl: "7",
            instituteType: "Dakhil Madrasah",
            post: "Ebtedayee Qar ",
            subject: "Quaran&Tajbid / Fhikh&Arabic ",
            candidateType: "Female Quota",
            postCount: "1",
            postType: "MPO",
        },
    ];
    return (
        <DefaultCard title="Non-Government Teachers Registration & Certification Authority (NTRCA)">
            <Row>
                <Col md={12} className="">
                    <div className=" text-center">
                        <div className="col-12 p-25">
                            <div className="table-responsive">
                                {/* <p className="fw-bold">প্রতিষ্ঠানের তথ্য</p> */}
                                <table className="table table-bordered text-center">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <b>প্রতিষ্ঠানের নাম</b>
                                            </td>
                                            <td>
                                                মুঘলতলি আফতাব উদ্দিন,দাখিল
                                                মাদ্রাসা
                                            </td>
                                            <td>
                                                <b>প্রতিষ্ঠানের ধরন</b>
                                            </td>
                                            <td>দাখিল মাদ্রাসা(1-10)</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <b>EIIN</b>
                                            </td>
                                            <td>105805</td>
                                            <td>
                                                <b>বিভাগ</b>
                                            </td>
                                            <td>চট্টগ্রাম</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <b>জেলা</b>
                                            </td>
                                            <td>কুমিল্লা</td>
                                            <td>
                                                <b>উপ জেলা</b>
                                            </td>
                                            <td>কুমিল্লা আদর্শ সদর</td>
                                        </tr>
                                        <tr></tr>
                                        <tr>
                                            <td>
                                                <b>NTRCA গণবিজ্ঞপ্তি নং</b>
                                            </td>
                                            <td>267</td>
                                            <td>
                                                <b>ই রিকুইজিশন আইডি</b>
                                            </td>
                                            <td>R1058053</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <b>মেমো নং</b>
                                            </td>
                                            <td>07/2022</td>
                                            <td>
                                                <b>লেনদেনের অবস্থা</b>
                                            </td>
                                            <td>
                                                <b style={{ color: "green" }}>
                                                    PAIDED
                                                </b>
                                            </td>
                                        </tr>

                                        {/* <tr>
                                    <td>
                                        <b>Status</b>
                                    </td>
                                    <td>
                                        <span className="btn btn-danger">
                                            Pending
                                        </span>
                                    </td>
                                </tr> */}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        {/* <div>
                            <span> Non-Government Teachers" Registration & Certification Authority (NTRCA)</span>
                            <br/>
                            <span>INSTITUTE NAME :MOGULTOLI AFTAB UDDIN DAKHIL MADRASHA, EIIN : 105805</span>
                            <br/>
                            <span>DIVISION: CHITTAGONG, DISTRICT: COMILLA, UPAZILLA: COMILLA ADARSHA SADAR</span>
                            <br/>
                            <span>NTRCA GANOBIGGOPTI NO : 267, DATE : 23-06-2022</span>
                        </div>
                        <br/>
                        <div>
                            <span>INSTITUTE e-REQUISITION COPY</span>
                            <br/>
                            <span>INSTITUTE ADVERTISEMENT MEMO NO : 07/2022, DATE : 22-07-2022</span>
                            <br/>
                            <span>e-REQUISITION ID : R1058053</span>
                        </div> */}
                    </div>
                </Col>
            </Row>

            <Row>
                <Col>
                    <table className="table mb-20">
                        <thead className="text-center">
                            <th>SI</th>
                            <th>ইনস্টিটিউটের ধরন</th>
                            <th>পদবি</th>
                            <th>বিষয়</th>
                            <th>প্রার্থীর ধরন</th>
                            <th>পদের সংখ্যা</th>
                            <th>পদের ধরন</th>
                        </thead>
                        {dataDemo !== undefined &&
                            JSON.parse(JSON.stringify(dataDemo)).map(
                                (row, index) => (
                                    <tr key={index}>
                                        <td>
                                            <span className="text-center">
                                                {row.sl}
                                            </span>
                                        </td>
                                        <td>
                                            <span className="text-center">
                                                {row.instituteType}
                                            </span>
                                        </td>
                                        <td>
                                            <span className="text-center">
                                                {row.post}
                                            </span>
                                        </td>

                                        <td>
                                            <span className="text-center">
                                                {row.subject}
                                            </span>
                                        </td>
                                        <td>
                                            <span className="text-center">
                                                {row.candidateType}
                                            </span>
                                        </td>
                                        <td>
                                            <span className="text-center">
                                                {row.postCount}
                                            </span>
                                        </td>
                                        <td>
                                            <span className="text-center">
                                                {row.postType}
                                            </span>
                                        </td>
                                        {/* <td>
                                        <span className="text-center">{row.januaryNitSalary}</span>
                                    </td> */}
                                    </tr>
                                )
                            )}
                    </table>
                </Col>
                <Col md={12} className="mb-10 mt-10">
                    <Button
                        variant=""
                        className="f-right btn-color"
                        type="submit"
                    >
                        <FontAwesomeIcon icon={faCheck} className="me-2" />{" "}
                        অনুমোদন
                    </Button>

                    <Link>
                        <Button
                            variant="white"
                            className="f-right mr-10"
                            type="cancle"
                        >
                            <FontAwesomeIcon icon={faTimes} className="me-2" />{" "}
                            বাতিল করুন
                        </Button>
                    </Link>
                </Col>
            </Row>
        </DefaultCard>
    );
};

export default NewERequistionDetails;
