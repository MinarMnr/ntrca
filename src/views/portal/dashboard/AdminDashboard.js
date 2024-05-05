import * as React from "react";
import { useState } from "react";
import DefaultCard from "../../../components/card/default/DefaultCard";
import {
    faFileArchive,
    faPauseCircle,
} from "@fortawesome/free-regular-svg-icons";

import {
    faBuilding,
    faBoxOpen,
    faBox,
    faInbox,
    faToolbox,
    faBoxes,
    faSchool,
    faUniversity,
    faUser,
    faUserCheck,
    faUserTimes,
} from "@fortawesome/free-solid-svg-icons";

import DashboardWidget from "../_partials/DashboardWidget";

import "./Dashboard.scss";
import { useDispatch, useSelector } from "react-redux";
import { callApi, selectApi } from "reducers/apiSlice";
import { useEffect } from "react";
import { UrlBuilder } from "helpers/UrlBuilder";

const Dashboard = (props) => {
    const dispatch = useDispatch();
    const { details = { data: {} }, applicant_count_details = { data: {} } } =
        useSelector(selectApi);

    const surveyCardProps = {
        title: "Overview",
    };

    const applicationCountProps = {
        title: "নির্বাচিত শিক্ষকদের সংখ্যা গণনা ",
    };

    useEffect(() => {
        dispatch(
            callApi({
                operationId: UrlBuilder.ntrcaApi(`admin/vacant-seats/13`),
                output: "details",
                storeName: "vacant-seats",
            })
        );

        dispatch(
            callApi({
                operationId: UrlBuilder.ntrcaApi(`admin/applicant-count`),
                output: "applicant_count_details",
                storeName: "applicant_count_details",
            })
        );
    }, [dispatch]);

    const Dashboard = [
        {
            id: 1,
            title: "মোট আবেদনকারী",
            icon: faUser,
            count: applicant_count_details?.data?.totalUnderReviewSelections,
            theme: "l-bg-blue-dark",
        },
        {
            id: 2,
            title: "নির্বাচিত আবেদনকারী",
            icon: faUserCheck,
            count: applicant_count_details?.data?.totalApprovedSelections,
            theme: "l-bg-blue-dark",
        },
        {
            id: 3,
            title: "আবেদনকারী নয়",
            icon: faUserTimes,
            count: applicant_count_details?.data?.totalNoneSelections,
            theme: "l-bg-blue-dark",
        },
    ];

    const DashBoardChart = [
        {
            id: 1,
            title: "মোট শূন্য পদ",
            icon: faBoxes,
            count: details?.data?.totalVacantSeats,
            theme: "l-bg-blue-dark",
        },
        {
            id: 2,
            title: "শূন্য পদ (স্কুল/মাদ্রাসা)",
            icon: faSchool,
            count: details?.data?.vacantSeatsInSchool,
            theme: "l-bg-card1",
        },
        {
            id: 3,
            title: "শূন্য পদ (স্কুল-২/মাদ্রাসা/কারিগরি)",
            icon: faSchool,
            count: details?.data?.vacantSeatsInSchool_2,
            theme: "l-bg-blue-dark",
        },
        {
            id: 4,
            title: "শূন্য পদ (কলেজ/মাদ্রাসা/বিএম)",
            icon: faUniversity,
            count: details?.data?.vacantSeatsInCollege,
            theme: "l-bg-card1",
        },
    ];

    return (
        <>
            <DefaultCard className="mb-50" {...surveyCardProps}>
                <div className="row align-items-center pr-15">
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
                                    count={item.count}
                                    theme={item.theme}
                                />
                            </div>
                        );
                    })}
                </div>
            </DefaultCard>

            {/* <DefaultCard className="mb-50" {...applicationCountProps}>
                <div className="row align-items-center pr-15">
                    {Dashboard.map((item, index) => {
                        return (
                            <div
                                key={index}
                                className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12 pr-0"
                            >
                                <DashboardWidget
                                    title={item.title}
                                    link={item.link}
                                    icon={item.icon}
                                    count={item.count}
                                    theme={item.theme}
                                />
                            </div>
                        );
                    })}
                </div>
            </DefaultCard> */}
        </>
    );
};

export default Dashboard;
