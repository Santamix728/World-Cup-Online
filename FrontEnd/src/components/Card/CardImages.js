import React from "react";

import classNames from "classnames";

import { PropTypes } from "prop-types";

import { makeStyles } from "@material-ui/core/styles";

import styles from "assets/jss/material-dashboard-react/components/cardImagesStyles.js";

const useStyles = makeStyles(styles);

export default function CardImages(props) {
  const classes = useStyles();
  const { className, children, profile, ...rest } = props;
  const cardImagesClasses = classNames({
    [classes.cardImages]: true,
    [classes.cardImageProfile]: profile,
    [className]: className !== undefined,
  });
  return (
    <div className={cardImagesClasses} {...rest}>
      {children}
    </div>
  );
}

CardImages.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  profile: PropTypes.bool,
};
