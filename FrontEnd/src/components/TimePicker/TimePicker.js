import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
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

export default function BasicTimePicker(props) {
  const classes = useStyles();
  const {
    formControlProps,
    value,
    labelText,
    id,
    inputProps,
    error,
    success,
    onChange,
  } = props;
  let newInputProps = {
    maxLength:
      inputProps && inputProps.maxLength ? inputProps.maxLength : undefined,
    minLength:
      inputProps && inputProps.minLength ? inputProps.minLength : undefined,
    step: inputProps && inputProps.step ? inputProps.step : undefined,
  };
  return (
    <FormControl
      {...formControlProps}
      className={formControlProps.className + " " + classes.formControl}
    >
      <FormControl>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
            label={labelText}
            id={id}
            value={value}
            onChange={onChange}
            {...inputProps}
            inputProps={newInputProps}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        {error ? (
          <Clear className={classes.feedback + " " + classes.labelRootError} />
        ) : success ? (
          <Check
            className={classes.feedback + " " + classes.labelRootSuccess}
          />
        ) : null}
      </FormControl>
    </FormControl>
  );
}

BasicTimePicker.propTypes = {
  labelText: PropTypes.string,
  id: PropTypes.string,
  value: PropTypes.object,
  onChange: PropTypes.func,
  formControlProps: PropTypes.object,
  labelProps: PropTypes.object,
  inputProps: PropTypes.object,
  error: PropTypes.bool,
  success: PropTypes.bool,
};
