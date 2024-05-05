import { faList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card } from "@themesberg/react-bootstrap";
import { Formik } from "formik/dist/index";
import * as React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProgressBar from "react-topbar-progress-indicator";
import { DefaultCard } from "../../../../components/card";
import { callApi, clearState, selectApi } from "../../../../reducers/apiSlice";
import { Circular } from "./Circular";
import CircularForm from "./CircularForm";
import { UrlBuilder } from "../../../../helpers/UrlBuilder";
import { AuthUser } from "../../../../helpers/AuthUser";
import { useHistory } from "react-router-dom";
//import './Country.scss'
import { useParams } from "react-router-dom";
import { useRef } from "react";
import moment from "moment";

const CircularEdit = (props) => {
    /**
     * useDispatch: dispatch actions
     */
    const dispatch = useDispatch();
    const history = useHistory();
    const { clone } = useParams();
    const circularStatus = useRef("");
    const operationId = useRef(
        UrlBuilder.foreignApi("scholarship-circular/save")
    );
    /**
     * Get loading indicator and data from 'selectApi' state
     */
    const {
        loading,
        details = {
            data: {},
        },
        editData = {
            data: {},
        },
    } = useSelector(selectApi);

    /**
     * Get data through api call by dispatching 'callApi'.
     */
    useEffect(() => {
        dispatch(
            callApi({
                operationId: UrlBuilder.foreignApi(
                    `scholarship-circular/find/${props.match.params.id}`
                ),
                output: "details",
                storeName: "circular",
            })
        );
    }, [dispatch, props.match.params.id]);

    useEffect(() => {
        if (editData && editData.status && editData.status == "success") {
            dispatch(
                clearState({
                    output: "editData",
                })
            );
            history.push("/scholarship-circular");
        }
    }, [dispatch, editData]);

    let data = {};

    if (details?.data !== undefined) {
        data = JSON.parse(JSON.stringify(details.data));
        data.effectiveDate = moment(data.effectiveDate).format(
            "YYYY-MM-DD h:mm:ss"
        );
        data.publishedDate = moment(data.publishedDate).format(
            "YYYY-MM-DD h:mm:ss"
        );
        data.expiryDate = moment(data.expiryDate).format("YYYY-MM-DD h:mm:ss");
    }

    /**
     * cardProps must need to pass into DefaultCard component.
     * headerSlot: this is a placeholder for action buttons on card header.
     *
     * @type {{headerSlot: (function(): *), title: string}}
     */

    const cardProps = {
        title: clone == "clone" ? "Add Circular" : "Edit Circular",
        headerSlot: () => (
            <>
                <Link to="/scholarship-circular">
                    <Button
                        variant="link"
                        className="f-right btn-sm p-5 btn-color"
                    >
                        <FontAwesomeIcon icon={faList} className="me-2" /> View
                        Circular List
                    </Button>
                </Link>
            </>
        ),
    };

    const statusvalue = (status) => {
        circularStatus.current = status;
        if (clone == "clone" && status == "draft") {
            operationId.current = UrlBuilder.foreignApi(
                "scholarship-circular/draft"
            );
        } else if (clone == "clone" && status == "publish") {
            operationId.current = UrlBuilder.foreignApi(
                "scholarship-circular/publish-now"
            );
        }
    };

    return (
        <DefaultCard className="mb-50" {...cardProps}>
            <Card border="white" className="table-wrapper table-responsive">
                <Card.Body>
                    {loading && <ProgressBar />}
                    <Formik
                        initialValues={Circular.fromJson(data)}
                        enableReinitialize={true}
                        validationSchema={Circular.validator()}
                        onSubmit={(values) => {
                            values.publishedDate = moment(
                                values.publishedDate
                            ).format("YYYY-MM-DDThh:mm");
                            values.effectiveDate = moment(
                                values.effectiveDate
                            ).format("YYYY-MM-DDThh:mm");
                            values.expiryDate = moment(
                                values.expiryDate
                            ).format("YYYY-MM-DDThh:mm");
                            /**
                             * Save data through POST api by dispatching 'callApi'.
                             */
                            dispatch(
                                callApi({
                                    operationId:
                                        clone == "clone"
                                            ? operationId.current
                                            : circularStatus.current === "draft"
                                            ? UrlBuilder.foreignApi(
                                                  "scholarship-circular/update/DRAFT"
                                              )
                                            : circularStatus.current === "save"
                                            ? UrlBuilder.foreignApi(
                                                  "scholarship-circular/update/ACTIVE"
                                              )
                                            : UrlBuilder.foreignApi(
                                                  "scholarship-circular/update/1"
                                              ),
                                    output: "editData",
                                    parameters: {
                                        method:
                                            clone == "clone" ? "POST" : "PUT",
                                        body: Circular.toString(values),
                                        header: {
                                            "Content-Type": "application/json",
                                        },
                                    },
                                })
                            );
                        }}
                    >
                        {(props) => {
                            return (
                                <CircularForm
                                    formType="edit"
                                    {...props}
                                    circularStatus={statusvalue}
                                />
                            );
                        }}
                    </Formik>
                </Card.Body>
            </Card>
        </DefaultCard>
    );
};

export default CircularEdit;
