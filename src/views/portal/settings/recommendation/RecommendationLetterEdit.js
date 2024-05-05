import React from "react";
import { Button, Card, Container } from "@themesberg/react-bootstrap";
import { Formik } from "formik/dist/index";
import { useDispatch, useSelector } from "react-redux";
import ProgressBar from "react-topbar-progress-indicator";
import { DefaultCard } from "../../../../components/card";
import { UrlBuilder } from "../../../../helpers/UrlBuilder";
import { callApi, selectApi } from "../../../../reducers/apiSlice";
import RecommendationLetter from "./RecommendationLetter";
import moment from "moment";
import { RecommendationModel } from "./RecommendationModel";
import { useEffect } from "react";
import { ScrollToFieldError } from "helpers/ScrollToFieldError";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";

const RecommendationLetterEdit = () => {
    /**
     * useDispatch: dispatch actions
     */
    const dispatch = useDispatch();

    const param = useParams();

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
                    `recommendation-letter-setting/details/${param?.id}`
                ),
                output: "details",
                storeName: "recommendationDetails",
            })
        );
    }, [dispatch]);

    const cardProps = {
        title: "রিকমেন্ডেশন (Recomendation) লেটার যোগ করুন",
        headerSlot: () => (
            <Link to="/portal/settings/recommendation/list">
                <Button variant="link" className="f-right btn-sm p-5 btn-color">
                    <FontAwesomeIcon icon={faList} className="me-2" />
                    রিকমেন্ডেশন তালিকা দেখুন
                </Button>
            </Link>
        ),
    };

    return (
        <DefaultCard className="mb-50" {...cardProps}>
            <Card border="white">
                <Card.Body>
                    {loading && <ProgressBar />}
                    <Formik
                        initialValues={
                            details?.data &&
                            RecommendationModel.fromJson(details?.data)
                        }
                        enableReinitialize={true}
                        validationSchema={RecommendationModel.validator(
                            details?.data
                        )}
                        onSubmit={(values, { resetForm }) => {
                            let request =
                                RecommendationModel.toFormData(values);

                            request.append("signature", values?.signatureUrl);
                            request.append(
                                "leftSideLogoUrl",
                                values.leftSideLogoUrl
                            );
                            request.append(
                                "rightSideLogoUrl",
                                values.rightSideLogoUrl
                            );

                            if (details?.data?.id) {
                                dispatch(
                                    callApi({
                                        operationId: UrlBuilder.ntrcaApi(
                                            "recommendation-letter-setting/update"
                                        ),
                                        output: "recommendation",
                                        parameters: {
                                            method: "POST",
                                            body: request,
                                            hasFile: true,
                                        },
                                    })
                                );
                            } else {
                                dispatch(
                                    callApi({
                                        operationId: UrlBuilder.ntrcaApi(
                                            "recommendation-letter-setting/save"
                                        ),
                                        output: "recommendation",
                                        parameters: {
                                            method: "POST",
                                            body: request,
                                            hasFile: true,
                                        },
                                    })
                                );
                            }
                            //resetForm();
                        }}
                    >
                        {(props) => {
                            return (
                                <>
                                    <ScrollToFieldError />
                                    <RecommendationLetter
                                        {...props}
                                        formType="add"
                                    />
                                </>
                            );
                        }}
                    </Formik>
                </Card.Body>
            </Card>
        </DefaultCard>
    );
};

export default RecommendationLetterEdit;
