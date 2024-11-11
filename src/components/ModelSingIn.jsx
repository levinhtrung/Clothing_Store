import { Modal } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ModelSingIn = () => {
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleOk = () => {
    navigate("/sign-in");
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Modal
        title="Thông báo"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>
          Để đảm bảo an toàn cho tài khoản của bạn, tài khoản của bạn đã đăng
          xuất sau khi đã hết thời gian (30 ngày).
        </p>
        <p>Bạn có muốn đăng nhập lại không?</p>
      </Modal>
    </>
  );
};

export default ModelSingIn;
