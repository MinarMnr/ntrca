import {
    faTrashAlt,
    faPlusSquare,
    faSave,
} from "@fortawesome/free-solid-svg-icons";
//import { faPlusSquare } from "@fortawesome/react-fontawesome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Row } from "@themesberg/react-bootstrap";
import { FieldArray, Form } from "formik/dist/index";
import { InputSelect } from "../../../../components/form";
import { Link } from "react-router-dom";

import { InputField } from "../../../../components/form";
import ErrorMessage from "../../../../components/text/ErrorMessage";

const CertificateAddForm = ({ values }) => {
    return (
        <Form>
            <Row>
                <Col md={12} className="mb-12">
                    <div className="contentBox mt-10">
                        <div className="input-group form-control bg-number-label">
                            সনদপত্র যুক্ত করুন
                        </div>
                        <div className="table-responsive">
                            <div className="col-md-12">
                                <FieldArray
                                    name="institutesList"
                                    render={(arrayHelpers) => (
                                        <>
                                            <table className="user-table align-items-center table table-striped table-hover text-center">
                                                <thead>
                                                    <tr>
                                                        <th>ক্রঃ নঃ</th>
                                                        <th>ব্যাচ</th>
                                                        <th>পাসের সন</th>
                                                        <th>রোল নম্বর</th>
                                                        <th>
                                                            রেজিস্ট্রেশন নম্বর
                                                        </th>
                                                        <th>বিষয়</th>
                                                        <th>
                                                            প্রতিষ্ঠানের ধরন
                                                        </th>
                                                        <th>Add More</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {/* <tr>

                                                    </tr> */}
                                                    {values?.institutesList?.map(
                                                        (item, index) => (
                                                            <tr>
                                                                <td>
                                                                    {index + 1}
                                                                </td>
                                                                <td>
                                                                    <InputField
                                                                        name={`institutesList[${index}].batch`}
                                                                        type="text"
                                                                        placeholder="Enter Batch"
                                                                    />
                                                                </td>
                                                                <td>
                                                                    <InputField
                                                                        name={`institutesList[${index}].year`}
                                                                        type="text"
                                                                        placeholder="Enter Year"
                                                                    />
                                                                </td>
                                                                <td>
                                                                    <InputField
                                                                        name={`institutesList[${index}].roll`}
                                                                        type="text"
                                                                        placeholder="Enter Roll Number"
                                                                    />
                                                                </td>
                                                                <td>
                                                                    <InputField
                                                                        name={`institutesList[${index}].reg`}
                                                                        type="text"
                                                                        placeholder="Enter Registration Number"
                                                                    />
                                                                </td>
                                                                <td>
                                                                    <InputField
                                                                        name={`institutesList[${index}].subject`}
                                                                        type="text"
                                                                        placeholder="Enter Subject"
                                                                    />
                                                                </td>
                                                                <td>
                                                                    <InputSelect
                                                                        name={`institutesList[${index}].instituteType`}
                                                                        type="text"
                                                                        value="id"
                                                                        data={[
                                                                            {
                                                                                id: 1,
                                                                                name: "School",
                                                                            },
                                                                            {
                                                                                id: 2,
                                                                                name: "College",
                                                                            },
                                                                            {
                                                                                id: 3,
                                                                                name: "Madrasha",
                                                                            },
                                                                        ]}
                                                                        text="name"
                                                                        // onChange={checkData(
                                                                        //     index
                                                                        // )}
                                                                    />
                                                                </td>

                                                                <td className="text-center">
                                                                    <Button
                                                                        className="me-1 i-size bg-primary"
                                                                        type="button"
                                                                        onClick={() => {
                                                                            arrayHelpers.push(
                                                                                {
                                                                                    batch: "",
                                                                                    year: "",
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
                                                                                className="text-light mt-5"
                                                                            />
                                                                        </i>
                                                                    </Button>
                                                                    {index + 1 >
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
                                                                                    className="text-light mt-5"
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
                <Col md={12} className="mt-20 mb-30">
                    <Link to="#">
                        <Button
                            variant="link"
                            className="f-right btn-color"
                            type="submit"
                        >
                            <FontAwesomeIcon icon={faSave} className="me-2" />{" "}
                            Submit
                        </Button>
                    </Link>
                </Col>
            </Row>
        </Form>
    );
};

export default CertificateAddForm;
