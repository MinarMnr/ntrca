import { faList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, Container } from "@themesberg/react-bootstrap";
import { Formik } from "formik/dist/index";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProgressBar from "react-topbar-progress-indicator";
import { DefaultCard } from "../../../../components/card";
import { UrlBuilder } from "../../../../helpers/UrlBuilder";
import { callApi, selectApi } from "../../../../reducers/apiSlice";
import { Rules } from "./Rules";
import RulesForm from "./RulesForm";
import { setToastAlert } from "reducers/toastAlertSlice";

const RulesAdd = () => {
    const dispatch = useDispatch();

    const { loading } = useSelector(selectApi);

    const cardProps = {
        title: "নিয়মাবলী যোগ করুন",
        headerSlot: () => (
            <>
                <Link to="/portal/settings/rules/list">
                    <Button
                        variant="link"
                        className="f-right btn-sm p-5 btn-color"
                    >
                        <FontAwesomeIcon icon={faList} className="me-2" />
                        নিয়মাবলীর তালিকা দেখুন
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
                        initialValues={Rules}
                        enableReinitialize={true}
                        validationSchema={Rules.validation()}
                        onSubmit={(values, { resetForm }) => {
                            values.ruleValidFrom = moment(
                                values.ruleValidFrom
                            ).format("YYYY-MM-DD hh:mm a");
                            if (
                                typeof values.geographicalPositionNoQuotaList !=
                                "object"
                            ) {
                                values.geographicalPositionNoQuotaList =
                                    JSON.parse(
                                        values?.geographicalPositionNoQuotaList
                                    );
                            }

                            let check = true;

                            if (
                                values?.geographicalPositionNoQuotaList
                                    ?.length == 0
                            ) {
                                check = false;
                            }

                            let data = Rules.toFormData(values);
                            data.append("file", values.file);

                            if (!check) {
                                dispatch(
                                    setToastAlert({
                                        type: "warning",
                                        message: "কোটা নির্বাচন করুন",
                                    })
                                );
                            } else {
                                dispatch(
                                    callApi({
                                        operationId: UrlBuilder.ntrcaApi(
                                            "job-application-rule/save"
                                        ),
                                        output: "rule-save",
                                        parameters: {
                                            method: "POST",
                                            body: data,
                                            hasFile: true,
                                        },
                                    })
                                );
                                // resetForm();
                            }
                        }}
                    >
                        {(props) => {
                            return <RulesForm {...props} formType="add" />;
                        }}
                    </Formik>
                </Card.Body>
            </Card>
        </DefaultCard>
    );
};

export default RulesAdd;
