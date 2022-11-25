import React, {useState} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { useEffect } from "react";

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
  cardTitleWhiteAux: {
    color: "#0818a7",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "0px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1",
    },
  },
};

const useStyles = makeStyles(styles);

const data = {
  "Ranking Global": [
      [
          [
            "David",
            "David",
            "Pereira",
            100
          ]
      ],
      [
          [
            "F1",
            "Fanatico 1",
            "Fanatico 1",
            100
          ]
      ],
      [
          [
            "Aldox",
            "Aldo",
            "Cambronero",
            90
          ]
      ],
      [
          [
            "F2",
            "Fanatico 2",
            "Fanatico 2",
            75
          ]
      ]
  ],
  "UserPosition": 4,
  "UserView": [
      [
        "F2",
        "Fanatico 2",
        "Fanatico 2",
        75
      ]
  ]
}

export default function TableList() {
  const classes = useStyles();
  const [dataTable, setDataTable] = useState([[]]);
  const [userTable, setUserTable] = useState([[]]);
  

  useEffect(() => {
    var auxData = []
    data["Ranking Global"].map((element, index) => {
      var auxElement = [index+1];
      element[0].map(auxData => {
        auxElement.push(auxData)
      })
      auxData.push(auxElement)
    })
    setDataTable(auxData)
    var auxUser = []
    var auxElementUser = [data.UserPosition]
    data.UserView[0].map(dataUser =>{
      auxElementUser.push(dataUser);
    });
    auxUser.push(auxElementUser);
    setUserTable(auxUser);
  }, []);

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardBody>
            <h4 className={classes.cardTitleWhiteAux}>My position</h4>
            <Table
              tableHeaderColor="primary"
              tableHead={["Ranking", "Username", "Name", "Lastname", "Points"]}
              tableData={userTable}
            />
          </CardBody>
        </Card>
      </GridItem>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Global Ranking</h4>
            <p className={classes.cardCategoryWhite}>
              Here you can see the global ranking of this tournament
            </p>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={["Ranking", "Username", "Name", "Lastname", "Points"]}
              tableData={dataTable}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}