//import React from "react";
import React, {useEffect, useState} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter";
import Button from '@mui/material/Button';
import axios from "axios";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0",
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF",
    },
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1",
    },
  },
};

function generateUID() {
  var uid = (Math.random() * 46656) | 0;
  uid = ("000" + uid.toString(36)).slice(-3);
  return uid;
}

const useStyles = makeStyles(styles);


export default function PrivateLeague() {
  const classes = useStyles();
  
  const [tournamentID, setTournamentID] = useState();
  const [user, setUser] = useState("");
  const [privateCode, setPrivateCode] = useState("1");
  const myuuid = (tournamentID+generateUID()).toUpperCase();

  useEffect(() => {
    setUser(sessionStorage.getItem("User"));
    setTournamentID(sessionStorage.getItem("TournamentID"));
    setPrivateCode(sessionStorage.getItem("PrivateLeagueCode"));
  });

  const handleClick = async (event) => {
    event.preventDefault()
    const json = {
        "_idPrivateTournament":"",
        "_idTournament":"",
        "Username": "",
    };
    json.Username = user;
    json._idTournament = tournamentID;
    json._idPrivateTournament = myuuid;
    console.log(json);

    const headers = {
      "Access-Control-Allow-Origin": "*",

      "Access-Control-Allow-Headers":
        "Origin, X-Requested-With, Content-Type, Accept",

      "Content-Type": "application/json",
    };
    let validate="False"
    await axios
    .post("http://localhost:5000/createPrivateLeague/", json, { headers })
    .then((response) => {
      if (response){
        validate="True";
      }})
    .catch((error) => console.error("There was an error!", error));
    console.log(validate)
    //Si ya esta en unido a un liga privada no puede crear una  
    if (validate=="True"){
      alert("Se ha creado exitosamente la liga privada.");
      window.location.reload(false);
    }
  };
  if(privateCode == "1"){
    return(
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
            <Card>
            <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Create Private League</h4>
                <p className={classes.cardCategoryWhite}>
                You can share this code with your friends, for enter in this private league 
                </p>
            </CardHeader>
            <CardBody>
                <h4 color="black">Here is the unique code for this private league: {myuuid}</h4>
            </CardBody>
            <CardFooter>
                <Button color="primary" onClick={handleClick}>Create Private League</Button>
            </CardFooter>
            </Card>
        </GridItem>
    </GridContainer>
    )
  }
  else{
    return(
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
            <Card>
            <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>You are already in a private league</h4>
            </CardHeader>
            </Card>
        </GridItem>
    </GridContainer>
    )
  }
}