import { faList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card } from "@themesberg/react-bootstrap/lib/esm/index";
import { Link } from "react-router-dom";
import { DefaultCard } from "../../../../components/card";
import "../../detailsPage.scss";

const DesiWiseSubjectShow = () => {
    const cardProps = {
        title: "Designation Wise Subject Details",
        headerSlot: () => (
            <>
                <Link to="/portal/settings/designation-wise-subject/list">
                    <Button
                        variant="link"
                        className="f-right btn-sm p-5 btn-color"
                    >
                        <FontAwesomeIcon icon={faList} className="me-2" />
                        Designation Wise Subject List
                    </Button>
                </Link>
            </>
        ),
    };

    return (
        <>
            <DefaultCard className="mb-50" {...cardProps}>
                <Card border="white" className="table-wrapper table-responsive">
                    <Card.Body>
                        <div className="p-3">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="row details">
                                        <div className="col-md-6">
                                            <p>
                                                <span>Designation Wise Subject Name:</span>

                                                <span>XYZ</span>
                                            </p>
                                        </div>

                                        <div className="col-md-6">
                                            <p>
                                                <span>Code:</span>

                                                <span>12545</span>
                                            </p>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            </DefaultCard>
        </>
    );
};

export default DesiWiseSubjectShow;
