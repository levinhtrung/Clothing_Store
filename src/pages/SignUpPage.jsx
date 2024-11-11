import React, { useEffect, useState } from "react";
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput,
} from "mdb-react-ui-kit";
import * as UserServcie from "../services/userServices";
import * as OTPServices from "../services/OTPServices";
import { useMutationHook } from "../hooks/useMutationHook";
import { useNavigate } from "react-router-dom";
import { success, error, warning } from "../components/Message";
import { Button } from "react-bootstrap";
import { Toaster } from "react-hot-toast";
import LoadingFullComponents from "../components/LoadingFullComponents";

const SignUpPage = () => {
  const [email, setEmail] = useState();
  const [otp, setOtp] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [disabled, setDisabled] = useState(false);

  const mutation = useMutationHook((data) => UserServcie.signupUser(data));
  const { data, isLoading, isSuccess, isError } = mutation;
  console.log(mutation);
  useEffect(() => {
    if (isSuccess && data?.status !== "ERR") {
      success("Bạn đã đăng ký thành công");
      handleNavigateSignIn();
    } else if (isError) {
      error("Bạn đã đăng ký thất bại");
      console.log("err");
    }
  }, [isSuccess, isError]);

  useEffect(() => {
    if (isLoading) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [isLoading]);

  const mutationOTP = useMutationHook((email) => OTPServices.createrOTP(email));
  const {
    data: dataOTP,
    isLoading: isLoadingOTP,
    isSuccess: isSuccessOTP,
    isError: isErrorOTP,
  } = mutationOTP;

  const mutationDeleteOTP = useMutationHook((email) =>
    OTPServices.deleteOTP(email)
  );

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

  const handleOnChangeEmail = (e) => {
    const value = e.target.value;
    setEmail(value);
  };

  const handleOnChangeOtp = (e) => {
    const value = e.target.value;
    setOtp(value);
  };

  const handleOnChangePassword = (e) => {
    const value = e.target.value;
    setPassword(value);
  };

  const handleOnChangeConfirmPassword = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
  };

  const handleSignUp = () => {
    mutation.mutate({
      email,
      password,
      confirmPassword,
      otp,
    });
  };

  const handleCreateOTP = () => {
    mutationOTP.mutate({
      email: email,
    });
  };

  const handleDeleteOTP = () => {
    mutationDeleteOTP.mutate({
      email: email,
    });
  };

  const navigate = useNavigate();
  const handleNavigateSignIn = () => {
    navigate("/sign-in");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSignUp();
    }
  };

  const hanldeSignIn = () => {
    navigate("/sign-in");
  };

  return (
    <>
      <LoadingFullComponents isLoading={isLoading || isLoadingOTP} />
      <div>
        <Toaster />
        <MDBContainer className="my-5 sign" onKeyDown={handleKeyDown}>
          <MDBCard>
            <MDBRow className="g-0">
              <MDBCol
                xxl="6"
                xl="6"
                style={{ padding: 0 }}
                className="nhoHonIpad"
              >
                <MDBCardImage
                  src="https://binbadecor.vn/wp-content/uploads/2022/03/thiet-ke-shop-quan-ao-2.jpg"
                  alt="login form"
                  className="rounded-start w-100 image"
                />
              </MDBCol>
              <MDBCol xxl="6" xl="6">
                <MDBCardBody className="d-flex flex-column">
                  {/* <div className='d-flex flex-row mt-2' style={{display: 'flex', justifyContent:'center'}}>
                    <MDBIcon fas icon="cubes fa-3x me-3" style={{ color: '#ff6219' }}/>
                    <span className="h1 fw-bold mb-0">
                      <img src='data:image/png;base64,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' 
                          alt="logo" 
                          className='logo' 
                          style={{width: '100px', objectFit: 'cover'}}
                      />
                    </span>
                  </div> */}
                  <h2
                    className="fw-normal my-4 pb-3 title"
                    style={{ letterSpacing: "1px", textAlign: "center" }}
                  >
                    ĐĂNG KÝ
                  </h2>
                  {/* <MDBInput wrapperClass='mb-4' label='Name' id='formControlLg' type='text' size="lg"/> */}
                  <div className="input">
                    <h5 className="text">Email:</h5>
                    <MDBInput
                      className="input-nhap"
                      wrapperClass="mb-4"
                      onChange={handleOnChangeEmail}
                      id="formControlLg"
                      type="email"
                      size="lg"
                    />
                  </div>
                  {dataOTP?.status === "ERR" && (
                    <p style={{ color: "red", margin: 0, fontSize: 14 }}>
                      {dataOTP?.message}
                    </p>
                  )}
                  <div className="input" style={{ position: "relative" }}>
                    <h5 className="text">Mã OTP:</h5>
                    <MDBInput
                      className="input-nhap"
                      wrapperClass="mb-4"
                      onChange={handleOnChangeOtp}
                      id="formControlLg"
                      type="email"
                      size="lg"
                    />
                    <button
                      style={{
                        position: "absolute",
                        right: 0,
                        height: "100%",
                        width: 80,
                        backgroundColor: "#000",
                        color: "#fff",
                        fontSize: 13,
                      }}
                      onClick={handleCreateOTP}
                    >
                      Gửi OTP
                    </button>
                  </div>
                  <div className="input">
                    <h5 className="text">Password:</h5>
                    <MDBInput
                      className="input-nhap"
                      wrapperClass="mb-4"
                      onChange={handleOnChangePassword}
                      id="formControlLg"
                      type="password"
                      size="lg"
                    />
                  </div>
                  <div className="input">
                    <h5 className="text">Cofirm Password:</h5>
                    <MDBInput
                      className="input-nhap"
                      wrapperClass="mb-4"
                      onChange={handleOnChangeConfirmPassword}
                      id="formControlLg"
                      type="password"
                      size="lg"
                    />
                  </div>
                  <div className="footer">
                    <div className="more">
                      {data?.status === "ERR" && (
                        <span className="err" style={{ color: "red" }}>
                          {data?.message}
                        </span>
                      )}
                    </div>
                    <div
                      className="button"
                      style={{
                        marginTop: "15px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Button
                        disabled={disabled}
                        onClick={handleSignUp}
                        className="btn-login"
                        style={{
                          backgroundColor: "#000",
                          cursor: "pointer",
                          border: "none",
                          borderRadius: "8px",
                        }}
                      >
                        SIGN UP
                      </Button>
                    </div>
                  </div>
                  <div className="qmk-dk">
                    <a onClick={hanldeSignIn} style={{ color: "#393f81" }}>
                      Đăng nhập
                    </a>
                  </div>
                </MDBCardBody>
              </MDBCol>
            </MDBRow>
          </MDBCard>
        </MDBContainer>
      </div>
    </>
  );
};

export default SignUpPage;
