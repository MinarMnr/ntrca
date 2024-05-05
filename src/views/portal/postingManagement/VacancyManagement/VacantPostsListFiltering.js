import React from "react";
import { Field, Form, Formik } from "formik/dist/index";
import { Button, Col, Row } from "@themesberg/react-bootstrap/lib/esm/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome/index";
import { UrlBuilder } from "../../../../helpers/UrlBuilder";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import * as Yup from "yup";
import { AuthUser } from "../../../../helpers/AuthUser";
import {
    InputField,
    InputSelect,
    InputTextArea,
} from "../../../../components/form";
import ErrorMessage from "../../../../components/text/ErrorMessage";
import { selectApi } from "reducers/apiSlice";
import { useSelector } from "react-redux";
import ProgressBar from "react-topbar-progress-indicator";
import InputSelectApi from "components/form/InputSelectApi";

const VacantPostsListFiltering = ({ onSubmit }) => {
    const { loading } = useSelector(selectApi);

    return (
        <Formik
            initialValues={{
                currentApplicationStatus: "",
                paymentStatus: "",
                // trackingNumber: "",
                requisitionForTheYear: "",
                eiin: "",
                instituteJobRequisitionCircularId: "",
            }}
            enableReinitialize={true}
            onSubmit={(values, { resetForm }) => {
                let body = { ...values };
                onSubmit(body);
            }}
        >
            {({ values, errors, handleSubmit }) => {
                return (
                    <>
                        <Form>
                            {loading && <ProgressBar />}
                            <Row>
                                <Col md={2} className="mb-10">
                                    <InputField
                                        label="প্রতিষ্ঠানের EIIN"
                                        name="eiin"
                                        // required={true}
                                        type="number"
                                        placeholder="EIIN নাম্বার লিখুন"
                                        defaultValue={values?.eiin}
                                    />
                                    <ErrorMessage fieldName="eiin" />
                                </Col>
                                {/* <Col md={2} className="mb-10">
                                    <InputField
                                        label="ট্র্যাকিং নাম্বার"
                                        name="trackingNumber"
                                        // required={true}
                                        type="number"
                                        placeholder="ট্র্যাকিং নাম্বার লিখুন"
                                        defaultValue={values?.trackingNumber}
                                    />
                                    <ErrorMessage fieldName="trackingNumber" />
                                </Col> */}
                                {/* <Col md={2} className="mb-10">
                                    <InputField
                                        label="রিকুইজিশনের বছর "
                                        name="requisitionForTheYear"
                                        // required={true}
                                        type="number"
                                        placeholder="বছর লিখুন"
                                        defaultValue={
                                            values?.requisitionForTheYear
                                        }
                                    />
                                    <ErrorMessage fieldName="requisitionForTheYear" />
                                </Col> */}
                                <Col md={2} className="mb-10">
                                    <InputSelect
                                        label="বর্তমানে আবেদনের অবস্থা "
                                        name="currentApplicationStatus"
                                        // required={true}
                                        type="text"
                                        value="name"
                                        text="name"
                                        data={[
                                            {
                                                id: 1,
                                                name: "APPLIED",
                                            },
                                            {
                                                id: 2,
                                                name: "UNDER_REVIEW",
                                            },
                                            {
                                                id: 3,
                                                name: "APPROVED",
                                            },
                                        ]}
                                        defaultValue={
                                            values?.currentApplicationStatus
                                        }
                                    />
                                    <ErrorMessage fieldName="currentApplicationStatus" />
                                </Col>
                                <Col md={2} className="mb-10">
                                    <InputSelect
                                        label="পেমেন্টের অবস্থা "
                                        name="paymentStatus"
                                        // required={true}
                                        type="text"
                                        value="name"
                                        text="name"
                                        data={[
                                            {
                                                id: 1,
                                                name: "PAID",
                                            },
                                            {
                                                id: 2,
                                                name: "UNPAID",
                                            },
                                        ]}
                                        defaultValue={values?.paymentStatus}
                                    />
                                    <ErrorMessage fieldName="paymentStatus" />
                                </Col>
                                <Col md={2} className="mb-10">
                                    <label class="form-label">
                                        ই-রিকুইজিশন বিজ্ঞপ্তি
                                    </label>
                                    <InputSelectApi
                                        name="instituteJobRequisitionCircularId"
                                        operationId={UrlBuilder.ntrcaApi(
                                            `institute-job-requisition-circular/all`
                                        )}
                                        storeName="regulations"
                                        value="id"
                                        text="title"
                                        type="text"
                                        // required={true}
                                    />
                                    <ErrorMessage fieldName="instituteJobRequisitionCircularId" />
                                </Col>
                                {/* <Col md={2} className="mb-10">
                                    <InputField
                                        label="জমাদানের সময়কালের শুরু"
                                        name="date"
                                        type="date"
                                        placeholder="Enter date"
                                    />
                                    <ErrorMessage fieldName="date" />
                                </Col>
                                <Col md={2} className="mb-10">
                                    <InputField
                                        label="জমাদানের সময়কালের শেষ "
                                        name="date"
                                        type="date"
                                        placeholder="Enter date"
                                    />
                                    <ErrorMessage fieldName="date" />
                                </Col> */}

                                {/* <Col md={2} className="mb-10">
                                    <InputField
                                        label="সাবমিটেড তারিখ"
                                        name="date"
                                        type="date"
                                        placeholder="Enter date"
                                    />
                                    <ErrorMessage fieldName="date" />
                                </Col> */}
                                {/* <Col md={2} className="mb-10">
                                    <InputSelect
                                        label="মাস"
                                        name="month"
                                        // required={true}
                                        type="text"
                                        value="id"
                                        text="name"
                                        data={[
                                            {
                                                id: 1,
                                                name: "জানুয়ারি",
                                            },
                                            {
                                                id: 2,
                                                name: "ফেব্রুয়ারী",
                                            },
                                            {
                                                id: 3,
                                                name: "মার্চ",
                                            },
                                            {
                                                id: 4,
                                                name: "এপ্রিল",
                                            },
                                            {
                                                id: 5,
                                                name: "মে",
                                            },
                                        ]}
                                    />
                                    <ErrorMessage fieldName="month" />
                                </Col>
                                <Col md={2} className="mb-10">


                                    <InputSelect
                                        label="বছর"
                                        name="year"
                                        // required={true}
                                        type="text"
                                        value="id"
                                        text="name"
                                        data={[
                                            {
                                                id: 1,
                                                name: "2022",
                                            },
                                            {
                                                id: 2,
                                                name: "2023",
                                            },
                                            {
                                                id: 3,
                                                name: "2024",
                                            },
                                            {
                                                id: 4,
                                                name: "2025",
                                            },
                                            {
                                                id: 5,
                                                name: "2026",
                                            },
                                        ]}
                                    />
                                    <ErrorMessage fieldName="year" />
                                </Col> */}
                                {/* <Col md={2} className="mb-10">
                                    <InputSelect
                                        label="বিভাগ"
                                        name="division"
                                        // required={true}
                                        type="text"
                                        value="id"
                                        text="name"
                                        data={[
                                            {
                                                id: 1,
                                                name: "ঢাকা",
                                            },
                                            {
                                                id: 2,
                                                name: "চট্রগ্রাম",
                                            },
                                            {
                                                id: 3,
                                                name: "খুলনা",
                                            },
                                            {
                                                id: 4,
                                                name: "বরিশাল",
                                            },
                                            {
                                                id: 5,
                                                name: "রাজশাহী",
                                            },
                                        ]}
                                    />
                                    <ErrorMessage fieldName="division" />
                                </Col>

                                <Col md={2} className="mb-10">
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
                                                name: "ঢাকা",
                                            },
                                            {
                                                id: 2,
                                                name: "চট্রগ্রাম",
                                            },
                                            {
                                                id: 3,
                                                name: "খুলনা",
                                            },
                                            {
                                                id: 4,
                                                name: "বরিশাল",
                                            },
                                            {
                                                id: 5,
                                                name: "রাজশাহী",
                                            },
                                            {
                                                id: 6,
                                                name: "ফরিদপুর",
                                            },
                                        ]}
                                    />
                                    <ErrorMessage fieldName="district" />
                                </Col>

                                <Col md={2} className="mb-10">
                                    <InputSelect
                                        label="উপজেলা"
                                        name="upazila"
                                        // required={true}
                                        type="text"
                                        value="id"
                                        text="name"
                                        data={[
                                            {
                                                id: 1,
                                                name: "সাভার",
                                            },
                                            {
                                                id: 2,
                                                name: "ধামরাই",
                                            },
                                            {
                                                id: 3,
                                                name: "দোহার",
                                            },
                                            {
                                                id: 4,
                                                name: "নবাবগঞ্জ",
                                            },
                                            {
                                                id: 5,
                                                name: "কেরানীগঞ্জ",
                                            },
                                            {
                                                id: 6,
                                                name: "ফরিদপুর সদর",
                                            },
                                        ]}
                                    />
                                    <ErrorMessage fieldName="upazila" />
                                </Col>

                                <Col md={2} className="mb-10">
                                    <InputSelect
                                        label="প্রতিষ্ঠানের ধরন"
                                        name="instituteType"
                                        // required={true}
                                        type="text"
                                        value="id"
                                        text="name"
                                        data={[
                                            {
                                                id: 1,
                                                name: "স্কুল",
                                            },
                                            {
                                                id: 2,
                                                name: "কলেজ",
                                            },
                                            {
                                                id: 3,
                                                name: "স্কুল ও কলেজ",
                                            },
                                            {
                                                id: 4,
                                                name: "মাদ্রাসা",
                                            },
                                        ]}
                                    />
                                    <ErrorMessage fieldName="instituteType" />
                                </Col>
                                <Col md={2} className="mb-10">
                                    <InputField
                                        label="প্রতিষ্ঠানের নাম"
                                        name="instituteName"
                                        // required={true}
                                        type="text"
                                        value=""
                                    />
                                    <ErrorMessage fieldName="instituteName" />
                                </Col>
                                <Col md={2} className="mb-10">
                                    <InputSelect
                                        label="পদের ধরন"
                                        name="postType"
                                        // required={true}
                                        type="text"
                                        value="id"
                                        text="name"
                                        data={[
                                            {
                                                id: 1,
                                                name: "MPO",
                                            },
                                            {
                                                id: 2,
                                                name: "NON-MPO",
                                            },
                                        ]}
                                    />
                                    <ErrorMessage fieldName="postType" />
                                </Col>
                                <Col md={2} className="mb-10">
                                    <InputSelect
                                        label="ই-রিকুইজিশন"
                                        name="eRequesitionlist"
                                        // required={true}
                                        type="text"
                                        value="id"
                                        text="name"
                                        data={[
                                            {
                                                id: 1,
                                                name: "ই-রিকুইজিশন 1",
                                            },
                                            {
                                                id: 2,
                                                name: "ই-রিকুইজিশন 2",
                                            },
                                        ]}
                                    />
                                    <ErrorMessage fieldName="eRequesitionlist" />
                                </Col> */}

                                <Col md={12} className="mb-10 border-bottom">
                                    <Button
                                        variant="white"
                                        className="f-right m-10"
                                        type="submit"
                                    >
                                        <FontAwesomeIcon
                                            icon={faSearch}
                                            className="me-2"
                                        />
                                        অনুসন্ধান করুন
                                    </Button>

                                    {/* <Button
                                        variant="white"
                                        className="f-right m-10  btn-primary"
                                        type="submit"
                                    >
                                        Genarate Report
                                    </Button> */}
                                    {/* <span className="f-right m-10">
                                        {" "}
                                        <input
                                            type="checkbox"
                                            checked={true}
                                            required={true}
                                        />{" "}
                                        All
                                    </span> */}
                                </Col>
                            </Row>
                        </Form>
                    </>
                );
            }}
        </Formik>
    );
};

export default VacantPostsListFiltering;
