import React, { useEffect, useState } from "react";
import { Field, Form, Formik } from "formik/dist/index";
import { Button, Col, Row } from "@themesberg/react-bootstrap/lib/esm/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome/index";
import { UrlBuilder } from "../../../helpers/UrlBuilder";
// import InputComboBoxApi from "../../../components/form/InputComboBoxApi";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import * as Yup from "yup";
import { AuthUser } from "../../../helpers/AuthUser";

// import SimpleAccordion from "../../../components/accordion/SimpleAccordion";
// import { InputField } from "../../../components/form";
import {
    InputField,
    InputSelect,
    InputTextArea,
} from "../../../components/form";
import ErrorMessage from "../../../components/text/ErrorMessage";
import InputSelectApi from "components/form/InputSelectApi";
import Checkbox from "../../../components/form/Checkbox";
import { useSelector } from "react-redux";
import { selectApi } from "reducers/apiSlice";
import UserRole from "constants/UserRole";

const MeritListFiltering = ({ onSubmit }, values) => {
    const { loading } = useSelector(selectApi);
    const [selectedOption, setSelectedOption] = useState(
        values?.meritGenerationType || ""
    );

    // Update the selectedOption when the defaultValue changes
    useEffect(() => {
        setSelectedOption(values?.meritGenerationType || "");
    }, [values?.meritGenerationType]);

    return (
        <Formik
            initialValues={{
                subjectCode: "",
                designationCode: "",
                meritGenerationType: selectedOption,
                ageLimit: "",
                levelId: "",
                employmentStatus: "",
            }}
            enableReinitialize={true}
            onSubmit={(values, { resetForm }) => {
                let body = { ...values };
                onSubmit(body);
            }}
            validationSchema={Yup.object().shape({
                meritGenerationType: Yup.string().required("Required"),

                levelId: Yup.string().when("meritGenerationType", {
                    is: (val) => val === "SUBJECT_WISE_MERIT",
                    then: Yup.string().required("লেভেল নির্বাচন করুন"),
                    otherwise: Yup.string(),
                }),
                subjectCode: Yup.string().when("meritGenerationType", {
                    is: (val) => val === "SUBJECT_WISE_MERIT",
                    then: Yup.string().required("বিষয় নির্বাচন করুন"),
                    otherwise: Yup.string(),
                }),
                designationCode: Yup.string().when("meritGenerationType", {
                    is: (val) => val === "DESIGNATION_WISE_MERIT",
                    then: Yup.string().required("পদবি নির্বাচন করুন"),
                    otherwise: Yup.string(),
                }),
            })}
        >
            {({ setFieldValue, values, errors, handleSubmit }) => {
                return (
                    <>
                        <Form>
                            <Row>
                                {/* <Col md={3} className="mb-10">
                                    <InputSelect
                                        label="স্তর"
                                        name="applicant_level"
                                        // required={true}
                                        type="text"
                                        value="id"
                                        text="name"
                                        data={[
                                            {
                                                id: 1,
                                                name: "Choose Level",
                                            },
                                            {
                                                id: 2,
                                                name: "School / Madrasah",
                                            },
                                            {
                                                id: 3,
                                                name: "School-2 / Madrasah / Technical",
                                            },
                                            {
                                                id: 4,
                                                name: "College / Madrasah / BM",
                                            },
                                        ]}
                                        defaultValue={values?.applicant_level}
                                    />
                                    <ErrorMessage fieldName="applicant_level" />
                                </Col> */}

                                <Col md={3} className="mb-10">
                                    <InputSelect
                                        label="মেরিট জেনারেশন টাইপ"
                                        name="meritGenerationType"
                                        required={true}
                                        type="text"
                                        value="id"
                                        text="name"
                                        data={[
                                            {
                                                id: "DESIGNATION_WISE_MERIT",
                                                name: "DESIGNATION WISE MERIT",
                                            },
                                            {
                                                id: "SUBJECT_WISE_MERIT",
                                                name: "SUBJECT WISE MERIT",
                                            },
                                        ]}
                                        defaultValue={
                                            values?.meritGenerationType
                                        }
                                        onChange={(e) =>
                                            setSelectedOption(e.target.value)
                                        }
                                    />
                                    {/* <label
                                        htmlFor="meritGenerationType"
                                        className="p-4"
                                    >
                                        মেরিট জেনারেশন টাইপ
                                        <abbr
                                            style={{ color: "red" }}
                                            className="req"
                                        >
                                            *
                                        </abbr>
                                    </label>
                                    <select
                                        name="meritGenerationType"
                                        required={true}
                                        values={selectedOption}
                                        style={{
                                            backgroundColor: "white",
                                            color: "black",
                                            padding: "3px 25px 3px 5px",

                                            borderRadius: "5px",
                                        }}
                                        onChange={(e) =>
                                            setSelectedOption(e.target.value)
                                        }
                                    >
                                        <option values="">নির্বাচন করুন</option>
                                        <option values="DESIGNATION_WISE_MERIT">
                                            DESIGNATION_WISE_MERIT
                                        </option>
                                        <option values="SUBJECT_WISE_MERIT">
                                            SUBJECT_WISE_MERIT
                                        </option>
                                    </select>
                                    {selectedOption == "" && (
                                        <ErrorMessage fieldName="meritGenerationType" />
                                    )} */}
                                </Col>

                                {selectedOption && (
                                    <>
                                        {selectedOption ===
                                        "DESIGNATION_WISE_MERIT" ? (
                                            <Col md={3} className="mb-10">
                                                <InputSelectApi
                                                    label="পদবি"
                                                    name="designationCode"
                                                    required={
                                                        selectedOption ===
                                                        "DESIGNATION_WISE_MERIT"
                                                            ? true
                                                            : false
                                                    }
                                                    operationId={UrlBuilder.ntrcaApi(
                                                        `designation/all?isForNTRCA=true`
                                                    )}
                                                    storeName="designation"
                                                    type="text"
                                                    value="designationCode"
                                                    text="designationNameBn"
                                                    defaultValue={
                                                        values?.designationCode
                                                    }
                                                />
                                                <ErrorMessage fieldName="designationCode" />
                                            </Col>
                                        ) : selectedOption ===
                                          "SUBJECT_WISE_MERIT" ? (
                                            <>
                                                <Col md={3} className="mb-10">
                                                    <InputSelectApi
                                                        label="লেভেল"
                                                        name="levelId"
                                                        required={
                                                            selectedOption ===
                                                            "SUBJECT_WISE_MERIT"
                                                                ? true
                                                                : false
                                                        }
                                                        operationId={UrlBuilder.ntrcaApi(
                                                            "level/all"
                                                        )}
                                                        storeName="levelNameBn"
                                                        type="text"
                                                        value="id"
                                                        text="levelNameBn"
                                                        defaultValue={
                                                            values?.levelId
                                                        }
                                                    />
                                                    <ErrorMessage fieldName="levelId" />
                                                </Col>
                                                <Col md={3} className="mb-10">
                                                    <InputSelectApi
                                                        label="বিষয়"
                                                        name="subjectCode"
                                                        required={
                                                            selectedOption ===
                                                            "SUBJECT_WISE_MERIT"
                                                                ? true
                                                                : false
                                                        }
                                                        operationId={values?.levelId&&UrlBuilder.ntrcaApi(
                                                            `subject/all?levelId=${values?.levelId}`
                                                        )}
                                                        storeName="subject"
                                                        type="text"
                                                        value="subjectCode"
                                                        text="subjectNameBn"
                                                        defaultValue={
                                                            values?.subjectCode
                                                        }
                                                    />

                                                    <ErrorMessage fieldName="subjectCode" />
                                                </Col>
                                            </>
                                        ) : null}
                                    </>
                                )}
                                {AuthUser.getRoles().includes(
                                    UserRole.ADMIN
                                ) && (
                                    <>
                                        <Col md={3} className="mb-10">
                                            <InputSelect
                                                label="বয়সসীমা"
                                                name="ageLimit"
                                                // required={true}
                                                type="text"
                                                value="id"
                                                text="name"
                                                data={[
                                                    {
                                                        id: "EXCEEDED",
                                                        name: "৩৫ বছর বা তদুর্ধ",
                                                    },
                                                    {
                                                        id: "NOT_EXCEEDED",
                                                        name: "৩৫ বছরের কম",
                                                    },
                                                ]}
                                                defaultValue={values?.ageLimit}
                                            />
                                            <ErrorMessage fieldName="ageLimit" />
                                        </Col>

                                        <Col md={3} className="mb-10">
                                            <InputSelect
                                                label="কর্মসংস্থানের অবস্থা"
                                                name="employmentStatus"
                                                // required={true}
                                                type="text"
                                                value="id"
                                                text="name"
                                                data={[
                                                    {
                                                        id: "UNEMPLOYED",
                                                        name: "চাকরিতে যোগদান ব্যতিত",
                                                    },
                                                    // {
                                                    //     id: "NOT_EXCEEDED",
                                                    //     name: "৩৫ বছরের কম",
                                                    // },
                                                ]}
                                                defaultValue={
                                                    values?.employmentStatus
                                                }
                                            />
                                            <ErrorMessage fieldName="employmentStatus" />
                                        </Col>
                                    </>
                                )}
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
                                </Col>
                            </Row>
                        </Form>
                    </>
                );
            }}
        </Formik>
    );
};

export default MeritListFiltering;
