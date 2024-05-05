import React, { useState } from "react";
import {
    Button,
    Card,
    Col,
    Row,
    Form as Form1,
} from "@themesberg/react-bootstrap";
import { Form } from "formik/dist/index";
import { Link } from "react-router-dom";
import {
    InputField,
    InputSelect,
    InputTextArea,
} from "../../../components/form";
import profilepic from "../../../assets/img/hujur-4.jpg";
import signature from "../../../assets/img/Signature-1.png";
import nidimg from "../../../assets/img/nid.jpg";
import {
    faSave,
    faTimes,
    faUndo,
    faPlusSquare,
    faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import Checkbox from "../../../components/form/Checkbox";
import ErrorMessage from "../../../components/text/ErrorMessage";
import { Formik } from "formik/dist/index";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InputDatePicker from "components/form/InputDatePicker";
import { UrlBuilder } from "helpers/UrlBuilder";
import InputSelectApi from "components/form/InputSelectApi";
import { AuthUser } from "helpers/AuthUser";

const ProfileForm = ({ values, setFieldValue, ...props }) => {
    const [checked, setChecked] = React.useState(false);
    const [instituteHeadImageState, setInstituteHeadImageState] = useState({
        path: "",
    });

    const handleinstituteHeadPhotoUrlChange = (e) => {
        if (e.target.files[0] !== undefined) {
            setInstituteHeadImageState({
                ...instituteHeadImageState,
                path: URL.createObjectURL(e.target.files[0]),
            });
        } else {
            setInstituteHeadImageState({
                ...instituteHeadImageState,
                path: "",
            });
        }
    };
    const [instituteHeadSignatureUrl, setinstituteHeadSignatureUrl] = useState({
        path: "",
    });

    const handleInstituteHeadSignatute = (e) => {
        if (e.target.files[0] !== undefined) {
            setinstituteHeadSignatureUrl({
                ...instituteHeadSignatureUrl,
                path: URL.createObjectURL(e.target.files[0]),
            });
        } else {
            setinstituteHeadSignatureUrl({
                ...instituteHeadSignatureUrl,
                path: "",
            });
        }
    };
    const [chairmanPhotoState, setChairmanPhotoState] = useState({ path: "" });
    const handleChairmanPhotoChange = (e) => {
        if (e.target.files[0] !== undefined) {
            setChairmanPhotoState({
                ...chairmanPhotoState,
                path: URL.createObjectURL(e.target.files[0]),
            });
        } else {
            setChairmanPhotoState({
                ...chairmanPhotoState,
                path: "",
            });
        }
    };
    const [chairmanSignatureState, setChairmanSignatureState] = useState({
        path: "",
    });

    const handleChairmanSignatute = (e) => {
        if (e.target.files[0] !== undefined) {
            setChairmanSignatureState({
                ...chairmanSignatureState,
                path: URL.createObjectURL(e.target.files[0]),
            });
        } else {
            setChairmanSignatureState({
                ...chairmanSignatureState,
                path: "",
            });
        }
    };
    const [instituteHeadNidUrlFront, setinstituteHeadNidUrlFront] = useState({
        path: "",
    });
    const handleinstituteHeadNidUrlFront = (e) => {
        if (e.target.files[0] !== undefined) {
            setinstituteHeadNidUrlFront({
                ...instituteHeadNidUrlFront,
                path: URL.createObjectURL(e.target.files[0]),
            });
        } else {
            setinstituteHeadNidUrlFront({
                ...instituteHeadNidUrlFront,
                path: "",
            });
        }
    };
    const [instituteHeadNidUrlRear, setinstituteHeadNidUrlRear] = useState({
        path: "",
    });
    const handleinstituteHeadNidUrlRear = (e) => {
        if (e.target.files[0] !== undefined) {
            setinstituteHeadNidUrlRear({
                ...instituteHeadNidUrlRear,
                path: URL.createObjectURL(e.target.files[0]),
            });
        } else {
            setinstituteHeadNidUrlRear({
                ...instituteHeadNidUrlRear,
                path: "",
            });
        }
    };
    const [chairmanNidFront, setChairmanNidFront] = useState({
        path: "",
    });
    const handleChairmanNidFront = (e) => {
        if (e.target.files[0] !== undefined) {
            setChairmanNidFront({
                ...chairmanNidFront,
                path: URL.createObjectURL(e.target.files[0]),
            });
        } else {
            setChairmanNidFront({
                ...chairmanNidFront,
                path: "",
            });
        }
    };
    const [chairmanNidRear, setChairmanNidRear] = useState({
        path: "",
    });
    const handleChairmanNidRear = (e) => {
        if (e.target.files[0] !== undefined) {
            setChairmanNidRear({
                ...chairmanNidRear,
                path: URL.createObjectURL(e.target.files[0]),
            });
        } else {
            setChairmanNidRear({
                ...chairmanNidRear,
                path: "",
            });
        }
    };

    const history = useHistory();
    return (
        <Form>
            <div className="m-10 form_custum">
                <div className="card card-box">
                    {/* <Card.Header className="">
                        <h6 className="mb-0 mt-9 f-left pl-10"> Institute Profile Instruction: Please fill up very carefully </h6>

                    </Card.Header> */}
                    <div class="card-head apply">
                        <header class=" header">
                            <h2 className="text-center">Institute Profile</h2>
                            <h4 class="text-center text-white mb-0">
                                {AuthUser.getInstituteName()} [
                                {AuthUser.getUserName()}]
                                {/* Mogultoli Aftab Uddin Dakhil Madrasha(105805) */}
                            </h4>
                        </header>
                    </div>
                    <div className="m-10">
                        <Card.Body>
                            {/* <div className="row">
                                <div class="contentBox-modified">
                                    <div class="section-header-custom">
                                        <h5 class="m-10 text-white">
                                            MPO তথ্য
                                        </h5>
                                    </div>

                                    <div class="contentBoxBody p-20">
                                        <Row>
                                            <Col md={12} className="mb-10">
                                                <InputSelect
                                                    label="MPO authority :"
                                                    name="authority"
                                                    type="text"
                                                    value="id"
                                                    text="name"
                                                    data={[
                                                        {
                                                            id: 1,
                                                            name: "Director of Madrasah Education(DME)",
                                                        },
                                                        {
                                                            id: 2,
                                                            name: "Director of Secondary and Higher Education(DSHE)",
                                                        },
                                                        {
                                                            id: 3,
                                                            name: "Director of Technical Education(DTE)",
                                                        },
                                                    ]}
                                                />
                                                <ErrorMessage fieldName="authority" />
                                            </Col>
                                            <Col md={12} className="mb-10">
                                                <label>Notification :</label>
                                                <Row className="">
                                                    <Col
                                                        md={12}
                                                        className="mb-10 align-self-center"
                                                    >
                                                        <Checkbox
                                                            label="1. Dakhil Madrasha (1-10)"
                                                            name="dakhil"
                                                            checked={""}
                                                            onChange={(e) =>
                                                                setFieldValue(
                                                                    "dakhil",
                                                                    e.target
                                                                        .checked
                                                                )
                                                            }
                                                        />
                                                    </Col>
                                                    <Col
                                                        md={12}
                                                        className="mb-10 align-self-center"
                                                    >
                                                        <Checkbox
                                                            label=" 2. Alim Madrasha (1-10)"
                                                            name="alim"
                                                            checked={false}
                                                            onChange={(e) =>
                                                                setFieldValue(
                                                                    "alim",
                                                                    e.target
                                                                        .checked
                                                                )
                                                            }
                                                        />
                                                    </Col>
                                                    <Col
                                                        md={12}
                                                        className="mb-10 align-self-center"
                                                    >
                                                        <Checkbox
                                                            label=" 3. Fazil Madrasha (1-10)"
                                                            name="fazil"
                                                            checked={false}
                                                            onChange={(e) =>
                                                                setFieldValue(
                                                                    "fazil",
                                                                    e.target
                                                                        .checked
                                                                )
                                                            }
                                                        />
                                                    </Col>
                                                    <Col
                                                        md={12}
                                                        className="mb-10 align-self-center"
                                                    >
                                                        <Checkbox
                                                            label=" 4. Kalim Madrasha (1-10)"
                                                            name="kalim"
                                                            checked={false}
                                                            onChange={(e) =>
                                                                setFieldValue(
                                                                    "kalim",
                                                                    e.target
                                                                        .checked
                                                                )
                                                            }
                                                        />
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col md={4}>
                                                <div className="form-group mb-3">
                                                    <Form1.Label className="d-block">
                                                        MPO status of Institute
                                                        :
                                                    </Form1.Label>
                                                    <Form1.Check
                                                        checked={checked}
                                                        type="radio"
                                                        label="Yes"
                                                        className="d-inline-block pr-5"
                                                        name=""
                                                    />
                                                    <Form1.Check
                                                        checked={checked}
                                                        type="radio"
                                                        label="No"
                                                        className="d-inline-block"
                                                        name=""
                                                    />
                                                </div>
                                            </Col>
                                            <Col md={4} className="mb-10">
                                                <InputSelect
                                                    label="Institute Area : :"
                                                    name="area"
                                                    type="text"
                                                    value="id"
                                                    text="name"
                                                    data={[
                                                        {
                                                            id: 1,
                                                            name: "Zilla Sadar",
                                                        },
                                                        {
                                                            id: 2,
                                                            name: "",
                                                        },
                                                        {
                                                            id: 3,
                                                            name: "",
                                                        },
                                                    ]}
                                                />
                                                <ErrorMessage fieldName="religion" />
                                            </Col>
                                            <Col md={4} className="mb-10">
                                                <InputSelect
                                                    label="Study Type :"
                                                    name="typeStudy"
                                                    type="text"
                                                    value="id"
                                                    text="name"
                                                    data={[
                                                        {
                                                            id: 1,
                                                            name: "CO-Education",
                                                        },
                                                        {
                                                            id: 2,
                                                            name: "",
                                                        },
                                                        {
                                                            id: 3,
                                                            name: "",
                                                        },
                                                    ]}
                                                />
                                                <ErrorMessage fieldName="religion" />
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                            </div> */}

                            <div className="row">
                                <div class="contentBox-modified">
                                    <div class="section-header-custom">
                                        <h5 class="m-10 text-white">
                                            Head of Institute Details
                                        </h5>
                                    </div>

                                    <div class="contentBoxBody p-20">
                                        <Row>
                                            <Col md={12} className="mb-10">
                                                <InputField
                                                    label="প্রতিষ্ঠান প্রধানের নাম"
                                                    name="instituteHeadName"
                                                    required={true}
                                                    type="text"
                                                    placeholder="Enter Applicant's Name"
                                                />
                                                <ErrorMessage fieldName="instituteHeadName" />
                                            </Col>
                                            <Col md={6} className="mb-10">
                                                <label>
                                                    জন্ম তারিখ
                                                    <abbr
                                                        style={{ color: "red" }}
                                                        class="req"
                                                    >
                                                        *
                                                    </abbr>
                                                </label>
                                                <InputDatePicker
                                                    showTime={false}
                                                    name="instituteHeadDob"
                                                    setField={setFieldValue}
                                                    dataValue={
                                                        values?.instituteHeadDob
                                                    }
                                                />
                                                <ErrorMessage fieldName="instituteHeadDob" />
                                            </Col>

                                            <Col md={6} className="mb-10">
                                                <InputField
                                                    label="জাতীয় পরিচয়পত্র নম্বর"
                                                    name="instituteHeadNid"
                                                    type="number"
                                                    required={true}
                                                    placeholder="Enter NID"
                                                />
                                                <ErrorMessage fieldName="instituteHeadNid" />
                                            </Col>

                                            <Col md={6} className="mb-10">
                                                <InputField
                                                    label="ইনডেক্স (যদি থাকে)"
                                                    name="instituteHeadIndex"
                                                    type="number"
                                                    placeholder="Enter Index"
                                                />
                                                <ErrorMessage fieldName="instituteHeadIndex" />
                                            </Col>
                                            <Col md={6} className="mb-10">
                                                <InputField
                                                    label="ইমেইল"
                                                    name="instituteHeadEmail"
                                                    type="email"
                                                    required={true}
                                                    placeholder="Enter Email"
                                                />
                                                <ErrorMessage fieldName="instituteHeadEmail" />
                                            </Col>
                                            <Col md={6} className="mb-10">
                                                <InputField
                                                    label="মোবাইল নম্বর ১"
                                                    name="instituteHeadMobile1"
                                                    type="text"
                                                    required={true}
                                                    placeholder="Enter Number"
                                                />
                                                <ErrorMessage fieldName="instituteHeadMobile1" />
                                            </Col>
                                            <Col md={6} className="mb-10">
                                                <InputField
                                                    label="মোবাইল নম্বর ২"
                                                    name="instituteHeadMobile2"
                                                    type="text"
                                                    //required={true}
                                                    placeholder="Enter Number"
                                                />
                                                <ErrorMessage fieldName="instituteHeadMobile2" />
                                            </Col>
                                        </Row>

                                        <div class="contentBox-modified">
                                            <div class="section-header-custom">
                                                <h5 class="m-10 text-white">
                                                    Present Address : (Head of
                                                    Institute Details)
                                                </h5>
                                            </div>
                                            <div class="contentBoxBody p-20">
                                                <Row>
                                                    <Col
                                                        md={6}
                                                        className="mb-10"
                                                    >
                                                        <InputSelectApi
                                                            label="বিভাগ"
                                                            name="instituteHeadDivisionId"
                                                            operationId={UrlBuilder.commonApi(
                                                                "division/all"
                                                            )}
                                                            storeName="divisionId"
                                                            value="id"
                                                            required={true}
                                                            text="divisionNameBn"
                                                            type="number"
                                                        />
                                                        <ErrorMessage fieldName="instituteHeadDivisionId" />
                                                    </Col>
                                                    <Col
                                                        md={6}
                                                        className="mb-10"
                                                    >
                                                        <InputSelectApi
                                                            label="জেলা"
                                                            name="instituteHeadDistrictId"
                                                            operationId={
                                                                values.instituteHeadDivisionId
                                                                    ? UrlBuilder.commonApi(
                                                                          `district/all?divisionId=${values.instituteHeadDivisionId}`
                                                                      )
                                                                    : ""
                                                            }
                                                            storeName="instituteHeadDistrictId"
                                                            value="id"
                                                            text="districtNameBn"
                                                            required={true}
                                                            type="number"
                                                        />
                                                        <ErrorMessage fieldName="instituteHeadDistrictId" />
                                                    </Col>
                                                    <Col
                                                        md={6}
                                                        className="mb-10"
                                                    >
                                                        <InputSelectApi
                                                            label="উপজেলা"
                                                            name="instituteHeadUpazilaId"
                                                            operationId={
                                                                values.instituteHeadDistrictId
                                                                    ? UrlBuilder.commonApi(
                                                                          `thana/all?districtId=${values.instituteHeadDistrictId}`
                                                                      )
                                                                    : ""
                                                            }
                                                            storeName="instituteHeadUpazilaId"
                                                            value="id"
                                                            text="thanaNameBn"
                                                            required={true}
                                                            type="number"
                                                        />
                                                        <ErrorMessage fieldName="instituteHeadUpazilaId" />
                                                    </Col>
                                                    {/* <Col
                                                        md={6}
                                                        className="mb-10"
                                                    >
                                                        <InputField
                                                            label="পদবি কোড"
                                                            name="permanentPostcode"
                                                            type="number"
                                                            placeholder="Enter Email"
                                                        />
                                                        <ErrorMessage fieldName="permanentPostcode" />
                                                    </Col> */}

                                                    <Col
                                                        md={12}
                                                        className="mb-10"
                                                    >
                                                        <InputField
                                                            label="গ্রাম/রোড"
                                                            name="instituteHeadAddress"
                                                            required={true}
                                                            type="text"
                                                            placeholder="Enter address"
                                                        />
                                                        <ErrorMessage fieldName="instituteHeadAddress" />
                                                    </Col>
                                                </Row>
                                            </div>
                                        </div>
                                        <Row>
                                            <Col
                                                lg={4}
                                                md={12}
                                                className="mb-30"
                                            >
                                                <label className="form-label">
                                                    প্রতিষ্ঠান প্রধানের ছবি:
                                                    <abbr
                                                        style={{ color: "red" }}
                                                        className="req"
                                                    >
                                                        *
                                                    </abbr>
                                                    <span className="text-primary">
                                                        Allowed format jpg,
                                                        jpeg, png and max file
                                                        size 300 kb
                                                    </span>
                                                </label>
                                                <input
                                                    name="instituteHeadPhotoUrl"
                                                    className={`form-control ${
                                                        props.touched
                                                            .instituteHeadPhotoUrl &&
                                                        props.errors
                                                            .instituteHeadPhotoUrl
                                                            ? "is-invalid"
                                                            : ""
                                                    }`}
                                                    type="file"
                                                    //required={true}
                                                    onInput={(event) => {
                                                        if (
                                                            event.currentTarget
                                                                .files[0] !==
                                                            undefined
                                                        ) {
                                                            setFieldValue(
                                                                "instituteHeadPhotoUrl",
                                                                event
                                                                    ?.currentTarget
                                                                    ?.files[0]
                                                            );
                                                        } else {
                                                            setFieldValue(
                                                                "instituteHeadPhotoUrl",
                                                                ""
                                                            );
                                                        }

                                                        handleinstituteHeadPhotoUrlChange(
                                                            event
                                                        );
                                                    }}
                                                />
                                                {props.errors
                                                    .instituteHeadPhotoUrl && (
                                                    <div
                                                        id="feedback"
                                                        className="invalid-feedback"
                                                    >
                                                        {
                                                            props.errors
                                                                .instituteHeadPhotoUrl
                                                        }
                                                    </div>
                                                )}
                                            </Col>
                                            <Col md={2} className="mb-20">
                                                {instituteHeadImageState?.path ? (
                                                    <div className="donor-image">
                                                        <img
                                                            className="img-fluid rounded "
                                                            src={
                                                                instituteHeadImageState?.path
                                                            }
                                                            id="preview-image"
                                                            alt="No Image Available"
                                                            style={{
                                                                height: "90px",
                                                                width: "80px",
                                                            }}
                                                        />
                                                    </div>
                                                ) : (
                                                    <div className="donor-image">
                                                        <img
                                                            className="img-fluid rounded "
                                                            src={UrlBuilder.fileServerApi(
                                                                `${values?.instituteHeadPhotoUrl}`
                                                            )}
                                                            id="preview-image"
                                                            alt="No Image Available"
                                                            style={{
                                                                height: "90px",
                                                                width: "80px",
                                                            }}
                                                        />
                                                    </div>
                                                )}
                                            </Col>
                                            {/* <Col md={6} className="mt-20">
                                                <InputField
                                                    label="প্রতিষ্ঠান প্রধানের ছবি:"
                                                    name="instituteHeadPhotoUrl"
                                                    required={true}
                                                    type="file"
                                                    required={true}
                                                    placeholder="Enter Applicant's Photo"
                                                />
                                                <ErrorMessage fieldName="instituteHeadPhotoUrl" />
                                            </Col> */}
                                            {/* <div className="col-6">
                                                <img
                                                    // src="https://picsum.photos/200"
                                                    src={profilepic}
                                                    alt="no image available"
                                                    style={{
                                                        paddingTop: "20px",
                                                        width: "15%",
                                                    }}
                                                />
                                            </div> */}
                                            <Col
                                                lg={4}
                                                md={12}
                                                className="mb-30"
                                            >
                                                <label className="form-label">
                                                    প্রতিষ্ঠান প্রধানের
                                                    স্বাক্ষর:
                                                    <abbr
                                                        style={{ color: "red" }}
                                                        className="req"
                                                    >
                                                        *
                                                    </abbr>
                                                    <span className="text-primary">
                                                        Allowed format jpg,
                                                        jpeg, png and max file
                                                        size 300 kb
                                                    </span>
                                                </label>
                                                <input
                                                    name="instituteHeadSignatureUrl"
                                                    className={`form-control ${
                                                        props.touched
                                                            .instituteHeadSignatureUrl &&
                                                        props.errors
                                                            .instituteHeadSignatureUrl
                                                            ? "is-invalid"
                                                            : ""
                                                    }`}
                                                    type="file"
                                                    //required={true}
                                                    onInput={(event) => {
                                                        if (
                                                            event.currentTarget
                                                                .files[0] !==
                                                            undefined
                                                        ) {
                                                            setFieldValue(
                                                                "instituteHeadSignatureUrl",
                                                                event
                                                                    ?.currentTarget
                                                                    ?.files[0]
                                                            );
                                                        } else {
                                                            setFieldValue(
                                                                "instituteHeadSignatureUrl",
                                                                ""
                                                            );
                                                        }

                                                        handleInstituteHeadSignatute(
                                                            event
                                                        );
                                                    }}
                                                />
                                                {props.errors
                                                    .instituteHeadSignatureUrl && (
                                                    <div
                                                        id="feedback"
                                                        className="invalid-feedback"
                                                    >
                                                        {
                                                            props.errors
                                                                .instituteHeadSignatureUrl
                                                        }
                                                    </div>
                                                )}
                                            </Col>
                                            <Col md={2} className="mb-20">
                                                {instituteHeadSignatureUrl?.path ? (
                                                    <div className="donor-image">
                                                        <img
                                                            className="img-fluid rounded "
                                                            src={
                                                                instituteHeadSignatureUrl?.path
                                                            }
                                                            id="preview-image"
                                                            alt="No Image Available"
                                                            style={{
                                                                height: "90px",
                                                                width: "80px",
                                                            }}
                                                        />
                                                    </div>
                                                ) : (
                                                    <div className="donor-image">
                                                        <img
                                                            className="img-fluid rounded "
                                                            src={UrlBuilder.fileServerApi(
                                                                `${values?.instituteHeadSignatureUrl}`
                                                            )}
                                                            id="preview-image"
                                                            alt="No Image Available"
                                                            style={{
                                                                height: "90px",
                                                                width: "80px",
                                                            }}
                                                        />
                                                    </div>
                                                )}
                                            </Col>
                                            {/* <Col md={6} className="mt-20">
                                                <InputField
                                                    label="প্রতিষ্ঠান প্রধানের স্বাক্ষর:"
                                                    name="instituteHeadSignatureUrl"
                                                    required={true}
                                                    type="file"
                                                    required={true}
                                                    placeholder="Enter Applicant's Signature"
                                                />
                                                <ErrorMessage fieldName="instituteHeadSignatureUrl" />
                                            </Col> */}
                                            {/* <div className="col-6">
                                                <img
                                                    // src="https://picsum.photos/200"
                                                    src={signature}
                                                    alt="no image available"
                                                    style={{
                                                        paddingTop: "20px",
                                                        width: "15%",
                                                    }}
                                                />
                                            </div> */}
                                            <Col
                                                lg={4}
                                                md={12}
                                                className="mb-30"
                                            >
                                                <label className="form-label">
                                                    NID Scan Copy(Front):
                                                    <abbr
                                                        style={{ color: "red" }}
                                                        className="req"
                                                    >
                                                        *
                                                    </abbr>
                                                    <span className="text-primary">
                                                        Allowed format jpg,
                                                        jpeg, png and max file
                                                        size 300 kb
                                                    </span>
                                                </label>
                                                <input
                                                    name="instituteHeadNidUrlFront"
                                                    className={`form-control ${
                                                        props.touched
                                                            .instituteHeadNidUrlFront &&
                                                        props.errors
                                                            .instituteHeadNidUrlFront
                                                            ? "is-invalid"
                                                            : ""
                                                    }`}
                                                    type="file"
                                                    //required={true}
                                                    onInput={(event) => {
                                                        if (
                                                            event.currentTarget
                                                                .files[0] !==
                                                            undefined
                                                        ) {
                                                            setFieldValue(
                                                                "instituteHeadNidUrlFront",
                                                                event
                                                                    ?.currentTarget
                                                                    ?.files[0]
                                                            );
                                                        } else {
                                                            setFieldValue(
                                                                "instituteHeadNidUrlFront",
                                                                ""
                                                            );
                                                        }

                                                        handleinstituteHeadNidUrlFront(
                                                            event
                                                        );
                                                    }}
                                                />
                                                {props.errors
                                                    .instituteHeadNidUrlFront && (
                                                    <div
                                                        id="feedback"
                                                        className="invalid-feedback"
                                                    >
                                                        {
                                                            props.errors
                                                                .instituteHeadNidUrlFront
                                                        }
                                                    </div>
                                                )}
                                            </Col>
                                            <Col md={2} className="mb-20">
                                                {instituteHeadNidUrlFront?.path ? (
                                                    <div className="donor-image">
                                                        <img
                                                            className="img-fluid rounded "
                                                            src={
                                                                instituteHeadNidUrlFront?.path
                                                            }
                                                            id="preview-image"
                                                            alt="No Image Available"
                                                            style={{
                                                                height: "90px",
                                                                width: "80px",
                                                            }}
                                                        />
                                                    </div>
                                                ) : (
                                                    <div className="donor-image">
                                                        <img
                                                            className="img-fluid rounded "
                                                            src={UrlBuilder.fileServerApi(
                                                                `${values?.instituteHeadNidUrlFront}`
                                                            )}
                                                            id="preview-image"
                                                            alt="No Image Available"
                                                            style={{
                                                                height: "90px",
                                                                width: "80px",
                                                            }}
                                                        />
                                                    </div>
                                                )}
                                            </Col>
                                            {/* <Col md={6} className="mt-20">
                                                <InputField
                                                    label="NID Scan Copy(Front):"
                                                    name="instituteHeadNidUrlFront"
                                                    required={true}
                                                    type="file"
                                                    required={true}
                                                    placeholder="Enter NID Scan Copy"
                                                />
                                                <ErrorMessage fieldName="instituteHeadNidUrlFront" />
                                            </Col> */}
                                            {/* <div className="col-3">
                                                <img
                                                    // src="https://picsum.photos/200"
                                                    src={nidimg}
                                                    alt="no image available"
                                                    style={{
                                                        paddingTop: "20px",
                                                        width: "50%",
                                                    }}
                                                />
                                            </div> */}
                                            <Col
                                                lg={4}
                                                md={12}
                                                className="mb-30"
                                            >
                                                <label className="form-label">
                                                    NID Scan Copy(Back):
                                                    <abbr
                                                        style={{ color: "red" }}
                                                        className="req"
                                                    >
                                                        *
                                                    </abbr>
                                                    <span className="text-primary">
                                                        Allowed format jpg,
                                                        jpeg, png and max file
                                                        size 300 kb
                                                    </span>
                                                </label>
                                                <input
                                                    name="instituteHeadNidUrlRear"
                                                    className={`form-control ${
                                                        props.touched
                                                            .instituteHeadNidUrlRear &&
                                                        props.errors
                                                            .instituteHeadNidUrlRear
                                                            ? "is-invalid"
                                                            : ""
                                                    }`}
                                                    type="file"
                                                    //required={true}
                                                    onInput={(event) => {
                                                        if (
                                                            event.currentTarget
                                                                .files[0] !==
                                                            undefined
                                                        ) {
                                                            setFieldValue(
                                                                "instituteHeadNidUrlRear",
                                                                event
                                                                    ?.currentTarget
                                                                    ?.files[0]
                                                            );
                                                        } else {
                                                            setFieldValue(
                                                                "instituteHeadNidUrlRear",
                                                                ""
                                                            );
                                                        }

                                                        handleinstituteHeadNidUrlRear(
                                                            event
                                                        );
                                                    }}
                                                />
                                                {props.errors
                                                    .instituteHeadNidUrlRear && (
                                                    <div
                                                        id="feedback"
                                                        className="invalid-feedback"
                                                    >
                                                        {
                                                            props.errors
                                                                .instituteHeadNidUrlRear
                                                        }
                                                    </div>
                                                )}
                                            </Col>
                                            <Col md={2} className="mb-20">
                                                {instituteHeadNidUrlRear?.path ? (
                                                    <div className="donor-image">
                                                        <img
                                                            className="img-fluid rounded "
                                                            src={
                                                                instituteHeadNidUrlRear?.path
                                                            }
                                                            id="preview-image"
                                                            alt="No Image Available"
                                                            style={{
                                                                height: "90px",
                                                                width: "80px",
                                                            }}
                                                        />
                                                    </div>
                                                ) : (
                                                    <div className="donor-image">
                                                        <img
                                                            className="img-fluid rounded "
                                                            src={UrlBuilder.fileServerApi(
                                                                `${values?.instituteHeadNidUrlRear}`
                                                            )}
                                                            id="preview-image"
                                                            alt="No Image Available"
                                                            style={{
                                                                height: "90px",
                                                                width: "80px",
                                                            }}
                                                        />
                                                    </div>
                                                )}
                                            </Col>
                                            {/* <Col md={6} className="mt-20">
                                                <InputField
                                                    label="NID Scan Copy(Back):"
                                                    name="instituteHeadNidUrlRear"
                                                    required={true}
                                                    type="file"
                                                    required={true}
                                                    placeholder="Enter NID Scan Copy"
                                                />
                                                <ErrorMessage fieldName="instituteHeadNidUrlRear" />
                                            </Col> */}
                                            {/* <div className="col-3">
                                                <img
                                                    // src="https://picsum.photos/200"
                                                    src={nidimg}
                                                    alt="no image available"
                                                    style={{
                                                        paddingTop: "20px",
                                                        width: "50%",
                                                    }}
                                                />
                                            </div> */}
                                        </Row>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div class="contentBox-modified">
                                    <div class="section-header-custom">
                                        <h5 class="m-10 text-white">
                                            Governing Body/Managing Commitee
                                            Chairman Details
                                        </h5>
                                    </div>

                                    <div class="contentBoxBody p-20">
                                        <Row>
                                            <Col md={12} className="mb-10">
                                                <InputField
                                                    label="চেয়ারম্যানের নাম"
                                                    name="governingBodyChairmanName"
                                                    required={true}
                                                    type="text"
                                                    placeholder="Enter Applicant's Name"
                                                />
                                                <ErrorMessage fieldName="governingBodyChairmanName" />
                                            </Col>

                                            <Col md={6} className="mb-10">
                                                <label>
                                                    জন্ম তারিখ
                                                    <abbr
                                                        style={{ color: "red" }}
                                                        class="req"
                                                    >
                                                        *
                                                    </abbr>
                                                </label>
                                                <InputDatePicker
                                                    showTime={false}
                                                    name="governingBodyChairmanDob"
                                                    setField={setFieldValue}
                                                    dataValue={
                                                        values?.governingBodyChairmanDob
                                                    }
                                                />
                                                <ErrorMessage fieldName="governingBodyChairmanDob" />
                                            </Col>
                                            <Col md={6} className="mb-10">
                                                <InputField
                                                    label="জাতীয় পরিচয়পত্র নম্বর"
                                                    required={true}
                                                    name="governingBodyChairmanNid"
                                                    type="number"
                                                    placeholder="Enter NID"
                                                />
                                                <ErrorMessage fieldName="governingBodyChairmanNid" />
                                            </Col>
                                            <Col md={6} className="mb-10">
                                                <InputField
                                                    label="ইনডেক্স (যদি থাকে)"
                                                    name="governingBodyChairmanIndex"
                                                    type="number"
                                                    placeholder="Enter Index"
                                                />
                                                <ErrorMessage fieldName="governingBodyChairmanIndex" />
                                            </Col>
                                            <Col md={6} className="mb-10">
                                                <InputField
                                                    label="ইমেইল"
                                                    required={true}
                                                    name="governingBodyChairmanEmail"
                                                    type="email"
                                                    placeholder="Enter Email"
                                                />
                                                <ErrorMessage fieldName="governingBodyChairmanEmail" />
                                            </Col>
                                            <Col md={6} className="mb-10">
                                                <InputField
                                                    label="মোবাইল নম্বর ১"
                                                    required={true}
                                                    name="governingBodyChairmanMobile1"
                                                    type="text"
                                                    placeholder="Enter Number"
                                                />
                                                <ErrorMessage fieldName="governingBodyChairmanMobile1" />
                                            </Col>
                                            <Col md={6} className="mb-10">
                                                <InputField
                                                    label="মোবাইল নম্বর ২"
                                                    //required={true}
                                                    name="governingBodyChairmanMobile2"
                                                    type="text"
                                                    placeholder="Enter Number"
                                                />
                                                <ErrorMessage fieldName="governingBodyChairmanMobile2" />
                                            </Col>
                                        </Row>

                                        <div class="contentBox-modified">
                                            <div class="section-header-custom">
                                                <h5 class="m-10 text-white">
                                                    Present Address : (Governing
                                                    Body/Managing Commitee
                                                    Chairman)
                                                </h5>
                                            </div>
                                            <div class="contentBoxBody p-20">
                                                <Row>
                                                    <Col
                                                        md={6}
                                                        className="mb-10"
                                                    >
                                                        <InputSelectApi
                                                            label="বিভাগ"
                                                            required={true}
                                                            name="governingBodyChairmanDivisionId"
                                                            operationId={UrlBuilder.commonApi(
                                                                "division/all"
                                                            )}
                                                            storeName="governingBodyChairmanDivisionId"
                                                            value="id"
                                                            text="divisionNameBn"
                                                            type="number"
                                                        />
                                                        <ErrorMessage fieldName="governingBodyChairmanDivisionId" />
                                                    </Col>
                                                    <Col
                                                        md={6}
                                                        className="mb-10"
                                                    >
                                                        <InputSelectApi
                                                            label="জেলা"
                                                            required={true}
                                                            name="governingBodyChairmanDistrictId"
                                                            operationId={
                                                                values?.governingBodyChairmanDivisionId
                                                                    ? UrlBuilder.commonApi(
                                                                          `district/all?divisionId=${values?.governingBodyChairmanDivisionId}`
                                                                      )
                                                                    : ""
                                                            }
                                                            storeName="governingBodyChairmanDistrictId"
                                                            value="id"
                                                            text="districtNameBn"
                                                            type="number"
                                                        />
                                                        <ErrorMessage fieldName="governingBodyChairmanDistrictId" />
                                                    </Col>
                                                    <Col
                                                        md={6}
                                                        className="mb-10"
                                                    >
                                                        <InputSelectApi
                                                            label="উপজেলা"
                                                            required={true}
                                                            name="governingBodyChairmanUpazilaId"
                                                            operationId={
                                                                values?.governingBodyChairmanDistrictId
                                                                    ? UrlBuilder.commonApi(
                                                                          `thana/all?districtId=${values?.governingBodyChairmanDistrictId}`
                                                                      )
                                                                    : ""
                                                            }
                                                            storeName="governingBodyChairmanUpazilaId"
                                                            value="id"
                                                            text="thanaNameBn"
                                                            type="number"
                                                        />
                                                        <ErrorMessage fieldName="governingBodyChairmanUpazilaId" />
                                                    </Col>
                                                    {/* <Col
                                                        md={6}
                                                        className="mb-10"
                                                    >
                                                        <InputField
                                                            label="পদবি কোড"
                                                            name="permanentPostcode"
                                                            type="number"
                                                            placeholder="Enter Email"
                                                        />
                                                        <ErrorMessage fieldName="permanentPostcode" />
                                                    </Col> */}

                                                    <Col
                                                        md={12}
                                                        className="mb-10"
                                                    >
                                                        <InputField
                                                            label="গ্রাম/রোড"
                                                            name="governingBodyChairmanAddress"
                                                            required={true}
                                                            type="text"
                                                            placeholder="Enter address"
                                                        />
                                                        <ErrorMessage fieldName="governingBodyChairmanAddress" />
                                                    </Col>
                                                </Row>
                                            </div>
                                        </div>
                                        <Row>
                                            <Col
                                                lg={4}
                                                md={12}
                                                className="mb-30"
                                            >
                                                <label className="form-label">
                                                    চেয়ারম্যানের ছবি:
                                                    <abbr
                                                        style={{ color: "red" }}
                                                        className="req"
                                                    >
                                                        *
                                                    </abbr>
                                                    <span className="text-primary">
                                                        Allowed format jpg,
                                                        jpeg, png and max file
                                                        size 300 kb
                                                    </span>
                                                </label>
                                                <input
                                                    name="governingBodyChairmanPhotoUrl"
                                                    className={`form-control ${
                                                        props.touched
                                                            .governingBodyChairmanPhotoUrl &&
                                                        props.errors
                                                            .governingBodyChairmanPhotoUrl
                                                            ? "is-invalid"
                                                            : ""
                                                    }`}
                                                    type="file"
                                                    //required={true}
                                                    onInput={(event) => {
                                                        if (
                                                            event.currentTarget
                                                                .files[0] !==
                                                            undefined
                                                        ) {
                                                            setFieldValue(
                                                                "governingBodyChairmanPhotoUrl",
                                                                event
                                                                    ?.currentTarget
                                                                    ?.files[0]
                                                            );
                                                        } else {
                                                            setFieldValue(
                                                                "governingBodyChairmanPhotoUrl",
                                                                ""
                                                            );
                                                        }

                                                        handleChairmanPhotoChange(
                                                            event
                                                        );
                                                    }}
                                                />
                                                {props.errors
                                                    .governingBodyChairmanPhotoUrl && (
                                                    <div
                                                        id="feedback"
                                                        className="invalid-feedback"
                                                    >
                                                        {
                                                            props.errors
                                                                .governingBodyChairmanPhotoUrl
                                                        }
                                                    </div>
                                                )}
                                            </Col>
                                            <Col md={2} className="mb-20">
                                                {chairmanPhotoState?.path ? (
                                                    <div className="donor-image">
                                                        <img
                                                            className="img-fluid rounded "
                                                            src={
                                                                chairmanPhotoState?.path
                                                            }
                                                            id="preview-image"
                                                            alt="No Image Available"
                                                            style={{
                                                                height: "90px",
                                                                width: "80px",
                                                            }}
                                                        />
                                                    </div>
                                                ) : (
                                                    <div className="donor-image">
                                                        <img
                                                            className="img-fluid rounded "
                                                            src={UrlBuilder.fileServerApi(
                                                                `${values?.governingBodyChairmanPhotoUrl}`
                                                            )}
                                                            id="preview-image"
                                                            alt="No Image Available"
                                                            style={{
                                                                height: "90px",
                                                                width: "80px",
                                                            }}
                                                        />
                                                    </div>
                                                )}
                                            </Col>
                                            {/* <Col md={6} className="mt-20">
                                                <InputField
                                                    label="প্রতিষ্ঠান প্রধানের ছবি:"
                                                    name="governingBodyChairmanPhotoUrl"
                                                    required={true}
                                                    type="file"
                                                    required={true}
                                                    placeholder="Enter Applicant's Photo"
                                                />
                                                <ErrorMessage fieldName="governingBodyChairmanPhotoUrl" />
                                            </Col> */}
                                            {/* <div className="col-6">
                                                <img
                                                    src={profilepic}
                                                    alt="no image available"
                                                    style={{
                                                        paddingTop: "20px",
                                                        width: "15%",
                                                    }}
                                                />
                                            </div> */}
                                            <Col
                                                lg={4}
                                                md={12}
                                                className="mb-30"
                                            >
                                                <label className="form-label">
                                                    চেয়ারম্যানের স্বাক্ষর:
                                                    <abbr
                                                        style={{ color: "red" }}
                                                        className="req"
                                                    >
                                                        *
                                                    </abbr>
                                                    <span className="text-primary">
                                                        Allowed format jpg,
                                                        jpeg, png and max file
                                                        size 300 kb
                                                    </span>
                                                </label>
                                                <input
                                                    name="governingBodyChairmanSignatureUrl"
                                                    className={`form-control ${
                                                        props.touched
                                                            .governingBodyChairmanSignatureUrl &&
                                                        props.errors
                                                            .governingBodyChairmanSignatureUrl
                                                            ? "is-invalid"
                                                            : ""
                                                    }`}
                                                    type="file"
                                                    //required={true}
                                                    onInput={(event) => {
                                                        if (
                                                            event.currentTarget
                                                                .files[0] !==
                                                            undefined
                                                        ) {
                                                            setFieldValue(
                                                                "governingBodyChairmanSignatureUrl",
                                                                event
                                                                    ?.currentTarget
                                                                    ?.files[0]
                                                            );
                                                        } else {
                                                            setFieldValue(
                                                                "governingBodyChairmanSignatureUrl",
                                                                ""
                                                            );
                                                        }

                                                        handleChairmanSignatute(
                                                            event
                                                        );
                                                    }}
                                                />
                                                {props.errors
                                                    .governingBodyChairmanSignatureUrl && (
                                                    <div
                                                        id="feedback"
                                                        className="invalid-feedback"
                                                    >
                                                        {
                                                            props.errors
                                                                .governingBodyChairmanSignatureUrl
                                                        }
                                                    </div>
                                                )}
                                            </Col>
                                            <Col md={2} className="mb-20">
                                                {chairmanSignatureState?.path ? (
                                                    <div className="donor-image">
                                                        <img
                                                            className="img-fluid rounded "
                                                            src={
                                                                chairmanSignatureState?.path
                                                            }
                                                            id="preview-image"
                                                            alt="No Image Available"
                                                            style={{
                                                                height: "90px",
                                                                width: "80px",
                                                            }}
                                                        />
                                                    </div>
                                                ) : (
                                                    <div className="donor-image">
                                                        <img
                                                            className="img-fluid rounded "
                                                            src={UrlBuilder.fileServerApi(
                                                                `${values?.governingBodyChairmanSignatureUrl}`
                                                            )}
                                                            id="preview-image"
                                                            alt="No Image Available"
                                                            style={{
                                                                height: "90px",
                                                                width: "80px",
                                                            }}
                                                        />
                                                    </div>
                                                )}
                                            </Col>
                                            {/* <Col md={6} className="mt-20">
                                                <InputField
                                                    label="প্রতিষ্ঠান প্রধানের স্বাক্ষর:"
                                                    name="governingBodyChairmanSignatureUrl"
                                                    required={true}
                                                    type="file"
                                                    required={true}
                                                    placeholder="Enter Applicant's Signature"
                                                />
                                                <ErrorMessage fieldName="governingBodyChairmanSignatureUrl" />
                                            </Col> */}
                                            {/* <div className="col-6">
                                                <img
                                                    // src="https://picsum.photos/200"
                                                    src={signature}
                                                    alt="no image available"
                                                    style={{
                                                        paddingTop: "20px",
                                                        width: "15%",
                                                    }}
                                                />
                                            </div> */}
                                            <Col
                                                lg={4}
                                                md={12}
                                                className="mb-30"
                                            >
                                                <label className="form-label">
                                                    NID Scan Copy(Front)
                                                    <abbr
                                                        style={{ color: "red" }}
                                                        className="req"
                                                    >
                                                        *
                                                    </abbr>
                                                    <span className="text-primary">
                                                        Allowed format jpg,
                                                        jpeg, png and max file
                                                        size 300 kb
                                                    </span>
                                                </label>
                                                <input
                                                    name="governingBodyChairmanNidUrlFront"
                                                    className={`form-control ${
                                                        props.touched
                                                            .governingBodyChairmanNidUrlFront &&
                                                        props.errors
                                                            .governingBodyChairmanNidUrlFront
                                                            ? "is-invalid"
                                                            : ""
                                                    }`}
                                                    type="file"
                                                    //required={true}
                                                    onInput={(event) => {
                                                        if (
                                                            event.currentTarget
                                                                .files[0] !==
                                                            undefined
                                                        ) {
                                                            setFieldValue(
                                                                "governingBodyChairmanNidUrlFront",
                                                                event
                                                                    ?.currentTarget
                                                                    ?.files[0]
                                                            );
                                                        } else {
                                                            setFieldValue(
                                                                "governingBodyChairmanNidUrlFront",
                                                                ""
                                                            );
                                                        }

                                                        handleChairmanNidFront(
                                                            event
                                                        );
                                                    }}
                                                />
                                                {props.errors
                                                    .governingBodyChairmanNidUrlFront && (
                                                    <div
                                                        id="feedback"
                                                        className="invalid-feedback"
                                                    >
                                                        {
                                                            props.errors
                                                                .governingBodyChairmanNidUrlFront
                                                        }
                                                    </div>
                                                )}
                                            </Col>
                                            {/* <Col md={6} className="mt-20">
                                                <InputField
                                                    label="NID Scan Copy(Front):"
                                                    name="governingBodyChairmanNidUrlFront"
                                                    required={true}
                                                    type="file"
                                                    required={true}
                                                    placeholder="Enter NID Scan Copy"
                                                />
                                                <ErrorMessage fieldName="governingBodyChairmanNidUrlFront" />
                                            </Col> */}
                                            {/* <div className="col-3">
                                                <img
                                                    // src="https://picsum.photos/200"
                                                    src={nidimg}
                                                    alt="no image available"
                                                    style={{
                                                        paddingTop: "20px",
                                                        width: "50%",
                                                    }}
                                                />
                                            </div> */}
                                            <Col md={2} className="mb-20">
                                                {chairmanNidFront?.path ? (
                                                    <div className="donor-image">
                                                        <img
                                                            className="img-fluid rounded "
                                                            src={
                                                                chairmanNidFront?.path
                                                            }
                                                            id="preview-image"
                                                            alt="No Image Available"
                                                            style={{
                                                                height: "90px",
                                                                width: "80px",
                                                            }}
                                                        />
                                                    </div>
                                                ) : (
                                                    <div className="donor-image">
                                                        <img
                                                            className="img-fluid rounded "
                                                            src={UrlBuilder.fileServerApi(
                                                                `${values?.governingBodyChairmanNidUrlFront}`
                                                            )}
                                                            id="preview-image"
                                                            alt="No Image Available"
                                                            style={{
                                                                height: "90px",
                                                                width: "80px",
                                                            }}
                                                        />
                                                    </div>
                                                )}
                                            </Col>
                                            <Col
                                                lg={4}
                                                md={12}
                                                className="mb-30"
                                            >
                                                <label className="form-label">
                                                    NID Scan Copy(Back):
                                                    <abbr
                                                        style={{ color: "red" }}
                                                        className="req"
                                                    >
                                                        *
                                                    </abbr>
                                                    <span className="text-primary">
                                                        Allowed format jpg,
                                                        jpeg, png and max file
                                                        size 300 kb
                                                    </span>
                                                </label>
                                                <input
                                                    name="governingBodyChairmanNidUrlRear"
                                                    className={`form-control ${
                                                        props.touched
                                                            .governingBodyChairmanNidUrlRear &&
                                                        props.errors
                                                            .governingBodyChairmanNidUrlRear
                                                            ? "is-invalid"
                                                            : ""
                                                    }`}
                                                    type="file"
                                                    //required={true}
                                                    onInput={(event) => {
                                                        if (
                                                            event.currentTarget
                                                                .files[0] !==
                                                            undefined
                                                        ) {
                                                            setFieldValue(
                                                                "governingBodyChairmanNidUrlRear",
                                                                event
                                                                    ?.currentTarget
                                                                    ?.files[0]
                                                            );
                                                        } else {
                                                            setFieldValue(
                                                                "governingBodyChairmanNidUrlRear",
                                                                ""
                                                            );
                                                        }

                                                        handleChairmanNidRear(
                                                            event
                                                        );
                                                    }}
                                                />
                                                {props.errors
                                                    .governingBodyChairmanNidUrlRear && (
                                                    <div
                                                        id="feedback"
                                                        className="invalid-feedback"
                                                    >
                                                        {
                                                            props.errors
                                                                .governingBodyChairmanNidUrlRear
                                                        }
                                                    </div>
                                                )}
                                            </Col>

                                            <Col md={2} className="mb-20">
                                                {chairmanNidRear?.path ? (
                                                    <div className="donor-image">
                                                        <img
                                                            className="img-fluid rounded "
                                                            src={
                                                                chairmanNidRear?.path
                                                            }
                                                            id="preview-image"
                                                            alt="No Image Available"
                                                            style={{
                                                                height: "90px",
                                                                width: "80px",
                                                            }}
                                                        />
                                                    </div>
                                                ) : (
                                                    <div className="donor-image">
                                                        <img
                                                            className="img-fluid rounded "
                                                            src={UrlBuilder.fileServerApi(
                                                                `${values?.governingBodyChairmanNidUrlRear}`
                                                            )}
                                                            id="preview-image"
                                                            alt="No Image Available"
                                                            style={{
                                                                height: "90px",
                                                                width: "80px",
                                                            }}
                                                        />
                                                    </div>
                                                )}
                                            </Col>

                                            {/* <Col md={6} className="mt-20">
                                                <InputField
                                                    label="NID Scan Copy(Back):"
                                                    name="governingBodyChairmanNidUrlRear"
                                                    required={true}
                                                    type="file"
                                                    required={true}
                                                    placeholder="Enter NID Scan Copy"
                                                />
                                                <ErrorMessage fieldName="governingBodyChairmanNidUrlRear" />
                                            </Col> */}
                                            {/* <div className="col-3">
                                                <img
                                                    // src="https://picsum.photos/200"
                                                    src={nidimg}
                                                    alt="no image available"
                                                    style={{
                                                        paddingTop: "20px",
                                                        width: "50%",
                                                    }}
                                                />
                                            </div> */}
                                        </Row>
                                    </div>
                                </div>
                            </div>
                        </Card.Body>
                    </div>
                </div>
            </div>
            <row>
                <Col md={12} className="mb-10 mt-10">
                    <Button
                        variant=""
                        className="f-right btn-color"
                        type="submit"
                    >
                        <FontAwesomeIcon icon={faSave} className="me-2" />{" "}
                        সাবমিট করুন
                    </Button>
                    <Button
                        variant="white"
                        className="f-right mr-10"
                        type="reset"
                    >
                        <FontAwesomeIcon icon={faUndo} className="me-2" /> রিসেট
                    </Button>
                    <Link to="/portal/dashboard">
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
            </row>
        </Form>
    );
};

export default ProfileForm;
