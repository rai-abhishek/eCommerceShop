import React from "react";
import Alert from "react-bootstrap/Alert";

export const Message = ({ variant, children }) => {
  Message.defaultProps = {
    variant: "info",
  };
  return <Alert variant={variant}>{children}</Alert>;
};
