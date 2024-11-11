import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  increaseAmount,
  decreaseAmount,
  // removeOrderProduct,
  // removeAllOrderProduct,
  selectedOrder,
  updateOrderProduct,
} from "../redux/slices/orderSlice";
import Modal from "react-bootstrap/Modal";
import { Form } from "antd";
import { convertPrice, renderOptionsAddress } from "../utils";
import ModelUpdateUserComponent from "../components/ModelUpdateUserComponent";
import { useMutationHook } from "../hooks/useMutationHook";
import { success, error, warning } from "../components/Message";
import { updateUser } from "../redux/slices/userSlice";
import * as UserServcie from "../services/userServices";
import { useLocation, useNavigate } from "react-router-dom";
import { MdDeleteOutline } from "react-icons/md";
import StepsComponent from "../components/StepsComponent";
import * as CartServices from "../services/CartServices";
import { useQuery } from "@tanstack/react-query";
import LoadingComponents from "../components/LoadingComponents";
import { Toaster } from "react-hot-toast";
import LoadingFullComponents from "../components/LoadingFullComponents";

const OrderPage = () => {
  const order = useSelector((state) => state.order);
  const user = useSelector((state) => state.user);
  const [listChecked, setListChecked] = useState([]);
  const [isOpenModalUpdate, setIsOpenModalUpdate] = useState(false);
  const [formUpdate] = Form.useForm();
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const location = useLocation();
  const { state } = location;

  const fetchOrderCart = async () => {
    const res = await CartServices.getCartByUserId(state?.id, state?.token);
    return res?.data;
  };

  const queryCart = useQuery(["cart"], fetchOrderCart, {
    enabled: true,
  });

  const { data: dataCart, isLoading: isLoadingCart } = queryCart;

  useEffect(() => {
    dispatch(updateOrderProduct({ dataCart }));
  }, [dataCart]);

  const handleOnchangeCount = (type, idProduct) => {
    if (type === "increase") {
      dispatch(increaseAmount({ idProduct }));
    } else {
      dispatch(decreaseAmount({ idProduct }));
    }
  };

  const mutationDeleteCart = useMutationHook((data) => {
    const { userId, cartId, token } = data;
    const res = CartServices.deleteCartDetails(userId, cartId, token);
    return res;
  });

  const {
    data: dataDeleted,
    isLoading: isLoadingDeleted,
    isSuccess: isSuccessDeleted,
    isError: isErrorDeleted,
  } = mutationDeleteCart;

  const handleDeleteOrder = (idProduct) => {
    // dispatch(removeOrderProduct({ idProduct }));
    mutationDeleteCart.mutate(
      { userId: user?.id, cartId: idProduct, token: user?.access_token },
      {
        //onSettled & queryProduct.refetch() nó mới cập nhật lại không cần load lại trang
        onSettled: () => {
          queryCart.refetch();
        },
      }
    );
  };

  useEffect(() => {
    if (isSuccessDeleted && dataDeleted?.status === "OK") {
      success("Bạn đã xoá sản phẩm khỏi giỏ hàng thành công");
    } else if (isErrorDeleted) {
      error("Bạn đã xoá sản phẩm khỏi giỏ hàng thất bại");
    }
  }, [isSuccessDeleted, isErrorDeleted]);

  const onChange = (e) => {
    if (listChecked.includes(e.target.value)) {
      const newListChecked = listChecked.filter(
        (item) => item !== e.target.value
      );
      setListChecked(newListChecked);
    } else {
      setListChecked([...listChecked, e.target.value]);
    }
  };

  const [lengthItem, setLengthItem] = useState([]);

  const onChangeAll = (e) => {
    if (e.target.checked) {
      const newListChecked = [];
      order?.orderItems?.forEach((item) => {
        newListChecked.push(item?._id + `size${item?.size}`);
      });
      // setLengthItem(newListChecked);
      setListChecked(newListChecked);
    } else {
      setListChecked([]);
    }
  };

  useEffect(() => {
    const newListChecked = [];

    dataCart?.forEach((item) => {
      if (item?.userId === user?.id) {
        newListChecked.push(item?._id + `size${item?.size}`);
      }
    });
    setLengthItem(newListChecked);
  }, [dataCart]);

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

  const handleDeleteAll = () => {
    if (listChecked?.length > 0) {
      const arrId = [];
      for (let i = 0; i < listChecked?.length; i++) {
        arrId.push(listChecked[i].split("size")[0]);
      }
      mutationDeleteMany.mutate(
        { userId: user?.id, ids: arrId, token: user?.access_token },
        {
          onSettled: () => {
            queryCart.refetch();
          },
        }
      );
    }
  };

  useEffect(() => {
    if (isSuccessDeletedMany && dataDeletedMany?.status === "OK") {
      success("Bạn đã xoá sản phẩm ra khỏi giỏ hàng thành công");
    } else if (isErrorDeletedMany) {
      error("Bạn đã xoá sản phẩm ra khỏi giỏ hàng thất bại");
    }
  }, [isSuccessDeletedMany, isErrorDeletedMany]);

  useEffect(() => {
    dispatch(selectedOrder({ listChecked }));
  }, [listChecked]);

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

  const totalPriceMemo = useMemo(() => {
    return Number(priceMemo) + Number(diliveryPriceMemo);
  }, [priceMemo, diliveryPriceMemo]);

  // -------

  const [stateUserDetailsUpdate, setStateUserDetailsUpdate] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const mutationUpdate = useMutationHook((data) => {
    const { id, access_token, ...rest } = data;
    const res = UserServcie.updateUser(id, rest, access_token);
    return res;
  });

  const { data, isLoading, isSuccess, isError, variables } = mutationUpdate;

  useEffect(() => {
    if (isSuccess && data?.status === "OK") {
      success("Bạn đã cập nhật thông tin thành công");
      setIsOpenModalUpdate(false);
      setIsPhoneNumber(true);
      handleGetDetailsUser(user?.id, user?.access_token);
    } else if (isError) {
      error("Bạn đã cập nhật thông tin thành công");
    }
  }, [isSuccess, isError]);

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

  const handleBuy = () => {
    if (
      user?.phone &&
      user?.address?.split(", ")[3] &&
      user?.address?.split(", ")[2] &&
      user?.address?.split(", ")[1] &&
      user?.address?.split(", ")[0] &&
      user?.name
    ) {
      navigate("/payment", {
        state: {
          id: user?.id,
          token: user?.access_token,
        },
      });
    } else {
      setIsOpenModalUpdate(true);
    }
  };

  const [noBuy, setNoBuy] = useState(false);
  const handleNoBuy = () => {
    setNoBuy(true);
  };

  useEffect(() => {
    formUpdate.setFieldsValue(stateUserDetailsUpdate);
  }, [formUpdate, stateUserDetailsUpdate]);

  const handleGetDetailsUser = async (id, token) => {
    setIsLoadingUpdate(true);
    const storage = localStorage.getItem("refresh_token");
    const refreshToken = JSON.parse(storage);
    const res = await UserServcie.getDetailsUser(id, token);
    setIsLoadingUpdate(false);

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

  const [errInput, setErrInput] = useState("");

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
      if (isPhoneNumber?.length === 1) {
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

  const itemsSteps = [
    {
      title: "Mua",
      description: "",
    },
    {
      title: "Free ship 50%",
      description: "500k",
      // subTitle: "Left 00:00:08",
    },
    {
      title: "Free ship",
      description: "800k",
    },
  ];

  // ---address---

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
      <LoadingFullComponents
        isLoading={isLoadingDeleted || isLoadingDeletedMany || isLoading}
      />
      <div
        style={{ minHeight: "80vh", marginBottom: 50 }}
        className="orderPage"
      >
        <Toaster />
        <h1
          style={{
            margin: "30px 0 30px 0",
            textAlign: "center",
            textTransform: "uppercase",
          }}
        >
          Giỏ hàng của bạn
        </h1>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <LoadingComponents isLoading={isLoadingCart} />
        </div>
        {!isLoadingCart &&
          (order?.orderItems?.length > 0 ? (
            <div className="cart-body">
              <div className="cart-shopping">
                <StepsComponent
                  current={
                    priceMemo >= 800
                      ? 3
                      : priceMemo >= 500
                      ? 2
                      : priceMemo > 0
                      ? 1
                      : 0
                  }
                  items={itemsSteps}
                />
                <div className="title">
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <input
                      onChange={onChangeAll}
                      checked={
                        listChecked?.length > 0 &&
                        listChecked?.length === lengthItem?.length
                      }
                      type="checkbox"
                      className="checkbox"
                    />
                    <p style={{ fontSize: "15px", margin: 0 }}>
                      Chọn tất cả ({order?.orderItems?.length} sản phẩm)
                    </p>
                  </div>
                  {dataCart?.length > 0 && listChecked?.length > 0 && (
                    <h4 onClick={handleDeleteAll} style={{ cursor: "pointer" }}>
                      Xoá tất cả
                    </h4>
                  )}
                </div>
                <div className="product-cart">
                  {order?.orderItems?.map((item, index) => {
                    return (
                      <span key={index}>
                        {item.userId === user?.id && (
                          <span>
                            <div
                              style={{ display: "flex" }}
                              className="item-product"
                            >
                              <div style={{ display: "flex" }}>
                                <input
                                  onChange={onChange}
                                  value={item._id + `size${item.size}`}
                                  checked={listChecked.includes(
                                    item._id + `size${item.size}`
                                  )}
                                  type="checkbox"
                                  className="checkbox"
                                />
                                <img
                                  src={item.image}
                                  alt=""
                                  className="img-product"
                                />
                                <div className="text-product">
                                  <h3 className="name-product">{item?.name}</h3>
                                  <h3 className="price-product">
                                    {convertPrice(item?.price)}
                                  </h3>
                                  <p style={{ fontSize: 14 }}>
                                    Size: {item?.size}
                                  </p>
                                  <div className="amount-product">
                                    <button
                                      onClick={() =>
                                        handleOnchangeCount(
                                          "decrease",
                                          item._id
                                        )
                                      }
                                    >
                                      -
                                    </button>
                                    <span style={{ padding: "0 5px" }}>
                                      {item?.amount}
                                    </span>
                                    <button
                                      onClick={() =>
                                        handleOnchangeCount(
                                          "increase",
                                          item._id
                                        )
                                      }
                                    >
                                      +
                                    </button>
                                  </div>
                                </div>
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "end",
                                  position: "relative",
                                }}
                              >
                                {/* <h4
                                style={{ width: "70%" }}
                                className="totalPrice"
                              >
                                {convertPrice(item.price * item.amount)}
                              </h4> */}
                                <h4
                                  style={{
                                    cursor: "pointer",
                                    marginLeft: "10px",
                                    fontSize: "26px",
                                  }}
                                  onClick={() => handleDeleteOrder(item._id)}
                                >
                                  <MdDeleteOutline />
                                </h4>
                              </div>
                            </div>
                          </span>
                        )}
                      </span>
                    );
                  })}
                </div>
              </div>
              <div className="pay">
                {noBuy && listChecked?.length === 0 && (
                  <p style={{ color: "red", fontSize: 14 }}>
                    Vui lòng chọn sản phẩm
                  </p>
                )}
                <div className="pay-body">
                  <ul className="pay-list">
                    <li className="pay-item">
                      <h3>Tạm tính:</h3>
                      <span>{convertPrice(priceMemo)}</span>
                    </li>
                    <li className="pay-item">
                      <h3>Phí giao hàng:</h3>
                      <span>{convertPrice(diliveryPriceMemo)}</span>
                    </li>
                    <li className="pay-item">
                      <h3>Tổng tiền:</h3>
                      <span style={{ fontWeight: "bold" }}>
                        {convertPrice(totalPriceMemo)}
                      </span>
                    </li>
                  </ul>
                  {listChecked?.length > 0 ? (
                    <button className="pay-btn" onClick={handleBuy}>
                      Mua ngay({listChecked?.length})
                    </button>
                  ) : (
                    <button onClick={handleNoBuy} className="pay-btn">
                      Mua ngay (0)
                    </button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <h2 style={{ textAlign: "center" }}>
              Bạn không có sản phẩm trong giỏ hàng!
            </h2>
          ))}
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
              Chỉnh sửa người dùng
            </Modal.Title>
          </Modal.Header>
          {/* <LoadingUpdateComponent isLoading={false}> */}
          <ModelUpdateUserComponent
            stateUser={stateUserDetailsUpdate}
            form={formUpdate}
            handleOnchange={handleOnchangeDetailsUpdate}
            onFinish={handleUpdate}
            // isLoading={isLoading}
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
          {/* </LoadingUpdateComponent> */}
        </Modal>
      </div>
    </>
  );
};

export default OrderPage;
