import * as React from "react";
import AdminDashboard from "./AdminDashboard";
import ReviewerDashboard from "./ReviewerDashboard";
import ApplicantDashboard from "./ApplicantDashboard";
import EmployeeDashboard from "./EmployeeDashboard";
import InstituteDashboard from "./IntituteDashboard";
import "./Dashboard.scss";
import UserRole from "../../../constants/UserRole";
import { AuthUser } from "../../../helpers/AuthUser";

const Dashboard = (props) => {
    let roles = AuthUser.getRoles();

    if (roles.includes(UserRole.ADMIN)) {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <AdminDashboard />
                    </div>
                    <div className="col-md-12">
                        {/* <ReviewerDashboard/> */}
                    </div>
                    {/* <div className="col-md-8">
                    <RegistrationsOverviewall/>
                </div> */}
                </div>
            </div>
        );
    } else if (
        roles.includes(UserRole.BANBEIS_Programmer) ||
        roles.includes(UserRole.INSTITUTE_HEAD) ||
        roles.includes(UserRole.REVIEWER) ||
        roles.includes(UserRole.USEO) ||
        roles.includes(UserRole.DEO) ||
        roles.includes(UserRole.BANBEIS_SA) ||
        roles.includes(UserRole.BANBEIS_DG)
    ) {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <ReviewerDashboard />
                    </div>
                </div>
            </div>
        );
    } else if (roles.includes(UserRole.APPLICANT)) {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <ApplicantDashboard />
                    </div>
                </div>
            </div>
        );
    } else if (roles.includes(UserRole.OFFICE_EMPLOYEE)) {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <EmployeeDashboard />
                    </div>
                </div>
            </div>
        );
    } else if (roles.includes(UserRole.INSTITUTE_ADMIN)) {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <InstituteDashboard />
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <ApplicantDashboard />
                    </div>
                </div>
            </div>
        );
    }
};

export default Dashboard;
