import { faList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card } from "@themesberg/react-bootstrap";
import { Formik } from "formik/dist/index";
import * as React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProgressBar from "react-topbar-progress-indicator";
import { DefaultCard } from "../../../../components/card";
import { callApi, selectApi } from "../../../../reducers/apiSlice";
import { MpoTeacherRegulation } from "./Regulation";
import MpoTeacherRegulationForm from "./RegulationForm";
import { UrlBuilder } from "../../../../helpers/UrlBuilder";

const MpoTeacherRegulationEdit = (props) => {
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
                    `govt-regulation-recruitment-post-subject-level-grade/details/${props.match.params.id}`
                ),
                output: "details",
                storeName: "regulationDetails",
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
        title: "পদভিত্তিক ন্যূনতম যোগ্যতা সংশোধন",
        headerSlot: () => (
            <>
                <Link to="/portal/settings/regulations/list">
                    <Button
                        variant="link"
                        className="f-right btn-sm p-5 btn-color"
                    >
                        <FontAwesomeIcon icon={faList} className="me-2" />
                        পদভিত্তিক ন্যূনতম যোগ্যতা তালিকা
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
                        initialValues={details?.data}
                        enableReinitialize={true}
                        validationSchema={MpoTeacherRegulation.validation()}
                        onSubmit={async (values, { resetForm }) => {
                            /**
                             * Save data through POST api by dispatching 'callApi'.
                             */

                            if (
                                typeof values?.postSubjectIdDtoList !== "object"
                            ) {
                                try {
                                    values.postSubjectIdDtoList = JSON.parse(
                                        values?.postSubjectIdDtoList
                                    );
                                } catch (error) {
                                    // Handle the error or log it

                                    // You can set a default value or take appropriate action based on the error
                                    values.postSubjectIdDtoList = []; // Set to an empty array or any default value
                                }
                            }

                            let check = true;

                            if (values?.postSubjectIdDtoList?.length == 0) {
                                check = false;
                            }

                            // let request = regulation

                            let data = MpoTeacherRegulation.fromJson(
                                values,
                                "add"
                            );
                            if (!check) {
                                dispatch(
                                    setToastAlert({
                                        type: "warning",
                                        message: "বিষয় নির্বাচন করুন",
                                    })
                                );
                            } else {
                                dispatch(
                                    callApi({
                                        operationId: UrlBuilder.ntrcaApi(
                                            "govt-regulation-recruitment-post-subject-level-grade/update"
                                        ),
                                        parameters: {
                                            method: "PUT",
                                            body: JSON.stringify(data),
                                            header: {
                                                "Content-Type":
                                                    "application/json",
                                            },
                                        },
                                    })
                                );
                            }
                        }}
                    >
                        {(props) => {
                            return (
                                <MpoTeacherRegulationForm
                                    {...props}
                                    formType="edit"
                                />
                            );
                        }}
                    </Formik>
                </Card.Body>
            </Card>
        </DefaultCard>
    );
};

export default MpoTeacherRegulationEdit;
