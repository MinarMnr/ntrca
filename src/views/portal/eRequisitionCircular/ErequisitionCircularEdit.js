import React, { useEffect } from "react";
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

const ErequisitionCircularEdit = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();

    /**
     * Get loading indicator and data from 'selectApi' state
     */
    const {
        loading,
        details = {
            data: {},
        },
        eRequisition_update = {
            data: {},
        },
    } = useSelector(selectApi);

    const cardProps = {
        title: "ই-রিকুইজিশন ইডিট করুন",
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

    /**
     * Get data through api call by dispatching 'callApi'.
     */
    useEffect(() => {
        dispatch(
            callApi({
                operationId: UrlBuilder.ntrcaApi(
                    `institute-job-requisition-circular/details/${props.match.params.id}`
                ),
                output: "details",
                storeName: "eCircularDetails",
            })
        );
    }, [dispatch, props.match.params.id]);

    let data = {};

    if (details?.data !== undefined) {
        data = JSON.parse(JSON.stringify(details.data));
        data.effectiveDate = moment(data.effectiveDate).format(
            "YYYY-MM-DD h:mm a"
        );
        data.publishDate = moment(data.publishDate).format("YYYY-MM-DD h:mm a");
        data.expiryDate = moment(data.expiryDate).format("YYYY-MM-DD h:mm a");
    }

    return (
        <DefaultCard className="mb-50" {...cardProps}>
            <Card border="white">
                <Card.Body>
                    {loading && <ProgressBar />}
                    <Formik
                        initialValues={Erequisition.fromJson(data)}
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

                            values?.files == undefined
                                ? (values.encloserList = null)
                                : (values.encloserList = [
                                      { id: values.encloserList[0]?.id },
                                  ]);

                            let data = Erequisition.toFormDataEdit(values);
                            // data.append("encloserList", values.encloserList[0]);
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
                                            "institute-job-requisition-circular/update"
                                        ),
                                        output: "eRequisition_update",
                                        parameters: {
                                            method: "POST",
                                            body: data,
                                            hasFile: true,
                                        },
                                    })
                                );
                            }

                            if (eRequisition_update?.status === "success") {
                                history.push(`/portal/e-requisition/circular`);
                            }
                            //resetForm();
                        }}
                    >
                        {(props) => {
                            return (
                                <ErequisitionCircularForm
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

export default ErequisitionCircularEdit;
