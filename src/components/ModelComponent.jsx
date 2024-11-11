import React from "react";
import { Modal } from "antd";

const ModelComponent = ({
  title = "model",
  isModalOpen = false,
  children,
  ...rest
}) => {
  return (
    <Modal
      style={{ position: "relative" }}
      title={title}
      open={isModalOpen}
      {...rest}
    >
      {children}
    </Modal>
  );
};

export default ModelComponent;
