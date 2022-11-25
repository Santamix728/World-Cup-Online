import React, { useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
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
import BasicTimePicker from "components/TimePicker/TimePicker";
import BasicSelect from "components/Select/Select";
import axios from "axios";
import { useEffect } from "react";

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

export default function CreateMatch() {
  // *************************************************************
  // ********************** VARIABLES ****************************
  const classes = useStyles();

  let tempID = 0;
  let lengthMacths = 0;
  let enteredDate = false;
  const [tournamentID, setTournamentID] = useState(0);
  const [campus, setCampus] = useState("");
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [torneos, setTorneos] = useState([]);
  const [fases, setFases] = useState([]);
  const [teams, setTeams] = useState([]);
  const [tournamentSelected, setTournamentSelected] = React.useState("");
  const [phaseSelected, setPhaseSelected] = React.useState("");
  const [firstTeamSelected, setFirstTeamSelected] = React.useState("");
  const [secondTeamSelected, setSecondTeamSelected] = React.useState("");

  // *************************************************************
  // ********************** GET DATA *****************************
  const callTournaments = async () => {
     await axios.get('http://localhost:5000/getTournament')
                .then(response => {
                  if(response.data != []){
                    let temp = response.data.Tournaments;
                    console.log(temp);
                    let tempArray = [];
                    for(let i=0;i<temp.length;i++){
                      tempArray[i] = temp[i];
                    }
                    console.log(tempArray);
                    setTorneos(tempArray);
                  }
                })
                .catch(error => {
                  console.error('There was an error!', error);
                });
  }
  useEffect(async () => {
    await callTournaments();
  }, []);

  const callPhases = async () => {
  await axios.get('http://localhost:5000/getFaseTournament/'+tempID)
              .then(response => {
                let temp =  response.data.Fases;
                let tempArray = [];
                for(let i=0; i<temp.length; i++){
                  tempArray[i] = temp[i];
                }
                console.log("FASES:", tempArray);
                setFases(response.data.Fases);
              })
              .catch(error => {
                console.error('There was an error!', error);
              });
  }

  const callTeams = async () => {
    await axios.get('http://localhost:5000/getTeamsTournament/'+tempID)
                .then(response => {
                    let temp =  response.data.Teams;
                    let tempArray = [];
                    for(let i=0; i<temp.length; i++){
                      tempArray[i] = temp[i];
                    }
                    console.log("EQUIPOS:", tempArray);
                    setTeams(tempArray);
                })
                .catch(error => {
                  console.error('There was an error!', error);
                });
    }
    
  const callMatches = async () => {
    await axios.get('http://localhost:5000/getAllMatchs/')
                .then(response => {
                  lengthMacths =  response.data.Matchs.length;
                  console.log("MATCHES:", lengthMacths)
                })
                .catch(error => {
                  console.error('There was an error!', error);
                });
  }
    
  // *************************************************************
  // ******************** HANDLE EVENTS **************************
  const handleChange = (event) => {
    setCampus(event.target.value);
  };

  const handleTimeChange = (newTime) => {
    setTime(newTime);
    enteredDate = true;
  };

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const handleTournamentSelected = (newSelect) => {
    setTournamentSelected(newSelect.target.value);
    axios.get('http://localhost:5000/getTournamentID/'+newSelect.target.value)
        .then(response => {
            setTournamentID(response.data._id[0]);
            tempID = response.data._id[0];
            console.log("TOURNAMENT ID:", tempID);
            callPhases();
            callTeams();
        })
        .catch(error => {
          console.error('There was an error!', error);
        });
  };

  const handlePhaseSelected = (newSelect) => {
    setPhaseSelected(newSelect.target.value);
  };

  const handleFirstTeamSelected = (newSelect) => {
    setFirstTeamSelected(newSelect.target.value);
  };

  const handleSecondTeamSelected = (newSelect) => {
    setSecondTeamSelected(newSelect.target.value);
  };
  
  const handleClick = async (event) => {
    event.preventDefault();

    const json = {
      "_id":0,
      'date': "",
      'time': "",
      'fase': "",
      'team1': "",
      'team2': "",
      'place': "",
      '_idTournament':0,
    };

    await callMatches();

    json._id = (lengthMacths)+1;
    json.date = new Date(date).toLocaleDateString();
    json.time = new Date(time).toLocaleTimeString();
    json.fase = phaseSelected;
    json.team1 = firstTeamSelected;
    json.team2 = secondTeamSelected;
    json.place = campus;
    json._idTournament = tournamentID;

    console.log(json);

    // *************************************************************
    // ********************** POST DATA ****************************
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
      'Content-Type': 'application/json'
    }

    let validatePost=true;
    console.log("DATE:",json.date);
    if(json.date=="31/12/1969"){
      validatePost=false;
      alert("No se pudo crear el partido: Debe ingresar una fecha para el partido.");
    }

    let localDate = new Date().toLocaleDateString(); //Obtiene Fecha actual
    let localTime = new Date().toTimeString(); //Obtiene Hora Actual
    /*********** Compara el año ingresado con el año actual ****************/
    if(Number(json.date.substring(6,10))>=Number(localDate.substring(6,10))){
      /*********** Compara el mes ingresado con el mes actual ****************/
      if(Number(json.date.substring(3,5))>=Number(localDate.substring(3,5))){
        /*********** Compara el día ingresado con el día actual ****************/
        if(Number(json.date.substring(0,2))>=Number(localDate.substring(0,2))){
          /*********** Compara la hora ingresado con la hora actual **************/
          if((Number(json.date.substring(0,2))==Number(localDate.substring(0,2)))){
            if(Number(json.time.substring(0,2))>=Number(localTime.substring(0,2))
            || Number(json.time.substring(0,1))>=Number(localTime.substring(0,1))){
              /****** Compara los minutos ingresados con los minutos actuales ********/
              if(Number(json.time.substring(3,5))>=Number(localTime.substring(3,5))){
                console.log("OK!");
              }
              else{
                validatePost=false;
                alert("No se pudo crear el partido: La hora no puede ser previa a la actual.");
              }
            }
            else{
              validatePost=false;
              alert("No se pudo crear el partido: La hora no puede ser previa a la actual.");
            }
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
    }
    else{
      validatePost=false;
      alert("No se pudo crear el partido: La fecha no puede ser previa a la actual.");
    }

    console.log("TIME:",json.time);
    if(json.time=="18:00:00" && !enteredDate){
      validatePost=false;
      alert("No se pudo crear el partido: Debe ingresar una hora para el partido.");
    }
    console.log("FASE:",json.fase);
    if(json.fase==""){
      validatePost=false;
      alert("No se pudo crear el partido: Debe ingresar una fase para el partido.");
    }
    console.log("TEAM 1:",json.team1);
    console.log("TEAM 2:",json.team2);
    if(json.team1=="" || json.team2==""){
      validatePost=false;
      alert("No se pudo crear el partido: Debe ingresar ambos equipos para el partido.");
    }
    console.log("CAMPUS:",json.place);
    if(json.place==""){
      validatePost=false;
      alert("No se pudo crear el partido: Debe ingresar una sede para el partido.");
    }
    if(validatePost){
      await axios.post('http://localhost:5000/createMatch', json, { headers })
      .then(response => {
        if(response){
          alert("El partido ha sido creado exitosamente.");
          console.log(response);  
          window.location.reload(false);
        }
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.status);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log('Error', error.message);
        }
      });
    }
  };

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Create Match</h4>
              <p className={classes.cardCategoryWhite}>
                Complete all the information for this new match
              </p>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <BasicDatePicker
                    labelText="Date Match"
                    id="date-match"
                    value={date}
                    onChange={(newDate) => handleDateChange(newDate)}
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <BasicTimePicker
                    labelText="Time Match"
                    id="time-match"
                    value={time}
                    onChange={(newTime) => handleTimeChange(newTime)}
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <BasicSelect
                    labelText="Tournament Select"
                    id="tournamentID"
                    value={tournamentSelected}
                    handleChange={(newSelect) => handleTournamentSelected(newSelect)}
                    options={torneos}
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <BasicSelect
                    labelText="Select tournament phase"
                    id="tournament-phase"
                    value={phaseSelected}
                    handleChange={(newSelect) => handlePhaseSelected(newSelect)}
                    options={fases}
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                </GridItem>
              </GridContainer>
              <br></br>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <BasicSelect
                    labelText="First Team"
                    id="first-team"
                    value={firstTeamSelected}
                    handleChange={(newSelect) => handleFirstTeamSelected(newSelect)}
                    options={teams}
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <BasicSelect
                    labelText="Second Team"
                    id="second-team"
                    value={secondTeamSelected}
                    handleChange={(newSelect) => handleSecondTeamSelected(newSelect)}
                    options={teams}
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={5}>
                  <CustomInput
                    labelText="Select campus"
                    id="campusId"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      onChange: (event) => handleChange(event),
                    }}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button color="primary" onClick={handleClick}>
                Create Match
              </Button>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
