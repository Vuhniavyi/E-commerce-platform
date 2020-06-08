import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './Registration.module.css';
import MyButton from '../components/Buttons/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import Typography from '@material-ui/core/Typography';

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2)
  }
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1)
  }
}))(MuiDialogActions);

export default function ConfirmRegistration({ open, handleClose }) {
  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <div className={styles.titleConfirm}>Регистрация прошла успешно!</div>
      <DialogContent>
        <div className={styles.confirmContent}>
          <CheckCircleOutlineIcon
            style={{ marginRight: 15, fontSize: 45, color: 'green' }}
          />
          <Typography>
            Спасибо за за регистрацию. На ваш E-mail был выслан код активации
            аккаунта!
          </Typography>
        </div>
      </DialogContent>
      <DialogActions>
        <MyButton
          title="Продолжить"
          onClick={handleClose}
          myvariant="green"
        ></MyButton>
      </DialogActions>
    </Dialog>
  );
}
