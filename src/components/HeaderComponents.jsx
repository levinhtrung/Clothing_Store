import React, { useEffect, useRef, useState } from "react";
import logo from "../public/img/logo2.jpg";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";
import { FiSearch, FiHeart } from "react-icons/fi";
import { BsCart2 } from "react-icons/bs";
import CameraComponents from "./CameraComponents";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Dropdown from "react-bootstrap/Dropdown";
import * as UserServcie from "../services/userServices";
import { resetUser } from "../redux/slices/userSlice";
import LoadingCardInfoComponent from "./LoadingCardInfoComponent";
import { searchProduct } from "../redux/slices/productSlice";
import { useQuery } from "@tanstack/react-query";
import * as CartServices from "../services/CartServices";
import { Drawer } from "antd";
import { RiMenu2Line } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
import LoadingFullComponents from "./LoadingFullComponents";

const HeaderComponents = (props) => {
  const order = useSelector((state) => state.order);

  const navigate = useNavigate();
  const handleNavigateLogin = () => {
    navigate("/sign-in");
  };

  const user = useSelector((state) => state.user);

  if (user?.email) {
    const dataEmail = user?.email;
    localStorage.setItem("email", JSON.stringify(dataEmail));
  }

  useEffect(() => {
    if (user?.access_token && user?.id === undefined) {
      localStorage.setItem("email", JSON.stringify(false));
    }
  }, []);
  let storageEmail = localStorage.getItem("email");

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [loadingLogOut, setLoadingLogOut] = useState(false);
  const handleLogout = async () => {
    setLoadingLogOut(true);
    const res = await UserServcie.logoutUser();
    if (res.status === "OK") {
      dispatch(resetUser());
      setAmountCart(0);
      navigate("/");
    }
    localStorage.setItem("email", JSON.stringify(false));
    setLoadingLogOut(false);
  };

  const [userName, setUserName] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  useEffect(() => {
    setLoading(true);
    setUserName(user?.name);
    setUserAvatar(user?.avatar);
    setLoading(false);
  }, [user?.name, user?.avatar]);

  const [value, setValue] = useState("");
  const [search, setSearch] = useState("");
  const onSearch = (e) => {
    setSearch(e.target.value);
    setValue(e.target.value);
  };

  const searchStorage = localStorage.getItem("search");

  const BtnSearchProduct = () => {
    if (search?.trim()) {
      dispatch(searchProduct(search));
      if (search?.trim() !== searchStorage?.trim()) {
        navigate("/product-search");
        localStorage.setItem("search", search);
        console.log("searchsearch", search);
        setValue("");
      } else {
        navigate("/product-search");
      }
      onCloseSearch();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      BtnSearchProduct();
      onCloseSearch();
    }
  };

  const handleOrderCart = (type) => {
    navigate("/order", {
      state: {
        id: user?.id,
        token: user?.access_token,
      },
    });
  };

  const handleClickNavigate = (type) => {
    navigate("/my-order", {
      state: {
        id: user?.id,
        token: user?.access_token,
      },
    });
  };

  const location = useLocation();
  const { state } = location;

  const [amountCart, setAmountCart] = useState(0);
  const fetchOrderCart = async () => {
    if (user?.email) {
      const res = await CartServices.getCartByUserId(
        user?.id,
        user?.access_token
      );
      return res?.data;
    }
  };
  const queryCart = useQuery(["cart"], fetchOrderCart);
  const { data: dataCart, isLoading: isLoadingCart } = queryCart;

  useEffect(() => {
    if (user?.email) {
      setAmountCart(dataCart?.length);
    }
  }, [dataCart]);

  const classOnScroll = props?.class;

  const fetchAllCart = async () => {
    if (user?.email) {
      const res = await CartServices.getCartByUserId(
        user?.id,
        user?.access_token
      );
      if (res?.status === "OK" && user?.email) {
        setAmountCart(res?.data?.length);
      }
    }
  };
  useEffect(() => {
    fetchAllCart();
  }, [user?.email]);

  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const [openSearch, setOpenSearch] = useState(false);
  const showDrawerSearch = () => {
    setOpenSearch(true);
  };
  const onCloseSearch = () => {
    setOpenSearch(false);
  };

  return (
    <>
      <LoadingFullComponents isLoading={loading} />
      <div className={classOnScroll}>
        <Navbar className="justify-content-between">
          {/* <Toaster /> */}
          <Container>
            <Row className="align-items_center">
              <Col
                sm={2}
                xs={2}
                style={{ display: "none" }}
                className="openMobile"
              >
                <div
                  type="primary"
                  onClick={showDrawer}
                  style={{ fontSize: 20 }}
                >
                  <RiMenu2Line />
                </div>
                <Drawer
                  title="Menu"
                  placement="left"
                  onClose={onClose}
                  open={open}
                  style={{ width: "40%" }}
                >
                  <Nav className="me-auto">
                    <Nav.Link className="item" href="/product/nam">
                      Nam
                    </Nav.Link>
                    <Nav.Link className="item" href="/product/nu">
                      Nữ
                    </Nav.Link>
                    <Nav.Link
                      className="item"
                      href="/product/best"
                      style={{ color: "red" }}
                    >
                      Best
                    </Nav.Link>
                  </Nav>
                </Drawer>
              </Col>
              <Col
                xxl={1}
                xl={1}
                lg={1}
                md={1}
                sm={1}
                xs={5}
                className="logoMobile"
              >
                <Navbar.Brand href="/">
                  <img src={logo} alt="logo" className="logo" />
                </Navbar.Brand>
              </Col>
              <Col
                xxl={5}
                xl={5}
                lg={5}
                md={5}
                sm={5}
                xs={5}
                className="center align-items_center"
              >
                <Nav className="me-auto">
                  <Nav.Link className="item" href="/product/nam">
                    Nam
                  </Nav.Link>
                  <Nav.Link className="item" href="/product/nu">
                    Nữ
                  </Nav.Link>
                  <Nav.Link
                    className="item"
                    href="/product/best"
                    style={{ color: "red" }}
                  >
                    Best
                  </Nav.Link>
                </Nav>
              </Col>
              <Col
                xxl={6}
                xl={6}
                lg={6}
                md={6}
                sm={5}
                xs={5}
                className="right "
              >
                <Form className="d-flex form align-items_center">
                  <CameraComponents />
                  <div className="search">
                    <Button
                      variant="outline-success"
                      className="align-items_center"
                      onClick={BtnSearchProduct}
                    >
                      <FiSearch />
                    </Button>
                    <Form.Control
                      // type="search"
                      value={value}
                      placeholder="Tìm kiếm"
                      className="me-2"
                      aria-label="Search"
                      onChange={onSearch}
                      onKeyDown={handleKeyDown}
                    />
                  </div>
                  <div className="searchMobile" style={{ display: "none" }}>
                    {/* <Space> */}
                    <div onClick={showDrawerSearch} style={{ fontSize: 20 }}>
                      <FiSearch />
                    </div>
                    {/* </Space> */}
                    <Drawer
                      // title="Basic Drawer"
                      placement="top"
                      closable={false}
                      onClose={onCloseSearch}
                      open={openSearch}
                      key="top"
                      style={{ minWidth: "100vw", height: "60%" }}
                    >
                      <div className="modalSearchMobile">
                        <a className="item" href="/product/nam">
                          Nam
                        </a>
                        <span>|</span>
                        <a className="item" href="/product/nu">
                          Nữ
                        </a>
                        <span>|</span>
                        <a
                          className="item"
                          href="/product/best"
                          style={{ color: "red" }}
                        >
                          Best
                        </a>
                        <div className="closeSearchMobile">
                          <IoMdClose onClick={onCloseSearch} />
                        </div>
                      </div>
                      <div className="searchInput">
                        <Button
                          variant="outline-success"
                          className="align-items_center"
                          onClick={BtnSearchProduct}
                        >
                          <FiSearch />
                        </Button>
                        <Form.Control
                          value={value}
                          placeholder="Tìm kiếm"
                          className="me-2"
                          aria-label="Search"
                          onChange={onSearch}
                          onKeyDown={handleKeyDown}
                        />
                      </div>
                    </Drawer>
                  </div>
                  {/* <FiHeart className="icon heart" /> */}
                  <Button className="btn-cart" onClick={handleOrderCart}>
                    {amountCart && <Badge bg="warning">{amountCart}</Badge>}
                    <BsCart2 className="icon cart" />
                  </Button>
                  <div className="info-user">
                    {user?.email ? (
                      <Dropdown style={{ width: "70px" }}>
                        <Dropdown.Toggle variant="" id="dropdown-basic">
                          {userAvatar ? (
                            <img
                              className="avatar"
                              src={userAvatar}
                              alt="avatar"
                              style={{ width: "50px" }}
                            />
                          ) : (
                            <img
                              className="avatar"
                              src="https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png"
                              alt=""
                              style={{ width: "30px" }}
                            />
                            // undefined
                          )}
                          <div className="textName">
                            {/* {userName || user.email || "User"} */}
                            {userName || user.email?.split("@")[0]}
                          </div>
                        </Dropdown.Toggle>
                        <Dropdown.Menu
                          style={{ left: "-100%", fontSize: "13px" }}
                        >
                          {user?.isAdmin && (
                            <Dropdown.Item href="/system/admin">
                              Trang chủ ADMIN
                            </Dropdown.Item>
                          )}
                          <Dropdown.Item href="/profile-user">
                            Thông tin người dùng
                          </Dropdown.Item>
                          <Dropdown.Item href="" onClick={handleClickNavigate}>
                            Đơn hàng của tôi
                          </Dropdown.Item>
                          <Dropdown.Divider />
                          <Dropdown.Item onClick={handleLogout} href="#">
                            Đăng xuất
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    ) : (
                      <>
                        {storageEmail && storageEmail !== "false" ? (
                          <div>
                            <LoadingCardInfoComponent></LoadingCardInfoComponent>
                          </div>
                        ) : (
                          <>
                            <Button
                              onClick={handleNavigateLogin}
                              className="btn-sign"
                              variant=""
                            >
                              Đăng nhập <br /> Đăng ký
                            </Button>

                            <Button
                              onClick={handleNavigateLogin}
                              style={{ display: "none" }}
                              className="btn-signMobile"
                              variant=""
                            >
                              Đăng Nhập
                            </Button>
                          </>
                        )}
                      </>
                    )}
                  </div>
                </Form>
              </Col>
            </Row>
          </Container>
        </Navbar>
      </div>
      <div className="noneMoblie" style={{ height: 80 }}></div>
    </>
  );
};

export default HeaderComponents;
