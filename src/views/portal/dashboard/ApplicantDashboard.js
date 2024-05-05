import * as React from "react";
import { useState, useEffect } from "react";
import DefaultCard from "../../../components/card/default/DefaultCard";
import {
    faFileArchive,
    faPauseCircle,
} from "@fortawesome/free-regular-svg-icons";
import {
    faTrashAlt,
    faSave,
    faCross,
    faCut,
    faImages,
    faWindowClose,
    faImage,
    faCircleNotch,
    faSchool,
    faLocationArrow,
} from "@fortawesome/free-solid-svg-icons";
import DashboardWidget from ".././_partials/DashboardWidget";

import "./Dashboard.scss";
import { AuthUser } from "helpers/AuthUser";
import { callApi, selectApi } from "reducers/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import { UrlBuilder } from "helpers/UrlBuilder";
import { Table } from "@themesberg/react-bootstrap";
import moment from "moment/moment";

const Dashboard = (props) => {
    const surveyCardProps = {
        title: "সংক্ষিপ্ত বিবরণ",
    };
    const dispatch = useDispatch();
    const nid = AuthUser.getApplicantNid();

    useEffect(() => {
        dispatch(
            callApi({
                operationId: UrlBuilder.ntrcaApi(
                    `certified-applicant/details/${nid}`
                ),
                output: "details",
                storeName: "applicantDetails",
            })
        );
    }, [dispatch]);

    const {
        loading,
        details = {
            data: {},
        },
        examDetails = {
            data: {},
        },
        reasonForRejections = {
            data: {},
        },
    } = useSelector(selectApi);

    useEffect(() => {
        dispatch(
            callApi({
                operationId: UrlBuilder.ntrcaApi(
                    `certified-applicant/merit/${details?.data?.id}`
                ),
                output: "examDetails",
                storeName: "examDetails",
            })
        );
    }, [details?.data?.id]);

    const {
        applicantName,
        fatherName,
        subjectName,
        subjectCode,
        designationName,
        designationCode,
        religion,
        gender,
        mobileNo,
        dob,
    } = details?.data ?? {};

    const DashBoardChart = [
        {
            id: 1,
            title: "মোট নির্বাচিত প্রতিষ্ঠান",
            // link: "/portal/application/joining",
            icon: faSchool,
            theme: "l-bg-green-dark-modified",
        },
        // {
        //     id: 2,
        //     title: "B.E.D Scale",
        //     link: "/portal/bed-scale/general-info/add",
        //     icon: faPauseCircle,
        //     theme: "l-bg-purple",
        // },
        // {
        //     id: 3,
        //     title: "Upper Grade",
        //     link: "/portal/upper-grade/general-info/add",
        //     icon: faPauseCircle,
        //     theme: "l-bg-card1",
        // },
        // {
        //     id: 4,
        //     title: "Transfer",
        //     link: "/portal/general-info/add",
        //     icon: faPauseCircle,
        //     theme: "l-bg-green-dark",
        // },
        // {
        //     id: 5,
        //     title: "Correction",
        //     link: "/portal/correction",
        //     icon: faPauseCircle,
        //     theme: "l-bg-purple",
        // },
        // {
        //     id: 6,
        //     title: "Arrear",
        //     link: "/portal/general-info/add",
        //     icon: faPauseCircle,
        //     theme: "l-bg-card1",
        // },
        // {
        //     id: 7,
        //     title: "Attrition",
        //     link: "/portal/general-info/add",
        //     icon: faPauseCircle,
        //     theme: "l-bg-green-dark",
        // },
        // {
        //     id: 8,
        //     title: "Release",
        //     link: "/portal/release/general-info/add",
        //     icon: faPauseCircle,
        //     theme: "l-bg-purple",
        // },
        // {
        //     id: 9,
        //     title: "Retirement",
        //     link: "/portal/retirement/list",
        //     icon: faPauseCircle,
        //     theme: "l-bg-card1",
        // },
    ];

    return (
        <>
            <DefaultCard className="mb-50" {...surveyCardProps}>
                {/* <div className="row align-items-center pr-15">
                     {DashBoardChart.map((item, index) => {
                        return (
                            <div
                                key={index}
                                className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12 pr-0"
                            >
                                <DashboardWidget
                                    title={item.title}
                                    link={item.link}
                                    icon={item.icon}
                                    theme={item.theme}
                                />
                            </div>
                        );
                    })} 
                </div> */}

                <div className=" details-page">
                    <div className="row">
                        <div className="col-lg-6">
                            <Table className="table table-responsive table-striped table-hover mb-15">
                                <tbody>
                                    <tr>
                                        <td className="border-0 td-width">
                                            <b>আবেদনকারীর নাম</b>
                                        </td>
                                        <td className="border-0">
                                            {applicantName ?? "N/A"}
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                        <div className="col-lg-6">
                            <Table className="table table-responsive table-striped table-hover mb-15">
                                <tbody>
                                    <tr>
                                        <td className="border-0 td-width">
                                            <b>বাবার নাম</b>
                                        </td>
                                        <td className="border-0">
                                            {fatherName ?? "N/A"}
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                        <div className="col-lg-6">
                            <Table className="table table-responsive table-striped table-hover mb-15">
                                <tbody>
                                    <tr>
                                        <td className="border-0 td-width">
                                            <b>পদবির নাম</b>
                                        </td>
                                        <td className="border-0">
                                            {designationName ?? "N/A"}
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                        <div className="col-lg-6">
                            <Table className="table table-responsive table-striped table-hover mb-15">
                                <tbody>
                                    <tr>
                                        <td className="border-0 td-width">
                                            <b>পদবির কোড</b>
                                        </td>
                                        <td className="border-0">
                                            {designationCode ?? "N/A"}
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                        <div className="col-lg-6">
                            <Table className="table table-responsive table-striped table-hover mb-15">
                                <tbody>
                                    <tr>
                                        <td className="border-0 td-width">
                                            <b>বিষয়ের নাম</b>
                                        </td>
                                        <td className="border-0">
                                            {subjectName ?? "N/A"}
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                        <div className="col-lg-6">
                            <Table className="table table-responsive table-striped table-hover mb-15">
                                <tbody>
                                    <tr>
                                        <td className="border-0 td-width">
                                            <b>বিষয়ের কোড</b>
                                        </td>
                                        <td className="border-0">
                                            {subjectCode ?? "N/A"}
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                        <div className="col-lg-6">
                            <Table className="table table-responsive table-striped table-hover mb-15">
                                <tbody>
                                    <tr>
                                        <td className="border-0 td-width">
                                            <b> লিঙ্গ</b>
                                        </td>
                                        <td className="border-0">
                                            {gender ?? "N/A"}
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                        <div className="col-lg-6">
                            <Table className="table table-responsive table-striped table-hover mb-15">
                                <tbody>
                                    <tr>
                                        <td className="border-0 td-width">
                                            <b> জন্ম তারিখ</b>
                                        </td>
                                        <td className="border-0">
                                            {moment
                                                .utc(dob)
                                                .format("DD/MM/yyyy") || "N/A"}
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>

                        <div className="col-lg-6">
                            <Table className="table table-responsive table-striped table-hover mb-15">
                                <tbody>
                                    <tr>
                                        <td className="border-0 td-width">
                                            <b>ধর্ম</b>
                                        </td>
                                        <td className="border-0">
                                            {religion ?? "N/A"}
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>

                        <div className="col-lg-6">
                            <Table className="table table-responsive table-striped table-hover mb-15">
                                <tbody>
                                    <tr>
                                        <td className="border-0 td-width">
                                            <b> মোবাইল নাম্বার</b>
                                        </td>
                                        <td className="border-0">
                                            {mobileNo ?? "N/A"}
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className="col-lg-12">
                        <div className="table-responsive">
                            <table className="table text-center">
                                <thead>
                                    <tr>
                                        <th>ব্যাচের নাম</th>
                                        <th>রোল নং</th>
                                        <th>মেধাক্রম</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {examDetails?.data &&
                                    examDetails?.data?.length > 0 ? (
                                        examDetails?.data.map((item, index) => (
                                            <tr key={index}>
                                                <td>
                                                    {item?.examNameBn ??
                                                        item?.examName ??
                                                        "N/A"}
                                                </td>
                                                <td>{item?.rollNo ?? "N/A"}</td>
                                                <td>
                                                    {item?.meritPosition ??
                                                        "N/A"}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={7}>
                                                <b>তথ্য পাওয়া যায়নি</b>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </DefaultCard>
        </>
    );
};

export default Dashboard;
