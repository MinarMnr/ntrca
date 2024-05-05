import { Button, Card } from "@themesberg/react-bootstrap/lib/esm/index";
import { Link } from "react-router-dom";
import { DefaultCard } from "../../../../components/card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";
import "../../detailsPage.scss";

const PayCodeShow = () => {
    const cardProps = {
        title: "Resolution Details",
        headerSlot: () => (
            <>
                <Link to="/portal/settings/resolution">
                    <Button
                        variant="link"
                        className="f-right btn-sm p-5 btn-color"
                    >
                        <FontAwesomeIcon icon={faList} className="me-2" />
                        Resolution List
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
                                                <span>Resolution Name:</span>

                                                <span>XYZ</span>
                                            </p>
                                        </div>

                                        <div className="col-md-6">
                                            <p>
                                                <span>Date:</span>

                                                <span>01/01/2022</span>
                                            </p>
                                        </div>

                                        <div className="col-md-6">
                                            <p>
                                                <span>Meeting No:</span>

                                                <span>395678</span>
                                            </p>
                                        </div>
                                        <div className="col-md-6">
                                            <p>
                                                <span>Meeting Details:</span>

                                                <span>hello one two three</span>
                                            </p>
                                        </div>

                                        <div className="col-md-6">
                                            <p>
                                                <span>Attachment:</span>

                                                <span>Download</span>
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

export default PayCodeShow;
