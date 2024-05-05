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
import { Post } from "./TeacherPost";
import TeacherPostForm from "./TeacherPostForm";

const TeacherPostAdd = () => {
    let demotada = {
        postNameBn: "প্রভাষক (বাংলা)",
        postNameEn: "lecturer (Bangla)",
        postCode: 102,
        postDetails:
            "মুদ্রণ এবং টাইপসেটিং শিল্পের কেবল ডামি পাঠ্য। লোরেম ইপসাম 1500 এর দশক থেকে শিল্পের মানক ডামি টেক্সট হয়েছে, যখন একটি অজানা প্রিন্টার টাইপের একটি গ্যালি নিয়ে স্ক্র্যাম্বল করে।",
    };

    const dispatch = useDispatch();

    const { loading } = useSelector(selectApi);

    const cardProps = {
        title: "নতুন পদবি যোগ করুন",
        headerSlot: () => (
            <>
                <Link to="/portal/settings/Post/list">
                    <Button
                        variant="link"
                        className="f-right btn-sm p-5 btn-color"
                    >
                        <FontAwesomeIcon icon={faList} className="me-2" />
                        পদের তালিকা দেখুন
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
                        initialValues={Post}
                        validationSchema={Post.validation()}
                        onSubmit={(values, { resetForm }) => {
                            dispatch(
                                callApi({
                                    operationId:
                                        UrlBuilder.ntrcaApi("designation/save"),
                                    output: "designation_save",
                                    parameters: {
                                        method: "POST",
                                        body: Post.toString(values),
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
                            return <TeacherPostForm {...props} />;
                        }}
                    </Formik>
                </Card.Body>
            </Card>
        </DefaultCard>
    );
};

export default TeacherPostAdd;
