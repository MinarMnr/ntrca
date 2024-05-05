import { useEffect } from "react";
import { getFieldErrorNames } from "./getFieldErrorNames";
import { useFormikContext } from "formik/dist/index";

export const ScrollToFieldError = ({
  scrollBehavior = { behavior: "smooth", block: "center" },
}) => {
  const formikContext = useFormikContext() ?? {};
  const { submitCount, isValid, errors } = formikContext;

  useEffect(() => {
    if (isValid) return;

    const fieldErrorNames = getFieldErrorNames(errors);
    if (fieldErrorNames.length <= 0) return;

    const element = document.querySelector(
      `input[name='${fieldErrorNames[0]}']`
    );
    if (!element) return;

    // Scroll to first known error into view
    element.scrollIntoView(scrollBehavior);

    // Formik doesn't (yet) provide a callback for a client-failed submission,
    // thus why this is implemented through a hook that listens to changes on
    // the submit count.
  }, [submitCount]);

  return null;
};
