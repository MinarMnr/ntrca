import { faList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, Container } from "@themesberg/react-bootstrap";
import { Formik } from "formik/dist/index";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProgressBar from "react-topbar-progress-indicator";
import { DefaultCard } from "../../../../components/card";
import { UrlBuilder } from "../../../../helpers/UrlBuilder";
import { callApi, selectApi } from "../../../../reducers/apiSlice";
import { DesWiseSubject } from "./DesWiseSubject";
import DesWiseSubjectForm from "./DesWiseSubjectForm";

const DesWiseSubjectAdd = () => {
    const dispatch = useDispatch();

    const { loading } = useSelector(selectApi);

    const cardProps = {
        title: "Add New Designation Wise Subject",
        headerSlot: () => (
            <>
                <Link to="/portal/settings/designation-wise-subject/list">
                    <Button
                        variant="link"
                        className="f-right btn-sm p-5 btn-color"
                    >
                        <FontAwesomeIcon icon={faList} className="me-2" />
                        View Designation Wise Subject List
                    </Button>
                </Link>
            </>
        ),
    };

    return (
        <DefaultCard className="mb-50" {...cardProps}>
            <Container fluid="md">
                <Card border="white" className="table-wrapper table-responsive">
                    <Card.Body>
                        {loading && <ProgressBar />}
                        <Formik
                            initialValues={DesWiseSubject}
                            validationSchema={DesWiseSubject.validation()}
                            onSubmit={(values, { resetForm }) => {
                                dispatch(
                                    callApi({
                                        operationId: UrlBuilder.ntrcaApi(
                                            "designation-wise-subject/save"
                                        ),
                                        output: "designation_save",
                                        parameters: {
                                            method: "POST",
                                            body: DesWiseSubject.toString(
                                                values
                                            ),
                                            header: {
                                                "Content-Type":
                                                    "application/json",
                                            },
                                        },
                                    })
                                );
                            }}
                        >
                            {(props) => {
                                return <DesWiseSubjectForm {...props} />;
                            }}
                        </Formik>
                    </Card.Body>
                </Card>
            </Container>
        </DefaultCard>
    );
};

export default DesWiseSubjectAdd;
