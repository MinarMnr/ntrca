import { faEdit, faList, faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, Col, Table } from "@themesberg/react-bootstrap";
import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProgressBar from "react-topbar-progress-indicator";
import { DefaultCard } from "../../../../components/card";
import { callApi, selectApi } from "../../../../reducers/apiSlice";
import { UrlBuilder } from "../../../../helpers/UrlBuilder";
import moment from "moment/moment";
const CircularDetails = (props) => {
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
        requisitionSeatDetails = {
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
                    `job-application-circular/details/${props.match.params.id}`
                ),
                output: "details",
            })
        );
    }, [dispatch, props.match.params.id]);

    useEffect(() => {
        dispatch(
            callApi({
                operationId: UrlBuilder.ntrcaApi(
                    `job-application-circular/total-requested-seats?requisitionCircularId=${details?.data?.requisitionCircularId}`
                ),
                output: "requisitionSeatDetails",
            })
        );
    }, [dispatch, details?.data?.requisitionCircularId]);

    /**
     * cardProps must need to pass into DefaultCard component.
     * headerSlot: this is a placeholder for action buttons on card header.
     *
     * @type {{headerSlot: (function(): *), title: string}}
     */

    const ID = details?.data?.id;
    const cardProps = {
        title: "বিজ্ঞপ্তির বিস্তারিত দেখুন",
        headerSlot: () => (
            <>
                {
                    <Link to="/portal/circular/list">
                        <Button
                            variant="link"
                            className="f-right btn-sm p-5 btn-color"
                        >
                            <FontAwesomeIcon icon={faList} className="me-2" />{" "}
                            বিজ্ঞপ্তির তালিকা দেখুন
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
                    {details !== undefined && details.data !== undefined && (
                        <div className="table-responsive">
                            <Table className="table table-striped table-hover mb-15">
                                <tbody>
                                    {/* <tr>
                                        <td className="border-0 td-width">
                                            <b>আইডি </b>
                                        </td>
                                        <td className="border-0">
                                            {details.data.id ?? "N/A"}
                                        </td>
                                    </tr> */}
                                    <tr>
                                        <td className="border-0 td-width">
                                            <b>বিজ্ঞপ্তির নাম</b>
                                        </td>
                                        <td className="border-0">
                                            {details.data.circularTitle ??
                                                "N/A"}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="border-0 td-width">
                                            <b>বিজ্ঞপ্তির প্রকাশের তারিখ</b>
                                        </td>
                                        <td className="border-0">
                                            {details.data.circularPublishDate &&
                                                moment(
                                                    details.data
                                                        .circularPublishDate
                                                ).format(
                                                    "DD-MM-YYYY h:mm:ss a"
                                                )}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="border-0 td-width">
                                            <b>বিজ্ঞপ্তি কার্যকরের তারিখ</b>
                                        </td>
                                        <td className="border-0">
                                            {details.data
                                                .circularEffectiveDate &&
                                                moment(
                                                    details.data
                                                        .circularEffectiveDate
                                                ).format(
                                                    "DD-MM-YYYY h:mm:ss a"
                                                )}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="border-0 td-width">
                                            <b>
                                                বিজ্ঞপ্তি মেয়াদ শেষ হবার তারিখ
                                            </b>
                                        </td>
                                        <td className="border-0">
                                            {details.data.circularExpiryDate &&
                                                moment(
                                                    details.data
                                                        .circularExpiryDate
                                                ).format(
                                                    "DD-MM-YYYY h:mm:ss a"
                                                )}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="border-0 td-width">
                                            <b>আবেদনকারীর সর্বোচ্চ বয়সসীমা</b>
                                        </td>
                                        <td className="border-0">
                                            {details.data.ageLimitTo ?? "N/A"}{" "}
                                            বছর
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="border-0 td-width">
                                            <b>
                                                আবেদনকারীর সর্বোচ্চ বয়সসীমা
                                                প্রদানের প্রযোজ্য তারিখ
                                            </b>
                                        </td>
                                        <td className="border-0">
                                            {details.data.ageLimitAsOfDate &&
                                                moment(
                                                    details.data
                                                        .ageLimitAsOfDate
                                                ).format(
                                                    "DD-MM-YYYY h:mm:ss a"
                                                )}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="border-0 td-width">
                                            <b>আবেদন ফি (টাকায়)</b>
                                        </td>
                                        <td className="border-0">
                                            {details.data.applicationFee ??
                                                "N/A"}{" "}
                                            টাকা
                                        </td>
                                    </tr>
                                    {/* <tr>
                                        <td className="border-0 td-width">
                                            <b>
                                                আবেদন পরবর্তী ফী জমা দেয়ার
                                                সময়সীমা(ঘন্টায়)
                                            </b>
                                        </td>
                                        <td className="border-0">
                                            {details.data
                                                .applicationFeePaymentValidityHour ??
                                                "N/A"}{" "}
                                            ঘন্টা
                                        </td>
                                    </tr> */}
                                    <tr>
                                        <td className="border-0 td-width">
                                            <b>
                                                শিক্ষা প্রতিষ্ঠান
                                                Choice(পছন্দের) সর্বোচ্চ সংখ্যা
                                            </b>
                                        </td>
                                        <td className="border-0">
                                            {details.data
                                                .maxInstituteToChoose ??
                                                "N/A"}{" "}
                                            টি
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className="border-0 td-width">
                                            <b>বিজ্ঞপ্তির বর্ণনা</b>
                                        </td>
                                        <td className="border-0">
                                            {details.data.circularBody ?? "N/A"}{" "}
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                    )}
                    <div className="col-lg-12">
                        <Table className="table table-responsive table-striped table-hover mb-15">
                            <tbody>
                                <tr>
                                    <td className="border-0 td-width">
                                        <b>নীতিমালা</b>
                                    </td>
                                    <td className="border-0">
                                        {details?.data?.govtRegulationId
                                            ?.length > 0 &&
                                            details?.data?.govtRegulationId.map(
                                                (item, index) => {
                                                    return (
                                                        <span className="uldesign">
                                                            {
                                                                item?.govtRegulationNameBn
                                                            }
                                                            {"  "}
                                                        </span>
                                                    );
                                                }
                                            )}
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                    <hr />
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
                                                <th
                                                    style={{
                                                        textAlign: "center",
                                                    }}
                                                >
                                                    শিক্ষা প্রতিষ্ঠানের ধরন
                                                </th>
                                                <th
                                                    style={{
                                                        textAlign: "center",
                                                    }}
                                                >
                                                    পদের ধরন
                                                </th>
                                                <th
                                                    style={{
                                                        textAlign: "center",
                                                    }}
                                                >
                                                    সংখ্যা
                                                </th>
                                                <th
                                                    style={{
                                                        textAlign: "center",
                                                    }}
                                                >
                                                    মোট
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {requisitionSeatDetails?.data
                                                ?.length > 0 ? (
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
                    </Col>

                    {details !== undefined && details.data !== undefined && (
                        <div className="table-responsive text-center ">
                            <Table className="table table-striped table-hover mb-15">
                                <thead>
                                    <tr>
                                        <td className="border-0 td-width">
                                            <b>ফাইলের নাম</b>
                                        </td>
                                        {/* <td className="border-0 td-width">
                                            <b>ফাইলের ধরন </b>
                                        </td> */}
                                        <td className="border-0 td-width">
                                            <b>ফাইল দেখুন</b>
                                        </td>
                                    </tr>
                                </thead>

                                {details.data?.encloserList?.map(
                                    (item, index) => (
                                        <tr key={index}>
                                            <td className="border-0 td-width">
                                                {item?.encloserName}
                                            </td>
                                            {/* <td className="border-0 td-width">
                                                {item?.encloserType}
                                            </td> */}
                                            <td className="border-0 td-width">
                                                <a
                                                    target="_blank"
                                                    href={`${UrlBuilder.fileServerApi(
                                                        item?.encloserUrl
                                                    )}`}
                                                    className="form-control"
                                                >
                                                    <FontAwesomeIcon
                                                        icon={faFilePdf}
                                                    />
                                                </a>
                                            </td>
                                        </tr>
                                    )
                                )}
                            </Table>
                        </div>
                    )}
                    <Link to={`/portal/circular/${ID}/edit`}>
                        <Button
                            variant=""
                            className="f-right btn-warning"
                            type="edit"
                        >
                            <FontAwesomeIcon icon={faEdit} className="me-2" />{" "}
                            বিজ্ঞপ্তির সংশোধন
                        </Button>
                    </Link>
                </Card.Body>
            </Card>
        </DefaultCard>
    );
};

export default CircularDetails;
