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
import { Subject } from "./Subject";
import SubjectForm from "./SubjectForm";

const SubjectAdd = () => {
    const dispatch = useDispatch();

    const { loading } = useSelector(selectApi);

    const cardProps = {
        title: "বিষয় যোগ করুন",
        headerSlot: () => (
            <>
                <Link to="/portal/settings/subject/list">
                    <Button
                        variant="link"
                        className="f-right btn-sm p-5 btn-color"
                    >
                        <FontAwesomeIcon icon={faList} className="me-2" />
                        বিষয়ের তালিকা দেখুন
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
                        initialValues={Subject}
                        validationSchema={Subject.validation()}
                        onSubmit={(values, { resetForm }) => {
                            dispatch(
                                callApi({
                                    operationId:
                                        UrlBuilder.ntrcaApi("subject/save"),
                                    output: "designation_save",
                                    parameters: {
                                        method: "POST",
                                        body: Subject.toString(values),
                                        header: {
                                            "Content-Type": "application/json",
                                        },
                                    },
                                })
                            );
                        }}
                    >
                        {(props) => {
                            return <SubjectForm {...props} />;
                        }}
                    </Formik>
                </Card.Body>
            </Card>
        </DefaultCard>
    );
};

export default SubjectAdd;
