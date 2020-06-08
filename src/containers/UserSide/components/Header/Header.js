import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import 'antd/dist/antd.css';


class Header extends Component {
  render() {
    return (
      <header>
        <nav id="cabecalho">
          <div className="logo">
            <Link to="/" id="logo"></Link>
          </div>
          <div className="rightnav">
            <div className="enter">
              <p className="entertext">
                <Link to="/auth/login" className="entertext">
                  Войти
                </Link>
              </p>
            </div>
            <div class="register">
              <p class="registertext">
                <Link to="/auth/registration">Регистрация</Link>
              </p>
            </div>
          </div>
        </nav>
      </header>
    );
  }
}

export default Header;
