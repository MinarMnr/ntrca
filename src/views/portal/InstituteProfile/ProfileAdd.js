import React, { useEffect } from "react";
import { faList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { Button, Card, Container } from "@themesberg/react-bootstrap";
import { Formik } from "formik/dist/index";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import ProgressBar from "react-topbar-progress-indicator";

import { FieldArray, Field } from "formik/dist/index";

import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";

import ProfileForm from "./ProfileForm";

import { callApi, selectApi } from "reducers/apiSlice";
import { UrlBuilder } from "helpers/UrlBuilder";
import { DefaultCard } from "components/card";
import { Card } from "@themesberg/react-bootstrap";
import { Button } from "bootstrap";
import { Profile } from "./Profile";
import { AuthUser } from "helpers/AuthUser";
import { ScrollToFieldError } from "helpers/ScrollToFieldError";

const ProfileAdd = () => {
    const dispatch = useDispatch();

    const {
        loading,
        details = {
            data: {},
        },
    } = useSelector(selectApi);

    // details?.data?.instituteId = AuthUser?.getInstituteId();

    useEffect(() => {
        dispatch(
            callApi({
                operationId: UrlBuilder.ntrcaApi(
                    `institute-head-and-governing-body-chairman/details/${AuthUser?.getInstituteId()}`
                ),
                output: "details",
                storeName: "profileDetails",
            })
        );
    }, [dispatch]);

    // let data = [{}];

    return (
        <DefaultCard>
            <Card border="white">
                <Card.Body>
                    {loading && <ProgressBar />}
                    <Formik
                        initialValues={Profile.fromJson(details.data)}
                        enableReinitialize={true}
                        validationSchema={Profile.validator(details?.data)}
                        onSubmit={(values, { resetForm }) => {
                            let request = Profile.toFormData(values);
                            values.instituteId = AuthUser?.getInstituteId();

                            request.append(
                                "instituteHeadSignature ",
                                values?.instituteHeadSignatureUrl
                            );
                            request.append(
                                "instituteHeadPhoto ",
                                values?.instituteHeadPhotoUrl
                            );
                            request.append(
                                "instituteHeadNidFront ",
                                values?.instituteHeadNidUrlFront
                            );
                            request.append(
                                "instituteHeadNidRear ",
                                values?.instituteHeadNidUrlRear
                            );
                            request.append(
                                "governingBodyChairmanSignature ",
                                values?.governingBodyChairmanSignatureUrl
                            );
                            request.append(
                                "governingBodyChairmanPhoto ",
                                values?.governingBodyChairmanPhotoUrl
                            );
                            request.append(
                                "governingBodyChairmanNidFront ",
                                values?.governingBodyChairmanNidUrlFront
                            );
                            request.append(
                                "governingBodyChairmanNidRear ",
                                values?.governingBodyChairmanNidUrlRear
                            );
                            if (details?.data?.id) {
                                dispatch(
                                    callApi({
                                        operationId: UrlBuilder.ntrcaApi(
                                            "institute-head-and-governing-body-chairman/update"
                                        ),
                                        output: "Profile_save",
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
                                            "institute-head-and-governing-body-chairman/save"
                                        ),
                                        output: "Profile_save",
                                        parameters: {
                                            method: "POST",
                                            body: request,
                                            hasFile: true,
                                        },
                                    })
                                );
                            }
                        }}
                    >
                        {(props) => {
                            return (
                                <>
                                    <ScrollToFieldError />
                                    <ProfileForm {...props} formType="add" />
                                </>
                            );
                        }}
                    </Formik>
                </Card.Body>
            </Card>
        </DefaultCard>
    );
};

export default ProfileAdd;
