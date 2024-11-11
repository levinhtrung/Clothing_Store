import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { useQuery } from "@tanstack/react-query";
import * as ProductServices from "../services/ProductServices";
import { Col, Row } from "react-bootstrap";
import axios from "axios";
import LoadingComponents from "../components/LoadingComponents";
import CardComponents from "../components/CardComponents";
import LoadingCardComponent from "../components/LoadingCardComponent";

const ProposePage = () => {
  const imgStorage = localStorage.getItem("img");
  const imageBase64 = JSON.parse(imgStorage);
  const [isLoaded, setIsLoaded] = useState(false);
  const [limit, setLimit] = useState(8);
  const [isLoadingPropose, setIsLoadingPropose] = useState(true);

  useEffect(() => {
    if (!isLoaded) {
      axios
        .post(`${process.env.REACT_APP_API_URL}/save/proposed`, {
          imageBase64,
        })
        .then((res) => {
          console.log("Ok", res);
        })
        .catch((err) => {
          console.log("ERR", err);
        });
      setIsLoaded(true);
    }
  }, [isLoaded]);

  const [result_age, set_result_age] = useState("");
  const [result_size, set_result_size] = useState("");
  const [result_gender, set_result_gender] = useState("");

  useEffect(() => {
    const result = fetch(`${process.env.REACT_APP_API_URL}/save/results`).then(
      (response) => response.json().then((data) => data)
    );
    const arrResult = async () => {
      const arr = await result;
      console.log("duLieu", arr);
      set_result_gender(arr[0]);
      set_result_age(arr[1]);
      set_result_size(arr[2]);
    };
    arrResult();
  }, []);

  console.log('result_gender', result_gender)

  const fetchProductAll = async (context) => {

    const gender = context?.queryKey && context?.queryKey[1];
    const age = context?.queryKey && context?.queryKey[2];
    const size = context?.queryKey && context?.queryKey[3];
    const limit = context?.queryKey && context?.queryKey[4];
    if (gender && age && size) {
      setIsLoadingPropose(false);
      const res = await ProductServices.getAllProductPropose(
        gender,
        age,
        size,
        limit
      );
      return res;
    }
  };

  let {
    isLoading,
    data: product,
    isPreviousData,
  } = useQuery(
    ["product", result_gender, result_age, result_size, limit],
    fetchProductAll,
    {
      retry: 3,
      keepPreviousData: true,
    }
  );

  const arrayProducts = [];
  for (let i = 1; i <= limit; i++) {
    arrayProducts.push(i);
  }

  const [resultGenderText, setResultGenderText] = useState("");
  const [resultSizeText, setResultSizeText] = useState("");
  useEffect(() => {
    if (result_gender.toLocaleLowerCase() === "nam") {
      setResultGenderText("Nam");
    } else {
      if (result_gender.toLocaleLowerCase() === "nu") {
        setResultGenderText("Nữ");
      } else {
        setResultGenderText("Undefined");
      }
    }
  }, [result_gender])

  useEffect(() => {
    if (result_size.toLocaleLowerCase() === "Beo") {
      setResultSizeText("Mập");
    } else if (result_size.toLocaleLowerCase() === "om") {
      setResultSizeText("Ốm");
    } else {
      setResultSizeText("Bình thường");
    }
  }, [result_size])

  return (
    <div>
      <div className="card-propose">
        <div style={{ display: "flex" }}>
          <h3 style={{ marginRight: 10 }}>{result_gender && resultGenderText}</h3>
          <h3 style={{ marginRight: 10 }}>{result_age}</h3>
          <h3>{result_size && resultSizeText}</h3>
        </div>
        {/* <DuDoan /> */}
        <h2>Sản phẩm đề xuất cho bạn</h2>
        <img className="img-propose" src={imageBase64} alt="" />

        {/* <CardProposeComponents /> */}
        <div className="products">
          <LoadingCardComponent
            isLoading={isLoadingPropose || isLoading}
            arrayProducts={arrayProducts}
          >
            <Row>
              {product?.data?.map((product, index) => {
                return (
                  <Col xxl={3} xl={3} lg={4} key={product._id}>
                    <CardComponents
                      id={product._id}
                      key={index}
                      className="card_Propose"
                      image={product.image}
                      name={product.name}
                      price={product.price}
                      // selled={product.selled}
                      //   gender={product.gender}
                      //   age={product.age}
                      //   size={product.size}
                      //   result_age={result_age}
                      //   result_size={result_size}
                      //   result_gender={result_gender}
                    />
                  </Col>
                );
              })}
            </Row>
          </LoadingCardComponent>
        </div>
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
        {product?.totalPage > 1 &&
          !isPreviousData &&
          !isLoading &&
          !isLoadingPropose && (
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

export default ProposePage;
