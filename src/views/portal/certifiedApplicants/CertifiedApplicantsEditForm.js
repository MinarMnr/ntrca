import React, { useEffect, useRef, useState } from "react";
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
import {
    InputField,
    InputSelect,
    InputTextArea,
} from "../../../components/form";
import { FieldArray, Field } from "formik/dist/index";
import InputSelectApi from "components/form/InputSelectApi";
// import { InputField, InputSelect } from "../../../components/form";
import ErrorMessage from "../../../components/text/ErrorMessage";
import { UrlBuilder } from "helpers/UrlBuilder";
import InputDatePicker from "components/form/InputDatePicker";
import FindComboBox from "components/material/FindComponent";
import { useDispatch, useSelector } from "react-redux";
import { callApi, selectApi } from "reducers/apiSlice";
import DepartmentType from "constants/DepartmentType";
import EnglishNumberToBangla from "helpers/EnglishNumberToBangla";

const CertifiedApplicantsEditForm = ({
    values,
    formType,
    errors,
    setFieldValue,
}) => {
    const dispatch = useDispatch();
    const {
        examList = {
            data: {},
        },
    } = useSelector(selectApi);

    const religion = [
        {
            id: "ISLAM",
            name: "ইসলাম",
        },
        {
            id: "HINDUISM",
            name: "হিন্দু",
        },
        {
            id: "BUDDHISM",
            name: "বৌদ্ধ",
        },
        {
            id: "CHRISTIANITY",
            name: "খ্রিষ্টান",
        },
        {
            id: "OTHER",
            name: "অন্যান্য",
        },
    ];

    const gender = [
        {
            id: "MALE",
            name: "পুরুষ",
        },
        {
            id: "FEMALE",
            name: "মহিলা",
        },
        {
            id: "TRANS_GENDER",
            name: "অন্যান্য",
        },
    ];

    const scoringMethodName = [
        {
            id: "GPA-5",
            name: "CGPA/GPA-5",
        },
        {
            id: "GPA-4",
            name: "CGPA/GPA-4",
        },
        {
            id: "DIV",
            name: "DIV",
        },
    ];

    const divisionMethod = [
        {
            id: 1,
            name: "ফার্স্ট_ডিভিশন",
        },
        {
            id: 2,
            name: "সেকেন্ড_ডিভিশন",
        },
        {
            id: 3,
            name: "থার্ড_ডিভিশন",
        },
    ];

    const today = new Date();
    let year = today.getFullYear() - 60;
    let yearList = [];

    for (let i = year; i <= today.getFullYear(); i++) {
        let y = {
            id: year,
            name: EnglishNumberToBangla(year),
        };
        yearList.push(y);
        year++;
    }

    const durationList = [
        {
            id: 1,
            name: EnglishNumberToBangla(1),
        },
        {
            id: 2,
            name: EnglishNumberToBangla(2),
        },
        {
            id: 3,
            name: EnglishNumberToBangla(3),
        },
        {
            id: 4,
            name: EnglishNumberToBangla(4),
        },
        {
            id: 5,
            name: EnglishNumberToBangla(5),
        },
        {
            id: 6,
            name: EnglishNumberToBangla(6),
        },
        {
            id: 7,
            name: EnglishNumberToBangla(7),
        },
        {
            id: 8,
            name: EnglishNumberToBangla(8),
        },
    ];

    useEffect(() => {
        dispatch(
            callApi({
                operationId: UrlBuilder.ntrcaApi(`exam/all`),
                storeName: "examList",
                output: "examList",
            })
        );
    }, []);

    const educationQualification = [
        "এসএসসি সমমান", // SSC
        "এইচএসসি সমমান", // HSC
        "অনার্স সমমান", // Honors
        "মাস্টার্স সমমান", // Masters
        "অতিরিক্ত সমমান", // Extra
        "অতিরিক্ত ডিপ্লোমা", // Extra Diploma
    ];

    console.log(educationQualification[0]);

    return (
        <Form>
            <Row>
                <Col md={4} className="mb-10">
                    <InputField
                        label="আবেদনকারীর নাম"
                        name="applicantName"
                        type="text"
                        placeholder="আবেদনকারীর নাম"
                        required={true}
                    />
                    <ErrorMessage fieldName="applicantName" />
                </Col>
                <Col md={4} className="mb-10">
                    <InputField
                        label="রোল নম্বর"
                        name="rollNo"
                        type="text"
                        placeholder="রোল নম্বর"
                        required={true}
                    />
                    <ErrorMessage fieldName="rollNo" />
                </Col>
                <Col md={4} className="mb-10">
                    <InputField
                        label="নিবন্ধন নম্বর"
                        name="registrationNo"
                        type="text"
                        placeholder="নিবন্ধন নম্বর"
                        required={true}
                    />
                    <ErrorMessage fieldName="registrationNo" />
                </Col>
                <Col md={4} className="mb-10">
                    <InputField
                        label="বাবার নাম"
                        name="fatherName"
                        type="text"
                        placeholder="বাবার নাম"
                        required={true}
                    />
                    <ErrorMessage fieldName="fatherName" />
                </Col>
                <Col md={4} className="mb-10">
                    <InputField
                        label="মায়ের নাম"
                        name="motherName"
                        type="text"
                        placeholder="মায়ের নাম"
                        required={true}
                    />
                    <ErrorMessage fieldName="motherName" />
                </Col>
                <Col md={4} className="mb-10">
                    <InputField
                        label="এনআইডি"
                        name="nid"
                        type="text"
                        placeholder="এনআইডি"
                        required={true}
                    />
                    <ErrorMessage fieldName="nid" />
                </Col>
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
                            await setFieldValue("examBatchId", e.target.value);
                        }}
                    />
                </Col>
                <Col md={4} className="mb-10">
                    <InputSelectApi
                        label="পদবি"
                        name="designationCode"
                        required={true}
                        operationId={UrlBuilder.ntrcaApi("designation/all")}
                        storeName="designation"
                        type="text"
                        value="designationCode"
                        text="designationNameBn"
                        defaultValue={values?.designationCode}
                    />
                    <ErrorMessage fieldName="designationCode" />
                </Col>
                <Col md={4} className="mb-10">
                    <InputSelectApi
                        label="বিষয়ের নাম"
                        name="subjectCode"
                        operationId={UrlBuilder.ntrcaApi(`subject/all`)}
                        storeName="subject"
                        value="subjectCode"
                        text="subjectNameBn"
                        type="number"
                    />
                    <ErrorMessage fieldName="subjectCode" />
                </Col>
                <Col md={4} className="mb-10">
                    <InputSelect
                        label="জেন্ডার"
                        name="gender"
                        value="id"
                        type="text"
                        data={gender}
                        text="name"
                    />
                </Col>
                <Col md={4} className="mb-10">
                    <InputSelect
                        label="ধর্ম"
                        name="religion"
                        value="id"
                        type="text"
                        data={religion}
                        text="name"
                    />
                </Col>
                <Col md={4} className="mb-10">
                    <InputField
                        label="যোগাযোগের নম্বর"
                        name="mobileNo"
                        type="text"
                        placeholder="যোগাযোগের নম্বর"
                        //required={true}
                    />
                    <ErrorMessage fieldName="mobileNo" />
                </Col>
                <Col md={4} className="mb-10">
                    <InputDatePicker
                        // disabled={true}
                        label={"জন্ম তারিখ"}
                        name="dob"
                        setField={setFieldValue}
                        dataValue={values?.dob}
                    />

                    <ErrorMessage fieldName="dob" />
                </Col>

                <Col md={4} className="mb-10">
                    <InputSelectApi
                        label="বিভাগ"
                        name="divisionId"
                        operationId={UrlBuilder.commonApi("division/all")}
                        storeName="division"
                        value="id"
                        text="divisionName"
                        type="text"
                        // defaultSelect={true}
                        defaultValue={values?.divisionId ?? ""}
                    />
                </Col>
                <Col md={4} className="mb-10">
                    <InputSelectApi
                        label="জেলা"
                        name="districtId"
                        operationId={
                            values.divisionId
                                ? UrlBuilder.commonApi(
                                      `district/all?divisionId=${values.divisionId}`
                                  )
                                : ""
                        }
                        storeName="district"
                        value="id"
                        text="districtName"
                        // defaultSelect={true}
                        defaultValue={values?.districtId ?? ""}
                    />
                </Col>

                <Col md={4} className="mb-10">
                    <InputSelectApi
                        label="উপজেলা"
                        name="thanaId"
                        operationId={
                            values.districtId
                                ? UrlBuilder.commonApi(
                                      `thana/all?districtId=${values.districtId}`
                                  )
                                : ""
                        }
                        storeName="thana"
                        value="id"
                        text="thanaName"
                        // defaultSelect={true}
                    />
                </Col>

                <Col md={4} className="mb-10">
                    <InputSelectApi
                        label="ডাকঘর"
                        name="postOfficeId"
                        operationId={
                            values.thanaId
                                ? UrlBuilder.commonApi(
                                      `post-office/all?thanaId=${values.thanaId}`
                                  )
                                : ""
                        }
                        storeName="postOffice"
                        value="id"
                        text="postOfficeName"
                        // defaultSelect={true}
                    />
                </Col>

                <div className="row">
                    <div className="col-lg-12">
                        <div className="table-responsive">
                            <table className="table text-center">
                                <thead>
                                    <tr>
                                        <th>Equivalent Degree</th>
                                        <th>Examination Name</th>
                                        <th>Board/Institute</th>
                                        <th>Group/Subject</th>
                                        <th>Result</th>
                                        <th>Passing Year</th>
                                        <th>Exam Roll</th>
                                        <th>Duration (years)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {values?.educationalQualificationList &&
                                    values?.educationalQualificationList
                                        .length > 0 ? (
                                        values?.educationalQualificationList.map(
                                            (item, index) => (
                                                <tr key={index}>
                                                    <td>
                                                        {
                                                            educationQualification[
                                                                index
                                                            ]
                                                        }
                                                    </td>
                                                    <td>
                                                        {index !== 4 && (
                                                            <InputSelectApi
                                                                name={`educationalQualificationList.${index}.educationDegreeId`}
                                                                operationId={UrlBuilder.commonApi(
                                                                    "education-degree/all"
                                                                )}
                                                                storeName="educationDegreeNameBn"
                                                                value="id"
                                                                text="educationDegreeNameBn"
                                                                onChange={(
                                                                    e
                                                                ) => {
                                                                    setFieldValue(
                                                                        `educationalQualificationList.${index}.educationDegreeId`,
                                                                        e.target
                                                                            .value
                                                                    );

                                                                    setFieldValue(
                                                                        `educationalQualificationList.${index}.educationBoardId`,
                                                                        ""
                                                                    );
                                                                    setFieldValue(
                                                                        `educationalQualificationList.${index}.instituteId`,
                                                                        ""
                                                                    );

                                                                    setFieldValue(
                                                                        `educationalQualificationList.${index}.classGroupId`,
                                                                        ""
                                                                    );
                                                                    setFieldValue(
                                                                        `educationalQualificationList.${index}.subjectId`,
                                                                        ""
                                                                    );
                                                                }}
                                                            />
                                                        )}

                                                        {index === 4 && (
                                                            <InputSelectApi
                                                                name={`educationalQualificationList.${index}.educationDegreeId`}
                                                                operationId={UrlBuilder.ntrcaApi(
                                                                    "professional-qualification/all"
                                                                )}
                                                                storeName="professionalQualificationNameBn"
                                                                value="id"
                                                                text="professionalQualificationNameBn"
                                                                onChange={(
                                                                    e
                                                                ) => {
                                                                    setFieldValue(
                                                                        `educationalQualificationList.${index}.educationDegreeId`,
                                                                        e.target
                                                                            .value
                                                                    );

                                                                    setFieldValue(
                                                                        `educationalQualificationList.${index}.educationBoardId`,
                                                                        ""
                                                                    );
                                                                    setFieldValue(
                                                                        `educationalQualificationList.${index}.instituteId`,
                                                                        ""
                                                                    );

                                                                    setFieldValue(
                                                                        `educationalQualificationList.${index}.classGroupId`,
                                                                        ""
                                                                    );
                                                                    setFieldValue(
                                                                        `educationalQualificationList.${index}.subjectId`,
                                                                        ""
                                                                    );
                                                                }}
                                                            />
                                                        )}
                                                    </td>
                                                    {/* <td>
                                                        {values
                                                            ?.educationalQualificationList[
                                                            index
                                                        ]?.educationDegreeId ==
                                                            DepartmentType.DAKHIL ||
                                                        values
                                                            ?.educationalQualificationList[
                                                            index
                                                        ]?.educationDegreeId ==
                                                            DepartmentType.SSC ||
                                                        values
                                                            ?.educationalQualificationList[
                                                            index
                                                        ]?.educationDegreeId ==
                                                            DepartmentType.HSC ||
                                                        values
                                                            ?.educationalQualificationList[
                                                            index
                                                        ]?.educationDegreeId ==
                                                            DepartmentType.ALIM ? (
                                                            <InputSelectApi
                                                                name={`educationalQualificationList.${index}.educationBoardId`}
                                                                operationId={UrlBuilder.commonApi(
                                                                    "education-board/all"
                                                                )}
                                                                storeName="educationBoardNameBn"
                                                                value="id"
                                                                text="educationBoardNameBn"
                                                                onChange={(e) =>
                                                                    setFieldValue(
                                                                        `educationalQualificationList.${index}.educationBoardId`,
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                            />
                                                        ) : (
                                                            <InputSelectApi
                                                                name={`educationalQualificationList.${index}.instituteId`}
                                                                operationId={UrlBuilder.eiinApi(
                                                                    "institute/all?instituteTypeId=9"
                                                                )}
                                                                storeName="instituteNameBn"
                                                                value="id"
                                                                text="instituteNameBn"
                                                                onChange={(e) =>
                                                                    setFieldValue(
                                                                        `educationalQualificationList.${index}.instituteId`,
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                            />
                                                        )}
                                                    </td> */}
                                                    <td>
                                                        {(index === 0 ||
                                                            index === 1 ||
                                                            index === 4) && (
                                                            <InputSelectApi
                                                                name={`educationalQualificationList.${index}.educationBoardId`}
                                                                operationId={UrlBuilder.commonApi(
                                                                    "education-board/all"
                                                                )}
                                                                storeName="educationBoardNameBn"
                                                                value="id"
                                                                text="educationBoardNameBn"
                                                                onChange={(e) =>
                                                                    setFieldValue(
                                                                        `educationalQualificationList.${index}.educationBoardId`,
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                            />
                                                        )}
                                                        {(index === 2 ||
                                                            index === 3) && (
                                                            <InputSelectApi
                                                                name={`educationalQualificationList.${index}.instituteId`}
                                                                operationId={UrlBuilder.eiinApi(
                                                                    "institute/all?instituteTypeId=9"
                                                                )}
                                                                storeName="instituteNameBn"
                                                                value="id"
                                                                text="instituteNameBn"
                                                                onChange={(e) =>
                                                                    setFieldValue(
                                                                        `educationalQualificationList.${index}.instituteId`,
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                            />
                                                        )}

                                                        {/* {index === 4 && (
                                                            <>loading</>
                                                        )} */}
                                                    </td>
                                                    <td>
                                                        {(index == 0 ||
                                                            index == 1) && (
                                                            <InputSelectApi
                                                                name={`educationalQualificationList.${index}.classGroupId`}
                                                                operationId={UrlBuilder.commonApi(
                                                                    "class-group/all"
                                                                )}
                                                                storeName="classGroupNameBn"
                                                                value="id"
                                                                text="classGroupNameBn"
                                                                onChange={(e) =>
                                                                    setFieldValue(
                                                                        `educationalQualificationList.${index}.classGroupId`,
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                            />
                                                        )}

                                                        {(index == 2 ||
                                                            index == 3) && (
                                                            <InputSelectApi
                                                                name={`educationalQualificationList.${index}.subjectId`}
                                                                operationId={UrlBuilder.commonApi(
                                                                    "subject/all"
                                                                )}
                                                                storeName="subjectNameBn"
                                                                value="id"
                                                                text="subjectNameBn"
                                                                onChange={(e) =>
                                                                    setFieldValue(
                                                                        `educationalQualificationList.${index}.subjectId`,
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                            />
                                                        )}
                                                    </td>
                                                    {/* "স্কোরিং পদ্ধতি" */}
                                                    <td>
                                                        <InputSelect
                                                            label="স্কোরিং পদ্ধতি"
                                                            name={`educationalQualificationList.${index}.scoringMethodName`}
                                                            storeName="scoringMethodName"
                                                            data={
                                                                scoringMethodName
                                                            }
                                                            type="text"
                                                            value="id"
                                                            text="name"
                                                            onChange={async (
                                                                e
                                                            ) => {
                                                                await setFieldValue(
                                                                    `educationalQualificationList.${index}.scoringMethodName`,
                                                                    e.target
                                                                        .value
                                                                );
                                                                await setFieldValue(
                                                                    `educationalQualificationList.${index}.examGrade`,
                                                                    ""
                                                                );
                                                            }}
                                                        />
                                                        <br />
                                                        {(values
                                                            ?.educationalQualificationList[
                                                            index
                                                        ]?.scoringMethodName ===
                                                            "GPA-4" ||
                                                            values
                                                                ?.educationalQualificationList[
                                                                index
                                                            ]
                                                                ?.scoringMethodName ===
                                                                "GPA-5") && (
                                                            <InputField
                                                                label="স্কোর"
                                                                name={`educationalQualificationList.${index}.examGrade`}
                                                                type="number"
                                                                max={
                                                                    values
                                                                        ?.educationalQualificationList[
                                                                        index
                                                                    ]
                                                                        ?.scoringMethodName ===
                                                                    "GPA-5"
                                                                        ? 5
                                                                        : 4
                                                                }
                                                                placeholder="পরীক্ষার গ্রেড"
                                                            />
                                                        )}
                                                        {values
                                                            ?.educationalQualificationList[
                                                            index
                                                        ]?.scoringMethodName ===
                                                            "DIV" && (
                                                            <InputSelect
                                                                label="স্কোর"
                                                                name={`educationalQualificationList.${index}.examGrade`}
                                                                storeName="examGrade"
                                                                data={
                                                                    divisionMethod
                                                                }
                                                                type="text"
                                                                value="id"
                                                                text="name"
                                                                onChange={async (
                                                                    e
                                                                ) => {
                                                                    await setFieldValue(
                                                                        `educationalQualificationList.${index}.examGrade`,
                                                                        e.target
                                                                            .value
                                                                    );
                                                                }}
                                                            />
                                                        )}
                                                    </td>

                                                    <td>
                                                        {/* {item?.passingYear ??
                                                            "N/A"} */}

                                                        <InputSelect
                                                            name={`educationalQualificationList.${index}.passingYear`}
                                                            value="id"
                                                            type="text"
                                                            text="name"
                                                            data={yearList}
                                                        />
                                                    </td>
                                                    <td>
                                                        {/* {item?.educationDegreeRoll ??
                                                            "N/A"} */}
                                                        <InputField
                                                            //label="রোল নম্বর"
                                                            name={`educationalQualificationList.${index}.educationDegreeRoll`}
                                                            type="number"
                                                            placeholder="রোল নম্বর"
                                                        />
                                                    </td>
                                                    <td>
                                                        {/* {item?.duration ??
                                                            "N/A"} */}

                                                        <InputSelect
                                                            name={`educationalQualificationList.${index}.duration`}
                                                            value="id"
                                                            type="text"
                                                            text="name"
                                                            data={durationList}
                                                        />
                                                    </td>
                                                </tr>
                                            )
                                        )
                                    ) : (
                                        <tr>
                                            <td colSpan={7}>
                                                <b>No Data Found</b>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <Col md={12} className="mb-10 mt-10">
                    <Button
                        variant=""
                        className="f-right btn-color btn-primary"
                        type="submit"
                    >
                        <FontAwesomeIcon icon={faSave} className="me-2" />{" "}
                        {formType == "add" ? "সাবমিট করুন" : "ইডিট করুন"}
                    </Button>
                    <Button
                        variant="white"
                        className="f-right mr-10"
                        type="reset"
                    >
                        <FontAwesomeIcon icon={faUndo} className="me-2" /> রিসেট
                    </Button>
                    <Link to="/portal/certified-applicants/list">
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

export default CertifiedApplicantsEditForm;
