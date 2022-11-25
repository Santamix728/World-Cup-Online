import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Button from '@mui/material/Button';
import CustomInput from "components/CustomInput/CustomInput.js";
import Typography from '@mui/material/Typography';
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import Link from '@mui/material/Link';
import BasicDatePicker from "components/DatePicker/DatePicker.js";
import axios from "axios";

export default function SignUp() {
  const history = useHistory();
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirst] = useState("");
  const [lastName, setLast] = useState("");
  const [country, setCountry] = useState("");
  const [birthday, setIDate] = useState(null);
  
  const handleUserChange = (event) => {
    setUser(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleFirstChange = (event) => {
    setFirst(event.target.value);
  };
  const handleLastChange = (event) => {
    setLast(event.target.value);
  };
  const handleCountryChange = (event) => {
    setCountry(event.target.value);
  };
  const handleIDateChange = (event) => {
    setIDate(event);
  };
  const handleClick = async (event) => {

    event.preventDefault();
    const json = {
      
      '" Username "': "",
      '" Email "': "",
      '" Password "': "",
      '" FirstName "': "",
      '" LastName "': "",
      '" Country "': "",
      '" Birthday "': "",
      '" isAdmin "': "",
    };
    
    json.Username = user;
    json.Email = email;
    json.Password = password;
    json.Firstname = firstName;
    json.Lastname = lastName;
    json.Country = country;
    json.Birthday =  new Date(birthday).toLocaleDateString();
    json.isAdmin = "False"
    
    
    console.log(json);

    const headers = {
      "Access-Control-Allow-Origin": "*",

      "Access-Control-Allow-Headers":
        "Origin, X-Requested-With, Content-Type, Accept",

      "Content-Type": "application/json",
    };
    let validate="False"
    await axios
      .post("http://localhost:5000/createUser", json, { headers })
      .then((response) => {
        if (response){
            validate="True"
        }})
      .catch((error) => console.error("There was an error!", error));
      console.log(validate)
    if (validate=="True"){
      history.push("/auth/login-page");
    }
  };
  return (
  <GridContainer alignItems={"center"} justify={"center"}>
    <GridItem xs={6} md={6}>
      <Card>
        <CardHeader color="primary">
          <h4>Create Profile</h4>
        </CardHeader>
        <CardBody>
          <GridContainer alignItems={"center"} justify={"center"}>
            <GridItem xs={6} md={6}>
                <CustomInput
                  labelText="Username"
                  id="username-id"
                  type="text"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    onChange: (event) => handleUserChange(event),
                  }}
                />
                <CustomInput
                  labelText="Email address"
                  id="email-address"
                  type="email"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    onChange: (event) => handleEmailChange(event),
                  }}
                />
                <CustomInput
                  labelText="Password"
                  type="Password"
                  id="password"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    onChange: (event) => handlePasswordChange(event),
                  }}
                />
                <CustomInput
                  labelText="First Name"
                  type="text"
                  id="first-name"
                  formControlProps={{
                      fullWidth: true,
                  }}
                  inputProps={{
                    onChange: (event) => handleFirstChange(event),
                  }}
                />
                <CustomInput
                  labelText="Last Name"
                  type="text"
                  id="last-name"
                  formControlProps={{
                      fullWidth: true,
                  }}
                  inputProps={{
                    onChange: (event) => handleLastChange(event),
                  }}
                />
                <CustomInput
                  labelText="Country"
                  id="country"
                  type="text"
                  formControlProps={{
                      fullWidth: true,
                  }}
                  inputProps={{
                    onChange: (event) => handleCountryChange(event),
                  }}
                />
                <BasicDatePicker
                    labelText="Birthday"
                    id="birthday"
                    value={birthday}
                    onChange={(date) => handleIDateChange(date)}
                    formControlProps={{
                        fullWidth: true,
                    }}
                />
                <br></br>
                <GridItem xs={12} md={12}>
                  <Typography variant="body2" color="text.secondary" align="center">{"If you create the account you accept to the "}
                  <Link href="https://www.fifa.com/es/terms-of-service">Terms and Conditions
                  </Link>
                  </Typography>
                </GridItem>
                <br></br>
                <Button color="primary"  onClick={handleClick}>Create Profile</Button>
            </GridItem>
          </GridContainer>
        </CardBody>
      </Card>
    </GridItem>
  </GridContainer>
  );
}