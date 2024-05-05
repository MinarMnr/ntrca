import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { callApi, selectApi } from "../../../../reducers/apiSlice";
import { Link } from "react-router-dom";
import { Formik } from "formik/dist/index";
import { Button, Card } from "@themesberg/react-bootstrap";
import { DefaultCard } from "../../../../components/card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";
import PayscaleForm from "./PayscaleForm";
import { PayScale } from "./Payscale";
import { UrlBuilder } from "../../../../helpers/UrlBuilder";

const PayscaleAdd = () => {
    const dispatch = useDispatch();

    const cardProps = {
        title: "Add New  Pay Scale",
        headerSlot: () => (
            <>
                <Link to="/portal/settings/pay-scale">
                    <Button
                        variant="link"
                        className="f-right btn-sm p-5 btn-color"
                    >
                        <FontAwesomeIcon icon={faList} className="me-2" />
                        View Pay Scale List
                    </Button>
                </Link>
            </>
        ),
    };

    return (
        <DefaultCard className="mb-50" {...cardProps}>
            <Card border="white" className="table-wrapper table-responsive">
                <Card.Body>
                    {/* {loading && <ProgressBar />} */}
                    <Formik
                        initialValues={PayScale}
                        validationSchema={PayScale.validation()}
                        onSubmit={(values, { resetForm }) => {
                            dispatch(
                                callApi({
                                    operationId:
                                        UrlBuilder.ntrcaApi("pay-scale/save"),
                                    output: "payScale",
                                    parameters: {
                                        method: "POST",
                                        body: PayScale.toString(values),
                                        header: {
                                            "Content-Type": "application/json",
                                        },
                                    },
                                })
                            );
                        }}
                    >
                        {(props) => {
                            return <PayscaleForm {...props} />;
                        }}
                    </Formik>
                </Card.Body>
            </Card>
        </DefaultCard>
    );
};

export default PayscaleAdd;
