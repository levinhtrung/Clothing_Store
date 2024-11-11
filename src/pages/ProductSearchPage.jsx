import React, { useEffect, useState } from "react";
import * as ProductServices from "../services/ProductServices";
import { useDebounce } from "../hooks/useDebounce";
import { useSelector, useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import LoadingCardComponent from "../components/LoadingCardComponent";
import { Col, Row } from "react-bootstrap";
import CardComponents from "../components/CardComponents";
import Button from "react-bootstrap/Button";
import LoadingComponents from "../components/LoadingComponents";
import { useSearchParams } from "react-router-dom";
import { searchProduct } from "../redux/slices/productSlice";
import Form from "react-bootstrap/Form";

const ProductSearchPage = () => {
  const dispatch = useDispatch();
  const [textSearch, setTextSearch] = useState("");
  const [limit, setLimit] = useState(8);
  const [search, setSearch] = useState('');
  const searchStorage = localStorage.getItem("search");

  const fetchProductSearch = async (context) => {
    const limit = context?.queryKey && context?.queryKey[1];
    console.log('search', context?.queryKey[2])
    const search = (context?.queryKey && context?.queryKey[2]) || search;
    setTextSearch(search);
    const res = await ProductServices.getProductSearch(search, limit);
    return res;
  };

  const searchProductRedux =
    useSelector((state) => state.product?.search) || searchStorage || undefined;

  // const searchDebounce = useDebounce(searchProductRedux, 1000);

  const {
    isLoading: isLoading,
    data: products,
    isPreviousData,
  } = useQuery(["products", limit, searchProductRedux], fetchProductSearch, {
    retry: 3,
    retryDelay: 0,
    keepPreviousData: true,
  });

  const [searchParams, setSearchParams] = useSearchParams();
  // search ở trên
  useEffect(() => {
    setSearchParams({ search: `${searchStorage}` });
  }, [textSearch]);

  useEffect(() => {
    setSearch(searchStorage);
  }, [searchStorage]);

  const onSearch = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    setSearch(searchStorage);
  }, []);

  const [isLoadingSearch, setIsLoadingSearch] = useState(false);
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (search.trim() && search.trim() !== searchStorage) {
        setIsLoadingSearch(true);
        dispatch(searchProduct(search));
        localStorage.setItem("search", search);
        setSearchParams({ search: `${search}` });
      }
    }
  };

  useEffect(() => {
    // ra được product mới thì sẽ dùng
    setIsLoadingSearch(false);
  }, [products?.NameSearch]);

  const arrayProducts = [];
  for (let i = 1; i <= limit; i++) {
    arrayProducts.push(i);
  }

  useEffect(() => {
    window.scrollTo(0, 1);
  }, []);

  return (
    <div className="search-page">
      <p className="title">
        Sản phẩm cho từ khoá tìm kiếm:{" "}
        <Form.Control
          className="input"
          onChange={onSearch}
          value={search}
          onKeyDown={handleKeyDown}
        />
      </p>
      {products?.noProduct && <h2>{products?.noProduct}</h2>}
      <div className="product">
        <LoadingCardComponent
          isLoading={isLoading || isLoadingSearch}
          arrayProducts={arrayProducts}
          //   width={}
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
                    // countInstock={product.countInstock}
                    // description={product.description}
                    image={product.image}
                    name={product.name}
                    price={product.price}
                    // rating={product.rating}
                    gender={product.gender}
                    // discount={product.discount}
                    // selled={product.selled}
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
          marginTop: "25px",
        }}
      >
        <LoadingComponents isLoading={isPreviousData} />
      </div>
      <div>
        {products?.totalPage > 1 && !isPreviousData && !isLoading && (
          <div className="see-more">
            <Button
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

export default ProductSearchPage;
