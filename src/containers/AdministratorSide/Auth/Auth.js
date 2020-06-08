import React from 'react';
import SliderSlick from './Slider';
import styles from './auth.module.css';

const Auth = ({ children }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <SliderSlick />
        {children}
      </div>
    </div>
  );
}

export default Auth;
