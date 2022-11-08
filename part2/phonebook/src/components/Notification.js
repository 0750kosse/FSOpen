import React from "react";

export const Notification = ({ message, success }) => {
  if (message === null) return null;
  else if (success) {
    return <div className="success">{message}</div>;
  }
  return <div className="error">{message}</div>;
};
