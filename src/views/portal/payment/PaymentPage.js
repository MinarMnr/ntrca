import { faEdit, faList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, Table } from "@themesberg/react-bootstrap";
import * as React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProgressBar from "react-topbar-progress-indicator";
import { DefaultCard } from "../../../components/card";
import { callApi, selectApi } from "../../../reducers/apiSlice";
import { Formik, Form } from "formik/dist/index";
import {
    InputField,
    InputSelect,
    InputTextArea,
} from "../../../components/form";
// import { UrlBuilder } from "../../../helpers/UrlBuilder";
import { AuthUser } from "../../../helpers/AuthUser";
import "./Payment.scss";
const PaymentPage = (props) => {
    /**
     * useDispatch: dispatch actions
     */
    const dispatch = useDispatch();

    /**
     * Get loading indicator and data from 'selectApi' state
     */
    const {
        loading,
        details = {
            data: {},
        },
    } = useSelector(selectApi);

    /**
     * Get data through api call by dispatching 'callApi'.
     */
    useEffect(() => {
        dispatch(
            callApi({
                // operationId: UrlBuilder.foreignApi(
                //     ``
                // ),
                // output: "details",
                // storeName: "",
            })
        );
    }, [dispatch, props.match.params.id]);

    /**
     * cardProps must need to pass into DefaultCard component.
     * headerSlot: this is a placeholder for action buttons on card header.
     *
     * @type {{headerSlot: (function(): *), title: string}}
     */

    let data = {
        applicationTrack: "35663462",
    };

    return (
        <>
            <div className="pspacer details-page">
                <div className="row">
                    <div className="col-lg-12">
                        <div
                            className="card card-box"
                            style={{ height: "93vh", overflowY: "auto" }}
                        >
                            <div className="card-head payment">
                                <header className=" header">
                                    <h2 className="text-center">
                                        টাকা প্রদান পৃষ্ঠা
                                    </h2>
                                </header>
                            </div>

                            <div className="card-body " id="payment">
                                <div class="row">
                                    <div class=" col-xl-6 col-lg-6 col-md-12 col-sm-12 mx-auto">
                                        <div className=" payment-body">
                                            <div className="mb-10">
                                                <Formik initialValues={data}>
                                                    <Form>
                                                        <InputField
                                                            label="আবেদন ট্র্যাকিং নাম্বার"
                                                            name="applicationTrack"
                                                            type="text"
                                                            placeholder="আবেদন ট্র্যাক নম্বর লিখুন"
                                                        />
                                                    </Form>
                                                </Formik>
                                            </div>

                                            <div class=" payment-card text-center">
                                                <span>
                                                    আপনাকে ntrca.com.bd এর
                                                    মাধ্যমে আবেদন ফি (টাকা 100)
                                                    পরিশোধ করতে হবে 72 ঘন্টার
                                                    মধ্যে
                                                </span>
                                                <div>
                                                    <Link to="/portal/payment-method">
                                                        <Button
                                                            variant="link"
                                                            className=" btn-sm p-5 btn-color"
                                                        >
                                                            এখন পরিশোধ করুন
                                                        </Button>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PaymentPage;
