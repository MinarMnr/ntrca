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
import InputSelectApi from "components/form/InputSelectApi";
import { FieldArray, Form } from "formik/dist/index";
import { UrlBuilder } from "helpers/UrlBuilder";
import { Link } from "react-router-dom";
import swal from "sweetalert";

import { InputField } from "../../../../components/form";
import ErrorMessage from "../../../../components/text/ErrorMessage";

const SubjectWisePostForm = ({ values }) => {
    return (
        <Form>
            <Row>
                <Col md={6} className="mb-10">
                    <InputSelectApi
                        label="প্রতিষ্ঠানের ধরন"
                        required={true}
                        name="levelId"
                        type="number"
                        value="id"
                        operationId={UrlBuilder.ntrcaApi("level/all")}
                        storeName="levelId"
                        text="levelNameBn"
                    />
                    <ErrorMessage fieldName="levelId" />
                </Col>
                <Col md={6} className="mb-10">
                    <InputSelectApi
                        label="পদের ধরন"
                        required={true}
                        name="designationId"
                        type="number"
                        value="id"
                        operationId={
                            values.levelId
                                ? UrlBuilder.ntrcaApi(
                                      `designation/all?levelId=${values.levelId}`
                                  )
                                : UrlBuilder.ntrcaApi("designation/all")
                        }
                        storeName="designation"
                        text="designationNameBn"
                        // onChange={checkData(
                        //     index
                        // )}
                    />
                    <ErrorMessage fieldName="designationId" />
                </Col>
            </Row>

            <Row>
                <Col md={12} className="mb-12">
                    <div className="contentBox mt-10">
                        <div className="input-group form-control bg-number-label">
                            বিষয় যুক্ত করুন
                        </div>
                        <div className="table-responsive ">
                            <div className="col-md-12">
                                <FieldArray
                                    name="subjectList"
                                    render={(arrayHelpers) => (
                                        <>
                                            <table className="user-table align-items-center table table-striped table-hover text-center">
                                                <thead>
                                                    <tr>
                                                        <th>ক্রঃ নঃ</th>
                                                        <th>বিষয়ের নাম</th>
                                                        <th>অ্যাকশন</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <FieldArray
                                                        name="subjectIds"
                                                        render={(
                                                            arrayHelpers
                                                        ) => (
                                                            <>
                                                                {values?.subjectIds?.map(
                                                                    (
                                                                        item,
                                                                        index
                                                                    ) => (
                                                                        <tr
                                                                            key={
                                                                                index
                                                                            }
                                                                        >
                                                                            <td>
                                                                                {index +
                                                                                    1}
                                                                            </td>
                                                                            <td>
                                                                                <InputSelectApi
                                                                                    name={`subjectIds[${index}].subjectId`}
                                                                                    required={
                                                                                        true
                                                                                    }
                                                                                    type="number"
                                                                                    value="id"
                                                                                    operationId={
                                                                                        values?.levelId
                                                                                            ? UrlBuilder.ntrcaApi(
                                                                                                  `subject/all?levelId=${values.levelId}`
                                                                                              )
                                                                                            : UrlBuilder.ntrcaApi(
                                                                                                  "subject/all"
                                                                                              )
                                                                                    }
                                                                                    storeName="subjectAll"
                                                                                    text="subjectNameBn"
                                                                                />
                                                                                <ErrorMessage
                                                                                    name={`subjectIds[${index}].subjectId`}
                                                                                    component="div"
                                                                                />
                                                                            </td>
                                                                            <td className="text-center">
                                                                                {index +
                                                                                    1 ===
                                                                                    values
                                                                                        .subjectIds
                                                                                        .length && (
                                                                                    <Button
                                                                                        variant="success"
                                                                                        className="me-1 i-size"
                                                                                        type="button"
                                                                                        onClick={() => {
                                                                                            arrayHelpers.push(
                                                                                                {
                                                                                                    subjectId:
                                                                                                        "",
                                                                                                }
                                                                                            );
                                                                                        }}
                                                                                    >
                                                                                        <i>
                                                                                            <FontAwesomeIcon
                                                                                                title="বিষয় যোগ করুন"
                                                                                                icon={
                                                                                                    faPlusSquare
                                                                                                }
                                                                                                className="text-light"
                                                                                            />
                                                                                        </i>
                                                                                    </Button>
                                                                                )}

                                                                                {index +
                                                                                    1 >
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
                                                                                                    if (
                                                                                                        willDelete
                                                                                                    ) {
                                                                                                        arrayHelpers.remove(
                                                                                                            index
                                                                                                        );
                                                                                                    }
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
                                                            </>
                                                        )}
                                                    />
                                                </tbody>
                                            </table>

                                            <Col
                                                md={12}
                                                className="mb-10 mt-10"
                                            >
                                                <Button
                                                    variant=""
                                                    className="f-right btn-color"
                                                    type="submit"
                                                >
                                                    <FontAwesomeIcon
                                                        icon={faSave}
                                                        className="me-2"
                                                    />{" "}
                                                    সাবমিট
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
                                                    রিসেট
                                                </Button>
                                                <Link to="/portal/settings/subject-wise-post">
                                                    <Button
                                                        variant="white"
                                                        className="f-right mr-10"
                                                        type="cancle"
                                                    >
                                                        <FontAwesomeIcon
                                                            icon={faTimes}
                                                            className="me-2"
                                                        />{" "}
                                                        বাতিল
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
            </Row>
        </Form>
    );
};

export default SubjectWisePostForm;
