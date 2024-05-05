import React from "react";
import { Button, Card, Col, Row } from "@themesberg/react-bootstrap";
import { Form } from "formik/dist/index";
import { Link } from "react-router-dom";
import {
    InputField,
    InputSelect,
    InputTextArea,
} from "../../../../components/form";
import {
    faSave,
    faTimes,
    faUndo,
    faPlusSquare,
    faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";

import { FieldArray, Field } from "formik/dist/index";
import InputSelectApi from "components/form/InputSelectApi";
// import { InputField, InputSelect } from "../../../../components/form";
import ErrorMessage from "../../../../components/text/ErrorMessage";
import { Formik } from "formik/dist/index";
import { Step, Stepper } from "react-form-stepper";
import { DefaultCard } from "components/card";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const GeneralInfoForm = ({ values }) => {
    const history = useHistory();
    let data = {
        appName: "S.M Tanvir Siddique",
        FName: "Md. Abu Hanif",
        MName: "Nurun Nahar",
        dob: "25/09/1998",
        nid: "123567894444",
        mobile: "0170325818",
        email: "tanvir@test.com",
        religion: 1,
        gender: 1,
        nationality: 1,
        mStatus: 1,
        presentDivision: 1,
        presentDistrict: 1,
        presentUP: 1,
        PresentPostcode: 1001,
        permanentDivision: 1,
        permanentDistrict: 1,
        permanentUP: 1,
        permanentPostcode: 1002,
    };
    return (
        <DefaultCard className="mb-50" title="Personal Information">
            <Card border="white">
                <Card.Body>
                    {/* {loading && <ProgressBar />} */}
                    <div className="row">
                        <div className="col-md-12">
                            <Stepper activeStep={0} nonLinear={true}>
                                <Step
                                    className="bg-primary"
                                    label="প্রথম ধাপ"
                                    onClick={() =>
                                        history.push(
                                            "/portal/ntrca-application/apply"
                                        )
                                    }
                                />
                                <Step
                                    className="bg-success"
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
                    <Formik initialValues={data}>
                        <Form>
                            <div class="contentBox-modified">
                                <Row>
                                    <Col md={4} className="mb-10">
                                        <InputField
                                            label="আবেদনকারীর নাম"
                                            name="appName"
                                            required={true}
                                            type="text"
                                            placeholder="Enter Applicant's Name"
                                            isDisabled={true}
                                        />
                                        <ErrorMessage fieldName="appName" />
                                    </Col>
                                    <Col md={4} className="mb-10">
                                        <InputField
                                            label="পিতার নাম"
                                            name="FName"
                                            type="text"
                                            placeholder="Enter Father Name"
                                            isDisabled={true}
                                        />
                                        <ErrorMessage fieldName="FName" />
                                    </Col>
                                    <Col md={4} className="mb-10">
                                        <InputField
                                            label="মায়ের নাম"
                                            name="MName"
                                            type="text"
                                            placeholder="Enter Mother Name"
                                            isDisabled={true}
                                        />
                                        <ErrorMessage fieldName="MName" />
                                    </Col>
                                    <Col md={3} className="mb-10">
                                        <InputField
                                            label="জন্ম তারিখ"
                                            name="dob"
                                            type="date"
                                            placeholder="Enter জন্ম তারিখ"
                                            isDisabled={true}
                                        />
                                        <ErrorMessage fieldName="dob" />
                                    </Col>
                                    <Col md={3} className="mb-10">
                                        <InputField
                                            label="জাতীয় পরিচয়পত্র নম্বর"
                                            name="nid"
                                            type="number"
                                            placeholder="Enter NID"
                                            isDisabled={true}
                                        />
                                        <ErrorMessage fieldName="nid" />
                                    </Col>
                                    <Col md={3} className="mb-10">
                                        <InputField
                                            label="মোবাইল নম্বর"
                                            name="mobile"
                                            type="number"
                                            placeholder="Enter Mobile"
                                        />
                                        <ErrorMessage fieldName="mobile" />
                                    </Col>
                                    <Col md={3} className="mb-10">
                                        <InputField
                                            label="ইমেইল"
                                            name="email"
                                            type="email"
                                            placeholder="Enter Email"
                                        />
                                        <ErrorMessage fieldName="email" />
                                    </Col>
                                    <Col md={3} className="mb-10">
                                        <InputSelect
                                            label="ধর্ম"
                                            name="religion"
                                            type="text"
                                            value="id"
                                            isDisabled={true}
                                            text="name"
                                            data={[
                                                {
                                                    id: 1,
                                                    name: "Islam",
                                                },
                                                {
                                                    id: 2,
                                                    name: "Hinduism",
                                                },
                                                {
                                                    id: 3,
                                                    name: "Christianity",
                                                },
                                            ]}
                                        />
                                        <ErrorMessage fieldName="religion" />
                                    </Col>
                                    <Col md={3} className="mb-10">
                                        <InputSelect
                                            label="লিঙ্গ"
                                            name="gender"
                                            // required={true}
                                            type="text"
                                            value="id"
                                            isDisabled={true}
                                            text="name"
                                            data={[
                                                {
                                                    id: 1,
                                                    name: "Male",
                                                },
                                                {
                                                    id: 2,
                                                    name: "Female",
                                                },
                                                {
                                                    id: 2,
                                                    name: "Other",
                                                },
                                            ]}
                                        />
                                        <ErrorMessage fieldName="gender" />
                                    </Col>
                                    <Col md={3} className="mb-10">
                                        <InputSelect
                                            label="জাতীয়তা"
                                            name="nationality"
                                            // required={true}
                                            type="text"
                                            value="id"
                                            text="name"
                                            isDisabled={true}
                                            data={[
                                                {
                                                    id: 1,
                                                    name: "Bangladeshi",
                                                },
                                                {
                                                    id: 2,
                                                    name: "Indian",
                                                },
                                                {
                                                    id: 2,
                                                    name: "Other",
                                                },
                                            ]}
                                        />
                                        <ErrorMessage fieldName="nationality" />
                                    </Col>
                                    <Col md={3} className="mb-10">
                                        <InputSelect
                                            label="বৈবাহিক অবস্থা"
                                            name="mStatus"
                                            // required={true}
                                            type="text"
                                            value="id"
                                            text="name"
                                            data={[
                                                {
                                                    id: 1,
                                                    name: "Single",
                                                },
                                                {
                                                    id: 2,
                                                    name: "Married",
                                                },
                                                {
                                                    id: 2,
                                                    name: "Divorced",
                                                },
                                            ]}
                                        />
                                        <ErrorMessage fieldName="mStatus" />
                                    </Col>
                                    <Card className="mt-40">
                                        <div className="card_header">
                                            <b>বর্তমান ঠিকানা</b>
                                        </div>
                                        <Card.Body>
                                            <Row>
                                                <Col md={3} className="mb-10">
                                                    <InputSelect
                                                        label="বিভাগ"
                                                        name="presentDivision"
                                                        // required={true}
                                                        type="text"
                                                        value="id"
                                                        text="name"
                                                        data={[
                                                            {
                                                                id: 1,
                                                                name: "Dhaka",
                                                            },
                                                            {
                                                                id: 2,
                                                                name: "Chittagong",
                                                            },
                                                            {
                                                                id: 2,
                                                                name: "Comillah",
                                                            },
                                                        ]}
                                                    />
                                                    <ErrorMessage fieldName="presentDivision" />
                                                </Col>
                                                <Col md={3} className="mb-10">
                                                    <InputSelect
                                                        label="জেলা"
                                                        name="presentDistrict"
                                                        // required={true}
                                                        type="text"
                                                        value="id"
                                                        text="name"
                                                        data={[
                                                            {
                                                                id: 1,
                                                                name: "Dhaka",
                                                            },
                                                            {
                                                                id: 2,
                                                                name: "Gazipur",
                                                            },
                                                            {
                                                                id: 2,
                                                                name: "Faridpur",
                                                            },
                                                        ]}
                                                    />
                                                    <ErrorMessage fieldName="presentDistrict" />
                                                </Col>
                                                <Col md={3} className="mb-10">
                                                    <InputSelect
                                                        label="উপজেলা"
                                                        name="presentUP"
                                                        // required={true}
                                                        type="text"
                                                        value="id"
                                                        text="name"
                                                        data={[
                                                            {
                                                                id: 1,
                                                                name: "Nabinagar",
                                                            },
                                                            {
                                                                id: 2,
                                                                name: "Tongi",
                                                            },
                                                            {
                                                                id: 2,
                                                                name: "Uttara",
                                                            },
                                                        ]}
                                                    />
                                                    <ErrorMessage fieldName="presentUP" />
                                                </Col>
                                                <Col md={3} className="mb-10">
                                                    <InputField
                                                        label="পদবি কোড"
                                                        name="PresentPostcode"
                                                        type="number"
                                                        placeholder="Enter Post Code"
                                                    />
                                                    <ErrorMessage fieldName="PresentPostcode" />
                                                </Col>
                                            </Row>
                                        </Card.Body>
                                    </Card>

                                    <Card className="mt-40">
                                        <div className="card_header">
                                            <b>স্থায়ী ঠিকানা</b>
                                        </div>
                                        <Card.Body>
                                            <Row>
                                                <Col md={3} className="mb-10">
                                                    <InputSelect
                                                        label="বিভাগ"
                                                        name="permanentDivision"
                                                        // required={true}
                                                        type="text"
                                                        value="id"
                                                        text="name"
                                                        isDisabled={true}
                                                        data={[
                                                            {
                                                                id: 1,
                                                                name: "Dhaka",
                                                            },
                                                            {
                                                                id: 2,
                                                                name: "Chittagong",
                                                            },
                                                            {
                                                                id: 2,
                                                                name: "Comillah",
                                                            },
                                                        ]}
                                                    />
                                                    <ErrorMessage fieldName="permanentDivision" />
                                                </Col>
                                                <Col md={3} className="mb-10">
                                                    <InputSelect
                                                        label="জেলা"
                                                        name="permanentDistrict"
                                                        isDisabled={true}
                                                        type="text"
                                                        value="id"
                                                        text="name"
                                                        data={[
                                                            {
                                                                id: 1,
                                                                name: "Dhaka",
                                                            },
                                                            {
                                                                id: 2,
                                                                name: "Gazipur",
                                                            },
                                                            {
                                                                id: 2,
                                                                name: "Faridpur",
                                                            },
                                                        ]}
                                                    />
                                                    <ErrorMessage fieldName="permanentDistrict" />
                                                </Col>
                                                <Col md={3} className="mb-10">
                                                    <InputSelect
                                                        label="উপজেলা"
                                                        name="permanentUP"
                                                        isDisabled={true}
                                                        type="text"
                                                        value="id"
                                                        text="name"
                                                        data={[
                                                            {
                                                                id: 1,
                                                                name: "Nabinagar",
                                                            },
                                                            {
                                                                id: 2,
                                                                name: "Tongi",
                                                            },
                                                            {
                                                                id: 2,
                                                                name: "Uttara",
                                                            },
                                                        ]}
                                                    />
                                                    <ErrorMessage fieldName="permanentUP" />
                                                </Col>
                                                <Col md={3} className="mb-10">
                                                    <InputField
                                                        isDisabled={true}
                                                        label="পদবি কোড"
                                                        name="permanentPostcode"
                                                        type="number"
                                                        placeholder="Enter post code"
                                                    />
                                                    <ErrorMessage fieldName="permanentPostcode" />
                                                </Col>
                                                <Col
                                                    md={12}
                                                    className="mb-10 mt-10"
                                                >
                                                    <Link to="/portal/ntrca-application/institute/add">
                                                        <Button
                                                            variant=""
                                                            className="f-right btn-color"
                                                            type="submit"
                                                        >
                                                            <FontAwesomeIcon
                                                                icon={faSave}
                                                                className="me-2"
                                                            />{" "}
                                                            পরবর্তী
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
                                                        রিসেট
                                                    </Button>
                                                    <Link to="/portal/ntrca-application/apply">
                                                        <Button
                                                            variant="white"
                                                            className="f-right mr-10"
                                                            type="cancle"
                                                        >
                                                            <FontAwesomeIcon
                                                                icon={faTimes}
                                                                className="me-2"
                                                            />{" "}
                                                            পেছনে
                                                        </Button>
                                                    </Link>
                                                </Col>
                                            </Row>
                                        </Card.Body>
                                    </Card>
                                </Row>
                            </div>
                        </Form>
                    </Formik>
                </Card.Body>
            </Card>
        </DefaultCard>
    );
};

export default GeneralInfoForm;
