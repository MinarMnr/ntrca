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
import { Rules } from "./Rules";
import RulesForm from "./RulesForm";
import moment from "moment";

//import './Country.scss'

const RulesEdit = (props) => {
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
                    `job-application-rule/details/${props.match.params.id}`
                ),
                output: "details",
                storeName: "rulesDetails",
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
        title: "নিয়মাবলী সংশোধন",
        headerSlot: () => (
            <>
                <Link to="/portal/settings/rules/list">
                    <Button
                        variant="link"
                        className="f-right btn-sm p-5 btn-color"
                    >
                        <FontAwesomeIcon icon={faList} className="me-2" />
                        নিয়মাবলীর তালিকা দেখুন
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
                        initialValues={Rules.fromJsonEdit(details?.data)}
                        enableReinitialize={true}
                        validationSchema={Rules.validation()}
                        onSubmit={(values, { resetForm }) => {
                            if (
                                typeof values.geographicalPositionNoQuotaList !=
                                "object"
                            ) {
                                values.geographicalPositionNoQuotaList =
                                    JSON.parse(
                                        values?.geographicalPositionNoQuotaList
                                    );
                            }

                            let check = true;

                            if (
                                values?.geographicalPositionNoQuotaList
                                    ?.length == 0
                            ) {
                                check = false;
                            }

                            let request = Rules.toFormDataEdit(values);
                            request.append(
                                "file",
                                values?.file == undefined ? null : values.file
                            );

                            if (!check) {
                                dispatch(
                                    setToastAlert({
                                        type: "warning",
                                        message: "কোটা নির্বাচন করুন",
                                    })
                                );
                            } else {
                                dispatch(
                                    callApi({
                                        operationId: UrlBuilder.ntrcaApi(
                                            "job-application-rule/update"
                                        ),
                                        output: "details",
                                        parameters: {
                                            method: "POST",
                                            body: request,

                                            hasFile: true,
                                        },
                                    })
                                );
                            }
                        }}
                    >
                        {(props) => {
                            return <RulesForm {...props} formType="edit" />;
                        }}
                    </Formik>
                </Card.Body>
            </Card>
        </DefaultCard>
    );
};

export default RulesEdit;
