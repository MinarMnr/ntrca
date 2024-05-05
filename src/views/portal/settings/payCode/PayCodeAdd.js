import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { callApi, selectApi } from "../../../../reducers/apiSlice";
import { Link } from "react-router-dom";
import { Formik } from "formik/dist/index";
import { Button, Card } from "@themesberg/react-bootstrap";
import { DefaultCard } from "../../../../components/card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";
import ProgressBar from "react-topbar-progress-indicator";
import { UrlBuilder } from "../../../../helpers/UrlBuilder";
import PayCodeForm from "./PayCodeForm";
import { PayCode } from "./PayCode";
import { AuthUser } from "../../../../helpers/AuthUser";

const PayCodeAdd = () => {
    const dispatch = useDispatch();

    const { loading } = useSelector(selectApi);

    const cardProps = {
        title: "Add New PayCode",
        headerSlot: () => (
            <>
                <Link to="/portal/settings/pay-code">
                    <Button
                        variant="link"
                        className="f-right btn-sm p-5 btn-color"
                    >
                        <FontAwesomeIcon icon={faList} className="me-2" />
                        View PayCode List
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
                        initialValues={PayCode}
                        validationSchema={PayCode.validation()}
                        onSubmit={(values, { resetForm }) => {
                            values.instituteId = parseInt(
                                AuthUser.getUserInstituteID()
                            );

                            dispatch(
                                callApi({
                                    operationId:
                                        UrlBuilder.ntrcaApi("pay-code/save"),
                                    output: "payCode_save",
                                    parameters: {
                                        method: "POST",
                                        body: PayCode.toString(values),
                                        header: {
                                            "Content-Type": "application/json",
                                        },
                                    },
                                })
                            );
                        }}
                    >
                        {(props) => {
                            return <PayCodeForm {...props} />;
                        }}
                    </Formik>
                </Card.Body>
            </Card>
        </DefaultCard>
    );
};

export default PayCodeAdd;
