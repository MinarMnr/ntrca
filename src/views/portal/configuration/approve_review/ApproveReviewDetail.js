import { Button, Card } from "@themesberg/react-bootstrap/lib/esm/index";
import { Link } from "react-router-dom";
import { DefaultCard } from "../../../../components/card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";
import "./recruitment.scss";
import { UrlBuilder } from "../../../../helpers/UrlBuilder";
import EmptyState from "../../../../components/section/empty_state/EmptyState";
import ProgressBar from "react-topbar-progress-indicator";
import { useDispatch, useSelector } from "react-redux";
import { callApi, selectApi } from "../../../../reducers/apiSlice";
import { useEffect } from "react";
import moment from "moment";

const ApproveReviewDetail = (props) => {
    /**
     * useDispatch: dispatch actions
     */
    const dispatch = useDispatch();

    /**
     * Get loading indicator and data from 'selectApi' state
     */
    const {
        loading,
        approveReviewerConfigDetail = {
            data: {},
        },
    } = useSelector(selectApi);

    /**
     * Get data through api call by dispatching 'callApi'.
     */
    useEffect(() => {
        dispatch(
            callApi({
                operationId: UrlBuilder.reviewerApi(
                    `approve-review-config/findBy/${props.match.params.id}`
                ),
                output: "approveReviewerConfigDetail",
                storeName: "approveReviewerConfigDetail",
            })
        );
    }, [dispatch, props.match.params.id]);

    const cardProps = {
        title: "Application Review Configuration",
        headerSlot: () => (
            <>
                <Link to="/portal/configuration/approve-review">
                    <Button
                        variant="link"
                        className="f-right btn-sm p-5 btn-color"
                    >
                        <FontAwesomeIcon icon={faList} className="me-2" />
                        View List
                    </Button>
                </Link>
            </>
        ),
    };

    return (
        <>
            <DefaultCard className="mb-50" {...cardProps}>
                <Card border="white" className="table-wrapper table-responsive">
                    <Card.Body>
                        {!loading &&
                        approveReviewerConfigDetail.data &&
                        approveReviewerConfigDetail.data.id !== undefined &&
                        approveReviewerConfigDetail.data.id !== "" ? (
                            <div className="p-3">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="row details">
                                            <div className="col-md-12">
                                                <div className="pb-5">
                                                    <table className="table table-striped table-bordered table-hover text-center">
                                                        <tbody>
                                                            {/* <tr>
                                <td className=" wd-350">
                                  <b> ক্রঃ নঃ :</b>
                                </td>
                                <td className="">{approveReviewerConfigDetail.data.id}</td>
                              </tr> */}
                                                            <tr>
                                                                <td className=" wd-350">
                                                                    <b>
                                                                        Process
                                                                        Name :
                                                                    </b>
                                                                </td>
                                                                <td className="">
                                                                    {
                                                                        approveReviewerConfigDetail
                                                                            .data
                                                                            .approverReviewerName
                                                                    }
                                                                </td>
                                                            </tr>
                                                            {/* <tr>
                                <td className=" wd-350">
                                  <b>App Entity :</b>
                                </td>
                                <td className="">
                                  {approveReviewerConfigDetail.data.forAppEntity}
                                </td>
                              </tr> */}
                                                            <tr>
                                                                <td className=" wd-350">
                                                                    <b>
                                                                        Effective
                                                                        Date
                                                                        From :
                                                                    </b>
                                                                </td>
                                                                <td className="">
                                                                    {moment
                                                                        .utc(
                                                                            approveReviewerConfigDetail
                                                                                .data
                                                                                .effectiveDateFrom
                                                                        )
                                                                        .format(
                                                                            "DD/MM/yyyy"
                                                                        ) ||
                                                                        "N/A"}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className=" wd-350">
                                                                    <b>
                                                                        Effective
                                                                        Date To
                                                                        :
                                                                    </b>
                                                                </td>
                                                                <td className="">
                                                                    {moment
                                                                        .utc(
                                                                            approveReviewerConfigDetail
                                                                                .data
                                                                                .effectiveDateTo
                                                                        )
                                                                        .format(
                                                                            "DD/MM/yyyy"
                                                                        ) ||
                                                                        "N/A"}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className=" wd-350">
                                                                    <b>
                                                                        Remark :
                                                                    </b>
                                                                </td>
                                                                <td className="">
                                                                    {
                                                                        approveReviewerConfigDetail
                                                                            .data
                                                                            .remark
                                                                    }
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <table className="table table-striped table-bordered table-hover text-center">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">
                                                                #
                                                            </th>
                                                            {/* <th scope="col">User</th> */}
                                                            <th scope="col">
                                                                Role
                                                            </th>
                                                            <th scope="col">
                                                                Order of Review{" "}
                                                            </th>
                                                            <th scope="col">
                                                                Review Days
                                                            </th>
                                                            <th scope="col">
                                                                Actions{" "}
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {approveReviewerConfigDetail
                                                            .data
                                                            .approverReviewerUsers !==
                                                            undefined &&
                                                            JSON.parse(
                                                                JSON.stringify(
                                                                    approveReviewerConfigDetail
                                                                        .data
                                                                        .approverReviewerUsers
                                                                )
                                                            ).map(
                                                                (
                                                                    row,
                                                                    index
                                                                ) => (
                                                                    <tr
                                                                        key={
                                                                            index
                                                                        }
                                                                    >
                                                                        <th scope="row">
                                                                            {index +
                                                                                1}
                                                                        </th>
                                                                        {/* <td>{row.kcUserName}</td> */}
                                                                        <td>
                                                                            {
                                                                                row.userRoleName
                                                                            }
                                                                        </td>
                                                                        <td>
                                                                            {
                                                                                row.orderIndex
                                                                            }
                                                                        </td>
                                                                        <td>
                                                                            {
                                                                                row.reviewDays
                                                                            }
                                                                        </td>
                                                                        <td>
                                                                            {
                                                                                row.actionToBePerformed
                                                                            }
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            )}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <>
                                <ProgressBar />
                                <EmptyState
                                    loading={loading}
                                    text={"No Data Available"}
                                />
                            </>
                        )}
                    </Card.Body>
                </Card>
            </DefaultCard>
        </>
    );
};

export default ApproveReviewDetail;
