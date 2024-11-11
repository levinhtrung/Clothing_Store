import React, { useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import TabelComponents from "./TabelComponents";
import { SearchOutlined, CloseOutlined } from "@ant-design/icons";
import { convertPrice, getBase64 } from "../utils";
import * as OrderServices from "../services/OrderServices";
import { useMutationHook } from "../hooks/useMutationHook";
import { success, error, warning } from "./Message";
import { useQuery } from "@tanstack/react-query";
import { MdDeleteOutline } from "react-icons/md";
import DrawerComponent from "./DrawerComponent";
import ModelBodyUserComponent from "./ModelBodyUserComponent";
import { useSelector } from "react-redux";
import { Form, Input, Space } from "antd";
import LoadingUpdateComponent from "./LoadingUpdateComponent";
import PieChartComponent from "./PieChartComponent";

// import { getAllUser } from '../services/userServices'

const AdminOrder = () => {
  // const [form] = Form.useForm()
  // const [formUpdate] = Form.useForm();
  const [rowSelected, setRowSelected] = useState("");
  // const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  // const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
  const user = useSelector((state) => state?.user);
  // const [isModelOpenDelete, setIsModelOpenDelete] = useState(false);
  const searchInput = useRef(null);
  const storageToken = localStorage.getItem("access_token");
  // const storageAccessToken = storageToken.split('"')[1];

  // const [stateUserDetails, setStateUserDetails] = useState({
  //   name: "",
  //   email: "",
  //   isAdmin: false,
  //   phone: "",
  //   address: "",
  //   avatar: "",
  // });

  // const mutationDelete = useMutationHook((data) => {
  //   const { id, token } = data;
  //   const res = userServices.deleteUser(id, token);
  //   return res;
  // });

  // const {
  //   data: dataDeleted,
  //   isLoading: isLoadingDeleted,
  //   isSuccess: isSuccessDeleted,
  //   isError: isErrorDeleted,
  // } = mutationDelete;

  // const mutationDeleteMany = useMutationHook((data) => {
  //   const { token, ...ids } = data;
  //   const res = userServices.deleteManyUser(ids, token);
  //   return res;
  // });

  // const {
  //   data: dataDeletedMany,
  //   isLoading: isLoadingDeletedMany,
  //   isSuccess: isSuccessDeletedMany,
  //   isError: isErrorDeletedMany,
  // } = mutationDeleteMany;

  // const handleDeleteManyUser = (ids) => {
  //   console.log(ids); // ids là tất cả các id mà muốn xoá
  //   mutationDeleteMany.mutate(
  //     { ids: ids, token: user?.access_token },
  //     {
  //       //onSettled & queryProduct.refetch() nó mới cập nhật lại không cần load lại trang
  //       onSettled: () => {
  //         queryUser.refetch();
  //       },
  //     }
  //   );
  // };

  // useEffect(() => {
  //   if (isSuccessDeleted && dataDeleted?.status === "OK") {
  //     success();
  //     handleCanelDelete();
  //   } else if (isErrorDeleted) {
  //     error();
  //   }
  // }, [isSuccessDeleted]);

  // useEffect(() => {
  //   if (isSuccessDeletedMany && dataDeletedMany?.status === "OK") {
  //     success();
  //     // onClose();
  //   } else if (isErrorDeletedMany) {
  //     error();
  //   }
  // }, [isSuccessDeletedMany]);

  // --------------

  const getAllOrder = async () => {
    const res = await OrderServices.getAllOrder(user?.access_token);
    return res;
  };

  const queryOrder = useQuery(["order"], getAllOrder);
  const { data: dataOrder, isLoading: isLoadingOrder } = queryOrder;

  // const handleCanelDelete = () => {
  //   setIsModelOpenDelete(false);
  // };

  // const handleDeleteUser = () => {
  //   mutationDelete.mutate(
  //     { id: rowSelected, token: user?.access_token },
  //     {
  //       //onSettled & queryUser.refetch() nó mới cập nhật lại không cần load lại trang
  //       onSettled: () => {
  //         queryUser.refetch();
  //       },
  //     }
  //   );
  // };

  // const renderAction = () => {
  //   return (
  //     <div>
  //       <MdDeleteOutline
  //         style={{ cursor: "pointer", fontSize: "24px" }}
  //         onClick={() => {
  //           setIsModelOpenDelete(true);
  //           console.log("da ok");
  //         }}
  //       />
  //     </div>
  //   );
  // };

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    // setSearchText(selectedKeys[0])
    // setSearchedColumn(dataIndex)
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    // setSearchText('')
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            <CloseOutlined />
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });

  const columns = [
    {
      title: "Thông tin người nhận",
      dataIndex: "recevierInfomation",
      ...getColumnSearchProps("recevierInfomation"),
    },
    {
      title: "Sản phẩm",
      dataIndex: "productInformation",
      ...getColumnSearchProps("productInformation"),
    },
    {
      title: "Phí giao hàng",
      dataIndex: "shippingfee",
    },
    {
      title: "Tổng tiền",
      dataIndex: "RenderTotalprice",
      sorter: (a, b) => a.totalPrice - b.totalPrice,
    },
    {
      title: "Giao hàng",
      dataIndex: "deliverystatus",
      filters: [
        {
          text: "NOT",
          value: "NOT",
        },
        {
          text: "DELIVERING",
          value: "DELIVERING",
        },
        {
          text: "YES",
          value: "YES",
        },
      ],
    },
    {
      title: "Thanh toán",
      dataIndex: "paided",
      filters: [
        {
          text: "True",
          value: "TRUE",
        },
        {
          text: "False",
          value: "FALSE",
        },
      ],
    },
  ];
  const dataTable =
    dataOrder?.data?.length &&
    dataOrder?.data?.map((order) => {
      return {
        key: order._id,
        recevierInfomation: (
          <div>
            <div>
              <b style={{ marginRight: "10px" }}>Name:</b>{" "}
              {order?.shippingAddres.fullName}
            </div>
            {/* <div>{order?.shippingAddres.email}</div> */}
            <div>
              <b style={{ marginRight: "10px" }}>Address:</b>{" "}
              {order?.shippingAddres.address}
            </div>
            <div>
              <b style={{ marginRight: "10px" }}>Phone:</b>{" "}
              {order?.shippingAddres.phone}
            </div>
          </div>
        ),
        address: order?.shippingAddres.address,
        totalPrice: order?.totalPrice,
        shippingfee: order?.shippingPrice
          ? convertPrice(order?.shippingPrice)
          : order?.shippingPrice + " đ",
        RenderTotalprice: convertPrice(order?.totalPrice),
        deliverystatus: order?.DeliveryStatus,
        paided: order?.isPaid ? "TRUE" : "FALSE",
        productInformation: order?.orderItems.map((item) => {
          return (
            <div>
              {item?.name} <b>SL:</b> {item?.amount} <b>Price:</b>{" "}
              {convertPrice(item?.price)}
            </div>
          );
        }),
      };
    });
  return (
    <>
      <h1 style={{ textTransform: "uppercase", margin: "10px 0 20px 0" }}>
        Quản lí đơn hàng
      </h1>
      <div className="adminProduct">
        <div style={{ height: "200px", width: "100%" }}>
          <PieChartComponent data={dataOrder?.data} />
        </div>
        {/* )} */}
        <div className="body-product">
          <TabelComponents
            // handleDeleteManyProduct={handleDeleteManyUser}
            columns={columns}
            dataTable={dataTable}
            products={dataOrder?.data}
            isLoading={isLoadingOrder}
            filename="Order Table"
            sheet="Order"
            text="đơn hàng"
            onRow={(record, rowIndex) => {
              return {
                onClick: () => {
                  setRowSelected(record._id);
                },
              };
            }}
          />
        </div>

        {/* <div>
          <ModelComponent
            title="Xoá người dùng"
            isModalOpen={isModelOpenDelete}
            onCancel={handleCanelDelete}
            onOk={handleDeleteUser}
          >
            <LoadingComponents isLoading={isLoadingDeleted}>
              <div>Bạn có chắc muốn xoá người dùng này không?</div>
            </LoadingComponents>
          </ModelComponent>
        </div> */}
      </div>
    </>
  );
};

export default AdminOrder;
