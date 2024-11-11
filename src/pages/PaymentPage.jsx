import React, { useEffect, useMemo, useState } from "react";
import { convertPrice, renderOptionsAddress } from "../utils";
import { useDispatch, useSelector } from "react-redux";
import { Radio } from "antd";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import * as OrderServcie from "../services/OrderServices";
import { useMutationHook } from "../hooks/useMutationHook";
import * as UserServcie from "../services/userServices";
import { updateUser } from "../redux/slices/userSlice";
import Modal from "react-bootstrap/Modal";
import { Form } from "antd";
import ModelUpdateUserComponent from "../components/ModelUpdateUserComponent";
import { success, error, warning } from "../components/Message";
import { useNavigate } from "react-router-dom";
import * as CartServices from "../services/CartServices";
import * as PaymentServices from "../services/PaymentServices";
import { Toaster } from "react-hot-toast";
import LoadingFullComponents from "../components/LoadingFullComponents";
import { PayPalButton } from "react-paypal-button-v2";

const PaymentPage = () => {
  const order = useSelector((state) => state.order);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [isOpenModalUpdate, setIsOpenModalUpdate] = useState(false);
  const [formUpdate] = Form.useForm();
  const [valueRadioGH, setValueRadioGH] = useState("GHTK");
  const [valueRadioTT, setValueRadioTT] = useState("later_money");
  const navigate = useNavigate();

  const priceMemo = useMemo(() => {
    const result = order?.orderItemsSelected.reduce((total, cur) => {
      return total + cur?.price * cur?.amount;
    }, 0);
    return result;
  }, [order]);

  const diliveryPriceMemo = useMemo(() => {
    if (priceMemo === 0 || priceMemo >= 800) {
      return 0;
    }
    if (priceMemo >= 500) {
      return 10;
    } else {
      return 20;
    }
  }, [priceMemo]);

  const [shippingPrice, setShipingPrice] = useState(diliveryPriceMemo);
  useEffect(() => {
    if (valueRadioGH === "GHN") {
      setShipingPrice((prev) => prev + 5);
    } else {
      setShipingPrice(diliveryPriceMemo);
    }
  }, [valueRadioGH]);

  const totalPriceMemo = useMemo(() => {
    return Number(priceMemo) + Number(shippingPrice);
  }, [priceMemo, shippingPrice]);

  const handleBuy = () => {};

  const onChangeGH = (e) => {
    setValueRadioGH(e.target.value);
  };

  const onChangeTT = (e) => {
    setValueRadioTT(e.target.value);
  };

  const mutationAddOrder = useMutationHook((data) => {
    const { user: userId, token, ...rest } = data;
    const res = OrderServcie.createOrder(userId, token, { ...rest }); //rest or {...rest}
    return res;
  });

  const {
    isLoading: isLoadingAddOrder,
    data: dataAddOrder,
    isSuccess: isSuccessAddOrder,
    isError: isErrorAddOrder,
  } = mutationAddOrder;

  const mutationDeleteMany = useMutationHook((data) => {
    const { userId, token, ...ids } = data;
    const res = CartServices.deleteManyCart(userId, ids, token);
    return res;
  });

  const {
    data: dataDeletedMany,
    isLoading: isLoadingDeletedMany,
    isSuccess: isSuccessDeletedMany,
    isError: isErrorDeletedMany,
  } = mutationDeleteMany;

  useEffect(() => {
    if (isSuccessAddOrder && dataAddOrder?.status === "OK") {
      success("Bạn đã đặt hàng thành công");
      const arrayOrdered = []; //lấy id của các sản phẩm mua để remove khỏi giỏ hàng
      order?.orderItemsSelected?.forEach((e) => {
        arrayOrdered.push(e._id);
      });
      console.log("arrayOrdered", arrayOrdered);
      mutationDeleteMany.mutate({
        userId: user?.id,
        ids: arrayOrdered,
        token: user?.access_token,
      });
      setTimeout(() => {
        navigate("/my-order", {
          state: {
            id: user?.id,
            token: user?.access_token,
          },
        });
      }, 0);
    } else if (isErrorAddOrder) {
      error("Bạn đã đặt hàng thất bại");
    }
  }, [isSuccessAddOrder, isErrorAddOrder]);

  const [stateUserDetailsUpdate, setStateUserDetailsUpdate] = useState({
    name: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    formUpdate.setFieldsValue(stateUserDetailsUpdate);
  }, [formUpdate, stateUserDetailsUpdate]);

  const mutationUpdate = useMutationHook((data) => {
    const { id, access_token, ...rest } = data;
    const res = UserServcie.updateUser(id, rest, access_token);
    return res;
  });
  const {
    isLoading: isLoadingUpdate,
    data: dataUpdate,
    isSuccess: isSuccessUpdate,
    isError: isErrorUpdate,
  } = mutationUpdate;

  useEffect(() => {
    if (isSuccessUpdate && dataUpdate?.status === "OK") {
      success("Bạn đã cập nhật thông tin thành công");
      setIsOpenModalUpdate(false);
      setIsPhoneNumber(true);
      handleGetDetailsUser(user?.id, user?.access_token);
    } else if (isErrorUpdate) {
      error("Bạn đã cập nhật thông tin thất bại");
    }
  }, [isSuccessUpdate, isErrorUpdate]);

  const openModalUpdata = () => {
    setIsOpenModalUpdate(true);
  };

  const handleOnchangeDetailsUpdate = (e) => {
    setStateUserDetailsUpdate({
      ...stateUserDetailsUpdate,
      [e.target.name]: e.target.value,
    });
    if (e.target.name === "phone") {
      setIsPhoneNumber(true);
    }
    setErrInput("");
  };

  const handleGetDetailsUser = async (id, token) => {
    // setIsLoadingUpdate(true);
    const storage = localStorage.getItem("refresh_token");
    const refreshToken = JSON.parse(storage);
    const res = await UserServcie.getDetailsUser(id, token);
    console.log("res?.data", res);
    // setIsLoadingUpdate(false);
    dispatch(
      updateUser({
        ...res?.data,
        name: stateUserDetailsUpdate?.name,
        phone: stateUserDetailsUpdate?.phone,
        address: address,
        access_token: token,
        refreshToken,
      })
    );
  };

  useEffect(() => {
    setStateUserDetailsUpdate({
      name: user?.name,
      phone: user?.phone,
      address: user?.address,
    });
  }, [user]);

  const [isPhoneNumber, setIsPhoneNumber] = useState(true);

  const handleUpdate = () => {
    setIsPhoneNumber(stateUserDetailsUpdate?.phone.match(/^[0-9]{10}$/));
    if (
      stateUserDetailsUpdate?.name &&
      stateUserDetailsUpdate?.phone &&
      inputLabel &&
      tinhLabel &&
      huyenLabel &&
      xaLabel
    ) {
      setErrInput("");
      if (true) {
        mutationUpdate.mutate({
          id: user?.id,
          name: stateUserDetailsUpdate?.name,
          phone: stateUserDetailsUpdate?.phone,
          address: address,
          access_token: user?.access_token,
        });
      }
    } else {
      setErrInput("Vui lòng nhập đầy đủ thông tin");
    }
  };

  const timeNow = new Date().toString();
  const handleAddOrder = () => {
    if (
      user?.access_token &&
      order?.orderItemsSelected &&
      user?.name &&
      user?.address &&
      user?.phone &&
      priceMemo &&
      user?.id &&
      user?.email
    ) {
      mutationAddOrder.mutate({
        token: user?.access_token,
        orderItems: order?.orderItemsSelected,
        fullName: user?.name,
        phone: user?.phone,
        address: user?.address,
        paymentMethod: valueRadioTT,
        itemsPrice: priceMemo,
        shippingPrice: shippingPrice,
        totalPrice: totalPriceMemo,
        user: user?.id,
        email: user?.email,
        deliveredAt: timeNow,
      });
    }
  };

  const [sdkReady, setSdkReady] = useState(false); //set xem nó đã có hay chưa
  const addPaypalScript = async () => {
    const { data } = await PaymentServices.getConfig();
    const script = document.createElement("script");
    script.type = "text/javascript"; //đặt type là js
    script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
    script.async = true; // tránh bất đồng bộ
    script.onload = () => {
      //đang load
      setSdkReady(true);
    };
    document.body.appendChild(script);
    console.log("datapaypal", data);
  };

  useEffect(() => {
    if (!window.paypal) {
      //nếu chưa có giao diện paypal
      addPaypalScript();
    } else {
      setSdkReady(true);
    }
  }, []);

  const onSuccessPaypal = (details, data) => {
    mutationAddOrder.mutate({
      token: user?.access_token,
      orderItems: order?.orderItemsSelected,
      fullName: user?.name,
      phone: user?.phone,
      address: user?.address,
      paymentMethod: valueRadioTT,
      itemsPrice: priceMemo,
      shippingPrice: shippingPrice,
      totalPrice: totalPriceMemo,
      user: user?.id,
      isPaid: true,
      paidAt: details.update_time,
      email: user?.email,
    });
    console.log("details", details, data);

    const arrayOrdered = []; //lấy id của các sản phẩm mua để remove khỏi giỏ hàng
    order?.orderItemsSelected?.forEach((e) => {
      arrayOrdered.push(e._id);
    });
    console.log("arrayOrdered", arrayOrdered);
    mutationDeleteMany.mutate(
      { ids: arrayOrdered, token: user?.access_token }
      // {
      //   onSettled: () => {
      //     queryCart.refetch();
      //   },
      // }
    );
  };

  const pricePaypal = totalPriceMemo / 23;

  //  address
  const [errInput, setErrInput] = useState("");

  const [address, setAddress] = useState(user?.address);

  const [tinhOptions, setTinhOptions] = useState([]);
  const [huyenOptions, setHuyenOptions] = useState([]);
  const [xaOptions, setXaOptions] = useState([]);
  const [tinhLabel, setTinhLabel] = useState(user?.address?.split(", ")[3]);
  const [huyenLabel, setHuyenLabel] = useState(user?.address?.split(", ")[2]);
  const [xaLabel, setXaLabel] = useState(user?.address?.split(", ")[1]);
  const [inputLabel, setInputLabel] = useState(user?.address?.split(", ")[0]);

  useEffect(() => {
    fetch("https://provinces.open-api.vn/api/?depth=3")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setTinhOptions(data);
        const codenameTinh = data.find((dt) => dt.name === tinhLabel);
        return codenameTinh;
      })
      .then((data) => {
        setHuyenOptions(data?.districts);
        const codenameHuyen = data?.districts.find(
          (dt) => dt.name === huyenLabel
        );
        return codenameHuyen;
      })
      .then((data) => {
        setXaOptions(data?.wards);
      });
  }, [tinhLabel, huyenLabel, xaLabel]);

  const handleOnchangeAddress = (e) => {
    setInputLabel(e.target.value);
  };

  const handleChangeSelectTinh = (e) => {
    if (e !== tinhLabel) {
      setTinhLabel(e);
      setHuyenLabel("");
      setXaLabel("");
    }
  };

  const handleChangeSelectHuyen = (e) => {
    if (e !== huyenLabel) {
      setHuyenLabel(e);
      setXaLabel("");
    }
  };

  const handleChangeSelectXa = (e) => {
    setXaLabel(e);
  };

  const optionsTinh = renderOptionsAddress(tinhOptions);
  const optionsHuyen = renderOptionsAddress(huyenOptions);
  const optionsXa = renderOptionsAddress(xaOptions);

  useEffect(() => {
    setAddress(
      inputLabel + ", " + xaLabel + ", " + huyenLabel + ", " + tinhLabel
    );
  }, [inputLabel, xaLabel, huyenLabel, tinhLabel]);

  const onCloseModel = () => {
    formUpdate.resetFields();
    setIsOpenModalUpdate(false);
    setIsPhoneNumber(true);
    setTinhLabel(user?.address?.split(", ")[3]);
    setHuyenLabel(user?.address?.split(", ")[2]);
    setXaLabel(user?.address?.split(", ")[1]);
    setInputLabel(user?.address?.split(", ")[0]);
    setStateUserDetailsUpdate({ name: user?.name, phone: user?.phone });
    setErrInput("");
  };

  useEffect(() => {
    window.scrollTo(0, 1);
  }, []);

  return (
    <>
      <LoadingFullComponents isLoading={isLoadingAddOrder || isLoadingUpdate} />
      <div>
        <Toaster />
        <h1
          style={{
            textAlign: "center",
            marginTop: "30px",
            textTransform: "uppercase",
          }}
        >
          Thanh toán
        </h1>
        <Row className="page-payment">
          <Col xxl={8} xl={8} lg={8} className="payment">
            <div className="pay-product">
              <h3>{order?.orderItemsSelected?.length} sản phẩm</h3>
              {/* <h3 style={{ margin: 0 }}>Tạm tính: </h3> */}
              {order?.orderItemsSelected?.map((item, index) => {
                return (
                  <div className="product-item">
                    <img className="product-img" src={item.image} alt="" />
                    <div className="product-body">
                      <p className="item-text">{item?.name}</p>
                      <p className="item-text">{convertPrice(item?.price)}</p>
                      <p className="item-text">SL: {item?.amount}</p>
                      <p className="item-text">Size: {item?.size}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="pay-address">
              <h3 className="title">Địa chỉ giao hàng</h3>
              <p
                onClick={openModalUpdata}
                style={{
                  textDecoration: "underline",
                  color: "blue",
                  cursor: "pointer",
                  fontSize: "15px",
                  display: "inline-block",
                  textAlign: "center",
                }}
              >
                Thay đổi
              </p>
              <div className="pay-list">
                <div className="pay-item">
                  <p>
                    Name: <span>{user?.name}</span>
                  </p>
                </div>
                <div className="pay-item">
                  <p>
                    Phone: <span>{user?.phone}</span>
                  </p>
                </div>
                <div className="pay-item">
                  <p>
                    Address: <span>{user?.address}</span>
                  </p>
                </div>
              </div>
            </div>
          </Col>
          <Col xxl={4} xl={4} lg={4} className="pay">
            <div className="ok-pay">
              <ul className="pay-list">
                <li className="pay-item">
                  <h3>Tạm tính:</h3>
                  <span>{convertPrice(priceMemo)}</span>
                </li>
                <li className="pay-item">
                  <h3>Phí giao hàng:</h3>
                  <span>{convertPrice(shippingPrice)}</span>
                </li>
                <li className="pay-item total">
                  <h3>Tổng tiền:</h3>
                  <span style={{ fontWeight: "bold" }}>
                    {convertPrice(totalPriceMemo)}
                  </span>
                </li>
              </ul>

              <div className="pay-radio">
                <div className="method-pay">
                  <h3 className="title">Phương thức giao hàng:</h3>
                  <Radio.Group onChange={onChangeGH} value={valueRadioGH}>
                    <div className="radio-text">
                      <Radio value={"GHTK"}></Radio>
                      <h4>Giao hàng tiết kiệm</h4>
                    </div>
                    <div className="radio-text">
                      <Radio value={"GHN"}></Radio>
                      <h4>Giao hàng nhanh</h4>
                    </div>
                  </Radio.Group>
                </div>
                <div className="method-pay">
                  <h3 className="title">Phương thức thanh toán:</h3>
                  <Radio.Group onChange={onChangeTT} value={valueRadioTT}>
                    <div className="radio-text">
                      <Radio value={"later_money"}></Radio>
                      <h4>Thanh toán khi nhận hàng</h4>
                    </div>
                    <div className="radio-text">
                      <Radio value={"paypal"}></Radio>
                      <h4>Thanh toán bằng Paypal</h4>
                    </div>
                  </Radio.Group>
                </div>
              </div>

              {valueRadioTT === "paypal" && sdkReady ? (
                <div style={{ width: "320px", marginTop: "20px" }}>
                  <PayPalButton
                    amount={Math.round(pricePaypal)}
                    // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
                    onSuccess={onSuccessPaypal}
                    onError={() => {
                      alert("Error");
                    }}
                  />
                </div>
              ) : (
                <div className="btn-buy">
                  <p
                    style={{ color: "red", fontSize: 14, textAlign: "center" }}
                  >
                    {mutationAddOrder?.error?.response?.data?.message}
                  </p>
                  <button className="pay-btn" onClick={handleAddOrder}>
                    Đặt hàng
                  </button>
                </div>
              )}
            </div>
          </Col>
          <Modal
            show={isOpenModalUpdate}
            onHide={onCloseModel}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centeredxw
            style={{ marginTop: 100 }}
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Chỉnh sửa thông tin giao hàng
              </Modal.Title>
            </Modal.Header>
            <ModelUpdateUserComponent
              stateUser={stateUserDetailsUpdate}
              form={formUpdate}
              handleOnchange={handleOnchangeDetailsUpdate}
              onFinish={handleUpdate}
              // isLoading={isLoadingUpdate}
              title="Update"
              isPhoneNumber={isPhoneNumber}
              tinhLabel={tinhLabel}
              optionsTinh={optionsTinh}
              handleChangeSelectTinh={handleChangeSelectTinh}
              huyenLabel={huyenLabel}
              optionsHuyen={optionsHuyen}
              handleChangeSelectHuyen={handleChangeSelectHuyen}
              xaLabel={xaLabel}
              optionsXa={optionsXa}
              handleChangeSelectXa={handleChangeSelectXa}
              inputLabel={inputLabel}
              handleOnchangeAddress={handleOnchangeAddress}
              errInput={errInput}
            />
          </Modal>
          {/* <Modal
            show={true}
            onHide={() => {
              setIsOpenModalUpdate(false);
            }}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centeredxw
            style={{ marginTop: 200 }}
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                <h3>Bạn đã đặt hàng thành công</h3>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ padding: 20 }}>
              <p style={{ fontSize: 16 }}>Bạn muốn di chuyển đến đâu?</p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Button>Trang chủ</Button>
                <Button>Giỏ hàng</Button>
                <Button>Đơn hàng của bạn</Button>
              </div>
            </Modal.Body>
          </Modal> */}
        </Row>
      </div>
    </>
  );
};

export default PaymentPage;
