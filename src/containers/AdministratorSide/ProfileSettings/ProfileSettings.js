import React, { Component, Fragment } from 'react';
import { Table, Checkbox, Form, Input } from 'antd';
import styles from './ProfileSettings.module.css';
import defaultAvatar from '../../../img/avatar.png';
import Dropzone from 'react-dropzone';
import { Modal, notification, Tooltip } from 'antd';
import { TextField, Button, Tabs, Tab, Grid } from '@material-ui/core';
import MyButton from '../components/Buttons/Button';
import {
  getProfile,
  updateProfile,
  changePassword
} from '../../../actions/userActions';
import { connect } from 'react-redux';
import { Paper } from '@material-ui/core';
import { TabPanel, a11yProps } from '../components/Tabs/Tabs';
import ResetPassword from './ResetPassword';

const CheckboxGroup = Checkbox.Group;

const columns = [
  {
    title: 'Имя',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id'
  },
  {
    title: 'Прибыль',
    dataIndex: 'profit',
    key: 'profit'
  },
  {
    title: 'Дата регистрации',
    dataIndex: 'registrationDate',
    key: 'registrationDate'
  }
];

const emailOptions = [
  { label: 'О новом заказе', value: 'newOrder' },
  { label: 'Об изменении статуса ТТН', value: 'ttnChange' },
  { label: 'О получении счета на оплату', value: 'orderPaid' },
  { label: 'О получении отчета о продажах', value: 'salesReport' },
  { label: 'О новом сообщении внутренней почты', value: 'newMessage' },
  { label: 'Об отмене заказа', value: 'cancelOrder' }
];
// const smsOptions = [
//     {label: 'О новом заказе', value: 'newOrder'},
// ];

class ProfileSettings extends Component {
  state = {
    value: 0,
    firstName: '',
    lastName: '',
    patronymic: '',
    email: '',
    webSite: '',
    phone: '',
    organizationalLegalFormOfTheCompany: '',
    organization: '',
    edpnou: '',
    vatPayerCertificate: '',
    bankName: '',
    mfi: '',
    checkingAccount: '',
    tokenProm: '',

    avatarImage: '',
    updateImage: false,
    emailNotifications: [],
    phoneNotifications: [],
    visibleModal: false
  };

  handleCancel = e => {
    this.setState({
      visibleModal: false
    });
  };

  handleChangeInput = ({ target: { name, value } }) => {
    this.setState({
      [name]: value
    });
  };

  handleChangeCheckbox = (e, type) => {
    this.setState({
      [`${type}Notifications`]: e
    });
  };

  onDrop = file => {
    this.getBase64(file[0], result => {
      this.setState({
        avatarImage: result,
        updateImage: true
      });
    });
  };

  getBase64(file, cb) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      cb(reader.result);
    };
    reader.onerror = function (error) {
      throw Error('Error: ', error);
    };
  }

  handleSaveProfile = async e => {
    e.preventDefault();

    let requestData = this.state;

    let emailNot = {},
      smsNot = {};

    this.state.emailNotifications.forEach(item => {
      emailNot[item] = true;
    });
    this.state.phoneNotifications.forEach(item => {
      smsNot[item] = true;
    });

    if (!this.state.updateImage) delete requestData.avatarImage;

    await this.props
      .updateProfile({
        ...requestData,
        emailNotifications: emailNot,
        phoneNotifications: smsNot
      })
      .then(() =>
        notification.success({
          message: 'Сохранено'
        })
      );
  };

  handleUpdatePassword = async user => {
    changePassword(user).then(() => {
      this.setState({
        visibleModal: false
      });
    });
  };

  async componentDidMount() {
    const res = await getProfile();

    let emailNot = [],
      smsNot = [];

    for (let key in res.emailNotifications) {
      if (res.emailNotifications[key] === true) {
        emailNot.push(key);
      }
    }

    for (let key in res.phoneNotifications) {
      if (res.phoneNotifications[key] === true) {
        smsNot.push(key);
      }
    }

    this.setState({
      ...res,
      emailNotifications: emailNot,
      phoneNotifications: smsNot
    });
  }
  //   const [value, setValue] = React.useState(0);

  handleChange = (event, newValue) => {
    this.setState({ value: newValue });
  };

  render() {
    const {
      firstName,
      lastName,
      patronymic,
      email,
      visibleModal,
      emailNotifications,
      // phoneNotifications,
      avatarImage,
      webSite,
      phone,
      rozetkaUsername,
      rozetkaPassword,
      tokenProm,
      organizationalLegalFormOfTheCompany,
      organization,
      edpnou,
      vatPayerCertificate,
      bankName,
      mfi,
      checkingAccount,
      value
    } = this.state;

    return (
      //   <div>
      <Fragment>
        <Tabs
          value={value}
          indicatorColor="primary"
          textColor="primary"
          onChange={this.handleChange}
        >
          <Tab label="Данныe пользователя" {...a11yProps(0)} />
          {/* <Tab label="Реферальная программа" {...a11yProps(1)} /> */}
        </Tabs>
        <TabPanel value={value} index={0}>
          <Paper className={styles.paper}>
            <form
              className={styles.userMainInfo}
              onSubmit={this.handleSaveProfile}
            >
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <div className={styles.userInfo}>
                    <div className={styles.ChangeAvatar}>
                      <div className={styles.userAvatar}>
                        {avatarImage ? (
                          <img
                            src={avatarImage ? avatarImage : defaultAvatar}
                            alt=""
                          />
                        ) : (
                            <div className={styles.defaultAva}>
                              {firstName && <div>{firstName[0]}</div>}
                              {lastName && <div>{lastName[0]}</div>}
                            </div>
                          )}

                        <Dropzone
                          onDrop={this.onDrop}
                          accept=".png, .svg, .jpg, .jpeg"
                          multiple={false}
                          ref={this.dropzoneRef}
                        >
                          {({ getRootProps, getInputProps }) => (
                            <div
                              {...getRootProps({ className: styles.dropzone })}
                            >
                              <input
                                {...getInputProps()}
                                multiple
                                accept="image/*"
                                id="contained-button-file"
                              />
                              <label htmlFor="contained-button-file">
                                <Button
                                  className={styles.button}
                                >
                                  Загрузить Аватар
                                </Button>
                              </label>
                              {/* <button className={styles.uploadBtn}>
                              <Icon type="camera" />
                            </button> */}
                            </div>
                          )}
                        </Dropzone>
                      </div>
                      <div className={styles.userAvatarInfo}>
                        <h3>Изменить аватар</h3>
                        <span>
                          Размер аватара должен быть не меньше 150х150 пикселей
                        </span>

                        <MyButton
                          myvariant="green"
                          title=" ИЗМЕНИТЬ ПАРОЛЬ"
                          fullWidth
                          onClick={() => this.setState({ visibleModal: true })}
                        />
                      </div>
                    </div>

                    <div className={styles.EmailNotifications}>
                      <h3>Уведомления на E-mail</h3>

                      <Tooltip title="">
                        <CheckboxGroup
                          options={emailOptions}
                          value={emailNotifications}
                          onChange={e => this.handleChangeCheckbox(e, 'email')}
                        />
                      </Tooltip>
                    </div>
                    <MyButton
                      style={{ marginLeft: 'auto', width: 200 }}
                      myvariant="green"
                      title="СОХРАНИТЬ"
                      onClick={this.handleSaveProfile}
                    />
                  </div>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <h2 className={styles.title}>Личные данные</h2>
                  <div>
                    <TextField
                      id="standard-required"
                      label="Имя"
                      name="firstName"
                      value={firstName || ''}
                      onChange={this.handleChangeInput}
                      margin="normal"
                      fullWidth
                    />
                  </div>
                  <div>
                    <TextField
                      id="standard-required"
                      label="Фамилия"
                      name="lastName"
                      value={lastName || ''}
                      onChange={this.handleChangeInput}
                      margin="normal"
                      fullWidth
                    />
                  </div>
                  <div>
                    <TextField
                      id="standard-required"
                      label="Отчество"
                      name="patronymic"
                      value={patronymic || ''}
                      onChange={this.handleChangeInput}
                      margin="normal"
                      fullWidth
                    />
                  </div>
                  <div>
                    <TextField
                      type="email"
                      id="standard-required"
                      label="E-mail"
                      name="email"
                      value={email || ''}
                      onChange={this.handleChangeInput}
                      margin="normal"
                      fullWidth
                    />
                  </div>
                  <div>
                    <TextField
                      type="tel"
                      id="standard-required"
                      label="Телефон"
                      name="phone"
                      value={phone || ''}
                      onChange={this.handleChangeInput}
                      margin="normal"
                      fullWidth
                    />
                  </div>
                  <div>
                    <TextField
                      type="text"
                      id="standard-required"
                      label="Веб-сайт"
                      name="webSite"
                      value={webSite || ''}
                      placeholder="https://example.com.ua"
                      onChange={this.handleChangeInput}
                      margin="normal"
                      fullWidth
                    />
                  </div>

                  <div>
                    <TextField
                      type="password"
                      id="standard-required"
                      label="Аккаунт Rozetka"
                      name="rozetkaUsername"
                      value={rozetkaUsername || ''}
                      onChange={this.handleChangeInput}
                      margin="normal"
                      fullWidth
                    />
                  </div>
                  <div>
                    <TextField
                      type="password"
                      id="standard-required"
                      label="Пароль Rozetka"
                      name="rozetkaPassword"
                      value={rozetkaPassword || ''}
                      onChange={this.handleChangeInput}
                      // defaultValue={firstName}
                      // className={classes.textField}
                      margin="normal"
                      fullWidth
                    />
                  </div>
                  <div>
                    <TextField
                      type="password"
                      id="standard-required"
                      label="Токен Prom.ua"
                      name="tokenProm"
                      value={tokenProm || ''}
                      onChange={this.handleChangeInput}
                      margin="normal"
                      fullWidth
                    />
                  </div>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <h2 className={styles.title}>Юридические данные</h2>

                  <div>
                    <TextField
                      type="text"
                      id="standard-required"
                      label="Организационно-правовая форма предприятия"
                      name="organizationalLegalFormOfTheCompany"
                      value={organizationalLegalFormOfTheCompany || ''}
                      onChange={this.handleChangeInput}
                      margin="normal"
                      fullWidth
                    />
                  </div>
                  <div>
                    <TextField
                      type="text"
                      id="standard-required"
                      label="Организация"
                      name="organization"
                      value={organization || ''}
                      onChange={this.handleChangeInput}
                      margin="normal"
                      fullWidth
                    />
                  </div>
                  <div>
                    <TextField
                      type="text"
                      id="standard-required"
                      label="ЕДРПОУ"
                      name="edpnou"
                      value={edpnou || ''}
                      onChange={this.handleChangeInput}
                      margin="normal"
                      fullWidth
                    />
                  </div>
                  <div>
                    <TextField
                      type="text"
                      id="standard-required"
                      label="Свидетельства плательщика НДС"
                      name="vatPayerCertificate"
                      value={vatPayerCertificate || ''}
                      onChange={this.handleChangeInput}
                      margin="normal"
                      fullWidth
                    />
                  </div>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <h2 className={styles.title}>Платежная информация</h2>

                  <div>
                    <TextField
                      type="text"
                      id="standard-required"
                      label="Название банка"
                      name="bankName"
                      value={bankName || ''}
                      onChange={this.handleChangeInput}
                      margin="normal"
                      fullWidth
                    />
                  </div>
                  <div>
                    <TextField
                      type="text"
                      id="standard-required"
                      label="МФО"
                      name="mfi"
                      value={mfi || ''}
                      onChange={this.handleChangeInput}
                      margin="normal"
                      fullWidth
                    />
                  </div>
                  <div>
                    <TextField
                      type="text"
                      id="standard-required"
                      label="Рассчетный счет"
                      name="checkingAccount"
                      value={checkingAccount || ''}
                      onChange={this.handleChangeInput}
                      margin="normal"
                      fullWidth
                    />
                  </div>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Paper className={styles.paper}>
            <div className={styles.referralProgram}>
              <h5>Реферальная ссылка</h5>
              <div className={styles.copyLink}>
                <input type="text" value={''} disabled />
                <span>
                  Отправьте ссылку вашим знакомым. После прохождения регистрации
                  по этой ссылке новый пользователь станет вашим рефералом
                </span>
              </div>

              <div className={styles.table}>
                <Table columns={columns} />
              </div>
            </div>
          </Paper>
        </TabPanel>
        <Modal
          title="Изменение пароля"
          visible={visibleModal}
          onCancel={this.handleCancel}
          footer={false}
        >
          <ResetPassword handleUpdatePassword={this.handleUpdatePassword} />
        </Modal>
      </Fragment>
      //   </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  updateProfile: user => dispatch(updateProfile(user))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileSettings);
