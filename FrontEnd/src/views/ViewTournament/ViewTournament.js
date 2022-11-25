import React, {useEffect, useState} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { Switch, Route, Redirect } from "react-router-dom";
// core components
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import SimpleNavbar from "components/Navbars/SimpleNavbar.js";
import routes from "routesTournament.js";
import styles from "assets/jss/material-dashboard-react/views/viewtournamentStyle.js";
import axios from "axios";

const useStyles = makeStyles(styles);

export default function ViewTournament() {
  const classes = useStyles();
  const [tournamentID, setTournamentID] = useState("");
  const [userName, setUserName] = useState("");
  const [PLCode, setPLCode] = useState();

  //Aqui se necesita un axios para capturar el ID de la liga del torneo y del usuario

  useEffect(() => {
    setTournamentID(sessionStorage.getItem("TournamentID"));
    setUserName(sessionStorage.getItem("User"));
  },[]);

  // *************************************************************
  // *********************** GET DATA ****************************
  const callData = async () => {
    let tempTID = sessionStorage.getItem("TournamentID");
    let tempUN = sessionStorage.getItem("User");
    await axios.get('http://localhost:5000/getLiga/'+tempUN+","+tempTID)
                .then(response => {
                  if(response.data.idLiga == null){
                    setPLCode("1");
                  }else{
                    setPLCode(response.data.idLiga);
                  }
                })
                .catch(error => {
                console.error('There was an error!', error);
                });
  }
  useEffect(async () => {
      await callData();
  }, []);

  console.log("UserName:",userName)

  sessionStorage.setItem("PrivateLeagueCode", PLCode) //Dato capturado porfa

  return (
    <div className={classes.mainPanel}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Tournament ID: {tournamentID}</h4>
          </CardHeader>
          <CardFooter>
            <SimpleNavbar
              routes={routes}
            />
          </CardFooter>
        </Card>
        <div className={classes.content}>
          <Card>
            <Switch>
              {routes.map((prop, key) => {
                if (prop.layout === "/admin/viewtournament") {
                  return (
                    <Route
                      path={prop.layout + prop.path}
                      component={prop.component}
                      key={key}
                    />
                  );
                }
                return null;
              })}
            </Switch>
            <Redirect from="/admin/viewtournament" to="/admin/viewtournament/viewmatches"/>
          </Card>
        </div>
    </div>
  );
}
