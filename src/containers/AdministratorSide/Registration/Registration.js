import React from 'react';
import { Link } from 'react-router-dom';

import MyButton from '../components/Buttons/Button';
import styles from './Registration.module.css';
import { Icon as MaterialIcon } from '@material-ui/core';
import ConfirmRegistration from './ConfirmRegistration';
import TextField from '@material-ui/core/TextField';
import { Formik } from 'formik';
import { registration } from '../../../actions/userActions';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const rolesMap = ['PARTNER', 'CONTRACTOR'];

const Registration = props => {
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
    if (!Boolean(values.confirmPassword.trim())) {
      errors.confirmPassword = 'Введите пароль!';
    }
    if (values.confirmPassword !== values.password) {
      errors.password = 'пароли не совпадают';
      errors.confirmPassword = 'пароли не совпадают';
    }
    if (!/^\+38[0-9]{10}$/i.test(values.phone)) {
      errors.phone = 'Невернный телефон!';
    }
    return errors;
  };
  const [value, setValue] = React.useState(0);
  const [confirmState, setOpenConfirm] = React.useState(false);

  const handleCloseConfirm = () => {
    props.history.push('/auth/login');
    setOpenConfirm(false);
  };
  const handleChangeT = (event, newValue) => {
    setValue(newValue);
  };

  const onSubmit = values => {
    const obj = {
      ...values,
      role: rolesMap[value]
    };
    registration(obj).then(res => {
      setOpenConfirm(true);
      // success();

      // window.open(res.confirmUrl, '_blank');
    });
  };

  // const classes = useStyles();
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        confirmPassword: '',
        phone: ''
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
            <h2 className={styles.title}>Регистрация</h2>
            <Tabs
              centered
              value={value}
              onChange={handleChangeT}
              indicatorColor="primary"
              textColor="primary"
            >
              <Tab label="Покупатель" />
              <Tab label="Поставщик" />
            </Tabs>
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
                // margin="normal"
              />
            </div>
            <div className={styles.inputs}>
              <MaterialIcon style={{ margin: '30px 15px 0 0' }}>
                lock_outline
              </MaterialIcon>
              <TextField
                name="password"
                // className={classes.textField}
                fullWidth
                type="password"
                value={values.password}
                onChange={handleChange}
                label="Пароль"
                // onBlur={handleBlur}
                helperText={errors.password}
                error={errors.password}
                // margin="normal"
              />
            </div>
            <div className={styles.inputs}>
              <MaterialIcon style={{ margin: '30px 15px 0 0' }}>
                lock_outline
              </MaterialIcon>
              <TextField
                label="Повторите пароль"
                name="confirmPassword"
                type="password"
                fullWidth
                // className={classes.textField}
                value={values.confirmPassword}
                onChange={handleChange}
                // onBlur={handleBlur}
                helperText={errors.confirmPassword}
                error={errors.confirmPassword}
                // margin="normal"
              />
            </div>
            <div className={styles.inputs}>
              <MaterialIcon style={{ margin: '30px 15px 0 0' }}>
                phone
              </MaterialIcon>
              <TextField
                label="Ваш телефон"
                name="phone"
                fullWidth
                // className={classes.textField}
                value={values.phone}
                onChange={handleChange}
                // onBlur={handleBlur}
                helperText={errors.phone}
                error={errors.phone}
                // margin="normal"
              />
            </div>
          </div>
          <div className={styles.forgot}>
            <MyButton
              title="Забыли пароль?"
              component={prop => <Link {...prop} />}
              to="/auth/reset_password"
              // className={classes.forget}
              // size="small"
            ></MyButton>
          </div>
          <div className={styles.inputs}>
            <MyButton
              title="РЕГИСТРАЦИЯ"
              fullWidth
              type="submit"
              myvariant="green"
            ></MyButton>
          </div>
          {/* <div className={styles.pan}>Нет аккаунта?</div> */}
          <div className={styles.inputs}>
            <MyButton
              title="Войти"
              component={val => <Link {...val} />}
              to="/auth/login"
              fullWidth
            ></MyButton>
          </div>
          <ConfirmRegistration
            open={confirmState}
            handleClose={handleCloseConfirm}
          />
        </form>
      )}
    </Formik>
  );
  // }
};

// const WrappedNormalRegistrationForm = Form.create()(Registration);

export default Registration;

{
  /* <Form onSubmit={this.handleSubmit} className={styles.Form}>
          <h3 className={styles.title}>Регистрация</h3>

          <div className={styles.selectedRole}>
            <RadioGroup onChange={this.onChange} defaultValue="CONTRACTOR">
              <RadioButton
                style={{ border: '1px solid orange' }}
                value="CONTRACTOR"
              >
                Поставщик
              </RadioButton>
              <RadioButton
                style={{ border: '1px solid orange' }}
                value="PARTNER"
              >
                Партнер
              </RadioButton>
            </RadioGroup>
          </div> */
}
