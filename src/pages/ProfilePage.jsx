import React, { useEffect } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import { useDispatch, useSelector } from "react-redux";
import * as UserServcie from "../services/userServices";
import { useMutationHook } from "../hooks/useMutationHook";
import { success, error, warning } from "../components/Message";
import { updateUser } from "../redux/slices/userSlice";
import { getBase64, renderOptionsAddress } from "../utils";
import { Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { GrAdd } from "react-icons/gr";
import { Toaster } from "react-hot-toast";
import LoadingFullComponents from "../components/LoadingFullComponents";
import { Select } from "antd";
import tinh from "../address/tinh_tp.json";
import quan_huyen from "../address/quan_huyen.json";
import xa_phuong from "../address/xa_phuong.json";

const ProfilePage = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [avatar, setAvatar] = useState("");

  const mutation = useMutationHook((data) => {
    const { id, access_token, ...rest } = data;
    const res = UserServcie.updateUser(id, rest, access_token);
    return res;
  });
  const { data, isLoading, isSuccess, isError, variables } = mutation;

  useEffect(() => {
    if (isSuccess && data?.status !== "ERR") {
      success("Bạn đã cập nhật thông tin thành công");
      setIsPhoneNumber(true);
      handleGetDetailsUser(user?.id, user?.access_token);
    } else if (isError) {
      error("Bạn đã cập nhật thông tin thất bại");
    }
  }, [isSuccess, isError]);

  const handleGetDetailsUser = async (id, token) => {
    const storage = localStorage.getItem("refresh_token");
    const refreshToken = JSON.parse(storage);
    const res = await UserServcie.getDetailsUser(id, token);
    dispatch(
      updateUser({
        ...res?.data,
        name: variables?.name,
        email: variables?.email,
        phone: variables?.phone,
        avatar: variables?.avatar,
        address: address,
        access_token: token,
        refreshToken,
      })
    );
  };

  useEffect(() => {
    setName(user?.name);
    setEmail(user?.email);
    setPhone(user?.phone);
    setAddress(user?.address);
    setAvatar(user?.avatar);
  }, [user]);

  const handleOnchangeName = (e) => {
    setName(e.target.value);
  };

  const handleOnchangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleOnchangePhone = (e) => {
    setPhone(e.target.value);
    setIsPhoneNumber(true);
  };

  const handleOnchangeAvatar = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setAvatar(file.preview);
  };
  console.log(avatar);

  const [isPhoneNumber, setIsPhoneNumber] = useState(true);
  const handleUpdate = (event) => {
    setIsPhoneNumber(phone?.match(/^[0-9]{10}$/));
    if ((isPhoneNumber && isPhoneNumber?.length === 1) || !phone) {
      mutation.mutate({
        id: user?.id,
        name,
        email,
        phone,
        address,
        avatar,
        access_token: user?.access_token,
      });
      console.log("updatee", user?.id, name, email, phone, address, avatar);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleUpdate();
    }
  };

  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    handleUpdate();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  const [tinhLabel, setTinhLabel] = useState(user?.address?.split(", ")[3]);
  const [huyenLabel, setHuyenLabel] = useState(user?.address?.split(", ")[2]);
  const [xaLabel, setXaLabel] = useState(user?.address?.split(", ")[1]);
  const [inputLabel, setInputLabel] = useState(user?.address?.split(", ")[0]);
  const [codeTinh, setCodeTinh] = useState("");
  const [codeHuyen, setCodeHuyen] = useState("");

  const handleOnchangeAddress = (e) => {
    setInputLabel(e.target.value);
  };

  // useEffect(() => {
  //   fetch("https://provinces.open-api.vn/api/?depth=3")
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .then((data) => {
  //       setTinhOptions(data);
  //       const codenameTinh = data.find((dt) => dt.name === tinhLabel);
  //       return codenameTinh;
  //     })
  //     .then((data) => {
  //       setHuyenOptions(data?.districts);
  //       const codenameHuyen = data?.districts.find(
  //         (dt) => dt.name === huyenLabel
  //       );
  //       return codenameHuyen;
  //     })
  //     .then((data) => {
  //       setXaOptions(data?.wards);
  //     });
  // }, [tinhLabel, huyenLabel, xaLabel]);

  const handleChangeSelectTinh = (code, e) => {
    setCodeTinh(code);
    if (e.label !== tinhLabel) {
      setTinhLabel(e.label);
      setHuyenLabel("");
      setXaLabel("");
    }
  };

  const handleChangeSelectHuyen = (code, e) => {
    setCodeHuyen(code);
    if (e.label !== huyenLabel) {
      setHuyenLabel(e.label);
      setXaLabel("");
    }
  };

  const handleChangeSelectXa = (code, e) => {
    setXaLabel(e.label);
  };

  const optionsTinh = renderOptionsAddress(tinh);
  const optionsHuyen = renderOptionsAddress(quan_huyen, codeTinh);
  const optionsXa = renderOptionsAddress(xa_phuong, codeHuyen);

  useEffect(() => {
    setAddress(
      inputLabel + ", " + xaLabel + ", " + huyenLabel + ", " + tinhLabel
    );
  }, [inputLabel, xaLabel, huyenLabel, tinhLabel]);

  return (
    <>
      <LoadingFullComponents isLoading={isLoading} />
      <div style={{ minHeight: "100vh" }} onKeyDown={handleKeyDown}>
        <Toaster />
        <h1
          style={{
            textTransform: "uppercase",
            margin: "30px 0 40px 0",
            textAlign: "center",
          }}
        >
          Thông tin người dùng
        </h1>

        <Form
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
          className="formProfile"
        >
          <Row className=" rowProfile">
            <div className="body-profile">
              <Form.Group controlId="validationCustom04">
                <div
                  style={{ position: "relative", height: "100px" }}
                  className="item"
                >
                  <Form.Label>Avatar:</Form.Label>
                  <Upload
                    name="image"
                    onChange={handleOnchangeAvatar}
                    maxCount={1}
                    // style={{position:'relative', marginBottom:'20px'}}
                  >
                    <Button
                      icon={<UploadOutlined />}
                      style={{
                        margin: "0",
                        backgroundColor: "transparent",
                        borderColor: "#000",
                        position: "absolute",
                        top: "0px",
                        left: "50%",
                        width: "100px",
                        height: "100px",
                        borderRadius: "50%",
                      }}
                    >
                      <GrAdd />
                    </Button>
                  </Upload>
                  {avatar && (
                    <Upload
                      name="image"
                      onChange={handleOnchangeAvatar}
                      maxCount={1}
                    >
                      <Button
                        icon={<UploadOutlined />}
                        style={{
                          margin: "0",
                          backgroundColor: "transparent",
                          borderColor: "#000",
                          position: "absolute",
                          top: "0px",
                          left: "50%",
                          width: "100px",
                          height: "100px",
                          overflow: "hidden",
                          borderRadius: "50%",
                        }}
                      >
                        <img
                          src={avatar}
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
                </div>
                <Form.Control.Feedback type="invalid">
                  Please provide a valid state.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="validationCustom02">
                <div className="item" style={{ marginBottom: 10 }}>
                  <Form.Label>
                    Email: <span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    required
                    value={email}
                    type="email"
                    onChange={handleOnchangeEmail}
                    placeholder="email@gmail.com"
                    disabled
                  />
                </div>
              </Form.Group>
              {/* {!email && (
              <p style={{ color: "red", marginLeft: 120 }}>Vui lòng nhập email</p>
            )}
            {email && data?.message === "Wrong email format" && (
              <p style={{ color: "red", marginLeft: 120 }}>Sai định dạng email</p>
            )} */}
              <Form.Group controlId="validationCustom01">
                <div className="item">
                  <Form.Label>Name:</Form.Label>
                  <Form.Control
                    // required
                    value={name}
                    type="text"
                    onChange={handleOnchangeName}
                    placeholder="Name?"
                  />
                </div>
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="validationCustomUsername">
                <div className="item" style={{ marginBottom: 10 }}>
                  <Form.Label>Phone:</Form.Label>
                  <InputGroup hasValidation>
                    <Form.Control
                      value={phone}
                      type="number"
                      onChange={handleOnchangePhone}
                      placeholder="Phone?"
                      // required
                    />

                    {/* <Form.Control.Feedback type="invalid">
                    Please choose a username.
                  </Form.Control.Feedback> */}
                  </InputGroup>
                </div>
              </Form.Group>
              {!isPhoneNumber && phone && (
                <p style={{ color: "red", marginLeft: 120 }}>
                  Định dạng số điện thoại sai
                </p>
              )}
              <Form.Group md="6" controlId="validationCustom03">
                <div className="item address">
                  <Form.Label>Address:</Form.Label>
                  <div className="selectAddress">
                    <div>
                      <Select
                        // defaultValue={null}
                        placeholder={"Tỉnh/Thành phố *"}
                        value={tinhLabel || undefined}
                        options={optionsTinh}
                        onChange={handleChangeSelectTinh}
                      />
                    </div>
                    <div>
                      {tinhLabel ? (
                        <Select
                          placeholder={"Quận/Huyện *"}
                          value={huyenLabel || undefined}
                          options={optionsHuyen}
                          onChange={handleChangeSelectHuyen}
                        />
                      ) : (
                        <Select placeholder={"Quận/Huyện *"} disabled />
                      )}
                    </div>
                    <div>
                      {huyenLabel ? (
                        <Select
                          placeholder={"Phường/Xã *"}
                          value={xaLabel || undefined}
                          options={optionsXa}
                          onChange={handleChangeSelectXa}
                        />
                      ) : (
                        <Select placeholder={"Phường/Xã *"} disabled />
                      )}
                    </div>
                    <Form.Control
                      value={inputLabel}
                      type="text"
                      onChange={handleOnchangeAddress}
                      placeholder={"Số nhà, đường *"}
                      // required
                    />
                  </div>
                </div>

                <Form.Control.Feedback type="invalid">
                  Please provide a valid city.
                </Form.Control.Feedback>
              </Form.Group>
            </div>
          </Row>
          {/* <Button type="submit">Submit form</Button> */}
          <div style={{ width: "100%", textAlign: "center", marginTop: 30 }}>
            <span className="submit" onClick={handleUpdate}>
              Update form
            </span>
          </div>
        </Form>
      </div>
    </>
  );
};

export default ProfilePage;
