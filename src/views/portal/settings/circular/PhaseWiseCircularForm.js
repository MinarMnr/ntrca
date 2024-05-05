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
import { Link, useHistory } from "react-router-dom";
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

const PhaseWiseCircularForm = ({ values, formType, setFieldValue, errors }) => {
    const dispatch = useDispatch();

    let history = useHistory();
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
                    `phase-wise-job-application-circular/total-requested-seats?jobApplicationCircularId=${
                        values?.jobApplicationCircularId
                            ? values?.jobApplicationCircularId
                            : 0
                    }`
                ),
                output: "requisitionSeatDetails",
            })
        );
    }, [dispatch, values?.jobApplicationCircularId]);

    const [fileSource, setFileSource] = useState(
        formType === "edit" ? "text" : "file"
    );

    const [hasFile, sethasFile] = useState(true);

    useEffect(() => {
        if (values?.encloserUrl) {
            sethasFile(true);
        } else {
            sethasFile(false);
        }
    }, [values]);

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

                <Col md={3} className="mb-10">
                    <InputSelectApi
                        label="গণ বিজ্ঞপ্তির তালিকা"
                        name="jobApplicationCircularId"
                        operationId={UrlBuilder.ntrcaApi(
                            "job-application-circular/all"
                        )}
                        storeName="institute-job-requisition-circular Name"
                        type="text"
                        value="id"
                        text="circularTitle"
                        required={true}
                    />
                    <ErrorMessage fieldName="jobApplicationCircularId" />
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

                <Col md={4} className="mb-10">
                    <label>
                        ফাইল আপলোড <span className="text-danger">*</span>
                    </label>
                    {formType === "edit" && values && values.encloserUrl && (
                        <a
                            href={UrlBuilder.fileServerApi(
                                `${values && values.encloserUrl}`
                            )}
                            target="_blank"
                            style={{ color: "green" }}
                        >
                            <b>VIEW PDF</b>
                        </a>
                    )}

                    <span className="text-primary">
                        {" "}
                        Allowed format pdf only and max file size 10mb
                    </span>
                    <input
                        label="রেজোলিউশন ফাইল"
                        required={values?.encloserUrl ? false : true}
                        name="file"
                        type={fileSource}
                        className="form-control mt-5"
                        defaultValue={
                            hasFile
                                ? values && values?.encloserUrl
                                : "Click here to upload file"
                        }
                        onChange={(event) => {
                            setFieldValue("file", event.currentTarget.files[0]);
                        }}
                        onClick={() => {
                            setFileSource("file");
                        }}
                    />

                    {errors.file && (
                        <div id="feedback" className="text-danger">
                            {errors.file}
                        </div>
                    )}
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

                    <Button
                        variant="white"
                        className="f-right mr-10"
                        type="cancle"
                        onClick={() => {
                            history.goBack();
                        }}
                    >
                        <FontAwesomeIcon icon={faTimes} className="me-2" />{" "}
                        বাতিল করুন
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};

export default PhaseWiseCircularForm;
