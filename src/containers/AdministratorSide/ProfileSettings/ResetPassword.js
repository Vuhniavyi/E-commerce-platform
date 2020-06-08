import React, { Component } from 'react';
import { FormControl, TextField, FormHelperText } from '@material-ui/core';
import { Formik, Form } from 'formik';
import styles from './ProfileSettings.module.css';
import MyButton from '../components/Buttons/Button';

export default class ResetPassword extends Component {
  validation = values => {
    let errors = {};
    if (!values.oldPassword) {
      errors.oldPassword = 'Заполните все поля';
    }
    if (!values.newPassword) {
      errors.newPassword = 'Заполните все поля';
    }
    if (!values.confirmPassword) {
      errors.confirmPassword = 'Заполните все поля';
    }
    if (values.newPassword !== values.confirmPassword) {
      errors.confirmPassword = 'Пароли не совпадают';
      errors.newPassword = 'Пароли не совпадают';
    }

    return errors;
  };
  handleSubmit = (values, { setErrors, validateForm }) => {
    this.props.handleUpdatePassword(values);
  };
  render() {
    return (
      <Formik
        initialValues={{
          oldPassword: '',
          newPassword: '',
          confirmPassword: ''
        }}
        validate={this.validation}
        onSubmit={this.handleSubmit}
      >
        {({
          values,
          errors,
          handleChange,
          handleSubmit,
          validateForm
          /* and other goodies */
        }) => (
          <Form>
            <FormControl fullWidth margin="normal">
              <TextField
                label="Старый пароль"
                type="password"
                name="oldPassword"
                onChange={handleChange}
                fullWidth
                value={values.password}
                error={!!errors.oldPassword}
              />
              {errors.oldPassword && (
                <FormHelperText error>{errors.oldPassword}.</FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth margin="normal">
              <TextField
                label="Новый пароль"
                type="password"
                name="newPassword"
                onChange={handleChange}
                fullWidth
                value={values.newPassword}
                error={!!errors.newPassword}
              />
              {errors.newPassword && (
                <FormHelperText error>{errors.newPassword}.</FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth margin="normal">
              <TextField
                label="Подтвердите пароль"
                type="password"
                name="confirmPassword"
                onChange={handleChange}
                fullWidth
                value={values.confirmPassword}
                error={!!errors.confirmPassword}
              />
              {errors.confirmPassword && (
                <FormHelperText error>{errors.confirmPassword}.</FormHelperText>
              )}
            </FormControl>
            <MyButton
              title="Сохранить"
              myvariant="green"
              type="submit"
              className={styles.loginFormButton}
            />
          </Form>
        )}
      </Formik>
    );
  }
}
