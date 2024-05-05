import React from "react";
import { Button, Col, Row, Card } from "@themesberg/react-bootstrap";
import { Formik, Form } from "formik/dist/index";
import { Link } from "react-router-dom";
import {
    InputField,
    InputSelect,
    InputTextArea,
} from "../../../components/form";
import {
    faSave,
    faTimes,
    faUndo,
    faPlusSquare,
    faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import Checkbox from "../../../components/form/Checkbox";
import { FieldArray, Field } from "formik/dist/index";
import InputSelectApi from "components/form/InputSelectApi";
// import { InputField, InputSelect } from "../../../components/form";
import ErrorMessage from "../../../components/text/ErrorMessage";
//import { Formik } from "formik/dist/index";
import { Step, Stepper } from "react-form-stepper";
import { DefaultCard } from "components/card";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { data } from "autoprefixer";

const JobApplyForm = ({ values }) => {
    const history = useHistory();

    let data = {
        resolution: "মিটিং রেজুলেশন",
        date: "",
        approvedPost: "20",
        noOfmale: "10",
        noOfFemale: "7",
        noVcantPosts: "3",
        JobList: [
            {
                post: 2,
                subject: 1,
                candidateType: 1,
                postType: 1,
                quantity: 3,
            },
        ],
    };

    return (
        <>
            <div className="m-10 form_custum">
                <div className="card card-box">
                    <div class="card-head apply">
                        <header class=" header">
                            <h2 class="text-center">চাকরির রিকুইজিশন</h2>
                        </header>
                    </div>
                    <div className="m-10">
                        <Card.Body>
                            <div className="row">
                                <div class="contentBox-modified">
                                    <div class="section-header-custom">
                                        <h5 class="m-10 text-white">
                                            ইনস্টিটিউট রিকুইজিশন বিস্তারিত
                                        </h5>
                                    </div>
                                    <div class="contentBoxBody p-20">
                                        <Formik
                                            initialValues={data}
                                            render={({ values }) => (
                                                <Form>
                                                    <Row>
                                                        <Col
                                                            md={6}
                                                            className="mb-10"
                                                        >
                                                            <InputField
                                                                label="GB/SMC/MMC রেজোলিউশন নম্বর"
                                                                name="appPhoto"
                                                                required={true}
                                                                type="file"
                                                                placeholder="Enter Applicant's Photo"
                                                            />
                                                            {/* <InputField
                                                                label="GB/SMC/MMC রেজোলিউশন নম্বর"
                                                                name="resolution"
                                                                type="text"
                                                            /> */}
                                                            <ErrorMessage fieldName="resolution" />
                                                        </Col>
                                                        <Col
                                                            md={6}
                                                            className="mb-10"
                                                        >
                                                            <InputField
                                                                label="তারিখ"
                                                                name="date"
                                                                type="date"
                                                            />
                                                            <ErrorMessage fieldName="date" />
                                                        </Col>
                                                        <Col
                                                            md={6}
                                                            className="mb-10"
                                                        >
                                                            <InputField
                                                                label="সরকার কর্তৃক মোট অনুমোদিত পদবি"
                                                                name="approvedPost"
                                                                type="number"
                                                            />
                                                            <ErrorMessage fieldName="approvedPost" />
                                                        </Col>
                                                        <Col
                                                            md={6}
                                                            className="mb-10"
                                                        >
                                                            <InputField
                                                                label="কর্মরত পুরুষ শিক্ষকের সংখ্যা"
                                                                name="noOfmale"
                                                                type="number"
                                                            />
                                                            <ErrorMessage fieldName="noOfmale" />
                                                        </Col>
                                                        <Col
                                                            md={6}
                                                            className="mb-10"
                                                        >
                                                            <InputField
                                                                label="কর্মরত মহিলা শিক্ষকের সংখ্যা"
                                                                name="noOfFemale"
                                                                type="number"
                                                            />
                                                            <ErrorMessage fieldName="noOfFemale" />
                                                        </Col>
                                                        <Col
                                                            md={6}
                                                            className="mb-10"
                                                        >
                                                            <InputField
                                                                label="মোট এমপিও শূন্য পদের সংখ্যা"
                                                                name="noVcantPosts"
                                                                type="number"
                                                            />
                                                            <ErrorMessage fieldName="noVcantPosts" />
                                                        </Col>
                                                    </Row>
                                                    <div className="row">
                                                        <div class="contentBox-modified">
                                                            <div class="section-header-custom">
                                                                <h5 class="m-10 text-white">
                                                                    রিকুইজিশন
                                                                    পদবি ডিটেলস
                                                                </h5>
                                                            </div>

                                                            <Col
                                                                md={12}
                                                                className="mb-12"
                                                            >
                                                                <div className="contentBox mt-10">
                                                                    {/* <div className="input-group form-control bg-number-label">
                                                                    Add Post
                                                                </div> */}
                                                                    <div className="table-responsive">
                                                                        <div className="col-md-12">
                                                                            <FieldArray
                                                                                name="JobList"
                                                                                render={(
                                                                                    arrayHelpers
                                                                                ) => (
                                                                                    <>
                                                                                        <table className="user-table align-items-center table table-striped table-hover text-center">
                                                                                            <thead>
                                                                                                <tr>
                                                                                                    <th>
                                                                                                        SL
                                                                                                    </th>
                                                                                                    <th>
                                                                                                        পদবি
                                                                                                    </th>
                                                                                                    <th>
                                                                                                        বিষয়
                                                                                                    </th>
                                                                                                    <th>
                                                                                                        প্রার্থীর
                                                                                                        ধরন
                                                                                                    </th>
                                                                                                    <th>
                                                                                                        পদবিের
                                                                                                        ধরন
                                                                                                    </th>
                                                                                                    <th>
                                                                                                        পরিমাণ
                                                                                                    </th>
                                                                                                    <th>
                                                                                                        অ্যাকশন
                                                                                                    </th>
                                                                                                </tr>
                                                                                            </thead>
                                                                                            <tbody>
                                                                                                {values?.JobList?.map(
                                                                                                    (
                                                                                                        item,
                                                                                                        index
                                                                                                    ) => (
                                                                                                        <tr>
                                                                                                            <td>
                                                                                                                {index +
                                                                                                                    1}
                                                                                                            </td>
                                                                                                            <td>
                                                                                                                <InputSelect
                                                                                                                    name={`JobList[${index}].post`}
                                                                                                                    type="text"
                                                                                                                    value="id"
                                                                                                                    data={[
                                                                                                                        {
                                                                                                                            id: 1,
                                                                                                                            name: "Assistant Teacher",
                                                                                                                        },
                                                                                                                        {
                                                                                                                            id: 2,
                                                                                                                            name: "Night Guard",
                                                                                                                        },
                                                                                                                        {
                                                                                                                            id: 3,
                                                                                                                            name: "Cleaner",
                                                                                                                        },
                                                                                                                    ]}
                                                                                                                    text="name"
                                                                                                                    // onChange={checkData(
                                                                                                                    //     index
                                                                                                                    // )}
                                                                                                                />
                                                                                                            </td>
                                                                                                            <td>
                                                                                                                <InputSelect
                                                                                                                    name={`JobList[${index}].subject`}
                                                                                                                    type="text"
                                                                                                                    value="id"
                                                                                                                    data={[
                                                                                                                        {
                                                                                                                            id: 1,
                                                                                                                            name: "ICT",
                                                                                                                        },
                                                                                                                        {
                                                                                                                            id: 2,
                                                                                                                            name: "Bangla",
                                                                                                                        },
                                                                                                                        {
                                                                                                                            id: 3,
                                                                                                                            name: "English",
                                                                                                                        },
                                                                                                                    ]}
                                                                                                                    text="name"
                                                                                                                    // onChange={checkData(
                                                                                                                    //     index
                                                                                                                    // )}
                                                                                                                />
                                                                                                            </td>
                                                                                                            <td>
                                                                                                                <InputSelect
                                                                                                                    name={`JobList[${index}].candidateType`}
                                                                                                                    type="text"
                                                                                                                    value="id"
                                                                                                                    data={[
                                                                                                                        {
                                                                                                                            id: 1,
                                                                                                                            name: "None",
                                                                                                                        },
                                                                                                                        {
                                                                                                                            id: 1,
                                                                                                                            name: "Female Quota",
                                                                                                                        },
                                                                                                                        {
                                                                                                                            id: 2,
                                                                                                                            name: "Freedom Fighter",
                                                                                                                        },
                                                                                                                        {
                                                                                                                            id: 3,
                                                                                                                            name: "Handicapped",
                                                                                                                        },
                                                                                                                    ]}
                                                                                                                    text="name"
                                                                                                                    // onChange={checkData(
                                                                                                                    //     index
                                                                                                                    // )}
                                                                                                                />
                                                                                                            </td>
                                                                                                            <td>
                                                                                                                <InputSelect
                                                                                                                    name={`JobList[${index}].postType`}
                                                                                                                    type="text"
                                                                                                                    value="id"
                                                                                                                    data={[
                                                                                                                        {
                                                                                                                            id: 1,
                                                                                                                            name: "MPO",
                                                                                                                        },
                                                                                                                        {
                                                                                                                            id: 2,
                                                                                                                            name: "Non-MPO",
                                                                                                                        },
                                                                                                                    ]}
                                                                                                                    text="name"
                                                                                                                    // onChange={checkData(
                                                                                                                    //     index
                                                                                                                    // )}
                                                                                                                />
                                                                                                            </td>

                                                                                                            <td>
                                                                                                                <InputField
                                                                                                                    name={`JobList[${index}].quantity`}
                                                                                                                    type="text"
                                                                                                                    placeholder="Enter Quantity"
                                                                                                                />
                                                                                                            </td>

                                                                                                            <td className="text-center">
                                                                                                                <Button
                                                                                                                    className="me-1 i-size bg-primary"
                                                                                                                    type="button"
                                                                                                                    onClick={() => {
                                                                                                                        arrayHelpers.push(
                                                                                                                            {
                                                                                                                                post: "",
                                                                                                                                subject:
                                                                                                                                    "",
                                                                                                                                roll: "",
                                                                                                                                reg: "",
                                                                                                                                subject:
                                                                                                                                    "",
                                                                                                                                instituteType:
                                                                                                                                    "",
                                                                                                                            }
                                                                                                                        );
                                                                                                                    }}
                                                                                                                >
                                                                                                                    <i>
                                                                                                                        <FontAwesomeIcon
                                                                                                                            icon={
                                                                                                                                faPlusSquare
                                                                                                                            }
                                                                                                                            className="text-light"
                                                                                                                        />
                                                                                                                    </i>
                                                                                                                </Button>

                                                                                                                {index +
                                                                                                                    1 >
                                                                                                                    1 && (
                                                                                                                    <Button
                                                                                                                        variant="danger"
                                                                                                                        className="i-size bg-danger"
                                                                                                                        type="button"
                                                                                                                        onClick={() => {
                                                                                                                            swal(
                                                                                                                                {
                                                                                                                                    title: "Do you want to delete?",
                                                                                                                                    icon: "warning",
                                                                                                                                    buttons: true,
                                                                                                                                    dangerMode: true,
                                                                                                                                }
                                                                                                                            ).then(
                                                                                                                                (
                                                                                                                                    willDelete
                                                                                                                                ) => {
                                                                                                                                    willDelete &&
                                                                                                                                        arrayHelpers.remove(
                                                                                                                                            index
                                                                                                                                        );
                                                                                                                                }
                                                                                                                            );
                                                                                                                        }}
                                                                                                                    >
                                                                                                                        <i>
                                                                                                                            <FontAwesomeIcon
                                                                                                                                icon={
                                                                                                                                    faTrashAlt
                                                                                                                                }
                                                                                                                                className="text-light"
                                                                                                                            />
                                                                                                                        </i>
                                                                                                                    </Button>
                                                                                                                )}
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                    )
                                                                                                )}
                                                                                            </tbody>
                                                                                        </table>
                                                                                        <Col
                                                                                            md={
                                                                                                12
                                                                                            }
                                                                                            className="mb-10 mt-10"
                                                                                        >
                                                                                            <Link to="#">
                                                                                                <Button
                                                                                                    variant=""
                                                                                                    className="f-right btn-color"
                                                                                                    type="submit"
                                                                                                >
                                                                                                    জমা
                                                                                                    দিন
                                                                                                </Button>
                                                                                            </Link>

                                                                                            <Button
                                                                                                variant="white"
                                                                                                className="f-right mr-10"
                                                                                                type="reset"
                                                                                            >
                                                                                                <FontAwesomeIcon
                                                                                                    icon={
                                                                                                        faUndo
                                                                                                    }
                                                                                                    className="me-2"
                                                                                                />{" "}
                                                                                                রিসেট
                                                                                            </Button>
                                                                                            <Link to="/portal/job-requisition-list">
                                                                                                <Button
                                                                                                    variant="white"
                                                                                                    className="f-right mr-10"
                                                                                                    type="cancle"
                                                                                                >
                                                                                                    <FontAwesomeIcon
                                                                                                        icon={
                                                                                                            faTimes
                                                                                                        }
                                                                                                        className="me-2"
                                                                                                    />{" "}
                                                                                                    বাতিল
                                                                                                    করুন
                                                                                                </Button>
                                                                                            </Link>
                                                                                        </Col>
                                                                                    </>
                                                                                )}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </Col>

                                                            {/* <div class="contentBoxBody p-20">
                                                            <Row>
                                                                <Col
                                                                    md={6}
                                                                    className="mb-10"
                                                                >
                                                                    <InputField
                                                                        label="GB/SMC/MMC Resolution No"
                                                                        name="resolution"
                                                                        type="text"
                                                                    />
                                                                    <ErrorMessage fieldName="resolution" />
                                                                </Col>
                                                                <Col
                                                                    md={6}
                                                                    className="mb-10"
                                                                >
                                                                    <InputField
                                                                        label="Date"
                                                                        name="date"
                                                                        type="date"
                                                                    />
                                                                    <ErrorMessage fieldName="date" />
                                                                </Col>
                                                                <Col
                                                                    md={6}
                                                                    className="mb-10"
                                                                >
                                                                    <InputField
                                                                        label="Total Approved Post by Govt."
                                                                        name="approvedPost"
                                                                        type="number"
                                                                    />
                                                                    <ErrorMessage fieldName="approvedPost" />
                                                                </Col>
                                                                <Col
                                                                    md={6}
                                                                    className="mb-10"
                                                                >
                                                                    <InputField
                                                                        label="No. of Working Male Teacher"
                                                                        name="noOfmale"
                                                                        type="number"
                                                                    />
                                                                    <ErrorMessage fieldName="noOfmale" />
                                                                </Col>
                                                                <Col
                                                                    md={6}
                                                                    className="mb-10"
                                                                >
                                                                    <InputField
                                                                        label="No. of Working Female Teacher"
                                                                        name="noOfFemale"
                                                                        type="number"
                                                                    />
                                                                    <ErrorMessage fieldName="noOfFemale" />
                                                                </Col>
                                                                <Col
                                                                    md={6}
                                                                    className="mb-10"
                                                                >
                                                                    <InputField
                                                                        label="No. of Total MPO Vacant Posts"
                                                                        name="noVcantPosts"
                                                                        type="number"
                                                                    />
                                                                    <ErrorMessage fieldName="noVcantPosts" />
                                                                </Col>
                                                            </Row>
                                                        </div> */}
                                                        </div>
                                                    </div>
                                                </Form>
                                            )}
                                        ></Formik>
                                    </div>
                                </div>
                            </div>
                        </Card.Body>
                    </div>
                </div>
            </div>
        </>
    );
};

export default JobApplyForm;
