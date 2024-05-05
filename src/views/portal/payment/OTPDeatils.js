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
import {
    InputField,
    InputSelect,
    InputTextArea,
} from "../../../components/form";
// import { UrlBuilder } from "../../../helpers/UrlBuilder";
import { AuthUser } from "../../../helpers/AuthUser";
import "./Payment.scss";
const OTPDeatils = (props) => {
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
    const cardProps = {
        title: "OTP Details",
        headerSlot: () => (
            <>
                <Link to='/'>
                    <Button variant='link' className='f-right btn-sm p-5 btn-color'>
                        <FontAwesomeIcon icon={faList} className='me-2' /> View Payment
                        List
                    </Button>
                </Link>
            </>
        ),
    };

    return (
        <>
            <div className="pspacer details-page">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card card-box">
                            <div className="card-head payment">
                                <header className=" header">
                                    <h2 className="text-center">
                                        OTP Page
                                    </h2>
                                </header>
                            </div>
                            <div class="card-head p-10"></div>
                            <div className="card-body " id="payment">
                                <div class="card payment-card">
                                    <div class="row">
                                        <div class="col-lg-12 col-sm-12">
                                            <p className="mb-10"> Do not press browser back or forward button while you are in payment page</p>
                                            <div className="table-responsive">
                                                <Table className='table  table-bordered table-striped table-hover mb-15'>
                                                    <tbody>
                                                        <tr>
                                                            <td colspan="2" style={{ background: "linearGradient(320deg, #1662aca3, #356eaceb)!important", padding: "0" }}>
                                                                <h3>Paymnent Summary</h3>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td colspan="2">
                                                                <p className="m-0">Please review the following details for this transaction</p>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className=' '>
                                                                <b>Amount</b>
                                                            </td>
                                                            <td className=''>
                                                                200:00
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className=''>
                                                                <b>Currency</b>
                                                            </td>
                                                            <td className=''>
                                                                BDT
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className=' '>
                                                                <b>Invoice number</b>
                                                            </td>
                                                            <td className=''>
                                                                220096048690
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className=''>
                                                                <b>Description</b>
                                                            </td>
                                                            <td className=''>
                                                                Products
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </Table>
                                            </div>
                                            <div className="table-responsive">
                                                <Table className='table table-responsive table-bordered table-striped table-hover mb-15'>
                                                    <tbody>
                                                        <tr>
                                                            <td colspan="2" style={{ background: "linearGradient(320deg, #1662aca3, #356eaceb)!important", padding: "0" }}>
                                                                <h3>Enter Card Information</h3>
                                                            </td>
                                                        </tr>

                                                        <tr>
                                                            <td className=' '>
                                                                <label>OTP</label>
                                                                <input
                                                                    className="form-control"
                                                                    name="file"
                                                                    type="number"
                                                                    placeholder="Entry OTP" />
                                                                {/* <InputField
                                                                label="Encloser File"
                                                                name="file"
                                                                type="file"
                                                                placeholder="Encloser File"
                                                            /> */}
                                                            </td>
                                                            <td className=''>
                                                                <p>Your entry card information should not be corrupted or become known to the third party.
                                                                    <br />
                                                                    as all transmitted data is encrypted by the SSL protocol</p>
                                                                <div className="card card-box">
                                                                    <h3>Note</h3>
                                                                    <ol>
                                                                        <li>For visa and Mc, look at the backside of your Card to find 3-digit CVV2/CVC2.<br></br> For AMEX,look at the upper right corner of the front 4-digit CSC</li>
                                                                        <li>The cardholder's name should be entered just as</li>
                                                                    </ol>
                                                                </div>

                                                            </td>
                                                        </tr>

                                                    </tbody>
                                                </Table>
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

export default OTPDeatils;
