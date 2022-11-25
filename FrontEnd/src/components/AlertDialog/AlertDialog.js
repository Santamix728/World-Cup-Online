import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';

export default function AlertDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAgree = async (event) => {
    event.preventDefault()
    const json = {
        "_idPrivateTournament":"",
        "_idTournament":"",
        "Username": "",
    };
    console.log("PLCode:",sessionStorage.getItem("PrivateLeagueCode"));
    json.Username = sessionStorage.getItem("User");
    json._idTournament = sessionStorage.getItem("TournamentID");
    json._idPrivateTournament = sessionStorage.getItem("PrivateLeagueCode");
    console.log(json);
    const headers = {
        "Access-Control-Allow-Origin": "*",
  
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept",
  
        "Content-Type": "application/json",
      };
      let validate="False"
      await axios
      .put("http://localhost:5000/leavePrivateLeague/", json, { headers })
      .then((response) => {
        if (response){
          validate="True"
        }})
      .catch((error) => console.error("There was an error!", error));
      console.log(validate)
      //Si ya esta en unido a un liga privada no puede crear una  
      if (validate=="True"){
        alert("Ya no pertenece a ninguna liga privada.");
        setOpen(false);
        window.location.reload(false);
        //history.push("/admin/viewtournament/createPrivateLeague");
      }
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Leave Private League
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to leave this private league ?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            If you leave this private link, all your data will be deleted.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAgree} autoFocus>Leave</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}