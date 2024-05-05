import { Step, Stepper } from "react-form-stepper";
import "./customStepper.scss";

const CustomStepper = ({ data }) => {
  return (
    <>
      <div className="col-md-12">
        <Stepper>
          {data &&
            data.length > 0 &&
            data.map((item) => {
              return (
                <Step
                  key={item.label}
                  label={item.label}
                  className={
                    item.status === true ? "activeStep" : "inActiveStep"
                  }
                />
              );
            })}
        </Stepper>
      </div>
    </>
  );
};

export default CustomStepper;
