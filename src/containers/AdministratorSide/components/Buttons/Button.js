import React from 'react';
import { NavLink, Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import styles from './button.module.css';

const useStyles = makeStyles(theme => ({
  button: {
    // margin: theme.spacing(1),
    '&:hover': {
      color: '#26c6da'
    }
  },
  default: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '0 0 15px 0',
    '&:hover': {
      color: '#26c6da'
    }
  },
  activClass: {
    backgroundColor: '#26c6da',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#08bcd6',
      color: '#fff'
    }
  },
  fab: {
    backgroundColor: '#26c6da',
    height: 30,
    width: 35,
    marginRight: '10px',
    // ...rootStyle.root,
    borderRadius: '50%',
    '&:hover': {
      backgroundColor: '#0290a3'
    }
  }
  // root: rootStyle.root
}));
const StyledButton = withStyles({
  root: {
    backgroundColor: '#26c6da',
    border: 0,
    borderRadius: 3,
    boxShadow:
      '0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12);',
    color: 'white',
    height: 40,
    '&:hover': {
      backgroundColor: '#0290a3'
    }
  },
  label: {
    textTransform: 'capitalize',
    fontSize: 14
  }
})(Button);


export default function MyButton(prop) {
  const classes = useStyles();
  const { title, myvariant } = prop;
  const renderBtn = () => {
    switch (myvariant) {
      case 'withIcon':
        return (
          <div className={styles.container}>
            <Button {...prop}>
              <Fab
                component="div"
                disabled={prop.disabled}
                aria-label="delete"
                size="small"
                className={classes.fab}
              >
                <AddIcon style={{ color: '#fff', fontSize: 20 }} />
              </Fab>
              <span className={styles.title}>{title}</span>
            </Button>
          </div>
        );
      case 'defaultlink':
        return (
          <Button
            variant="contained"
            component={props => (
              <Link {...props} activeClassName={classes.activClass}></Link>
            )}
            {...prop}
            className={classes.default}
          // className={classes.button}
          >
            <span>{title}</span>
          </Button>
        );
      case 'extends':
        return (
          <Fab
            {...prop}
            variant="extended"
            aria-label="delete"
            size="medium"
            className={classes.fab}
          >
            <AddIcon style={{ color: '#fff', fontSize: 30 }} />
            {title}
          </Fab>
        );
      case 'green':
        return <StyledButton {...prop}>{title}</StyledButton>;
      default:
        return (
          <Button className={classes.button} {...prop}>
            {title}
          </Button>
        );
    }
  };
  return renderBtn();
}
