import {
  primaryColor,
  blackColor,
} from "assets/jss/material-dashboard-react.js";

const checkboxAdnRadioStyle = {
  root: {
    padding: "13px",
    "&:hover": {
      backgroundColor: "unset",
    },
  },
  label: { 
    fontSize: '0.6rem',
    color: blackColor,
  },
  checked: {
    color: primaryColor[0] + "!important",
  },
  focused: {
    color: primaryColor[0] + "!important"
  }
};

export default checkboxAdnRadioStyle;
