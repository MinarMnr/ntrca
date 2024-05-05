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
import { DesWiseSubject } from "./DesWiseSubject";
import DesWiseSubjectForm from "./DesWiseSubjectForm";

//import './Country.scss'

const DesWiseSubjectEdit = (props) => {
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
                    `designation-wise-subject/find/${props.match.params.id}`
                ),
                output: "details",
                storeName: "desWiseSubjectDetails",
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
        title: "Edit Designation Wise Subject",
        headerSlot: () => (
            <>
                <Link to="/portal/settings/designation-wise-subject/list">
                    <Button
                        variant="link"
                        className="f-right btn-sm p-5 btn-color"
                    >
                        <FontAwesomeIcon icon={faList} className="me-2" /> View Designation Wise Subject List
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
                        initialValues={DesWiseSubject.fromJson(details.data)}
                        enableReinitialize={true}
                        validationSchema={DesWiseSubject.validation()}
                        onSubmit={(values) => {
                            /**
                             * Save data through POST api by dispatching 'callApi'.
                             */
                            dispatch(
                                callApi({
                                    operationId:
                                        UrlBuilder.ntrcaApi(
                                            "subject/update"
                                        ),
                                    parameters: {
                                        method: "PUT",
                                        body: DesWiseSubject.toString(values),
                                        header: {
                                            "Content-Type": "application/json",
                                        },
                                    },
                                })
                            );
                        }}
                    >
                        {(props) => {
                            return <DesWiseSubjectForm {...props} from="edit" />;
                        }}
                    </Formik>
                </Card.Body>
            </Card>
        </DefaultCard>
    );
};

export default DesWiseSubjectEdit;
