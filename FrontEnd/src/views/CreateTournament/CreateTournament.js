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

export default function CreateTournament(){
  const classes = useStyles();

  const radioOptions = [
    {
      value: "Selection",
      label: "Selections",
    },
    {
      value: "Local",
      label: "Local",
    },
  ]

  let tournamentsLength = 0;

  const [isLoading, setLoading] = useState(true);
  const [tName, setTName] = useState("");
  const [initialDate, setIDate] = useState(null);
  const [endDate, setEDate] = useState(null);
  const [tournamentType, setTournamentType] = React.useState("Local");
  const [tournamentPhase, setTournamentPhase] = useState([{ newStage: "" }]);
  const [description, setDescription] = useState("");
  const [teams, setTeams] = useState([]);

  const [childData, setChildData] = useState("");

  useEffect(() => {
    getLocalTeams();
  }, []);

// *************************************************************
// *********************** GET DATA ****************************
const getLocalTeams = () => {
  axios.get('http://localhost:5000/getLocalTeams')
              .then(response => {
                let temp = response.data.ELocal;
                console.log("TEMP VALUE:", temp);
                setTeams(temp);
                setLoading(false);
              })
              .catch(error => {
                console.error('There was an error!', error);
              });
  }

  const getSelecTeams = () => {
    axios.get('http://localhost:5000/getSelecTeams')
                .then(response => {
                  let temp = response.data.TSelec;
                  console.log("TEMP VALUE:", temp);
                  setTeams(temp);
                  setLoading(false);
                })
                .catch(error => {
                  console.error('There was an error!', error);
                });
    }

    const callTournaments = async () => {
      await axios.get('http://localhost:5000/getTournament')
                  .then(response => {
                    if(response.data != []){
                      tournamentsLength = response.data.Tournaments.length;
                    }
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
    setIDate(new Date(event));
  };

  const handleEndDateChange = (event) => {
    setEDate(new Date(event));
  };

  const handleTournamentTypeChange = (event) => {
    let temp = event.target.value;
    setTournamentType(temp);
    if(temp == "Local"){
      getLocalTeams();
      setLoading(true);
    }
    else{
      getSelecTeams();
      setLoading(true);
    }

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

    let tournamentTeams=[];
    for(let i=0;i<childData.length;i++){
        tournamentTeams[i]=childData[i].content;
    }

    let tPhases = [];
    for(let i=0;i<tournamentPhase.length;i++){
      tPhases[i] = tournamentPhase[i].newStage;
    }

    const json = {
      "_id": 0,
      "name": "",
      "startDate": "",
      "endDate": "",
      "description": "",
      "teams": "",
      "fases": "",
    };

    console.log(json);

    await callTournaments();

    json._id = tournamentsLength+1;
    json.name = tName;
    json.startDate = new Date(initialDate).toLocaleDateString();
    json.endDate = new Date(endDate).toLocaleDateString();
    json.teams = tournamentTeams;
    json.fases = tPhases;
    json.description = description;

    // *************************************************************
    // ********************** POST DATA ****************************
    
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
      'Content-Type': 'application/json'
    }
    
    let validatePost=true;
    if(json.name==""){
      validatePost=false
      alert("El nombre del torneo es obligatorio. Por favor ingrese un nombre de torneo") 
    }
    if(json.startDate=="31/12/1969" & json.endDate=="31/12/1969" ){
      validatePost=false
      alert("Debe seleccionar las fechas del torneo")     
    }
    if(json.startDate>json.endDate){
      validatePost=false
      alert("La fecha de inicio no puede ser mayor a la fecha de finalización")   
    }

    let localDate = new Date().toLocaleDateString(); //Obtiene Fecha actual
    /*********** Compara el año ingresado con el año actual ****************/
    if(Number(json.startDate.substring(6,10))>=Number(localDate.substring(6,10))){
      /*********** Compara el mes ingresado con el mes actual ****************/
      if(Number(json.startDate.substring(3,5))>=Number(localDate.substring(3,5))){
        /*********** Compara el día ingresado con el día actual ****************/
        if(Number(json.startDate.substring(0,2))>=Number(localDate.substring(0,2))){
          console.log("OK!");
        }
        else{
          validatePost=false;
          alert("No se pudo crear el partido: La fecha no puede ser previa a la actual.");
        }
      }
      else{
        validatePost=false;
        alert("No se pudo crear el partido: La fecha no puede ser previa a la actual.");
      }
    }

    else{
      validatePost=false;
      alert("No se pudo crear el partido: La fecha no puede ser previa a la actual.");
    }   
    if(tournamentTeams.length<2){
      validatePost=false
      alert("El torneo debe contar con mínimo 2 equipos")     
    }
    if(tPhases[0]==''){
      validatePost=false
      alert("Debe agregar minímo una fase para el torneo")      
    }
    if(validatePost){
      await axios.post('http://localhost:5000/createTournaments', json, { headers })
        .then(response =>{
        if(response.data=="Done"){
            alert("Torneo creado con éxito")
            setLoading(true);
            
            setLoading(false);
            setEDate(null)
            setIDate(null)
            setTournamentPhase([{ newStage: "" }])    
        }})
        .catch(error => console.error('There was an error!', error));
    }
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
                    options={radioOptions}
                    labelText="Tournament Type"
                    row={true}
                    value={tournamentType}
                    onChange={(type) => handleTournamentTypeChange(type)}
                    formControlProps={{
                      fullWidth: true,
                    }}
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
                  <MultipleDragList teamsList={teams} passChildData={setChildData}/>
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
