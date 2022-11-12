import React, { useEffect, useState } from "react";
// @material-ui components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import BasicDatePicker from "components/DatePicker/DatePicker.js";
import MultipleDragList from "components/Multiple-list-dnd/multiple-list-dnd.js";
import ControlledRadioButtonsGroup from "components/Radio-group/radio-group.js";
import "bootstrap/dist/css/bootstrap.css";
import { Form, Row, Col } from "react-bootstrap";
import axios from "axios";
import { createRef } from "react";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
};

const useStyles = makeStyles(styles);

export default function CreateTournament() {
  const classes = useStyles();

  const childRef = createRef(null);

  const [isLoading, setLoading] = useState(true);
  const [tName, setTName] = useState("");
  const [initialDate, setIDate] = useState(null);
  const [endDate, setEDate] = useState(null);
  const [tournamentType, setTournamentType] = React.useState("Local");
  const [tournamentPhase, setTournamentPhase] = useState([{ newStage: "" }]);
  const [description, setDescription] = useState("");
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    getTeams();
  }, []);

// *************************************************************
// *********************** GET DATA ****************************
const getTeams = () => {
  axios.get('http://localhost:5000/getLocalTeams')
              .then(response => {
                let temp = response.data.ELocal;
                console.log("TEMP VALUE:", temp);
                let tempArray = [];
                for(let i = 0; i<temp.length; i++){
                  tempArray[i] = temp[i][0];
                }
                console.log("TEAMS LIST AT CT:", tempArray);
                setTeams(tempArray);
                setLoading(false);
              })
              .catch(error => {
                console.error('There was an error!', error);
              });
  }

  // *************************************************************
  // ******************** HANDLE EVENTS **************************
  const handleTournamentNameChange = (event) => {
    setTName(event.target.value);
  };

  const handleInitialDateChange = (event) => {
    setIDate(new Date(event).toDateString());
  };

  const handleEndDateChange = (event) => {
    setEDate(new Date(event).toDateString());
  };

  const handleTournamentTypeChange = (event) => {
    setTournamentType(event.target.value);
  };

  const handlePhaseInputChange = (index, event) => {
    const values = [...tournamentPhase];
    const updatedValue = event.target.name;
    values[index][updatedValue] = event.target.value;
    setTournamentPhase(values);
  };

  const handlePhaseAddFields = () => {
    const values = [...tournamentPhase];
    values.push({ newStage: "" });
    setTournamentPhase(values);
  };

  const handlePhaseRemoveFields = () => {
    const values = [...tournamentPhase];
    if (values.length > 1) values.pop();
    setTournamentPhase(values);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleClick = async (event) => {
    event.preventDefault();

    childRef.current.getSelected();
    
    let tournamentTeams="";
    for(let i=0;i<teams.length;i++){
      tournamentTeams=tournamentTeams+teams[i].content+",";
      console.log(tournamentTeams)
    }

    let tPhases = "";
    for(let i=0;i<tournamentPhase.length;i++){
      tPhases = tPhases+tournamentPhase[i].newStage+",";
      console.log(tPhases)
    }

    const json = {
      "Nombre": "",
      "FechaInicio": "",
      "FechaFinal": "",
      "Tipo": "",
      "Equipos": "",
      "Fases": "",
      "Descripcion": "",
    };

    console.log(json);

    json.Nombre = tName;
    json.FechaInicio = initialDate;
    json.FechaFinal = endDate;
    json.Tipo = tournamentType;
    json.Equipos = tournamentTeams;
    json.Fases = tPhases;
    json.Descripcion = description;

    // *************************************************************
    // ********************** POST DATA ****************************
    
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
      'Content-Type': 'application/json'
    }

    await axios.post('http://localhost:5000/createTorneos', json, { headers })
    .then(response => console.log(response))
    .catch(error => console.error('There was an error!', error));
  }

  if (isLoading) {
    return <div className="CreateTournament">Loading...</div>;
  }

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Crear Torneo</h4>
              <p className={classes.cardCategoryWhite}>
                Complete all the information for this new tournament
              </p>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    labelText="Tournament Name"
                    id="name"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      onChange: (event) => handleTournamentNameChange(event),
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <BasicDatePicker
                    labelText="Initial Date"
                    id="initial-date"
                    value={initialDate}
                    onChange={(date) => handleInitialDateChange(date)}
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <BasicDatePicker
                    labelText="End Date"
                    id="end-date"
                    value={endDate}
                    onChange={(date) => handleEndDateChange(date)}
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <br></br>
                  <ControlledRadioButtonsGroup 
                    id="controlled-radio-buttons"
                    value={tournamentType}
                    onChange={(event) => handleTournamentTypeChange(event)}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={3}>
                  <InputLabel style={{ color: "#000000" }}>
                    <br></br>    Equipos Disponibles
                  </InputLabel>
                </GridItem>
                <GridItem xs={12} sm={12} md={5}>
                  <InputLabel style={{ color: "#000000" }}>
                    <br></br>     Equipos Seleccionados
                  </InputLabel>
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <MultipleDragList refe={childRef} teamsList={teams}/>
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <br></br>
                  <InputLabel style={{ color: "#000000" }}>
                    Enter the new stage for the tournament
                  </InputLabel>
                  <Form>
                    {tournamentPhase.map((data, i) => {
                      return (
                        <Row className="mt-3" key={i}>
                          <Col xs={8}>
                            <Form.Group controlId="formBasicGuest">
                              <Form.Control
                                type="text"
                                name="newStage"
                                value={data.newStage}
                                onChange={(event) => handlePhaseInputChange(i, event)}
                              />
                            </Form.Group>
                          </Col>
                        </Row>
                      );
                    })}
                    <Row>
                      <Col className="pt-3 d-flex justify-content">
                        <Button color="primary" onClick={handlePhaseAddFields}>
                          Add More
                        </Button>
                        <Button color="primary" onClick={handlePhaseRemoveFields}>
                          Remove
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <InputLabel style={{ color: "#000000" }}>
                    <br></br>
                    <br></br>
                    Description
                  </InputLabel>
                  <CustomInput
                    labelText="Rules, Data..."
                    id="description"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      multiline: true,
                      rows: 10,
                      onChange: (event) => handleDescriptionChange(event),
                    }}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button color="primary" onClick={handleClick}>Create Tournament</Button>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
