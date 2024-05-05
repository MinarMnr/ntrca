import React from "react";
import { Formik } from "formik/dist/index";
import { DefaultCard } from "components/card";
import { Button, Card, Col, Row } from "@themesberg/react-bootstrap";
import { Form } from "formik/dist/index";
import { Link } from "react-router-dom";
import {
    faSave,
    faTimes,
    faUndo,
    faPlusSquare,
    faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
    InputField,
    InputSelect,
    InputTextArea,
} from "../../../../components/form";
import ErrorMessage from "../../../../components/text/ErrorMessage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Step, Stepper } from "react-form-stepper";
import { useHistory } from "react-router-dom";
import applicantImage from "./images/ap_img.jpg";
import signature from "./images/sig.png";

const Attachment = () => {
    const history = useHistory();
    return (
        <DefaultCard className="mb-50" title="Attachment">
            <Card border="white">
                <Card.Body>
                    <div className="row">
                        <div className="col-md-12">
                            <Stepper activeStep={0} nonLinear={true}>
                                <Step
                                    className="bg-primary"
                                    label="প্রথম ধাপ"
                                    onClick={() =>
                                        history.push("/portal/application/add")
                                    }
                                />
                                <Step
                                    className="bg-primary"
                                    label="দ্বিতীয় ধাপ"
                                    onClick={() =>
                                        history.push(
                                            "/portal/ntrca-application/basic-info/add"
                                        )
                                    }
                                />
                                <Step
                                    className="bg-primary"
                                    label="তৃতীয় ধাপ"
                                    onClick={() =>
                                        history.push(
                                            "/portal/ntrca-application/institute/add"
                                        )
                                    }
                                />
                                <Step
                                    className="bg-primary"
                                    label="চতুর্থ ধাপ"
                                    onClick={() =>
                                        history.push(
                                            "/portal/posting-management/attachment"
                                        )
                                    }
                                />
                            </Stepper>
                        </div>
                    </div>
                    <Formik
                        initialValues={{
                            agreement:
                                "Lorem Ipsum হল মুদ্রণ এবং টাইপসেটিং শিল্পের ডামি পাঠ্য। লোরেম ইপসাম 1500 এর দশক থেকে শিল্পের মানক ডামি টেক্সট হয়েছে, যখন একটি অজানা প্রিন্টার টাইপের একটি গ্যালি নিয়েছিল এবং একটি টাইপ নমুনা বই তৈরি করতে এটিকে স্ক্র্যাম্বল করেছিল। এটি শুধুমাত্র পাঁচ শতক নয়, ইলেকট্রনিক টাইপসেটিং-এ লাফিয়েও টিকে আছে, যা অপরিহার্যভাবে অপরিবর্তিত রয়েছে। এটি 1960-এর দশকে লোরেম ইপসাম প্যাসেজ সম্বলিত লেট্রাসেট শীট প্রকাশের মাধ্যমে এবং অতি সম্প্রতি লোরেম ইপসামের সংস্করণ সহ অ্যালডাস পেজমেকারের মতো ডেস্কটপ প্রকাশনা সফ্টওয়্যারের মাধ্যমে জনপ্রিয় হয়েছিল।",
                        }}
                    >
                        <Form>
                            <div class="contentBox-modified">
                                <Row>
                                    <Col md={4} className="mt-20">
                                        <InputField
                                            label="আবেদনকারীর ছবি:"
                                            name="appPhoto"
                                            required={true}
                                            type="file"
                                            placeholder="Enter Applicant's Photo"
                                        />
                                        <ErrorMessage fieldName="appPhoto" />
                                    </Col>
                                    <div className="col-2">
                                        <img
                                            src={applicantImage}
                                            alt="no image available"
                                            style={{
                                                paddingTop: "20px",
                                                width: "50%",
                                            }}
                                        />
                                    </div>
                                    <Col md={4} className="mt-20">
                                        <InputField
                                            label="আবেদনকারীর স্বাক্ষর:"
                                            name="appSignature"
                                            required={true}
                                            type="file"
                                            placeholder="Enter Applicant's Signature"
                                        />
                                        <ErrorMessage fieldName="appSignature" />
                                    </Col>
                                    <div className="col-2">
                                        <img
                                            src={signature}
                                            alt="no image available"
                                            style={{
                                                paddingTop: "20px",
                                                width: "70%",
                                            }}
                                        />
                                    </div>

                                    <Col md={4} className="mt-20">
                                        <input type="checkbox" checked={true} />
                                        আমি উপরোক্ত সকল শর্তাবলীর সাথে সম্মতি প্রদান
                                        করছি
                                    </Col>

                                    <Col md={8} className="mt-20">
                                        <InputTextArea
                                            name="agreement"
                                            type="text"
                                            isRequired="true"
                                        />
                                        <ErrorMessage fieldName="agreement" />
                                    </Col>
                                    <Col md={12} className="mb-10 mt-10">
                                        <Link to="/portal/choice/list">
                                            <Button
                                                variant=""
                                                className="f-right btn-color"
                                                type="submit"
                                            >
                                                <FontAwesomeIcon
                                                    icon={faSave}
                                                    className="me-2"
                                                />{" "}
                                                Preview
                                            </Button>
                                        </Link>

                                        <Button
                                            variant="white"
                                            className="f-right mr-10"
                                            type="reset"
                                        >
                                            <FontAwesomeIcon
                                                icon={faUndo}
                                                className="me-2"
                                            />{" "}
                                            Reset
                                        </Button>
                                        <Link to="/portal/ntrca-application/institute/add">
                                            <Button
                                                variant="white"
                                                className="f-right mr-10"
                                                type="cancle"
                                            >
                                                <FontAwesomeIcon
                                                    icon={faTimes}
                                                    className="me-2"
                                                />{" "}
                                                Back
                                            </Button>
                                        </Link>
                                    </Col>
                                </Row>
                            </div>
                        </Form>
                    </Formik>
                </Card.Body>
            </Card>
        </DefaultCard>
    );
};

export default Attachment;
