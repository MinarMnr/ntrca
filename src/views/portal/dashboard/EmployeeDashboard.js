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
    faBoxes
      } from "@fortawesome/free-solid-svg-icons";
import DashboardWidget from "../_partials/DashboardWidget";

import "./Dashboard.scss";

const Dashboard = (props) => {
    const surveyCardProps = {
        title: "Overview",
    };

    const DashBoardChart = [
        {
            id: 1,
            title: "Joining",
            link: "/portal/application/joining",
            icon: faToolbox,
            theme: "l-bg-green-dark",
        },
        // {
        //     id: 1,
        //     title: "MPO Application",
        //     link: "/portal/general-info/add",
        //     icon: faPauseCircle,
        //     theme: "l-bg-green-dark",
        // },
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
        //     link: "/portal/general-info/add",
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
