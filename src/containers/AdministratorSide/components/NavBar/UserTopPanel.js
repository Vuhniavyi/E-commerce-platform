import React, { Fragment, useState } from 'react';
import { Menu as MaterialMenu } from '@material-ui/core';
import { MenuItem as MaterialMenuItem } from '@material-ui/core';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
// import { SettingsApplications } from '@material-ui/icons';
import { Icon as MaterialIcon } from '@material-ui/core';
import styles from './NavBar.module.css';

const roleList = {
  ['CONTRACTOR']: 'Поставщик',
  ['PARTNER']: 'Продавец'
};
const StyledMenu = withStyles({
  paper: {
    top: '65px !important',
    left: '68px !important',
    background: 'rgb(66, 66, 66)',
    border: 'none',
    color: '#fff'
  }
})(props => (
  <MaterialMenu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center'
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center'
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles(theme => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white
      }
    }
  }
}))(MaterialMenuItem);

const UserTopPanel = ({ user, goto, asideMenu }) => {
  const [anchorEl, handleClick] = useState(null);

  const setAnchorEl = val => {
    handleClick(val);
  };
  const handleClickOk = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('persist:root');
    window.location.href = `${window.location.origin}/`;
  };
  return (
    <Fragment>
      <div className={styles.userAvatarWrapper} onClick={handleClickOk}>
        {user.avatarImage ? (
          <Fab
            style={{
              width: '45px',
              height: '45px',
              borderRadius: '100%',
              objectFit: 'cover',
              marginRight: '3px'
            }}
            className={styles.fab}
          >
            <img
              style={{ objectFit: 'cover', width: '45px', height: '45px', borderRadius: '100%' }}
              src={user.avatarImage}
            />
          </Fab>
        ) : user.firstName || user.lastName ? (
          <Fab className={styles.fab}>
            {user.firstName && <span>{user.firstName[0]}</span>}
            {user.lastName && <span>{user.lastName[0]}</span>}
          </Fab>
        ) : (
          <Fab
            style={{ objectFit: 'cover', width: '45px', height: '45px', borderRadius: '100%' }}
            className={styles.fab}
          >
            ?
          </Fab>
        )}

        {!asideMenu && (
          <Fragment>
            <div className={styles.userNames}>
              <p>{user.firstName}</p>
              <p>{user.lastName}</p>

              <div className={styles.roles}>{roleList[user.role]}</div>
            </div>

            <MaterialIcon style={{ color: '#fff', fontSize: '1.2rem' }}>
              settings
            </MaterialIcon>
          </Fragment>
        )}
      </div>

      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem onClick={() => goto('profile_settings')}>
          <ListItemIcon>
            <MaterialIcon style={{ color: '#fff' }}>settings</MaterialIcon>
          </ListItemIcon>
          <ListItemText primary="Настройки" />
        </StyledMenuItem>
        <StyledMenuItem onClick={handleLogout}>
          <ListItemIcon>
            <MaterialIcon style={{ color: '#fff' }}>exit_to_app</MaterialIcon>
          </ListItemIcon>
          <ListItemText primary="Выход" />
        </StyledMenuItem>
      </StyledMenu>
    </Fragment>
  );
};

export default UserTopPanel;
