import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import * as ProducttServcie from "../services/ProductServices";
import { useLocation, useNavigate } from "react-router-dom";
import { convertPrice } from "../utils";
import { useMutationHook } from "../hooks/useMutationHook";
import * as CartServices from "../services/CartServices";
import { success, error, warning } from "../components/Message";
import LoadingProductDetailsComponent from "../components/LoadingProductDetailsComponent";
import { Toaster } from "react-hot-toast";
import { Button, Modal } from "antd";
import { TfiRulerAlt } from "react-icons/tfi";
import BangSizeAo from "../public/img/BangSIzeAo.png";
import BangSizeQuan from "../public/img/BangSizeQuan.png";
import LoadingFullComponents from "../components/LoadingFullComponents";
import LoadingComponents from "../components/LoadingComponents";
import ModelComponent from "../components/ModelComponent";

const ProductDetailsPage = () => {
  const { id: idProduct } = useParams();
  const user = useSelector((state) => state.user);

  const fetchGetDetailsProduct = async (context) => {
    const id = context?.queryKey && context?.queryKey[1];
    if (id) {
      const res = await ProducttServcie.getDetailsProduct(id);
      return res.data;
    }
  };
  const { isLoading, data: productDetails } = useQuery(
    ["products-details", idProduct],
    fetchGetDetailsProduct,
    {
      enabled: !!idProduct,
    }
  );

  const images = {
    img1: productDetails?.image,
    img2: productDetails?.imageDetails?.image1,
    img3: productDetails?.imageDetails?.image2,
    img4: productDetails?.imageDetails?.image3,
  };

  const [quantity, setQuantity] = useState();

  const className = "w-24 h-24 rounded-md cursor-pointer img-đetails img-3";
  const classNameActive =
    "w-24 h-24 rounded-md cursor-pointer img-đetails img-3 active";

  const [activeImg, setActiveImage] = useState(images.img1);

  const [className1, setClassName1] = useState(classNameActive);
  const [className2, setClassName2] = useState(className);
  const [className3, setClassName3] = useState(className);
  const [className4, setClassName4] = useState(className);

  const setClassName = () => {
    setClassName1(className);
    setClassName2(className);
    setClassName3(className);
    setClassName4(className);
  };

  const handleImg1 = () => {
    setActiveImage(images.img1);
    setClassName();
    setClassName1(classNameActive);
  };

  const handleImg2 = () => {
    setActiveImage(images.img2);
    setClassName();
    setClassName2(classNameActive);
  };

  const handleImg3 = () => {
    setActiveImage(images.img3);
    setClassName();
    setClassName3(classNameActive);
  };

  const handleImg4 = () => {
    setActiveImage(images.img4);
    setClassName();
    setClassName4(classNameActive);
  };

  const [amount, setAmount] = useState(1);

  // size
  const classNameSize = "size-item";
  const classNameSizeDisbled = "size-item disbled";
  const classNameSizeActive = "size-item active";

  const [size, setSize] = useState();

  const [classNameSizeS, setClassNameSizeS] = useState(classNameSize);
  const [classNameSizeM, setClassNameSizeM] = useState(classNameSize);
  const [classNameSizeL, setClassNameSizeL] = useState(classNameSize);
  const [classNameSizeXL, setClassNameSizeXL] = useState(classNameSize);
  const [classNameSizeXXL, setClassNameSizeXXL] = useState(classNameSize);

  const [classNameSize28, setClassNameSize28] = useState(classNameSize);
  const [classNameSize29, setClassNameSize29] = useState(classNameSize);
  const [classNameSize30, setClassNameSize30] = useState(classNameSize);
  const [classNameSize31, setClassNameSize31] = useState(classNameSize);
  const [classNameSize32, setClassNameSize32] = useState(classNameSize);
  const [classNameSize33, setClassNameSize33] = useState(classNameSize);
  const [classNameSize34, setClassNameSize34] = useState(classNameSize);
  const [classNameSize35, setClassNameSize35] = useState(classNameSize);
  const [classNameSize36, setClassNameSize36] = useState(classNameSize);

  const setClassNameSize = () => {
    setClassNameSizeS(classNameSize);
    setClassNameSizeM(classNameSize);
    setClassNameSizeL(classNameSize);
    setClassNameSizeXL(classNameSize);
    setClassNameSizeXXL(classNameSize);

    setClassNameSize28(classNameSize);
    setClassNameSize29(classNameSize);
    setClassNameSize30(classNameSize);
    setClassNameSize31(classNameSize);
    setClassNameSize32(classNameSize);
    setClassNameSize33(classNameSize);
    setClassNameSize34(classNameSize);
    setClassNameSize35(classNameSize);
    setClassNameSize36(classNameSize);
  };

  const handleSizeS = () => {
    setClassNameSize();
    setClassNameSizeS(classNameSizeActive);
    setSize("S");
    setQuantity(productDetails?.quantity?.sizeS);
  };

  const handleSizeM = () => {
    setClassNameSize();
    setClassNameSizeM(classNameSizeActive);
    setSize("M");
    setQuantity(productDetails?.quantity?.sizeM);
  };

  const handleSizeL = () => {
    setClassNameSize();
    setClassNameSizeL(classNameSizeActive);
    setSize("L");
    setQuantity(productDetails?.quantity?.sizeL);
  };

  const handleSizeXL = () => {
    setClassNameSize();
    setClassNameSizeXL(classNameSizeActive);
    setSize("XL");
    setQuantity(productDetails?.quantity?.sizeXL);
  };

  const handleSizeXXL = () => {
    setClassNameSize();
    setClassNameSizeXXL(classNameSizeActive);
    setSize("XXL");
    setQuantity(productDetails?.quantity?.sizeXXL);
  };

  const handleSize28 = () => {
    setClassNameSize();
    setClassNameSize28(classNameSizeActive);
    setSize("28");
    setQuantity(productDetails?.quantity?.size28);
  };

  const handleSize29 = () => {
    setClassNameSize();
    setClassNameSize29(classNameSizeActive);
    setSize("29");
    setQuantity(productDetails?.quantity?.size29);
  };

  const handleSize30 = () => {
    setClassNameSize();
    setClassNameSize30(classNameSizeActive);
    setSize("30");
    setQuantity(productDetails?.quantity?.size30);
  };

  const handleSize31 = () => {
    setClassNameSize();
    setClassNameSize31(classNameSizeActive);
    setSize("31");
    setQuantity(productDetails?.quantity?.size31);
  };

  const handleSize32 = () => {
    setClassNameSize();
    setClassNameSize32(classNameSizeActive);
    setSize("32");
    setQuantity(productDetails?.quantity?.size32);
  };

  const handleSize33 = () => {
    setClassNameSize();
    setClassNameSize33(classNameSizeActive);
    setSize("33");
    setQuantity(productDetails?.quantity?.size33);
  };

  const handleSize34 = () => {
    setClassNameSize();
    setClassNameSize34(classNameSizeActive);
    setSize("34");
    setQuantity(productDetails?.quantity?.size34);
  };

  const handleSize35 = () => {
    setClassNameSize();
    setClassNameSize35(classNameSizeActive);
    setSize("35");
    setQuantity(productDetails?.quantity?.size35);
  };

  const handleSize36 = () => {
    setClassNameSize();
    setClassNameSize36(classNameSizeActive);
    setSize("36");
    setQuantity(productDetails?.quantity?.size36);
  };

  // ----

  const navigate = useNavigate();
  const location = useLocation();

  const mutationAddCart = useMutationHook((data) => {
    const { userId, token, ...rest } = data;
    const res = CartServices.createCart(userId, token, { ...rest }); //rest or {...rest}
    return res;
  });

  const {
    isLoading: isLoadingAddCart,
    data: dataAddCart,
    isSuccess: isSuccessAddCart,
    isError: isErrorAddCart,
  } = mutationAddCart;

  const [amountCart, setAmountCart] = useState(0);
  const fetchOrderCart = async () => {
    // console.log('loading cart true')
    const res = await CartServices.getCartByUserId(
      user?.id,
      user?.access_token
    );
    setAmountCart(res?.data?.length);
  };

  useEffect(() => {
    if (isSuccessAddCart && dataAddCart?.status === "OK") {
      success("Bạn đã thêm vào giỏ hàng thành công");
      fetchOrderCart();
      setTimeout(() => {
        navigate("/order", {
          state: {
            id: user?.id,
            token: user?.access_token,
          },
        });
      }, 0);
      // dispatch(
      //   addOrderProduct({
      //     orderItem: {
      //       name: productDetails?.name,
      //       amount: amount,
      //       size: size,
      //       image: productDetails?.image,
      //       price: productDetails?.price,
      //       product: productDetails?._id,
      //       userId: user?.id,
      //     },
      //   })
      // );
    } else if (isErrorAddCart) {
      error("Bạn đã thêm vào giỏ hàng thất bại");
    }
  }, [isSuccessAddCart, isErrorAddCart]);

  const [isModelOpen, setIsModelOpen] = useState(false);

  const handleOkSign = () => {
    navigate("/sign-in", { state: location?.pathname }); // login xong trở về lại trang lúc nảy
  };

  const handleCanel = () => {
    setIsModelOpen(false);
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleOkSign();
    }
  };

  const hanleAddOrder = () => {
    if (!user?.id) {
      setIsModelOpen(true);
    } else {
      if (
        productDetails?.name &&
        amount &&
        size &&
        productDetails?.image &&
        productDetails?.price &&
        productDetails?.type &&
        user?.id &&
        idProduct
      ) {
        mutationAddCart.mutate({
          name: productDetails?.name,
          amount: amount,
          size: size,
          image: productDetails?.image,
          price: productDetails?.price,
          type: productDetails?.type,
          userId: user?.id,
          productId: idProduct,
        });
      }
    }
  };

  const [noSize, setNoSize] = useState(false);
  const hanleAddOrderNoSize = () => {
    setNoSize(true);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    window.scrollTo(0, 1);
  }, []);

  return (
    <>
      <LoadingFullComponents isLoading={isLoadingAddCart} />
      <Toaster />
      <div className="produc-details">
        <span className="noneMobile">
          <LoadingProductDetailsComponent isLoading={isLoading} />
        </span>
        <span style={{ display: "none" }} className="blockMobile">
          <LoadingComponents isLoading={isLoading} />
        </span>
        {!isLoading && (
          <div className="flex flex-col justify-between lg:flex-row gap-16 lg:items-center container">
            <div className="flex flex-col gap-6 lg:w-2/4 img-main">
              <img
                src={activeImg || images.img1}
                alt=""
                className="w-full h-full aspect-square object-cover rounded-xl img-đetails img-1"
              />
              <div className="flex flex-row justify-between h-24 img-anhphu">
                <img
                  src={images.img1}
                  alt=""
                  className={className1}
                  onClick={() => handleImg1()}
                />
                <img
                  src={images.img2}
                  alt=""
                  className={className2}
                  onClick={() => handleImg2()}
                />
                <img
                  src={images.img3}
                  alt=""
                  className={className3}
                  onClick={() => handleImg3()}
                />
                <img
                  src={images.img4}
                  alt=""
                  className={className4}
                  onClick={() => handleImg4()}
                />
              </div>
            </div>
            {/* ABOUT */}
            <div className="flex flex-col gap-4 lg:w-2/4 notify">
              <div>
                <h1 className="text-3xl font-bold name">
                  {productDetails?.name}
                </h1>
              </div>
              <div>
                <h5 className="text-2xl font-semibold gia">
                  {convertPrice(productDetails?.price)}
                </h5>
              </div>

              <div className="size">
                <div className="size-text">
                  <p style={{ width: 130 }}>
                    Chọn size: <span>{size}</span>
                  </p>
                  <div style={{ marginLeft: 200 }} className="bangSize">
                    <p
                      className="text-bangSize"
                      type="primary"
                      onClick={showModal}
                    >
                      <TfiRulerAlt /> Bảng size
                    </p>
                    <Modal
                      title="Bảng size"
                      open={isModalOpen}
                      // onOk={handleOk}
                      onCancel={handleCancel}
                    >
                      {productDetails?.name.toLowerCase().includes("quần") &&
                      !productDetails?.name.toLowerCase().includes("áo") ? (
                        <img
                          style={{ width: "100%" }}
                          src={BangSizeQuan}
                          alt=""
                        />
                      ) : (
                        <img
                          style={{ width: "100%" }}
                          src={BangSizeAo}
                          alt=""
                        />
                      )}
                    </Modal>
                  </div>
                </div>
                {productDetails?.name.toLowerCase().includes("quần") &&
                !productDetails?.name.toLowerCase().includes("áo") ? (
                  <ul className="size-list">
                    {productDetails?.quantity?.size28 ? (
                      <li
                        onClick={() => handleSize28()}
                        className={classNameSize28}
                      >
                        28
                      </li>
                    ) : (
                      <li className={classNameSizeDisbled}>28</li>
                    )}
                    {productDetails?.quantity?.size29 ? (
                      <li
                        onClick={() => handleSize29()}
                        className={classNameSize29}
                      >
                        29
                      </li>
                    ) : (
                      <li className={classNameSizeDisbled}>29</li>
                    )}
                    {productDetails?.quantity?.size30 ? (
                      <li
                        onClick={() => handleSize30()}
                        className={classNameSize30}
                      >
                        30
                      </li>
                    ) : (
                      <li className={classNameSizeDisbled}>30</li>
                    )}
                    {productDetails?.quantity?.size31 ? (
                      <li
                        onClick={() => handleSize31()}
                        className={classNameSize31}
                      >
                        31
                      </li>
                    ) : (
                      <li className={classNameSizeDisbled}>31</li>
                    )}
                    {productDetails?.quantity?.size32 ? (
                      <li
                        onClick={() => handleSize32()}
                        className={classNameSize32}
                      >
                        32
                      </li>
                    ) : (
                      <li className={classNameSizeDisbled}>32</li>
                    )}
                    {productDetails?.quantity?.size33 ? (
                      <li
                        onClick={() => handleSize33()}
                        className={classNameSize33}
                      >
                        33
                      </li>
                    ) : (
                      <li className={classNameSizeDisbled}>33</li>
                    )}
                    {productDetails?.quantity?.size34 ? (
                      <li
                        onClick={() => handleSize34()}
                        className={classNameSize34}
                      >
                        34
                      </li>
                    ) : (
                      <li className={classNameSizeDisbled}>34</li>
                    )}
                    {productDetails?.quantity?.size35 ? (
                      <li
                        onClick={() => handleSize35()}
                        className={classNameSize35}
                      >
                        35
                      </li>
                    ) : (
                      <li className={classNameSizeDisbled}>35</li>
                    )}
                    {productDetails?.quantity?.size36 ? (
                      <li
                        onClick={() => handleSize36()}
                        className={classNameSize36}
                      >
                        36
                      </li>
                    ) : (
                      <li className={classNameSizeDisbled}>36</li>
                    )}
                  </ul>
                ) : (
                  <ul className="size-list">
                    {productDetails?.quantity?.sizeS ? (
                      <li
                        onClick={() => handleSizeS()}
                        className={classNameSizeS}
                      >
                        S
                      </li>
                    ) : (
                      <li className={classNameSizeDisbled}>S</li>
                    )}
                    {productDetails?.quantity?.sizeM ? (
                      <li
                        onClick={() => handleSizeM()}
                        className={classNameSizeM}
                      >
                        M
                      </li>
                    ) : (
                      <li className={classNameSizeDisbled}>M</li>
                    )}
                    {productDetails?.quantity?.sizeL ? (
                      <li
                        onClick={() => handleSizeL()}
                        className={classNameSizeL}
                      >
                        L
                      </li>
                    ) : (
                      <li className={classNameSizeDisbled}>L</li>
                    )}
                    {productDetails?.quantity?.sizeXL ? (
                      <li
                        onClick={() => handleSizeXL()}
                        className={classNameSizeXL}
                      >
                        XL
                      </li>
                    ) : (
                      <li className={classNameSizeDisbled}>XL</li>
                    )}
                    {productDetails?.quantity?.sizeXXL ? (
                      <li
                        onClick={() => handleSizeXXL()}
                        className={classNameSizeXXL}
                      >
                        XXL
                      </li>
                    ) : (
                      <li className={classNameSizeDisbled}>XXL</li>
                    )}
                  </ul>
                )}
              </div>

              <div
                class="fb-comments"
                data-href="https://developers.facebook.com/docs/plugins/comments#configurator"
                data-width=""
                data-numposts="5"
              ></div>
              <div className="flex flex-row items-center gap-12 choose">
                <div className="flex flex-row items-center cangiua">
                  {amount === 1 ? (
                    <button className="bg-gray-200 px-4 rounded-lg text-violet-800 text-3xl congtru">
                      -
                    </button>
                  ) : (
                    <button
                      className="bg-gray-200 px-4 rounded-lg text-violet-800 text-3xl congtru"
                      onClick={() => setAmount((prev) => prev - 1)}
                    >
                      -
                    </button>
                  )}
                  <span className="px-6 rounded-lg number">{amount}</span>
                  <button
                    className="bg-gray-200 px-4 rounded-lg text-violet-800 text-3xl congtru"
                    onClick={() => setAmount((prev) => prev + 1)}
                  >
                    +
                  </button>
                </div>
                {size ? (
                  <>
                    <button
                      onClick={hanleAddOrder}
                      className="bg-violet-800 text-white font-semibold py-3 px-16 rounded-xl h-full add"
                    >
                      Thêm vào giỏ hàng
                    </button>
                  </>
                ) : (
                  <div style={{ position: "relative" }}>
                    <div
                      style={{
                        position: "absolute",
                        top: -30,
                        left: "50%",
                        transform: "translateX(-50%)",
                      }}
                    >
                      {noSize && !size && (
                        <p style={{ color: "red", fontSize: "14px" }}>
                          Vui lòng chọn size
                        </p>
                      )}
                    </div>
                    <button
                      onClick={hanleAddOrderNoSize}
                      className="bg-violet-800 text-white font-semibold py-3 px-16 rounded-xl h-full add"
                    >
                      Thêm vào giỏ hàng
                    </button>
                  </div>
                )}
                {/* <FiHeart className="iconHeart" /> */}
              </div>
              <p
                style={{
                  fontSize: "12px",
                  color: "#555",
                  marginTop: 10,
                  height: 15,
                }}
              >
                {size && <span>Còn lại: {quantity} sản phẩm</span>}
              </p>
              <p
                style={{ fontSize: "16px", fontStyle: "italic", marginTop: 20 }}
              >
                Đã bán: {productDetails?.selled} sản phẩm
              </p>
              <div className="product-info-bottom">
                <ul className="product-info-list">
                  <li className="product-info-item">
                    <div className="icon">
                      <img
                        src="https://routine.vn/static/version1701421172/frontend/Magenest/routine/vi_VN/images/ghn.png"
                        alt=""
                      />{" "}
                    </div>
                    <div className="text">
                      <h4>Giao hàng nhanh</h4>
                      <p>Từ 3-5 ngày</p>
                    </div>
                  </li>
                  <li className="product-info-item">
                    <div className="icon">
                      <img
                        src="https://routine.vn/static/version1701421172/frontend/Magenest/routine/vi_VN/images/free.png"
                        alt=""
                      />{" "}
                    </div>
                    <div className="text">
                      <h4>Miễn phí vận chuyển</h4>
                      <p>Đơn hàng từ 800k</p>
                    </div>
                  </li>
                  <li className="product-info-item">
                    <div className="icon">
                      <img
                        src="https://routine.vn/static/version1701421172/frontend/Magenest/routine/vi_VN/images/order.png"
                        alt=""
                      />{" "}
                    </div>
                    <div className="text">
                      <h4>Theo dõi đơn hàng một cách dễ dàng</h4>
                    </div>
                  </li>
                  <li className="product-info-item">
                    <div className="icon">
                      <img
                        src="https://routine.vn/static/version1701421172/frontend/Magenest/routine/vi_VN/images/returns.png"
                        alt=""
                      />{" "}
                    </div>
                    <div className="text">
                      <h4>Đổi trả linh hoạt</h4>
                      <p>Với sản phẩm không áp dụng khuyến mãi</p>
                    </div>
                  </li>
                  <li className="product-info-item">
                    <div className="icon">
                      <img
                        src="https://routine.vn/static/version1701421172/frontend/Magenest/routine/vi_VN/images/pay.png"
                        alt=""
                      />{" "}
                    </div>
                    <div className="text">
                      <h4>Thanh toán dễ dàng nhiều hình thức</h4>
                    </div>
                  </li>
                  <li className="product-info-item">
                    <div className="icon">
                      <img
                        src="https://routine.vn/static/version1701421172/frontend/Magenest/routine/vi_VN/images/hotline.png"
                        alt=""
                      />{" "}
                    </div>
                    <div className="text">
                      <div>Hotline hỗ trợ</div>
                      <h4>
                        <span>03534</span> <span>54096</span>
                      </h4>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      <div onKeyDown={handleKeyDown}>
        <ModelComponent
          title="Thông báo!"
          isModalOpen={isModelOpen}
          onCancel={handleCanel}
          onOk={handleOkSign}
        >
          <div>Bạn chưa đăng nhập, đi đến đăng nhập?</div>
        </ModelComponent>
      </div>
    </>
  );
};

export default ProductDetailsPage;
