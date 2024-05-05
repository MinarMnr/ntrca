import {
  faDownload, faEye,
  faPencilAlt, faTrashAlt
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Button } from "@themesberg/react-bootstrap";

const CrudAction = (props) => {
  const {
    onShowClick,
    onEditClick,
    onDeleteClick,
    onDownloadClick,
    onSendBackClick,
  } = props;
  return (
    <>
      {onShowClick !== undefined && (
        <Button
          style={{ cursor: "hover" }}
          variant="primary"
          className="f-left btn btn-sm mr-5 mb-5"
          type="button"
          onClick={onShowClick}
          title="View"
        >
          <FontAwesomeIcon icon={faEye} />
        </Button>
      )}
      {onEditClick !== undefined && (
        <Button
          style={{ cursor: "hover" }}
          variant="success"
          className="f-left btn btn-sm mr-5 mb-5"
          type="button"
          onClick={onEditClick}
          title="Edit"
        >
          <FontAwesomeIcon icon={faPencilAlt} />
        </Button>
      )}
      {onDeleteClick !== undefined && (
        <Button
          style={{ cursor: "hover" }}
          variant="danger"
          className="f-left btn btn-sm mb-5"
          type="button"
          onClick={onDeleteClick}
          title="Delete"
        >
          <FontAwesomeIcon icon={faTrashAlt} />
        </Button>
      )}
      {onDownloadClick !== undefined && (
        <Button
          style={{ cursor: "hover" }}
          variant="primary"
          className="f-left btn btn-sm mb-5"
          type="button"
          onClick={onDownloadClick}
          title="Download"
        >
          <FontAwesomeIcon icon={faDownload} />
        </Button>
      )}
    </>
  );
};
export default CrudAction;
