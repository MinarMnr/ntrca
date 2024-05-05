import { faEdit, faList, faFileAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, Table } from "@themesberg/react-bootstrap";
import * as React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProgressBar from "react-topbar-progress-indicator";
import { DefaultCard } from "../../../components/card";
import { callApi, selectApi } from "../../../reducers/apiSlice";
import { UrlBuilder } from "../../../helpers/UrlBuilder";
import moment from "moment";

const ErequisitionCircularDetail = (props) => {
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
                    `institute-job-requisition-circular/details/${props.match.params.id}`
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
        title: `${details?.data?.title} বিবরণ`,
        headerSlot: () => (
            <>
                <Link to="/portal/e-requisition/circular">
                    <Button
                        variant="link"
                        className="f-right btn-sm p-5 btn-color"
                    >
                        <FontAwesomeIcon icon={faList} className="me-2" />
                        ই-রিকুইজিশন তালিকা
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
                    <div className="container-fluid details-page">
                        <div className="row">
                            {/* <div className="col-lg-6">
                                <Table className="table table-responsive table-striped table-hover mb-15">
                                    <tbody>
                                        <tr>
                                            <td className="border-0 td-width">
                                                <b>টাইটেল</b>
                                            </td>
                                            <td className="border-0">
                                                {details?.data?.title}
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div> */}
                            <div className="col-lg-12">
                                <Table className="table table-responsive table-striped table-hover mb-15">
                                    <tbody>
                                        <tr>
                                            <td
                                                className="border-0 td-width"
                                                style={{ width: "150px" }}
                                            >
                                                <b>প্রতিষ্ঠানের ধরন</b>
                                            </td>
                                            <td className="border-0">
                                                {details?.data
                                                    ?.instituteTypeList
                                                    ?.length > 0 &&
                                                    details?.data?.instituteTypeList.map(
                                                        (item, index) => {
                                                            return (
                                                                <span className="uldesign">
                                                                    {/* <b>
                                                                        {index +
                                                                            1}
                                                                        .{" "}
                                                                    </b> */}
                                                                    {
                                                                        item?.instituteTypeNameBn
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
                            <div className="col-lg-6">
                                <Table className="table table-responsive table-striped table-hover mb-15">
                                    <tbody>
                                        <tr>
                                            <td className="border-0 td-width">
                                                <b>ফী (টাকায়)</b>
                                            </td>
                                            <td className="border-0">
                                                {details?.data?.applicationFee}
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                            {/* <div className="col-lg-6">
                                <Table className="table table-responsive table-striped table-hover mb-15">
                                    <tbody>
                                        <tr>
                                            <td className="border-0 td-width">
                                                <b>
                                                    ফী প্রদানের সময়সীমা (ঘন্টায়)
                                                </b>
                                            </td>
                                            <td className="border-0">
                                                {
                                                    details?.data
                                                        ?.feePaymentValidityHour
                                                }
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div> */}
                            <div className="col-lg-6">
                                <Table className="table table-responsive table-striped table-hover mb-15">
                                    <tbody>
                                        <tr>
                                            <td className="border-0 td-width">
                                                <b>প্রকাশের তারিখ</b>
                                            </td>
                                            <td className="border-0">
                                                {moment(
                                                    details?.data?.publishDate
                                                ).format("DD-MM-YYYY hh:mm a")}
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
                                                <b>কার্যকর তারিখ</b>
                                            </td>
                                            <td className="border-0">
                                                {moment(
                                                    details?.data?.effectiveDate
                                                ).format("DD-MM-YYYY hh:mm a")}
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
                                                <b>মেয়াদ উত্তীর্ণের তারিখ</b>
                                            </td>
                                            <td className="border-0">
                                                {moment(
                                                    details?.data?.expiryDate
                                                ).format("DD-MM-YYYY hh:mm a")}
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
                                            {details?.data?.encloserList
                                                ?.length > 0 && (
                                                <td className="border-0">
                                                    <a
                                                        target="_blank"
                                                        href={`${UrlBuilder.fileServerApi(
                                                            details?.data
                                                                ?.encloserList
                                                                ?.length > 0 &&
                                                                details?.data
                                                                    ?.encloserList[0]
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
                            </div>
                        </div>
                    </div>

                    <hr />
                    <Link
                        to={`/portal/e-requisition/edit/${details?.data?.id}`}
                    >
                        <Button
                            variant=""
                            className="f-right btn-orange"
                            type="submit"
                        >
                            <FontAwesomeIcon icon={faEdit} className="me-2" />
                            ইডিট করুন
                        </Button>
                    </Link>
                </Card.Body>
            </Card>
        </DefaultCard>
    );
};

export default ErequisitionCircularDetail;
