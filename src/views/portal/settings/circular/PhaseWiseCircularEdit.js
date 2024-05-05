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
import { circularModel } from "./Circular";
import CircularForm from "./CircularForm";
import moment from "moment";
import { phaseWiseCircularModel } from "./PhaseWiseCircular";
import PhaseWiseCircularForm from "./PhaseWiseCircularForm";

//import './Country.scss'

const PhaseWiseCircularEdit = (props) => {
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
                    `phase-wise-job-application-circular/details/${props.match.params.id}`
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
        title: "গণ বিজ্ঞপ্তি(Phase wise) সংশোধন",
        headerSlot: () => (
            <>
                <Link
                    to={`/portal/phase-wise/generated-result/${details?.data?.jobApplicationCircularId}`}
                >
                    <Button
                        variant="link"
                        className="f-right btn-sm p-5 btn-color"
                    >
                        <FontAwesomeIcon icon={faList} className="me-2" />
                        গণ বিজ্ঞপ্তি (Phase Wise) তালিকা
                    </Button>
                </Link>
            </>
        ),
    };

    let data = {};

    if (details?.data !== undefined) {
        data = JSON.parse(JSON.stringify(details.data));
    }

    return (
        <DefaultCard className="mb-50" {...cardProps}>
            <Card border="white" className="table-wrapper table-responsive">
                <Card.Body>
                    {loading && <ProgressBar />}
                    <Formik
                        initialValues={data}
                        enableReinitialize={true}
                        validationSchema={phaseWiseCircularModel.editValidation()}
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

                            // values?.files == undefined
                            //     ? (values.encloserList = null)
                            //     : (values.encloserList = [
                            //           { id: values.encloserList[0]?.id },
                            //       ]);

                            let data =
                                phaseWiseCircularModel.toFormDataEdit(values);
                            // data.append("encloserList", values.encloserList[0]);
                            data.append(
                                "file",
                                values?.file == undefined ? null : values.file
                            );
                            /**
                             * Save data through POST api by dispatching 'callApi'.
                             */
                            dispatch(
                                callApi({
                                    operationId: UrlBuilder.ntrcaApi(
                                        "phase-wise-job-application-circular/update"
                                    ),
                                    parameters: {
                                        method: "POST",
                                        body: data,
                                        hasFile: true,
                                    },
                                })
                            );
                        }}
                    >
                        {(props) => {
                            return (
                                <PhaseWiseCircularForm
                                    {...props}
                                    formType="edit"
                                />
                            );
                        }}
                    </Formik>
                </Card.Body>
            </Card>
        </DefaultCard>
    );
};

export default PhaseWiseCircularEdit;
