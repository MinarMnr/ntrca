import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Row, Card } from "@themesberg/react-bootstrap";
import { Formik, Form } from "formik/dist/index";
import { Link } from "react-router-dom";
import {
    InputField,
    InputSelect,
    InputTextArea,
} from "../../../components/form";
import {
    faSave,
    faTimes,
    faUndo,
    faPlusSquare,
    faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import Checkbox from "../../../components/form/Checkbox";
import { FieldArray, Field } from "formik/dist/index";
import InputSelectApi from "components/form/InputSelectApi";
import ErrorMessage from "../../../components/text/ErrorMessage";
import { Step, Stepper } from "react-form-stepper";
import { DefaultCard } from "components/card";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UrlBuilder } from "helpers/UrlBuilder";
import InputDatePicker from "components/form/InputDatePicker";
import InputFieldNumber from "components/form/InputFieldNumber";
import swal from "sweetalert";

const JobApplyFormTest = ({
    values,
    formType,
    setFieldValue,
    errors,
    ...props
}) => {
    console.log(errors, "forms");

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

    const postType = [
        {
            id: "MPO",
            name: "MPO",
        },
        {
            id: "NON_MPO",
            name: "NON_MPO",
        },
    ];

    const numberCount = [
        {
            id: 1,
            name: 1,
        },
        // {
        //     id: 2,
        //     name: 2,
        // },
        // {
        //     id: 3,
        //     name: 3,
        // },
        // {
        //     id: 4,
        //     name: 4,
        // },
        // {
        //     id: 5,
        //     name: 5,
        // },
        // {
        //     id: 6,
        //     name: 6,
        // },
        // {
        //     id: 7,
        //     name: 7,
        // },
        // {
        //     id: 8,
        //     name: 8,
        // },
        // {
        //     id: 9,
        //     name: 9,
        // },
        // {
        //     id: 10,
        //     name: 10,
        // },
    ];

    const quotaId = [
        {
            id: 1,
            name: "সাধারণ",
        },
        {
            id: 2,
            name: "মহিলা কোটা",
        },
        // {
        //     id: 3,
        //     name: "প্রতিবন্ধী কোটা",
        // },
        // {
        //     id: 4,
        //     name: "জেলা কোটা",
        // },
        
    ];

    useEffect(() => {
        props?.circularId &&
            setFieldValue("jobRequisitionCircularId", props?.circularId);
    }, [props?.circularId]);

    return (
        <Form>
            <div className="row">
                <div class="contentBox-modified">
                    <div class="section-header-custom">
                        <h5 class="m-10 text-white">ই-রিকুইজিশন বিস্তারিত</h5>
                    </div>
                    <div className="contentBoxBody mt-20"></div>
                    <div className="contentBoxBody">
                        <div className="row">
                            <Col md={3} className="mb-10">
                                <InputField
                                    label="সরকার কর্তৃক মোট অনুমোদিত পদের সংখ্যা"
                                    name="approvedPost"
                                    type="number"
                                    defaultValue="19"
                                    disabled
                                />
                                <ErrorMessage fieldName="approvedPost" />
                            </Col>
                            <Col md={3} className="mb-10">
                                <InputField
                                    label="কর্মরত এমপিও পুরুষ শিক্ষকের সংখ্যা"
                                    name="noOfmale"
                                    type="number"
                                    defaultValue="08"
                                    disabled
                                />
                                <ErrorMessage fieldName="noOfmale" />
                            </Col>
                            <Col md={3} className="mb-10">
                                <InputField
                                    label="কর্মরত এমপিও মহিলা শিক্ষকের সংখ্যা"
                                    name="noOfFemale"
                                    type="number"
                                    defaultValue="07"
                                    disabled
                                />
                                <ErrorMessage fieldName="noOfFemale" />
                            </Col>
                            <Col md={3} className="mb-10">
                                <InputField
                                    label="মোট এমপিও শূন্য পদের সংখ্যা"
                                    name="noVcantPosts"
                                    type="number"
                                    defaultValue="04"
                                    disabled
                                />
                                <ErrorMessage fieldName="noVcantPosts" />
                            </Col>

                            <Col md={4} className="mb-10">
                                <InputField
                                    label="GB/SMC/MMC স্মারক নং"
                                    name="memorandumNo"
                                    type="text"
                                    placeholder="GB/SMC/MMC স্মারক নং"
                                    required={true}
                                />
                                <ErrorMessage fieldName="memorandumNo" />
                            </Col>

                            <Col md={4} className="mb-10">
                                <label>
                                    মিটিং তারিখ
                                    <abbr
                                        style={{ color: "red" }}
                                        className="mt-10"
                                    >
                                        *
                                    </abbr>
                                </label>

                                <InputDatePicker
                                    className="mt-10"
                                    name="dateOfRequisition"
                                    setField={setFieldValue}
                                    dataValue={values?.dateOfRequisition}
                                />
                            </Col>

                            <Col md={4} className="mb-10">
                                <label>
                                    কার্য বিবরণী{" "}
                                    <span className="text-danger">*</span>
                                </label>
                                {formType === "edit" &&
                                    values &&
                                    values.encloserUrl && (
                                        <a
                                            href={UrlBuilder.fileServerApi(
                                                `${
                                                    values && values.encloserUrl
                                                }`
                                            )}
                                            target="_blank"
                                            style={{ color: "green" }}
                                        >
                                            <b>VIEW PDF</b>
                                        </a>
                                    )}

                                <span className="text-primary">
                                    {" "}
                                    Allowed format pdf only and max file size
                                    10mb
                                </span>
                                <input
                                    label="রেজোলিউশন ফাইল"
                                    required={
                                        values?.encloserUrl ? false : true
                                    }
                                    name="file"
                                    type={fileSource}
                                    className="form-control mt-5"
                                    defaultValue={
                                        hasFile
                                            ? values && values?.encloserUrl
                                            : "Click here to upload file"
                                    }
                                    onChange={(event) => {
                                        setFieldValue(
                                            "file",
                                            event.currentTarget.files[0]
                                        );
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
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div class="contentBox-modified">
                    <div class="section-header-custom">
                        <h5 class="m-10 text-white">শূন্য পদে আবেদন</h5>
                    </div>
                    <div className="contentBoxBody mt-20"></div>

                    <div className="contentBoxBody">
                        <FieldArray
                            name="instituteJobRequisitionDetailList"
                            render={(arrayHelpers) => (
                                <>
                                    <div className="contentBoxBody">
                                        <table className="table table-responsive table-striped text-center">
                                            <thead>
                                                <tr className="custom-table-header text-center">
                                                    <th>ক্রমিক নং</th>
                                                    <th>পদবি</th>
                                                    <th>বিষয়</th>
                                                    <th>প্রার্থীর ধরন</th>
                                                    <th>পদের ধরন</th>
                                                    <th>শূন্য পদের সংখ্যা</th>
                                                    <th>আবেদিত পদের সংখ্যা</th>
                                                    <th>অবস্থা</th>
                                                    <th>অ্যাকশন</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {values?.instituteJobRequisitionDetailList?.map(
                                                    (item, index) => (
                                                        <>
                                                            <tr>
                                                                <td>
                                                                    {index + 1}
                                                                </td>
                                                                <td>
                                                                    <InputSelectApi
                                                                        name={`instituteJobRequisitionDetailList[${index}].designationId`}
                                                                        operationId={UrlBuilder.ntrcaApi(
                                                                            "designation/all"
                                                                        )}
                                                                        storeName="designation"
                                                                        value="id"
                                                                        text="designationNameBn"
                                                                        required={
                                                                            true
                                                                        }
                                                                        onChange={(
                                                                            e
                                                                        ) =>
                                                                            setFieldValue(
                                                                                `instituteJobRequisitionDetailList[${index}].designationId`,
                                                                                e
                                                                                    .target
                                                                                    .value
                                                                            )
                                                                        }
                                                                    />
                                                                </td>
                                                                <td>
                                                                    <InputSelectApi
                                                                        name={`instituteJobRequisitionDetailList[${index}].subjectId`}
                                                                        operationId={UrlBuilder.ntrcaApi(
                                                                            "subject/all"
                                                                        )}
                                                                        storeName="subject"
                                                                        value="id"
                                                                        text="subjectNameBn"
                                                                        required={
                                                                            true
                                                                        }
                                                                        onChange={(
                                                                            e
                                                                        ) =>
                                                                            setFieldValue(
                                                                                `instituteJobRequisitionDetailList[${index}].subjectId`,
                                                                                e
                                                                                    .target
                                                                                    .value
                                                                            )
                                                                        }
                                                                    />
                                                                </td>
                                                                {/* <td>
                                                                    <InputSelectApi
                                                                        name={`instituteJobRequisitionDetailList[${index}].quotaId`}
                                                                        operationId={UrlBuilder.ntrcaApi(
                                                                            "quota/all"
                                                                        )}
                                                                        storeName="quota"
                                                                        value="id"
                                                                        text="quotaNameBn"
                                                                        required={
                                                                            true
                                                                        }
                                                                        onChange={(
                                                                            e
                                                                        ) =>
                                                                            setFieldValue(
                                                                                `instituteJobRequisitionDetailList[${index}].quotaId`,
                                                                                e
                                                                                    .target
                                                                                    .value
                                                                            )
                                                                        }
                                                                    />
                                                                </td> */}
                                                                <td>
                                                                    <InputSelect
                                                                        name={`instituteJobRequisitionDetailList[${index}].quotaId`}
                                                                        // operationId={UrlBuilder.ntrcaApi(
                                                                        //     "quota/all"
                                                                        // )}
                                                                        type="number"
                                                                        data={
                                                                            quotaId
                                                                        }
                                                                        storeName="quota"
                                                                        value="id"
                                                                        text="name"
                                                                        required={
                                                                            true
                                                                        }
                                                                        // onChange={(
                                                                        //     e
                                                                        // ) =>
                                                                        //     setFieldValue(
                                                                        //         `instituteJobRequisitionDetailList[${index}].quotaId`,
                                                                        //         e
                                                                        //             .target
                                                                        //             .value
                                                                        //     )
                                                                        // }
                                                                    />
                                                                </td>
                                                                <td>
                                                                    <InputSelect
                                                                        name={`instituteJobRequisitionDetailList.${index}.jobType`}
                                                                        type="text"
                                                                        value="id"
                                                                        data={
                                                                            postType
                                                                        }
                                                                        text="name"
                                                                        required={
                                                                            true
                                                                        }
                                                                    />
                                                                </td>
                                                                <td>
                                                                    <InputFieldNumber
                                                                        name={`instituteJobRequisitionDetailList[${index}].numberOfVacantSeat`}
                                                                        type={`instituteJobRequisitionDetailList[${index}].numberOfVacantSeat`}
                                                                        value="5"
                                                                        required={
                                                                            true
                                                                        }
                                                                        style={{
                                                                            backgroundColor:
                                                                                "lightgray",
                                                                        }}
                                                                    />
                                                                </td>

                                                                <td>
                                                                    <InputSelect
                                                                        name={`instituteJobRequisitionDetailList[${index}].numberOfRequestedSeat`}
                                                                        type="number"
                                                                        value="id"
                                                                        data={
                                                                            numberCount
                                                                        }
                                                                        text="name"
                                                                        required={
                                                                            true
                                                                        }
                                                                    />
                                                                </td>

                                                                {/* <td>
                                                                <InputFieldNumber
                                                                    name={`instituteJobRequisitionDetailList[${index}].numberOfRequestedSeat`}
                                                                    type="number"
                                                                    value={`instituteJobRequisitionDetailList[${index}].numberOfRequestedSeat`}
                                                                    required={
                                                                        true
                                                                    }
                                                                    style={{backgroundColor: "white"}}
                                                                />
                                                            </td> */}

                                                                <td>
                                                                    <InputField
                                                                        name={`instituteJobRequisitionDetailList[${index}].info`}
                                                                        type={`instituteJobRequisitionDetailList[${index}].info`}
                                                                        value=""
                                                                        required={
                                                                            true
                                                                        }
                                                                        style={{
                                                                            backgroundColor:
                                                                                index ===
                                                                                0
                                                                                    ? "red"
                                                                                    : index ===
                                                                                      1
                                                                                    ? "green"
                                                                                    : index ===
                                                                                      2
                                                                                    ? "green"
                                                                                    : "lightgray",
                                                                            textAlign:
                                                                                "center",
                                                                            color: "white",
                                                                        }}
                                                                    />
                                                                </td>

                                                                <td>
                                                                    <div
                                                                        style={{
                                                                            display:
                                                                                "flex",
                                                                            width: "100%",
                                                                            justifyContent:
                                                                                "center",
                                                                        }}
                                                                    >
                                                                        {index +
                                                                            1 ===
                                                                            values
                                                                                ?.instituteJobRequisitionDetailList
                                                                                ?.length && (
                                                                            <span
                                                                                variant="success"
                                                                                className="me-1 i-size"
                                                                                type="button"
                                                                                onClick={() => {
                                                                                    arrayHelpers.push(
                                                                                        {
                                                                                            designationId:
                                                                                                "",
                                                                                            subjectId:
                                                                                                "",
                                                                                            quotaId:
                                                                                                "",
                                                                                            jobType:
                                                                                                "",
                                                                                            numberOfVacantSeat:
                                                                                                "",
                                                                                            numberOfRequestedSeat:
                                                                                                "",
                                                                                        }
                                                                                    );
                                                                                }}
                                                                            >
                                                                                <>
                                                                                    <Button variant="success">
                                                                                        <FontAwesomeIcon
                                                                                            icon={
                                                                                                faPlusSquare
                                                                                            }
                                                                                            className="text-white pr-2"
                                                                                            title="Add New Row"
                                                                                        />
                                                                                    </Button>
                                                                                </>
                                                                            </span>
                                                                        )}
                                                                        {values
                                                                            ?.instituteJobRequisitionDetailList
                                                                            ?.length >
                                                                            1 && (
                                                                            <span
                                                                                variant="success"
                                                                                className="i-size"
                                                                                type="button"
                                                                                onClick={() => {
                                                                                    swal(
                                                                                        {
                                                                                            title: "Are you sure you want to delete?",
                                                                                            icon: "warning",
                                                                                            buttons: true,
                                                                                            dangerMode: true,
                                                                                        }
                                                                                    ).then(
                                                                                        (
                                                                                            willDelete
                                                                                        ) => {
                                                                                            willDelete &&
                                                                                                arrayHelpers.remove(
                                                                                                    index
                                                                                                );
                                                                                        }
                                                                                    );
                                                                                }}
                                                                            >
                                                                                <>
                                                                                    <Button variant="danger">
                                                                                        <FontAwesomeIcon
                                                                                            icon={
                                                                                                faTrashAlt
                                                                                            }
                                                                                            className="text-white pr-2"
                                                                                            title="Delete Row"
                                                                                        />
                                                                                    </Button>
                                                                                </>
                                                                            </span>
                                                                        )}
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </>
                                                    )
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </>
                            )}
                        />
                    </div>
                </div>
            </div>
            <Col md={12} className="mb-10 mt-10">
                <Button
                    variant=""
                    className="f-right btn-color btn-primary"
                    type="submit"
                >
                    <FontAwesomeIcon icon={faSave} className="me-2" /> সাবমিট
                    করুন
                </Button>
                <Button variant="white" className="f-right mr-10" type="reset">
                    <FontAwesomeIcon icon={faUndo} className="me-2" /> রিসেট
                </Button>
                <Link to="/portal/job-requisition-list">
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
        </Form>
    );
};

export default JobApplyFormTest;
