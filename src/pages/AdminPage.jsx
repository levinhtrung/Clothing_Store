import React, { useState } from "react";
import { getItem } from "../utils";
import { FaRegUser } from "react-icons/fa";
import { SiHomeassistantcommunitystore } from "react-icons/si";
import { BsCart } from "react-icons/bs";
import { Menu } from "antd";
import AdminUser from "../components/AdminUser";
import AdminProduct from "../components/AdminProduct";
import AdminOrder from "../components/AdminOrder";

const NotFoundPage = () => {
  const items = [
    getItem("Người dùng", "user", <FaRegUser />),
    getItem("Sản phẩm", "product", <SiHomeassistantcommunitystore />),
    getItem("Đơn hàng", "order", <BsCart />),
  ];

  // const rootSubmenuKeys = ['user', 'product']
  const [keySelected, setKeySelected] = useState("");

  const renderPage = (key) => {
    switch (key) {
      case "user":
        return <AdminUser />;
      case "product":
        return <AdminProduct />;
      case "order":
        return <AdminOrder />;
      default:
        return <></>;
    }
  };

  const handleOnClick = ({ key }) => {
    setKeySelected(key);
  };

  return (
    <>
      {/* <HeaderComponents /> */}
      <div
        className="systemAdmin-mobile"
        style={{ display: "flex", overflowX: "hidden", marginBottom: 50 }}
      >
        <Menu
          mode="inline"
          className="left-systemAdmin"
          style={{
            width: 200,
            boxShadow: "1px 1px 2px #ccc",
            height: "100vh",
          }}
          items={items}
          onClick={handleOnClick}
        />
        <div style={{ flex: 1, padding: "15px" }}>
          {renderPage(keySelected)}
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;
