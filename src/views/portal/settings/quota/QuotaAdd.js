import { faList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, Container } from "@themesberg/react-bootstrap";
import { Formik } from "formik/dist/index";
import { AuthUser } from "helpers/AuthUser";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProgressBar from "react-topbar-progress-indicator";
import { DefaultCard } from "../../../../components/card";
import { UrlBuilder } from "../../../../helpers/UrlBuilder";
import { callApi, selectApi } from "../../../../reducers/apiSlice";
import { Quota } from "./Quota";
import QuotaForm from "./QuotaForm";

const QuotaAdd = () => {
    const dispatch = useDispatch();

    const { loading } = useSelector(selectApi);

    const cardProps = {
        title: "নতুন কোটা যোগ করুন",
        headerSlot: () => (
            <>
                <Link to="/portal/settings/quota/list">
                    <Button
                        variant="link"
                        className="f-right btn-sm p-5 btn-color"
                    >
                        <FontAwesomeIcon icon={faList} className="me-2" />
                        কোটার তালিকা দেখুন
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
                        initialValues={Quota}
                        validationSchema={Quota.validation()}
                        onSubmit={(values, { resetForm }) => {
                            dispatch(
                                callApi({
                                    operationId:
                                        UrlBuilder.ntrcaApi("quota/save"),
                                    output: "quota_save",
                                    parameters: {
                                        method: "POST",
                                        body: Quota.toString(values),
                                        header: {
                                            "Content-Type": "application/json",
                                        },
                                    },
                                })
                            );
                            resetForm();
                        }}
                    >
                        {(props) => {
                            return <QuotaForm {...props} />;
                        }}
                    </Formik>
                </Card.Body>
            </Card>
        </DefaultCard>
    );
};

export default QuotaAdd;
