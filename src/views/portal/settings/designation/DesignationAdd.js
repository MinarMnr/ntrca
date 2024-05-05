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
import { Designation } from "./Designation";
import DesignationForm from "./DesignationForm";

const DesignationAdd = () => {
    const dispatch = useDispatch();

    const { loading } = useSelector(selectApi);

    const cardProps = {
        title: "Add New Designation",
        headerSlot: () => (
            <>
                <Link to="/portal/settings/designation/list">
                    <Button
                        variant="link"
                        className="f-right btn-sm p-5 btn-color"
                    >
                        <FontAwesomeIcon icon={faList} className="me-2" />
                        View Designation List
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
                            initialValues={Designation}
                            validationSchema={Designation.validation()}
                            onSubmit={(values, { resetForm }) => {
                                dispatch(
                                    callApi({
                                        operationId:
                                            UrlBuilder.ntrcaApi(
                                                "designation/save"
                                            ),
                                        output: "designation_save",
                                        parameters: {
                                            method: "POST",
                                            body: Designation.toString(values),
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
                                return <DesignationForm {...props} />;
                            }}
                        </Formik>
                    </Card.Body>
                </Card>
            </Container>
        </DefaultCard>
    );
};

export default DesignationAdd;
