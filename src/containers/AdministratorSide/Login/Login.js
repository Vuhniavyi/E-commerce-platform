import React, { Fragment } from 'react';
import { connect, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Icon as MaterialIcon } from '@material-ui/core';
import styles from './Login.module.css';
import MyButton from '../components/Buttons/Button';
import { login } from '../../../actions/userActions';
import TextField from '@material-ui/core/TextField';
import { Formik } from 'formik';

// import Button from '@material-ui/core/Button';

// const FormItem = Form.Item;

const Login = ({ login, history, location }) => {
  const userRole = useSelector(state => state.user.role);

  if (localStorage.getItem('token')) {
    if (userRole) {
      history.replace('/admin/main');
    }
  }

  const fromLocation = (location.state && location.state.from.pathname) || '/admin/main';

  const onSubmit = values => {
    login(values).then(() => {
      history.push(fromLocation);
    });
  };

  const validate = values => {
    let errors = {};
    if (!values.email) {
      errors.email = 'Заполните  поле Email';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = 'Невернный формат email!';
    }
    if (!Boolean(values.password.trim())) {
      errors.password = 'Введите пароль!';
    }
    return errors;
  };

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validate={validate}
      onSubmit={onSubmit}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleSubmit

        /* and other goodies */
      }) => (
          <form className={styles.form} onSubmit={handleSubmit}>
            <div>
              <h2 className={styles.title}>Вход</h2>
              <div className={styles.inputs}>
                <MaterialIcon style={{ margin: '30px 15px 0 0' }}>
                  email
              </MaterialIcon>
                <TextField
                  label="E-mail"
                  name="email"
                  // className={classes.textField}
                  value={values.email}
                  onChange={handleChange}
                  helperText={errors.email}
                  fullWidth
                  // onBlur={handleBlur}

                  error={errors.email || (touched.email && errors.email)}
                  margin="normal"
                />
              </div>
              <div className={styles.inputs}>
                <MaterialIcon style={{ margin: '30px 15px 0 0' }}>
                  lock_outline
              </MaterialIcon>
                <TextField
                  label="Пароль"
                  name="password"
                  type="password"
                  // className={classes.textField}
                  value={values.password}
                  onChange={handleChange}
                  fullWidth
                  // onBlur={handleBlur}
                  helperText={errors.password}
                  error={errors.password || (touched.password && errors.password)}
                  margin="normal"
                />
              </div>

            </div>
            <div className={styles.forgot}>
              <MyButton
                title="Забыли пароль?"
                component={prop => <Link {...prop} />}
                to="/auth/reset_password"
              ></MyButton>
            </div>
            <div className={styles.enterBtn}>
              <MyButton
                title="ВОЙТИ"
                fullWidth
                type="submit"
                myvariant="green"
              ></MyButton>
            </div>
            <div className={styles.pan}>Нет аккаунта?</div>
            <div>
              <MyButton
                component={prop => <Link {...prop} />}
                to="/auth/registration"
                fullWidth
                title="Регистрация"
              ></MyButton>
            </div>
          </form>
        )}
    </Formik>
  );
};

// const WrappedNormalLoginForm = Form.create()(Login);

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  login: user => dispatch(login(user))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
