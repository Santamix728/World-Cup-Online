import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Button from "components/CustomButtons/Button.js";
import { Form, Row, Col } from "react-bootstrap";

const Dynamicform = () => {
  const [StageData, setStageData] = useState([{ newStage: "" }]);
  
  const handleInputChange = (index, event) => {
    const values = [...StageData];
    const updatedValue = event.target.name;
    values[index][updatedValue] = event.target.value;
    setStageData(values);
  };
  const handleTest = () => {
    const values = [...StageData];
    console.log(values);
  };
  const handleAddFields = () => {
    const values = [...StageData];
    values.push({ newStage: "" });
    setStageData(values);
  };

  const handleRemoveFields = () => {
    const values = [...StageData];
    if (values.length > 1) values.pop();
    setStageData(values);
  };
  return (
    <Form>
      {StageData.map((data, i) => {
        return (
          <Row className="mt-3" key={i}>
            <Col xs={8}>
              <Form.Group controlId="formBasicGuest">
                <Form.Control
                  type="text"
                  name="newStage"
                  value={data.newStage}
                  onChange={(event) => handleInputChange(i, event)}
                />
              </Form.Group>
            </Col>
          </Row>
        );
      })}
      <Row>
        <Col className="pt-3 d-flex justify-content-between">
          <Button color="primary" onClick={handleAddFields}>
            Add More
          </Button>
          <Button color="primary" onClick={handleTest}>
            Test
          </Button>
          <Button color="primary" onClick={handleRemoveFields}>
            Remove
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default Dynamicform;
