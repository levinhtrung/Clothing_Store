import React, { useState } from "react";
import * as ProductServices from "../services/ProductServices";
import LoadingCardComponent from "../components/LoadingCardComponent";
import { useQuery } from "@tanstack/react-query";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CardComponents from "../components/CardComponents";
import LoadingComponents from "../components/LoadingComponents";
import Button from "react-bootstrap/Button";
import banner from "../public/img/bannerNu.webp";

const ProductNuPage = () => {
  const limitState = 8;
  const [limit, setLimit] = useState(limitState);

  let lengthProducts = limitState;
  const arrayProducts = [];
  for (let i = 1; i <= lengthProducts; i++) {
    arrayProducts.push(i);
  }

  const fetchProductAll = async (context) => {
    const gender = context?.queryKey && context?.queryKey[0];
    const limit = context?.queryKey && context?.queryKey[1];
    const res = await ProductServices.getGenderProduct(gender, limit);
    return res;
  };

  const {
    isLoading,
    data: products,
    isPreviousData,
  } = useQuery(["nữ", limit], fetchProductAll, {
    retry: 3,
    retryDelay: 1000,
    keepPreviousData: true,
  });

  return (
    <div style={{ marginBottom: 50, minHeight: "100%" }}>
      <div style={{ width: "100%" }}>
        <img
          className="bannerNav"
          src={banner}
          alt=""
          style={{ width: "100%", height: "450px", objectFit: "cover" }}
        />
      </div>
      <div
        className="genderPage"
        style={{ textAlign: "center", width: "100%", marginTop: 60 }}
      >
        <h1 className="genderPage-text">Thời trang nữ</h1>
      </div>
      <div style={{ padding: "0 20px" }}>
        <LoadingCardComponent
          isLoading={isLoading}
          arrayProducts={arrayProducts}
        >
          <Row>
            {products?.data?.map((product) => {
              console.log("productmap", product);
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
        </LoadingCardComponent>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "15px",
        }}
      >
        <LoadingComponents isLoading={isPreviousData} />
      </div>
      <div>
        {products?.totalPage > 1 &&
          // soluongPage !== 1 &&
          !isLoading &&
          !isPreviousData && (
            <div className="see-more">
              <Button
                // disabled={
                //   isPreviousDataNam ||
                //   products?.totalProduct === products?.data.length
                // }
                onClick={() => setLimit((prev) => prev + 8)}
                variant="outline-primary"
              >
                Xem thêm
              </Button>{" "}
            </div>
          )}
      </div>
    </div>
  );
};

export default ProductNuPage;
