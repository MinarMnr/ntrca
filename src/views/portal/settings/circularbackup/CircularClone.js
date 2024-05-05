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

const CircularClone = (props) => {
    /**
     * useDispatch: dispatch actions
     */
    const dispatch = useDispatch();
    const history = useHistory();
    const { clone } = useParams();
    const circularStatus = useRef("");
    const operationId = useRef(
        UrlBuilder.foreignApi("scholarship-circular/save/ACTIVE")
    );
    /**
     * Get loading indicator and data from 'selectApi' state
     */
    const {
        loading,
        details = {
            data: {},
        },
        data = { data: {} },
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
        if (data && data.status && data.status == "success") {
            dispatch(
                clearState({
                    output: "data",
                })
            );
            history.push("/scholarship-circular");
        }
    }, [dispatch, data]);

    /**
     * cardProps must need to pass into DefaultCard component.
     * headerSlot: this is a placeholder for action buttons on card header.
     *
     * @type {{headerSlot: (function(): *), title: string}}
     */

    const cardProps = {
        title: "Add Circular",
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
        if (status == "draft") {
            operationId.current = UrlBuilder.foreignApi(
                "scholarship-circular/save/DRAFT"
            );
        } else {
            operationId.current = UrlBuilder.foreignApi(
                "scholarship-circular/save/ACTIVE"
            );
        }
    };

    return (
        <DefaultCard className="mb-50" {...cardProps}>
            <Card border="white" className="table-wrapper table-responsive">
                <Card.Body>
                    {loading && <ProgressBar />}
                    <Formik
                        initialValues={Circular.fromJson(details.data)}
                        enableReinitialize={true}
                        validationSchema={Circular.validator()}
                        onSubmit={(values) => {
                            values.eligibleCriteria.map((item, index) => {
                                delete item.scholarshipDegree;
                                delete item.scholarshipCircularId;
                                delete item.id;
                                item.degreeCriteria.map((itm, idx) => {
                                    delete itm.educationalQualification;
                                    delete itm.foreignScholarshipCircularEligibleCriteriaId;
                                    delete itm.foreignScholarshipCircularId;
                                    delete itm.id;
                                });
                            });
                            values.id = null;
                            delete values.scholarshipCircularEncloser;
                            let data = Circular.toFormData(values);
                            data.append("file", values.file);
                            /**
                             * Save data through POST api by dispatching 'callApi'.
                             *
                             */

                            dispatch(
                                callApi({
                                    operationId: operationId.current,
                                    output: "data",
                                    parameters: {
                                        method: "POST",
                                        body: data,
                                    },
                                })
                            );
                        }}
                    >
                        {(props) => {
                            return (
                                <CircularForm
                                    formType="edit" //will work now ... but better change it later ..MnR
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

export default CircularClone;

// import { faList } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { Button, Card } from "@themesberg/react-bootstrap";
// import { Formik } from "formik/dist/index";
// import * as React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import ProgressBar from "react-topbar-progress-indicator";
// import { DefaultCard } from "../../components/card";
// import { callApi, selectApi } from "../../reducers/apiSlice";
// import { Circular } from "./Circular";
// import CircularForm from "./CircularForm";
// import { UrlBuilder } from "../../helpers/UrlBuilder";
// import { useRef } from "react";

// const CircularClone = (props) => {
//   /**
//    * useDispatch: dispatch actions
//    */
//   const dispatch = useDispatch();

//   /**
//    * Get loading indicator from 'selectApi' state
//    */
//   const { loading } = useSelector(selectApi);
//   const circularStatus = useRef("");

//   /**
//    * cardProps must need to pass into DefaultCard component.
//    * headerSlot: this is a placeholder for action buttons on card header.
//    *
//    * @type {{headerSlot: (function(): *), title: string}}
//    */
//   const cardProps = {
//     title: "Add New Circular",
//     headerSlot: () => (
//       <>

//         <Link to="/scholarship-circular">
//           <Button variant="link" className="f-right btn-sm p-5 btn-color">
//             <FontAwesomeIcon icon={faList} className="me-2" /> View Circular
//             List
//           </Button>
//         </Link>

//       </>
//     ),
//   };

//   const statusvalue = (status) => {
//     circularStatus.current = status;
//   };

//   return (
//     <DefaultCard className="mb-50" {...cardProps}>
//       <Card border="white" className="table-wrapper table-responsive">
//         <Card.Body>
//           {loading && <ProgressBar />}
//           <Formik
//             initialValues={Circular}
//             validationSchema={Circular.validator()}
//             onSubmit={(values) => {
//               values.circularTitle = values.circularTitle + "-" + values.year;
//               /**
//                * Save data through POST api by dispatching 'callApi'
//                */
//               dispatch(
//                 callApi({
//                   operationId:
//                     circularStatus.current === "save"
//                       ? UrlBuilder.foreignApi("scholarship-circular/save")
//                       : circularStatus.current === "draft"
//                       ? UrlBuilder.foreignApi("scholarship-circular/draft")
//                       : circularStatus.current === "publish"
//                       ? UrlBuilder.foreignApi(
//                           "scholarship-circular/publish-now"
//                         )
//                       : "",
//                   output: "data",
//                   parameters: {
//                     method: "POST",
//                     body: Circular.toString(values),
//                     header: {
//                       "Content-Type": "application/json",
//                     },
//                   },
//                 })
//               );

//               /**
//                * Reset form data.
//                */
//             }}
//           >
//             {(props) => {
//               return (
//                 <CircularForm
//                   {...props}
//                   type="Clone"
//                   circularStatus={statusvalue}
//                 />
//               );
//             }}
//           </Formik>
//         </Card.Body>
//       </Card>
//     </DefaultCard>
//   );
// };

// export default CircularClone;
