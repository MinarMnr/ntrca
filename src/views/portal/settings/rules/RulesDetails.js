import {
    faEdit,
    faList,
    faFilePdf,
    faFileAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    Button,
    Card,
    Col,
    Table,
    FormCheck,
} from "@themesberg/react-bootstrap";
import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProgressBar from "react-topbar-progress-indicator";
import { DefaultCard } from "../../../../components/card";
import { callApi, selectApi } from "../../../../reducers/apiSlice";
import { UrlBuilder } from "../../../../helpers/UrlBuilder";
import moment from "moment/moment";

const RulesDetail = (props) => {
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

    /**
     * Get data through api call by dispatching 'callApi'.
     */
    useEffect(() => {
        dispatch(
            callApi({
                operationId: UrlBuilder.ntrcaApi(
                    `job-application-rule/details/${props?.match?.params?.id}`
                ),
                output: "details",
            })
        );
    }, [dispatch, props?.match?.params?.id]);

    /**
     * cardProps must need to pass into DefaultCard component.
     * headerSlot: this is a placeholder for action buttons on card header.
     *
     * @type {{headerSlot: (function(): *), title: string}}
     */
    const cardProps = {
        title: "নিয়মাবলীর বিস্তারিত দেখুন",
        headerSlot: () => (
            <>
                {/* <h3 className="m-0 p-0 ">নিয়মাবলীর বিস্তারিত দেখুন</h3> */}
                {
                    <Link to="/portal/settings/rules/list">
                        <Button
                            variant="link"
                            className="f-right btn-sm p-5 btn-color"
                        >
                            <FontAwesomeIcon icon={faList} className="me-2" />{" "}
                            নিয়মাবলীর তালিকা দেখুন
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
                        <div className="table-responsive container-fluid details-page">
                            <Table className="table table-striped table-hover mb-15">
                                <tbody>
                                    <tr>
                                        <td className="border-0 td-width">
                                            <b>নিয়মাবলীর নাম</b>
                                        </td>
                                        <td className="border-0">
                                            {details.data.ruleName ?? "N/A"}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="border-0 td-width">
                                            <b>নিয়মাবলীর নাম (বাংলায়)</b>
                                        </td>
                                        <td className="border-0">
                                            {details.data.ruleNameBn ?? "N/A"}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="border-0 td-width">
                                            <b>নিয়মাবলীর কার্যকর তারিখ</b>
                                        </td>
                                        <td className="border-0">
                                            {details.data.ruleValidFrom &&
                                                moment(
                                                    details.data.ruleValidFrom
                                                ).format(
                                                    "DD-MM-YYYY h:mm:ss a"
                                                )}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="border-0 td-width">
                                            <b>ফাইল</b>
                                        </td>
                                        {details?.data?.encloserUrl?.length >
                                            0 && (
                                            <td className="border-0">
                                                <a
                                                    target="_blank"
                                                    href={`${UrlBuilder.fileServerApi(
                                                        details?.data
                                                            ?.encloserUrl
                                                    )}`}
                                                >
                                                    <FontAwesomeIcon
                                                        icon={faFileAlt}
                                                        size="lg"
                                                        title="Click here to view file"
                                                    />
                                                </a>
                                            </td>
                                        )}
                                    </tr>
                                </tbody>
                            </Table>

                            <div className="col-lg-12">
                                <Table className="table table-responsive table-striped table-hover mb-15">
                                    <tbody>
                                        <tr>
                                            <td
                                                className="border-0 td-width"
                                                style={{ width: "150px" }}
                                            >
                                                <b>
                                                    কোটা অন্তর্ভুক্ত নয় এমন
                                                    অঞ্চলসমূহ
                                                </b>
                                            </td>
                                            <td className="border-0">
                                                {details?.data
                                                    ?.geographicalPositionNoQuotaList
                                                    ?.length > 0 &&
                                                    details?.data?.geographicalPositionNoQuotaList.map(
                                                        (item, index) => {
                                                            return (
                                                                <span className="uldesign">
                                                                    {
                                                                        item?.geographicalPositionNameBn
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
                        </div>
                    )}
                    {details?.data?.areaStatusList &&
                        details?.data?.areaStatusList.length > 0 && (
                            <div className="row">
                                <div class="contentBox-modified">
                                    <div class="section-header-custom">
                                        <h6 class="m-12 text-white p-2">
                                            অঞ্চলভিত্তিক নারী কোটা সমূহ
                                        </h6>
                                    </div>
                                    <div className="contentBoxBody mt-20"></div>

                                    <div className="contentBoxBody">
                                        <table className="table table-responsive table-striped text-center">
                                            <thead>
                                                <tr>
                                                    <th>ক্রঃ নঃ</th>
                                                    <th>অঞ্চল </th>
                                                    <th>শতাংশ </th>
                                                </tr>
                                            </thead>
                                            {details &&
                                                details?.data &&
                                                details?.data
                                                    ?.areaStatusList && (
                                                    <tbody>
                                                        {details?.data?.areaStatusList.map(
                                                            (item, index) => (
                                                                <tr key={index}>
                                                                    <td>
                                                                        {index +
                                                                            1 ??
                                                                            "N/F"}
                                                                    </td>
                                                                    <td>
                                                                        {item?.areaStatusNameBn ??
                                                                            "N/F"}
                                                                    </td>
                                                                    <td>
                                                                        {item?.percentageFemale ??
                                                                            "N/F"}
                                                                        %
                                                                    </td>
                                                                </tr>
                                                            )
                                                        )}
                                                    </tbody>
                                                )}
                                        </table>
                                    </div>
                                </div>
                            </div>
                        )}
                    <div className="row">
                        <div class="contentBox-modified">
                            <div class="section-header-custom">
                                <h6 class="m-12 text-white p-2">
                                    শিক্ষাগত যোগ্যতাভিত্তিক অগ্রাধিকার স্তর
                                </h6>
                            </div>
                            <div className="contentBoxBody mt-20"></div>

                            <div className="contentBoxBody">
                                <table className="table table-responsive table-striped text-center">
                                    <thead>
                                        <tr>
                                            <th>ক্রঃ নঃ</th>
                                            <th>শিক্ষাগত যোগ্যতা</th>
                                            <th>অর্ডার ইনডেক্স</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {details?.data
                                            ?.educationLevelWisePriorityList
                                            ?.length > 0 ? (
                                            details.data.educationLevelWisePriorityList.map(
                                                (item, index) => (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>
                                                            {
                                                                item?.educationLevelNameBn
                                                            }
                                                        </td>
                                                        <td>
                                                            {item?.orderIndex}
                                                        </td>
                                                    </tr>
                                                )
                                            )
                                        ) : (
                                            <tr>
                                                <td colSpan="3">
                                                    No data found
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <Col xl={12} lg={12} md={6} sm={6} className="mt-37">
                        <FormCheck
                            label={`মহিলা শিক্ষা প্রতিষ্ঠানের ক্ষেত্রে "শারীরিক শিক্ষা" পদে শুধুমাত্র মহিলা প্রার্থী গ্রহণযোগ্য কিনা ?`}
                            className="mt-20"
                            checked={
                                details?.data
                                    ?.isPhysicalEducationTeacherGenderSpecificOnly
                                    ? true
                                    : false
                            }
                        />
                    </Col>
                    <Col xl={12} lg={12} md={6} sm={6} className="mt-37">
                        <FormCheck
                            label={`ইনডেক্স ধারীদের ক্ষেত্রে বয়সসীমা শিথিলযোগ্য কিনা ?`}
                            className="mt-20"
                            checked={
                                details?.data?.isAgeFlexibleForIndexHolder
                                    ? true
                                    : false
                            }
                        />
                    </Col>
                    <Col xl={12} lg={12} md={6} sm={6} className="mt-37">
                        <FormCheck
                            label={`ধর্ম ও নৈতিক শিক্ষা পদে প্রার্থীকে স্ব স্ব ধর্মের  অনুসারী হতে হবে কিনা ?`}
                            className="mt-20"
                            checked={
                                details?.data
                                    ?.isReligionSpecificTeacherForReligionSubject
                                    ? true
                                    : false
                            }
                        />
                    </Col>

                    <hr />
                    <Link
                        to={`/portal/settings/rules/${details?.data?.id}/edit`}
                    >
                        <Button
                            variant=""
                            className="f-right btn-color"
                            type="submit"
                        >
                            <FontAwesomeIcon icon={faEdit} className="me-2" />{" "}
                            নিয়মাবলীর সংশোধন
                        </Button>
                    </Link>
                </Card.Body>
            </Card>
        </DefaultCard>
    );
};

export default RulesDetail;
