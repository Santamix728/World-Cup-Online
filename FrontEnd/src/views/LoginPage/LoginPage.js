import React, { useState } from "react";
import Button from '@mui/material/Button';
import CustomInput from "components/CustomInput/CustomInput.js";
import { useHistory } from "react-router-dom";

import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import CardHeader from "components/Card/CardHeader.js";
import Link from '@mui/material/Link';
import axios from "axios";

export default function LoginPage() {
  const history = useHistory();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  
  const handleChangeUser = (event) => {
    setUser(event.target.value);
  };
  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };
  
  const handleClick = async (event) => {
    event.preventDefault();
    const json = {
      
      '" Username "': "",
      '" Password "': "",
    };
    
    json.Password = password;
    json.Username = user;
    let valid='False'
    let userTemp=''
    let isAdminTemp=''
    await axios
      .get(`http://localhost:5000/getUserLogin/${json.Username},${json.Password}`)
      .then((response) => {
        let temp = response.data.Validate;

        if (temp == "Encontrado"){
            valid="True"
            userTemp=response.data.Username
            if(response.data.isAdmin=='True'){
              isAdminTemp='admin'
            }else{
              isAdminTemp='user'
            }
        }if(temp == "Datos incorrectos"){
            valid="False"
        }})
      .catch((error) => console.error("There was an error!", error));
    
    
    if (valid=="True"){

      sessionStorage.setItem("Verified", true);
      sessionStorage.setItem("User", userTemp);
      sessionStorage.setItem("Type", isAdminTemp);
      history.push("/admin/dashboard");
    }
    if (valid=="False"){
        alert("Datos incorrectos, por favor intentelo nuevamente")
    }
    
    
  };
  return (
  <GridContainer alignItems={"center"} justify={"center"}>
    <GridItem xs={6} md={6}>
      <Card>
        <CardHeader color="primary">
          <h4>Login</h4>
        </CardHeader>
        <CardBody>
          <GridContainer alignItems={"center"} justify={"center"}>
            <GridItem xs={6} md={6}>
              
              <CustomInput
                labelText="Username"
                type="text"
                id="username-id"
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  onChange: (event) => handleChangeUser(event),
                }}
              />
              <CustomInput
                labelText="Password"
                id="password"
                type="text"
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  onChange: (event) => handleChangePassword(event),
                }}
              />
            </GridItem>
          </GridContainer>
        </CardBody>
        <CardFooter xs={6} md={6}>
          <Button color="primary"  onClick={handleClick}> Login </Button>
          <Link href="/auth/signup-page" variant="body2">
              {"Don't have an account? Sign Up"}
          </Link>
        </CardFooter>
      </Card>
    </GridItem>
  </GridContainer>
  );
}