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
import { MpoTeacherRegulation } from "./Regulation";
import MpoTeacherRegulationForm from "./RegulationForm";
import { setToastAlert } from "reducers/toastAlertSlice";
import { ScrollToFieldError } from "helpers/ScrollToFieldError";

const RegulationAdd = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const { loading } = useSelector(selectApi);

    const cardProps = {
        title: "পদভিত্তিক ন্যূনতম যোগ্যতা যোগ করুন",
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
                        initialValues={MpoTeacherRegulation}
                        enableReinitialize={true}
                        validationSchema={MpoTeacherRegulation.validation()}
                        onSubmit={(values, { resetForm }) => {
                            if (
                                typeof values.postSubjectIdDtoList !== "object"
                            ) {
                                values.postSubjectIdDtoList = JSON.parse(
                                    values.postSubjectIdDtoList
                                );
                            }

                            let data = MpoTeacherRegulation.fromJson(
                                values,
                                "add"
                            );

                            //return

                            // let request = MpoTeacherRegulation.fromJson(values);

                            let check = true;

                            if (values?.postSubjectIdDtoList?.length === 0) {
                                check = false;
                            }

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
                                            "govt-regulation-recruitment-post-subject-level-grade/save"
                                        ),
                                        output: "regulationAdd",
                                        parameters: {
                                            method: "POST",
                                            body: JSON.stringify(data),
                                        },
                                    })
                                );
                                resetForm();
                            }
                        }}
                    >
                        {(props) => {
                            return (
                                <>
                                    <ScrollToFieldError />
                                    <MpoTeacherRegulationForm
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

export default RegulationAdd;
