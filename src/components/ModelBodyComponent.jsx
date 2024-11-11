import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { Form, Input, Upload } from "antd";
import { Button } from "react-bootstrap";
import { UploadOutlined } from "@ant-design/icons";
import { GrAdd } from "react-icons/gr";
import Select from "react-select";

const ModelBodyComponent = ({
  stateProduct,
  form,
  handleOnchange,
  handleChangeSelect,
  options,
  typeSelect,
  placeholder,
  handleOnchangeAvatarImg1,
  handleOnchangeAvatarImg2,
  handleOnchangeAvatarImg3,
  handleOnchangeAvatarImg4,
  onFinish,
  // isLoading,
  title,
}) => {

  const [sizeS, setSizeS] = useState(stateProduct?.quantity?.sizeS);
  const [sizeM, setSizeM] = useState(stateProduct?.quantity?.sizeM);
  const [sizeL, setSizeL] = useState(stateProduct?.quantity?.sizeL);
  const [sizeXL, setSizeXL] = useState(stateProduct?.quantity?.sizeXL);
  const [sizeXXL, setSizeXXL] = useState(stateProduct?.quantity?.sizeXXL);

  const handleOnchageQuantityS = (e) => {
    setSizeS(e.target.value);
    stateProduct.quantity.sizeS = e.target.value;
  };
  const handleOnchageQuantityM = (e) => {
    setSizeM(e.target.value);
    stateProduct.quantity.sizeM = e.target.value;
  };
  const handleOnchageQuantityL = (e) => {
    setSizeL(e.target.value);
    stateProduct.quantity.sizeL = e.target.value;
  };
  const handleOnchageQuantityXL = (e) => {
    setSizeXL(e.target.value);
    stateProduct.quantity.sizeXL = e.target.value;
  };
  const handleOnchageQuantityXXL = (e) => {
    setSizeXXL(e.target.value);
    stateProduct.quantity.sizeXXL = e.target.value;
  };

  useEffect(() => {
    if (sizeS && sizeS < 0) {
      setSizeS(0);
    } else if (sizeM && sizeM < 0) {
      setSizeM(0);
    } else if (sizeL && sizeL < 0) {
      setSizeL(0);
    } else if (sizeXL && sizeXL < 0) {
      setSizeXL(0);
    } else if (sizeXXL && sizeXXL < 0) {
      setSizeXXL(0);
    }
  }, [sizeS, sizeM, sizeL, sizeXL, sizeXXL]);

  // ------------

  const [size28, setSize28] = useState(stateProduct?.quantity?.size28);
  const [size29, setSize29] = useState(stateProduct?.quantity?.size29);
  const [size30, setSize30] = useState(stateProduct?.quantity?.size30);
  const [size31, setSize31] = useState(stateProduct?.quantity?.size31);
  const [size32, setSize32] = useState(stateProduct?.quantity?.size32);
  const [size33, setSize33] = useState(stateProduct?.quantity?.size33);
  const [size34, setSize34] = useState(stateProduct?.quantity?.size34);
  const [size35, setSize35] = useState(stateProduct?.quantity?.size35);
  const [size36, setSize36] = useState(stateProduct?.quantity?.size36);

  const handleOnchageQuantity28 = (e) => {
    setSize28(e.target.value);
    stateProduct.quantity.size28 = e.target.value;
  };
  const handleOnchageQuantity29 = (e) => {
    setSize29(e.target.value);
    stateProduct.quantity.size29 = e.target.value;
  };
  const handleOnchageQuantity30 = (e) => {
    setSize30(e.target.value);
    stateProduct.quantity.size30 = e.target.value;
  };
  const handleOnchageQuantity31 = (e) => {
    setSize31(e.target.value);
    stateProduct.quantity.size31 = e.target.value;
  };
  const handleOnchageQuantity32 = (e) => {
    setSize32(e.target.value);
    stateProduct.quantity.size32 = e.target.value;
  };
  const handleOnchageQuantity33 = (e) => {
    setSize33(e.target.value);
    stateProduct.quantity.size33 = e.target.value;
  };
  const handleOnchageQuantity34 = (e) => {
    setSize34(e.target.value);
    stateProduct.quantity.size34 = e.target.value;
  };
  const handleOnchageQuantity35 = (e) => {
    setSize35(e.target.value);
    stateProduct.quantity.size35 = e.target.value;
  };
  const handleOnchageQuantity36 = (e) => {
    setSize36(e.target.value);
    stateProduct.quantity.size36 = e.target.value;
  };

  useEffect(() => {
    if (size28 && size28 < 0) {
      setSize28(0);
    } else if (size29 && size29 < 0) {
      setSize29(0);
    } else if (size30 && size30 < 0) {
      setSize30(0);
    } else if (size31 && size31 < 0) {
      setSize31(0);
    } else if (size32 && size32 < 0) {
      setSize32(0);
    } else if (size33 && size33 < 0) {
      setSize33(0);
    } else if (size34 && size34 < 0) {
      setSize34(0);
    } else if (size35 && size35 < 0) {
      setSize35(0);
    } else if (size36 && size36 < 0) {
      setSize36(0);
    }
  }, [size28, size29, size30, size31, size32, size33, size34, size35, size36]);

  return (
    <>
      {/* <LoadingFullComponents isLoading={isLoading} /> */}
      <Modal.Body>
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
          //   onFinish={onFinish}
          // //   onFinishFailed={onFinishFailed}
          autoComplete="on"
          form={form}
        >
          <div
            className="update-image-mobile"
            style={{ display: "flex", justifyContent: "start" }}
          >
            <Form.Item
              label="Image"
              name="upload"
              valuePropName="fileList"
              rules={[
                {
                  required: true,
                  message: stateProduct?.image
                    ? ""
                    : "Please input your image!",
                },
              ]}
              style={{ lineHeight: "80px" }}
            >
              <Upload
                name="image"
                onChange={handleOnchangeAvatarImg1}
                maxCount={4}
                multiple
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
              {stateProduct?.image && (
                <Upload
                  name="image"
                  onChange={handleOnchangeAvatarImg1}
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
                      src={stateProduct?.image}
                      alt="image"
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
              // label="Image"
              name="upload"
              valuePropName="fileList"
              rules={[
                {
                  required: true,
                  message: stateProduct?.imageDetails?.image1
                    ? ""
                    : "Please input your image details 1!",
                },
              ]}
              style={{ lineHeight: "80px", width: "100px" }}
            >
              <Upload
                name="image"
                onChange={handleOnchangeAvatarImg2}
                maxCount={4}
                multiple
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
              {stateProduct?.imageDetails?.image1 && (
                <Upload
                  name="image"
                  onChange={handleOnchangeAvatarImg2}
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
                      src={stateProduct?.imageDetails?.image1}
                      alt="image"
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
              // label="Image"
              name="upload"
              valuePropName="fileList"
              rules={[
                {
                  required: true,
                  message: stateProduct?.imageDetails?.image2
                    ? ""
                    : "Please input your image details 2!",
                },
              ]}
              style={{ lineHeight: "80px", width: "100px" }}
            >
              <Upload
                name="image"
                onChange={handleOnchangeAvatarImg3}
                maxCount={4}
                multiple
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
              {stateProduct?.imageDetails?.image2 && (
                <Upload
                  name="image"
                  onChange={handleOnchangeAvatarImg3}
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
                      src={stateProduct?.imageDetails?.image2}
                      alt="image"
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
              // label="Image"
              name="upload"
              valuePropName="fileList"
              rules={[
                {
                  required: true,
                  message: stateProduct?.imageDetails?.image3
                    ? ""
                    : "Please input your image details 3!",
                },
              ]}
              style={{ lineHeight: "80px", width: "100px" }}
            >
              <Upload
                name="image"
                onChange={handleOnchangeAvatarImg4}
                maxCount={4}
                multiple
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
              {stateProduct?.imageDetails?.image3 && (
                <Upload
                  name="image"
                  onChange={handleOnchangeAvatarImg4}
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
                      src={stateProduct?.imageDetails?.image3}
                      alt="image"
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
          </div>
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
              value={stateProduct.name}
              onChange={handleOnchange}
              name="name"
            />
          </Form.Item>
          {/* name, image, type, price, countInStock, rating, description */}
          <Form.Item
            label="Gender"
            name="gender"
            rules={[
              {
                required: true,
                message: "Please input your size gender!",
              },
            ]}
          >
            <Input
              value={stateProduct.gender}
              onChange={handleOnchange}
              name="gender"
            />
          </Form.Item>
          <Form.Item
            label="Price"
            name="price"
            rules={[
              {
                required: true,
                message: "Please input your price!",
              },
            ]}
          >
            <Input
              value={stateProduct.price}
              onChange={handleOnchange}
              name="price"
            />
          </Form.Item>
          <Form.Item
            label="Age"
            name="age"
            rules={[
              {
                required: true,
                message: "Please input your age!",
              },
            ]}
          >
            <Input
              value={stateProduct.age}
              onChange={handleOnchange}
              name="age"
            />
          </Form.Item>
          {stateProduct.name.toLowerCase().includes("quần") &&
          !stateProduct.name.toLowerCase().includes("áo") ? (
            <Form.Item label="Quantity">
              <div style={{ display: "flex" }}>
                <Form.Item>
                  <div className="setSize">
                    <span>28:</span>
                    <Input
                      className="inputSize"
                      value={size28}
                      onChange={handleOnchageQuantity28}
                      // name="size28"
                      type="number"
                      min="0"
                    />
                  </div>
                </Form.Item>
                <Form.Item>
                  <div className="setSize">
                    <span>29:</span>
                    <Input
                      className="inputSize"
                      value={size29}
                      onChange={handleOnchageQuantity29}
                      // name="size29"
                      type="number"
                      min="0"
                    />
                  </div>
                </Form.Item>
                <Form.Item>
                  <div className="setSize">
                    <span>30:</span>
                    <Input
                      className="inputSize"
                      value={size30}
                      onChange={handleOnchageQuantity30}
                      // name="size30"
                      type="number"
                      min="0"
                    />
                  </div>
                </Form.Item>
                <Form.Item>
                  <div className="setSize">
                    <span>31:</span>
                    <Input
                      className="inputSize"
                      value={size31}
                      onChange={handleOnchageQuantity31}
                      // name="size31"
                      type="number"
                      min="0"
                    />
                  </div>
                </Form.Item>
              </div>
              <div style={{ display: "flex" }} className="sizeDuoi">
                <Form.Item>
                  <div className="setSize">
                    <span>32:</span>
                    <Input
                      className="inputSize"
                      value={size32}
                      onChange={handleOnchageQuantity32}
                      // name="size32"
                      type="number"
                      min="0"
                    />
                  </div>
                </Form.Item>
                <Form.Item>
                  <div className="setSize">
                    <span>33:</span>
                    <Input
                      className="inputSize"
                      value={size33}
                      onChange={handleOnchageQuantity33}
                      // name="size33"
                      type="number"
                      min="0"
                    />
                  </div>
                </Form.Item>
                <Form.Item>
                  <div className="setSize">
                    <span>34:</span>
                    <Input
                      className="inputSize"
                      value={size34}
                      onChange={handleOnchageQuantity34}
                      // name="size34"
                      type="number"
                      min="0"
                    />
                  </div>
                </Form.Item>
                <Form.Item>
                  <div className="setSize">
                    <span>35:</span>
                    <Input
                      className="inputSize"
                      value={size35}
                      onChange={handleOnchageQuantity35}
                      // name="size35"
                      type="number"
                      min="0"
                    />
                  </div>
                </Form.Item>
                <Form.Item>
                  <div className="setSize">
                    <span>36:</span>
                    <Input
                      className="inputSize"
                      value={size36}
                      onChange={handleOnchageQuantity36}
                      // name="size36"
                      type="number"
                      min="0"
                    />
                  </div>
                </Form.Item>
              </div>
            </Form.Item>
          ) : (
            <Form.Item label="Quantity">
              <div style={{ display: "flex" }} className="sizeDuoi">
                <Form.Item>
                  <div className="setSize">
                    <span>S:</span>
                    <Input
                      className="inputSize"
                      value={sizeS}
                      onChange={handleOnchageQuantityS}
                      // name="sizeS"
                      type="number"
                      min="0"
                    />
                  </div>
                </Form.Item>
                <Form.Item>
                  <div className="setSize">
                    <span>M:</span>
                    <Input
                      className="inputSize"
                      value={sizeM}
                      onChange={handleOnchageQuantityM}
                      // name="sizeM"
                      type="number"
                      min="0"
                    />
                  </div>
                </Form.Item>
                <Form.Item>
                  <div className="setSize">
                    <span>L:</span>
                    <Input
                      className="inputSize"
                      value={sizeL}
                      onChange={handleOnchageQuantityL}
                      // name="sizeL"
                      type="number"
                      min="0"
                    />
                  </div>
                </Form.Item>
                <Form.Item>
                  <div className="setSize">
                    <span>XL:</span>
                    <Input
                      className="inputSize"
                      value={sizeXL}
                      onChange={handleOnchageQuantityXL}
                      // name="sizeXL"
                      type="number"
                      min="0"
                    />
                  </div>
                </Form.Item>
                <Form.Item>
                  <div className="setSize">
                    <span>XXL:</span>
                    <Input
                      className="inputSize"
                      value={sizeXXL}
                      onChange={handleOnchageQuantityXXL}
                      // name="sizeXXL"
                      type="number"
                      min="0"
                    />
                  </div>
                </Form.Item>
              </div>
            </Form.Item>
          )}

          <Form.Item
            label="Size"
            name="size"
            rules={[
              {
                required: true,
                message: "Please input your size!",
              },
            ]}
          >
            <Input
              value={stateProduct.size}
              onChange={handleOnchange}
              name="size"
            />
          </Form.Item>

          <Form.Item
            label="Type"
            name="type"
            rules={[
              {
                required: true,
                message: stateProduct?.type ? "" : "Please input your type!",
              },
            ]}
          >
            <div className="App">
              <Select
                name="type"
                placeholder={placeholder || ""}
                // defaultValue={stateProduct.type}
                onChange={handleChangeSelect}
                options={options}
              />
              {typeSelect === "add_type" && (
                <Input
                  value={stateProduct.type}
                  onChange={handleOnchange}
                  placeholder="Nhập type bạn muốn thêm"
                  name="type"
                />
              )}
            </div>
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

export default ModelBodyComponent;
