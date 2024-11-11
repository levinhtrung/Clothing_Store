import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import React from "react";
import Card from "react-bootstrap/Card";
import Placeholder from "react-bootstrap/Placeholder";

const LoadingUpdate = (props) => {
  const { key } = props;
  return (
    <div>
      <Card
        style={{ width: "18rem", height: "445px", border: "none" }}
        key={key}
      >
        <Card.Body>
          <Placeholder as={Card.Text} animation="glow">
            <Placeholder
              style={{ backgroundColor: "#ddd", height: 20 }}
              xs={1}
            />{" "}
            <Placeholder
              style={{
                backgroundColor: "#ddd",
                width: 78,
                height: 78,
                marginLeft: 50,
              }}
              xs={4}
            />
            <Placeholder
              style={{
                backgroundColor: "#ddd",
                width: 78,
                height: 78,
                marginLeft: 20,
              }}
              xs={4}
            />
            <Placeholder
              style={{
                backgroundColor: "#ddd",
                width: 78,
                height: 78,
                marginLeft: 20,
              }}
              xs={4}
            />
            <Placeholder
              style={{
                backgroundColor: "#ddd",
                width: 78,
                height: 78,
                marginLeft: 20,
              }}
              xs={4}
            />
          </Placeholder>
          <Placeholder
            as={Card.Text}
            animation="glow"
            style={{ marginTop: 28 }}
          >
            <Placeholder
              style={{ backgroundColor: "#ddd", height: 20 }}
              xs={1}
            />{" "}
            <Placeholder
              style={{ backgroundColor: "#ddd", marginLeft: 50, height: 30 }}
              xs={9}
            />{" "}
          </Placeholder>

          <Placeholder
            as={Card.Text}
            animation="glow"
            style={{ marginTop: 28 }}
          >
            <Placeholder
              style={{ backgroundColor: "#ddd", height: 20 }}
              xs={1}
            />{" "}
            <Placeholder
              style={{ backgroundColor: "#ddd", marginLeft: 50, height: 30 }}
              xs={9}
            />{" "}
          </Placeholder>
          <Placeholder
            as={Card.Text}
            animation="glow"
            style={{ marginTop: 28 }}
          >
            <Placeholder
              style={{ backgroundColor: "#ddd", height: 20 }}
              xs={1}
            />{" "}
            <Placeholder
              style={{ backgroundColor: "#ddd", marginLeft: 50, height: 30 }}
              xs={9}
            />{" "}
          </Placeholder>
          <Placeholder
            as={Card.Text}
            animation="glow"
            style={{ marginTop: 28 }}
          >
            <Placeholder
              style={{ backgroundColor: "#ddd", height: 20 }}
              xs={1}
            />{" "}
            <Placeholder
              style={{ backgroundColor: "#ddd", marginLeft: 50, height: 30 }}
              xs={9}
            />{" "}
          </Placeholder>
          <Placeholder
            as={Card.Text}
            animation="glow"
            style={{ marginTop: 28 }}
          >
            <Placeholder
              style={{ backgroundColor: "#ddd", height: 20 }}
              xs={1}
            />{" "}
            <Placeholder
              style={{ backgroundColor: "#ddd", marginLeft: 50, height: 30 }}
              xs={9}
            />{" "}
          </Placeholder>

          <Placeholder
            style={{ marginTop: 28, textAlign: "right", marginRight: 50 }}
            as={Card.Title}
            animation="glow"
          >
            <Placeholder
              style={{ backgroundColor: "#ddd", height: 50 }}
              xs={2}
            />
          </Placeholder>
        </Card.Body>
      </Card>
    </div>
  );
};

const LoadingUpdateComponent = ({ children, isLoading }) => {
  return (
    <>
      {isLoading ? (
        <Row>
          <Col>
            <LoadingUpdate />
          </Col>
        </Row>
      ) : (
        <div>{children}</div>
      )}
    </>
  );
};

export default LoadingUpdateComponent;
