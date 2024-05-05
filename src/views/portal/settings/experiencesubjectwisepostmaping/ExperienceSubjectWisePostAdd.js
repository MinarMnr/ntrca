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
import { ExperienceSubjectWisePostConstructor } from "./ExperienceSubjectWisePost";
import ExperienceSubjectWisePostForm from "./ExperienceSubjectWisePostForm";

const ExperienceSubjectWisePostAdd = () => {
    const dispatch = useDispatch();

    const { loading } = useSelector(selectApi);

    const cardProps = {
        title: "স্তর ও বিষয় ভিত্তিক পদবি যোগ করুন",
        headerSlot: () => (
            <>
                <Link to="/portal/settings/experience-subject-wise-post">
                    <Button
                        variant="link"
                        className="f-right btn-sm p-5 btn-color"
                    >
                        <FontAwesomeIcon icon={faList} className="me-2" />
                        স্তর ও বিষয় ভিত্তিক পদবি তালিকা দেখুন
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
                        initialValues={ExperienceSubjectWisePostConstructor}
                        validationSchema={ExperienceSubjectWisePostConstructor.validation()}
                        onSubmit={(values, { resetForm }) => {
                            // if(values?.subjectId == ""){
                            //     values?.subjectId = 1;
                            // }

                            dispatch(
                                callApi({
                                    operationId: UrlBuilder.ntrcaApi(
                                        "post-subject-education-level-mapping/save"
                                    ),
                                    output: "subjectWisePostSave",
                                    parameters: {
                                        method: "POST",
                                        body: ExperienceSubjectWisePostConstructor.toString(
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
                            return <ExperienceSubjectWisePostForm {...props} />;
                        }}
                    </Formik>
                </Card.Body>
            </Card>
        </DefaultCard>
    );
};

export default ExperienceSubjectWisePostAdd;
