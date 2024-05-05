import React, { useState } from "react";
// import { Button, Col, Row } from "react-bootstrap";
import { Button, Card, Col, Row } from "@themesberg/react-bootstrap";
import { Form } from "formik/dist/index";
import { InputField, InputSelect } from "components/form";
import ErrorMessage from "../../../components/text/ErrorMessage";
import InputDatePicker from "components/form/InputDatePicker";
import { useSelector } from "react-redux";
import { selectApi } from "reducers/apiSlice";
// import TeacherAlreadyExistModal from "./TeacherAlreadyExistModal";

const TeacherJoiningForm = ({ values, setFieldValue, errors, status }) => {

    console.log('status', status);

    const {
        employeeHistoryCheckData = {
            data: {},
          }
    } = useSelector(selectApi);

    console.log('employeeHistoryCheckData Inside Form Component', employeeHistoryCheckData);
    return (
        <Form>

            <Row>
                <div class="mb-10 col-md-12 col-12">
                    <h4 class="text-start">সাধারণ তথ্য</h4>
                    <hr class="border border-info border-1" />
                </div>

                <Col md={6} className="mb-15">
                    <InputField
                        label="নাম (ইংরেজিতে)"
                        name="employeeName"
                        required={true}
                        disabled={true}
                        type="text"
                        placeholder=" Full Name"
                    />
                    <ErrorMessage fieldName="employeeName" />
                </Col>
                <Col md={6} className="mb-15">
                    <InputField
                        label="পিতার নাম (ইংরেজিতে)"
                        name="fathersName"
                        required={true}
                        disabled={true}
                        type="text"
                        placeholder="Father's Name"
                    />
                    <ErrorMessage fieldName="fathersName" />
                </Col>
                <Col md={6} className="mb-15">
                    <InputField
                        label="মাতার নাম (ইংরেজিতে)"
                        name="mothersName"
                        required={true}
                        disabled={true}
                        type="text"
                        placeholder="Mother's Name"
                    />
                    <ErrorMessage fieldName="mothersName" />
                </Col>
                <Col md={6} className="mb-15">
                    <InputDatePicker
                        label="জন্মতারিখ"
                        name="dateOfBirth"
                        setField={setFieldValue}
                        dataValue={values?.dateOfBirth}
                        disabled={true}
                    />
                    <ErrorMessage fieldName="dateOfBirth" />
                </Col>
                <Col md={6} className="mb-15">
                    <InputField
                        label="পুরুষ/মহিলা"
                        name="gender"
                        placeholder="পুরুষ/মহিলা"
                        required={true}
                        disabled={true}
                        type="text"
                    />
                    <ErrorMessage fieldName="gender" />
                </Col>
                <Col md={6} className="mb-15">
                    <InputField
                        label="জাতীয়তা"
                        name="nationality"
                        required={true}
                        disabled={true}
                        type="text"
                        placeholder="Nationality"
                    />
                    <ErrorMessage fieldName="nationality" />
                </Col>
                <Col md={6} className="mb-15">
                    <InputField
                        label="জাতীয় পরিচয়পত্র নম্বর"
                        name="nid"
                        required={true}
                        disabled={true}
                        type="text"
                        placeholder="এনআইডি Number"
                    />
                </Col>
                <Col md={6} className="mb-15">
                    <div>
                        <InputField
                            label="জন্ম নিবন্ধন নম্বর"
                            // required={false}
                            disabled={true}
                            name="birthRegNo"
                            type="text"
                            placeholder="Birth Reg Number"
                        />
                        <ErrorMessage fieldName="birthRegNo" />
                    </div>
                </Col>
                <Col md={6} className="mb-15">
                    <InputField
                        label="মোবাইল নম্বর"
                        required={true}
                        name="mobile"
                        type="text"
                        placeholder=" Contact Number"
                    />
                    <ErrorMessage fieldName="mobile" />
                </Col>
                <Col md={6} className="mb-15">
                    <InputField
                        label="ই-মেইল"
                        name="email"
                        required={true}
                        type="email"
                        placeholder=" Email address"
                    />
                    <ErrorMessage fieldName="email" />
                </Col>

            </Row>
            <Row className="p-20 pb-4 gx-6 gy-2">
                <Col xs={12} md={12} className="mb-10">
                    <h4 className="text-start">কর্মস্থলের তথ্য</h4>
                    <hr className="border border-info border-1" />
                </Col>

                <Col xs={12} md={6} className="mb-10">
                    <InputField
                        label="পদবি"
                        name="designationName"
                        required={true}
                        disabled={true}
                        type="text"
                        placeholder="পদবি"
                    />
                    <ErrorMessage fieldName="designationName" />
                </Col>

                <Col xs={12} md={6} className="mb-10">
                    <InputField
                        label="বিষয়"
                        name="subjectName"
                        required={true}
                        disabled={true}
                        type="text"
                        placeholder="বিষয়"
                    />
                    <ErrorMessage fieldName="subjectName" />
                </Col>
                <Col xs={12} md={6} className="mb-10">
                    <InputDatePicker
                        label="যোগদানের তারিখ"
                        name="joiningDate"
                        setField={setFieldValue}
                        dataValue={values?.joiningDate}
                    />
                    <ErrorMessage fieldName="joiningDate" />
                </Col>

                <Col xs={12} md={6} className="mb-10">
                    <InputSelect
                        label="যোগদানের সময়"
                        name="joiningTime"
                        value="id"
                        data={[
                            { id: "MORNING", name: "প্রভাত" },
                            { id: "EVENING", name: "সায়াহ্ন" },
                            { id: "AFTERNOON", name: "অপরাহ্ন" },
                            { id: "FORENOON", name: "পূর্বাহ্ন" },
                            { id: "NOON", name: "দুপুর" },
                        ]}
                        required={true}
                        text="name"
                    />
                    <ErrorMessage fieldName="joiningTime" />
                </Col>

                <Col md={6}>
                    <InputField
                        label="প্রতিষ্ঠানের নামঃ"
                        name="instituteName"
                        required={true}
                        type="text"
                        disabled={true}
                    />
                    <ErrorMessage fieldName="instituteName" />
                </Col>
            </Row>
            {
                (employeeHistoryCheckData?.data !== null && employeeHistoryCheckData?.data?.isExist == false ) &&
                (
                    <Row className="p-20 pb-4 gx-6 gy-2">
                        <Col xs={12} md={12} className="mb-10">
                            <h4 className="text-start">সংযুক্তি</h4>
                            <hr className="border border-info border-1" />
                        </Col>

                        <Col xs={12} md={6} className="mb-10">
                            <label>
                                ছবি <span className="text-danger">*</span>
                            </label>
                            <span className="text-primary">
                                {" "}
                                Allowed photo format (jpg, jpeg, png) and max file size
                                500 kb or less
                            </span>
                            <input
                                id="employeeImage"
                                name="employeeImage"
                                type="file"
                                accept="image/*"
                                onChange={(event) => {
                                    setFieldValue(
                                        "employeeImage",
                                        event.target.files[0]
                                    );
                                }}
                                className={`form-control mt-7 ${errors?.employeeImage ? "is-invalid" : ""
                                    }`}
                            />
                            <span className="text-danger">{errors?.employeeImage}</span>
                            <span className={errors?.employeeImage == "Unsupported Format" ? "text-danger" : ""}>{errors?.employeeImage == "Unsupported Format" ? "Unsupported Format-Please Select jpg, jpeg or png file" : ""}</span>
                        </Col>
                                
                        <Col xs={12} md={6} className="mb-10">
                            <label>
                                জাতীয় পরিচয়পত্র <span className="text-danger">*</span>
                            </label>
                            <span className="text-primary">
                                {" "}
                                Allowed photo format (jpg, jpeg, png) and max file size
                                500 kb or less
                            </span>
                            <input
                                id="nidCopy"
                                name="nidCopy"
                                type="file"
                                // accept="image/*"
                                onChange={(event) => {
                                    setFieldValue("nidCopy", event.target.files[0]);
                                }}
                                className={`form-control mt-7 ${errors.nidCopy ? "is-invalid" : ""
                                    }`}
                            />
                            <span className="text-danger">{errors?.nidCopy}</span>
                            <span className={errors?.nidCopy == "Unsupported Format" ? "text-danger" : ""}>{errors?.nidCopy == "Unsupported Format" ? "Unsupported Format-Please Select jpg, jpeg or png file" : ""}</span>
                        </Col>
                                
                        <Col xs={12} md={6} className="mb-10">
                            <label>
                                নিয়োগ সংক্রান্ত সংযুক্তি(যোগদানপত্র){" "}
                                <span className="text-danger">*</span>
                            </label>
                            <span className="text-primary">
                                {" "}
                                Allowed format pdf,docs and max file size 500 kb
                            </span>
                            <input
                                id="joiningLetter"
                                name="joiningLetter"
                                type="file"
                                onChange={(event) => {
                                    setFieldValue(
                                        "joiningLetter",
                                        event.target.files[0]
                                    );
                                }}
                                className={`form-control mt-7 ${errors.joiningLetter ? "is-invalid" : ""
                                    }`}
                            />
                            <span className="text-danger">{errors?.joiningLetter}</span>
                            <span className={errors?.joiningLetter == "Unsupported Format" ? "text-danger" : ""}>{errors?.joiningLetter == "Unsupported Format" ? "Unsupported Format-Please Select pdf or docs file" : ""}</span>
                        </Col>
                    </Row>
                )
            }
            {
                (employeeHistoryCheckData?.data !== null && employeeHistoryCheckData?.data?.isExist == true ) &&
                (
                    <Row className="p-20 pb-4 gx-6 gy-2">
                        <Col xs={12} md={12} className="mb-10">
                            <h4 className="text-start">সংযুক্তি</h4>
                            <hr className="border border-info border-1" />
                        </Col>
                                
                        <Col xs={12} md={6} className="mb-10">
                            <label>
                                নিয়োগ সংক্রান্ত সংযুক্তি(যোগদানপত্র){" "}
                                <span className="text-danger">*</span>
                            </label>
                            <span className="text-primary">
                                {" "}
                                Allowed format pdf,docs and max file size 500 kb
                            </span>
                            <input
                                id="joiningLetter"
                                name="joiningLetter"
                                type="file"
                                onChange={(event) => {
                                    setFieldValue(
                                        "joiningLetter",
                                        event.target.files[0]
                                    );
                                }}
                                className={`form-control mt-7 ${errors.joiningLetter ? "is-invalid" : ""
                                    }`}
                            />
                            <span className="text-danger">{errors?.joiningLetter}</span>
                            <span className={errors?.joiningLetter == "Unsupported Format" ? "text-danger" : ""}>{errors?.joiningLetter == "Unsupported Format" ? "Unsupported Format-Please Select pdf or docs file" : ""}</span>
                        </Col>
                    </Row>
                )
            }
            {/* <TeacherAlreadyExistModal show={show} setShow={setShow} /> */}
            <Row className="p-20 pb-4 gx-6 gy-2 justify-content-end">
                <Col xs={12} md={4} className="mb-10">
                    <Button
                        variant=""
                        className="mt-2 btn-theme btn-block bg-primary text-white"
                        type="submit"
                        disabled={status == "success" ? true : false}
                    >
                        যোগদান করুন
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};

export default TeacherJoiningForm;
