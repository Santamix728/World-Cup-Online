import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import styles from "assets/jss/material-dashboard-react/components/customInputStyle.js";
// @material-ui/icons
import Clear from "@material-ui/icons/Clear";
import Check from "@material-ui/icons/Check";

const useStyles = makeStyles(styles);

export default function BasicSelect(props) {
  const classes = useStyles();
  const { value, formControlProps, labelText, id, error, success, options, handleChange } = props;

  return (
    <FormControl
      {...formControlProps}
      className={formControlProps.className + " " + classes.formControl}
    >
      <FormControl>
        <InputLabel id="demo-simple-select-label">{labelText}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id={id}
          value={value}
          options={options}
          label={labelText}
          onChange={handleChange}
        >
          {options.map((option,index) => (
            <MenuItem key={index} value={option}>{option}</MenuItem>
          ))}
        </Select>
      </FormControl>
      {error ? (
        <Clear className={classes.feedback + " " + classes.labelRootError} />
      ) : success ? (
        <Check className={classes.feedback + " " + classes.labelRootSuccess} />
      ) : null}
    </FormControl>
  );
}

BasicSelect.propTypes = {
  value: PropTypes.array,
  labelText: PropTypes.string,
  id: PropTypes.string,
  formControlProps: PropTypes.object,
  labelProps: PropTypes.object,
  error: PropTypes.bool,
  success: PropTypes.bool,
  options: PropTypes.any,
  handleChange: PropTypes.any,
};
