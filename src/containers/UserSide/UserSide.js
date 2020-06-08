import React, { Component } from 'react';
// import Header from './components/Header/Header';
import { Link } from 'react-router-dom';
import styles from "./UserSide.module.css";


const UserSide = ({ children }) => {
  return (
    <div className={styles.wrap}>
      <Link
        style={{ position: 'absolute', top: 20, left: 20, fontSize: 40 }}
        to="/"
      >
        HOME
        </Link>
      <div className="size-container content">
        {children}
      </div>
    </div>
  );
}

export default UserSide;
