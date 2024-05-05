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
import { SubjectWisePostConstructor } from "./SubjectWisePost";
import SubjectWisePostForm from "./SubjectWisePostForm";

const SubjectWisePostAdd = () => {
    const dispatch = useDispatch();

    const { loading } = useSelector(selectApi);

    const cardProps = {
        title: "বিষয় অনুযায়ী পদবি যোগ করুন",
        headerSlot: () => (
            <>
                <Link to="/portal/settings/subject-wise-post">
                    <Button
                        variant="link"
                        className="f-right btn-sm p-5 btn-color"
                    >
                        <FontAwesomeIcon icon={faList} className="me-2" />
                        বিষয় অনুযায়ী পদের তালিকা দেখুন
                    </Button>
                </Link>
            </>
        ),
    };

    let data = {
        id: 2,
        subjects: [
            {
                subjectId: 1,
                subjectName: "None",
            },
        ],
        designations: [
            {
                designationId: 1,
                designationName: "teacher",
            },
        ],
        institutesList: [
            {
                subjectName: "ICT",
                subjectCode: "101",
            },
        ],
    };
    return (
        <DefaultCard className="mb-50" {...cardProps}>
            <Card border="white" className="table-wrapper table-responsive">
                <Card.Body>
                    {loading && <ProgressBar />}
                    <Formik
                        initialValues={SubjectWisePostConstructor}
                        validationSchema={SubjectWisePostConstructor.validation()}
                        onSubmit={(values, { resetForm }) => {
                            dispatch(
                                callApi({
                                    operationId: UrlBuilder.ntrcaApi(
                                        "institute-level-designation-wise-subject/save"
                                    ),
                                    output: "subjectWisePostSave",
                                    parameters: {
                                        method: "POST",
                                        body: SubjectWisePostConstructor.toString(
                                            values
                                        ),
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
                            return <SubjectWisePostForm {...props} />;
                        }}
                    </Formik>
                </Card.Body>
            </Card>
        </DefaultCard>
    );
};

export default SubjectWisePostAdd;
