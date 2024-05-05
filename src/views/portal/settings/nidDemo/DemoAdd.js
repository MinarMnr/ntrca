import React from "react";
import { faList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, Container } from "@themesberg/react-bootstrap";
import { Formik } from "formik/dist/index";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProgressBar from "react-topbar-progress-indicator";
import { DefaultCard } from "../../../../components/card";

// import { callApi, selectApi } from "../../../../reducers/apiSlice";
import { DemoNid } from "./DemoNid";
import DemoNidForm from "./DemoNidForm";
import { UrlBuilder } from "helpers/UrlBuilder";
import { callApi, selectApi } from "reducers/apiSlice";

const DemoAdd = () => {
    const dispatch = useDispatch();

    const { loading } = useSelector(selectApi);

    const cardProps = {
        title: "নতুন NID যোগ করুন",
        headerSlot: () => (
            <>
                <Link to="/portal/settings/demo-nid/list">
                    <Button
                        variant="link"
                        className="f-right btn-sm p-5 btn-color"
                    >
                        <FontAwesomeIcon icon={faList} className="me-2" />
                        তালিকা দেখুন
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
                        initialValues={DemoNid}
                        validationSchema={DemoNid.validator()}
                        onSubmit={(values, { resetForm }) => {
                            dispatch(
                                callApi({
                                    operationId:
                                        UrlBuilder.commonApi("mock-nid/save"),
                                    output: "mock-nid-save",
                                    parameters: {
                                        method: "POST",
                                        body: JSON.stringify(values),
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
                            return <DemoNidForm {...props} />;
                        }}
                    </Formik>
                </Card.Body>
            </Card>
        </DefaultCard>
    );
};

export default DemoAdd;
