import React from 'react';
// import { Form, Input } from 'antd';
import { Link } from 'react-router-dom';
import styles from './Reset.module.css';
import { Formik } from 'formik';
// import Button from '@material-ui/core/Button';
import { resetPassword } from '../../../actions/userActions';
import MyButton from '../components/Buttons/Button';
// import logo from '../../../img/logo2.png';
// import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Icon as MaterialIcon } from '@material-ui/core';

const ResetPassword = props => {
  const validate = values => {
    let errors = {};
    if (!values.email) {
      errors.email = 'Заполните  поле Email';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = 'Невернный формат email!';
    }

    return errors;
  };
  const onSubmit = values => {
    resetPassword(values).then(() => {
      props.history.push('/');
    });
  };
  return (
    <Formik
      initialValues={{
        email: ''
      }}
      validate={validate}
      onSubmit={onSubmit}
    >
      {({
        values,
        errors,
        handleChange,
        handleSubmit
        /* and other goodies */
      }) => (
        <form className={styles.form} onSubmit={handleSubmit}>
          <div>
            <h2 className={styles.title}>Восстановление Пароля</h2>

            <div className={styles.inputs}>
              <MaterialIcon style={{ margin: '30px 15px 0 0' }}>
                email
              </MaterialIcon>
              <TextField
                label="Ваш E-mail"
                name="email"
                fullWidth
                // className={classes.textField}
                value={values.email}
                onChange={handleChange}
                helperText={errors.email}
                // onBlur={handleBlur}
                error={errors.email}
                margin="normal"
              />
            </div>
          </div>
          <div className={styles.inputs}>
            <MyButton
              title="Отправить"
              fullWidth
              type="submit"
              myvariant="green"
            ></MyButton>
          </div>

          <div className={styles.inputs}>
            <MyButton
              fullWidth
              title="Попробовать войти"
              component={val => <Link {...val} />}
              to="/auth/login"
            ></MyButton>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default ResetPassword;
