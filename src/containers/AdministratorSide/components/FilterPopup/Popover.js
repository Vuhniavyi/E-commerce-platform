import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  typography: {
    padding: '16px 16px 25px 16px'
  }
}));

export default function FilterPopover({
  handleClose,
  anchorEl,
  id,
  open,
  children
}) {
  const classes = useStyles();

  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 290,
        horizontal: 'center'
      }}
      transformOrigin={{
        vertical: 'center',
        horizontal: 450
      }}
    >
      <Typography className={classes.typography} component={'div'}>
        {children}
      </Typography>
    </Popover>
  );
}
