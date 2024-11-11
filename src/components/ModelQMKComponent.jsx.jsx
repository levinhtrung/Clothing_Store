import React, { useEffect } from "react";
import { Modal } from "react-bootstrap";
import { Form, Input } from "antd";
import { Button } from "react-bootstrap";
import { useMutationHook } from "../hooks/useMutationHook";
import * as OTPServices from "../services/OTPServices";
import { success, error, warning } from "../components/Message";
import LoadingFullComponents from "./LoadingFullComponents";

const ModelQMKComponent = ({
  stateUser,
  form,
  handleOnchange,
  onFinish,
  title,
  dataUpdate,
}) => {
  const mutationOTP = useMutationHook((email) =>
    OTPServices.createrOTPPassword(email)
  );
  const {
    data: dataOTP,
    isLoading: isLoadingOTP,
    isSuccess: isSuccessOTP,
    isError: isErrorOTP,
  } = mutationOTP;
  const mutationDeleteOTP = useMutationHook((email) =>
    OTPServices.deleteOTP(email)
  );
  const handleCreateOTP = (e) => {
    e.preventDefault();
    mutationOTP.mutate({
      email: stateUser?.email,
    });
  };

  const handleDeleteOTP = () => {
    mutationDeleteOTP.mutate({
      email: stateUser?.email,
    });
  };
  useEffect(() => {
    if (isSuccessOTP && dataOTP?.status !== "ERR") {
      success("Đã gửi mã OTP thành công cho email của bạn");
      setTimeout(() => {
        handleDeleteOTP();
      }, 300000);
    } else if (isErrorOTP) {
      error("Đã gửi mã OTP thất bại cho email của bạn");
    }
  }, [isSuccessOTP, isErrorOTP]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onFinish();
    }
  };

  return (
    <>
      <LoadingFullComponents isLoading={isLoadingOTP} />
      <Modal.Body onKeyDown={handleKeyDown}>
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          autoComplete="on"
          form={form}
        >
          <Form.Item label="Email" style={{ marginTop: "10px" }}>
            <Input
              value={stateUser?.email}
              onChange={handleOnchange}
              name="email"
            />
            {dataOTP?.status === "ERR" && (
              <p style={{ color: "red", margin: "10px 0 0 0", fontSize: 14 }}>
                {dataOTP?.message}
              </p>
            )}
          </Form.Item>

          <Form.Item label="Mã OTP" style={{ position: "relative" }}>
            <Input
              value={stateUser?.otp}
              onChange={handleOnchange}
              name="otp"
            />
            <button
              style={{
                position: "absolute",
                right: 0,
                backgroundColor: "#000",
                color: "#fff",
                height: "100%",
              }}
              onClick={handleCreateOTP}
            >
              Gửi OTP
            </button>
          </Form.Item>
          <Form.Item label="Password">
            <Input
              value={stateUser?.password}
              onChange={handleOnchange}
              name="password"
              type="password"
            />
          </Form.Item>
          <Form.Item label="Confirm Password">
            <Input
              value={stateUser?.confirmPassword}
              onChange={handleOnchange}
              name="confirmPassword"
              type="password"
            />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button
              onClick={onFinish}
              type="submit"
              className="submit_btn"
              style={{
                padding: "10px 24px",
                float: "right",
                backgroundColor: "#000",
                color: "#fff",
                border: "none",
                fontSize: "14px",
              }}
            >
              {title}
            </Button>
            {dataUpdate?.status === "ERR" && (
              <p style={{ color: "red" }}>{dataUpdate?.message}</p>
            )}
          </Form.Item>
        </Form>
      </Modal.Body>
    </>
  );
};

export default ModelQMKComponent;
