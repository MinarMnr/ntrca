import {
    faTrashAlt,
    faPlusSquare,
    faSave,
    faUndo,
    faTimes,
} from "@fortawesome/free-solid-svg-icons";
//import { faPlusSquare } from "@fortawesome/react-fontawesome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Row } from "@themesberg/react-bootstrap";
import { Field, FieldArray, Form } from "formik/dist/index";
import { InputSelect } from "../../../../components/form";
import { Link } from "react-router-dom";

import { InputField } from "../../../../components/form";
import ErrorMessage from "../../../../components/text/ErrorMessage";
import Checkbox from "../../../../components/form/Checkbox";
import InputDatePicker from "components/form/InputDatePicker";
import swal from "sweetalert";
import ComboBox from "components/material/SearchComponent";
import { UrlBuilder } from "helpers/UrlBuilder";
import { useState } from "react";
import { useEffect } from "react";
import FindComboBox from "components/material/FindComponent";

const RulesForm = ({ values, setFieldValue, formType, errors }) => {
    const [fileSource, setFileSource] = useState(
        formType === "edit" ? "text" : "file"
    );

    const [hasFile, sethasFile] = useState(true);

    useEffect(() => {
        if (values?.encloserUrl) {
            sethasFile(true);
        } else {
            sethasFile(false);
        }
    }, [values]);

    const [errorMessage, setErrorMessage] = useState("");
    
    const jsonArrayString = values?.geographicalPositionNoQuotaList;

    // Convert the variable to a string and then check if it's not empty

    useEffect(() => {
        if (jsonArrayString?.toString().trim() !== "") {
            try {
                const parsedArray = JSON.parse(jsonArrayString);
    
                const hasIdOne =
                    Array.isArray(parsedArray) &&
                    parsedArray.find((item) => item.id === 1);
    
                if (hasIdOne && hasIdOne.id === 1 && parsedArray.length > 1) {
                    setErrorMessage("আপনি ইতিমধ্যে 'কোনটি নয়' নির্বাচন করেছেন");
                } else {
                    setErrorMessage("");
                }
            } catch (error) {
                console.error("Error parsing JSON:", error.message);
            }
        } else {
            console.error("JSON string is empty");
        }
    }, [jsonArrayString]);
    

    return (
        <Form>
            <Row>
                <Col xl={4} lg={4} md={6} sm={6} className="mb-10">
                    <InputField
                        label="নিয়মাবলীর নাম (ইংরেজি)"
                        name="ruleName"
                        required={true}
                        type="text"
                        placeholder="রেগুলেশনের নাম (ইংরেজি)"
                    />
                    <ErrorMessage fieldName="rulesName" />
                </Col>
                <Col xl={4} lg={4} md={6} sm={6} className="mb-10">
                    <InputField
                        label="নিয়মাবলীর নাম (বাংলায়)"
                        name="ruleNameBn"
                        required={true}
                        type="text"
                        placeholder="রেগুলেশনের নাম (বাংলা)"
                    />
                </Col>
                <Col xl={4} lg={4} md={6} sm={6} className="mb-10">
                    <label>
                        কার্যকর তারিখ
                        <abbr style={{ color: "red" }} className="req">
                            *
                        </abbr>
                    </label>
                    <InputDatePicker
                        showTime={true}
                        className="mt-10"
                        name="ruleValidFrom"
                        setField={setFieldValue}
                        dataValue={values?.ruleValidFrom}
                    />
                </Col>

                <Col md={12} className="mb-12">
                    <div className="row">
                        <div className="contentBox-modified">
                            <div className="section-header-custom">
                                <h5 className="m-10 text-white">
                                    অঞ্চলভিত্তিক নারী কোটা যুক্ত করুন
                                </h5>
                            </div>
                            <div className="contentBoxBody mt-20"></div>

                            <div className="contentBoxBody">
                                <FieldArray
                                    name="areaStatusList"
                                    render={(arrayHelpers) => (
                                        <>
                                            <table className="user-table align-items-center table table-striped table-hover text-center">
                                                <thead>
                                                    <tr>
                                                        <th>ক্রঃ নঃ</th>

                                                        <th>
                                                            অঞ্চল{" "}
                                                            <abbr
                                                                style={{
                                                                    color: "red",
                                                                }}
                                                                className="req"
                                                            >
                                                                *
                                                            </abbr>
                                                        </th>
                                                        <th>
                                                            শতাংশ{" "}
                                                            <abbr
                                                                style={{
                                                                    color: "red",
                                                                }}
                                                                className="req"
                                                            >
                                                                *
                                                            </abbr>
                                                        </th>
                                                        <th>অ্যাকশন</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {values?.areaStatusList?.map(
                                                        (item, index) => (
                                                            <tr>
                                                                <td>
                                                                    {index + 1}
                                                                </td>

                                                                <td>
                                                                    <InputSelect
                                                                        name={`areaStatusList[${index}].areaStatusId`}
                                                                        required={
                                                                            true
                                                                        }
                                                                        type="number"
                                                                        value="id"
                                                                        text="name"
                                                                        data={[
                                                                            {
                                                                                id: 1,
                                                                                name: "City Corporation",
                                                                            },
                                                                            {
                                                                                id: 2,
                                                                                name: "Pouroshova",
                                                                            },
                                                                            {
                                                                                id: 3,
                                                                                name: "Union",
                                                                            },
                                                                        ]}
                                                                    />
                                                                    <ErrorMessage fieldName="areaStatusId" />
                                                                </td>

                                                                <td>
                                                                    <InputField
                                                                        name={`areaStatusList[${index}].percentageFemale`}
                                                                        type="number"
                                                                        placeholder="Enter Percentage"
                                                                        defaultInputValue="40"
                                                                    />
                                                                    <ErrorMessage fieldName="percentageFemale" />
                                                                </td>
                                                                <td>
                                                                    {index +
                                                                        1 ==
                                                                        values
                                                                            ?.areaStatusList
                                                                            ?.length && (
                                                                        <Button
                                                                            className="me-1 bg-primary"
                                                                            type="button"
                                                                            onClick={() => {
                                                                                arrayHelpers.push(
                                                                                    {
                                                                                        areaStatusId:
                                                                                            "",
                                                                                        percentageFemale:
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
                                                                    )}

                                                                    {index + 1 >
                                                                        1 && (
                                                                        <Button
                                                                            variant="danger"
                                                                            className="bg-danger"
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
                                        </>
                                    )}
                                />
                            </div>
                        </div>
                    </div>
                </Col>

                <Col md={12} className="mb-12">
                    <div className="row">
                        <div className="contentBox-modified">
                            <div className="section-header-custom">
                                <h5 className="m-10 text-white">
                                    অগ্রাধিকার স্তর যুক্ত করুন
                                </h5>
                            </div>
                            <div className="contentBoxBody mt-20"></div>
                            <div className="contentBoxBody">
                                <FieldArray
                                    name="educationLevelWisePriorityList"
                                    render={(arrayHelpers) => (
                                        <>
                                            <table className="user-table align-items-center table table-striped table-hover text-center">
                                                <thead>
                                                    <tr>
                                                        <th>ক্রঃ নঃ</th>
                                                        <th>
                                                            শিক্ষাগত যোগ্যতা{" "}
                                                            <abbr
                                                                style={{
                                                                    color: "red",
                                                                }}
                                                                className="req"
                                                            >
                                                                *
                                                            </abbr>
                                                        </th>
                                                        <th>
                                                            অর্ডার ইনডেক্স{" "}
                                                            <abbr
                                                                style={{
                                                                    color: "red",
                                                                }}
                                                                className="req"
                                                            >
                                                                *
                                                            </abbr>
                                                        </th>
                                                        <th>অ্যাকশন</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {values?.educationLevelWisePriorityList?.map(
                                                        (item, index) => (
                                                            <tr>
                                                                <td>
                                                                    {index + 1}
                                                                </td>
                                                                <td>
                                                                    <InputSelect
                                                                        name={`educationLevelWisePriorityList[${index}].educationLevelId`}
                                                                        required={
                                                                            true
                                                                        }
                                                                        type="number"
                                                                        value="id"
                                                                        text="name"
                                                                        data={[
                                                                            {
                                                                                id: 64,
                                                                                name: "মাধ্যমিক",
                                                                            },
                                                                            {
                                                                                id: 33,
                                                                                name: "উচ্চ মাধ্যমিক",
                                                                            },
                                                                            {
                                                                                id: 44,
                                                                                name: "স্নাতকোত্তর",
                                                                            },
                                                                        ]}
                                                                    />
                                                                    <ErrorMessage fieldName="educationLevelId" />
                                                                </td>
                                                                <td>
                                                                    <InputSelect
                                                                        name={`educationLevelWisePriorityList[${index}].orderIndex`}
                                                                        required={
                                                                            true
                                                                        }
                                                                        type="number"
                                                                        value="id"
                                                                        text="name"
                                                                        data={[
                                                                            {
                                                                                id: 1,
                                                                                name: "১",
                                                                            },
                                                                            {
                                                                                id: 2,
                                                                                name: "২",
                                                                            },
                                                                            {
                                                                                id: 3,
                                                                                name: "৩",
                                                                            },
                                                                            {
                                                                                id: 4,
                                                                                name: "৪",
                                                                            },
                                                                            {
                                                                                id: 5,
                                                                                name: "৫",
                                                                            },
                                                                            {
                                                                                id: 6,
                                                                                name: "৬",
                                                                            },
                                                                            {
                                                                                id: 7,
                                                                                name: "৭",
                                                                            },
                                                                            {
                                                                                id: 8,
                                                                                name: "৮",
                                                                            },
                                                                            {
                                                                                id: 9,
                                                                                name: "৯",
                                                                            },
                                                                            {
                                                                                id: 10,
                                                                                name: "১০",
                                                                            },
                                                                        ]}
                                                                    />
                                                                    <ErrorMessage fieldName="orderIndex" />
                                                                </td>

                                                                <td>
                                                                    {index +
                                                                        1 ==
                                                                        values
                                                                            ?.educationLevelWisePriorityList
                                                                            ?.length && (
                                                                        <Button
                                                                            className="me-1 bg-primary"
                                                                            type="button"
                                                                            onClick={() => {
                                                                                arrayHelpers.push(
                                                                                    {
                                                                                        educationLevelId:
                                                                                            "",
                                                                                        orderIndex:
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
                                                                    )}

                                                                    {index + 1 >
                                                                        1 && (
                                                                        <Button
                                                                            variant="danger"
                                                                            className="bg-danger"
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
                                        </>
                                    )}
                                />
                            </div>
                        </div>
                    </div>
                </Col>

                <Col md={6} className="mb-10">
                    <label className="form-label">
                        কোটা অন্তর্ভুক্ত নয়
                        <abbr style={{ color: "red" }} className="req">
                            *
                        </abbr>
                    </label>

                    <FindComboBox
                        title="geographicalPositionNameBn"
                        name="geographicalPositionNoQuotaList"
                        setField={setFieldValue}
                        storeName="geographicalPositionList"
                        isMultiple={true}
                        formType={formType}
                        operationId={UrlBuilder.commonApi(
                            `geographical-position/all`
                        )}
                        allValue={values}
                        placeHolder="কোটা বাছাই করুন"
                        selectType="object"
                    ></FindComboBox>

                    <div style={{ color: "red" }}>{errorMessage}</div>
                </Col>

                <Col md={4} className="mb-10">
                    <div className="form-group" style={{ width: "100%" }}>
                        <label className="d-block">
                            নিয়মাবলী সংক্রান্ত ফাইল আপলোড{" "}
                            <span className="text-danger">*</span>
                            {formType === "edit" &&
                                values &&
                                values.encloserUrl && (
                                    <a
                                        href={UrlBuilder.fileServerApi(
                                            `${values && values.encloserUrl}`
                                        )}
                                        target="_blank"
                                        style={{ color: "red" }}
                                    >
                                        VIEW PDF
                                    </a>
                                )}
                        </label>

                        {/* <span className="text-primary">
                        {" "}
                        Allowed format pdf only and max file size 10mb
                    </span> */}
                        <input
                            id="attachment"
                            name="file"
                            // required={values?.encloserUrl ? false : true}
                            type={fileSource}
                            className="form-control mt-5"
                            defaultValue={
                                hasFile
                                    ? values && values?.encloserUrl
                                    : "Click here to upload file"
                            }
                            onChange={(event) => {
                                setFieldValue(
                                    "file",
                                    event.currentTarget.files[0]
                                );
                            }}
                            onClick={() => {
                                setFileSource("file");
                            }}
                        />

                        {errors.file && (
                            <div id="feedback" className="text-danger">
                                {errors.file}
                            </div>
                        )}
                    </div>
                </Col>
                <Col xl={12} lg={12} md={6} sm={6} className="mt-37">
                    <Checkbox
                        label={`মহিলা শিক্ষা প্রতিষ্ঠানের ক্ষেত্রে "শারীরিক শিক্ষা" পদে শুধুমাত্র মহিলা প্রার্থী গ্রহণযোগ্য কিনা ?`}
                        className="mt-20"
                        name="isPhysicalEducationTeacherGenderSpecificOnly"
                        checked={
                            values.isPhysicalEducationTeacherGenderSpecificOnly
                                ? true
                                : false
                        }
                    />

                    <ErrorMessage fieldName="isPhysicalEducationTeacherGenderSpecificOnly" />
                </Col>
                <Col xl={12} lg={12} md={6} sm={6} className="mt-37">
                    <Checkbox
                        label={`ইনডেক্স ধারীদের ক্ষেত্রে বয়সসীমা শিথিলযোগ্য কিনা ?`}
                        className="mt-20"
                        name="isAgeFlexibleForIndexHolder"
                        checked={
                            values.isAgeFlexibleForIndexHolder ? true : false
                        }
                    />
                    <ErrorMessage fieldName="isAgeFlexibleForIndexHolder" />
                </Col>
                <Col xl={12} lg={12} md={6} sm={6} className="mt-37">
                    <Checkbox
                        label={`ধর্ম ও নৈতিক শিক্ষা পদে প্রার্থীকে স্ব স্ব ধর্মের  অনুসারী হতে হবে কিনা ?`}
                        className="mt-20"
                        name="isReligionSpecificTeacherForReligionSubject"
                        checked={
                            values.isReligionSpecificTeacherForReligionSubject
                                ? true
                                : false
                        }
                    />
                    <ErrorMessage fieldName="isReligionSpecificTeacherForReligionSubject" />
                </Col>
                <Col md={12} className="mb-10 mt-10">
                    <Button
                        variant=""
                        className="f-right btn-primary"
                        type="submit"
                        disabled={errorMessage}
                    >
                        <FontAwesomeIcon icon={faSave} className="me-2" />{" "}
                        {formType == "add" ? "সাবমিট করুন" : "ইডিট করুন"}
                    </Button>
                    <Button
                        variant="white"
                        className="f-right mr-10"
                        type="reset"
                    >
                        <FontAwesomeIcon icon={faUndo} className="me-2" /> রিসেট
                        করুন
                    </Button>
                    <Link to="/portal/settings/rules">
                        <Button
                            variant="white"
                            className="f-right mr-10"
                            type="cancle"
                        >
                            <FontAwesomeIcon icon={faTimes} className="me-2" />{" "}
                            বাতিল করুন
                        </Button>
                    </Link>
                </Col>
            </Row>
            <Row></Row>
        </Form>
    );
};

export default RulesForm;
