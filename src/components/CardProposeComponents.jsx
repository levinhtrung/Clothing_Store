import React from "react";
import Card from "react-bootstrap/Card";
import { FiHeart } from "react-icons/fi";
import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router-dom";
import { Identity } from "@tensorflow/tfjs";
import { convertPrice } from "../utils";

const CardProposeComponents = (props) => {
  let {
    id,
    result_age,
    result_size,
    result_gender,
    image,
    name,
    price,
    gender,
    age,
    size,
  } = props;

  const navigate = useNavigate();
  const handleDetailsProduct = (id) => {
    navigate(`/product-details/${id}`);
  };

  result_age = "40-50";
  result_size = "no";
  result_gender = "no";

  let MaleOrFemale;
  MaleOrFemale = result_gender?.toLowerCase();
  if (MaleOrFemale == "nam") {
    MaleOrFemale = "Nam";
  }
  if (MaleOrFemale == "nu") {
    MaleOrFemale = "Nữ";
  }
  let isMaleOrFemale = gender
    ?.toLowerCase()
    .includes(MaleOrFemale?.toLowerCase());
  if (
    result_gender?.toLowerCase() !== "nam" &&
    result_gender?.toLowerCase() !== "nu"
  ) {
    isMaleOrFemale = true;
    MaleOrFemale = "undefined";
  }

  const Tuoi = result_age;
  const Tuoi_Tu = Tuoi?.split("-")[0];
  const Tuoi_Den = Tuoi?.split("-")[1];

  const Tuoi_Sp_Tu = age?.split("-")[0];
  const Tuoi_Sp_Den = age?.split("-")[1];

  let isGiaTriTuoi =
    +Tuoi_Tu == +Tuoi_Sp_Tu ||
    +Tuoi_Tu == +Tuoi_Sp_Den ||
    +Tuoi_Den == +Tuoi_Sp_Tu ||
    +Tuoi_Den == +Tuoi_Sp_Den ||
    (+Tuoi_Tu < Tuoi_Sp_Tu && +Tuoi_Den > Tuoi_Sp_Tu) ||
    (+Tuoi_Sp_Den > +Tuoi_Tu && +Tuoi_Tu > +Tuoi_Sp_Tu);

  if (!result_age.includes("-")) {
    isGiaTriTuoi = true;
    result_age = "undefined";
  }

  let GiaTriBMI;
  if (result_size === "Beo") {
    GiaTriBMI = "Mập";
  }
  if (result_size === "thuong") {
    GiaTriBMI = "Bình thường";
  }
  if (result_size === "Om") {
    GiaTriBMI = "Ốm";
  }
  let isGiaTriBMI = size?.toLowerCase()?.includes(GiaTriBMI?.toLowerCase());
  if (
    result_size !== "Om" &&
    result_size !== "thuong" &&
    result_size !== "Beo"
  ) {
    isGiaTriBMI = true;
    GiaTriBMI = "undefined";
  }

  return (
    <>
      <div className="render_model">
        <h3>{MaleOrFemale}</h3>
        <h3>{result_age}</h3>
        <h3>{GiaTriBMI}</h3>
      </div>
      {Tuoi_Tu < 10 ? (
        <h3 className="agenho">
          Xin lỗi quý khách, shop chỉ kinh doanh các loại sản phẩm cho trẻ vị
          thành niên, nên chúng tôi không tìm thấy sản phẩm phù hợp cho bạn. Cảm
          ơn quý khách!!!
        </h3>
      ) : undefined}
      {Tuoi_Tu > 60 ? (
        <h3 className="agelon">
          Xin lỗi quý khách, shop chỉ chủ yếu kinh doanh các mặc hàng cho giới
          trẻ, nên chúng tôi không tìm thấy sản phẩm phù hợp cho bạn. Cảm ơn quý
          khách!!!
        </h3>
      ) : undefined}
      {isMaleOrFemale && isGiaTriBMI && isGiaTriTuoi ? (
        <Col xxl={3} xl={3} lg={4}>
          {/* <a href="/product-details" style={{ textDecoration: "none" }}> */}
          <Card
            key={id}
            style={{ width: "18rem" }}
            onClick={() => handleDetailsProduct(id)}
          >
            <div className="image">
              <Card.Img variant="top" src={image} />
            </div>
            <Card.Body>
              <div className="name-heart">
                <Card.Title className="align-items_center">{name}</Card.Title>
                {/* <FiHeart /> */}
                {/* <a href="#" title="Thêm vào danh sách yêu thích">
                  <img
                    src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjgiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyOCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE0LjAwMTYgMy4zNzQ0MkwxMi45NzQgMi4zMDk3NEMxMS41MzQ2IDAuODE4MzA3IDkuNjIzODUgMCA3LjU4MTQ3IDBDNS41MzkwOSAwIDMuNjMyNTggMC44MTgzMDcgMi4xOTMxNSAyLjMwOTc0Qy0wLjcxOTY4NyA1LjMyNzc5IC0wLjczMjQyNiAxMC4xMTQ0IDIuMTYzNDIgMTMuNDQ0OUM0Ljk0MDM4IDE2LjYzODkgMTMuMzUxOSAyMy43MzA5IDEzLjQzNjkgMjMuODAxM0MxMy41ODk3IDIzLjkyODkgMTMuNzc2NSAyMy45OTkzIDEzLjk3MTkgMjMuOTk5M0gxNC4wMTg2QzE0LjIwNTQgMjQuMDA4MSAxNC40MDA3IDIzLjkzNzcgMTQuNTYyMSAyMy44MDEzQzE0LjY0NyAyMy43MzA5IDIzLjA1MDEgMTYuNjUyMSAyNS44Mzk4IDEzLjQ0NDlDMjguNzMxNCAxMC4xMTQ0IDI4LjcxODYgNS4zMjc3OSAyNS44MSAyLjMwOTc0QzIyLjgzNzggLTAuNzY5OTEyIDE4LjAwMTQgLTAuNzY5OTEyIDE1LjAyOTIgMi4zMDk3NEwxNC4wMDE2IDMuMzc0NDJaTTI0LjYwODQgMy41NTQ4QzI2Ljg3MTYgNS44OTk3MyAyNi44NTg4IDkuNjQzNyAyNC41Nzg3IDEyLjI3MDJDMjIuNDI1OSAxNC43NDcxIDE2LjY1NTQgMTkuNzQ0OSAxNC4yNzMzIDIxLjc3NzVMMTQuMDAxNiAyMi4wMDYzTDEzLjcyOTggMjEuNzc3NUMxMS4zNTIgMTkuNzQ0OSA1LjU4MTU1IDE0Ljc1NTkgMy40MjQ1MiAxMi4yNzAyQzEuMTQ0MzYgOS42NDM3IDEuMTMxNjIgNS44OTk3MyAzLjM5NDggMy41NTQ4QzQuNTExNTMgMi4zOTc3MyA2LjAwMTkxIDEuNzU5OCA3LjU4MTQ3IDEuNzU5OEM5LjE2MTAyIDEuNzU5OCAxMC42NTE0IDIuMzk3NzMgMTEuNzY4MSAzLjU1NDhMMTMuMzY4OSA1LjIxMzQxQzEzLjQ4NzggNS4zMzY1OSAxMy42NDQ5IDUuNDIwMTggMTMuODE5IDUuNDQ2NThDMTQuMTI5IDUuNTEyNTcgMTQuNDE3NyA1LjQyNDU4IDE0LjYyNTggNS4yMTM0MUwxNi4yMjY2IDMuNTU0OEMxOC41MzY0IDEuMTYxNDcgMjIuMjk0MyAxLjE2MTQ3IDI0LjYwNDEgMy41NTQ4SDI0LjYwODRaIiBmaWxsPSJibGFjayIvPgo8L3N2Zz4K"
                    alt=""
                  />
                </a> */}
              </div>
              <div className="price">
                {/* toLocaleString (đơn vị tiền) */}
                <h3>{convertPrice(price)}</h3>
              </div>
            </Card.Body>
          </Card>
          {/* </a> */}
        </Col>
      ) : undefined}
    </>
  );
};

export default CardProposeComponents;
