import React, { Component } from 'react';
import { Form } from 'antd';
import styles from './CompanySettings.module.css';
import {
  getCompanyPitch,
  updateCompanyPitch
} from '../../../actions/companyActions';
import { notification } from 'antd';
import { TextField } from '@material-ui/core';
import MyButton from '../components/Buttons/Button';

class CompanyPitch extends Component {
  state = {
    whoAreYou: '',
    guru: '',
    forWhom: '',
    difference: '',
    goodPartner: '',
    future: ''
  };

  handleChangeInput = ({ target: { name, value } }) => {
    this.setState({
      [name]: value
    });
  };

  handleUpdateCompanyPitch = e => {
    e.preventDefault();

    updateCompanyPitch(this.state).then(() =>
      notification.success({
        message: 'Сохранено'
      })
    );
  };

  async componentDidMount() {
    const res = await getCompanyPitch();

    this.setState(res);
  }

  render() {
    const {
      whoAreYou,
      guru,
      forWhom,
      difference,
      goodPartner,
      future
    } = this.state;

    return (
      <Form
        onSubmit={this.handleUpdateCompanyPitch}
        className={`${styles.pitch}`}
      >
        <h2 className={styles.title}>Коротко о комании</h2>
        <div className={styles.pitchcontrols}>
          <TextField
            id="outlined-read-only-input"
            label="Кто вы?"
            name="whoAreYou"
            margin="normal"
            value={whoAreYou || ''}
            onChange={this.handleChangeInput}
          />

          <TextField
            id="outlined-read-only-input"
            label="В чем вы Гуру?"
            name="guru"
            margin="normal"
            value={guru || ''}
            onChange={this.handleChangeInput}
          />

          <TextField
            id="outlined-read-only-input"
            label="Для кого работает ваша компания?"
            name="forWhom"
            margin="normal"
            value={forWhom || ''}
            onChange={this.handleChangeInput}
          />

          <TextField
            id="outlined-read-only-input"
            label="Чем отличаетесь от конкурентов?"
            name="difference"
            margin="normal"
            value={difference || ''}
            onChange={this.handleChangeInput}
          />

          <TextField
            id="outlined-read-only-input"
            label="Мы классные партнеры, потому что:"
            name="goodPartner"
            margin="normal"
            value={goodPartner || ''}
            onChange={this.handleChangeInput}
          />
          <TextField
            id="outlined-read-only-input"
            label="Какой будет ваша компания через 5 лет?"
            name="future"
            margin="normal"
            value={future || ''}
            onChange={this.handleChangeInput}
          />

          <MyButton
            title="Сохранить"
            type="submit"
            myvariant="green"
            className={styles.loginFormButton}
          />
        </div>
      </Form>
    );
  }
}

export default CompanyPitch;
