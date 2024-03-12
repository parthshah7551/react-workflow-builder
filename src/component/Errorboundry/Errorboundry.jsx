import React, { useState } from "react";
import PropTypes from "prop-types";

function ErrorBoundary({ children }) {
  const [hasError, setHasError] = useState(false);

  const handleOnError = () => {
    setHasError(true);
  };

  if (hasError) {
    return <div>Something went wrong.</div>;
  }

  // eslint-disable-next-line react/no-unknown-property
  return <div onError={handleOnError}>{children}</div>;
}
ErrorBoundary.propTypes = {
  children: PropTypes.func,
};

export default ErrorBoundary;
