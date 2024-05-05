import * as React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callApi, selectApi } from "../../../../reducers/apiSlice";
import { Link, useHistory } from "react-router-dom";
import { Formik } from "formik/dist/index";
import { Button, Card } from "@themesberg/react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";
import ProgressBar from "react-topbar-progress-indicator";
import { UrlBuilder } from "../../../../helpers/UrlBuilder";
import { DefaultCard } from "../../../../components/card";
import { selectToastAlert } from "reducers/toastAlertSlice";
import DemoNidForm from "./DemoNidForm";
import { DemoNid } from "./DemoNid";

const DemoEdit = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { type } = useSelector(selectToastAlert);

    /**
     * Get loading indicator and data from 'selectApi' state
     */
    const {
        loading,
        mockNidDetails = {
            data: {},
        },
    } = useSelector(selectApi);

    /**
     * Get data through api call by dispatching 'callApi'.
     */
    useEffect(() => {
        dispatch(
            callApi({
                operationId: UrlBuilder.commonApi(
                    `mock-nid/find/${props.match.params.id}`
                ),
                output: "mockNidDetails",
                storeName: "mockNidDetails",
            })
        );
    }, [dispatch, props.match.params.id]);

    useEffect(() => {
        if (type === "success") {
            history.push("/portal/settings/demo-nid/list");
        }
    });

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
                        initialValues={DemoNid.fromJson(mockNidDetails.data)}
                        enableReinitialize
                        validationSchema={DemoNid.validator()}
                        onSubmit={(values, { resetForm }) => {
                            dispatch(
                                callApi({
                                    operationId:
                                        UrlBuilder.commonApi("mock-nid/update"),
                                    output: "demo_nid_edit",
                                    parameters: {
                                        method: "PUT",
                                        body: JSON.stringify(values),
                                        header: {
                                            "Content-Type": "application/json",
                                        },
                                    },
                                })
                            );
                        }}
                    >
                        {(props) => {
                            return <DemoNidForm {...props} type="edit" />;
                        }}
                    </Formik>
                </Card.Body>
            </Card>
        </DefaultCard>
    );
};

export default DemoEdit;
