import * as React from "react";
import * as moment from "moment";
import { Button, Card, Col, Row } from "@themesberg/react-bootstrap";
import InputSelect from "../../../components/form/InputSelect";
import { Form, Formik } from "formik/dist/index";
import { InputTextArea } from "../../../components/form";
import { useEffect, useState } from "react";
import ReviewStatus from "../../../constants/ReviewStatus";
import { UrlBuilder } from "../../../helpers/UrlBuilder";
import { AuthUser } from "../../../helpers/AuthUser";
import { useDispatch, useSelector } from "react-redux";
import { callApi, clearState, selectApi } from "../../../reducers/apiSlice";
import swal from "sweetalert";
import UserRole from "../../../constants/UserRole";

const ReviewView = ({
    reviewerList,
    reasonForRejections,
    id,
    //eiinReview,
    // userReview,
    // levelReview,
    // reviewFormShow,
}) => {
    let roles = AuthUser.getRoles();
    const dispatch = useDispatch();
    let rolesID = AuthUser.getRolesID();
    const [reviewType, setReviewType] = useState("");
    const [reviewerFilteredListDes, setReviewerFilteredListDes] = useState([]);
    const [reviewerFilteredListAs, setReviewerFilteredListAs] = useState([]);
    const [currentuser, setCurrentuser] = useState({});
    const [commentShow, setCommentShow] = useState(false);

    useEffect(() => {
        if (
            reviewerList.data !== undefined &&
            reviewerList.data?.approverReviewerUsers
        ) {
            setCurrentuser(
                reviewerList.data?.approverReviewerUsers.find((val) =>
                    rolesID.includes(val.userRoleId)
                )
            );
            let Currentuser = reviewerList.data?.approverReviewerUsers.find(
                (val) => rolesID.includes(val.userRoleId)
            );
            var filteredDescending =
                reviewerList.data?.approverReviewerUsers.filter(function (
                    value,
                    index,
                    arr
                ) {
                    return value.orderIndex < Currentuser.orderIndex;
                });
            setReviewerFilteredListDes(filteredDescending);
            var filteredAscending =
                reviewerList.data?.approverReviewerUsers.filter(function (
                    value,
                    index,
                    arr
                ) {
                    return value.orderIndex > Currentuser.orderIndex;
                });
            setReviewerFilteredListAs(filteredAscending);
        }
    }, [reviewerList]);

    const comments = [
        {
            id: "Everything Ok",
            msg: "Everything Ok",
        },
        {
            id: "Information Incorrect",
            msg: "Information Incorrect",
        },
        {
            id: "Information Insufficient",
            msg: "Information Insufficient",
        },
        {
            id: "Document Incorrect",
            msg: "Document Incorrect",
        },
        {
            id: "Document Insufficient",
            msg: "Document Insufficient",
        },
        {
            id: "Others",
            msg: "Others",
        },
    ];
    const commentsBackward = [
        {
            id: "Information Incorrect",
            msg: "Information Incorrect",
        },
        {
            id: "Information Insufficient",
            msg: "Information Insufficient",
        },
        {
            id: "Document Incorrect",
            msg: "Document Incorrect",
        },
        {
            id: "Document Insufficient",
            msg: "Document Insufficient",
        },
        {
            id: "Others",
            msg: "Others",
        },
    ];

    return (
        <React.Fragment>
            <Card className="card-default mb-30">
                <Card.Header className="p-10 bg-light">
                    <h6 className="mb-0 mt-4 f-left pl-10 p-4">
                        Write Your Comment Here
                    </h6>
                </Card.Header>
                <Card.Body>
                    <Row className="justify-content-between align-items-center">
                        <Col xs={12} md={12} lg={12} xl={12}>
                            <Formik
                                initialValues={{
                                    createdByUserId: "",
                                    reviewerNote: "",
                                    reviewerComment: "",
                                    reasonForRejectionId: "",
                                    toReviewerUserId: "",
                                }}
                                onSubmit={(values, { resetForm }) => {
                                    // prepare request body
                                    let body = {
                                        instituteJobRequisitionReview: {
                                            ...values,
                                            reasonForRejectionId:
                                                values.reasonForRejectionId
                                                    ? parseInt(
                                                          values.reasonForRejectionId
                                                      )
                                                    : null,
                                            toReviewerRoleId:
                                                values.toReviewerUserId,
                                        },
                                        instituteJobRequisitionId: parseInt(id),
                                    };
                                    // conditional request
                                    dispatch(
                                        callApi({
                                            operationId: UrlBuilder.ntrcaApi(
                                                `institute-job-requisition-review/save?reviewStatus=${reviewType}`
                                            ),
                                            output: "saveReview",
                                            storeName: "saveReview",
                                            parameters: {
                                                method: "POST",
                                                body: JSON.stringify(body),
                                            },
                                        })
                                    );

                                    // reset form
                                    resetForm();
                                }}
                            >
                                {({ values, setFieldValue }) => {
                                    if (
                                        values?.reviewerNote ==
                                            "Everything Ok" ||
                                        values?.reviewerNote == ""
                                    ) {
                                        setCommentShow(false);
                                    } else {
                                        setCommentShow(true);
                                    }

                                    return (
                                        <Form>
                                            {reviewType === "" ? (
                                                <>
                                                    <Col
                                                        md={12}
                                                        className="mb-20"
                                                    >
                                                        <p>
                                                            Please verify the
                                                            application before
                                                            taking any action.
                                                        </p>
                                                    </Col>
                                                    <Col
                                                        md={12}
                                                        className=" review_button"
                                                    >
                                                        {currentuser.actionToBePerformed ===
                                                            "APPROVE" && (
                                                            <Button
                                                                variant="success"
                                                                className="f-right ml-5 mt-5"
                                                                onClick={() => {
                                                                    setReviewType(
                                                                        ReviewStatus.APPROVED
                                                                    );
                                                                }}
                                                            >
                                                                Approve
                                                            </Button>
                                                        )}

                                                        {reviewerFilteredListAs.length >
                                                            0 && (
                                                            <Button
                                                                variant="success"
                                                                className="f-right ml-5 mt-5"
                                                                onClick={() => {
                                                                    {
                                                                        // !roles.includes(
                                                                        //     UserRole.DEO
                                                                        // ) &&
                                                                        setReviewType(
                                                                            ReviewStatus.REVIEW_FORWARD
                                                                        );
                                                                    }
                                                                }}
                                                                // onClick={() => {
                                                                //     {
                                                                //         !roles.includes(
                                                                //             UserRole.DEO
                                                                //         )
                                                                //             ? swal(
                                                                //                   {
                                                                //                       title: "Are you sure? ",
                                                                //                       icon: "warning",
                                                                //                       warningMode: true,
                                                                //                   }
                                                                //               ).then(
                                                                //                   (
                                                                //                       willDelete
                                                                //                   ) => {
                                                                //                       willDelete &&
                                                                //                           setReviewType(
                                                                //                               ReviewStatus.REVIEW_FORWARD
                                                                //                           );
                                                                //                   }
                                                                //               )
                                                                //             : setReviewType(
                                                                //                   ReviewStatus.REVIEW_FORWARD
                                                                //               );
                                                                //     }
                                                                // }}
                                                            >
                                                                Forward
                                                            </Button>
                                                        )}
                                                        {reviewerFilteredListDes.length >
                                                            0 && (
                                                            <Button
                                                                variant="danger"
                                                                className="f-right ml-5 mt-5"
                                                                onClick={() => {
                                                                    {
                                                                        // !roles.includes(
                                                                        //     UserRole.DEO
                                                                        // ) &&
                                                                        setReviewType(
                                                                            ReviewStatus.REVIEW_BACKWARD
                                                                        );
                                                                    }
                                                                }}
                                                                // onClick={() => {
                                                                //     {
                                                                //         !roles.includes(
                                                                //             UserRole.DEO
                                                                //         )
                                                                //             ? swal(
                                                                //                   {
                                                                //                       title: "Are you sure? ",
                                                                //                       icon: "warning",
                                                                //                   }
                                                                //               ).then(
                                                                //                   (
                                                                //                       willDelete
                                                                //                   ) => {
                                                                //                       willDelete &&
                                                                //                           setReviewType(
                                                                //                               ReviewStatus.REVIEW_FORWARD
                                                                //                           );
                                                                //                   }
                                                                //               )
                                                                //             : setReviewType(
                                                                //                   ReviewStatus.REVIEW_BACKWARD
                                                                //               );
                                                                //     }
                                                                // }}
                                                            >
                                                                Backward
                                                            </Button>
                                                        )}

                                                        <Button
                                                            variant="danger"
                                                            className="f-right ml-5 mt-5"
                                                            onClick={() => {
                                                                {
                                                                    // !roles.includes(
                                                                    //     UserRole.DEO
                                                                    // ) &&
                                                                    setReviewType(
                                                                        ReviewStatus.BACK_TO_APPLICANT
                                                                    );
                                                                }
                                                            }}
                                                            // onClick={() => {
                                                            //     {
                                                            //         !roles.includes(
                                                            //             UserRole.DEO
                                                            //         )
                                                            //             ? swal({
                                                            //                   title: "Are you sure? ",
                                                            //                   icon: "warning",
                                                            //               }).then(
                                                            //                   (
                                                            //                       willDelete
                                                            //                   ) => {
                                                            //                       willDelete &&
                                                            //                           setReviewType(
                                                            //                               ReviewStatus.BACK_TO_APPLICANT
                                                            //                           );
                                                            //                   }
                                                            //               )
                                                            //             : setReviewType(
                                                            //                   ReviewStatus.BACK_TO_APPLICANT
                                                            //               );
                                                            //     }
                                                            // }}
                                                        >
                                                            Back to Institution
                                                        </Button>
                                                    </Col>
                                                </>
                                            ) : (
                                                <Row>
                                                    {reviewType ===
                                                        ReviewStatus.REVIEW_BACKWARD ||
                                                    reviewType ===
                                                        ReviewStatus.BACK_TO_APPLICANT ? (
                                                        <Col
                                                            md={6}
                                                            className="mb-20"
                                                        >
                                                            <InputSelect
                                                                label="Message"
                                                                name="reviewerNote"
                                                                data={
                                                                    commentsBackward ||
                                                                    []
                                                                }
                                                                value="id"
                                                                text="msg"
                                                                // onChange={(e) =>
                                                                //   setFieldValue(`reviewerNote`, parseInt(e.target.value))
                                                                // }
                                                            />
                                                        </Col>
                                                    ) : (
                                                        <Col
                                                            md={6}
                                                            className="mb-20"
                                                        >
                                                            <InputSelect
                                                                label="Message"
                                                                name="reviewerNote"
                                                                data={
                                                                    comments ||
                                                                    []
                                                                }
                                                                value="id"
                                                                text="msg"
                                                            />
                                                        </Col>
                                                    )}
                                                    {values?.reviewerNote !==
                                                        "Everything Ok" &&
                                                    commentShow ? (
                                                        <Col
                                                            md={6}
                                                            className="mb-20"
                                                        >
                                                            <InputTextArea
                                                                label="Comment"
                                                                name="reviewerComment"
                                                                type="text"
                                                            />
                                                        </Col>
                                                    ) : null}

                                                    {reviewType ===
                                                        ReviewStatus.CANCELED && (
                                                        <Col
                                                            md={12}
                                                            className="mb-20"
                                                        >
                                                            <InputSelect
                                                                label="Reaso n for Rejection"
                                                                name="reasonForRejectionId"
                                                                data={
                                                                    reasonForRejections.data ||
                                                                    []
                                                                }
                                                                value="id"
                                                                text="reasonForRejection"
                                                                onChange={(e) =>
                                                                    setFieldValue(
                                                                        `reasonForRejectionId`,
                                                                        parseInt(
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    )
                                                                }
                                                            />
                                                        </Col>
                                                    )}
                                                    {reviewType ===
                                                        ReviewStatus.REVIEW_BACKWARD && (
                                                        <Col
                                                            md={6}
                                                            className="mb-20"
                                                        >
                                                            <InputSelect
                                                                label="Send To"
                                                                name="toReviewerUserId"
                                                                data={
                                                                    reviewerFilteredListDes ||
                                                                    []
                                                                }
                                                                value="userRoleId"
                                                                text="userRoleName"
                                                                // onChange={(e) =>
                                                                //   setFieldValue(`toReviewerUserId`, parseInt(e.target.value))
                                                                // }
                                                            />
                                                        </Col>
                                                    )}
                                                    <Col
                                                        md={12}
                                                        className="pb-40"
                                                    >
                                                        <Button
                                                            variant="success"
                                                            className="f-right ml-5 "
                                                            type="submit"
                                                        >
                                                            Submit
                                                        </Button>
                                                        <Button
                                                            variant="danger"
                                                            className="f-right ml-5 "
                                                            onClick={() => {
                                                                setReviewType(
                                                                    ""
                                                                );
                                                            }}
                                                        >
                                                            Cancel
                                                        </Button>
                                                    </Col>
                                                </Row>
                                            )}
                                        </Form>
                                    );
                                }}
                            </Formik>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </React.Fragment>
    );
};

export default ReviewView;
