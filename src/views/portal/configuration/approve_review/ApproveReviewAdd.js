import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { callApi, selectApi } from "../../../../reducers/apiSlice";
import { Link, useHistory } from "react-router-dom";
import { Formik } from "formik/dist/index";
import { Button, Card } from "@themesberg/react-bootstrap";
import { DefaultCard } from "../../../../components/card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";
import ProgressBar from "react-topbar-progress-indicator";
import { UrlBuilder } from "../../../../helpers/UrlBuilder";
import ApproveReviewForm from "./ApproveReviewForm";
import { ApproveReview } from "./ApproveReview";
import { selectToastAlert } from "reducers/toastAlertSlice";
import { useEffect } from "react";

const ApproveReviewAdd = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { type } = useSelector(selectToastAlert);
    const { loading } = useSelector(selectApi);

    useEffect(() => {
        if (type === "success") {
            history.push("/portal/configuration/approve-review");
        }
    });

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
                        initialValues={ApproveReview}
                        validationSchema={ApproveReview.validator}
                        onSubmit={(values, { resetForm }) => {
                            dispatch(
                                callApi({
                                    operationId: UrlBuilder.reviewerApi(
                                        "approve-review-config/save"
                                    ),
                                    output: "approve_review_add",
                                    parameters: {
                                        method: "POST",
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
                            return <ApproveReviewForm {...props} type="add" />;
                        }}
                    </Formik>
                </Card.Body>
            </Card>
        </DefaultCard>
    );
};

export default ApproveReviewAdd;
