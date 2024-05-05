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
import CertificateAddForm from "./CertificateAddForm";

const CertificateAdd = () => {
    const dispatch = useDispatch();

    const { loading } = useSelector(selectApi);

    const cardProps = {
        title: "সনদপত্র যুক্ত করুন",
        headerSlot: () => (
            <>
                <Link to="/portal/settings/certificate/list">
                    <Button
                        variant="link"
                        className="f-right btn-sm p-5 btn-color"
                    >
                        <FontAwesomeIcon icon={faList} className="me-2" />
                        সনদপত্রের তালিকা দেখুন
                    </Button>
                </Link>
            </>
        ),
    };

    let data = {
        institutesList: [
            {
                batch: "12 তম",
                year: "2012",
                roll: "32561",
                reg: "54352763261",
                subject: "ICT",
                instituteType: 1,
            },
        ],
    };
    return (
        <DefaultCard className="mb-50" {...cardProps}>
            <Card border="white" className="table-wrapper table-responsive">
                <Card.Body>
                    {loading && <ProgressBar />}
                    <Formik
                        initialValues={data}
                        // validationSchema={Subject.validation()}
                        onSubmit={(values, { resetForm }) => {
                            // dispatch(
                            //     callApi({
                            //         operationId:
                            //             UrlBuilder.ntrcaApi("subject/save"),
                            //         output: "designation_save",
                            //         parameters: {
                            //             method: "POST",
                            //             body: Subject.toString(values),
                            //             header: {
                            //                 "Content-Type": "application/json",
                            //             },
                            //         },
                            //     })
                            // );
                        }}
                    >
                        {(props) => {
                            return <CertificateAddForm {...props} />;
                        }}
                    </Formik>
                </Card.Body>
            </Card>
        </DefaultCard>
    );
};

export default CertificateAdd;
