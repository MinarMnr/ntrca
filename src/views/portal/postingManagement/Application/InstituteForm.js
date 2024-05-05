import React, { useEffect } from "react";
import {
    faSave,
    faTimes,
    faUndo,
    faPlusSquare,
    faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, Col, Row } from "@themesberg/react-bootstrap";
import { Form } from "formik/dist/index";
import { Link } from "react-router-dom";
import {
    InputField,
    InputSelect,
    InputTextArea,
} from "../../../../components/form";

import { FieldArray, Field } from "formik/dist/index";
import InputSelectApi from "components/form/InputSelectApi";
import { useDispatch, useSelector } from "react-redux";
// import { InputField, InputSelect } from "../../../../components/form";
import ErrorMessage from "../../../../components/text/ErrorMessage";
import { Formik } from "formik/dist/index";
import { Step, Stepper } from "react-form-stepper";
import { DefaultCard } from "components/card";
import { useHistory } from "react-router-dom";
import "./application.css";
import { DragAndDrop } from "./DragAndDrop";
import { callApi, selectApi, setState } from "reducers/apiSlice";
import AllInstituteList from "./AllInstituteList";
import { AuthUser } from "helpers/AuthUser";
import { UrlBuilder } from "helpers/UrlBuilder";
import Cookies from "js-cookie";
import { selectToastAlert } from "reducers/toastAlertSlice";

const InstituteForm = (props) => {
    const history = useHistory();
    const dispatch = useDispatch();
    var circularId = props.match.params.id;
    var nid = AuthUser.getUserName();

    const {
        circularDetails = {
            data: {},
        },
    } = useSelector(selectApi);

    const [prefferdList, setPrefferdList] = React.useState([]);

    const { type } = useSelector(selectToastAlert);

    useEffect(() => {
        if (type === "success") {
            history.push(
                `/portal/ntrca-application/attachment/add/${circularId}`
            );
        }
    });

    let headers = {
        Authorization: "Bearer " + Cookies.get("access_token"),
        "Content-Type": "application/json",
    };
    useEffect(async () => {
        var res = await fetch(
            UrlBuilder.ntrcaApi(
                `job-application/preferred-institutes/${nid}/${circularId}`
            ),
            {
                headers,
            }
        );
        if (res?.status == 200) {
            res.json().then((response) => {
                setPrefferdList(response?.data);
            });
        }
    }, []);

    useEffect(() => {
        dispatch(
            callApi({
                operationId: UrlBuilder.ntrcaApi(
                    `job-application-circular/details/${circularId}`
                ),
                output: "circularDetails",
                storeName: "circularDetails",
            })
        );
    }, [circularId]);

    return (
        <DefaultCard className="mb-50" title="Institute Selection">
            <Card border="white">
                <Card.Body>
                    {/* {loading && <ProgressBar />} */}
                    <div className="row">
                        <div className="col-md-12">
                            <Stepper activeStep={0} nonLinear={true}>
                                <Step
                                    className="bg-primary"
                                    label="প্রথম ধাপ"
                                    onClick={() =>
                                        history.push(
                                            `/portal/ntrca-application/apply/${circularId}`
                                        )
                                    }
                                />
                                <Step
                                    className={`${
                                        props.match.path ==
                                        "/portal/ntrca-application/institute/add/:id"
                                            ? "bg-success"
                                            : "bg-primary"
                                    }`}
                                    label="দ্বিতীয় ধাপ"
                                    onClick={() =>
                                        history.push(
                                            `/portal/ntrca-application/institute/add/${circularId}`
                                        )
                                    }
                                />
                                <Step
                                    className="bg-primary"
                                    label="তৃতীয় ধাপ"
                                    onClick={() =>
                                        history.push(
                                            `/portal/ntrca-application/attachment/add/${circularId}`
                                        )
                                    }
                                />

                                <Step
                                    className="bg-primary"
                                    label="চতুর্থ ধাপ"
                                    onClick={() =>
                                        history.push(
                                            `/portal/ntrca-application/preview/${circularId}`
                                        )
                                    }
                                />
                                {/* <Step
                                    className="bg-primary"
                                    label="প্রথম ধাপ"
                                    onClick={() =>
                                        history.push("/portal/application/add")
                                    }
                                />
                                <Step
                                    className="bg-primary"
                                    label="দ্বিতীয় ধাপ"
                                    onClick={() =>
                                        history.push(
                                            "/portal/ntrca-application/basic-info/add"
                                        )
                                    }
                                />
                                <Step
                                    className="bg-success"
                                    label="তৃতীয় ধাপ"
                                    onClick={() =>
                                        history.push(
                                            "/portal/ntrca-application/institute/add"
                                        )
                                    }
                                />
                                <Step
                                    className="bg-primary"
                                    label="চতুর্থ ধাপ"
                                    onClick={() =>
                                        history.push(
                                            "/portal/posting-management/attachment"
                                        )
                                    }
                                /> */}
                            </Stepper>
                        </div>
                    </div>
                    <Formik
                        initialValues={{ preferredInstituteList: prefferdList }}
                        enableReinitialize={true}
                        // validationSchema={Subject.validation()}
                        onSubmit={(data, { resetForm }) => {
                            // history.push(
                            //     "/portal/ntrca-application/basic-info/add"
                            // );
                            data = data?.preferredInstituteList;

                            dispatch(
                                callApi({
                                    operationId: UrlBuilder.ntrcaApi(
                                        `job-application/step-two-choose-institutes/${nid}/${circularId}`
                                    ),
                                    output: "data",
                                    parameters: {
                                        method: "POST",
                                        body: JSON.stringify(data),
                                    },
                                })
                            );
                        }}
                    >
                        {(props) => {
                            return (
                                <AllInstituteList
                                    {...props}
                                    circularId={circularId}
                                    maxInstituteToChoose={
                                        circularDetails?.data
                                            ?.maxInstituteToChoose
                                    }
                                />
                            );
                        }}

                        {/* <Form>
                            <div class="contentBox-modified">
                                <Card>
                                    <Card.Body>
                                        <Row className="">
                                            <Col md={6} className="pt-8">
                                                <span>
                                                    <h6>
                                                        <b>
                                                            {" "}
                                                            আবেদনকারীর লিঙ্গ:
                                                            পুরুষ
                                                        </b>
                                                    </h6>
                                                </span>
                                            </Col>
                                            <Col md={6} className="pt-8">
                                                <span>
                                                    <h6>
                                                        <b>
                                                            আবেদনকারীর বিষয়:
                                                            আইসিটি
                                                        </b>
                                                    </h6>
                                                </span>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                                <Card className="mt-40 p-10">
                                    <div className="card_header">
                                        <b>এখানে পদবি অনুসন্ধান করুন</b>
                                    </div>
                                    <Card.Body>
                                        <Formik initialValues={demotada}>
                                            <Form>
                                                <Row>
                                                    <Col
                                                        md={3}
                                                        className="mb-10"
                                                    >
                                                        <InputSelect
                                                            label="কর্তৃপক্ষ (অধিদপ্তর)"
                                                            name="authorityList"
                                                            // required={true}
                                                            type="text"
                                                            value="id"
                                                            text="name"
                                                            data={[
                                                                {
                                                                    id: 1,
                                                                    name: "DSHE",
                                                                },
                                                                {
                                                                    id: 2,
                                                                    name: "DME",
                                                                },
                                                                {
                                                                    id: 3,
                                                                    name: "DTE",
                                                                },
                                                            ]}
                                                        />
                                                        <ErrorMessage fieldName="authorityList" />
                                                    </Col>
                                                    <Col
                                                        md={3}
                                                        className="mb-10"
                                                    >
                                                        <InputSelect
                                                            label="স্তর"
                                                            name="instituteLevel"
                                                            // required={true}
                                                            type="text"
                                                            value="id"
                                                            text="name"
                                                            data={[
                                                                {
                                                                    id: 1,
                                                                    name: "বিদ্যালয়",
                                                                },
                                                                {
                                                                    id: 2,
                                                                    name: "কলেজ",
                                                                },
                                                                {
                                                                    id: 2,
                                                                    name: "মাদ্রাসা",
                                                                },
                                                            ]}
                                                        />
                                                        <ErrorMessage fieldName="instituteLevel" />
                                                    </Col>
                                                    <Col
                                                        md={3}
                                                        className="mb-10"
                                                    >
                                                        <InputSelect
                                                            label="পদ"
                                                            name="teacherPost"
                                                            // required={true}
                                                            type="text"
                                                            value="id"
                                                            text="name"
                                                            data={[
                                                                {
                                                                    id: 1,
                                                                    name: "Sr. Teacher",
                                                                },
                                                                {
                                                                    id: 2,
                                                                    name: "Ass. Teacher",
                                                                },
                                                                {
                                                                    id: 3,
                                                                    name: "Teacher",
                                                                },
                                                            ]}
                                                        />
                                                        <ErrorMessage fieldName="teacherPost" />
                                                    </Col>
                                                    <Col
                                                        md={3}
                                                        className="mb-10"
                                                    >
                                                        <InputSelect
                                                            label="জেলা"
                                                            name="district"
                                                            // required={true}
                                                            type="text"
                                                            value="id"
                                                            text="name"
                                                            data={[
                                                                {
                                                                    id: 1,
                                                                    name: "Dhaka",
                                                                },
                                                                {
                                                                    id: 2,
                                                                    name: "Sylhet",
                                                                },
                                                                {
                                                                    id: 2,
                                                                    name: "Khulna",
                                                                },
                                                            ]}
                                                        />
                                                        <ErrorMessage fieldName="district" />
                                                    </Col>

                                                    <Col
                                                        md={3}
                                                        className="mb-10"
                                                    >
                                                        <InputSelect
                                                            label="উপজেলা"
                                                            name="presentUP"
                                                            // required={true}
                                                            type="text"
                                                            value="id"
                                                            text="name"
                                                            data={[
                                                                {
                                                                    id: 1,
                                                                    name: "Nabinagar",
                                                                },
                                                                {
                                                                    id: 2,
                                                                    name: "Tongi",
                                                                },
                                                                {
                                                                    id: 2,
                                                                    name: "Uttara",
                                                                },
                                                            ]}
                                                        />
                                                        <ErrorMessage fieldName="presentUP" />
                                                    </Col>
                                                    <Col
                                                        md={3}
                                                        className="mb-10"
                                                    >
                                                        <InputField
                                                            label="প্রতিষ্ঠানের নাম"
                                                            name="instituteName"
                                                            type="text"
                                                            placeholder="প্রতিষ্ঠানের নাম"
                                                            // defaultInputValue="40"
                                                        />
                                                        <ErrorMessage fieldName="instituteName" />
                                                    </Col>
                                                    <Col
                                                        md={3}
                                                        className="mt-30"
                                                    >
                                                        <Button
                                                            variant=""
                                                            className="f-left btn-color"
                                                            type="button"
                                                        >
                                                            <FontAwesomeIcon
                                                                icon={faSave}
                                                                className="me-2"
                                                            />{" "}
                                                            অনুসন্ধান করুন
                                                        </Button>
                                                    </Col>
                                                </Row>
                                            </Form>
                                        </Formik>
                                    </Card.Body>
                                </Card>

                                <DragAndDrop />

                                <AllInstituteList />
                                <Col md={6} className="mt-20">
                                    <span>
                                        <input type="checkbox" checked={true} />
                                        Other option
                                    </span>
                                </Col>
                                <Col md={12} className="overflow-auto">
                                    <Link to="/portal/posting-management/attachment">
                                        <Button
                                            variant=""
                                            className="f-right btn-color"
                                            type="button"
                                        >
                                            <FontAwesomeIcon
                                                icon={faSave}
                                                className="me-2"
                                            />{" "}
                                            Next
                                        </Button>
                                    </Link>
                                    <Button
                                        variant=""
                                        className="f-right btn-primary"
                                        type="submit"
                                    >
                                        <FontAwesomeIcon
                                            icon={faSave}
                                            className="me-2"
                                        />{" "}
                                        পরবর্তী
                                    </Button>
                                    <Button
                                        variant="white"
                                        className="f-right mr-10"
                                        type="reset"
                                    >
                                        <FontAwesomeIcon
                                            icon={faUndo}
                                            className="me-2"
                                        />{" "}
                                        Reset
                                    </Button>
                                    <Link to="/portal/ntrca-application/basic-info/add">
                                        <Button
                                            variant="white"
                                            className="f-right mr-10"
                                            type="cancle"
                                        >
                                            <FontAwesomeIcon
                                                icon={faTimes}
                                                className="me-2"
                                            />{" "}
                                            Back
                                        </Button>
                                    </Link>
                                </Col>
                            </div>
                        </Form> */}
                    </Formik>
                </Card.Body>
            </Card>
        </DefaultCard>
    );
};

export default InstituteForm;
