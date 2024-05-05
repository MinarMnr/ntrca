import {
    faSave,
    faUndo,
    faTimes,
    faPlusSquare,
    faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    Modal,
    Button,
    Col,
    Row,
    Form as Form1,
} from "@themesberg/react-bootstrap";
import { Form } from "formik/dist/index";
import React from "react";
import { InputField, InputSelect } from "../../../../components/form";
import InputSelectApi from "../../../../components/form/InputSelectApi";
import ErrorMessage from "../../../../components/text/ErrorMessage";
import { useHistory } from "react-router-dom";
import { FieldArray } from "formik/dist/index";
import { useDispatch, useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import { UrlBuilder } from "../../../../helpers/UrlBuilder";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash";
import { callApi, selectApi } from "../../../../reducers/apiSlice";
import Cookies from "js-cookie";
import InputDatePicker from "components/form/InputDatePicker";

const ApproveReviewForm = ({ values, setFieldValue, type, handleChange }) => {
    const history = useHistory();
    const [showModal, setShowModal] = React.useState(false);
    const [checkQualification, setCheckQualification] = useState(false);
    const closeModal = () => setShowModal(false);
    let count = 0;
    //const educational = [];
    const {
        loading,
        roleDataList = {
            data: {},
        },
        usersList = {
            data: {},
        },
    } = useSelector(selectApi);
    const dispatch = useDispatch();

    var i = useRef();
    const [editList, setEditList] = React.useState([]);

    useEffect(() => {
        dispatch(
            callApi({
                operationId: UrlBuilder.keyClockApi("admin/role-all"),
                storeName: "roleDataList",
                output: "roleDataList",
            })
        );
    }, [type]);

    const getRoleName = (id) => {
        const found =
            roleDataList?.length > 0 &&
            roleDataList.find((element) => element.roleId == id);
        return found?.roleName;
    };

    useEffect(() => {
        setEditList(values.roleList);
    }, [values.roleList, editList]);

    if (usersList?.status == "success" && values?.roleList?.length > 0) {
        values.roleList[i.current] = usersList?.data;
    }

    const getUsers = (id) => {
        dispatch(
            callApi({
                operationId: UrlBuilder.ntrcaApi(
                    `admin/user-all?first=0&max=100&userRoleName=${getRoleName(
                        id
                    )}`
                ),
                storeName: `usersList`,
                output: `usersList`,
            })
        );
    };

    const getUserName = (id) => {
        const found = roleDataList.find((element) => element.roleId == id);
        return found?.lastName;
    };
    return (
        <Form>
            <Row>
                <Col md={6} className="mb-10">
                    <InputField
                        label="Approve Reviewer Name "
                        name="approverReviewerName"
                        type="text"
                        required={true}
                        placeholder="Enter Reviewer Name"
                    />
                    <ErrorMessage fieldName="approverReviewerName" />
                </Col>

                <Col md={6} className="mb-10">
                    <InputSelectApi
                        label="Review Process Name "
                        name="appEntityId"
                        operationId={UrlBuilder.reviewerApi(
                            "app-entity-module/find/13"
                        )}
                        storeName="appEntitySelect"
                        value="appEntityId"
                        text="appEntityName"
                        required={true}
                        onChange={(e) =>
                            setFieldValue("appEntityId", e.target.value)
                        }
                    />
                    <ErrorMessage fieldName="appEntityId" />
                </Col>

                <Col md={6} className="mb-10">
                    {/* <InputField
            label="Effective Date From"
            name="effectiveDateFrom"
            type="date"
            required={true}
            placeholder="Enter Effective Date From"
          /> */}
                    <label>
                        Effective Date From
                        <span className="text-danger">*</span>
                    </label>

                    <InputDatePicker
                        name="effectiveDateFrom"
                        setField={setFieldValue}
                        dataValue={values?.effectiveDateFrom}
                    />
                    <ErrorMessage fieldName="effectiveDateFrom" />
                </Col>
                <Col md={6} className="mb-10">
                    {/* <InputField
            label="Effective Date To"
            name="effectiveDateTo"
            type="date"
            required={true}
            placeholder="Enter Effective Date To"
          /> */}
                    <label>
                        Effective Date To<span className="text-danger">*</span>
                    </label>
                    <InputDatePicker
                        name="effectiveDateTo"
                        setField={setFieldValue}
                        dataValue={values?.effectiveDateTo}
                    />
                    <ErrorMessage fieldName="effectiveDateTo" />
                </Col>

                <Col md={6} className="mb-10">
                    <InputField
                        label="Remark"
                        name="remark"
                        type="text"
                        placeholder="Enter Remark"
                        // onChange={(e) =>
                        // 	setFieldValue("remark", e.target.value)
                        //   }
                    />
                    {/* <ErrorMessage fieldName="educationLevelId" /> */}
                </Col>
                <FieldArray
                    name="approverReviewerUsers"
                    render={(arrayHelpers) => (
                        <>
                            <Row>
                                <Col md={12} className="mb-10 mt-10">
                                    <table className="table table-bordered text-center">
                                        <thead>
                                            <tr>
                                                <th>Sl</th>
                                                <th>User Role</th>
                                                {/* <th>User Name</th> */}
                                                {/* <th>Designation </th> */}
                                                <th>Order Index</th>
                                                <th>Review Days</th>
                                                <th>Actions </th>
                                                <th>Actions </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {loading === false &&
                                            values.approverReviewerUsers &&
                                            //values?.roleList?.length > 0 &&
                                            values.approverReviewerUsers
                                                .length > 0 ? (
                                                values.approverReviewerUsers.map(
                                                    (item, index) => (
                                                        <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td>
                                                                <div className="col">
                                                                    <InputSelect
                                                                        name={`approverReviewerUsers[${index}].userRoleId`}
                                                                        type="text"
                                                                        value="roleId"
                                                                        text="roleName"
                                                                        data={
                                                                            roleDataList ||
                                                                            []
                                                                        }
                                                                        isRequired={
                                                                            true
                                                                        }
                                                                        onChange={(
                                                                            e
                                                                        ) => {
                                                                            setFieldValue(
                                                                                `approverReviewerUsers[${index}].userRoleName`,
                                                                                getRoleName(
                                                                                    e
                                                                                        .target
                                                                                        .value
                                                                                )
                                                                            );
                                                                            setFieldValue(
                                                                                `approverReviewerUsers[${index}].userRoleId`,
                                                                                e
                                                                                    .target
                                                                                    .value
                                                                            );
                                                                            i.current =
                                                                                index;
                                                                            // getUsers(
                                                                            //     e
                                                                            //         .target
                                                                            //         .value
                                                                            // );
                                                                        }}
                                                                    />
                                                                </div>
                                                            </td>

                                                            {/* <td>
                                                                <div className="col">
                                                                     <InputSelect
                                                                        name={`approverReviewerUsers[${index}].kcUserId`}
                                                                        type="text"
                                                                        value="id"
                                                                        text="username"
                                                                        data={
                                                                            type ==
                                                                            "add"
                                                                                ? values?.roleList &&
                                                                                  values
                                                                                      ?.roleList[
                                                                                      index
                                                                                  ]
                                                                                : editList &&
                                                                                  editList[
                                                                                      index
                                                                                  ]
                                                                                      ?.length >
                                                                                      0 &&
                                                                                  editList[
                                                                                      index
                                                                                  ]
                                                                        }
                                                                        onChange={(
                                                                            e
                                                                        ) => {
                                                                            setFieldValue(
                                                                                `approverReviewerUsers[${index}].kcUserName`,
                                                                                getUserName(
                                                                                    e
                                                                                        .target
                                                                                        .value
                                                                                )
                                                                            );
                                                                            setFieldValue(
                                                                                `approverReviewerUsers[${index}].kcUserId`,
                                                                                e
                                                                                    .target
                                                                                    .value
                                                                            );
                                                                        }}
                                                                    /> 
                                                                </div>
                                                            </td> */}

                                                            <td>
                                                                <div className="col">
                                                                    <InputField
                                                                        //label="Order Index"
                                                                        name={`approverReviewerUsers.${index}.orderIndex`}
                                                                        type="number"
                                                                        min="0"
                                                                        max="99"
                                                                        value={`approverReviewerUsers.${index}.orderIndex`}
                                                                        onChange={
                                                                            handleChange
                                                                        }
                                                                    />
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="col">
                                                                    <InputField
                                                                        //label="Review Days"
                                                                        name={`approverReviewerUsers.${index}.reviewDays`}
                                                                        type="number"
                                                                        min="0"
                                                                        max="99"
                                                                        //placeholder="Enter Percentage Multiplier"
                                                                        value={
                                                                            values
                                                                                .approverReviewerUsers[
                                                                                index
                                                                            ]
                                                                                .reviewDays
                                                                        }
                                                                        onChange={
                                                                            handleChange
                                                                        }
                                                                    />
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="col">
                                                                    <InputSelect
                                                                        //label='Actions '
                                                                        name={`approverReviewerUsers[${index}].actionToBePerformed`}
                                                                        data={[
                                                                            {
                                                                                id: "REVIEW",
                                                                                name: "REVIEW",
                                                                            },
                                                                            {
                                                                                id: "APPROVE",
                                                                                name: "APPROVAL",
                                                                            },
                                                                        ]}
                                                                        isRequired={
                                                                            true
                                                                        }
                                                                        text="name"
                                                                        value="id"
                                                                        onChange={
                                                                            handleChange
                                                                        }
                                                                    />
                                                                </div>
                                                            </td>
                                                            <td className="text-center">
                                                                {index != 0 && (
                                                                    <Button
                                                                        onClick={() =>
                                                                            arrayHelpers.remove(
                                                                                index
                                                                            )
                                                                        }
                                                                        variant="danger"
                                                                        className="mt-5 btn-sm"
                                                                        type="button"
                                                                    >
                                                                        <FontAwesomeIcon
                                                                            icon={
                                                                                faTrash
                                                                            }
                                                                            className="me-0"
                                                                        />
                                                                    </Button>
                                                                )}
                                                            </td>
                                                        </tr>
                                                    )
                                                )
                                            ) : (
                                                <tr>
                                                    <td colSpan={7}>No Data</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                    <Button
                                        onClick={(count) =>
                                            arrayHelpers.push({
                                                actionToBePerformed: "",
                                                id: 0,
                                                kcUserDesignation: "",
                                                //kcUserId: "",
                                                kcUserName: "",
                                                orderIndex: "",
                                                reviewDays: "",
                                                userRoleId: "",
                                                userRoleName: "",
                                                recordVersion: "",
                                            })
                                        }
                                        variant="info"
                                        className="f-right mt-15 mb-20"
                                        type="button"
                                    >
                                        <FontAwesomeIcon
                                            icon={faPlus}
                                            className="me-0"
                                        />
                                    </Button>
                                </Col>
                            </Row>
                        </>
                    )}
                />

                <Col md={12} className="mb-10 mt-10">
                    <Button
                        variant=""
                        className="f-right btn-primary"
                        type="submit"
                    >
                        <FontAwesomeIcon icon={faSave} className="me-2" />{" "}
                        Submit
                    </Button>
                    <Button
                        variant="white"
                        className="f-right mr-10"
                        type="reset"
                    >
                        <FontAwesomeIcon icon={faUndo} className="me-2" /> Reset
                    </Button>
                    {/* <Link to='/EducationalQualificationRules'> */}
                    <Button
                        variant="white"
                        className="f-right mr-10"
                        onClick={() => {
                            history.goBack();
                        }}
                    >
                        <FontAwesomeIcon icon={faTimes} className="me-2" />{" "}
                        Cancel
                    </Button>
                    {/* </Link> */}
                </Col>
            </Row>
        </Form>
    );
};

export default ApproveReviewForm;
