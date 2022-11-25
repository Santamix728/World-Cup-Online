import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-dashboard-react/checkboxAdnRadioStyle.js";
import PropTypes from "prop-types";

const useStyles = makeStyles(styles);

export default function ControlledRadioButtonsGroup(props) {
  const { formControlProps, row, value, onChange, labelText, options} = props;
  const classes = useStyles();

  return (
    <FormControl
      {...formControlProps}
      className={formControlProps.className + " " + classes.FormControl}
    >
      <FormLabel id="radio-buttons" classes={classes}>
        {labelText}
      </FormLabel>
      <RadioGroup
        row={row}
        aria-labelledby="radio-buttons"
        name="radio-buttons"
        value={value}
        onChange={onChange}
      >
        {options.map((option, index) => {
            return <FormControlLabel 
                      classes={classes}
                      value={option.value}
                      control={<Radio classes={classes}/>}
                      label={option.label}
                      key={index}
                    />
        })}
      </RadioGroup>
    </FormControl>
  );
}

ControlledRadioButtonsGroup.propTypes = {
  formControlProps: PropTypes.object,
  options: PropTypes.arrayOf( PropTypes.object ),
  labelText: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  row: PropTypes.bool,
}
