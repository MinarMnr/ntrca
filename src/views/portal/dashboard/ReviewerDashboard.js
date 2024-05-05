import * as React from "react";
import { useState } from "react";
import DefaultCard from "../../../components/card/default/DefaultCard";
import {
    faFileArchive,
    faPauseCircle,
} from "@fortawesome/free-regular-svg-icons";
import DashboardWidget from "../_partials/DashboardWidget";

import "./Dashboard.scss";
import { AuthUser } from "../../../helpers/AuthUser";
import UserRole from "../../../constants/UserRole";
import { UrlBuilder } from "helpers/UrlBuilder";
import { callApi, selectApi } from "reducers/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import { faBoxOpen } from "@fortawesome/free-solid-svg-icons";

const Dashboard = (props) => {
    const dispatch = useDispatch();
    const { details = { data: {} } } = useSelector(selectApi);
    const surveyCardProps = {
        title: "Overview",
    };

    let roles = AuthUser.getRoles();

    React.useEffect(() => {
        dispatch(
            callApi({
                operationId: UrlBuilder.ntrcaApi(`requisition-reviewer/e-requisition-count`),
                output: "details",
                storeName: "vacant-seats",
            })
        );
    }, [dispatch]);

    const DashBoardChart = [
        {
            id: 1,
            title: "রিভিউ যোগ্য রিকুইজিশন সংখ্যা",
            link: "/portal/general-info/add",
            icon: faBoxOpen,
            count: details?.data?.requisitionsToReview,
            theme: "l-bg-blue-dark",
        },
        {
            id: 2,
            title: "অনুমোদিত রিকুইজিশন সংখ্যা ",
            link: "/portal/bed-scale/general-info/add",
            icon: faBoxOpen,
            count: details?.data?.requisitionsApproved,
            theme: "l-bg-card1",
        },
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
        </>
    );
};

export default Dashboard;
