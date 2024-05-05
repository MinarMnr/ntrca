import { faEdit, faList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, Table, Image, } from "@themesberg/react-bootstrap";
import * as React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProgressBar from "react-topbar-progress-indicator";
import { DefaultCard } from "../../../components/card";
import { callApi, selectApi } from "../../../reducers/apiSlice";
import {
    InputField,
    InputSelect,
    InputTextArea,
} from "../../../components/form";
// import { UrlBuilder } from "../../../helpers/UrlBuilder";
import { AuthUser } from "../../../helpers/AuthUser";
import Payment from "../../../@core/assets/img/payment1.jpeg";
import "./Payment.scss";
const PaymentPage = (props) => {
    /**
     * useDispatch: dispatch actions
     */
    const dispatch = useDispatch();
    const { link, sender, image, time, message, read = false } = props;
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


    return (
        <>
            <div className="pspacer details-page">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card card-box" style={{ height: "93vh", overflowY: "auto" }}>
                            <div className="card-head payment">
                                <header className=" header">
                                    <h2 className="text-center">
                                    টাকা প্রদান
                                    </h2>
                                </header>
                            </div>

                            <div className="card-body " id="payment">
                                <div class="row">
                                    <div class="col-lg-6 col-sm-12 offset-3 mx-auto">
                                        <div className="payment-body">
                                            <div class=" payment-card text-center">
                                                <Image
                                                    src={Payment}
                                                    className=""
                                                />
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
