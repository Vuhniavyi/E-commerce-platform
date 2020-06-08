import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles(theme => ({
  root: {
    '& > svg': {
      margin: theme.spacing(2)
    }
  },

  help: {
    color: 'rgb(255, 175, 2)'
  },
  success: {
    color: 'green'
  }
}));

export default function Icons(props) {
  const classes = useStyles();
  const renderIcon = () => {
    switch (props.variants) {
      case 'icon-no-text':
        return (
          <IconButton aria-label="delete" {...props}>
            {props.children}
          </IconButton>
        );
      case 'default':
        return (
          <Icon {...props} fontSize="default">
            {props.icon}
          </Icon>
        );
      case 'help':
        return (
          <Icon fontSize="large" className={classes.help}>
            help_outline
          </Icon>
        );
      case 'success':
        return (
          <Icon fontSize="large" className={classes.success}>
            where_to_vote
          </Icon>
        );
      case 'report':
        return (
          <Icon fontSize="large" color="error">
            report_off
          </Icon>
        );
      default:
        return <div>Error</div>;
    }
  };
  return renderIcon();
}
