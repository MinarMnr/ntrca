import { faList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card } from "@themesberg/react-bootstrap";
import { Formik } from "formik/dist/index";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProgressBar from "react-topbar-progress-indicator";
import { DefaultCard } from "../../../../components/card";
import { UrlBuilder } from "../../../../helpers/UrlBuilder";
import { callApi, selectApi } from "../../../../reducers/apiSlice";

import GovtReglationForm from "./GovtRegulationForm";
import { govtRegulation } from "./GovtRegulation";

//import './Country.scss'

const GovtRegulationEdit = (props) => {
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
                operationId: UrlBuilder.ntrcaApi(
                    `govt-regulation/details/${props.match.params.id}`
                ),
                output: "details",
                storeName: "govtRegulationDetails",
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
        title: "নীতিমালা সংশোধন করুন",
        headerSlot: () => (
            <>
                <Link to="/portal/settings/govt-regulation/list">
                    <Button
                        variant="link"
                        className="f-right btn-sm p-5 btn-color"
                    >
                        <FontAwesomeIcon icon={faList} className="me-2" />{" "}
                        নীতিমালা তালিকা দেখুন
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
                        initialValues={govtRegulation.fromJson(details.data)}
                        enableReinitialize={true}
                        validationSchema={govtRegulation.validation()}
                        onSubmit={(values) => {
                            /**
                             * Save data through POST api by dispatching 'callApi'.
                             */
                            dispatch(
                                callApi({
                                    operationId: UrlBuilder.ntrcaApi(
                                        "govt-regulation/update"
                                    ),
                                    parameters: {
                                        method: "PUT",
                                        body: govtRegulation.toString(values),
                                        header: {
                                            "Content-Type": "application/json",
                                        },
                                    },
                                })
                            );
                        }}
                    >
                        {(props) => {
                            return <GovtReglationForm {...props} />;
                        }}
                    </Formik>
                </Card.Body>
            </Card>
        </DefaultCard>
    );
};

export default GovtRegulationEdit;
