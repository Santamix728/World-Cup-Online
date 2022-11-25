import {
    transition,
    container,
  } from "assets/jss/material-dashboard-react.js";


  const viewtournamentStyle = () => ({
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
    containerCenter: {
      position: "center",
    },  
    wrapper: {
      position: "relative",
      top: "0",
      height: "100vh",
    },
    mainPanel: {
      overflow: "auto",
      position: "relative",
      float: "right",
      ...transition,
      maxHeight: "100%",
      width: "100%",
      overflowScrolling: "touch",
    },
    content: {
      marginTop: "0px",
      paddingRight: "0px",
      paddingLeft: "0px",
      minHeight: "calc(100vh - 123px)",
    },
    container,
    map: {
      marginTop: "20px",
    },
  });
  
  export default viewtournamentStyle;