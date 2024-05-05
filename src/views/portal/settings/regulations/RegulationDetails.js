import { faEdit, faList, faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, Table } from "@themesberg/react-bootstrap";
import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProgressBar from "react-topbar-progress-indicator";
import { DefaultCard } from "../../../../components/card";
import { callApi, selectApi } from "../../../../reducers/apiSlice";
import { UrlBuilder } from "../../../../helpers/UrlBuilder";
import EnglishNumberToBangla from "helpers/EnglishNumberToBangla";
import { InputField } from "components/form";

const MpoTeacherRulesDetail = (props) => {
    /**
     * useDispatch: dispatch actions
     */
    const dispatch = useDispatch();

    /**
     * Get loading indicator and data from 'selectApi' state
     */
    const {
        loading,
        details = {
            data: {},
        },
    } = useSelector(selectApi);

    const getDataFromArray = (arrayOfObject, key, separator) => {
        const data = arrayOfObject.map((item) => item[key]);
        return data.join(separator);
    };

    /**
     * Get data through api call by dispatching 'callApi'.
     */
    useEffect(() => {
        dispatch(
            // callApi({
            //     operationId: UrlBuilder.ntrcaApi(
            //         `govt-regulation-recruitment-post-subject-level-grade/details/${props.match.params.id}`
            //     ),
            //     output: "details",
            // })
            callApi({
                operationId: UrlBuilder.ntrcaApi(
                    `govt-regulation-recruitment-post-subject-level-grade/nitimala-details/${props.match.params.id}`
                ),
                output: "details",
            })
        );
    }, [dispatch, props.match.params.id]);

    /**
     * cardProps must need to pass into DefaultCard component.
     * headerSlot: this is a placeholder for action buttons on card header.
     *
     * @type {{headerSlot: (function(): *), title: string}}
     */
    const cardProps = {
        title: "পদভিত্তিক ন্যূনতম যোগ্যতা দেখুন",
        headerSlot: () => (
            <>
                {
                    <Link to="/portal/settings/regulations/list">
                        <Button
                            variant="link"
                            className="f-right btn-sm p-5 btn-color"
                        >
                            <FontAwesomeIcon icon={faList} className="me-2" />{" "}
                            পদভিত্তিক ন্যূনতম যোগ্যতার তালিকা দেখুন
                        </Button>
                    </Link>
                }
            </>
        ),
    };

    return (
        <DefaultCard className="mb-50" {...cardProps}>
            {loading && <ProgressBar />}
            <Card border="white" className="table-wrapper ">
                <Card.Body>
                    {details !== undefined && details?.data !== undefined && (
                        <div className="table-responsive">
                            <Table className="table table-striped table-hover mb-15">
                                <tbody>
                                    <tr>
                                        <td className="border-0 td-width">
                                            <b>নীতিমালা</b>
                                        </td>
                                        <td className="border-0">
                                            {details?.data
                                                .govtRegulationNameBn ??
                                                details?.data
                                                    .govtRegulationName}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="border-0 td-width">
                                            <b>প্রতিষ্ঠানের ধরন </b>
                                        </td>
                                        <td className="border-0">
                                            {details?.data
                                                .instituteTypeNameBn ?? "N/A"}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="border-0 td-width">
                                            <b>প্রতিষ্ঠানের স্তর </b>
                                        </td>
                                        <td className="border-0">
                                            {details?.data
                                                .educationLevelNameBn ?? "N/A"}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="border-0 td-width">
                                            <b>বিষয়</b>
                                        </td>
                                        <td className="border-0">
                                            {details?.data?.postSubjectIdDtoList
                                                ?.length > 0 &&
                                                details?.data?.postSubjectIdDtoList.map(
                                                    (item, index) => {
                                                        return (
                                                            <span className="uldesign bg-light">
                                                                {item?.subjectNameBn ??
                                                                    "N/A"}
                                                            </span>
                                                        );
                                                    }
                                                )}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="border-0 td-width">
                                            <b>পদবি </b>
                                        </td>
                                        <td className="border-0">
                                            {details?.data?.postNameBn ??
                                                details?.data?.postName}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="border-0 td-width">
                                            <b>ধর্ম </b>
                                        </td>
                                        <td className="border-0">
                                            {details?.data?.religion === "ISLAM"
                                                ? "ইসলাম"
                                                : details?.data?.religion ===
                                                  "CHRISTIANITY"
                                                ? "খ্রিস্টান ধর্ম"
                                                : details?.data?.religion ===
                                                  "BUDDHISM"
                                                ? "বৌদ্ধ ধর্ম"
                                                : details?.data?.religion ===
                                                  "HINDUISM"
                                                ? "হিন্দু ধর্ম"
                                                : details?.data?.religion ===
                                                  "OTHER"
                                                ? "অন্যান্য"
                                                : details?.data?.religion ??
                                                  "N/A"}
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className="border-0 td-width">
                                            <b>বেতন গ্রেড</b>
                                        </td>
                                        <td className="border-0">
                                            {details?.data?.salaryGradeNameBn ??
                                                "N/A"}
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className="border-0 td-width">
                                            <b>৩য় শ্রেণী গ্রহণযোগ্য নয়</b>
                                        </td>
                                        <td className="border-0">
                                            {details?.data
                                                .maxAllowedThirdClass == 1
                                                ? "এস এস সি"
                                                : details?.data
                                                      .maxAllowedThirdClass == 2
                                                ? "এইচ এস সি"
                                                : details?.data
                                                      .maxAllowedThirdClass == 3
                                                ? "সর্বশেষ ডিগ্রি"
                                                : "প্রযোজ্য নয়" ?? "N/A"}
                                        </td>
                                    </tr>
                                    {/* <tr>
                                        <td className="border-0 td-width">
                                            <b>
                                                সমগ্র শিক্ষাজীবনে গ্রহণযোগ্য
                                                সর্বোচ্চ সংখ্যক ৩য় শ্রেণীর
                                                সংখ্যা
                                            </b>
                                        </td>
                                        <td className="border-0">
                                            {details?.data
                                                .maxAllowedThirdClassWithoutLastDegree ==
                                            1
                                                ? "১"
                                                : details?.data
                                                      .maxAllowedThirdClassWithoutLastDegree ==
                                                  2
                                                ? "২"
                                                : details?.data
                                                      .maxAllowedThirdClassWithoutLastDegree ==
                                                  3
                                                ? "৩"
                                                : details?.data
                                                      .maxAllowedThirdClassWithoutLastDegree ==
                                                  4
                                                ? "৪"
                                                : details?.data
                                                      .maxAllowedThirdClassWithoutLastDegree ==
                                                  5
                                                ? "৫"
                                                : "N/A"}
                                        </td>
                                    </tr> */}
                                </tbody>
                            </Table>
                        </div>
                    )}

                    <div className="details?.data">
                        <div className="contentBox-modified">
                            <div className="section-header-custom">
                                <h5 className="m-10 text-white">
                                    এমপিও হিসেবে শিক্ষাগত যোগ্যতা (ন্যূনতম)
                                </h5>
                            </div>
                            <div className="contentBoxBody mt-20">
                                {details?.data
                                    ?.minimumEducationalRequirements &&
                                    details?.data
                                        ?.minimumEducationalRequirements
                                        ?.length > 0 &&
                                    details?.data?.minimumEducationalRequirements.map(
                                        (item, index) => {
                                            return (
                                                <>
                                                    {index > 0 && <b>অথবা</b>}
                                                    <h5>{item}</h5>
                                                </>
                                            );
                                        }
                                    )}
                                {details?.data?.thirdClassNotApplicable ? (
                                    <>
                                        <br />
                                        <br />
                                        <b>
                                            {
                                                details?.data
                                                    ?.thirdClassNotApplicable
                                            }
                                        </b>
                                    </>
                                ) : null}
                            </div>
                        </div>
                    </div>

                    {/* <div className="details?.data">
                        <div className="contentBox-modified">
                            <div className="section-header-custom">
                                <h5 className="m-10 text-white">
                                    এমপিও হিসেবে শিক্ষাগত যোগ্যতা (ন্যূনতম)
                                </h5>
                            </div>
                            <div className="contentBoxBody mt-20"></div>

                            <div className="contentBoxBody">
                                <div className="col-lg-12  col-md-12">
                                    <div className="details?.data">
                                        <div className="table-responsive">
                                            <table className="user-table align-items-center table table-hover table-bordered">
                                                {details?.data
                                                    ?.educationRecruitmentDegreeSubjectDetails &&
                                                    details?.data
                                                        ?.educationRecruitmentDegreeSubjectDetails
                                                        ?.length > 0 &&
                                                    details?.data?.educationRecruitmentDegreeSubjectDetails.map(
                                                        (item, index) => {
                                                            return (
                                                                <>
                                                                    {index >
                                                                        0 && (
                                                                        <>
                                                                            <div className="row">
                                                                                <h3 className="align-items-center ">
                                                                                    অথবা{" "}
                                                                                </h3>
                                                                            </div>
                                                                        </>
                                                                    )}
                                                                    <tr
                                                                        key={
                                                                            item +
                                                                            index
                                                                        }
                                                                    >
                                                                        <td className="wd-100">
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
                                                                                                সর্বোচ্চ
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
                                                                                                আবশ্যক
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
                                                                                                ন্যূনতম
                                                                                                গ্রেডিং/
                                                                                                ডিভিশন
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
                                                                                            
                                                                                            {item
                                                                                                ?.degreeSubjectIds
                                                                                                ?.length >
                                                                                                0 &&
                                                                                                item?.degreeSubjectIds.map(
                                                                                                    (
                                                                                                        item,
                                                                                                        index
                                                                                                    ) => {
                                                                                                        return (
                                                                                                            <span className="uldesign">
                                                                                                                {
                                                                                                                    item?.subjectNameBn
                                                                                                                }
                                                                                                            </span>
                                                                                                        );
                                                                                                    }
                                                                                                )}
                                                                                        </td>
                                                                                        <td className="text-center">
                                                                                            <span className="uldesign">
                                                                                                {" "}
                                                                                                {item?.educationDegreeNameBn ??
                                                                                                    "N/A"}{" "}
                                                                                            </span>
                                                                                        </td>

                                                                                        <td>
                                                                                            {item?.isDegreeEqv !==
                                                                                            null
                                                                                                ? item?.isDegreeEqv
                                                                                                    ? "হ্যাঁ"
                                                                                                    : "না"
                                                                                                : "N/A"}
                                                                                        </td>
                                                                                        <td className="">
                                                                                            {item?.degreeDurationYear ??
                                                                                                "N/A"}
                                                                                        </td>
                                                                                        <td>
                                                                                            {
                                                                                                item?.tradeNameBn
                                                                                            }
                                                                                        </td>
                                                                                        <td>
                                                                                            <>
                                                                                                <div
                                                                                                    style={{
                                                                                                        display:
                                                                                                            "flex",
                                                                                                    }}
                                                                                                >
                                                                                                    <b>
                                                                                                        ডিভিশন:{" "}
                                                                                                    </b>
                                                                                                    {item?.minDivisionClass ==
                                                                                                    "1"
                                                                                                        ? "ফার্স্ট_ডিভিশন"
                                                                                                        : item?.minDivisionClass ==
                                                                                                          "2"
                                                                                                        ? "সেকেন্ড_ডিভিশন"
                                                                                                        : item?.minDivisionClass ==
                                                                                                          "3"
                                                                                                        ? "থার্ড_ডিভিশন"
                                                                                                        : "N/A"}
                                                                                                </div>

                                                                                                <b>
                                                                                                    গ্রেডিং
                                                                                                    :{" "}
                                                                                                </b>
                                                                                                {item?.cgpa ??
                                                                                                    "N/A"}
                                                                                            </>
                                                                                        </td>
                                                                                        <td>
                                                                                            {item?.departmentNameBnOrGroupNameBn ??
                                                                                                item?.departmentNameBnOrGroupName ??
                                                                                                "N/A"}
                                                                                        </td>
                                                                                        <td>
                                                                                            {item?.boardNameBn ??
                                                                                                "N/A"}
                                                                                        </td>
                                                                                        <td>
                                                                                            {item?.isRecognizedUniInstRequired !==
                                                                                            null
                                                                                                ? item?.isRecognizedUniInstRequired
                                                                                                    ? "হ্যাঁ"
                                                                                                    : "না"
                                                                                                : "N/A"}
                                                                                        </td>
                                                                                        <td>
                                                                                            {item?.isRecognizedBoardRequired !==
                                                                                            null
                                                                                                ? item?.isRecognizedBoardRequired
                                                                                                    ? "হ্যাঁ"
                                                                                                    : "না"
                                                                                                : "N/A"}
                                                                                        </td>
                                                                                    </tbody>
                                                                                </Table>
                                                                            </div>


                                                                            <>
                                                                                <div className="table-responsive mt-10">
                                                                                    <Table className="table mb-15 table table-sm table-bordered">
                                                                                        <thead>
                                                                                            <tr>
                                                                                                <th className="text-center">
                                                                                                    অতিরিক্ত
                                                                                                    ডিগ্রীর
                                                                                                    বিষয়
                                                                                                </th>

                                                                                                <th className="text-center">
                                                                                                    নিয়োগের
                                                                                                    জন্যে
                                                                                                    সর্বোচ্চ
                                                                                                    শিক্ষাগত
                                                                                                    যোগ্যতা
                                                                                                </th>

                                                                                                <th className="text-center">
                                                                                                    ডিগ্রীর
                                                                                                    সময়কাল(বছর){" "}
                                                                                                </th>

                                                                                                <th className="text-center">
                                                                                                    ট্রেডের
                                                                                                    নাম
                                                                                                </th>

                                                                                                <th className="text-center">
                                                                                                    ন্যূনতম
                                                                                                    গ্রেডিং/
                                                                                                    ডিভিশন
                                                                                                </th>

                                                                                                <th className="text-center">
                                                                                                    ডিপার্টমেন্ট/গ্রুপের
                                                                                                    নাম
                                                                                                </th>

                                                                                                <th className="text-center">
                                                                                                    শিক্ষা
                                                                                                    বোর্ডের
                                                                                                    নাম
                                                                                                </th>

                                                                                                <th className="text-center">
                                                                                                    স্বীকৃত
                                                                                                    বিশ্ববিদ্যালয়
                                                                                                    থেকে
                                                                                                    পাসকৃত
                                                                                                    আবশ্যক
                                                                                                    ?
                                                                                                </th>

                                                                                                <th className="text-center">
                                                                                                    স্বীকৃত
                                                                                                    শিক্ষা
                                                                                                    বোর্ডের
                                                                                                    থেকে
                                                                                                    পাসকৃত
                                                                                                    আবশ্যক
                                                                                                    ?
                                                                                                </th>

                                                                                                <th className="text-center">
                                                                                                    সম্পর্ক
                                                                                                </th>
                                                                                            </tr>
                                                                                        </thead>
                                                                                        {details?.data?.educationRecruitmentDegreeSubjectDetails[
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
                                                                                                            <span className="uldesign">
                                                                                                                {item?.degreeSubjectNameBn ??
                                                                                                                    "N/A"}
                                                                                                            </span>
                                                                                                        </td>
                                                                                                        <td>
                                                                                                            <span className="uldesign">
                                                                                                                {item?.educationDegreeNameBn ??
                                                                                                                    item?.educationDegreeName ??
                                                                                                                    "N/A"}
                                                                                                            </span>
                                                                                                        </td>
                                                                                                        <td>
                                                                                                            {item?.degreeDurationYear ??
                                                                                                                "N/A"}
                                                                                                        </td>
                                                                                                        <td>
                                                                                                            {item?.tradeNameBn ??
                                                                                                                "N/A"}
                                                                                                        </td>

                                                                                                        <td>
                                                                                                            <>
                                                                                                                <div
                                                                                                                    style={{
                                                                                                                        display:
                                                                                                                            "flex",
                                                                                                                    }}
                                                                                                                >
                                                                                                                    <b>
                                                                                                                        ডিভিশন:{" "}
                                                                                                                    </b>
                                                                                                                    {item?.minDivisionClass ==
                                                                                                                    "1"
                                                                                                                        ? "ফার্স্ট_ডিভিশন"
                                                                                                                        : item?.minDivisionClass ==
                                                                                                                          "2"
                                                                                                                        ? "সেকেন্ড_ডিভিশন"
                                                                                                                        : item?.minDivisionClass ==
                                                                                                                          "3"
                                                                                                                        ? "থার্ড_ডিভিশন"
                                                                                                                        : "N/A"}
                                                                                                                </div>

                                                                                                                <b>
                                                                                                                    গ্রেডিং
                                                                                                                    :{" "}
                                                                                                                </b>
                                                                                                                {item?.cgpa ??
                                                                                                                    "N/A"}
                                                                                                            </>
                                                                                                        </td>

                                                                                                        <td>
                                                                                                            {item?.departmentNameBnOrGroupNameBn ??
                                                                                                                item?.departmentNameOrGroupName ??
                                                                                                                "N/A"}
                                                                                                        </td>

                                                                                                        <td>
                                                                                                            {item?.boardNameBn ??
                                                                                                                "N/A"}
                                                                                                        </td>
                                                                                                        <td>
                                                                                                            {item?.isRecognizedUniInstRequired !==
                                                                                                            null
                                                                                                                ? item?.isRecognizedUniInstRequired
                                                                                                                    ? "হ্যাঁ"
                                                                                                                    : "না"
                                                                                                                : "N/A"}
                                                                                                        </td>

                                                                                                        <td>
                                                                                                            {item?.isRecognizedBoardRequired !==
                                                                                                            null
                                                                                                                ? item?.isRecognizedBoardRequired
                                                                                                                    ? "হ্যাঁ"
                                                                                                                    : "না"
                                                                                                                : "N/A"}
                                                                                                        </td>
                                                                                                        <td>
                                                                                                            {item?.isAndOr ===
                                                                                                            "AND"
                                                                                                                ? "এবং"
                                                                                                                : item?.isAndOr ===
                                                                                                                  "OR"
                                                                                                                ? "অথবা"
                                                                                                                : item?.isAndOr ===
                                                                                                                  null
                                                                                                                ? "N/A"
                                                                                                                : "নেই"}
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                </tbody>
                                                                                            )
                                                                                        )}
                                                                                    </Table>
                                                                                </div>
                                                                            </>

                                                                          

                                                                            <>
                                                                                <div className="table-responsive mt-10">
                                                                                    <Table className="table mb-15 table table-sm table-bordered">
                                                                                        <thead>
                                                                                            <tr>
                                                                                                <th className="text-center">
                                                                                                    প্রফেশনাল
                                                                                                    ডিগ্রী
                                                                                                </th>
                                                                                                <th className="text-center">
                                                                                                    ডিগ্রীর
                                                                                                    সময়কাল(বছর){" "}
                                                                                                </th>

                                                                                                <th className="text-center">
                                                                                                    শিক্ষা
                                                                                                    বোর্ডের
                                                                                                    নাম
                                                                                                </th>

                                                                                                <th className="text-center">
                                                                                                    স্বীকৃত
                                                                                                    শিক্ষা
                                                                                                    বোর্ডের
                                                                                                    থেকে
                                                                                                    পাসকৃত
                                                                                                    আবশ্যক
                                                                                                    ?
                                                                                                </th>

                                                                                                <th className="text-center">
                                                                                                    সম্পর্ক
                                                                                                </th>
                                                                                            </tr>
                                                                                        </thead>
                                                                                        {details?.data?.educationRecruitmentDegreeSubjectDetails[
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
                                                                                                        <td className="text-center">
                                                                                                            <span className="uldesign">
                                                                                                                {item?.ntrcaProfessionalQualificationNameBn ??
                                                                                                                    item?.ntrcaProfessionalQualificationName ??
                                                                                                                    "N/A"}
                                                                                                            </span>
                                                                                                        </td>

                                                                                                        <td className="text-center">
                                                                                                            {item?.degreeDurationYear ??
                                                                                                                "N/A"}
                                                                                                        </td>

                                                                                                        <td className="text-center">
                                                                                                            {item?.boardNameBn ??
                                                                                                                item?.boardName ??
                                                                                                                "N/A"}
                                                                                                        </td>

                                                                                                        <td className="text-center">
                                                                                                            {item?.isRecognizedBoardRequired !==
                                                                                                            null
                                                                                                                ? item?.isRecognizedBoardRequired
                                                                                                                    ? "হ্যাঁ"
                                                                                                                    : "না"
                                                                                                                : "N/A"}
                                                                                                        </td>

                                                                                                        <td className="text-center">
                                                                                                            {item?.isAndOr ===
                                                                                                            "AND"
                                                                                                                ? "এবং"
                                                                                                                : item?.isAndOr ===
                                                                                                                  "OR"
                                                                                                                ? "অথবা"
                                                                                                                : item?.isAndOr ===
                                                                                                                  null
                                                                                                                ? "N/A"
                                                                                                                : "নেই"}
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                </tbody>
                                                                                            )
                                                                                        )}
                                                                                    </Table>
                                                                                </div>
                                                                            </>

                                                                            <>
                                                                                <div className="table-responsive mt-10">
                                                                                    <Table className="table mb-15 table table-sm table-bordered">
                                                                                        <thead>
                                                                                            <tr>
                                                                                                <th className="text-center">
                                                                                                    অগ্রাধিকার
                                                                                                    ডিগ্রী
                                                                                                </th>
                                                                                                <th className="text-center">
                                                                                                    ডিগ্রীর
                                                                                                    সময়কাল(বছর){" "}
                                                                                                </th>

                                                                                                <th className="text-center">
                                                                                                    শিক্ষা
                                                                                                    বোর্ডের
                                                                                                    নাম
                                                                                                </th>

                                                                                                <th className="text-center">
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
                                                                                        {details?.data?.educationRecruitmentDegreeSubjectDetails[
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
                                                                                                        <td className="text-center">
                                                                                                            <span className="uldesign">
                                                                                                                {item?.ntrcaProfessionalQualificationNameBn ??
                                                                                                                    item?.ntrcaProfessionalQualificationName ??
                                                                                                                    "N/A"}
                                                                                                            </span>
                                                                                                        </td>

                                                                                                        <td className="text-center">
                                                                                                            {item?.degreeDurationYear ??
                                                                                                                "N/A"}
                                                                                                        </td>

                                                                                                        <td className="text-center">
                                                                                                            {item?.boardNameBn ??
                                                                                                                item?.boardName ??
                                                                                                                "N/A"}
                                                                                                        </td>

                                                                                                        <td className="text-center">
                                                                                                            {item?.isRecognizedBoardRequired !==
                                                                                                            null
                                                                                                                ? item?.isRecognizedBoardRequired
                                                                                                                    ? "হ্যাঁ"
                                                                                                                    : "না"
                                                                                                                : "N/A"}
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                </tbody>
                                                                                            )
                                                                                        )}
                                                                                    </Table>
                                                                                </div>
                                                                            </>
                                                                        </td>
                                                                    </tr>
                                                                </>
                                                            );
                                                        }
                                                    )}
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}
                    <br />

                    <div className="details?.data">
                        <div className="contentBox-modified">
                            <div className="section-header-custom">
                                <h5 className="m-10 text-white">
                                    নিয়োগের জন্যে অভিজ্ঞতা (ন্যূনতম)
                                </h5>
                            </div>
                            <div className="contentBoxBody mt-20">
                                {details?.data?.experienceAndAgeRequirements &&
                                    details?.data?.experienceAndAgeRequirements
                                        ?.length > 0 &&
                                    details?.data?.experienceAndAgeRequirements.map(
                                        (item, index) => {
                                            return (
                                                <>
                                                    {index > 0 && <b>অথবা</b>}
                                                    <h5>{item}</h5>
                                                </>
                                            );
                                        }
                                    )}
                            </div>
                        </div>
                    </div>

                    {/* <div className="details?.data">
                        <div className="contentBox-modified">
                            <div className="section-header-custom">
                                <h5 className="m-10 text-white">
                                    নিয়োগের জন্যে অভিজ্ঞতা (ন্যূনতম)
                                </h5>
                            </div>
                            <div className="contentBoxBody mt-20"></div>

                            <div className="contentBoxBody">
                                <div className="col-lg-12  col-md-12">
                                    <div className="details?.data">
                                        <div className="table-responsive">
                                            <table className="user-table align-items-center table table-hover table-bordered">
                                                {details?.data
                                                    ?.experienceRequirementDetails &&
                                                    details?.data
                                                        ?.experienceRequirementDetails
                                                        ?.length > 0 &&
                                                    details?.data?.experienceRequirementDetails.map(
                                                        (item, index) => (
                                                            <>
                                                                {index > 0 && (
                                                                    <>
                                                                        <div className="row">
                                                                            <h3 className="align-items-center ">
                                                                                অথবা{" "}
                                                                            </h3>
                                                                        </div>
                                                                    </>
                                                                )}
                                                                <tr key={index}>
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
                                                                                            <span className="uldesign">
                                                                                                {item?.postSubjectEducationLevelMappingNameBn ??
                                                                                                    "N/A"}
                                                                                            </span>
                                                                                        </td>
                                                                                        <td>
                                                                                            {item?.experienceType ??
                                                                                                "N/A"}
                                                                                        </td>
                                                                                        <td>
                                                                                            {item?.isMpoExperience !==
                                                                                            null
                                                                                                ? item?.isMpoExperience
                                                                                                    ? "হ্যাঁ"
                                                                                                    : "না"
                                                                                                : "N/A"}
                                                                                        </td>
                                                                                        <td>
                                                                                            {item?.maxAgeLimit ??
                                                                                                "N/A"}
                                                                                        </td>
                                                                                        <td className="text-center">
                                                                                            {item?.experienceYearMinWithMpo ??
                                                                                                "N/A"}
                                                                                        </td>
                                                                                        <td className="text-center">
                                                                                            {item?.experienceYearMin ??
                                                                                                "N/A"}
                                                                                        </td>
                                                                                        <td className="text-center">
                                                                                            {item?.experienceYearMinWithIndex ??
                                                                                                "N/A"}
                                                                                        </td>
                                                                                        <td className="text-center">
                                                                                            {item?.experienceYearMinTotal ??
                                                                                                "N/A"}
                                                                                        </td>
                                                                                        <td>
                                                                                            {item?.isRecognizedBoardRequired !==
                                                                                            null
                                                                                                ? item?.isRecognizedBoardRequired
                                                                                                    ? "হ্যাঁ"
                                                                                                    : "না"
                                                                                                : "N/A"}
                                                                                        </td>
                                                                                        <td>
                                                                                            {item?.isAgeRelaxedForSimilarDesignationHolder !==
                                                                                            null
                                                                                                ? item?.isAgeRelaxedForSimilarDesignationHolder
                                                                                                    ? "হ্যাঁ"
                                                                                                    : "না"
                                                                                                : "N/A"}
                                                                                        </td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            </Table>
                                                                        </div>

                                                                        <>
                                                                            <div className="table-responsive mt-10">
                                                                                <Table className="table mb-15 table table-sm table-bordered">
                                                                                    <thead>
                                                                                        <tr>
                                                                                            <th className="text-center">
                                                                                                অতিরিক্ত
                                                                                                বিষয়ভিত্তিক
                                                                                                পদবি
                                                                                            </th>
                                                                                            <th className="text-center">
                                                                                                অভিজ্ঞতার
                                                                                                ধরন
                                                                                            </th>
                                                                                            <th className="text-center">
                                                                                                {" "}
                                                                                                এমপিও
                                                                                                হিসেবে
                                                                                                অভিজ্ঞতা
                                                                                                আবশ্যক
                                                                                                ?
                                                                                            </th>
                                                                                            <th className="text-center">
                                                                                                সর্বোচ্চ
                                                                                                বয়স
                                                                                                সীমা(বছর)
                                                                                            </th>
                                                                                            <th className="text-center">
                                                                                                এমপিও
                                                                                                হিসেবে
                                                                                                অভিজ্ঞতা
                                                                                                (বছর)
                                                                                            </th>
                                                                                            <th className="text-center">
                                                                                                এমপিও(নন)
                                                                                                হিসেবে
                                                                                                অভিজ্ঞতা
                                                                                                (বছর)
                                                                                            </th>
                                                                                            <th className="text-center">
                                                                                                {" "}
                                                                                                ইনডেক্স
                                                                                                ধারী
                                                                                                হিসেবে
                                                                                                অভিজ্ঞতা
                                                                                                (বছর)
                                                                                            </th>

                                                                                            <th className="text-center">
                                                                                                {" "}
                                                                                                মোট
                                                                                                অভিজ্ঞতা
                                                                                                (বছর)
                                                                                            </th>
                                                                                            <th className="text-center">
                                                                                                ইনডেক্স
                                                                                                ধারী
                                                                                                কিনা?
                                                                                            </th>
                                                                                            <th className="text-center">
                                                                                                সমপদের
                                                                                                ইনডেক্স
                                                                                                ধারীদের
                                                                                                জন্য
                                                                                                বয়সসীমা
                                                                                                শিথিল
                                                                                                যোগ্য
                                                                                                কিনা?
                                                                                            </th>

                                                                                            <th className="text-center">
                                                                                                সম্পর্ক
                                                                                            </th>
                                                                                        </tr>
                                                                                    </thead>
                                                                                    {details?.data?.experienceRequirementDetails[
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
                                                                                                    <td className="text-center">
                                                                                                        <span className="uldesign">
                                                                                                            {item?.postSubjectEducationLevelMappingNameBn ??
                                                                                                                "N/A"}
                                                                                                        </span>
                                                                                                    </td>

                                                                                                    <td className="text-center">
                                                                                                        {item?.experienceType ??
                                                                                                            "N/A"}
                                                                                                    </td>

                                                                                                    <td className="text-center">
                                                                                                        {item?.isMpoExperience !==
                                                                                                        null
                                                                                                            ? item?.isMpoExperience
                                                                                                                ? "হ্যাঁ"
                                                                                                                : "না"
                                                                                                            : "N/A"}
                                                                                                    </td>

                                                                                                    <td className="text-center">
                                                                                                        {item?.experienceYearMinTotal ??
                                                                                                            "N/A"}
                                                                                                    </td>

                                                                                                    <td className="text-center">
                                                                                                        {item?.experienceYearMinWithMpo ??
                                                                                                            "N/A"}
                                                                                                    </td>
                                                                                                    <td className="text-center">
                                                                                                        {item?.experienceYearMin ??
                                                                                                            "N/A"}
                                                                                                    </td>

                                                                                                    <td className="text-center">
                                                                                                        {item?.experienceYearMinWithIndex ??
                                                                                                            "N/A"}
                                                                                                    </td>
                                                                                                    <td className="text-center">
                                                                                                        {item?.experienceYearMinTotal ??
                                                                                                            "N/A"}
                                                                                                    </td>
                                                                                                    <td className="text-center">
                                                                                                        {item?.isIndexHolder !==
                                                                                                        null
                                                                                                            ? item?.isIndexHolder
                                                                                                                ? "হ্যাঁ"
                                                                                                                : "না"
                                                                                                            : "N/A"}
                                                                                                    </td>

                                                                                                    <td className="text-center">
                                                                                                        {item?.isAgeRelaxedForSimilarDesignationHolder !==
                                                                                                        null
                                                                                                            ? item?.isAgeRelaxedForSimilarDesignationHolder
                                                                                                                ? "হ্যাঁ"
                                                                                                                : "না"
                                                                                                            : "N/A"}
                                                                                                    </td>
                                                                                                    <td className="text-center">
                                                                                                        {item?.isAndOr ===
                                                                                                        "AND"
                                                                                                            ? "এবং"
                                                                                                            : item?.isAndOr ===
                                                                                                              "OR"
                                                                                                            ? "অথবা"
                                                                                                            : item?.isAndOr ===
                                                                                                              null
                                                                                                            ? "N/A"
                                                                                                            : "নেই"}
                                                                                                    </td>
                                                                                                </tr>
                                                                                            </tbody>
                                                                                        )
                                                                                    )}
                                                                                </Table>
                                                                            </div>
                                                                        </>
                                                                    </td>
                                                                </tr>
                                                            </>
                                                        )
                                                    )}
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}

                    <hr />
                    <Link
                        to={`/portal/settings/regulations/${details?.data?.id}/edit`}
                    >
                        <Button
                            variant="warning"
                            className="f-right btn-warning"
                            type="submit"
                        >
                            <FontAwesomeIcon icon={faEdit} className="me-2" />{" "}
                            সংশোধন করুন
                        </Button>
                    </Link>
                </Card.Body>
            </Card>
        </DefaultCard>
    );
};

export default MpoTeacherRulesDetail;
