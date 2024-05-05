import { faEdit, faList, faFileAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, Table } from "@themesberg/react-bootstrap";
import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProgressBar from "react-topbar-progress-indicator";

import moment from "moment";
import { AuthUser } from "helpers/AuthUser";
import { DefaultCard } from "components/card";
import { callApi, selectApi } from "reducers/apiSlice";
import { UrlBuilder } from "helpers/UrlBuilder";
import ReviewView from "views/portal/reviewer/ReviewView";

const VacantPostDetails = (props) => {
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
        reviewerList = {
            data: {},
        },
        reasonForRejections = {
            data: {},
        },
    } = useSelector(selectApi);

    const {
        instituteId,
        instituteNameBn,
        eiinNo,
        memorandumNo,
        instituteTypeNameBn,
        thanaNameBn,
        districtNameBn,
        divisionNameBn,
        applicationReceivedDate,
        applicationReviewLastDate,
        jobRequisitionCircularTitle,
        dateOfRequisition,
        paymentStatus,
        currentApproverReviewerRoleName,
        trackingNumber,
        encloserName,
        encloserUrl,
        instituteJobRequisitionDetailList,
        instituteJobRequisitionReviews,
    } = details?.data || {};
    /**
     * Get data through api call by dispatching 'callApi'.
     */
    useEffect(() => {
        dispatch(
            callApi({
                operationId: UrlBuilder.ntrcaApi(
                    `institute-job-requisition/details/${props.match.params.id}`
                ),
                output: "details",
                storeName: "instituteJobRequisition",
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
        title: "প্রতিষ্ঠানের বিস্তারিত বিবরণ",
        headerSlot: () => (
            <>
                <Link to="/portal/posting-management/vacant-posts-list">
                    <Button
                        variant="link"
                        className="f-right btn-sm p-5 btn-color"
                    >
                        <FontAwesomeIcon icon={faList} className="me-2" />
                        আবেদিত পদের তালিকা
                    </Button>
                </Link>
            </>
        ),
    };

    return (
        <DefaultCard className="mb-50" {...cardProps}>
            {loading && <ProgressBar />}
            <Card border="white" className="table-wrapper ">
                <Card.Body>
                    <div className="row">
                        <div className="col-md-12">
                            <div class="mb-20 card-subtitle h6">
                                <div class="text-right mb-15"></div>
                                <div class="table-responsive">
                                    <table class="table table-striped table-bordered table-hover text-center">
                                        <tbody></tbody>
                                    </table>
                                    <table class="table table-striped table-bordered table-hover text-center">
                                        <tbody>
                                            <tr>
                                                <td style={{ width: "50%" }}>
                                                    <b>
                                                        আবেদন গ্রহণের তারিখ :{" "}
                                                    </b>
                                                    <b>
                                                        {moment(
                                                            applicationReceivedDate
                                                        ).format("DD-MM-YYYY")}
                                                    </b>
                                                </td>
                                                {/* <td class="border-0 td-width">
                                                    <b>
                                                        {" "}
                                                        আবেদন মূল্যায়নের শেষ
                                                        তারিখ :{" "}
                                                    </b>
                                                    <b>
                                                        <span class="btn btn-danger nohover">
                                                        {moment(
                                                            applicationReviewLastDate
                                                        ).format("DD-MM-YYYY")}
                                                        
                                                        </span>
                                                    </b>
                                                </td> */}
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className=" details-page">
                        <div className="row">
                            <div className="col-lg-6">
                                <Table className="table table-responsive table-striped table-hover mb-15">
                                    <tbody>
                                        <tr>
                                            <td className="border-0 td-width">
                                                <b>প্রতিষ্ঠানের নাম</b>
                                            </td>
                                            <td className="border-0">
                                                {instituteNameBn ?? "N/A"}
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                            <div className="col-lg-6">
                                <Table className="table table-responsive table-striped table-hover mb-15">
                                    <tbody>
                                        <tr>
                                            <td className="border-0 td-width">
                                                <b>প্রতিষ্ঠানের ধরন</b>
                                            </td>
                                            <td className="border-0">
                                                {instituteTypeNameBn ?? "N/A"}
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                            <div className="col-lg-6">
                                <Table className="table table-responsive table-striped table-hover mb-15">
                                    <tbody>
                                        <tr>
                                            <td className="border-0 td-width">
                                                <b>ই আই আই এন</b>
                                            </td>
                                            <td className="border-0">
                                                {eiinNo ?? "N/A"}
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                            <div className="col-lg-6">
                                <Table className="table table-responsive table-striped table-hover mb-15">
                                    <tbody>
                                        <tr>
                                            <td className="border-0 td-width">
                                                <b>বিভাগ</b>
                                            </td>
                                            <td className="border-0">
                                                {divisionNameBn ?? "N/A"}
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                            <div className="col-lg-6">
                                <Table className="table table-responsive table-striped table-hover mb-15">
                                    <tbody>
                                        <tr>
                                            <td className="border-0 td-width">
                                                <b>জেলা</b>
                                            </td>
                                            <td className="border-0">
                                                {districtNameBn ?? "N/A"}
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>

                            <div className="col-lg-6">
                                <Table className="table table-responsive table-striped table-hover mb-15">
                                    <tbody>
                                        <tr>
                                            <td className="border-0 td-width">
                                                <b>উপজেলা</b>
                                            </td>
                                            <td className="border-0">
                                                {thanaNameBn ?? "N/A"}
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>

                            <div className="col-lg-6">
                                <Table className="table table-responsive table-striped table-hover mb-15">
                                    <tbody>
                                        <tr>
                                            <td className="border-0 td-width">
                                                <b>স্মারক নং</b>
                                            </td>
                                            <td className="border-0">
                                                {memorandumNo ?? "N/A"}
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>

                            <div className="col-lg-6">
                                <Table className="table table-responsive table-striped table-hover mb-15">
                                    <tbody>
                                        <tr>
                                            <td className="border-0 td-width">
                                                <b>ফাইল</b>
                                            </td>

                                            <td className="border-0">
                                                <a
                                                    target="_blank"
                                                    href={`${UrlBuilder.fileServerApi(
                                                        encloserUrl
                                                    )}`}
                                                >
                                                    <FontAwesomeIcon
                                                        icon={faFileAlt}
                                                    />
                                                </a>
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div class="contentBox-modified">
                            <div class="section-header-custom">
                                <h5 class="m-10 text-white">
                                    আবেদনের বিস্তারিত বিবরণ
                                </h5>
                            </div>
                            <div className="contentBoxBody mt-20"></div>

                            <div className="contentBoxBody">
                                <table className="table table-responsive table-striped text-center">
                                    <thead>
                                        <tr className="custom-table-header text-center">
                                            <th>#</th>
                                            <th>পদবি</th>
                                            <th>বিষয়</th>
                                            <th>প্রার্থীর ধরন</th>
                                            <th>পদের ধরন</th>
                                            <th>আবেদিত পদের সংখ্যা</th>
                                            <th>শূন্য পদের সংখ্যা</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {instituteJobRequisitionDetailList !==
                                            undefined &&
                                            instituteJobRequisitionDetailList?.length >
                                                0 &&
                                            instituteJobRequisitionDetailList.map(
                                                (row, index) => (
                                                    <tr key={index + 1}>
                                                        <td>{index + 1}</td>
                                                        <td>
                                                            {row?.designationName ??
                                                                "N/A"}
                                                        </td>
                                                        <td>
                                                            {row?.subjectName ??
                                                                "N/A"}
                                                        </td>
                                                        <td>
                                                            {row?.quotaNameBn ??
                                                                "N/A"}
                                                        </td>

                                                        <td>
                                                            {row?.jobType ??
                                                                "N/A"}
                                                        </td>

                                                        <td>
                                                            {row?.numberOfRequestedSeat ??
                                                                "N/A"}
                                                        </td>
                                                        <td>
                                                            {row?.numberOfVacantSeat ??
                                                                "N/A"}
                                                        </td>
                                                    </tr>
                                                )
                                            )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div class="contentBox-modified">
                            <div class="section-header-custom">
                                <h5 class="m-10 text-white">
                                    অনুমোদনের বিস্তারিত বিবরণ
                                </h5>
                            </div>

                            <div className="contentBoxBody">
                                <div className="contentBoxBody mt-20"></div>
                                <div class="table-responsive">
                                    <table className="table table-responsive table-striped text-center">
                                        <thead>
                                            <tr>
                                                <th>Sl.</th>
                                                <th>অনুমোদনকারী </th>
                                                <th>গ্রহণের তারিখ</th>
                                                <th> মূল্যায়নের তারিখ</th>
                                                <th>
                                                    অনুমোদন প্রক্রিয়ার অবস্থা
                                                </th>
                                                <th>মন্তব্য</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {instituteJobRequisitionReviews !==
                                                undefined &&
                                            instituteJobRequisitionReviews?.length >
                                                0 ? (
                                                instituteJobRequisitionReviews.map(
                                                    (row, index) => (
                                                        <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td>
                                                                {row?.reviewerRoleName ??
                                                                    "N/A"}
                                                            </td>
                                                            <td>
                                                                {moment(
                                                                    row?.applicationReceivedDate ??
                                                                        "N/A"
                                                                ).format(
                                                                    "DD-MM-YYYY"
                                                                )}
                                                            </td>
                                                            <td>
                                                                {moment(
                                                                    row?.reviewDate ??
                                                                        "N/A"
                                                                ).format(
                                                                    "DD-MM-YYYY"
                                                                )}
                                                            </td>

                                                            <td>
                                                                {row?.reviewStatus ??
                                                                    "N/A"}
                                                            </td>

                                                            <td>
                                                                {row?.reviewComment ??
                                                                    "N/A"}
                                                            </td>
                                                        </tr>
                                                    )
                                                )
                                            ) : (
                                                <tr>
                                                    <td colSpan={6}>
                                                        <b>
                                                            তথ্য পাওয়া যায়নি
                                                        </b>
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </DefaultCard>
    );
};

export default VacantPostDetails;
