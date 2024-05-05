import React from "react";
import {
    faSave,
    faTimes,
    faUndo,
    faPlusSquare,
    faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Row } from "@themesberg/react-bootstrap";
import { Form } from "formik/dist/index";
import { Link } from "react-router-dom";
import { InputField, InputSelect } from "../../../../components/form";

import { FieldArray, Field } from "formik/dist/index";
import InputSelectApi from "components/form/InputSelectApi";
// import { InputField, InputSelect } from "../../../../components/form";
import ErrorMessage from "../../../../components/text/ErrorMessage";
import { AuthUser } from "helpers/AuthUser";
import { UrlBuilder } from "helpers/UrlBuilder";
import { useDispatch, useSelector } from "react-redux";
import { callApi, clearState, selectApi, setState } from "reducers/apiSlice";
import { useEffect } from "react";
import { useState } from "react";
import InputDatePicker from "components/form/InputDatePicker";
import InputSelectMultiLabelApi from "components/form/InputSelectMultiLabelApi";

const ApplicationApplyForm = ({
    values,
    setFieldValue,
    circularId,
    ...props
}) => {
    /**
     * useDispatch: dispatch actions
     */

    const dispatch = useDispatch();
    var nid = AuthUser.getUserName();

    const [imgState, setImgState] = useState({
        path: "",
    });

    const [signState, setSignState] = useState({
        path: "",
    });

    /**
     * Get loading indicator and data from 'selectApi' state
     */
    const {
        loading,
        details = {
            data: {},
        },
        examList = {
            data: {},
        },
    } = useSelector(selectApi);

    /**
     * Get data through api call by dispatching 'callApi'.
     */

    useEffect(() => {
        dispatch(
            callApi({
                operationId: UrlBuilder.ntrcaApi(
                    `job-application/exam/all/${nid}`
                ),
                storeName: "examList",
                output: "examList",
            })
        );
        dispatch(
            callApi({
                operationId: UrlBuilder.ntrcaApi(
                    `job-application/step-one-details/${nid}/${circularId}`
                ),
                output: "details",
                storeName: "apply",
            })
        );
    }, []);

    // useEffect(() => {

    //     !values?.examBatchId &&
    //         dispatch(
    //             clearState({
    //                 output: "details",
    //             })
    //         );

    //     dispatch(
    //         callApi({
    //             operationId: UrlBuilder.ntrcaApi(
    //                 `job-application/exam/all/${nid}`
    //             ),
    //             storeName: "examList",
    //             output: "examList",
    //         })
    //     );

    //     dispatch(
    //         callApi({
    //             operationId:
    //                 nid && values?.examBatchId
    //                     ? UrlBuilder.ntrcaApi(
    //                           `job-application/info/${nid}/${values?.examBatchId}`
    //                       )
    //                     : null,
    //             output: "details",
    //             storeName: "apply",
    //         })
    //     );
    // }, [dispatch, nid, values?.examBatchId]);

    useEffect(() => {
        if (!values?.examBatchId) {
            dispatch(
                clearState({
                    output: "details",
                })
            );
        }
    }, [dispatch, values?.examBatchId]);

    useEffect(() => {
        dispatch(
            callApi({
                operationId: values?.examBatchId
                    ? UrlBuilder.ntrcaApi(
                          `job-application/info/${nid}/${values?.examBatchId}/${circularId}`
                      )
                    : null,
                output: "details",
                storeName: "apply1",
            })
        );
    }, [dispatch, nid, values?.examBatchId, circularId]);

    useEffect(() => {
        if (values?.examBatchId) {
            //setFieldValue("examBatchId", details?.data?.examBatchId ?? "");
            setFieldValue("rollNo", details?.data?.rollNo ?? "");
            setFieldValue(
                "registrationNo",
                details?.data?.registrationNo ?? ""
            );
            setFieldValue("applicantName", details?.data?.applicantName ?? "");
            setFieldValue("fatherName", details?.data?.fatherName ?? "");
            setFieldValue("motherName", details?.data?.motherName ?? "");
            setFieldValue("dob", details?.data?.dob ?? "");
            setFieldValue("nid", details?.data?.nid ?? "");
            setFieldValue("mobile", details?.data?.mobile ?? "");
            setFieldValue("email", details?.data?.email ?? "");
            setFieldValue("religion", details?.data?.religion ?? "");
            setFieldValue("gender", details?.data?.gender ?? "");
            setFieldValue("maritalStatus", details?.data?.maritalStatus ?? "");
            setFieldValue(
                "nationality",
                details?.data?.nationality ?? "BANGLADESHI"
            );
            setFieldValue(
                "permanentDistrict",
                details?.data?.permanentDistrict ?? ""
            );
            setFieldValue(
                "permanentThana",
                details?.data?.permanentThana ?? ""
            );
            setFieldValue(
                "permanentPostCode",
                details?.data?.permanentPostCode ?? ""
            );
            setFieldValue("jobApplicationCircularId", circularId ?? "");
        } else {
            setFieldValue("rollNo", "");
            setFieldValue("registrationNo", "");
            setFieldValue("applicantName", "");
            setFieldValue("fatherName", "");
            setFieldValue("motherName", "");
            setFieldValue("dob", "");
            setFieldValue("nid", "");
            setFieldValue("mobile", "");
            setFieldValue("email", "");
            setFieldValue("religion", "");
            setFieldValue("gender", "");
            setFieldValue("maritalStatus", "");
            setFieldValue("nationality", "");
            setFieldValue("permanentDistrict", "");
            setFieldValue("permanentThana", "");
            setFieldValue("permanentPostCode", "");
            setFieldValue("jobApplicationCircularId", "");
        }
    }, [nid, values?.examBatchId, JSON.stringify(details?.data)]);

    const onDivisionChange = (setFieldValue) => {
        setFieldValue("presentDistrictId", "");
        setFieldValue("presentThanaId", "");
        setFieldValue("presentPostCode", "");
    };

    const onDistrictChange = (setFieldValue) => {
        setFieldValue("presentThanaId", "");
        setFieldValue("presentPostCode", "");
    };
    const onThanaChange = (setFieldValue) => {
        setFieldValue("presentPostCode", "");
    };

    const handlePhotoChange = (e) => {
        if (e.target.files[0] !== undefined) {
            setImgState({
                ...imgState,
                path: URL.createObjectURL(e.target.files[0]),
            });
        } else {
            setImgState({
                ...imgState,
                path: "",
            });
        }
    };

    const handleSignChange = (e) => {
        if (e.target.files[0] !== undefined) {
            setSignState({
                ...signState,
                path: URL.createObjectURL(e.target.files[0]),
            });
        } else {
            setSignState({
                ...signState,
                path: "",
            });
        }
    };

    return (
        <Form>
            <div className="contentBox-modified">
                <div className="section-header-custom">
                    {/* <h5 className="m-10 text-white">Information</h5> */}
                </div>
                <div className="contentBoxBody mt-20"></div>
                <Row>
                    <Col md={4} className="mb-10">
                        <InputSelect
                            label="ব্যাচ"
                            name="examBatchId"
                            required={true}
                            storeName="examNameBn"
                            data={examList?.data || []}
                            type="text"
                            value="id"
                            text="examNameBn"
                            onChange={async (e) => {
                                await setFieldValue(
                                    "examBatchId",
                                    e.target.value
                                );
                            }}
                        />
                    </Col>
                    <Col md={4} className="mb-10">
                        <InputField
                            label="রোল"
                            name="rollNo"
                            // required={true}
                            type="text"
                            //placeholder="রোল নম্বর লিখুন"
                            disabled
                        />
                    </Col>
                    <Col md={4} className="mb-10">
                        <InputField
                            label="নিবন্ধন নম্বর"
                            name="registrationNo"
                            type="text"
                            // required={true}
                            //placeholder="রেজিস্ট্রেশন নম্বর লিখুন"
                            disabled
                        />
                    </Col>
                </Row>
            </div>
            <div className="contentBoxBody mt-20"></div>
            <div className="contentBox-modified">
                <div className="section-header-custom">
                    <h5 className="m-10 text-white">Basic Information</h5>
                </div>
                <div className="contentBoxBody mt-20"></div>
                <Row>
                    <Col md={4} className="mb-10">
                        <InputField
                            label="আবেদনকারীর নাম"
                            name="applicantName"
                            // required={true}
                            type="text"
                            //placeholder="Enter Applicant's Name"
                            disabled={true}
                        />
                        <ErrorMessage fieldName="appName" />
                    </Col>
                    <Col md={4} className="mb-10">
                        <InputField
                            label="পিতার নাম"
                            name="fatherName"
                            type="text"
                            // required={true}
                            //placeholder="Enter Father Name"
                            disabled={true}
                        />
                        <ErrorMessage fieldName="FName" />
                    </Col>
                    <Col md={4} className="mb-10">
                        <InputField
                            label="মায়ের নাম"
                            name="motherName"
                            type="text"
                            // required={true}
                            //placeholder="Enter Mother Name"
                            disabled={true}
                        />
                        <ErrorMessage fieldName="MName" />
                    </Col>
                    <Col md={3} className="mb-10">
                        <label>
                            জন্ম তারিখ
                            {/* <abbr style={{ color: "red" }}>*</abbr> */}
                        </label>
                        {/* <InputField
                            label="জন্ম তারিখ"
                            name="dob"
                            type="date"
                            //placeholder="Enter জন্ম তারিখ"
                            disabled={true}
                        /> */}
                        <InputDatePicker
                            // disabled={true}
                            name="dob"
                            setField={setFieldValue}
                            dataValue={values?.dob}
                            disabled={true}
                            //className="mb-5"
                        />
                        <ErrorMessage fieldName="dob" />
                    </Col>
                    <Col md={3} className="mb-10">
                        <InputField
                            label="জাতীয় পরিচয়পত্র নম্বর"
                            name="nid"
                            type="text"
                            // required={true}
                            //placeholder="Enter NID"
                            disabled={true}
                        />
                        <ErrorMessage fieldName="nid" />
                    </Col>
                    <Col md={3} className="mb-10">
                        <InputField
                            label="মোবাইল নম্বর"
                            name="mobile"
                            type="text"
                            required={true}
                            //placeholder="Enter Mobile"
                        />
                        <ErrorMessage fieldName="mobile" />
                    </Col>
                    <Col md={3} className="mb-10">
                        <InputField
                            label="ইমেইল"
                            name="email"
                            type="email"
                            //placeholder="Enter Email"
                        />
                        <ErrorMessage fieldName="email" />
                    </Col>
                    <Col md={3} className="mb-10">
                        <InputField
                            label="ধর্ম"
                            name="religion"
                            type="text"
                            //placeholder="Enter Religion"
                            disabled={true}
                        />
                    </Col>
                    <Col md={3} className="mb-10">
                        <InputField
                            label="লিঙ্গ"
                            name="gender"
                            type="text"
                            //placeholder="Enter Gender"
                            disabled={true}
                        />

                        <ErrorMessage fieldName="gender" />
                    </Col>
                    <Col md={3} className="mb-10">
                        <InputField
                            label="জাতীয়তা"
                            name="nationality"
                            type="text"
                            //placeholder="Enter Nationality"
                            disabled={true}
                        />
                    </Col>
                    <Col md={3} className="mb-10">
                        <InputSelect
                            label="বৈবাহিক অবস্থা"
                            name="maritalStatus"
                            required={true}
                            type="text"
                            value="id"
                            text="name"
                            data={[
                                {
                                    id: "MARRIED",
                                    name: "MARRIED",
                                },
                                {
                                    id: "UN_MARRIED",
                                    name: "UNMARRIED",
                                },
                                {
                                    id: "DIVORCED",
                                    name: "DIVORCED",
                                },
                            ]}
                        />
                        <ErrorMessage fieldName="maritalStatus" />
                    </Col>
                </Row>
            </div>

            <div className="contentBoxBody mt-20"></div>
            <div className="contentBox-modified">
                <div className="section-header-custom">
                    <h5 className="m-10 text-white">Present Address</h5>
                </div>
                <div className="contentBoxBody mt-20"></div>
                <Row>
                    <Col lg={3} md={6} className="mb-20">
                        <InputSelectApi
                            label="বিভাগ"
                            name="presentDivisionId"
                            operationId={UrlBuilder.commonApi("division/all")}
                            storeName="division"
                            value="id"
                            text="divisionName"
                            required={true}
                            onChange={(e) => {
                                setFieldValue(
                                    "presentDivisionId",
                                    e.target.value
                                );
                                onDivisionChange(setFieldValue);
                            }}
                        />
                    </Col>
                    <Col lg={3} md={6} className="mb-20">
                        <InputSelectApi
                            label="জেলা "
                            name="presentDistrictId"
                            operationId={
                                values.presentDivisionId
                                    ? UrlBuilder.commonApi(
                                          `district/all?divisionId=${values.presentDivisionId}`
                                      )
                                    : ""
                            }
                            storeName="district"
                            value="id"
                            text="districtName"
                            required={true}
                            onChange={(e) => {
                                setFieldValue(
                                    "presentDistrictId",
                                    e.target.value
                                );
                                onDistrictChange(setFieldValue);
                            }}
                        />
                    </Col>

                    <Col lg={3} md={6} className="mb-20">
                        <InputSelectApi
                            label="থানা "
                            name="presentThanaId"
                            operationId={
                                values.presentDistrictId
                                    ? UrlBuilder.commonApi(
                                          `thana/all?districtId=${values.presentDistrictId}`
                                      )
                                    : ""
                            }
                            storeName="thana"
                            value="id"
                            text="thanaName"
                            required={true}
                            onChange={(e) => {
                                setFieldValue("presentThanaId", e.target.value);
                                onThanaChange(setFieldValue);
                            }}
                        />
                    </Col>

                    <Col lg={3} md={6} className="mb-20">
                        <InputSelectMultiLabelApi
                            label="উপজেলা"
                            name="presentPostCode"
                            // required={true}
                            operationId={
                                values.presentThanaId
                                    ? UrlBuilder.commonApi(
                                          `post-office/all?thanaId=${values.presentThanaId}`
                                      )
                                    : ""
                            }
                            storeName="postOffice"
                            value="id"
                            text="postOfficeName"
                            altText="postOfficeCode"
                            onChange={(e) =>
                                setFieldValue("presentPostCode", e.target.value)
                            }
                        />
                    </Col>
                </Row>
            </div>

            <div className="contentBoxBody mt-20"></div>
            <div className="contentBox-modified">
                <div className="section-header-custom">
                    <h5 className="m-10 text-white">Premanent Address</h5>
                </div>
                <div className="contentBoxBody mt-20"></div>
                <Row>
                    <Col md={4} className="mb-10">
                        <InputField
                            label="জেলা"
                            name="permanentDistrict"
                            type="text"
                            //placeholder="Enter District"
                            disabled={true}
                        />
                    </Col>

                    <Col md={4} className="mb-10">
                        <InputField
                            label="উপজেলা"
                            name="permanentThana"
                            type="text"
                            //placeholder="Enter Thana"
                            disabled={true}
                        />
                    </Col>

                    <Col md={4} className="mb-10">
                        <InputField
                            label="পোস্ট কোড"
                            name="permanentPostCode"
                            type="text"
                            //placeholder="Enter Post Code"
                            disabled={true}
                        />
                    </Col>
                </Row>
            </div>

            {/* <div className="contentBoxBody mt-20"></div>
            <div className="contentBox-modified">
                <div className="contentBoxBody mt-20"></div>
                <Row>
                    <Col lg={4} md={12} className="mb-30">
                        <label className="form-label">
                            আবেদনকারীর ছবি
                            <abbr style={{ color: "red" }} className="req">
                                *
                            </abbr>
                            <span className="text-primary">
                                Allowed format jpg, jpeg, png and max file size
                                300 kb
                            </span>
                        </label>
                        <input
                            name="photo"
                            className={`form-control ${
                                props.touched.photo && props.errors.photo
                                    ? "is-invalid"
                                    : ""
                            }`}
                            type="file"
                            onInput={(event) => {
                                if (
                                    event.currentTarget.files[0] !== undefined
                                ) {
                                    setFieldValue(
                                        "photo",
                                        event?.currentTarget?.files[0]
                                    );
                                } else {
                                    setFieldValue("photo", "");
                                }

                                handlePhotoChange(event);
                            }}
                        />
                        {props.errors.photo && (
                            <div id="feedback" className="invalid-feedback">
                                {props.errors.photo}
                            </div>
                        )}
                    </Col>

                    <Col md={2} className="mb-20">
                        {imgState?.path && (
                            <div className="donor-image">
                                <img
                                    className="img-fluid rounded-circle "
                                    src={imgState?.path}
                                    id="preview-image"
                                    alt=""
                                    style={{ height: "90px", width: "80px" }}
                                />
                            </div>
                        )}
                    </Col>
                    <Col md={2} className="mb-20">
                        {values?.photo && (
                            <div className="donor-image">
                                <img
                                    className="img-fluid rounded-circle "
                                    src={UrlBuilder.fileServerApi(
                                        `${values?.photo}`
                                    )}
                                    id="preview-image"
                                    alt=""
                                    style={{ height: "90px", width: "80px" }}
                                />
                            </div>
                        )}
                    </Col>

                    <Col lg={4} md={12} className="mb-30">
                        <label className="form-label">
                            আবেদনকারীর স্বাক্ষর
                            <abbr style={{ color: "red" }} className="req">
                                *
                            </abbr>
                            <span className="text-primary">
                                Allowed format jpg, jpeg, png and max file size
                                180 kb
                            </span>
                        </label>
                        <input
                            name="eSign"
                            className={`form-control ${
                                props.touched.eSign && props.errors.eSign
                                    ? "is-invalid"
                                    : ""
                            }`}
                            type="file"
                            onInput={(event) => {
                                if (
                                    event.currentTarget.files[0] !== undefined
                                ) {
                                    setFieldValue(
                                        "eSign",
                                        event?.currentTarget?.files[0]
                                    );
                                } else {
                                    setFieldValue("eSign", "");
                                }

                                handleSignChange(event);
                            }}
                        />
                        {props.errors.eSign && (
                            <div id="feedback" className="invalid-feedback">
                                {props.errors.eSign}
                            </div>
                        )}
                    </Col>

                    <Col md={2} className="mb-20">
                        {signState?.path && (
                            <div className="donor-image">
                                <img
                                    className="img-fluid rounded-circle "
                                    src={signState?.path}
                                    id="preview-image"
                                    alt=""
                                    style={{ height: "90px", width: "80px" }}
                                />
                            </div>
                        )}
                    </Col>
                </Row>
            </div> */}

            <Col md={12} className="mb-10 mt-10">
                <Button
                    variant=""
                    className="f-right btn-primary"
                    type="submit"
                >
                    <FontAwesomeIcon icon={faSave} className="me-2" /> পরবর্তী
                </Button>
                {/* <Button
                        variant="white"
                        className="f-right mr-10"
                        type="reset"
                    >
                        <FontAwesomeIcon icon={faUndo} className="me-2" /> Reset
                    </Button>
                    <Link to="/portal/choice/list">
                        <Button
                            variant="white"
                            className="f-right mr-10"
                            type="cancle"
                        >
                            <FontAwesomeIcon icon={faTimes} className="me-2" />{" "}
                            Cancel
                        </Button>
                    </Link> */}
            </Col>
        </Form>
    );
};

export default ApplicationApplyForm;
