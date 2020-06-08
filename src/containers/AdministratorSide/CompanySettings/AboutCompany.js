import React, { Component } from 'react';
import { Form } from 'antd';
import styles from './CompanySettings.module.css';
import { getProfile, updateProfile } from '../../../actions/companyActions';
import { notification } from 'antd';
import { TextField } from '@material-ui/core';
import MyButton from '../components/Buttons/Button';
class AboutCompany extends Component {
  state = {
    aboutCompany: ''
  };

  handleUpdateCompanyProfile = e => {
    e.preventDefault();

    updateProfile({
      aboutCompany: this.state.aboutCompany
    }).then(() =>
      notification.success({
        message: 'Сохранено'
      })
    );
  };

  handleChangeInput = ({ target: { name, value } }) => {
    this.setState({
      [name]: value
    });
  };

  async componentDidMount() {
    const profile = await getProfile();

    this.setState({
      ...profile
    });
  }

  render() {
    const { aboutCompany } = this.state;

    return (
      <Form
        onSubmit={this.handleUpdateCompanyProfile}
        className={`${styles.companyPage}`}
      >
        <div className={styles.contentwrapper}>
          <TextField
            id="outlined-multiline-flexible"
            label="Информация, которая будет отображена на странице компании, по адресу https://gofriends.pro/ru/company-marketplace-nazar-inc"
            name="aboutCompany"
            multiline
            rows="6"
            value={aboutCompany || ''}
            onChange={this.handleChangeInput}
            margin="normal"
            variant="outlined"
            fullWidth
          />

          <MyButton
            myvariant="green"
            className={styles.btn}
            type="submit"
            title="Сохранить"
          />
        </div>
      </Form>
    );
  }
}

export default AboutCompany;
