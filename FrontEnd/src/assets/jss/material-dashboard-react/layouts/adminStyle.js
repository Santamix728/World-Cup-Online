import {
  drawerWidth,
  transition,
  container,
} from "assets/jss/material-dashboard-react.js";
const appStyle = (theme) => ({
  containerCenter: {
    position: "center",
  },  
  wrapper: {
    position: "relative",
    top: "0",
    height: "100vh",
  },
  
  mainPanel: {
    [theme.breakpoints.up("md")]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
    overflow: "auto",
    position: "relative",
    float: "right",
    ...transition,
    maxHeight: "100%",
    width: "100%",
    overflowScrolling: "touch",
  },
  content: {
    marginTop: "50px",
    paddingRight: "30px",
    paddingLeft: "30px",
    minHeight: "calc(100vh - 123px)",
  },
  container,
  map: {
    marginTop: "20px",
  },
});

export default appStyle;
