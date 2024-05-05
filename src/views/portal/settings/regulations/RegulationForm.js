import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Form, FieldArray, useFormik } from "formik/dist/index";
import { Button, Col, Row, Table } from "@themesberg/react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faSave,
    faTimes,
    faUndo,
    faPlusSquare,
    faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";

import { InputField, InputSelect } from "../../../../components/form";
import InputSelectApi from "../../../../components/form/InputSelectApi";
import ErrorMessage from "../../../../components/text/ErrorMessage";
import { Grid, InputLabel } from "@mui/material";
import "./Regulation";
import { UrlBuilder } from "../../../../helpers/UrlBuilder";
import Checkbox from "../../../../components/form/Checkbox";
import PositionType from "constants/PositionType";
import { setState } from "reducers/apiSlice";
import EnglishNumberToBangla from "helpers/EnglishNumberToBangla";
import swal from "sweetalert";
import InputFieldNumber from "components/form/InputFieldNumber";
import ComboBox from "components/material/SearchComponent";
import DepartmentType from "constants/DepartmentType";
import FindComboBox from "components/material/FindComponent";

const MpoTeacherRegulationForm = ({ setFieldValue, values, formType }) => {
    console.log('values', values);
    const year = [];
    for (let y = 30; y <= 70; y++) {
        year.push({
            id: y,
            name: EnglishNumberToBangla(y),
        });
    }

    const [divisionMethod] = useState([
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
    ]);
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

    const techList = [
        {
            id: "TECH",
            name: "টেক",
        },
        {
            id: "NON_TECH",
            name: "ননটেক",
        },
    ];

    return (
        <Form>
            <Row>
                <Col md={3} className="mb-10">
                    <label className="form-label">
                        নীতিমালা
                        <abbr style={{ color: "red" }} className="req">
                            *
                        </abbr>
                    </label>
                    <InputSelectApi
                        name="govtRegulationId"
                        operationId={UrlBuilder.ntrcaApi(`govt-regulation/all`)}
                        storeName="regulations"
                        value="id"
                        text="govtRegulationNameBn"
                        type="number"
                    />
                    <ErrorMessage fieldName="govtRegulationId" />
                </Col>

                <Col md={3} className="mb-10">
                    <label className="form-label">
                        প্রতিষ্ঠানের ধরন
                        <abbr style={{ color: "red" }} className="req">
                            *
                        </abbr>
                    </label>
                    <InputSelectApi
                        name="instituteTypeId"
                        operationId={UrlBuilder.commonApi(`institute-type/all`)}
                        storeName="instituteTypeName"
                        value="id"
                        text="instituteTypeNameBn"
                        type="number"
                    />
                    <ErrorMessage fieldName="instituteTypeId" />
                </Col>

                <Col md={3} className="mb-10">
                    <label className="form-label">
                        প্রতিষ্ঠানের স্তর
                        <abbr style={{ color: "red" }} className="req">
                            *
                        </abbr>
                    </label>
                    <InputSelectApi
                        name="educationLevelId"
                        operationId={
                            values?.instituteTypeId
                                ? UrlBuilder.ntrcaApi(
                                      `govt-regulation-recruitment-post-subject-level-grade/education-level/all?instituteTypeId=${values.instituteTypeId}`
                                  )
                                : ""
                        }
                        storeName="educationLevelName"
                        value="id"
                        text="educationLevelNameBn"
                        type="number"
                    />
                    <ErrorMessage fieldName="educationLevelId" />
                </Col>

                <Col md={3} className="mb-10">
                    <label className="form-label">
                        পদবি
                        <abbr style={{ color: "red" }} className="req">
                            *
                        </abbr>
                    </label>
                    <InputSelectApi
                        name="postId"
                        // operationId={UrlBuilder.ntrcaApi(
                        //     values.positionType == undefined
                        //         ? `employee/designation/list?instituteTypeId=${values.instituteTypeId}`
                        //         : `employee/designation/list?instituteTypeId=${values.instituteTypeId}&positionType=${values.positionType}`
                        // )}
                        // operationId={UrlBuilder.mpoDsheApi(
                        //     "employee/post-designation/all"
                        // )}
                        
                        operationId={values.govtRegulationId == "4" ? UrlBuilder.mpoDteApi(
                            "employee/post-designation/all") 
                                : values.govtRegulationId == "7" ? UrlBuilder.mpoDmeApi(
                                    "employee/post-designation/all") 
                                        : values.govtRegulationId == "5" ? UrlBuilder.mpoDmeApi(
                                            "employee/post-designation/all") : ""
                        }
                        storeName="designation"
                        value="id"
                        text="designationNameBn"
                        type="number"
                    />
                    <ErrorMessage fieldName="postId" />
                </Col>

                <Col md={3} className="mb-10">
                    <label className="form-label">
                        বিষয়
                        <abbr style={{ color: "red" }} className="req">
                            *
                        </abbr>
                    </label>
                    <FindComboBox
                        title="subjectNameBn"
                        name="postSubjectIdDtoList"
                        setField={setFieldValue}
                        formType={formType}
                        storeName="postSubjectIdDtoList"
                        allValue={values}
                        isMultiple={true}
                        // operationId={UrlBuilder.mpoDsheApi(
                        //     "employee/post-subject/all"
                        // )}
                        operationId={
                            values?.postId && ((values?.postId == "29" || values?.postId == "126" || values?.postId == "129" || values?.postId == "174" )  ?
                              UrlBuilder.mpoDteApi(
                                `employee/tech-subject/all`
                              )
                              : UrlBuilder.mpoDsheApi(
                                `employee/post-subject/all`
                              ))
                          }
                        placeHolder="নির্বাচন করুন"
                        selectType="object"
                        otherText="subjectCode"
                    ></FindComboBox>
                    <ErrorMessage fieldName="subjectId" />
                </Col>

                

                <Col md={3} className="mb-10">
                    <label className="form-label">
                        ধর্ম
                        {/* <abbr style={{ color: "red" }} className="req">
                            *
                        </abbr> */}
                    </label>
                    <InputSelect
                        name="religion"
                        value="id"
                        type="text"
                        data={religion}
                        //required={true}
                        text="name"
                    />
                </Col>
                <Col md={3} className="mb-10">
                    <label className="form-label">টেক/ননটেক স্টেটাস</label>
                    <InputSelect
                        name="technicalStatus"
                        value="id"
                        type="text"
                        data={techList}
                        text="name"
                    />
                </Col>
                <Col md={3} className="mb-10">
                    <InputSelectApi
                        label="বেতন গ্রেড"
                        name="salaryGradeId"
                        required={true}
                        operationId={UrlBuilder.commonApi(`grade-salary/all`)}
                        type="text"
                        value="id"
                        text="salaryGradeNameBn"
                        // data={[
                        //     {
                        //         id: 1,
                        //         name: "গ্রেড-১",
                        //     },
                        //     {
                        //         id: 2,
                        //         name: "গ্রেড-২",
                        //     },
                        //     {
                        //         id: 3,
                        //         name: "গ্রেড-৩",
                        //     },
                        //     {
                        //         id: 4,
                        //         name: "গ্রেড-৪",
                        //     },
                        //     {
                        //         id: 5,
                        //         name: "গ্রেড-৫",
                        //     },
                        //     {
                        //         id: 6,
                        //         name: "গ্রেড-৬",
                        //     },
                        //     {
                        //         id: 7,
                        //         name: "গ্রেড-৭",
                        //     },
                        //     {
                        //         id: 8,
                        //         name: "গ্রেড-৮",
                        //     },
                        //     {
                        //         id: 9,
                        //         name: "গ্রেড-৯",
                        //     },
                        //     {
                        //         id: 10,
                        //         name: "গ্রেড-১০",
                        //     },
                        //     {
                        //         id: 11,
                        //         name: "গ্রেড-১১",
                        //     },
                        //     {
                        //         id: 12,
                        //         name: "গ্রেড-১২",
                        //     },
                        //     {
                        //         id: 13,
                        //         name: "গ্রেড-১৩",
                        //     },
                        //     {
                        //         id: 14,
                        //         name: "গ্রেড-১৪",
                        //     },
                        //     {
                        //         id: 15,
                        //         name: "গ্রেড-১৫",
                        //     },
                        //     {
                        //         id: 16,
                        //         name: "গ্রেড-১৬",
                        //     },
                        //     {
                        //         id: 17,
                        //         name: "গ্রেড-১৭",
                        //     },
                        //     {
                        //         id: 18,
                        //         name: "গ্রেড-১৮",
                        //     },
                        //     {
                        //         id: 19,
                        //         name: "গ্রেড-১৯",
                        //     },
                        //     {
                        //         id: 20,
                        //         name: "গ্রেড-২০",
                        //     },
                        // ]}
                    />
                    <ErrorMessage fieldName="salaryGradeId" />
                </Col>
                <Col md={3} className="mb-10">
                    <InputSelect
                        label="৩য় শ্রেণী গ্রহণযোগ্য নয়"
                        name="maxAllowedThirdClass"
                        value="id"
                        type="text"
                        data={[
                            { id: 1, name: "এস এস সি" },
                            { id: 2, name: "এইচ এস সি" },
                            { id: 3, name: "সর্বশেষ ডিগ্রি" },
                            { id: 4, name: "প্রযোজ্য নয়" },
                        ]}
                        //required={true}
                        text="name"
                    />
                </Col>

                <Col md={3} className="mb-10">
                    <InputSelect
                        label="সমগ্র শিক্ষাজীবনে গ্রহণযোগ্য সর্বোচ্চ সংখ্যক ৩য় শ্রেণী"
                        name="maxAllowedThirdClassWithoutLastDegree"
                        value="id"
                        type="text"
                        data={[
                            // { id: 1, name: "০" },
                            { id: 1, name: "১" },
                            { id: 2, name: "২" },
                            { id: 3, name: "৩" },
                            { id: 4, name: "৪" },
                            { id: 5, name: "৫" },
                        ]}
                        //required={true}
                        text="name"
                    />
                </Col>

                <Col md={12}>
                    <div className="contentBoxBody">
                        <FieldArray
                            name="educationRecruitmentDegreeSubjectDetails"
                            render={(arrayHelpers) => (
                                <div>
                                    <Row>
                                        <div className="col-lg-12  col-md-12">
                                            <div className="row">
                                                <div className="table-responsive">
                                                    <table className="user-table align-items-center table table-hover table-bordered">
                                                        <thead>
                                                            <tr>
                                                                <th>#</th>
                                                                <th>
                                                                    <b>
                                                                        এমপিও
                                                                        হিসেবে
                                                                        শিক্ষাগত
                                                                        যোগ্যতা
                                                                        (নূন্যতম)
                                                                    </b>
                                                                </th>
                                                                <th>Action</th>
                                                            </tr>

                                                            {values?.educationRecruitmentDegreeSubjectDetails &&
                                                                values
                                                                    ?.educationRecruitmentDegreeSubjectDetails
                                                                    ?.length >
                                                                    0 &&
                                                                values?.educationRecruitmentDegreeSubjectDetails.map(
                                                                    (
                                                                        item,
                                                                        index
                                                                    ) => (
                                                                        <>
                                                                            <tr
                                                                                key={
                                                                                    item +
                                                                                    index
                                                                                }
                                                                            >
                                                                                <td className="wd-50">
                                                                                    {index +
                                                                                        1}
                                                                                </td>
                                                                                <td className="add-circularselect">
                                                                                    <div className="table-responsive mt-10">
                                                                                        <Table className="table mb-15 table table-sm table-bordered">
                                                                                            <thead>
                                                                                                <tr
                                                                                                    key={
                                                                                                        index +
                                                                                                        item
                                                                                                    }
                                                                                                >
                                                                                                    <th
                                                                                                        style={{
                                                                                                            backgroundColor:
                                                                                                                "forestgreen",
                                                                                                        }}
                                                                                                    >
                                                                                                        ডিগ্রীর
                                                                                                        বিষয়
                                                                                                    </th>
                                                                                                    <th
                                                                                                        style={{
                                                                                                            backgroundColor:
                                                                                                                "forestgreen",
                                                                                                        }}
                                                                                                    >
                                                                                                        নিয়োগের
                                                                                                        জন্যে
                                                                                                        সর্বনিম্ন
                                                                                                        শিক্ষাগত
                                                                                                        যোগ্যতা
                                                                                                    </th>
                                                                                                    <th
                                                                                                        style={{
                                                                                                            backgroundColor:
                                                                                                                "forestgreen",
                                                                                                        }}
                                                                                                    >
                                                                                                        সমমান
                                                                                                        প্রযোজ্য
                                                                                                        কিনা
                                                                                                        ?
                                                                                                    </th>

                                                                                                    <th
                                                                                                        style={{
                                                                                                            backgroundColor:
                                                                                                                "forestgreen",
                                                                                                        }}
                                                                                                    >
                                                                                                        ডিগ্রীর
                                                                                                        সময়কাল(বছর){" "}
                                                                                                    </th>

                                                                                                    <th
                                                                                                        style={{
                                                                                                            backgroundColor:
                                                                                                                "forestgreen",
                                                                                                        }}
                                                                                                    >
                                                                                                        ট্রেডের
                                                                                                        নাম
                                                                                                    </th>

                                                                                                    <th
                                                                                                        style={{
                                                                                                            backgroundColor:
                                                                                                                "forestgreen",
                                                                                                        }}
                                                                                                    >
                                                                                                        নূন্যতম
                                                                                                        গ্রেডিং/
                                                                                                        ডিভিশন/
                                                                                                        নম্বর
                                                                                                    </th>

                                                                                                    <th
                                                                                                        style={{
                                                                                                            backgroundColor:
                                                                                                                "forestgreen",
                                                                                                        }}
                                                                                                    >
                                                                                                        ডিপার্টমেন্ট/গ্রুপের
                                                                                                        নাম
                                                                                                    </th>

                                                                                                    <th
                                                                                                        style={{
                                                                                                            backgroundColor:
                                                                                                                "forestgreen",
                                                                                                        }}
                                                                                                    >
                                                                                                        শিক্ষা
                                                                                                        বোর্ডের
                                                                                                        নাম
                                                                                                    </th>

                                                                                                    <th
                                                                                                        style={{
                                                                                                            backgroundColor:
                                                                                                                "forestgreen",
                                                                                                        }}
                                                                                                    >
                                                                                                        স্বীকৃত
                                                                                                        বিশ্ববিদ্যালয়
                                                                                                        থেকে
                                                                                                        পাসকৃত
                                                                                                        আবশ্যক
                                                                                                        ?
                                                                                                    </th>

                                                                                                    <th
                                                                                                        style={{
                                                                                                            backgroundColor:
                                                                                                                "forestgreen",
                                                                                                        }}
                                                                                                    >
                                                                                                        স্বীকৃত
                                                                                                        শিক্ষা
                                                                                                        বোর্ডের
                                                                                                        থেকে
                                                                                                        পাসকৃত
                                                                                                        আবশ্যক
                                                                                                        ?
                                                                                                    </th>
                                                                                                </tr>
                                                                                            </thead>

                                                                                            <tbody
                                                                                                key={
                                                                                                    index
                                                                                                }
                                                                                                className="degree-tb-bd"
                                                                                            >
                                                                                                <td>
                                                                                                    <ComboBox
                                                                                                        title="subjectNameBn"
                                                                                                        name={`educationRecruitmentDegreeSubjectDetails.${index}.degreeSubjectIds`}
                                                                                                        setField={
                                                                                                            setFieldValue
                                                                                                        }
                                                                                                        formType={
                                                                                                            formType
                                                                                                        }
                                                                                                        storeName="degreeSubjectIds"
                                                                                                        allValue={
                                                                                                            values
                                                                                                                ?.educationRecruitmentDegreeSubjectDetails[
                                                                                                                index
                                                                                                            ]
                                                                                                        }
                                                                                                        isMultiple={
                                                                                                            true
                                                                                                        }
                                                                                                        operationId={UrlBuilder.commonApi(
                                                                                                            "subject/all"
                                                                                                        )}
                                                                                                        selectType="object"
                                                                                                        actionTable="degreeSubjectIds"
                                                                                                        placeHolder="নির্বাচন করুন"
                                                                                                    ></ComboBox>
                                                                                                </td>
                                                                                                <td>
                                                                                                    <InputSelectApi
                                                                                                        name={`educationRecruitmentDegreeSubjectDetails.${index}.educationDegreeId`}
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
                                                                                                                `educationRecruitmentDegreeSubjectDetails.${index}.educationDegreeId`,
                                                                                                                e
                                                                                                                    .target
                                                                                                                    .value
                                                                                                            );

                                                                                                            setFieldValue(
                                                                                                                `educationRecruitmentDegreeSubjectDetails.${index}.departmentIdOrGroupId`,
                                                                                                                ""
                                                                                                            );
                                                                                                        }}
                                                                                                    />
                                                                                                </td>
                                                                                                <td>
                                                                                                    <InputSelect
                                                                                                        name={`educationRecruitmentDegreeSubjectDetails.${index}.isDegreeEqv`}
                                                                                                        value="id"
                                                                                                        type="text"
                                                                                                        data={[
                                                                                                            {
                                                                                                                id: true,
                                                                                                                name: "হ্যাঁ",
                                                                                                            },
                                                                                                            {
                                                                                                                id: false,
                                                                                                                name: "না",
                                                                                                            },
                                                                                                        ]}
                                                                                                        text="name"
                                                                                                    />
                                                                                                </td>
                                                                                                <td className="">
                                                                                                    <InputSelect
                                                                                                        name={`educationRecruitmentDegreeSubjectDetails.${index}.degreeDurationYear`}
                                                                                                        // required={true}
                                                                                                        type="text"
                                                                                                        value="id"
                                                                                                        text="name"
                                                                                                        data={[
                                                                                                            {
                                                                                                                id: 7,
                                                                                                                name: "6 মাস",
                                                                                                            },
                                                                                                            {
                                                                                                                id: 1,
                                                                                                                name: "1 বছর",
                                                                                                            },
                                                                                                            {
                                                                                                                id: 2,
                                                                                                                name: "2 বছর",
                                                                                                            },
                                                                                                            {
                                                                                                                id: 3,
                                                                                                                name: "3 বছর",
                                                                                                            },
                                                                                                            {
                                                                                                                id: 4,
                                                                                                                name: "4 বছর",
                                                                                                            },
                                                                                                            {
                                                                                                                id: 5,
                                                                                                                name: "5 বছর",
                                                                                                            },
                                                                                                            {
                                                                                                                id: 6,
                                                                                                                name: "6 বছর",
                                                                                                            },
                                                                                                        ]}
                                                                                                    />
                                                                                                    <ErrorMessage fieldName="degreeDurationYear" />
                                                                                                </td>
                                                                                                <td>
                                                                                                    <InputSelectApi
                                                                                                        name={`educationRecruitmentDegreeSubjectDetails.${index}.tradeId`}
                                                                                                        operationId={UrlBuilder.ntrcaApi(
                                                                                                            "trade/all"
                                                                                                        )}
                                                                                                        storeName="tradeNameBn"
                                                                                                        value="id"
                                                                                                        text="tradeNameBn"
                                                                                                        onChange={(
                                                                                                            e
                                                                                                        ) =>
                                                                                                            setFieldValue(
                                                                                                                `educationRecruitmentDegreeSubjectDetails.${index}.tradeId`,
                                                                                                                e
                                                                                                                    .target
                                                                                                                    .value
                                                                                                            )
                                                                                                        }
                                                                                                    />
                                                                                                </td>
                                                                                                <td>
                                                                                                    <div
                                                                                                        style={{
                                                                                                            display:
                                                                                                                "inline-flex",
                                                                                                        }}
                                                                                                    >
                                                                                                        <InputSelect
                                                                                                            type="text"
                                                                                                            name={`educationRecruitmentDegreeSubjectDetails.${index}.minDivisionClass`}
                                                                                                            data={
                                                                                                                divisionMethod
                                                                                                            }
                                                                                                            text="name"
                                                                                                            value="id"
                                                                                                            onChange={(
                                                                                                                e
                                                                                                            ) => {
                                                                                                                setFieldValue(
                                                                                                                    `educationRecruitmentDegreeSubjectDetails.${index}.minDivisionClass`,
                                                                                                                    e
                                                                                                                        .target
                                                                                                                        .value
                                                                                                                );
                                                                                                            }}
                                                                                                        />
                                                                                                        <div
                                                                                                            className="ml-5"
                                                                                                            style={{
                                                                                                                marginTop:
                                                                                                                    "-8px",
                                                                                                            }}
                                                                                                        >
                                                                                                            <InputField
                                                                                                                name={`educationRecruitmentDegreeSubjectDetails.${index}.cgpa`}
                                                                                                                type="number"
                                                                                                                placeholder="সিজিপিএ/জিপিএ"
                                                                                                            />
                                                                                                        </div>
                                                                                                        <div
                                                                                                            className="ml-5"
                                                                                                            style={{
                                                                                                                marginTop:
                                                                                                                    "-8px",
                                                                                                            }}
                                                                                                        >
                                                                                                            <InputField
                                                                                                                name={`educationRecruitmentDegreeSubjectDetails.${index}.minimumNumber`}
                                                                                                                type="number"
                                                                                                                placeholder="নম্বর"
                                                                                                            />
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </td>
                                                                                                <td>
                                                                                                    {values
                                                                                                        ?.educationRecruitmentDegreeSubjectDetails[
                                                                                                        index
                                                                                                    ]
                                                                                                        ?.educationDegreeId ==
                                                                                                        DepartmentType.DAKHIL ||
                                                                                                    values
                                                                                                        ?.educationRecruitmentDegreeSubjectDetails[
                                                                                                        index
                                                                                                    ]
                                                                                                        ?.educationDegreeId ==
                                                                                                        DepartmentType.SSC ||
                                                                                                    values
                                                                                                        ?.educationRecruitmentDegreeSubjectDetails[
                                                                                                        index
                                                                                                    ]
                                                                                                        ?.educationDegreeId ==
                                                                                                        DepartmentType.HSC ||
                                                                                                    values
                                                                                                        ?.educationRecruitmentDegreeSubjectDetails[
                                                                                                        index
                                                                                                    ]
                                                                                                        ?.educationDegreeId ==
                                                                                                        DepartmentType.ALIM ? (
                                                                                                        <InputSelectApi
                                                                                                            name={`educationRecruitmentDegreeSubjectDetails.${index}.departmentIdOrGroupId`}
                                                                                                            operationId={UrlBuilder.ntrcaApi(
                                                                                                                "class-group/all"
                                                                                                            )}
                                                                                                            storeName="classGroupName"
                                                                                                            value="id"
                                                                                                            text="classGroupNameBn"
                                                                                                            onChange={(
                                                                                                                e
                                                                                                            ) =>
                                                                                                                setFieldValue(
                                                                                                                    `educationRecruitmentDegreeSubjectDetails.${index}.departmentIdOrGroupId`,
                                                                                                                    e
                                                                                                                        .target
                                                                                                                        .value
                                                                                                                )
                                                                                                            }
                                                                                                        />
                                                                                                    ) : (
                                                                                                        <InputSelectApi
                                                                                                            name={`educationRecruitmentDegreeSubjectDetails.${index}.departmentIdOrGroupId`}
                                                                                                            operationId={UrlBuilder.ntrcaApi(
                                                                                                                "department/all"
                                                                                                            )}
                                                                                                            storeName="departmentNameBn"
                                                                                                            value="id"
                                                                                                            text="departmentNameBn"
                                                                                                            onChange={(
                                                                                                                e
                                                                                                            ) =>
                                                                                                                setFieldValue(
                                                                                                                    `educationRecruitmentDegreeSubjectDetails.${index}.departmentIdOrGroupId`,
                                                                                                                    e
                                                                                                                        .target
                                                                                                                        .value
                                                                                                                )
                                                                                                            }
                                                                                                        />
                                                                                                    )}
                                                                                                </td>
                                                                                                <td>
                                                                                                    <InputSelectApi
                                                                                                        name={`educationRecruitmentDegreeSubjectDetails.${index}.boardId`}
                                                                                                        operationId={UrlBuilder.ntrcaApi(
                                                                                                            "board/all"
                                                                                                        )}
                                                                                                        storeName="boardName"
                                                                                                        value="id"
                                                                                                        text="boardNameBn"
                                                                                                        onChange={(
                                                                                                            e
                                                                                                        ) =>
                                                                                                            setFieldValue(
                                                                                                                `educationRecruitmentDegreeSubjectDetails.${index}.boardId`,
                                                                                                                e
                                                                                                                    .target
                                                                                                                    .value
                                                                                                            )
                                                                                                        }
                                                                                                    />
                                                                                                </td>

                                                                                                <td>
                                                                                                    <InputSelect
                                                                                                        name={`educationRecruitmentDegreeSubjectDetails.${index}.isRecognizedUniInstRequired`}
                                                                                                        value="id"
                                                                                                        type="text"
                                                                                                        data={[
                                                                                                            {
                                                                                                                id: true,
                                                                                                                name: "হ্যাঁ",
                                                                                                            },
                                                                                                            {
                                                                                                                id: false,
                                                                                                                name: "না",
                                                                                                            },
                                                                                                        ]}
                                                                                                        text="name"
                                                                                                    />
                                                                                                </td>
                                                                                                <td>
                                                                                                    <InputSelect
                                                                                                        name={`educationRecruitmentDegreeSubjectDetails.${index}.isRecognizedBoardRequired`}
                                                                                                        value="id"
                                                                                                        type="text"
                                                                                                        data={[
                                                                                                            {
                                                                                                                id: true,
                                                                                                                name: "হ্যাঁ",
                                                                                                            },
                                                                                                            {
                                                                                                                id: false,
                                                                                                                name: "না",
                                                                                                            },
                                                                                                        ]}
                                                                                                        text="name"
                                                                                                    />
                                                                                                </td>
                                                                                            </tbody>
                                                                                        </Table>
                                                                                    </div>
                                                                                    {/*-------------ADDITIONAL START*--------------*/}
                                                                                    <FieldArray
                                                                                        name={`educationRecruitmentDegreeSubjectDetails.${index}.additionalDetails`}
                                                                                        render={(
                                                                                            arrayHelpers
                                                                                        ) => (
                                                                                            <>
                                                                                                <div className="table-responsive mt-10">
                                                                                                    <Table className="table mb-15 table table-sm table-bordered">
                                                                                                        <thead>
                                                                                                            <tr>
                                                                                                                <th>
                                                                                                                    অতিরিক্ত
                                                                                                                    ডিগ্রীর
                                                                                                                    বিষয়
                                                                                                                </th>
                                                                                                                <th>
                                                                                                                    নিয়োগের
                                                                                                                    জন্যে
                                                                                                                    সর্বনিম্ন
                                                                                                                    শিক্ষাগত
                                                                                                                    যোগ্যতা
                                                                                                                </th>

                                                                                                                <th>
                                                                                                                    ডিগ্রীর
                                                                                                                    সময়কাল(বছর){" "}
                                                                                                                </th>

                                                                                                                <th>
                                                                                                                    ট্রেডের
                                                                                                                    নাম
                                                                                                                </th>

                                                                                                                <th>
                                                                                                                    নূন্যতম
                                                                                                                    গ্রেডিং/
                                                                                                                    ডিভিশন/
                                                                                                                    নম্বর
                                                                                                                </th>

                                                                                                                <th>
                                                                                                                    ডিপার্টমেন্ট/গ্রুপের
                                                                                                                    নাম
                                                                                                                </th>

                                                                                                                <th>
                                                                                                                    শিক্ষা
                                                                                                                    বোর্ডের
                                                                                                                    নাম
                                                                                                                </th>

                                                                                                                <th>
                                                                                                                    স্বীকৃত
                                                                                                                    বিশ্ববিদ্যালয়
                                                                                                                    থেকে
                                                                                                                    পাসকৃত
                                                                                                                    আবশ্যক
                                                                                                                    ?
                                                                                                                </th>

                                                                                                                <th>
                                                                                                                    স্বীকৃত
                                                                                                                    শিক্ষা
                                                                                                                    বোর্ডের
                                                                                                                    থেকে
                                                                                                                    পাসকৃত
                                                                                                                    আবশ্যক
                                                                                                                    ?
                                                                                                                </th>

                                                                                                                <th>
                                                                                                                    সম্পর্ক
                                                                                                                </th>

                                                                                                                <th className="text-center">
                                                                                                                    Add/Remove
                                                                                                                </th>
                                                                                                            </tr>
                                                                                                        </thead>
                                                                                                        {values?.educationRecruitmentDegreeSubjectDetails[
                                                                                                            index
                                                                                                        ].additionalDetails.map(
                                                                                                            (
                                                                                                                item,
                                                                                                                index2
                                                                                                            ) => (
                                                                                                                <tbody
                                                                                                                    key={
                                                                                                                        index2
                                                                                                                    }
                                                                                                                    className="degree-tb-bd"
                                                                                                                >
                                                                                                                    <tr>
                                                                                                                        <td>
                                                                                                                            <InputSelectApi
                                                                                                                                name={`educationRecruitmentDegreeSubjectDetails.${index}.additionalDetails.${index2}.degreeSubjectId`}
                                                                                                                                operationId={UrlBuilder.commonApi(
                                                                                                                                    "subject/all"
                                                                                                                                )}
                                                                                                                                storeName="educationRecruitmentDegreeSubjectDetails"
                                                                                                                                value="id"
                                                                                                                                text="subjectNameBn"
                                                                                                                                onChange={(
                                                                                                                                    e
                                                                                                                                ) =>
                                                                                                                                    setFieldValue(
                                                                                                                                        `educationRecruitmentDegreeSubjectDetails.${index}.additionalDetails.${index2}.degreeSubjectId`,
                                                                                                                                        e
                                                                                                                                            .target
                                                                                                                                            .value
                                                                                                                                    )
                                                                                                                                }
                                                                                                                            />

                                                                                                                            {/* <ComboBox
                                                                                                                                title="subjectNameBn"
                                                                                                                                name={`educationRecruitmentDegreeSubjectDetails.${index}.additionalDetails.${index2}.degreeSubjectId`}
                                                                                                                                setField={
                                                                                                                                    setFieldValue
                                                                                                                                }
                                                                                                                                formType={
                                                                                                                                    formType
                                                                                                                                }
                                                                                                                                storeName="degreeSubjectId"
                                                                                                                                allValue={
                                                                                                                                    values
                                                                                                                                        ?.educationRecruitmentDegreeSubjectDetails[
                                                                                                                                        index
                                                                                                                                    ]
                                                                                                                                        ?.additionalDetails[
                                                                                                                                        index2
                                                                                                                                    ] ||
                                                                                                                                    ""
                                                                                                                                }
                                                                                                                                isMultiple={
                                                                                                                                    false
                                                                                                                                }
                                                                                                                                operationId={UrlBuilder.commonApi(
                                                                                                                                    "subject/all"
                                                                                                                                )}
                                                                                                                                selectType="single"
                                                                                                                                actionTable="degreeSubjectId"
                                                                                                                            ></ComboBox>

                                                                                                                            <ErrorMessage fieldName="degreeSubjectId" /> */}
                                                                                                                        </td>
                                                                                                                        <td>
                                                                                                                            <InputSelectApi
                                                                                                                                name={`educationRecruitmentDegreeSubjectDetails.${index}.additionalDetails.${index2}.educationDegreeId`}
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
                                                                                                                                        `educationRecruitmentDegreeSubjectDetails.${index}.additionalDetails.${index2}.educationDegreeId`,
                                                                                                                                        e
                                                                                                                                            .target
                                                                                                                                            .value
                                                                                                                                    );
                                                                                                                                    setFieldValue(
                                                                                                                                        `educationRecruitmentDegreeSubjectDetails.${index}.additionalDetails.${index2}.departmentIdOrGroupId`,
                                                                                                                                        ""
                                                                                                                                    );
                                                                                                                                }}
                                                                                                                            />

                                                                                                                            {/* <ComboBox
                                                                                                                                title="educationDegreeNameBn"
                                                                                                                                name={`educationRecruitmentDegreeSubjectDetails.${index}.additionalDetails.${index2}.educationDegreeId`}
                                                                                                                                setField={
                                                                                                                                    setFieldValue
                                                                                                                                }
                                                                                                                                formType={
                                                                                                                                    formType
                                                                                                                                }
                                                                                                                                storeName="educationDegreeId"
                                                                                                                                allValue={
                                                                                                                                    values
                                                                                                                                        ?.educationRecruitmentDegreeSubjectDetails[
                                                                                                                                        index
                                                                                                                                    ]
                                                                                                                                        ?.additionalDetails[
                                                                                                                                        index2
                                                                                                                                    ] ||
                                                                                                                                    ""
                                                                                                                                }
                                                                                                                                isMultiple={
                                                                                                                                    false
                                                                                                                                }
                                                                                                                                operationId={UrlBuilder.commonApi(
                                                                                                                                    "education-degree/all"
                                                                                                                                )}
                                                                                                                                selectType="single"
                                                                                                                                actionTable="educationDegreeId"
                                                                                                                            ></ComboBox>

                                                                                                                            <ErrorMessage fieldName="educationDegreeId" /> */}
                                                                                                                        </td>
                                                                                                                        <td className="">
                                                                                                                            <InputSelect
                                                                                                                                name={`educationRecruitmentDegreeSubjectDetails.${index}.additionalDetails.${index2}.degreeDurationYear`}
                                                                                                                                // required={true}
                                                                                                                                type="text"
                                                                                                                                value="id"
                                                                                                                                text="name"
                                                                                                                                data={[
                                                                                                                                    {
                                                                                                                                        id: 7,
                                                                                                                                        name: "6 মাস",
                                                                                                                                    },
                                                                                                                                    {
                                                                                                                                        id: 1,
                                                                                                                                        name: "1 বছর",
                                                                                                                                    },
                                                                                                                                    {
                                                                                                                                        id: 2,
                                                                                                                                        name: "2 বছর",
                                                                                                                                    },
                                                                                                                                    {
                                                                                                                                        id: 3,
                                                                                                                                        name: "3 বছর",
                                                                                                                                    },
                                                                                                                                    {
                                                                                                                                        id: 4,
                                                                                                                                        name: "4 বছর",
                                                                                                                                    },
                                                                                                                                    {
                                                                                                                                        id: 5,
                                                                                                                                        name: "5 বছর",
                                                                                                                                    },
                                                                                                                                    {
                                                                                                                                        id: 6,
                                                                                                                                        name: "6 বছর",
                                                                                                                                    },
                                                                                                                                ]}
                                                                                                                            />
                                                                                                                            <ErrorMessage fieldName="degreeDurationYear" />
                                                                                                                        </td>
                                                                                                                        <td>
                                                                                                                            <InputSelectApi
                                                                                                                                name={`educationRecruitmentDegreeSubjectDetails.${index}.additionalDetails.${index2}.tradeId`}
                                                                                                                                operationId={UrlBuilder.ntrcaApi(
                                                                                                                                    "trade/all"
                                                                                                                                )}
                                                                                                                                storeName="tradeNameBn"
                                                                                                                                value="id"
                                                                                                                                text="tradeNameBn"
                                                                                                                                onChange={(
                                                                                                                                    e
                                                                                                                                ) =>
                                                                                                                                    setFieldValue(
                                                                                                                                        `educationRecruitmentDegreeSubjectDetails.${index}.additionalDetails.${index2}.tradeId`,
                                                                                                                                        e
                                                                                                                                            .target
                                                                                                                                            .value
                                                                                                                                    )
                                                                                                                                }
                                                                                                                            />
                                                                                                                        </td>

                                                                                                                        <td>
                                                                                                                            <div
                                                                                                                                style={{
                                                                                                                                    display:
                                                                                                                                        "inline-flex",
                                                                                                                                }}
                                                                                                                            >
                                                                                                                                <InputSelect
                                                                                                                                    type="text"
                                                                                                                                    name={`educationRecruitmentDegreeSubjectDetails.${index}.additionalDetails.${index2}.minDivisionClass`}
                                                                                                                                    data={
                                                                                                                                        divisionMethod
                                                                                                                                    }
                                                                                                                                    text="name"
                                                                                                                                    value="id"
                                                                                                                                    onChange={(
                                                                                                                                        e
                                                                                                                                    ) => {
                                                                                                                                        setFieldValue(
                                                                                                                                            `educationRecruitmentDegreeSubjectDetails.${index}.additionalDetails.${index2}.minDivisionClass`,
                                                                                                                                            e
                                                                                                                                                .target
                                                                                                                                                .value
                                                                                                                                        );
                                                                                                                                    }}
                                                                                                                                />
                                                                                                                                <div
                                                                                                                                    className="ml-5"
                                                                                                                                    style={{
                                                                                                                                        marginTop:
                                                                                                                                            "-8px",
                                                                                                                                    }}
                                                                                                                                >
                                                                                                                                    <InputField
                                                                                                                                        name={`educationRecruitmentDegreeSubjectDetails.${index}.additionalDetails.${index2}.cgpa`}
                                                                                                                                        type="number"
                                                                                                                                        placeholder="সিজিপিএ/জিপিএ"
                                                                                                                                    />
                                                                                                                                </div>
                                                                                                                                <div
                                                                                                                                    className="ml-5"
                                                                                                                                    style={{
                                                                                                                                        marginTop:
                                                                                                                                            "-8px",
                                                                                                                                    }}
                                                                                                                                >
                                                                                                                                    <InputField
                                                                                                                                        name={`educationRecruitmentDegreeSubjectDetails.${index}.additionalDetails.${index2}.minimumNumber`}
                                                                                                                                        type="number"
                                                                                                                                        placeholder="নম্বর"
                                                                                                                                    />
                                                                                                                                </div>
                                                                                                                            </div>
                                                                                                                        </td>

                                                                                                                        <td>
                                                                                                                            {values
                                                                                                                                ?.educationRecruitmentDegreeSubjectDetails[
                                                                                                                                index
                                                                                                                            ]
                                                                                                                                ?.additionalDetails[
                                                                                                                                index2
                                                                                                                            ]
                                                                                                                                ?.educationDegreeId ==
                                                                                                                                DepartmentType.DAKHIL ||
                                                                                                                            values
                                                                                                                                ?.educationRecruitmentDegreeSubjectDetails[
                                                                                                                                index
                                                                                                                            ]
                                                                                                                                ?.additionalDetails[
                                                                                                                                index2
                                                                                                                            ]
                                                                                                                                ?.educationDegreeId ==
                                                                                                                                DepartmentType.SSC ||
                                                                                                                            values
                                                                                                                                ?.educationRecruitmentDegreeSubjectDetails[
                                                                                                                                index
                                                                                                                            ]
                                                                                                                                ?.additionalDetails[
                                                                                                                                index2
                                                                                                                            ]
                                                                                                                                ?.educationDegreeId ==
                                                                                                                                DepartmentType.HSC ||
                                                                                                                            values
                                                                                                                                ?.educationRecruitmentDegreeSubjectDetails[
                                                                                                                                index
                                                                                                                            ]
                                                                                                                                ?.additionalDetails[
                                                                                                                                index2
                                                                                                                            ]
                                                                                                                                ?.educationDegreeId ==
                                                                                                                                DepartmentType.ALIM ? (
                                                                                                                                <InputSelectApi
                                                                                                                                    name={`educationRecruitmentDegreeSubjectDetails.${index}.additionalDetails.${index2}.departmentIdOrGroupId`}
                                                                                                                                    operationId={UrlBuilder.ntrcaApi(
                                                                                                                                        "class-group/all"
                                                                                                                                    )}
                                                                                                                                    storeName="classGroupName"
                                                                                                                                    value="id"
                                                                                                                                    text="classGroupNameBn"
                                                                                                                                    onChange={(
                                                                                                                                        e
                                                                                                                                    ) =>
                                                                                                                                        setFieldValue(
                                                                                                                                            `educationRecruitmentDegreeSubjectDetails.${index}.additionalDetails.${index2}.departmentIdOrGroupId`,
                                                                                                                                            e
                                                                                                                                                .target
                                                                                                                                                .value
                                                                                                                                        )
                                                                                                                                    }
                                                                                                                                />
                                                                                                                            ) : (
                                                                                                                                <InputSelectApi
                                                                                                                                    name={`educationRecruitmentDegreeSubjectDetails.${index}.additionalDetails.${index2}.departmentIdOrGroupId`}
                                                                                                                                    operationId={UrlBuilder.ntrcaApi(
                                                                                                                                        "department/all"
                                                                                                                                    )}
                                                                                                                                    storeName="departmentNameBn"
                                                                                                                                    value="id"
                                                                                                                                    text="departmentNameBn"
                                                                                                                                    onChange={(
                                                                                                                                        e
                                                                                                                                    ) =>
                                                                                                                                        setFieldValue(
                                                                                                                                            `educationRecruitmentDegreeSubjectDetails.${index}.additionalDetails.${index2}.departmentIdOrGroupId`,
                                                                                                                                            e
                                                                                                                                                .target
                                                                                                                                                .value
                                                                                                                                        )
                                                                                                                                    }
                                                                                                                                />
                                                                                                                            )}

                                                                                                                            {/* <InputSelectApi
                                                                                                                                name={`educationRecruitmentDegreeSubjectDetails.${index}.additionalDetails.${index2}.departmentIdOrGroupId`}
                                                                                                                                operationId={UrlBuilder.ntrcaApi(
                                                                                                                                    "department/all"
                                                                                                                                )}
                                                                                                                                storeName="departmentNameBn"
                                                                                                                                value="id"
                                                                                                                                text="departmentName"
                                                                                                                                onChange={(
                                                                                                                                    e
                                                                                                                                ) =>
                                                                                                                                    setFieldValue(
                                                                                                                                        `educationRecruitmentDegreeSubjectDetails.${index}.additionalDetails.${index2}.departmentIdOrGroupId`,
                                                                                                                                        e
                                                                                                                                            .target
                                                                                                                                            .value
                                                                                                                                    )
                                                                                                                                }
                                                                                                                            /> */}
                                                                                                                        </td>

                                                                                                                        <td>
                                                                                                                            <InputSelectApi
                                                                                                                                name={`educationRecruitmentDegreeSubjectDetails.${index}.additionalDetails.${index2}.boardId`}
                                                                                                                                operationId={UrlBuilder.ntrcaApi(
                                                                                                                                    "board/all"
                                                                                                                                )}
                                                                                                                                storeName="boardName"
                                                                                                                                value="id"
                                                                                                                                text="boardNameBn"
                                                                                                                                onChange={(
                                                                                                                                    e
                                                                                                                                ) =>
                                                                                                                                    setFieldValue(
                                                                                                                                        `educationRecruitmentDegreeSubjectDetails.${index}.additionalDetails.${index2}.boardId`,
                                                                                                                                        e
                                                                                                                                            .target
                                                                                                                                            .value
                                                                                                                                    )
                                                                                                                                }
                                                                                                                            />

                                                                                                                            {/* <ComboBox
                                                                                                                                title="boardName"
                                                                                                                                name={`educationRecruitmentDegreeSubjectDetails.${index}.additionalDetails.${index2}.boardId`}
                                                                                                                                setField={
                                                                                                                                    setFieldValue
                                                                                                                                }
                                                                                                                                formType={
                                                                                                                                    formType
                                                                                                                                }
                                                                                                                                storeName="boardId"
                                                                                                                                allValue={
                                                                                                                                    values
                                                                                                                                        ?.educationRecruitmentDegreeSubjectDetails[
                                                                                                                                        index
                                                                                                                                    ]
                                                                                                                                        ?.additionalDetails[
                                                                                                                                        index2
                                                                                                                                    ] ||
                                                                                                                                    ""
                                                                                                                                }
                                                                                                                                isMultiple={
                                                                                                                                    false
                                                                                                                                }
                                                                                                                                operationId={UrlBuilder.ntrcaApi(
                                                                                                                                    "board/all"
                                                                                                                                )}
                                                                                                                                selectType="single"
                                                                                                                                actionTable="boardId"
                                                                                                                            ></ComboBox> */}
                                                                                                                        </td>
                                                                                                                        <td>
                                                                                                                            <InputSelect
                                                                                                                                name={`educationRecruitmentDegreeSubjectDetails.${index}.additionalDetails.${index2}.isRecognizedUniInstRequired`}
                                                                                                                                value="id"
                                                                                                                                type="text"
                                                                                                                                data={[
                                                                                                                                    {
                                                                                                                                        id: true,
                                                                                                                                        name: "হ্যাঁ",
                                                                                                                                    },
                                                                                                                                    {
                                                                                                                                        id: false,
                                                                                                                                        name: "না",
                                                                                                                                    },
                                                                                                                                ]}
                                                                                                                                text="name"
                                                                                                                            />
                                                                                                                        </td>

                                                                                                                        <td>
                                                                                                                            <InputSelect
                                                                                                                                name={`educationRecruitmentDegreeSubjectDetails.${index}.additionalDetails.${index2}.isRecognizedBoardRequired`}
                                                                                                                                value="id"
                                                                                                                                type="text"
                                                                                                                                data={[
                                                                                                                                    {
                                                                                                                                        id: true,
                                                                                                                                        name: "হ্যাঁ",
                                                                                                                                    },
                                                                                                                                    {
                                                                                                                                        id: false,
                                                                                                                                        name: "না",
                                                                                                                                    },
                                                                                                                                ]}
                                                                                                                                text="name"
                                                                                                                            />
                                                                                                                        </td>
                                                                                                                        <td>
                                                                                                                            <div
                                                                                                                                style={{
                                                                                                                                    width: "max-content",
                                                                                                                                }}
                                                                                                                            >
                                                                                                                                <InputSelect
                                                                                                                                    name={`educationRecruitmentDegreeSubjectDetails.${index}.additionalDetails.${index2}.isAndOr`}
                                                                                                                                    value="id"
                                                                                                                                    type="text"
                                                                                                                                    data={[
                                                                                                                                        {
                                                                                                                                            id: "AND",
                                                                                                                                            name: "এবং",
                                                                                                                                        },
                                                                                                                                        {
                                                                                                                                            id: "OR",
                                                                                                                                            name: "অথবা",
                                                                                                                                        },
                                                                                                                                    ]}
                                                                                                                                    required={
                                                                                                                                        true
                                                                                                                                    }
                                                                                                                                    text="name"
                                                                                                                                    onChange={(
                                                                                                                                        e
                                                                                                                                    ) => {
                                                                                                                                        if (
                                                                                                                                            e
                                                                                                                                                .target
                                                                                                                                                .value ==
                                                                                                                                            ""
                                                                                                                                        ) {
                                                                                                                                            setFieldValue(
                                                                                                                                                `educationRecruitmentDegreeSubjectDetails.${index}.additionalDetails.${index2}.isAndOr`,
                                                                                                                                                "NONE"
                                                                                                                                            );
                                                                                                                                        } else {
                                                                                                                                            setFieldValue(
                                                                                                                                                `educationRecruitmentDegreeSubjectDetails.${index}.additionalDetails.${index2}.isAndOr`,
                                                                                                                                                e
                                                                                                                                                    .target
                                                                                                                                                    .value
                                                                                                                                            );
                                                                                                                                        }
                                                                                                                                    }}
                                                                                                                                />
                                                                                                                            </div>
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
                                                                                                                                {index2 +
                                                                                                                                    1 ===
                                                                                                                                    values
                                                                                                                                        ?.educationRecruitmentDegreeSubjectDetails[
                                                                                                                                        index
                                                                                                                                    ]
                                                                                                                                        ?.additionalDetails
                                                                                                                                        ?.length && (
                                                                                                                                    <Button
                                                                                                                                        variant="success"
                                                                                                                                        className="me-1 bg-primary"
                                                                                                                                        type="button"
                                                                                                                                        onClick={() => {
                                                                                                                                            arrayHelpers.push(
                                                                                                                                                {
                                                                                                                                                    educationDegreeId:
                                                                                                                                                        "",
                                                                                                                                                    degreeSubjectId:
                                                                                                                                                        "",
                                                                                                                                                    isRecognizedUniInstRequired:
                                                                                                                                                        "",
                                                                                                                                                    degreeDurationYear:
                                                                                                                                                        "",
                                                                                                                                                    boardId:
                                                                                                                                                        "",
                                                                                                                                                    minDivisionClass:
                                                                                                                                                        "",
                                                                                                                                                    cgpa: "",
                                                                                                                                                    minimumNumber:
                                                                                                                                                        "",
                                                                                                                                                    departmentIdOrGroupId:
                                                                                                                                                        "",
                                                                                                                                                    isRecognizedBoardRequired:
                                                                                                                                                        "",
                                                                                                                                                    tradeId:
                                                                                                                                                        "",
                                                                                                                                                    isAndOr:
                                                                                                                                                        "NONE",
                                                                                                                                                }
                                                                                                                                            );
                                                                                                                                        }}
                                                                                                                                    >
                                                                                                                                        <i>
                                                                                                                                            <FontAwesomeIcon
                                                                                                                                                icon={
                                                                                                                                                    faPlusSquare
                                                                                                                                                }
                                                                                                                                                className="text-light"
                                                                                                                                            />
                                                                                                                                        </i>
                                                                                                                                    </Button>
                                                                                                                                )}
                                                                                                                                {index2 +
                                                                                                                                    1 >
                                                                                                                                1 ? (
                                                                                                                                    <Button
                                                                                                                                        variant="danger"
                                                                                                                                        className="bg-danger"
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
                                                                                                                                                    if (
                                                                                                                                                        formType ==
                                                                                                                                                            "edit" &&
                                                                                                                                                        values
                                                                                                                                                            ?.educationRecruitmentDegreeSubjectDetails[
                                                                                                                                                            index
                                                                                                                                                        ]
                                                                                                                                                            .additionalDetails[
                                                                                                                                                            index2
                                                                                                                                                        ][
                                                                                                                                                            "id"
                                                                                                                                                        ]
                                                                                                                                                    ) {
                                                                                                                                                        // deleteDegreeCriteria(
                                                                                                                                                        //     main[
                                                                                                                                                        //         index
                                                                                                                                                        //     ]
                                                                                                                                                        //         .addition[
                                                                                                                                                        //         index2
                                                                                                                                                        //     ][
                                                                                                                                                        //         "id"
                                                                                                                                                        //     ]
                                                                                                                                                        // );
                                                                                                                                                    }
                                                                                                                                                    willDelete &&
                                                                                                                                                        arrayHelpers.remove(
                                                                                                                                                            index2
                                                                                                                                                        );
                                                                                                                                                }
                                                                                                                                            );
                                                                                                                                        }}
                                                                                                                                    >
                                                                                                                                        <i>
                                                                                                                                            <FontAwesomeIcon
                                                                                                                                                icon={
                                                                                                                                                    faTrashAlt
                                                                                                                                                }
                                                                                                                                                className="text-light"
                                                                                                                                            />
                                                                                                                                        </i>
                                                                                                                                    </Button>
                                                                                                                                ) : null}
                                                                                                                            </div>
                                                                                                                        </td>
                                                                                                                    </tr>
                                                                                                                </tbody>
                                                                                                            )
                                                                                                        )}
                                                                                                    </Table>
                                                                                                </div>
                                                                                            </>
                                                                                        )}
                                                                                    />
                                                                                    {/*------------------Professional Qualification Start-----------------------*/}
                                                                                    <FieldArray
                                                                                        name={`educationRecruitmentDegreeSubjectDetails.${index}.professionalQualificationDetails`}
                                                                                        render={(
                                                                                            arrayHelpers
                                                                                        ) => (
                                                                                            <>
                                                                                                <div className="table-responsive mt-10">
                                                                                                    <Table className="table mb-15 table table-sm table-bordered">
                                                                                                        <thead>
                                                                                                            <tr>
                                                                                                                <th>
                                                                                                                    প্রফেশনাল
                                                                                                                    ডিগ্রী
                                                                                                                </th>
                                                                                                                <th>
                                                                                                                    সমমান
                                                                                                                    প্রযোজ্য
                                                                                                                    কিনা
                                                                                                                    ?
                                                                                                                </th>
                                                                                                                <th>
                                                                                                                    ডিগ্রীর
                                                                                                                    সময়কাল(বছর){" "}
                                                                                                                </th>
                                                                                                                <th>
                                                                                                                    নূন্যতম
                                                                                                                    গ্রেডিং/
                                                                                                                    ডিভিশন/
                                                                                                                    নম্বর
                                                                                                                </th>

                                                                                                                <th>
                                                                                                                    শিক্ষা
                                                                                                                    বোর্ডের
                                                                                                                    নাম
                                                                                                                </th>

                                                                                                                <th>
                                                                                                                    স্বীকৃত
                                                                                                                    শিক্ষা
                                                                                                                    বোর্ডের
                                                                                                                    থেকে
                                                                                                                    পাসকৃত
                                                                                                                    আবশ্যক
                                                                                                                    ?
                                                                                                                </th>

                                                                                                                <th>
                                                                                                                    সম্পর্ক
                                                                                                                </th>

                                                                                                                <th className="text-center">
                                                                                                                    Add/Remove
                                                                                                                </th>
                                                                                                            </tr>
                                                                                                        </thead>
                                                                                                        {values?.educationRecruitmentDegreeSubjectDetails[
                                                                                                            index
                                                                                                        ].professionalQualificationDetails.map(
                                                                                                            (
                                                                                                                item,
                                                                                                                index3
                                                                                                            ) => (
                                                                                                                <tbody
                                                                                                                    key={
                                                                                                                        index3
                                                                                                                    }
                                                                                                                    className="degree-tb-bd"
                                                                                                                >
                                                                                                                    <tr>
                                                                                                                        <td>
                                                                                                                            <InputSelectApi
                                                                                                                                name={`educationRecruitmentDegreeSubjectDetails.${index}.professionalQualificationDetails.${index3}.ntrcaProfessionalQualificationId`}
                                                                                                                                operationId={UrlBuilder.ntrcaApi(
                                                                                                                                    "professional-qualification/all"
                                                                                                                                )}
                                                                                                                                storeName="professionalQualificationNameBn"
                                                                                                                                value="id"
                                                                                                                                text="professionalQualificationNameBn"
                                                                                                                                onChange={(
                                                                                                                                    e
                                                                                                                                ) =>
                                                                                                                                    setFieldValue(
                                                                                                                                        `educationRecruitmentDegreeSubjectDetails.${index}.professionalQualificationDetails.${index3}.ntrcaProfessionalQualificationId`,
                                                                                                                                        e
                                                                                                                                            .target
                                                                                                                                            .value
                                                                                                                                    )
                                                                                                                                }
                                                                                                                            />

                                                                                                                            {/* <ComboBox
                                                                                                                                title="professionalQualificationNameBn"
                                                                                                                                name={`educationRecruitmentDegreeSubjectDetails.${index}.professionalQualificationDetails.${index3}.ntrcaProfessionalQualificationId`}
                                                                                                                                setField={
                                                                                                                                    setFieldValue
                                                                                                                                }
                                                                                                                                formType={
                                                                                                                                    formType
                                                                                                                                }
                                                                                                                                storeName="ntrcaProfessionalQualificationId"
                                                                                                                                allValue={
                                                                                                                                    values
                                                                                                                                        ?.educationRecruitmentDegreeSubjectDetails[
                                                                                                                                        index
                                                                                                                                    ]
                                                                                                                                        ?.professionalQualificationDetails[
                                                                                                                                        index3
                                                                                                                                    ] ||
                                                                                                                                    ""
                                                                                                                                }
                                                                                                                                isMultiple={
                                                                                                                                    false
                                                                                                                                }
                                                                                                                                operationId={UrlBuilder.ntrcaApi(
                                                                                                                                    "professional-qualification/all"
                                                                                                                                )}
                                                                                                                                selectType="single"
                                                                                                                                actionTable="ntrcaProfessionalQualificationId"
                                                                                                                            ></ComboBox> */}
                                                                                                                        </td>
                                                                                                                        <td>
                                                                                                                            <InputSelect
                                                                                                                                name={`educationRecruitmentDegreeSubjectDetails.${index}.professionalQualificationDetails.${index3}.isDegreeEqv`}
                                                                                                                                value="id"
                                                                                                                                type="text"
                                                                                                                                data={[
                                                                                                                                    {
                                                                                                                                        id: true,
                                                                                                                                        name: "হ্যাঁ",
                                                                                                                                    },
                                                                                                                                    {
                                                                                                                                        id: false,
                                                                                                                                        name: "না",
                                                                                                                                    },
                                                                                                                                ]}
                                                                                                                                text="name"
                                                                                                                            />
                                                                                                                        </td>

                                                                                                                        <td className="">
                                                                                                                            <InputSelect
                                                                                                                                name={`educationRecruitmentDegreeSubjectDetails.${index}.professionalQualificationDetails.${index3}.degreeDurationYear`}
                                                                                                                                // required={true}
                                                                                                                                type="text"
                                                                                                                                value="id"
                                                                                                                                text="name"
                                                                                                                                data={[
                                                                                                                                    {
                                                                                                                                        id: 7,
                                                                                                                                        name: "6 মাস",
                                                                                                                                    },
                                                                                                                                    {
                                                                                                                                        id: 1,
                                                                                                                                        name: "1 বছর",
                                                                                                                                    },
                                                                                                                                    {
                                                                                                                                        id: 2,
                                                                                                                                        name: "2 বছর",
                                                                                                                                    },
                                                                                                                                    {
                                                                                                                                        id: 3,
                                                                                                                                        name: "3 বছর",
                                                                                                                                    },
                                                                                                                                    {
                                                                                                                                        id: 4,
                                                                                                                                        name: "4 বছর",
                                                                                                                                    },
                                                                                                                                    {
                                                                                                                                        id: 5,
                                                                                                                                        name: "5 বছর",
                                                                                                                                    },
                                                                                                                                    {
                                                                                                                                        id: 6,
                                                                                                                                        name: "6 বছর",
                                                                                                                                    },
                                                                                                                                ]}
                                                                                                                            />
                                                                                                                            <ErrorMessage fieldName="degreeDurationYear" />
                                                                                                                        </td>

                                                                                                                        <td>
                                                                                                                            <div
                                                                                                                                style={{
                                                                                                                                    display:
                                                                                                                                        "inline-flex",
                                                                                                                                }}
                                                                                                                            >
                                                                                                                                <InputSelect
                                                                                                                                    type="text"
                                                                                                                                    name={`educationRecruitmentDegreeSubjectDetails.${index}.professionalQualificationDetails.${index3}.minDivisionClass`}
                                                                                                                                    data={
                                                                                                                                        divisionMethod
                                                                                                                                    }
                                                                                                                                    text="name"
                                                                                                                                    value="id"
                                                                                                                                    onChange={(
                                                                                                                                        e
                                                                                                                                    ) => {
                                                                                                                                        setFieldValue(
                                                                                                                                            `educationRecruitmentDegreeSubjectDetails.${index}.professionalQualificationDetails.${index3}.minDivisionClass`,
                                                                                                                                            e
                                                                                                                                                .target
                                                                                                                                                .value
                                                                                                                                        );
                                                                                                                                    }}
                                                                                                                                />
                                                                                                                                <div
                                                                                                                                    className="ml-5"
                                                                                                                                    style={{
                                                                                                                                        marginTop:
                                                                                                                                            "-8px",
                                                                                                                                    }}
                                                                                                                                >
                                                                                                                                    <InputField
                                                                                                                                        name={`educationRecruitmentDegreeSubjectDetails.${index}.professionalQualificationDetails.${index3}.cgpa`}
                                                                                                                                        type="number"
                                                                                                                                        placeholder="সিজিপিএ/জিপিএ"
                                                                                                                                    />
                                                                                                                                </div>
                                                                                                                                <div
                                                                                                                                    className="ml-5"
                                                                                                                                    style={{
                                                                                                                                        marginTop:
                                                                                                                                            "-8px",
                                                                                                                                    }}
                                                                                                                                >
                                                                                                                                    <InputField
                                                                                                                                        name={`educationRecruitmentDegreeSubjectDetails.${index}.professionalQualificationDetails.${index3}.minimumNumber`}
                                                                                                                                        type="number"
                                                                                                                                        placeholder="নম্বর"
                                                                                                                                    />
                                                                                                                                </div>
                                                                                                                            </div>
                                                                                                                        </td>

                                                                                                                        <td>
                                                                                                                            <InputSelectApi
                                                                                                                                name={`educationRecruitmentDegreeSubjectDetails.${index}.professionalQualificationDetails.${index3}.boardId`}
                                                                                                                                operationId={UrlBuilder.ntrcaApi(
                                                                                                                                    "board/all"
                                                                                                                                )}
                                                                                                                                storeName="boardName"
                                                                                                                                value="id"
                                                                                                                                text="boardNameBn"
                                                                                                                                onChange={(
                                                                                                                                    e
                                                                                                                                ) =>
                                                                                                                                    setFieldValue(
                                                                                                                                        `educationRecruitmentDegreeSubjectDetails.${index}.professionalQualificationDetails.${index3}.boardId`,
                                                                                                                                        e
                                                                                                                                            .target
                                                                                                                                            .value
                                                                                                                                    )
                                                                                                                                }
                                                                                                                            />

                                                                                                                            {/* <ComboBox
                                                                                                                                title="boardName"
                                                                                                                                name={`educationRecruitmentDegreeSubjectDetails.${index}.professionalQualificationDetails.${index3}.boardId`}
                                                                                                                                setField={
                                                                                                                                    setFieldValue
                                                                                                                                }
                                                                                                                                formType={
                                                                                                                                    formType
                                                                                                                                }
                                                                                                                                storeName="boardId"
                                                                                                                                allValue={
                                                                                                                                    values
                                                                                                                                        ?.educationRecruitmentDegreeSubjectDetails[
                                                                                                                                        index
                                                                                                                                    ]
                                                                                                                                        ?.professionalQualificationDetails[
                                                                                                                                        index3
                                                                                                                                    ] ||
                                                                                                                                    ""
                                                                                                                                }
                                                                                                                                isMultiple={
                                                                                                                                    false
                                                                                                                                }
                                                                                                                                operationId={UrlBuilder.ntrcaApi(
                                                                                                                                    "board/all"
                                                                                                                                )}
                                                                                                                                selectType="single"
                                                                                                                                actionTable="boardId"
                                                                                                                            ></ComboBox> */}
                                                                                                                        </td>

                                                                                                                        <td>
                                                                                                                            <InputSelect
                                                                                                                                name={`educationRecruitmentDegreeSubjectDetails.${index}.professionalQualificationDetails.${index3}.isRecognizedBoardRequired`}
                                                                                                                                value="id"
                                                                                                                                type="text"
                                                                                                                                data={[
                                                                                                                                    {
                                                                                                                                        id: true,
                                                                                                                                        name: "হ্যাঁ",
                                                                                                                                    },
                                                                                                                                    {
                                                                                                                                        id: false,
                                                                                                                                        name: "না",
                                                                                                                                    },
                                                                                                                                ]}
                                                                                                                                required={
                                                                                                                                    true
                                                                                                                                }
                                                                                                                                text="name"
                                                                                                                            />
                                                                                                                        </td>

                                                                                                                        <td>
                                                                                                                            <div
                                                                                                                                style={{
                                                                                                                                    width: "max-content",
                                                                                                                                }}
                                                                                                                            >
                                                                                                                                <InputSelect
                                                                                                                                    name={`educationRecruitmentDegreeSubjectDetails.${index}.professionalQualificationDetails.${index3}.isAndOr`}
                                                                                                                                    value="id"
                                                                                                                                    type="text"
                                                                                                                                    data={[
                                                                                                                                        {
                                                                                                                                            id: "AND",
                                                                                                                                            name: "এবং",
                                                                                                                                        },
                                                                                                                                        {
                                                                                                                                            id: "OR",
                                                                                                                                            name: "অথবা",
                                                                                                                                        },
                                                                                                                                    ]}
                                                                                                                                    required={
                                                                                                                                        true
                                                                                                                                    }
                                                                                                                                    text="name"
                                                                                                                                    onChange={(
                                                                                                                                        e
                                                                                                                                    ) => {
                                                                                                                                        if (
                                                                                                                                            e
                                                                                                                                                .target
                                                                                                                                                .value ==
                                                                                                                                            ""
                                                                                                                                        ) {
                                                                                                                                            setFieldValue(
                                                                                                                                                `educationRecruitmentDegreeSubjectDetails.${index}.professionalQualificationDetails.${index3}.isAndOr`,
                                                                                                                                                "NONE"
                                                                                                                                            );
                                                                                                                                        } else {
                                                                                                                                            setFieldValue(
                                                                                                                                                `educationRecruitmentDegreeSubjectDetails.${index}.professionalQualificationDetails.${index3}.isAndOr`,
                                                                                                                                                e
                                                                                                                                                    .target
                                                                                                                                                    .value
                                                                                                                                            );
                                                                                                                                        }
                                                                                                                                    }}
                                                                                                                                />
                                                                                                                            </div>
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
                                                                                                                                {index3 +
                                                                                                                                    1 ===
                                                                                                                                    values
                                                                                                                                        ?.educationRecruitmentDegreeSubjectDetails[
                                                                                                                                        index
                                                                                                                                    ]
                                                                                                                                        ?.professionalQualificationDetails
                                                                                                                                        ?.length && (
                                                                                                                                    <Button
                                                                                                                                        className="me-1 bg-primary"
                                                                                                                                        type="button"
                                                                                                                                        onClick={() => {
                                                                                                                                            arrayHelpers.push(
                                                                                                                                                {
                                                                                                                                                    ntrcaProfessionalQualificationId:
                                                                                                                                                        "",
                                                                                                                                                    boardId:
                                                                                                                                                        "",
                                                                                                                                                    degreeDurationYear:
                                                                                                                                                        "",
                                                                                                                                                    isRecognizedBoardRequired:
                                                                                                                                                        "",
                                                                                                                                                    isAndOr:
                                                                                                                                                        "NONE",
                                                                                                                                                    eduRecProQuaDetailParentId:
                                                                                                                                                        "",
                                                                                                                                                }
                                                                                                                                            );
                                                                                                                                        }}
                                                                                                                                    >
                                                                                                                                        <i>
                                                                                                                                            <FontAwesomeIcon
                                                                                                                                                icon={
                                                                                                                                                    faPlusSquare
                                                                                                                                                }
                                                                                                                                                className="text-light"
                                                                                                                                            />
                                                                                                                                        </i>
                                                                                                                                    </Button>
                                                                                                                                )}
                                                                                                                                {index3 +
                                                                                                                                    1 >
                                                                                                                                1 ? (
                                                                                                                                    <Button
                                                                                                                                        variant="danger"
                                                                                                                                        className="bg-danger"
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
                                                                                                                                                    if (
                                                                                                                                                        formType ==
                                                                                                                                                            "edit" &&
                                                                                                                                                        values
                                                                                                                                                            ?.educationRecruitmentDegreeSubjectDetails[
                                                                                                                                                            index
                                                                                                                                                        ]
                                                                                                                                                            ?.professionalQualificationDetails[
                                                                                                                                                            index3
                                                                                                                                                        ][
                                                                                                                                                            "id"
                                                                                                                                                        ]
                                                                                                                                                    ) {
                                                                                                                                                        // deleteDegreeCriteria(
                                                                                                                                                        //     main[
                                                                                                                                                        //         index
                                                                                                                                                        //     ]
                                                                                                                                                        //         .addition[
                                                                                                                                                        //         index2
                                                                                                                                                        //     ][
                                                                                                                                                        //         "id"
                                                                                                                                                        //     ]
                                                                                                                                                        // );
                                                                                                                                                    }
                                                                                                                                                    willDelete &&
                                                                                                                                                        arrayHelpers.remove(
                                                                                                                                                            index3
                                                                                                                                                        );
                                                                                                                                                }
                                                                                                                                            );
                                                                                                                                        }}
                                                                                                                                    >
                                                                                                                                        <i>
                                                                                                                                            <FontAwesomeIcon
                                                                                                                                                icon={
                                                                                                                                                    faTrashAlt
                                                                                                                                                }
                                                                                                                                                className="text-light"
                                                                                                                                            />
                                                                                                                                        </i>
                                                                                                                                    </Button>
                                                                                                                                ) : null}
                                                                                                                            </div>
                                                                                                                        </td>
                                                                                                                    </tr>
                                                                                                                </tbody>
                                                                                                            )
                                                                                                        )}
                                                                                                    </Table>
                                                                                                </div>
                                                                                            </>
                                                                                        )}
                                                                                    />

                                                                                    <FieldArray
                                                                                        name={`educationRecruitmentDegreeSubjectDetails.${index}.preferableList`}
                                                                                        render={(
                                                                                            arrayHelpers
                                                                                        ) => (
                                                                                            <>
                                                                                                <div className="table-responsive mt-10">
                                                                                                    <Table className="table mb-15 table table-sm table-bordered">
                                                                                                        <thead>
                                                                                                            <tr>
                                                                                                                <th>
                                                                                                                    অগ্রাধিকার
                                                                                                                    ডিগ্রী
                                                                                                                </th>
                                                                                                                <th>
                                                                                                                    ডিগ্রীর
                                                                                                                    সময়কাল(বছর){" "}
                                                                                                                </th>
                                                                                                                <th>
                                                                                                                    নূন্যতম
                                                                                                                    গ্রেডিং/
                                                                                                                    ডিভিশন/
                                                                                                                    নম্বর
                                                                                                                </th>

                                                                                                                <th>
                                                                                                                    শিক্ষা
                                                                                                                    বোর্ডের
                                                                                                                    নাম
                                                                                                                </th>

                                                                                                                <th>
                                                                                                                    স্বীকৃত
                                                                                                                    শিক্ষা
                                                                                                                    বোর্ডের
                                                                                                                    থেকে
                                                                                                                    পাসকৃত
                                                                                                                    আবশ্যক
                                                                                                                    ?
                                                                                                                </th>

                                                                                                                {/* <th>
                                                                                                            সম্পর্ক
                                                                                                        </th>

                                                                                                        <th className="text-center">
                                                                                                            Add/Remove
                                                                                                        </th> */}
                                                                                                            </tr>
                                                                                                        </thead>
                                                                                                        {values?.educationRecruitmentDegreeSubjectDetails[
                                                                                                            index
                                                                                                        ].preferableList.map(
                                                                                                            (
                                                                                                                item,
                                                                                                                index4
                                                                                                            ) => (
                                                                                                                <tbody
                                                                                                                    key={
                                                                                                                        index4
                                                                                                                    }
                                                                                                                    className="degree-tb-bd"
                                                                                                                >
                                                                                                                    <tr>
                                                                                                                        <td>
                                                                                                                            <InputSelectApi
                                                                                                                                name={`educationRecruitmentDegreeSubjectDetails.${index}.preferableList.${index4}.ntrcaProfessionalQualificationId`}
                                                                                                                                operationId={UrlBuilder.ntrcaApi(
                                                                                                                                    "professional-qualification/all"
                                                                                                                                )}
                                                                                                                                storeName="professionalQualificationNameBn"
                                                                                                                                value="id"
                                                                                                                                text="professionalQualificationNameBn"
                                                                                                                                onChange={(
                                                                                                                                    e
                                                                                                                                ) =>
                                                                                                                                    setFieldValue(
                                                                                                                                        `educationRecruitmentDegreeSubjectDetails.${index}.preferableList.${index4}.ntrcaProfessionalQualificationId`,
                                                                                                                                        e
                                                                                                                                            .target
                                                                                                                                            .value
                                                                                                                                    )
                                                                                                                                }
                                                                                                                            />

                                                                                                                            {/* <ComboBox
                                                                                                                                title="professionalQualificationNameBn"
                                                                                                                                name={`educationRecruitmentDegreeSubjectDetails.${index}.preferableList.${index4}.ntrcaProfessionalQualificationId`}
                                                                                                                                setField={
                                                                                                                                    setFieldValue
                                                                                                                                }
                                                                                                                                formType={
                                                                                                                                    formType
                                                                                                                                }
                                                                                                                                storeName="ntrcaProfessionalQualificationId"
                                                                                                                                allValue={
                                                                                                                                    values
                                                                                                                                        ?.educationRecruitmentDegreeSubjectDetails[
                                                                                                                                        index
                                                                                                                                    ]
                                                                                                                                        ?.preferableList[
                                                                                                                                        index4
                                                                                                                                    ] ||
                                                                                                                                    ""
                                                                                                                                }
                                                                                                                                isMultiple={
                                                                                                                                    false
                                                                                                                                }
                                                                                                                                operationId={UrlBuilder.ntrcaApi(
                                                                                                                                    "professional-qualification/all"
                                                                                                                                )}
                                                                                                                                selectType="single"
                                                                                                                                actionTable="ntrcaProfessionalQualificationId"
                                                                                                                            ></ComboBox> */}
                                                                                                                        </td>

                                                                                                                        <td className="">
                                                                                                                            <InputSelect
                                                                                                                                name={`educationRecruitmentDegreeSubjectDetails.${index}.preferableList.${index4}.degreeDurationYear`}
                                                                                                                                // required={true}
                                                                                                                                type="text"
                                                                                                                                value="id"
                                                                                                                                text="name"
                                                                                                                                data={[
                                                                                                                                    {
                                                                                                                                        id: 7,
                                                                                                                                        name: "6 মাস",
                                                                                                                                    },
                                                                                                                                    {
                                                                                                                                        id: 1,
                                                                                                                                        name: "1 বছর",
                                                                                                                                    },
                                                                                                                                    {
                                                                                                                                        id: 2,
                                                                                                                                        name: "2 বছর",
                                                                                                                                    },
                                                                                                                                    {
                                                                                                                                        id: 3,
                                                                                                                                        name: "3 বছর",
                                                                                                                                    },
                                                                                                                                    {
                                                                                                                                        id: 4,
                                                                                                                                        name: "4 বছর",
                                                                                                                                    },
                                                                                                                                    {
                                                                                                                                        id: 5,
                                                                                                                                        name: "5 বছর",
                                                                                                                                    },
                                                                                                                                    {
                                                                                                                                        id: 6,
                                                                                                                                        name: "6 বছর",
                                                                                                                                    },
                                                                                                                                ]}
                                                                                                                            />
                                                                                                                            <ErrorMessage fieldName="degreeDurationYear" />
                                                                                                                        </td>

                                                                                                                        <td>
                                                                                                                            <div
                                                                                                                                style={{
                                                                                                                                    display:
                                                                                                                                        "inline-flex",
                                                                                                                                }}
                                                                                                                            >
                                                                                                                                <InputSelect
                                                                                                                                    type="text"
                                                                                                                                    name={`educationRecruitmentDegreeSubjectDetails.${index}.preferableList.${index4}.minDivisionClass`}
                                                                                                                                    data={
                                                                                                                                        divisionMethod
                                                                                                                                    }
                                                                                                                                    text="name"
                                                                                                                                    value="id"
                                                                                                                                    onChange={(
                                                                                                                                        e
                                                                                                                                    ) => {
                                                                                                                                        setFieldValue(
                                                                                                                                            `educationRecruitmentDegreeSubjectDetails.${index}.preferableList.${index4}.minDivisionClass`,
                                                                                                                                            e
                                                                                                                                                .target
                                                                                                                                                .value
                                                                                                                                        );
                                                                                                                                    }}
                                                                                                                                />
                                                                                                                                <div
                                                                                                                                    className="ml-5"
                                                                                                                                    style={{
                                                                                                                                        marginTop:
                                                                                                                                            "-8px",
                                                                                                                                    }}
                                                                                                                                >
                                                                                                                                    <InputField
                                                                                                                                        name={`educationRecruitmentDegreeSubjectDetails.${index}.preferableList.${index4}.cgpa`}
                                                                                                                                        type="number"
                                                                                                                                        placeholder="সিজিপিএ/জিপিএ"
                                                                                                                                    />
                                                                                                                                </div>
                                                                                                                                <div
                                                                                                                                    className="ml-5"
                                                                                                                                    style={{
                                                                                                                                        marginTop:
                                                                                                                                            "-8px",
                                                                                                                                    }}
                                                                                                                                >
                                                                                                                                    <InputField
                                                                                                                                        name={`educationRecruitmentDegreeSubjectDetails.${index}.preferableList.${index4}.minimumNumber`}
                                                                                                                                        type="number"
                                                                                                                                        placeholder="নম্বর"
                                                                                                                                    />
                                                                                                                                </div>
                                                                                                                            </div>
                                                                                                                        </td>

                                                                                                                        <td>
                                                                                                                            <InputSelectApi
                                                                                                                                name={`educationRecruitmentDegreeSubjectDetails.${index}.preferableList.${index4}.boardId`}
                                                                                                                                operationId={UrlBuilder.ntrcaApi(
                                                                                                                                    "board/all"
                                                                                                                                )}
                                                                                                                                storeName="boardName"
                                                                                                                                value="id"
                                                                                                                                text="boardNameBn"
                                                                                                                                onChange={(
                                                                                                                                    e
                                                                                                                                ) =>
                                                                                                                                    setFieldValue(
                                                                                                                                        `educationRecruitmentDegreeSubjectDetails.${index}.preferableList.${index4}.boardId`,
                                                                                                                                        e
                                                                                                                                            .target
                                                                                                                                            .value
                                                                                                                                    )
                                                                                                                                }
                                                                                                                            />

                                                                                                                            {/* <ComboBox
                                                                                                                                title="boardName"
                                                                                                                                name={`educationRecruitmentDegreeSubjectDetails.${index}.preferableList.${index4}.boardId`}
                                                                                                                                setField={
                                                                                                                                    setFieldValue
                                                                                                                                }
                                                                                                                                formType={
                                                                                                                                    formType
                                                                                                                                }
                                                                                                                                storeName="boardId"
                                                                                                                                allValue={
                                                                                                                                    values
                                                                                                                                        ?.educationRecruitmentDegreeSubjectDetails[
                                                                                                                                        index
                                                                                                                                    ]
                                                                                                                                        ?.preferableList[
                                                                                                                                        index4
                                                                                                                                    ] ||
                                                                                                                                    ""
                                                                                                                                }
                                                                                                                                isMultiple={
                                                                                                                                    false
                                                                                                                                }
                                                                                                                                operationId={UrlBuilder.ntrcaApi(
                                                                                                                                    "board/all"
                                                                                                                                )}
                                                                                                                                selectType="single"
                                                                                                                                actionTable="boardId"
                                                                                                                            ></ComboBox> */}
                                                                                                                        </td>

                                                                                                                        <td>
                                                                                                                            <InputSelect
                                                                                                                                name={`educationRecruitmentDegreeSubjectDetails.${index}.preferableList.${index4}.isRecognizedBoardRequired`}
                                                                                                                                value="id"
                                                                                                                                type="text"
                                                                                                                                data={[
                                                                                                                                    {
                                                                                                                                        id: true,
                                                                                                                                        name: "হ্যাঁ",
                                                                                                                                    },
                                                                                                                                    {
                                                                                                                                        id: false,
                                                                                                                                        name: "না",
                                                                                                                                    },
                                                                                                                                ]}
                                                                                                                                required={
                                                                                                                                    true
                                                                                                                                }
                                                                                                                                text="name"
                                                                                                                            />
                                                                                                                        </td>
                                                                                                                    </tr>
                                                                                                                </tbody>
                                                                                                            )
                                                                                                        )}
                                                                                                    </Table>
                                                                                                </div>
                                                                                            </>
                                                                                        )}
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
                                                                                                ?.educationRecruitmentDegreeSubjectDetails
                                                                                                ?.length && (
                                                                                            <Button
                                                                                                className="me-1 bg-primary"
                                                                                                type="button"
                                                                                                onClick={() => {
                                                                                                    arrayHelpers.push(
                                                                                                        {
                                                                                                            // id: "",
                                                                                                            educationDegreeId:
                                                                                                                "",
                                                                                                            degreeSubjectIds:
                                                                                                                [],
                                                                                                            degreeDurationYear:
                                                                                                                "",
                                                                                                            minDivisionClass:
                                                                                                                "",
                                                                                                            cgpa: "",
                                                                                                            minimumNumber:
                                                                                                                "",
                                                                                                            boardId:
                                                                                                                "",
                                                                                                            departmentIdOrGroupId:
                                                                                                                "",
                                                                                                            isRecognizedUniInstRequired:
                                                                                                                "",
                                                                                                            isRecognizedBoardRequired:
                                                                                                                "",
                                                                                                            isDegreeEqv:
                                                                                                                "",
                                                                                                            tradeId:
                                                                                                                "",
                                                                                                            additionalDetails:
                                                                                                                [
                                                                                                                    {
                                                                                                                        // id: "",
                                                                                                                        educationDegreeId:
                                                                                                                            "",
                                                                                                                        degreeSubjectId:
                                                                                                                            "",
                                                                                                                        isRecognizedUniInstRequired:
                                                                                                                            "",
                                                                                                                        degreeDurationYear:
                                                                                                                            "",
                                                                                                                        boardId:
                                                                                                                            "",
                                                                                                                        minDivisionClass:
                                                                                                                            "",
                                                                                                                        cgpa: "",
                                                                                                                        minimumNumber:
                                                                                                                            "",
                                                                                                                        departmentIdOrGroupId:
                                                                                                                            "",
                                                                                                                        isRecognizedBoardRequired:
                                                                                                                            "",
                                                                                                                        tradeId:
                                                                                                                            "",
                                                                                                                        isAndOr:
                                                                                                                            "NONE",
                                                                                                                    },
                                                                                                                ],
                                                                                                            professionalQualificationDetails:
                                                                                                                [
                                                                                                                    {
                                                                                                                        // id: "",
                                                                                                                        ntrcaProfessionalQualificationId:
                                                                                                                            "",
                                                                                                                        isDegreeEqv:
                                                                                                                            "",
                                                                                                                        minDivisionClass:
                                                                                                                            "",
                                                                                                                        cgpa: "",
                                                                                                                        minimumNumber:
                                                                                                                            "",
                                                                                                                        boardId:
                                                                                                                            "",
                                                                                                                        degreeDurationYear:
                                                                                                                            "",
                                                                                                                        isRecognizedBoardRequired:
                                                                                                                            "",
                                                                                                                        isAndOr:
                                                                                                                            "NONE",
                                                                                                                        eduRecProQuaDetailParentId:
                                                                                                                            "",
                                                                                                                    },
                                                                                                                ],

                                                                                                            preferableList:
                                                                                                                [
                                                                                                                    {
                                                                                                                        // id: "",
                                                                                                                        ntrcaProfessionalQualificationId:
                                                                                                                            "",
                                                                                                                        boardId:
                                                                                                                            "",
                                                                                                                        minDivisionClass:
                                                                                                                            "",
                                                                                                                        cgpa: "",
                                                                                                                        minimumNumber:
                                                                                                                            "",
                                                                                                                        degreeDurationYear:
                                                                                                                            "",
                                                                                                                        isRecognizedBoardRequired:
                                                                                                                            "",
                                                                                                                    },
                                                                                                                ],
                                                                                                        }
                                                                                                    );
                                                                                                }}
                                                                                            >
                                                                                                <i>
                                                                                                    <FontAwesomeIcon
                                                                                                        icon={
                                                                                                            faPlusSquare
                                                                                                        }
                                                                                                        className="text-light"
                                                                                                    />
                                                                                                    অথবা
                                                                                                </i>
                                                                                            </Button>
                                                                                        )}
                                                                                        {index +
                                                                                            1 >
                                                                                            1 && (
                                                                                            <Button
                                                                                                variant="danger"
                                                                                                className="bg-danger"
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
                                                                                                            if (
                                                                                                                formType ==
                                                                                                                    "edit" &&
                                                                                                                values
                                                                                                                    ?.educationRecruitmentDegreeSubjectDetails[
                                                                                                                    index
                                                                                                                ][
                                                                                                                    "id"
                                                                                                                ]
                                                                                                            ) {
                                                                                                                // deleteCriteria(
                                                                                                                //     main[
                                                                                                                //         index
                                                                                                                //     ][
                                                                                                                //         "id"
                                                                                                                //     ]
                                                                                                                // );
                                                                                                            }
                                                                                                            willDelete &&
                                                                                                                arrayHelpers.remove(
                                                                                                                    index
                                                                                                                );
                                                                                                        }
                                                                                                    );
                                                                                                }}
                                                                                            >
                                                                                                <i>
                                                                                                    <FontAwesomeIcon
                                                                                                        icon={
                                                                                                            faTrashAlt
                                                                                                        }
                                                                                                        className="text-light"
                                                                                                    />
                                                                                                </i>
                                                                                            </Button>
                                                                                        )}
                                                                                    </div>
                                                                                </td>
                                                                            </tr>
                                                                        </>
                                                                    )
                                                                )}
                                                        </thead>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </Row>
                                </div>
                            )}
                        />
                    </div>
                </Col>

                <Col md={12} className="mt-20">
                    <FieldArray
                        name="experienceRequirementDetails"
                        render={(arrayHelpers) => (
                            <div>
                                <Row>
                                    <div className="col-lg-12  col-md-12">
                                        <div className="row">
                                            <div className="table-responsive">
                                                <table className="user-table align-items-center table table-hover table-bordered">
                                                    <thead>
                                                        <tr>
                                                            <th>#</th>
                                                            <th>
                                                                <b>
                                                                    নিয়োগের
                                                                    জন্যে
                                                                    অভিজ্ঞতা
                                                                    (ন্যূনতম)
                                                                </b>
                                                            </th>
                                                            <th>Action</th>
                                                        </tr>

                                                        {values?.experienceRequirementDetails &&
                                                            values
                                                                ?.experienceRequirementDetails
                                                                ?.length > 0 &&
                                                            values?.experienceRequirementDetails.map(
                                                                (
                                                                    item,
                                                                    index
                                                                ) => (
                                                                    <>
                                                                        <tr
                                                                            key={
                                                                                index
                                                                            }
                                                                        >
                                                                            <td className="wd-50">
                                                                                {index +
                                                                                    1}
                                                                            </td>
                                                                            <td className="add-circularselect">
                                                                                <div className="table-responsive mt-10">
                                                                                    <Table className="table mb-15 table table-sm table-bordered">
                                                                                        <thead>
                                                                                            <tr>
                                                                                                <th
                                                                                                    style={{
                                                                                                        backgroundColor:
                                                                                                            "forestgreen",
                                                                                                    }}
                                                                                                >
                                                                                                    বিষয়ভিত্তিক
                                                                                                    পদবি
                                                                                                </th>
                                                                                                <th
                                                                                                    style={{
                                                                                                        backgroundColor:
                                                                                                            "forestgreen",
                                                                                                    }}
                                                                                                >
                                                                                                    অভিজ্ঞতার
                                                                                                    ধরন
                                                                                                </th>
                                                                                                <th
                                                                                                    style={{
                                                                                                        backgroundColor:
                                                                                                            "forestgreen",
                                                                                                    }}
                                                                                                >
                                                                                                    এমপিও
                                                                                                    হিসেবে
                                                                                                    অভিজ্ঞতা
                                                                                                    আবশ্যক
                                                                                                    ?
                                                                                                </th>
                                                                                                <th
                                                                                                    style={{
                                                                                                        backgroundColor:
                                                                                                            "forestgreen",
                                                                                                    }}
                                                                                                >
                                                                                                    সর্বোচ্চ
                                                                                                    বয়স
                                                                                                    সীমা(বছর)
                                                                                                </th>
                                                                                                <th
                                                                                                    style={{
                                                                                                        backgroundColor:
                                                                                                            "forestgreen",
                                                                                                    }}
                                                                                                >
                                                                                                    এমপিও
                                                                                                    হিসেবে
                                                                                                    অভিজ্ঞতা
                                                                                                    (বছর)
                                                                                                </th>
                                                                                                <th
                                                                                                    style={{
                                                                                                        backgroundColor:
                                                                                                            "forestgreen",
                                                                                                    }}
                                                                                                >
                                                                                                    এমপিও(নন)
                                                                                                    হিসেবে
                                                                                                    অভিজ্ঞতা
                                                                                                    (বছর)
                                                                                                </th>
                                                                                                <th
                                                                                                    style={{
                                                                                                        backgroundColor:
                                                                                                            "forestgreen",
                                                                                                    }}
                                                                                                >
                                                                                                    {" "}
                                                                                                    ইনডেক্স
                                                                                                    ধারী
                                                                                                    হিসেবে
                                                                                                    অভিজ্ঞতা
                                                                                                    (বছর)
                                                                                                </th>

                                                                                                <th
                                                                                                    style={{
                                                                                                        backgroundColor:
                                                                                                            "forestgreen",
                                                                                                    }}
                                                                                                >
                                                                                                    {" "}
                                                                                                    মোট
                                                                                                    অভিজ্ঞতা
                                                                                                    (বছর)
                                                                                                </th>
                                                                                                <th
                                                                                                    style={{
                                                                                                        backgroundColor:
                                                                                                            "forestgreen",
                                                                                                    }}
                                                                                                >
                                                                                                    ইনডেক্স
                                                                                                    ধারী
                                                                                                    হতে
                                                                                                    হবে
                                                                                                    কিনা?
                                                                                                </th>
                                                                                                <th
                                                                                                    style={{
                                                                                                        backgroundColor:
                                                                                                            "forestgreen",
                                                                                                    }}
                                                                                                >
                                                                                                    সমপদের
                                                                                                    ইনডেক্স
                                                                                                    ধারীদের
                                                                                                    জন্য
                                                                                                    বয়সসীমা
                                                                                                    শিথিল
                                                                                                    যোগ্য
                                                                                                    কিনা?
                                                                                                </th>
                                                                                            </tr>
                                                                                        </thead>

                                                                                        <tbody className="degree-tb-bd">
                                                                                            <tr
                                                                                                key={
                                                                                                    item +
                                                                                                    index
                                                                                                }
                                                                                            >
                                                                                                <td>
                                                                                                    <InputSelectApi
                                                                                                        name={`experienceRequirementDetails.${index}.postSubjectEducationLevelMappingId`}
                                                                                                        operationId={UrlBuilder.ntrcaApi(
                                                                                                            "post-subject-education-level-mapping/all"
                                                                                                        )}
                                                                                                        storeName="postSubjectEducationLevelMappingName"
                                                                                                        value="postSubjectEducationLevelMappingId"
                                                                                                        text="postSubjectEducationLevelMappingNameBn"
                                                                                                        type="number"
                                                                                                    />
                                                                                                </td>

                                                                                                <td>
                                                                                                    <div
                                                                                                        style={{
                                                                                                            width: "max-content",
                                                                                                        }}
                                                                                                    >
                                                                                                        <InputSelect
                                                                                                            name={`experienceRequirementDetails.${index}.experienceType`}
                                                                                                            value="id"
                                                                                                            type="text"
                                                                                                            data={[
                                                                                                                {
                                                                                                                    id: "INDUSTRIAL",
                                                                                                                    name: "শিল্পজাত",
                                                                                                                },
                                                                                                                {
                                                                                                                    id: "TEACHING",
                                                                                                                    name: "শিক্ষকতা",
                                                                                                                },
                                                                                                            ]}
                                                                                                            text="name"
                                                                                                        />
                                                                                                    </div>
                                                                                                </td>

                                                                                                <td>
                                                                                                    <InputSelect
                                                                                                        name={`experienceRequirementDetails.${index}.isMpoExperience`}
                                                                                                        value="id"
                                                                                                        type="text"
                                                                                                        data={[
                                                                                                            {
                                                                                                                id: true,
                                                                                                                name: "হ্যাঁ",
                                                                                                            },
                                                                                                            {
                                                                                                                id: false,
                                                                                                                name: "না",
                                                                                                            },
                                                                                                        ]}
                                                                                                        text="name"
                                                                                                    />
                                                                                                </td>

                                                                                                <td className="text-center">
                                                                                                    <InputSelect
                                                                                                        //label="সর্বোচ্চ বয়স সীমা(বছর)"
                                                                                                        name={`experienceRequirementDetails.${index}.maxAgeLimit`}
                                                                                                        value="id"
                                                                                                        data={
                                                                                                            year
                                                                                                        }
                                                                                                        text="name"
                                                                                                    />
                                                                                                </td>

                                                                                                <td className="text-center">
                                                                                                    <InputFieldNumber
                                                                                                        name={`experienceRequirementDetails.${index}.experienceYearMinWithMpo`}
                                                                                                        type="number"
                                                                                                        placeholder="সময়কাল"
                                                                                                    />
                                                                                                </td>
                                                                                                <td className="text-center">
                                                                                                    <InputFieldNumber
                                                                                                        name={`experienceRequirementDetails.${index}.experienceYearMin`}
                                                                                                        type="number"
                                                                                                        placeholder="সময়কাল"
                                                                                                    />
                                                                                                </td>

                                                                                                <td className="text-center">
                                                                                                    <InputFieldNumber
                                                                                                        name={`experienceRequirementDetails.${index}.experienceYearMinWithIndex`}
                                                                                                        type="number"
                                                                                                        placeholder="সময়কাল"
                                                                                                    />
                                                                                                </td>
                                                                                                <td className="text-center">
                                                                                                    <InputFieldNumber
                                                                                                        name={`experienceRequirementDetails.${index}.experienceYearMinTotal`}
                                                                                                        type="number"
                                                                                                        placeholder="সময়কাল"
                                                                                                    />
                                                                                                </td>
                                                                                                <td className="text-center">
                                                                                                    <InputSelect
                                                                                                        name={`experienceRequirementDetails.${index}.isIndexHolder`}
                                                                                                        value="id"
                                                                                                        type="text"
                                                                                                        data={[
                                                                                                            {
                                                                                                                id: true,
                                                                                                                name: "হ্যাঁ",
                                                                                                            },
                                                                                                            {
                                                                                                                id: false,
                                                                                                                name: "না",
                                                                                                            },
                                                                                                        ]}
                                                                                                        text="name"
                                                                                                    />
                                                                                                </td>

                                                                                                <td>
                                                                                                    <InputSelect
                                                                                                        name={`experienceRequirementDetails.${index}.isAgeRelaxedForSimilarDesignationHolder`}
                                                                                                        value="id"
                                                                                                        type="text"
                                                                                                        data={[
                                                                                                            {
                                                                                                                id: true,
                                                                                                                name: "হ্যাঁ",
                                                                                                            },
                                                                                                            {
                                                                                                                id: false,
                                                                                                                name: "না",
                                                                                                            },
                                                                                                        ]}
                                                                                                        text="name"
                                                                                                    />
                                                                                                </td>
                                                                                            </tr>
                                                                                        </tbody>
                                                                                    </Table>
                                                                                </div>

                                                                                {/* <td>
                                                                                    <th>
                                                                                        বিষয়ভিত্তিক
                                                                                        পদবি
                                                                                    </th>
                                                                                    <InputSelectApi
                                                                                        name={`experienceRequirementDetails.${index}.postSubjectEducationLevelMappingId`}
                                                                                        operationId={UrlBuilder.ntrcaApi(
                                                                                            "post-subject-education-level-mapping/all"
                                                                                        )}
                                                                                        storeName="postSubjectEducationLevelMappingName"
                                                                                        value="postSubjectEducationLevelMappingId"
                                                                                        text="postSubjectEducationLevelMappingNameBn"
                                                                                        type="number"
                                                                                    />
                                                                                </td>

                                                                                <td>
                                                                                    <div
                                                                                        style={{
                                                                                            width: "max-content",
                                                                                        }}
                                                                                    >
                                                                                        <th>
                                                                                            অভিজ্ঞতার
                                                                                            ধরন
                                                                                        </th>
                                                                                        <InputSelect
                                                                                            name={`experienceRequirementDetails.${index}.experienceType`}
                                                                                            value="id"
                                                                                            type="text"
                                                                                            data={[
                                                                                                {
                                                                                                    id: "INDUSTRIAL",
                                                                                                    name: "INDUSTRIAL",
                                                                                                },
                                                                                                {
                                                                                                    id: "TEACHING",
                                                                                                    name: "TEACHING",
                                                                                                },
                                                                                            ]}
                                                                                            text="name"
                                                                                        />
                                                                                       
                                                                                    </div>
                                                                                </td>

                                                                                <td>
                                                                                    <th>
                                                                                        এমপিও
                                                                                        হিসেবে
                                                                                        অভিজ্ঞতা
                                                                                        আবশ্যক
                                                                                        ?
                                                                                    </th>

                                                                                    <InputSelect
                                                                                        name={`experienceRequirementDetails.${index}.isMpoExperience`}
                                                                                        value="id"
                                                                                        type="text"
                                                                                        data={[
                                                                                            {
                                                                                                id: true,
                                                                                                name: "হ্যাঁ",
                                                                                            },
                                                                                            {
                                                                                                id: false,
                                                                                                name: "না",
                                                                                            },
                                                                                        ]}
                                                                                        text="name"
                                                                                    />
                                                                                </td>
                                                                                <td>
                                                                                    <th>
                                                                                        সর্বোচ্চ
                                                                                        বয়স
                                                                                        সীমা(বছর)
                                                                                    </th>
                                                                                    <InputSelect
                                                                                        //label="সর্বোচ্চ বয়স সীমা(বছর)"
                                                                                        name={`experienceRequirementDetails.${index}.maxAgeLimit`}
                                                                                        value="id"
                                                                                        data={
                                                                                            year
                                                                                        }
                                                                                        text="name"
                                                                                    />
                                                                                </td>

                                                                                <td className="text-center">
                                                                                    <th>
                                                                                        এমপিও
                                                                                        হিসেবে
                                                                                        অভিজ্ঞতা
                                                                                        (বছর)
                                                                                    </th>
                                                                                    <InputFieldNumber
                                                                                        name={`experienceRequirementDetails.${index}.experienceYearMinWithMpo`}
                                                                                        type="number"
                                                                                        placeholder="সময়কাল"
                                                                                    />
                                                                                </td>

                                                                                <td className="text-center">
                                                                                    <th>
                                                                                        এমপিও(নন)
                                                                                        হিসেবে
                                                                                        অভিজ্ঞতা
                                                                                        (বছর)
                                                                                    </th>
                                                                                    <InputFieldNumber
                                                                                        name={`experienceRequirementDetails.${index}.experienceYearMin`}
                                                                                        type="number"
                                                                                        placeholder="সময়কাল"
                                                                                    />
                                                                                </td>

                                                                                

                                                                                <td className="text-center">
                                                                                    <th>
                                                                                        ইনডেক্স
                                                                                        ধারী
                                                                                        হিসেবে
                                                                                        অভিজ্ঞতা
                                                                                        (বছর)
                                                                                    </th>
                                                                                    <InputFieldNumber
                                                                                        name={`experienceRequirementDetails.${index}.experienceYearMinWithIndex`}
                                                                                        type="number"
                                                                                        placeholder="সময়কাল"
                                                                                    />
                                                                                </td>

                                                                                <td className="text-center">
                                                                                    <th>
                                                                                        মোট
                                                                                        অভিজ্ঞতা
                                                                                        (বছর)
                                                                                    </th>
                                                                                    <InputFieldNumber
                                                                                        name={`experienceRequirementDetails.${index}.experienceYearMinTotal`}
                                                                                        type="number"
                                                                                        placeholder="সময়কাল"
                                                                                    />
                                                                                </td>
                                                                                <td>
                                                                                    <th>
                                                                                        ইনডেক্স
                                                                                        ধারী
                                                                                        কিনা?
                                                                                    </th>
                                                                                    <InputSelect
                                                                                        name={`experienceRequirementDetails.${index}.isIndexHolder`}
                                                                                        value="id"
                                                                                        type="text"
                                                                                        data={[
                                                                                            {
                                                                                                id: true,
                                                                                                name: "হ্যাঁ",
                                                                                            },
                                                                                            {
                                                                                                id: false,
                                                                                                name: "না",
                                                                                            },
                                                                                        ]}
                                                                                        text="name"
                                                                                    />
                                                                                </td>
                                                                                <td>
                                                                                    <th>
                                                                                        সমপদের
                                                                                        ইনডেক্স
                                                                                        ধারীদের
                                                                                        জন্য
                                                                                        বয়সসীমা
                                                                                        শিথিল
                                                                                        যোগ্য
                                                                                        কিনা?
                                                                                    </th>
                                                                                    <InputSelect
                                                                                        name={`experienceRequirementDetails.${index}.isAgeRelaxedForSimilarDesignationHolder`}
                                                                                        value="id"
                                                                                        type="text"
                                                                                        data={[
                                                                                            {
                                                                                                id: true,
                                                                                                name: "হ্যাঁ",
                                                                                            },
                                                                                            {
                                                                                                id: false,
                                                                                                name: "না",
                                                                                            },
                                                                                        ]}
                                                                                        text="name"
                                                                                    />
                                                                                </td> */}

                                                                                <FieldArray
                                                                                    name={`experienceRequirementDetails.${index}.additionalDetailList`}
                                                                                    render={(
                                                                                        arrayHelpers
                                                                                    ) => (
                                                                                        <>
                                                                                            <div className="table-responsive mt-10">
                                                                                                <Table className="table mb-15 table table-sm table-bordered">
                                                                                                    <thead>
                                                                                                        <tr>
                                                                                                            <th>
                                                                                                                অতিরিক্ত
                                                                                                                বিষয়ভিত্তিক
                                                                                                                পদবি
                                                                                                            </th>
                                                                                                            <th>
                                                                                                                অভিজ্ঞতার
                                                                                                                ধরন
                                                                                                            </th>
                                                                                                            <th>
                                                                                                                {" "}
                                                                                                                এমপিও
                                                                                                                হিসেবে
                                                                                                                অভিজ্ঞতা
                                                                                                                আবশ্যক
                                                                                                                ?
                                                                                                            </th>
                                                                                                            <th>
                                                                                                                সর্বোচ্চ
                                                                                                                বয়স
                                                                                                                সীমা(বছর)
                                                                                                            </th>
                                                                                                            <th>
                                                                                                                এমপিও
                                                                                                                হিসেবে
                                                                                                                অভিজ্ঞতা
                                                                                                                (বছর)
                                                                                                            </th>
                                                                                                            <th>
                                                                                                                এমপিও(নন)
                                                                                                                হিসেবে
                                                                                                                অভিজ্ঞতা
                                                                                                                (বছর)
                                                                                                            </th>
                                                                                                            <th>
                                                                                                                {" "}
                                                                                                                ইনডেক্স
                                                                                                                ধারী
                                                                                                                হিসেবে
                                                                                                                অভিজ্ঞতা
                                                                                                                (বছর)
                                                                                                            </th>

                                                                                                            <th>
                                                                                                                {" "}
                                                                                                                মোট
                                                                                                                অভিজ্ঞতা
                                                                                                                (বছর)
                                                                                                            </th>
                                                                                                            <th>
                                                                                                                ইনডেক্স
                                                                                                                ধারী
                                                                                                                হতে
                                                                                                                হবে
                                                                                                                কিনা?
                                                                                                            </th>
                                                                                                            <th>
                                                                                                                সমপদের
                                                                                                                ইনডেক্স
                                                                                                                ধারীদের
                                                                                                                জন্য
                                                                                                                বয়সসীমা
                                                                                                                শিথিল
                                                                                                                যোগ্য
                                                                                                                কিনা?
                                                                                                            </th>

                                                                                                            <th>
                                                                                                                সম্পর্ক
                                                                                                            </th>

                                                                                                            <th className="text-center">
                                                                                                                Add/Remove
                                                                                                            </th>
                                                                                                        </tr>
                                                                                                    </thead>
                                                                                                    {values?.experienceRequirementDetails[
                                                                                                        index
                                                                                                    ].additionalDetailList.map(
                                                                                                        (
                                                                                                            item,
                                                                                                            index2
                                                                                                        ) => (
                                                                                                            <tbody className="degree-tb-bd">
                                                                                                                <tr
                                                                                                                    key={
                                                                                                                        item +
                                                                                                                        index2
                                                                                                                    }
                                                                                                                >
                                                                                                                    <td>
                                                                                                                        <InputSelectApi
                                                                                                                            name={`experienceRequirementDetails.${index}.additionalDetailList.${index2}.postSubjectEducationLevelMappingId`}
                                                                                                                            operationId={UrlBuilder.ntrcaApi(
                                                                                                                                "post-subject-education-level-mapping/all"
                                                                                                                            )}
                                                                                                                            storeName="postSubjectEducationLevelMappingName"
                                                                                                                            value="postSubjectEducationLevelMappingId"
                                                                                                                            text="postSubjectEducationLevelMappingNameBn"
                                                                                                                            type="number"
                                                                                                                        />
                                                                                                                    </td>

                                                                                                                    <td>
                                                                                                                        <div
                                                                                                                            style={{
                                                                                                                                width: "max-content",
                                                                                                                            }}
                                                                                                                        >
                                                                                                                            <InputSelect
                                                                                                                                name={`experienceRequirementDetails.${index}.additionalDetailList.${index2}.experienceType`}
                                                                                                                                value="id"
                                                                                                                                type="text"
                                                                                                                                data={[
                                                                                                                                    {
                                                                                                                                        id: "INDUSTRIAL",
                                                                                                                                        name: "শিল্পজাত",
                                                                                                                                    },
                                                                                                                                    {
                                                                                                                                        id: "TEACHING",
                                                                                                                                        name: "শিক্ষকতা",
                                                                                                                                    },
                                                                                                                                ]}
                                                                                                                                text="name"
                                                                                                                            />
                                                                                                                        </div>
                                                                                                                    </td>

                                                                                                                    <td>
                                                                                                                        <InputSelect
                                                                                                                            name={`experienceRequirementDetails.${index}.additionalDetailList.${index2}.isMpoExperience`}
                                                                                                                            value="id"
                                                                                                                            type="text"
                                                                                                                            data={[
                                                                                                                                {
                                                                                                                                    id: true,
                                                                                                                                    name: "হ্যাঁ",
                                                                                                                                },
                                                                                                                                {
                                                                                                                                    id: false,
                                                                                                                                    name: "না",
                                                                                                                                },
                                                                                                                            ]}
                                                                                                                            text="name"
                                                                                                                        />
                                                                                                                    </td>

                                                                                                                    <td className="text-center">
                                                                                                                        <InputSelect
                                                                                                                            //label="সর্বোচ্চ বয়স সীমা(বছর)"
                                                                                                                            name={`experienceRequirementDetails.${index}.additionalDetailList.${index2}.maxAgeLimit`}
                                                                                                                            value="id"
                                                                                                                            data={
                                                                                                                                year
                                                                                                                            }
                                                                                                                            text="name"
                                                                                                                        />
                                                                                                                    </td>

                                                                                                                    <td className="text-center">
                                                                                                                        <InputFieldNumber
                                                                                                                            name={`experienceRequirementDetails.${index}.additionalDetailList.${index2}.experienceYearMinWithMpo`}
                                                                                                                            type="number"
                                                                                                                            placeholder="সময়কাল"
                                                                                                                        />
                                                                                                                    </td>
                                                                                                                    <td className="text-center">
                                                                                                                        <InputFieldNumber
                                                                                                                            name={`experienceRequirementDetails.${index}.additionalDetailList.${index2}.experienceYearMin`}
                                                                                                                            type="number"
                                                                                                                            placeholder="সময়কাল"
                                                                                                                        />
                                                                                                                    </td>

                                                                                                                    <td className="text-center">
                                                                                                                        <InputFieldNumber
                                                                                                                            name={`experienceRequirementDetails.${index}.additionalDetailList.${index2}.experienceYearMinWithIndex`}
                                                                                                                            type="number"
                                                                                                                            placeholder="সময়কাল"
                                                                                                                        />
                                                                                                                    </td>
                                                                                                                    <td className="text-center">
                                                                                                                        <InputFieldNumber
                                                                                                                            name={`experienceRequirementDetails.${index}.additionalDetailList.${index2}.experienceYearMinTotal`}
                                                                                                                            type="number"
                                                                                                                            placeholder="সময়কাল"
                                                                                                                        />
                                                                                                                    </td>
                                                                                                                    <td className="text-center">
                                                                                                                        <InputSelect
                                                                                                                            name={`experienceRequirementDetails.${index}.additionalDetailList.${index2}.isIndexHolder`}
                                                                                                                            value="id"
                                                                                                                            type="text"
                                                                                                                            data={[
                                                                                                                                {
                                                                                                                                    id: true,
                                                                                                                                    name: "হ্যাঁ",
                                                                                                                                },
                                                                                                                                {
                                                                                                                                    id: false,
                                                                                                                                    name: "না",
                                                                                                                                },
                                                                                                                            ]}
                                                                                                                            text="name"
                                                                                                                        />
                                                                                                                    </td>

                                                                                                                    <td>
                                                                                                                        <InputSelect
                                                                                                                            name={`experienceRequirementDetails.${index}.additionalDetailList.${index2}.isAgeRelaxedForSimilarDesignationHolder`}
                                                                                                                            value="id"
                                                                                                                            type="text"
                                                                                                                            data={[
                                                                                                                                {
                                                                                                                                    id: true,
                                                                                                                                    name: "হ্যাঁ",
                                                                                                                                },
                                                                                                                                {
                                                                                                                                    id: false,
                                                                                                                                    name: "না",
                                                                                                                                },
                                                                                                                            ]}
                                                                                                                            text="name"
                                                                                                                        />
                                                                                                                    </td>
                                                                                                                    <td>
                                                                                                                        <div
                                                                                                                            style={{
                                                                                                                                width: "max-content",
                                                                                                                            }}
                                                                                                                        >
                                                                                                                            <InputSelect
                                                                                                                                name={`experienceRequirementDetails.${index}.additionalDetailList.${index2}.isAndOr`}
                                                                                                                                value="id"
                                                                                                                                type="text"
                                                                                                                                data={[
                                                                                                                                    {
                                                                                                                                        id: "AND",
                                                                                                                                        name: "এবং",
                                                                                                                                    },
                                                                                                                                    {
                                                                                                                                        id: "OR",
                                                                                                                                        name: "অথবা",
                                                                                                                                    },
                                                                                                                                ]}
                                                                                                                                text="name"
                                                                                                                                onChange={(
                                                                                                                                    e
                                                                                                                                ) => {
                                                                                                                                    if (
                                                                                                                                        e
                                                                                                                                            .target
                                                                                                                                            .value ==
                                                                                                                                        ""
                                                                                                                                    ) {
                                                                                                                                        setFieldValue(
                                                                                                                                            `experienceRequirementDetails.${index}.additionalDetailList.${index2}.isAndOr`,
                                                                                                                                            "NONE"
                                                                                                                                        );
                                                                                                                                    } else {
                                                                                                                                        setFieldValue(
                                                                                                                                            `experienceRequirementDetails.${index}.additionalDetailList.${index2}.isAndOr`,
                                                                                                                                            e
                                                                                                                                                .target
                                                                                                                                                .value
                                                                                                                                        );
                                                                                                                                    }
                                                                                                                                }}
                                                                                                                            />
                                                                                                                        </div>
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
                                                                                                                            {index2 +
                                                                                                                                1 ===
                                                                                                                                values
                                                                                                                                    ?.experienceRequirementDetails[
                                                                                                                                    index
                                                                                                                                ]
                                                                                                                                    ?.additionalDetailList
                                                                                                                                    ?.length && (
                                                                                                                                <Button
                                                                                                                                    className="me-1 bg-primary"
                                                                                                                                    type="button"
                                                                                                                                    onClick={() => {
                                                                                                                                        arrayHelpers.push(
                                                                                                                                            {
                                                                                                                                                postSubjectEducationLevelMappingId:
                                                                                                                                                    "",
                                                                                                                                                isMpoExperience:
                                                                                                                                                    "",
                                                                                                                                                experienceYearMin:
                                                                                                                                                    "",
                                                                                                                                                experienceYearMinTotal:
                                                                                                                                                    "",
                                                                                                                                                experienceYearMinWithIndex:
                                                                                                                                                    "",
                                                                                                                                                experienceYearMinWithMpo:
                                                                                                                                                    "",
                                                                                                                                                maxAgeLimit:
                                                                                                                                                    "",
                                                                                                                                                experienceType:
                                                                                                                                                    "NONE",
                                                                                                                                                isAgeRelaxedForSimilarDesignationHolder:
                                                                                                                                                    "",
                                                                                                                                                isIndexHolder:
                                                                                                                                                    "",
                                                                                                                                                isAndOr:
                                                                                                                                                    "NONE",
                                                                                                                                            }
                                                                                                                                        );
                                                                                                                                    }}
                                                                                                                                >
                                                                                                                                    <i>
                                                                                                                                        <FontAwesomeIcon
                                                                                                                                            icon={
                                                                                                                                                faPlusSquare
                                                                                                                                            }
                                                                                                                                            className="text-light"
                                                                                                                                        />
                                                                                                                                    </i>
                                                                                                                                </Button>
                                                                                                                            )}
                                                                                                                            {index2 +
                                                                                                                                1 >
                                                                                                                            1 ? (
                                                                                                                                <Button
                                                                                                                                    variant="danger"
                                                                                                                                    className="bg-danger"
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
                                                                                                                                                if (
                                                                                                                                                    formType ==
                                                                                                                                                        "edit" &&
                                                                                                                                                    values
                                                                                                                                                        ?.experienceRequirementDetails[
                                                                                                                                                        index
                                                                                                                                                    ]
                                                                                                                                                        ?.additionalDetailList[
                                                                                                                                                        index2
                                                                                                                                                    ][
                                                                                                                                                        "id"
                                                                                                                                                    ]
                                                                                                                                                ) {
                                                                                                                                                    // deleteDegreeCriteria(
                                                                                                                                                    //     main[
                                                                                                                                                    //         index
                                                                                                                                                    //     ]
                                                                                                                                                    //         .addition[
                                                                                                                                                    //         index2
                                                                                                                                                    //     ][
                                                                                                                                                    //         "id"
                                                                                                                                                    //     ]
                                                                                                                                                    // );
                                                                                                                                                }
                                                                                                                                                willDelete &&
                                                                                                                                                    arrayHelpers.remove(
                                                                                                                                                        index2
                                                                                                                                                    );
                                                                                                                                            }
                                                                                                                                        );
                                                                                                                                    }}
                                                                                                                                >
                                                                                                                                    <i>
                                                                                                                                        <FontAwesomeIcon
                                                                                                                                            icon={
                                                                                                                                                faTrashAlt
                                                                                                                                            }
                                                                                                                                            className="text-light"
                                                                                                                                        />
                                                                                                                                    </i>
                                                                                                                                </Button>
                                                                                                                            ) : null}
                                                                                                                        </div>
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                            </tbody>
                                                                                                        )
                                                                                                    )}
                                                                                                </Table>
                                                                                            </div>
                                                                                        </>
                                                                                    )}
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
                                                                                            ?.experienceRequirementDetails
                                                                                            ?.length && (
                                                                                        <Button
                                                                                            className="me-1 bg-primary"
                                                                                            type="button"
                                                                                            onClick={() => {
                                                                                                arrayHelpers.push(
                                                                                                    {
                                                                                                        postSubjectEducationLevelMappingId:
                                                                                                            "",
                                                                                                        isMpoExperience:
                                                                                                            "",
                                                                                                        experienceYearMin:
                                                                                                            "",
                                                                                                        experienceYearMinTotal:
                                                                                                            "",
                                                                                                        experienceYearMinWithIndex:
                                                                                                            "",
                                                                                                        experienceYearMinWithMpo:
                                                                                                            "",
                                                                                                        maxAgeLimit:
                                                                                                            "",
                                                                                                        experienceType:
                                                                                                            "NONE",
                                                                                                        isAgeRelaxedForSimilarDesignationHolder:
                                                                                                            "",
                                                                                                        isIndexHolder:
                                                                                                            "",
                                                                                                        additionalDetailList:
                                                                                                            [
                                                                                                                {
                                                                                                                    postSubjectEducationLevelMappingId:
                                                                                                                        "",
                                                                                                                    isMpoExperience:
                                                                                                                        "",
                                                                                                                    experienceYearMin:
                                                                                                                        "",
                                                                                                                    experienceYearMinTotal:
                                                                                                                        "",
                                                                                                                    experienceYearMinWithIndex:
                                                                                                                        "",
                                                                                                                    experienceYearMinWithMpo:
                                                                                                                        "",
                                                                                                                    maxAgeLimit:
                                                                                                                        "",
                                                                                                                    experienceType:
                                                                                                                        "NONE",
                                                                                                                    isAgeRelaxedForSimilarDesignationHolder:
                                                                                                                        "",
                                                                                                                    isIndexHolder:
                                                                                                                        "",
                                                                                                                    isAndOr:
                                                                                                                        "NONE",
                                                                                                                },
                                                                                                            ],
                                                                                                    }
                                                                                                );
                                                                                            }}
                                                                                        >
                                                                                            <i>
                                                                                                <FontAwesomeIcon
                                                                                                    icon={
                                                                                                        faPlusSquare
                                                                                                    }
                                                                                                    className="text-light"
                                                                                                />
                                                                                                অথবা
                                                                                            </i>
                                                                                        </Button>
                                                                                    )}
                                                                                    {index +
                                                                                        1 >
                                                                                    1 ? (
                                                                                        <Button
                                                                                            variant="danger"
                                                                                            className="bg-danger"
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
                                                                                                        if (
                                                                                                            formType ==
                                                                                                                "edit" &&
                                                                                                            values
                                                                                                                ?.experienceRequirementDetails[
                                                                                                                index
                                                                                                            ][
                                                                                                                "id"
                                                                                                            ]
                                                                                                        ) {
                                                                                                            // deleteCriteria(
                                                                                                            //     main[
                                                                                                            //         index
                                                                                                            //     ][
                                                                                                            //         "id"
                                                                                                            //     ]
                                                                                                            // );
                                                                                                        }
                                                                                                        willDelete &&
                                                                                                            arrayHelpers.remove(
                                                                                                                index
                                                                                                            );
                                                                                                    }
                                                                                                );
                                                                                            }}
                                                                                        >
                                                                                            <i>
                                                                                                <FontAwesomeIcon
                                                                                                    icon={
                                                                                                        faTrashAlt
                                                                                                    }
                                                                                                    className="text-light"
                                                                                                />
                                                                                            </i>
                                                                                        </Button>
                                                                                    ) : null}
                                                                                </div>
                                                                            </td>
                                                                        </tr>
                                                                    </>
                                                                )
                                                            )}
                                                    </thead>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </Row>
                            </div>
                        )}
                    />
                </Col>

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
                        করুন
                    </Button>
                    <Link to="/portal/settings/regulations/list">
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

export default MpoTeacherRegulationForm;
