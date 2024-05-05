import React from "react";
import { faList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, Container } from "@themesberg/react-bootstrap";
import { Formik } from "formik/dist/index";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import ProgressBar from "react-topbar-progress-indicator";
import { DefaultCard } from "../../../../components/card";
import { UrlBuilder } from "../../../../helpers/UrlBuilder";
import { callApi, selectApi } from "../../../../reducers/apiSlice";
import PhaseWiseCircularForm from "./PhaseWiseCircularForm";
import { FieldArray, Field } from "formik/dist/index";
import { InputField, InputSelect } from "../../../../components/form";
import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import { phaseWiseCircularModel } from "./PhaseWiseCircular";
import moment from "moment";

const PhaseWiseCircularAdd = () => {
    const dispatch = useDispatch();

    const { loading } = useSelector(selectApi);

    let history = useHistory();

    const cardProps = {
        title: "গণ বিজ্ঞপ্তি(Phase wise) প্রকাশ করুন",
        headerSlot: () => (
            <>
                <Button
                    variant="link"
                    className="f-right btn-sm p-5 btn-color"
                    onClick={() => {
                        history.goBack();
                    }}
                >
                    <FontAwesomeIcon icon={faList} className="me-2" />
                    গণ বিজ্ঞপ্তি (Phase Wise) তালিকা
                </Button>
            </>
        ),
    };

    return (
        <DefaultCard className="mb-50" {...cardProps}>
            <Card border="white">
                <Card.Body>
                    {loading && <ProgressBar />}
                    <Formik
                        initialValues={phaseWiseCircularModel}
                        enableReinitialize={true}
                        validationSchema={phaseWiseCircularModel.validator()}
                        onSubmit={(values, { resetForm }) => {
                            values.circularPublishDate = moment(
                                values.circularPublishDate
                            ).format("YYYY-MM-DD hh:mm a");

                            values.circularEffectiveDate = moment(
                                values.circularEffectiveDate
                            ).format("YYYY-MM-DD hh:mm a");

                            values.circularExpiryDate = moment(
                                values.circularExpiryDate
                            ).format("YYYY-MM-DD hh:mm a");

                            let request =
                                phaseWiseCircularModel.toFormData(values);
                            request.append("file", values.file);

                            dispatch(
                                callApi({
                                    operationId: UrlBuilder.ntrcaApi(
                                        "phase-wise-job-application-circular/save"
                                    ),
                                    output: "phase-wise-save",
                                    parameters: {
                                        method: "POST",
                                        body: request,
                                        hasFile: true,
                                    },
                                })
                            );
                            resetForm();
                        }}
                    >
                        {(props) => {
                            return (
                                <PhaseWiseCircularForm
                                    {...props}
                                    formType="add"
                                />
                            );
                        }}
                    </Formik>
                </Card.Body>
            </Card>
        </DefaultCard>
    );
};

export default PhaseWiseCircularAdd;
