import React from "react";
import Card from "react-bootstrap/Card";
import Placeholder from "react-bootstrap/Placeholder";

const LoadingCardInfoComponent = (props) => {
  const { key } = props;
  return (
    <div>
      <Card
        style={{
          width: "70px",
          height: "70px",
          border: "none",
          padding: "0 15px",
          marginTop: "4px",
        }}
        key={key}
      >
        <Placeholder
          style={{ width: "40px", height: "40px", display: "flex" }}
          animation="wave"
        >
          <Placeholder
            style={{
              width: "40px",
              height: "40px",
              backgroundColor: "#ccc",
              borderRadius: "50%",
            }}
            xs={12}
          />
        </Placeholder>
        <Card.Body
          style={{ marginTop: "10px", padding: "0", height: "12.5px" }}
        >
          <Placeholder
            style={{ height: "10px" }}
            as={Card.Title}
            animation="glow"
          >
            <Placeholder
              style={{
                backgroundColor: "#ccc",
                height: "10px",
                borderRadius: "10px",
              }}
              xs={12}
            />
          </Placeholder>
        </Card.Body>
      </Card>
    </div>
  );
};

export default LoadingCardInfoComponent;
