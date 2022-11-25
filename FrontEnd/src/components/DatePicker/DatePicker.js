import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
// @material-ui/icons
import Clear from "@material-ui/icons/Clear";
import Check from "@material-ui/icons/Check";
// core components
import styles from "assets/jss/material-dashboard-react/components/customInputStyle.js";
import { TextField } from "@material-ui/core";

const useStyles = makeStyles(styles);

export default function BasicDatePicker(props) {
  const classes = useStyles();
  const {
    formControlProps,
    value,
    onChange,
    labelText,
    id,
    error,
    success,
  } = props;
  return (
    <FormControl
      {...formControlProps}
      className={formControlProps.className + " " + classes.formControl}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label={labelText}
          id={id}
          value={value}
          onChange={onChange}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
      {error ? (
        <Clear className={classes.feedback + " " + classes.labelRootError} />
      ) : success ? (
        <Check className={classes.feedback + " " + classes.labelRootSuccess} />
      ) : null}
    </FormControl>
  );
}

BasicDatePicker.propTypes = {
  labelText: PropTypes.string,
  id: PropTypes.string,
  value: PropTypes.object,
  onChange: PropTypes.func,
  formControlProps: PropTypes.object,
  labelProps: PropTypes.object,
  error: PropTypes.bool,
  success: PropTypes.bool,
};
