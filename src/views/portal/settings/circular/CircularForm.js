import React from "react";
import { useState, useEffect } from "react";
import {
    faSave,
    faTimes,
    faUndo,
    faPlusSquare,
    faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, Col, Row } from "@themesberg/react-bootstrap";
import { Form } from "formik/dist/index";
import { Link } from "react-router-dom";
import {
    InputField,
    InputSelect,
    InputTextArea,
} from "../../../../components/form";
import { FieldArray, Field } from "formik/dist/index";
import InputSelectApi from "components/form/InputSelectApi";
// import { InputField, InputSelect } from "../../../../components/form";
import ErrorMessage from "../../../../components/text/ErrorMessage";
import InputDatePicker from "components/form/InputDatePicker";
import { UrlBuilder } from "helpers/UrlBuilder";
import { useDispatch, useSelector } from "react-redux";
import { callApi, selectApi } from "reducers/apiSlice";
import FindComboBox from "components/material/FindComponent";

const CircularForm = ({ values, formType, errors, setFieldValue }) => {
    const dispatch = useDispatch();
    const {
        loading,
        requisitionSeatDetails = {
            data: {},
        },
    } = useSelector(selectApi);

    useEffect(() => {
        dispatch(
            callApi({
                operationId: UrlBuilder.ntrcaApi(
                    `job-application-circular/total-requested-seats?requisitionCircularId=${
                        values?.requisitionCircularId
                            ? values?.requisitionCircularId
                            : 0
                    }`
                ),
                output: "requisitionSeatDetails",
            })
        );
    }, [dispatch, values?.requisitionCircularId]);

    const [fileSource, setFileSource] = useState(
        formType === "edit" ? "file" : "file"
    );

    // const [hasFile, sethasFile] = useState(true);

    // useEffect(() => {
    //     if (values?.encloserList?.length > 0) {
    //         sethasFile(true);
    //     } else {
    //         sethasFile(false);
    //     }
    // }, [values?.encloserList]);

    return (
        <Form>
            <Row>
                <Col xl={3} lg={4} md={6} sm={6} className="mb-10">
                    <InputField
                        label="বিজ্ঞপ্তির নাম"
                        name="circularTitle"
                        required={true}
                        type="text"
                        placeholder="বিজ্ঞপ্তির নাম লিখুন"
                    />
                    <ErrorMessage fieldName="circularTitle" />
                </Col>
                <Col xl={3} lg={4} md={6} sm={6} className="mb-10">
                    <label>
                        প্রকাশের তারিখ
                        <abbr style={{ color: "red" }} class="req">
                            *
                        </abbr>
                    </label>
                    <InputDatePicker
                        showTime={true}
                        name="circularPublishDate"
                        setField={setFieldValue}
                        dataValue={values?.circularPublishDate}
                    />
                </Col>
                <Col xl={3} lg={4} md={6} sm={6} className="mb-10">
                    <label>
                        কার্যকর তারিখ
                        <abbr style={{ color: "red" }} class="req">
                            *
                        </abbr>
                    </label>
                    <InputDatePicker
                        showTime={true}
                        name="circularEffectiveDate"
                        setField={setFieldValue}
                        dataValue={values?.circularEffectiveDate}
                    />
                </Col>
                <Col xl={3} lg={4} md={6} sm={6} className="mb-10">
                    <label>
                        মেয়াদ শেষ হওয়ার তারিখ
                        <abbr style={{ color: "red" }} class="req">
                            *
                        </abbr>
                    </label>
                    <InputDatePicker
                        showTime={true}
                        name="circularExpiryDate"
                        setField={setFieldValue}
                        dataValue={values?.circularExpiryDate}
                    />
                </Col>
                <Col xl={3} lg={4} md={6} sm={6} className="mb-10">
                    <InputField
                        label="আবেদনের সর্বোচ্চ বয়সসীমা"
                        name="ageLimitTo"
                        required={true}
                        type="number"
                        placeholder="সর্বোচ্চ বয়সসীমা"
                    />
                    <ErrorMessage fieldName="ageLimitTo" />
                </Col>
                <Col xl={3} lg={4} md={6} sm={6} className="mb-10">
                    <label>
                        আবেদনকারীর সর্বোচ্চ বয়সসীমা প্রদানের প্রযোজ্য তারিখ
                        <abbr style={{ color: "red" }} class="req">
                            *
                        </abbr>
                    </label>
                    <InputDatePicker
                        showTime={true}
                        name="ageLimitAsOfDate"
                        setField={setFieldValue}
                        dataValue={values?.ageLimitAsOfDate}
                    />
                </Col>

                <Col xl={3} lg={4} md={6} sm={6} className="mb-10">
                    <InputField
                        label="আবেদন ফি (টাকায়)"
                        name="applicationFee"
                        required={true}
                        type="number"
                        placeholder=" আবেদন ফি"
                    />
                    <ErrorMessage fieldName="applicationFee" />
                </Col>
                {/* <Col xl={3} lg={4} md={6} sm={6} className="mb-10">
                    <InputField
                        label="আবেদন পরবর্তী ফী জমা দেয়ার সময়সীমা(ঘন্টায়)"
                        name="applicationFeePaymentValidityHour"
                        required={true}
                        type="number"
                        placeholder=" ফি জমা দেওয়ার সময়সীমা"
                    />
                    <ErrorMessage fieldName="applicationFeePaymentValidityHour" />
                </Col> */}
                <Col xl={3} lg={4} md={6} sm={6} className="mb-10">
                    <InputField
                        label=" শিক্ষা প্রতিষ্ঠান Choice(পছন্দের) সর্বোচ্চ সংখ্যা"
                        name="maxInstituteToChoose"
                        type="number"
                        required={true}
                        placeholder=" সর্বোচ্চ শিক্ষা প্রতিষ্ঠান পছন্দের সংখ্যা"
                    />
                    <ErrorMessage fieldName="maxInstituteToChoose" />
                </Col>
                <Col xl={3} lg={4} md={6} sm={6} className="mb-10">
                    <InputSelectApi
                        label="বিজ্ঞপ্তির নিয়মাবলী"
                        name="jobApplicationRuleId"
                        required={true}
                        operationId={UrlBuilder.ntrcaApi(
                            "job-application-rule/all"
                        )}
                        storeName="job-application-rule"
                        type="number"
                        value="id"
                        text="ruleNameBn"
                    />
                </Col>
                <Col xl={3} lg={4} md={6} sm={6} className="mb-10">
                    <InputSelectApi
                        label="ই-রিকুইজিশন বিজ্ঞপ্তি "
                        name="requisitionCircularId"
                        // required={true}
                        operationId={UrlBuilder.ntrcaApi(
                            "institute-job-requisition-circular/all"
                        )}
                        storeName="institute-job-requisition-circular Name"
                        type="text"
                        value="id"
                        text="title"
                        required={true}
                        // onChange={(e) =>
                        //     setFieldValue(
                        //         "title",
                        //         e.target.value
                        //     )
                        // }
                    />
                    <ErrorMessage fieldName="requisitionCircularId" />
                </Col>
                {/* <Col xl={3} lg={4} md={6} sm={6} className="mb-10">
                    <InputSelectApi
                        label="নীতিমালা"
                        name="govtRegulationId"
                        operationId={UrlBuilder.ntrcaApi(`govt-regulation/all`)}
                        storeName="regulations"
                        value="id"
                        text="govtRegulationNameBn"
                        type="number"
                        required={true}
                    />
                    <ErrorMessage fieldName="govtRegulationId" />
                </Col> */}
                <Col xl={3} lg={4} md={6} sm={6} className="mb-10">
                    <label class="form-label">
                        নীতিমালা
                        <abbr style={{ color: "red" }} class="req">
                            *
                        </abbr>
                    </label>
                    <FindComboBox
                        title="govtRegulationNameBn"
                        name="govtRegulationId"
                        setField={setFieldValue}
                        storeName="govtRegulationId"
                        isMultiple={true}
                        formType={formType}
                        operationId={UrlBuilder.ntrcaApi(`govt-regulation/all`)}
                        allValue={values}
                        placeHolder="নীতিমালা"
                        selectType="object"
                    ></FindComboBox>

                    <ErrorMessage name="instituteId">
                        {() => <div style={{ color: "red" }}>Required</div>}
                    </ErrorMessage>
                </Col>

                <Col md="12">
                    <div className="container-fluid mb-10 mt-10">
                        <div
                            className="input-group form-control bg-number-label"
                            style={{ textAlign: "center" }}
                        >
                            শূন্য পদের সংখ্যা
                        </div>

                        <div className="table-responsive">
                            <div className="col-md-12">
                                <table
                                    className="user-table align-items-c table table-striped table-hover w-100"
                                    style={{
                                        margin: "auto",
                                        textAlign: "center",
                                    }}
                                >
                                    <thead>
                                        <tr>
                                            <th style={{ textAlign: "center" }}>
                                                শিক্ষা প্রতিষ্ঠানের ধরন
                                            </th>
                                            <th style={{ textAlign: "center" }}>
                                                পদের ধরন
                                            </th>
                                            <th style={{ textAlign: "center" }}>
                                                সংখ্যা
                                            </th>
                                            <th style={{ textAlign: "center" }}>
                                                মোট
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {requisitionSeatDetails?.data?.length >
                                        0 ? (
                                            requisitionSeatDetails.data.map(
                                                (item) => (
                                                    <>
                                                        <tr
                                                            key={
                                                                item.instituteTypeId
                                                            }
                                                        >
                                                            <td
                                                                rowSpan="2"
                                                                style={{
                                                                    verticalAlign:
                                                                        "middle",
                                                                }}
                                                            >
                                                                {
                                                                    item.instituteTypeNameBn
                                                                }
                                                            </td>
                                                            <td
                                                                style={{
                                                                    verticalAlign:
                                                                        "middle",
                                                                }}
                                                            >
                                                                এমপিও
                                                            </td>
                                                            <td
                                                                style={{
                                                                    verticalAlign:
                                                                        "middle",
                                                                }}
                                                            >
                                                                {
                                                                    item.totalNumberOfRequestedSeatsForMpo
                                                                }
                                                            </td>
                                                            <td
                                                                rowSpan="2"
                                                                style={{
                                                                    verticalAlign:
                                                                        "middle",
                                                                }}
                                                            >
                                                                {item.totalNumberOfRequestedSeatsForMpo +
                                                                    item.totalNumberOfRequestedSeatsForNonMpo}
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td
                                                                style={{
                                                                    verticalAlign:
                                                                        "middle",
                                                                }}
                                                            >
                                                                নন-এমপিও
                                                            </td>
                                                            <td
                                                                style={{
                                                                    verticalAlign:
                                                                        "middle",
                                                                }}
                                                            >
                                                                {
                                                                    item.totalNumberOfRequestedSeatsForNonMpo
                                                                }
                                                            </td>
                                                        </tr>
                                                    </>
                                                )
                                            )
                                        ) : (
                                            <tr>
                                                <td
                                                    colSpan="4"
                                                    style={{
                                                        textAlign: "center",
                                                    }}
                                                >
                                                    <b>তথ্য পাওয়া যায়নি</b>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </Col>

                <Col md={6} className="mb-10">
                    <InputTextArea
                        label="সার্কুলার বডি"
                        name="circularBody"
                        type="text"
                        required="true"
                    />
                </Col>

                <Col md={4} className="mb-10">
                    <div className="form-group" style={{ width: "100%" }}>
                        <label className="d-block">
                            ফাইল আপলোড{"  "}
                            {formType === "edit" &&
                                values &&
                                values.encloserList &&
                                values.encloserList?.length > 0 && (
                                    <a
                                        href={UrlBuilder.fileServerApi(
                                            `${
                                                values &&
                                                values.encloserList &&
                                                values.encloserList?.length >
                                                    0 &&
                                                values.encloserList[0]
                                                    .encloserUrl
                                            }`
                                        )}
                                        target="_blank"
                                        style={{ color: "red" }}
                                    >
                                        VIEW PDF
                                    </a>
                                )}
                        </label>

                        <input
                            id="attachment"
                            name="files"
                            type={fileSource}
                            className="form-control mt-5"
                            //required
                            // defaultValue={
                            //     hasFile
                            //         ? values &&
                            //           values.encloserList &&
                            //           values.encloserList?.length > 0 &&
                            //           values?.encloserList[0]?.encloserUrl
                            //         : "Click here to upload file"
                            // }
                            onChange={(event) => {
                                setFieldValue(
                                    "files[0]",
                                    event.currentTarget.files[0]
                                );
                            }}
                            onClick={() => {
                                setFileSource("file");
                            }}
                        />
                        {errors.files && (
                            <div id="feedback" className="text-danger">
                                {errors.files}
                            </div>
                        )}
                    </div>
                </Col>

                <Col md={12} className="mb-10 mt-10">
                    <Button
                        variant=""
                        className="f-right btn-color btn-primary"
                        type="submit"
                    >
                        <FontAwesomeIcon icon={faSave} className="me-2" />{" "}
                        {/* {formType === "file" ? "সাবমিট করুন" : "ইডিট করুন"}
                         */}
                        সাবমিট করুন
                    </Button>
                    <Button
                        variant="white"
                        className="f-right mr-10"
                        type="reset"
                    >
                        <FontAwesomeIcon icon={faUndo} className="me-2" /> রিসেট
                    </Button>
                    <Link to="/portal/circular/list">
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
        </Form>
    );
};

export default CircularForm;
