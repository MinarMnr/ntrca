import React, { useState } from "react";
import { Step, Stepper } from "react-form-stepper";

import { Link } from "react-router-dom";

const CommonStepper = ({ dhorlam }) => {
  const [active, setActive] = useState(0);
  return (
    <div>
      <Stepper activeStep={active} nonLinear={true}>
        {dhorlam.map((voda, index) => {
          return (
            <Step label={voda?.title}>
              <Link
                to={voda.link}
                // style={{ pointerEvents: menu.id == 1 ? "" : "none" }}
              >
                <span className="d-block w-100 btn btn-primary btn-outline-white fw-bold">
                  {voda.link}
                </span>
              </Link>
            </Step>
          );
        })}
      </Stepper>

      {/* <div className="col-10">
        <Switch>
          {dhorlam?.map((dhorlamItem, dhorlamindex) => {
            return (
              <Route
                path={dhorlamItem.link}
                name={dhorlamItem.title}
                key={dhorlamindex}
                exact={true}
                render={(props) => (
                  <dhorlamItem.component {...props}></dhorlamItem.component>
                )}
              />
            );
          })}
        </Switch>
      </div> */}
    </div>
  );
};

export default CommonStepper;
