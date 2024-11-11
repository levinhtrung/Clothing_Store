import React from "react";
import { Modal } from "react-bootstrap";
import { Form, Input } from "antd";
import { Button } from "react-bootstrap";
import { Upload } from "antd";
import { GrAdd } from "react-icons/gr";
import { UploadOutlined } from "@ant-design/icons";

const ModelBodyUserComponent = ({
  stateUser,
  form,
  handleOnchange,
  handleOnchangeAvatar,
  onFinish,
  // isLoading,
  title,
}) => {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onFinish();
    }
  };
  return (
    <>
      {/* <LoadingFullComponents isLoading={isLoading} /> */}
      <Modal.Body onKeyDown={handleKeyDown}>
        <Form
          name="basic"
          // labelCol={{
          //   span: 8,
          // }}
          // wrapperCol={{
          //   span: 16,
          // }}
          // style={{
          //   maxWidth: 600,
          // }}
          autoComplete="on"
          form={form}
        >
          <Form.Item
            label="Avatar"
            name="upload"
            valuePropName="fileList"
            rules={[
              {
                required: true,
                message: stateUser?.avatar ? "" : "Please input your image!",
              },
            ]}
            style={{ lineHeight: "80px" }}
          >
            <Upload
              name="avatar"
              onChange={handleOnchangeAvatar}
              maxCount={1}
              // style={{position:'relative', marginBottom:'20px'}}
            >
              <Button
                icon={<UploadOutlined />}
                style={{
                  margin: "0 10px",
                  backgroundColor: "transparent",
                  borderColor: "#000",
                  position: "absolute",
                  top: "0px",
                  left: "0px",
                  width: "80px",
                  height: "80px",
                }}
              >
                <GrAdd />
              </Button>
            </Upload>
            {stateUser?.avatar && (
              <Upload
                name="avatar"
                onChange={handleOnchangeAvatar}
                maxCount={1}
              >
                <Button
                  icon={<UploadOutlined />}
                  style={{
                    margin: "0 10px",
                    backgroundColor: "transparent",
                    borderColor: "#000",
                    position: "absolute",
                    top: "0px",
                    left: "0px",
                    width: "80px",
                    height: "80px",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={stateUser?.avatar}
                    alt="avatar"
                    style={{
                      objectFit: "cover",
                      position: "absolute",
                      top: "0px",
                      left: "0px",
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </Button>
              </Upload>
            )}
          </Form.Item>

          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your name!",
              },
            ]}
            style={{ marginTop: "10px" }}
          >
            <Input
              value={stateUser.name}
              onChange={handleOnchange}
              name="name"
            />
          </Form.Item>
          {/* name, image, type, price, countInStock, rating, description */}
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input
              value={stateUser.email}
              onChange={handleOnchange}
              name="email"
            />
          </Form.Item>

          <Form.Item
            label="Admin"
            name="isAdmin"
            rules={[
              {
                required: true,
                message: "Please input your Admin!",
              },
            ]}
          >
            <Input
              value={stateUser.isAdmin}
              onChange={handleOnchange}
              name="isAdmin"
            />
          </Form.Item>

          <Form.Item
            label="Phone"
            name="phone"
            rules={[
              {
                required: true,
                message: "Please input your phone!",
              },
            ]}
          >
            <Input
              value={stateUser.phone}
              onChange={handleOnchange}
              name="phone"
            />
          </Form.Item>

          <Form.Item
            label="Address"
            name="address"
            rules={[
              {
                required: true,
                message: "Please input your address!",
              },
            ]}
          >
            <Input
              value={stateUser.address}
              onChange={handleOnchange}
              name="address"
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
          </Form.Item>
        </Form>
      </Modal.Body>
    </>
  );
};

export default ModelBodyUserComponent;
