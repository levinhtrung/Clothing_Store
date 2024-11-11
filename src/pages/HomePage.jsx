import React, { useEffect, useRef, useState } from "react";
import CardComponents from "../components/CardComponents";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useQuery } from "@tanstack/react-query";
import * as ProductServices from "../services/ProductServices";
import LoadingCardComponent from "../components/LoadingCardComponent";
import LoadingComponents from "../components/LoadingComponents";
import SlideAnNavComponent from "../components/SlideAndNavComponent";

const HomePage = () => {
  const limitState = 16;
  const [limit, setLimit] = useState(limitState);

  let lengthProducts = limitState;
  const arrayProducts = [];
  for (let i = 1; i <= lengthProducts; i++) {
    arrayProducts.push(i);
  }

  const fetchProductAll = async (context) => {
    const limit = context?.queryKey && context?.queryKey[1];
    const res = await ProductServices.getAllProduct(limit);
    return res;
  };

  const {
    isLoading: isLoading,
    data: products,
    isPreviousData,
  } = useQuery(["product", limit], fetchProductAll, {
    retry: 3,
    retryDelay: 0,
    keepPreviousData: true,
  });
  //   keepPreviousData: giữ lại product cũ, load những cái mới thôi
  // console.log("isPreviousDataNam", isPreviousData); //loading

  const [arrType, setArrType] = useState([]);
  const [loadingType, setLoadingType] = useState(true);
  const fetchAllType = async () => {
    setLoadingType(true);
    const res = await ProductServices.getAllType();
    if (res?.status === "OK") {
      setArrType(res?.data);
      setLoadingType(false);
    }
  };
  useEffect(() => {
    fetchAllType();
  }, []);

  return (
    <div className="home">
      <Row className="content">
        <Col xxl={12} xl={12} className="col-slide">
          {/* <div className="slide">
              <SlideComponents arrImages={[slide7, slide8, slide9]} />
              <Col xxl={2} xl={2} className="_navbar">
                <div>
                  {!loadingType && <NavbarComponents arrType={arrType} />}
                </div>
              </Col>
            </div> */}
          <SlideAnNavComponent arrType={arrType} loadingType={loadingType} />

          <div className="product">
            <div style={{ textAlign: "center", width: "100%" }}>
              <h1 className="text-type">Sản phẩm mới</h1>
            </div>
            <LoadingCardComponent
              isLoading={isLoading}
              arrayProducts={arrayProducts}
            />
            {!isLoading && (
              <Row>
                {products?.data?.map((product) => {
                  return (
                    <Col
                      xxl={3}
                      xl={3}
                      lg={4}
                      md={4}
                      sm={6}
                      xs={6}
                      key={product._id}
                    >
                      {/* <a href="/product-details"> */}
                      <CardComponents
                        id={product._id}
                        countInstock={product.countInstock}
                        description={product.description}
                        image={product.image}
                        name={product.name}
                        price={product.price}
                        rating={product.rating}
                        gender={product.gender}
                        discount={product.discount}
                        selled={product.selled}
                        age={product.age}
                        size={product.size}
                      />
                      {/* </a> */}
                    </Col>
                  );
                })}
              </Row>
            )}
            {/* ---- */}

            <div
              style={{
                width: "100%",
                textAlign: "center",
                marginTop: 20,
              }}
            >
              {isPreviousData && (
                <div style={{ height: 50 }}>
                  <LoadingComponents isLoading={isPreviousData} />
                </div>
              )}
              {products?.totalPage !== 1 &&
                // soluongPage !== 1 &&
                !isLoading &&
                !isPreviousData && (
                  <div className="see-more">
                    <Button
                      // disabled={
                      //   isPreviousDataNam ||
                      //   products?.totalProduct === products?.data.length
                      // }
                      onClick={() => setLimit((prev) => prev + 16)}
                      variant="outline-primary"
                    >
                      Xem thêm
                    </Button>{" "}
                  </div>
                )}
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default HomePage;
