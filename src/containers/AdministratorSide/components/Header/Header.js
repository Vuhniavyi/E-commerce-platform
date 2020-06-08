import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import { Icon as MaterialIcon } from '@material-ui/core';

import notify from '../../../../img/pictures/notification2.svg';
import cart from '../../../../img/pictures/headercart.svg';
import logo from '../../../../img/pictures/logoshort.png';

import { toogleAsideMenu } from 'store/actions/menuActions';

import styles from './Header.module.css';

const StyledButton = withStyles({
  root: {
    backgroundColor: 'transparent',
    '&:hover': {
      backgroundColor: 'rgba(0,0,0,0.1)'
    },
    boxShadow: 'none'
  }
})(Fab);

class Header extends Component {
  state = {
    firstName: 'User'
  };

  handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = `${window.location.origin}/`;
  };

  render() {
    const { asideMenu, toogleMenu } = this.props;

    return (
      <div className="container">
        <header className={styles.header}>
          <div onClick={toogleMenu} className={styles.navButton}>
            <StyledButton
              size="small"
              variant="round"
            >
              {asideMenu.asideMenu ? (
                <MaterialIcon>keyboard_arrow_right</MaterialIcon>
              ) : (
                  <MaterialIcon>keyboard_arrow_left</MaterialIcon>
                )}
            </StyledButton>
          </div>
          <div className={styles.logo}>
            <img src={logo} alt="logo" />
          </div>
          <div className={styles.controls}>
            <div className={styles.cart}>
              <div className={styles.count}>0</div>
              <img src={cart} alt="logoHeader" />
            </div>
            <div className={styles.notify}>
              <div className={styles.count}>0</div>
              <img src={notify} alt="logoHeader" />
            </div>
            <div className={styles.userBlock}>
            </div>
          </div>
        </header>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  asideMenu: state.asideMenu
});

const mapDispatchToProps = dispatch => ({
  toogleMenu: () => dispatch(toogleAsideMenu())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
