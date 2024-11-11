import React, { useEffect, useState } from "react";
import CardComponents from "../components/CardComponents";
import { Pagination } from "antd";
import { useLocation } from "react-router-dom";
import * as ProductServices from "../services/ProductServices";
import LoadingCardComponent from "../components/LoadingCardComponent";
import { Col, Row } from "react-bootstrap";
import SlideAnNavComponent from "../components/SlideAndNavComponent";

const TypeProductPage = () => {
  const { state } = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [panigate, setPanigate] = useState({
    page: 0,
    limit: 8,
    total: 1,
  });

  const fetchTypeProduct = async (type, page, limit) => {
    setIsLoading(true);
    const res = await ProductServices.getProductType(type, page, limit);
    if (res?.status === "OK") {
      setIsLoading(false);
      setProducts(res?.data);
      setPanigate({ ...panigate, total: res?.totalProduct });
    } else {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (state) {
      fetchTypeProduct(state, panigate?.page, panigate?.limit);
    }
  }, [state, panigate?.page, panigate?.limit]);

  const onChangePa = (current, pageSize) => {
    setPanigate({ ...panigate, page: current - 1, limit: pageSize });
  };

  const [arrType, setArrType] = useState([]);
  const fetchAllType = async () => {
    const res = await ProductServices.getAllType();
    if (res?.status === "OK") {
      setArrType(res?.data);
    }
  };
  useEffect(() => {
    fetchAllType();
  }, []);

  let lengthProducts = panigate?.limit;
  const arrayProducts = [];
  for (let i = 1; i <= lengthProducts; i++) {
    arrayProducts.push(i);
  }
  return (
    <div
      style={{
        minHeight: "100vh",
        marginBottom: 50,
      }}
    >
      <Row className="content">
        <Col xxl={12} xl={12} className="col-slide">
          <SlideAnNavComponent arrType={arrType} />
          <div className="product">
            <div style={{ textAlign: "center", width: "100%" }}>
              <h1 className="text-type">{state}</h1>
            </div>
            <LoadingCardComponent
              isLoading={isLoading}
              arrayProducts={arrayProducts}
            />
            {!isLoading && (
              <Row>
                {products?.map((product) => {
                  return (
                    <Col xxl={3} xl={3} lg={4} sm={6} xs={6} key={product._id}>
                      <CardComponents
                        id={product._id}
                        image={product.image}
                        name={product.name}
                        price={product.price}
                        gender={product.gender}
                        age={product.age}
                        size={product.size}
                      />
                    </Col>
                  );
                })}
                <Pagination
                  style={{ textAlign: "center", marginTop: "10px" }}
                  onChange={onChangePa}
                  defaultCurrent={panigate?.page + 1}
                  defaultPageSize={panigate?.limit}
                  total={panigate?.total}
                  pageSizeOptions={[2, 4, 6]}
                />
              </Row>
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default TypeProductPage;
