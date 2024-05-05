import * as React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callApi, selectApi } from "../../../../reducers/apiSlice";
import { Link, useHistory } from "react-router-dom";
import { Formik } from "formik/dist/index";
import { Button, Card } from "@themesberg/react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";
import ProgressBar from "react-topbar-progress-indicator";
import { ApproveReview } from "./ApproveReview";
import { UrlBuilder } from "../../../../helpers/UrlBuilder";
import { DefaultCard } from "../../../../components/card";
import ApproveReviewForm from "./ApproveReviewForm";
import Cookies from "js-cookie";
import { selectToastAlert } from "reducers/toastAlertSlice";

const ApproveReviewEdit = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { type } = useSelector(selectToastAlert);

    /**
     * Get loading indicator and data from 'selectApi' state
     */
    const {
        loading,
        approveReviewerConfigDetail = {
            data: {},
        },
        roleDataList = {
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

    //const [editList, setEditList] = React.useState([]);

    useEffect(() => {
        dispatch(
            callApi({
                operationId: UrlBuilder.keyClockApi("admin/role-all"),
                storeName: "roleDataList",
                output: "roleDataList",
            })
        );
    }, []);

    useEffect(() => {
        if (type === "success") {
            history.push("/portal/configuration/approve-review");
        }
    });

    const getRoleName = (id) => {
        const found =
            roleDataList?.length > 0 &&
            roleDataList.find((element) => element.roleId == id);
        return found?.roleName;
    };

    let headers = {
        Authorization: "Bearer " + Cookies.get("access_token"),
        "Content-Type": "application/json",
    };

    // useEffect(async () => {
    //     var len =
    //         approveReviewerConfigDetail?.data?.approverReviewerUsers?.length;
    //     var list = [];
    //     for (let i = 0; i < len; i++) {
    //         var roleName = await getRoleName(
    //             approveReviewerConfigDetail?.data?.approverReviewerUsers[i]
    //                 ?.userRoleId
    //         );

    //         if (roleName != undefined) {
    //             var res = await fetch(
    //                 UrlBuilder.ntrcaApi(
    //                     `admin/user-all?first=0&max=100&userRoleName=${roleName}`
    //                 ),
    //                 {
    //                     headers,
    //                 }
    //             );
    //             if (res?.status == 200) {
    //                 res.json().then((response) => {
    //                     list.push(response?.data);
    //                     setEditList(list);
    //                 });
    //             }
    //         }
    //     }
    // }, [
    //     approveReviewerConfigDetail?.data?.approverReviewerUsers,
    //     roleDataList,
    // ]);

    //const { loading } = useSelector(selectApi);

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
        <DefaultCard className="mb-50" {...cardProps}>
            <Card border="white" className="table-wrapper table-responsive">
                <Card.Body>
                    {loading && <ProgressBar />}
                    <Formik
                        initialValues={
                            // editList?.length > 0 &&
                            // ApproveReview.fromJson(
                            //     approveReviewerConfigDetail.data,
                            //     editList
                            // )
                            ApproveReview.fromJson(
                                approveReviewerConfigDetail.data
                            )
                        }
                        enableReinitialize
                        validationSchema={ApproveReview.validator}
                        onSubmit={(values, { resetForm }) => {
                            dispatch(
                                callApi({
                                    operationId: UrlBuilder.reviewerApi(
                                        "approve-review-config/update"
                                    ),
                                    output: "approve_review_edit",
                                    parameters: {
                                        method: "PUT",
                                        body: JSON.stringify(values),
                                        header: {
                                            "Content-Type": "application/json",
                                        },
                                    },
                                })
                            );
                        }}
                    >
                        {(props) => {
                            return <ApproveReviewForm {...props} type="edit" />;
                        }}
                    </Formik>
                </Card.Body>
            </Card>
        </DefaultCard>
    );
};

export default ApproveReviewEdit;
