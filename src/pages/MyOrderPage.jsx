import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useMemo, useState } from "react";
import * as OrderServcie from "../services/OrderServices";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutationHook } from "../hooks/useMutationHook";
import { success, error, warning } from "../components/Message";
import { convertPrice } from "../utils";
import { Button } from "antd";
import { Modal } from "antd";
import LoadingComponents from "../components/LoadingComponents";
import { Toaster } from "react-hot-toast";
import ModelComponent from "../components/ModelComponent";
import LoadingFullComponents from "../components/LoadingFullComponents";

const MyOrderPage = () => {
  const location = useLocation();
  const { state } = location;
  const user = useSelector((state) => state.user);
  console.log("state", state);
  const fetchMyOrder = async () => {
    const res = await OrderServcie.getOrderByUserId(state?.id, state?.token);
    return res?.data;
  };

  // const [enabled, setEnabled] = useState(false);
  // useEffect(() => {
  //   if (state?.id && state?.token) {
  //     setEnabled(true);
  //   } else {
  //     setEnabled(false);
  //   }
  // }, []);

  const queryOrder = useQuery(["order"], fetchMyOrder, {
    enabled: true,
  });
  const { data: dataOrder, isLoading } = queryOrder;

  const navigate = useNavigate();

  const handleDetailsOrder = (id) => {
    navigate(`/details-order/${id}`, {
      state: {
        id: state?.id,
        token: state?.token,
      },
    });
  };

  const mutation = useMutationHook((data) => {
    const { id, token, orderItems, userId } = data;
    const res = OrderServcie.cancelOrder(id, token, orderItems, userId);
    return res;
  });

  const handleCancelOrder = (order) => {
    mutation.mutate(
      {
        id: order._id,
        token: state?.token,
        orderItems: order?.orderItems,
        userId: user?.id,
      },
      {
        onSuccess: () => {
          queryOrder.refetch(); //khi thành công thì nó load lại
        },
      }
    );
  };

  const {
    isLoading: isLoadingCancel,
    isSuccess: isSuccessCancel,
    isError: isErrorCancel,
    data: dataCancel,
  } = mutation;

  useEffect(() => {
    if (isSuccessCancel && dataCancel?.status === "OK") {
      success("Bạn đã huỷ đơn hàng thành công");
    } else if (isErrorCancel) {
      error("Bạn đã huỷ đơn hàng thành công");
      setIsModalOpen(false);
    }
  }, [isSuccessCancel, isErrorCancel]);

  const [okHuy, setOkHuy] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = (item) => {
    setIsModalOpen(true);
    setOkHuy(item);
  };

  const handleOkModel = () => {
    setIsModalOpen(false);
    handleCancelOrder(okHuy);
    setOkHuy("");
  };

  useEffect(() => {
    window.scrollTo(0, 1);
  }, []);

  return (
    <>
      <LoadingFullComponents isLoading={isLoadingCancel} />
      <div className="my-order">
        <Toaster />
        <h1
          style={{
            textAlign: "center",
            margin: "20px 0",
            textTransform: "uppercase",
          }}
        >
          Đơn hàng của bạn
        </h1>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <LoadingComponents isLoading={isLoading} />
        </div>
        <div className="body">
          {dataOrder?.length > 0
            ? dataOrder?.map((item, index) => {
                return (
                  <div key={index}>
                    {item?.orderItems.length && (
                      <div className="product">
                        <div>
                          {item?.orderItems?.map((order, index) => {
                            return (
                              <div className="item" key={index}>
                                <img src={order?.image} alt="" />
                                <div className="body-text">
                                  <h3 style={{ marginBottom: 5 }}>
                                    {order?.name}
                                  </h3>
                                  <p>{convertPrice(order?.price)}</p>
                                  <p>
                                    Size: {order?.size} ({order?.amount})
                                  </p>
                                  {/* <p>Số lượng: {order?.amount}</p> */}
                                  <div className="price">
                                    <p>
                                      Phí ship:{" "}
                                      {convertPrice(item?.shippingPrice)}
                                    </p>
                                    <p>
                                      Tổng tiền:{" "}
                                      {convertPrice(item?.totalPrice)}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                        <div className="right">
                          <div className="action">
                            <Button
                              className="details"
                              onClick={() => handleDetailsOrder(item?._id)}
                            >
                              Xem chi tiết
                            </Button>
                            {/* <h3
                          style={{ cursor: "pointer" }}
                          onClick={() => handleCancelOrder(item)}
                        >
                          Huỷy
                        </h3> */}
                            <Button
                              // type="primary"
                              onClick={() => showModal(item)}
                            >
                              Huỷ
                            </Button>
                            <Modal
                              title="Thông báo"
                              open={isModalOpen}
                              onOk={handleOkModel}
                              onCancel={() => setIsModalOpen(false)}
                            >
                              <p className="huy">
                                Bạn có muốn huỷ đơn hàng này?
                              </p>
                            </Modal>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            : !isLoading && (
                <h1 style={{ textAlign: "center" }}>
                  Bạn chưa đặt sản phẩm nào!
                </h1>
              )}
        </div>
      </div>
    </>
  );
};

export default MyOrderPage;
