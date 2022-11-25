import React, { useEffect, useState } from "react";
import axios from "axios";
// @material-ui/core components
import Quiniela from "components/Quiniela/Quiniela.js";

export default function matchResult() {
  const tournamentID = sessionStorage.getItem("TournamentID");
  
  console.log("Se captura todo lo del tournament: ", tournamentID);
  
  const [results, setResults] = useState([])
  const [matches, setMatches] = useState([]);

    // *************************************************************
    // *********************** GET DATA ****************************
    const callMatchs = async () => {
        await axios.get('http://localhost:5000/getMatchs/'+tournamentID)
                    .then(response => {
                    setMatches(response.data)
                    })
                    .catch(error => {
                    console.error('There was an error!', error);
                    });
        }
    useEffect(async () => {
        await callMatchs();
    }, []);
    const callResults = async () => {
        await axios.get('http://localhost:5000/getResultsAdmin')
                    .then(response => {
                        setResults(response.data.Results);
                        console.log("RESULTS:", results)
                    })
                    .catch(error => {
                    console.error('There was an error!', error);
                    });
        }
        
    useEffect(async () => {
        await callResults();
    }, []);

        
    return (
        <div>
        {
            matches.map((data, i) =>{ 
            var PlayersA = [];
            var PlayersB = [];
            data.PlayersA.forEach((player) => {
                PlayersA.push(player[0].concat(" ", player[1]));
            });
            data.PlayersB.forEach((player) => {
                PlayersB.push(player[0].concat(" ", player[1]));
            });
            return(
                <Quiniela
                key={i}
                matchID = {data.MatchID}
                teamA = {data.TeamA}
                teamB = {data.TeamB}
                playersA = {PlayersA}
                playersB = {PlayersB}
                isAdmin = {true}
                />
            )
            })
        }
        </div>
    );
}