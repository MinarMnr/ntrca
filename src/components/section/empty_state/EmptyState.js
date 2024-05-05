import React from "react";
import "./EmptyState.scss";

const EmptyState = ({ loading, title, subtitle }) => {
  return (
    <>
      <div className="row">
        <div className="col-md-12 p-5">
          <div className="empty-state">
            {loading ? (
              <>
                {/* <h3>Loading</h3> */}
                <p>Please wait we are fetching data.</p>
              </>
            ) : (
              <>
                {/* <h3>Collaborators will appear here</h3>
                <p>
                  People you invite as collaborators have code & deploy access
                  to this app.
                </p> */}
                <p>Please wait we are fetching data.</p>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default EmptyState;
