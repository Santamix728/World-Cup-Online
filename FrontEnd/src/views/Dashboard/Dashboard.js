import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
//import React from "react";

// react plugin for creating charts
// @material-ui/core
// @material-ui/icons
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardImages from "components/Card/CardImages";
import CardFooter from "components/Card/CardFooter.js";
import Button from "components/CustomButtons/Button.js";
import avatar from "assets/img/copa.png";
import axios from "axios";

export default function Dashboard() {
  
  const history = useHistory();
  
  const [
    isLoading, 
    setLoading] = useState(true);
  const [
    tournaments, 
    setTournaments] = useState([]);
  const [
    tournamentsID, 
    setTournamentsID] = useState([]);
  useEffect(() => {
    getTournaments();
    getTournamentsID();
  }, []);

  const getTournaments = () => {
    axios.get('http://localhost:5000/getTournament')
                .then(response => {
                  let temp = response.data.Tournaments;
                  console.log("TEMP VALUE:", temp);
                  setTournaments(temp);
                  setLoading(false);
                })
                .catch(error => {
                  console.error('There was an error!', error);
                });
    }
  const getTournamentsID = () => {
    axios.get('http://localhost:5000/getTournamentDB')
                .then(response => {
                  let temp = response.data.Tournaments;
                  console.log("TEMP VALUE:", temp);
                  setTournamentsID(temp);
                  setLoading(false);
                })
                .catch(error => {
                  console.error('There was an error!', error);
                });
    }
  
  const Description = tournaments;
  const Index = tournamentsID;
  //const Description = ["ID-1","ID-2","ID-3","ID-4","ID-5"];
  //const Index = ["ID1","ID2","ID3","ID4","ID5"];

  const handleInputChange = (i) => {
    sessionStorage.setItem("TournamentID", Index[i]);
    history.push({
        pathname: '/admin/viewtournament/',
    });
  };
  const addButton = () => {
    if(sessionStorage.getItem("Type") === "admin"){
      return(
        <CardFooter>
          <Button color="primary">Add Match</Button>
        </CardFooter>
      )
    }else{
      return null;
    }
  };
  if (sessionStorage.getItem("Verified") !== "true"){
    alert("Error al inicio de sesion");
    history.push("/auth/login-page");
  }
  else if (isLoading) {
    return <div className="CreateTournament">Loading...</div>;
  }
  else{
    return (
      <div>
        <GridContainer>
        {Description.map((data,i) =>{
          return(
            <GridItem xs={12} sm={6} md={3} key={i}>
              <Card>
                <CardHeader color="warning" stats icon>
                  <CardImages profile>
                    <img src={avatar} alt="avatar" />
                  </CardImages>
                </CardHeader>
                <CardBody>
                  <h3>{data}</h3>
                </CardBody>
                <CardFooter>
                  <Button color="primary" onClick={(event) => handleInputChange(i,event)}>View Tournament</Button>
                </CardFooter>
                {addButton()}
              </Card>
            </GridItem>
          );
        })}
        </GridContainer>
      </div>
    );
  }
}
