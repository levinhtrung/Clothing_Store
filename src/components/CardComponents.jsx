import React from "react";
import Card from "react-bootstrap/Card";
import { FiHeart } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { convertPrice } from "../utils";

const CardComponents = (props) => {
  const { id, key, image, name, price } = props;

  const navigate = useNavigate();
  const handleDetailsProduct = (id) => {
    navigate(`/product-details/${id}`);
  };

  return (
    <Card
      style={{ width: "18rem" }}
      key={key}
      onClick={() => handleDetailsProduct(id)}
    >
      <div className="image">
        <Card.Img variant="top" src={image} />
      </div>
      <Card.Body>
        <div className="name-heart">
          <Card.Title className="align-items_center">{name}</Card.Title>
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
  );
};

export default CardComponents;
