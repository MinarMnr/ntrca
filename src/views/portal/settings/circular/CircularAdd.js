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
import CircularForm from "./CircularForm";
import { FieldArray, Field } from "formik/dist/index";
import { InputField, InputSelect } from "../../../../components/form";
import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import { circularModel } from "./Circular";
import moment from "moment";
import { setToastAlert } from "reducers/toastAlertSlice";

const CircularAdd = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const {
        loading,
        circular_save = {
            data: {},
        },
    } = useSelector(selectApi);

    const cardProps = {
        title: "গণ বিজ্ঞপ্তি প্রকাশ করুন",
        headerSlot: () => (
            <>
                <Link to="/portal/circular/list">
                    <Button
                        variant="link"
                        className="f-right btn-sm p-5 btn-color"
                    >
                        <FontAwesomeIcon icon={faList} className="me-2" />
                        গণ বিজ্ঞপ্তির তালিকা দেখুন
                    </Button>
                </Link>

                {/* <Link to="/portal/circular/list">
                    <Button
                        variant="success"
                        className="f-right btn-sm p-5 btn-success mr-10"
                    >
                        <FontAwesomeIcon icon={faPlus} className="me-2" />
                        ক্লোন করুন
                    </Button>
                </Link> */}
            </>
        ),
    };

    return (
        <DefaultCard className="mb-50" {...cardProps}>
            <Card border="white">
                <Card.Body>
                    {loading && <ProgressBar />}
                    <Formik
                        initialValues={circularModel}
                        enableReinitialize={true}
                        validationSchema={circularModel.validator()}
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
                            values.ageLimitAsOfDate = moment(
                                values.ageLimitAsOfDate
                            ).format("YYYY-MM-DD hh:mm a");

                            if (typeof values.govtRegulationId != "object") {
                                values.govtRegulationId = JSON.parse(
                                    values?.govtRegulationId
                                );
                            }

                            let check = true;

                            if (values?.govtRegulationId?.length == 0) {
                                check = false;
                            }

                            let data = circularModel.toFormData(values);
                            data.append(
                                "files",
                                values?.files == undefined
                                    ? null
                                    : values.files[0]
                            );

                            if (!check) {
                                dispatch(
                                    setToastAlert({
                                        type: "warning",
                                        message:
                                            "নীতিমালা নির্বাচন করুন",
                                    })
                                );
                            } else {
                                dispatch(
                                    callApi({
                                        operationId: UrlBuilder.ntrcaApi(
                                            "job-application-circular/save"
                                        ),
                                        output: "circular_save",
                                        parameters: {
                                            method: "POST",
                                            body: data,
                                            hasFile: true,
                                        },
                                    })
                                );

                                if (circular_save?.status === "success") {
                                    history.push(`/portal/circular/list`);
                                }
                            }
                            // resetForm();
                        }}
                    >
                        {(props) => {
                            return <CircularForm {...props} formType="add" />;
                        }}
                    </Formik>
                </Card.Body>
            </Card>
        </DefaultCard>
    );
};

export default CircularAdd;
