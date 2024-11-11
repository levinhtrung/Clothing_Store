import React from "react";
import Card from "react-bootstrap/Card";
import Placeholder from "react-bootstrap/Placeholder";

const LoadingTable = (props) => {
  const { key } = props;
  return (
    <Card style={{ width: "100%", border: "none", marginTop: "5px" }} key={key}>
      <Placeholder animation="glow">
        <Placeholder
          style={{
            height: "50px",
            backgroundColor: "#ddd",
            borderRadius: "10px",
          }}
          xs={12}
        />
      </Placeholder>
    </Card>
  );
};

const LoadingTableComponent = ({ children, isLoading }) => {
  const arrLoad = [];
  for (let i = 0; i < 10; i++) {
    arrLoad.push(i);
  }
  return (
    <>
      {isLoading ? (
        arrLoad.map((item) => {
          return <LoadingTable key={item} />;
        })
      ) : (
        <div>{children}</div>
      )}
    </>
  );
};

export default LoadingTableComponent;
