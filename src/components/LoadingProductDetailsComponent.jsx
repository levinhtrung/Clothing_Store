import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import React from "react";
import Card from "react-bootstrap/Card";
import Placeholder from "react-bootstrap/Placeholder";

const LoadingProductDetails = (props) => {
  const { key } = props;
  return (
    <div
      style={{
        display: "flex",
        width: "1400px",
        justifyContent: "start",
        marginTop: 40,
      }}
    >
      <Card
        className="imgload"
        style={{ height: "auto", border: "none" }}
        key={key}
      >
        <Placeholder animation="wave">
          <Placeholder
            style={{
              width: "500px",
              height: "500px",
              backgroundColor: "#ccc",
            }}
            xs={12}
          />
        </Placeholder>
        <div
          style={{
            display: "flex",
            marginTop: "10px",
            justifyContent: "space-between",
            width: "500px",
          }}
        >
          <Placeholder animation="wave">
            <Placeholder
              style={{
                width: "100px",
                height: "100px",
                backgroundColor: "#ccc",
              }}
              xs={12}
            />
          </Placeholder>
          <Placeholder animation="wave">
            <Placeholder
              style={{
                width: "100px",
                height: "100px",
                backgroundColor: "#ccc",
              }}
              xs={12}
            />
          </Placeholder>
          <Placeholder animation="wave">
            <Placeholder
              style={{
                width: "100px",
                height: "100px",
                backgroundColor: "#ccc",
              }}
              xs={12}
            />
          </Placeholder>
          <Placeholder animation="wave">
            <Placeholder
              style={{
                width: "100px",
                height: "100px",
                backgroundColor: "#ccc",
              }}
              xs={12}
            />
          </Placeholder>
        </div>
      </Card>
      <Card className="textload">
        <Card.Body>
          <Placeholder
            style={{ lineHeight: "30px" }}
            as={Card.Title}
            animation="glow"
          >
            <Placeholder
              style={{ backgroundColor: "#999", height: 25 }}
              xs={8}
            />
          </Placeholder>

          <Placeholder
            style={{ marginTop: 35 }}
            as={Card.Title}
            animation="glow"
          >
            <Placeholder
              style={{ backgroundColor: "#999", height: 25 }}
              xs={2}
            />
          </Placeholder>

          <Placeholder
            style={{ lineHeight: "30px" }}
            as={Card.Title}
            animation="glow"
          >
            <Placeholder
              style={{ backgroundColor: "#999", height: 20 }}
              xs={2}
            />
          </Placeholder>

          <Placeholder
            style={{ marginTop: 30 }}
            as={Card.Text}
            animation="glow"
          >
            <Placeholder
              style={{
                backgroundColor: "#999",
                marginRight: "20px",
                width: 45,
                height: 45,
              }}
              xs={1}
            />
            <Placeholder
              style={{
                backgroundColor: "#999",
                marginRight: "20px",
                width: 45,
                height: 45,
              }}
              xs={1}
            />
            <Placeholder
              style={{
                backgroundColor: "#999",
                marginRight: "20px",
                width: 45,
                height: 45,
              }}
              xs={1}
            />
            <Placeholder
              style={{
                backgroundColor: "#999",
                marginRight: "20px",
                width: 45,
                height: 45,
              }}
              xs={1}
            />
            <Placeholder
              style={{
                backgroundColor: "#999",
                marginRight: "20px",
                width: 45,
                height: 45,
              }}
              xs={1}
            />
          </Placeholder>

          <Placeholder
            style={{ marginTop: 40 }}
            as={Card.Title}
            animation="glow"
          >
            <Placeholder
              style={{ backgroundColor: "#999", height: 50 }}
              xs={2}
            />
            <Placeholder
              style={{ backgroundColor: "#999", height: 50, marginLeft: 40 }}
              xs={4}
            />
            <Placeholder
              style={{ backgroundColor: "#999", height: 50, marginLeft: 40 }}
              xs={1}
            />
          </Placeholder>
          <Placeholder
            style={{ marginTop: 40 }}
            as={Card.Title}
            animation="glow"
          ></Placeholder>
          <Placeholder as={Card.Title} animation="glow">
            <Placeholder
              style={{ backgroundColor: "#999", height: 20 }}
              xs={2}
            />
          </Placeholder>

          <Placeholder
            as={Card.Title}
            animation="glow"
            style={{ marginTop: 20 }}
          >
            <Placeholder
              style={{ backgroundColor: "#999", height: 200, width: "100%" }}
              xs={2}
            />
          </Placeholder>
        </Card.Body>
      </Card>
    </div>
  );
};

const LoadingProductDetailsComponent = ({ children, isLoading }) => {
  return (
    <>
      {isLoading ? (
        <Row>
          <Col>
            <LoadingProductDetails />
          </Col>
        </Row>
      ) : (
        <div>{children}</div>
      )}
    </>
  );
};

export default LoadingProductDetailsComponent;
