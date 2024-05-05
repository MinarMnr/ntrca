import { faList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card } from "@themesberg/react-bootstrap";
import { Formik } from "formik/dist/index";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import ProgressBar from "react-topbar-progress-indicator";
import { DefaultCard } from "../../../../components/card";
import { UrlBuilder } from "../../../../helpers/UrlBuilder";
import { callApi, selectApi } from "../../../../reducers/apiSlice";
import { circularModel } from "./Circular";
import CircularForm from "./CircularForm";
import moment from "moment";
import { setToastAlert } from "reducers/toastAlertSlice";

//import './Country.scss'

const CircularEdit = (props) => {
    /**
     * useDispatch: dispatch actions
     */
    const dispatch = useDispatch();
    const history = useHistory();

    /**
     * Get loading indicator and data from 'selectApi' state
     */
    const {
        loading,
        details = {
            data: {},
        },
        circular_details = {
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
                    `job-application-circular/details/${props.match.params.id}`
                ),
                output: "details",
                storeName: "circularDetails",
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
        title: "গণ বিজ্ঞপ্তি সংশোধন",
        headerSlot: () => (
            <>
                <Link to="/portal/circular/list">
                    <Button
                        variant="link"
                        className="f-right btn-sm p-5 btn-color"
                    >
                        <FontAwesomeIcon icon={faList} className="me-2" />
                        গণ বিজ্ঞপ্তির তালিকা দেখুন
                    </Button>
                </Link>
            </>
        ),
    };

    let data = {};

    if (details?.data !== undefined) {
        data = JSON.parse(JSON.stringify(details.data));
        data.circularEffectiveDate = moment(data.circularEffectiveDate).format(
            "YYYY-MM-DD h:mm a"
        );
        data.circularPublishDate = moment(data.circularPublishDate).format(
            "YYYY-MM-DD h:mm a"
        );
        data.circularExpiryDate = moment(data.circularExpiryDate).format(
            "YYYY-MM-DD h:mm a"
        );
        data.ageLimitAsOfDate = moment(data.ageLimitAsOfDate).format(
            "YYYY-MM-DD h:mm a"
        );
    }

    return (
        <DefaultCard className="mb-50" {...cardProps}>
            <Card border="white" className="table-wrapper table-responsive">
                <Card.Body>
                    {loading && <ProgressBar />}
                    <Formik
                        initialValues={circularModel.fromJson(data)}
                        enableReinitialize={true}
                        validationSchema={circularModel.validator()}
                        onSubmit={(values) => {
                            values.circularPublishDate = moment(
                                values.circularPublishDate
                            ).format("YYYY-MM-DD hh:mm a");

                            values.circularEffectiveDate = moment(
                                values.circularEffectiveDate
                            ).format("YYYY-MM-DD hh:mm a");

                            values.circularExpiryDate = moment(
                                values.circularExpiryDate
                            ).format("YYYY-MM-DD hh:mm a");
                            values.ageLimitAsOfDate = moment(
                                values.ageLimitAsOfDate
                            ).format("YYYY-MM-DD hh:mm a");

                            if (typeof values.govtRegulationId != "object") {
                                values.govtRegulationId = JSON.parse(
                                    values?.govtRegulationId
                                );
                            }

                            let check = true;

                            if (values?.govtRegulationId?.length == 0) {
                                check = false;
                            }

                            values?.files == undefined
                                ? (values.encloserList = null)
                                : (values.encloserList = [
                                      { id: values.encloserList[0]?.id },
                                  ]);

                            let data = circularModel.toFormDataEdit(values);
                            // data.append("encloserList", values.encloserList[0]);
                            data.append(
                                "files",
                                values?.files == undefined
                                    ? null
                                    : values.files[0]
                            );

                            //return;
                            /**
                             * Save data through POST api by dispatching 'callApi'.
                             */

                            if (!check) {
                                dispatch(
                                    setToastAlert({
                                        type: "warning",
                                        message:
                                            "নীতিমালা নির্বাচন করুন",
                                    })
                                );
                            } else {
                                dispatch(
                                    callApi({
                                        operationId: UrlBuilder.ntrcaApi(
                                            "job-application-circular/update"
                                        ),
                                        output: "circular_details",
                                        parameters: {
                                            method: "POST",
                                            body: data,
                                            hasFile: true,
                                        },
                                    })
                                );

                                if (circular_details.status === "success") {
                                    history.push(`/portal/circular/list`);
                                }
                            }
                        }}
                    >
                        {(props) => {
                            return <CircularForm {...props} formType="edit" />;
                        }}
                    </Formik>
                </Card.Body>
            </Card>
        </DefaultCard>
    );
};

export default CircularEdit;
