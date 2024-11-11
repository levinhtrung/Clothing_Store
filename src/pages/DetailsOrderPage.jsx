import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import * as OrderServcie from "../services/OrderServices";
import { useQuery } from "@tanstack/react-query";
import { convertPrice } from "../utils";
import LoadingComponents from "../components/LoadingComponents";

const DetailsOrderPage = () => {
  const params = useParams();
  const { id } = params;
  const location = useLocation();
  const { state } = location;

  const [isLoadingDetails, setIsLoadingDetails] = useState(false);

  const fetchOrderDetails = async () => {
    const res = await OrderServcie.getDetailsOrder(state?.id, id, state?.token);
    setIsLoadingDetails(false);
    return res?.data;
  };

  useEffect(() => {
    window.scrollTo(0, 1);
    setIsLoadingDetails(true);
  }, []);

  const queryOrderDetails = useQuery(["order-details"], fetchOrderDetails);
  const { data: dataOrderDetails, isLoading } = queryOrderDetails;

  const [month, setMonth] = useState("");
  const monthInitial = dataOrderDetails?.deliveredAt?.split(" ")[1].toString();
  useEffect(() => {
    switch (monthInitial) {
      case "Jan":
        setMonth("01");
      case "Feb":
        setMonth("02");
      case "Mar":
        setMonth("03");
      case "Apr":
        setMonth("04");
      case "May":
        setMonth("05");
      case "Jun":
        setMonth("06");
      case "Jul":
        setMonth("07");
      case "Aug":
        setMonth("08");
      case "Sep":
        setMonth("09");
      case "Oct":
        setMonth("10");
      case "Nov":
        setMonth("11");
      case "Dec":
        setMonth("12");
    }
  }, []);

  return (
    <>
      <div className="order-details">
        <h1
          style={{
            textTransform: "uppercase",
            textAlign: "center",
            margin: "20px 0",
          }}
        >
          Chi tiết đơn hàng
        </h1>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <LoadingComponents isLoading={isLoading || isLoadingDetails} />
        </div>
        {!isLoading && !isLoadingDetails && (
          <div className="body">
            <div className="info">
              <div className="product">
                {dataOrderDetails?.orderItems?.map((item, index) => {
                  return (
                    <div className="item" key={index}>
                      <img src={item?.image} alt="" />
                      <div className="text">
                        <h3>{item?.name}</h3>
                        <h3>{convertPrice(item?.price)}</h3>
                        <h3>Size: {item?.size}</h3>
                        <h3>Số lượng: {item?.amount}</h3>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div>
                <div className="receiver">
                  <h3 className="text">Thông tin người nhận:</h3>
                  <h3>Name: {dataOrderDetails?.shippingAddres?.fullName}</h3>
                  <h3>Phone: {dataOrderDetails?.shippingAddres?.phone}</h3>
                  <h3>Address: {dataOrderDetails?.shippingAddres?.address}</h3>
                </div>
              </div>
            </div>
            <div className="details">
              <div>
                <div className="paided">
                  {dataOrderDetails?.isPaid ? (
                    <p style={{ color: "green" }}>Đã thanh toán</p>
                  ) : (
                    <p style={{ color: "red" }}>Chưa thanh toán</p>
                  )}
                  {dataOrderDetails?.DeliveryStatus === "NOT" ? (
                    <p style={{ color: "red" }}>Đơn hàng chưa giao</p>
                  ) : dataOrderDetails?.DeliveryStatus === "YES" ? (
                    <p style={{ color: "yellow" }}>Đơn hàng giao thành công</p>
                  ) : (
                    <p style={{ color: "green" }}>Đơn hàng đang giao</p>
                  )}
                </div>
              </div>
              <div>
                <div className="time">
                  <h3 className="text">Thời gian đặt hàng: </h3>
                  <h3>{dataOrderDetails?.deliveredAt?.split(" ")[4]}</h3>
                  <h3>
                    {dataOrderDetails?.deliveredAt?.split(" ")[2]}/{month}/
                    {dataOrderDetails?.deliveredAt?.split(" ")[3]}
                  </h3>
                  <h3>Nhận hàng dự kiến: 3-5 ngày</h3>
                </div>
              </div>

              <div className="price">
                <h3>Tạm tính: {convertPrice(dataOrderDetails?.itemsPrice)}</h3>
                <h3>
                  Phí ship: {convertPrice(dataOrderDetails?.shippingPrice)}
                </h3>
                <h3 className="total">
                  Tổng tiền: {convertPrice(dataOrderDetails?.totalPrice)}
                </h3>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DetailsOrderPage;
