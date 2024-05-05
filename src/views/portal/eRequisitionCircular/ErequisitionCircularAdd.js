import React from "react";
import { faList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card } from "@themesberg/react-bootstrap";
import { Formik } from "formik/dist/index";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import ProgressBar from "react-topbar-progress-indicator";
import { DefaultCard } from "../../../components/card";
import { UrlBuilder } from "../../../helpers/UrlBuilder";
import { callApi, selectApi } from "../../../reducers/apiSlice";
import ErequisitionCircularForm from "./ErequisitionCircularForm";
import { Erequisition } from "./ErequisitionCircular";
import moment from "moment";
import { setToastAlert } from "reducers/toastAlertSlice";

const ErequisitionCircularAdd = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const {
        loading,
        details = {
            data: {},
        },
        eRequisition_save = {
            data: {},
        },
    } = useSelector(selectApi);

    const cardProps = {
        title: "নতুন ই-রিকুইজিশন যোগ করুন",
        headerSlot: () => (
            <>
                <Link to="/portal/e-requisition/circular">
                    <Button
                        variant="link"
                        className="f-right btn-sm p-5 btn-color"
                    >
                        <FontAwesomeIcon icon={faList} className="me-2" />
                        ই-রিকুইজিশন তালিকা দেখুন
                    </Button>
                </Link>
            </>
        ),
    };

    return (
        <DefaultCard className="mb-50" {...cardProps}>
            <Card border="white">
                <Card.Body>
                    {loading && <ProgressBar />}
                    <Formik
                        initialValues={Erequisition}
                        enableReinitialize={true}
                        validationSchema={Erequisition.validator()}
                        onSubmit={(values, { resetForm }) => {
                            values.publishDate = moment(
                                values.publishDate
                            ).format("YYYY-MM-DD hh:mm a");

                            values.effectiveDate = moment(
                                values.effectiveDate
                            ).format("YYYY-MM-DD hh:mm a");

                            values.expiryDate = moment(
                                values.expiryDate
                            ).format("YYYY-MM-DD hh:mm a");

                            if (typeof values.instituteTypeList != "object") {
                                values.instituteTypeList = JSON.parse(
                                    values?.instituteTypeList
                                );
                            }

                            let check = true;

                            if (values?.instituteTypeList?.length == 0) {
                                check = false;
                            }

                            let data = Erequisition.toFormData(values);
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
                                            "প্রতিষ্ঠানের ধরন নির্বাচন করুন",
                                    })
                                );
                            } else {
                                dispatch(
                                    callApi({
                                        operationId: UrlBuilder.ntrcaApi(
                                            "institute-job-requisition-circular/save"
                                        ),
                                        output: "eRequisition_save",
                                        parameters: {
                                            method: "POST",
                                            body: data,
                                            hasFile: true,
                                        },
                                    })
                                );
                                // resetForm();
                            }
                            if (eRequisition_save?.status === "success") {
                                history.push(`/portal/e-requisition/circular`);
                            }
                        }}
                    >
                        {(props) => {
                            return (
                                <ErequisitionCircularForm
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

export default ErequisitionCircularAdd;
