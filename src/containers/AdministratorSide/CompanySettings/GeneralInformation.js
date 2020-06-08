import React, { Component } from 'react';
import styles from './CompanySettings.module.css';
import {
  getProfile,
  updateProfile,
  getSelectParams
} from '../../../actions/companyActions';
import { notification } from 'antd/lib/index';
import nike from '../../../img/defaultimage.png';
import Dropzone from 'react-dropzone';
import { TextField } from '@material-ui/core';
import MyButton from '../components/Buttons/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import MyCheckbox from '../components/Checkboxes/Checkboxes';

class GeneralInformation extends Component {
  state = {
    aboutCompany: '',
    address: '',
    dealer: false,
    distributor: false,
    email: '',
    exporter: false,
    importer: false,
    isInternetShop: false,
    isOfflineShop: false,
    manufacturer: false,
    name: '',
    officialRepresentative: false,
    phone: '',
    retailNetwork: false,
    subDealer: false,
    town: '',
    logoDecoded: '',
    url: '',
    whoSeeContact: '',
    workingConditions: '',
    updateImage: false
  };

  handleUpdateCompanyProfile = e => {
    e.preventDefault();

    let letNewState = { ...this.state };
    delete letNewState.activityArea;
    delete letNewState.companyType;
    delete letNewState.serviceIndustry;

    if (!this.state.updateImage) {
      delete letNewState.logoDecoded;
    }
    updateProfile(letNewState).then(data => {
      notification.success({
        message: 'Сохранено'
      });
      this.setState({
        updateImage: false
      });
    });
  };

  onDrop = file => {
    this.getBase64(file[0], result => {
      this.setState({
        logoDecoded: result,
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

  handleChangeInput = ({ target: { name, value } }) => {
    this.setState({
      [name]: value
    });
  };

  handleChangeCheckbox = value => event => {
    this.setState({
      [value]: event.target.checked
    });
  };

  handleChangeSelect = (value, name) => {
    this.setState({
      [name]: value
    });
  };

  async componentDidMount() {
    const [
      profile,
      companyType,
      activityArea,
      serviceIndustry
    ] = await Promise.all([getProfile(), ...getSelectParams()]);

    this.setState({
      ...profile,
      companyTypeOptions: companyType.results,
      activityAreaOptions: activityArea.results,
      serviceIndustryOptions: serviceIndustry.results
    });
  }

  render() {
    const {
      name,
      town,
      email,
      phone,
      // whoSeeContact,
      address,
      url,
      workingConditions,
      isInternetShop,
      isOfflineShop,
      retailNetwork,
      distributor,
      manufacturer,
      importer,
      dealer,
      subDealer,
      exporter,
      officialRepresentative,
      logoDecoded

      // activityAreaOptions = [],
      // companyTypeOptions = [],
      // serviceIndustryOptions = []
    } = this.state;

    return (
      <form
        onSubmit={this.handleUpdateCompanyProfile}
        className={styles.settingsForm}
      >
        <div className={styles.firstColumn}>
          <div className="section-title">
            <h3 className={styles.title}>Общая информация</h3>
            <span className={styles.sectionDescription}>
              Эта информация нужна для начала работ. Ее будут видеть другие
              участники системы.
            </span>
          </div>
          <TextField
            label="Название компании"
            name="name"
            type="text"
            value={name || ''}
            onChange={this.handleChangeInput}
            fullWidth
            margin="normal"
          />

          <TextField
            label="Город (территориальное размещение)"
            name="town"
            type="text"
            value={town || ''}
            onChange={this.handleChangeInput}
            fullWidth
            margin="normal"
          />

          <TextField
            label="Адрес"
            name="address"
            type="text"
            value={address || ''}
            onChange={this.handleChangeInput}
            fullWidth
            margin="normal"
          />
          <TextField
            label="URL"
            name="url"
            type="text"
            value={url || ''}
            onChange={this.handleChangeInput}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Условия работы"
            name="workingConditions"
            type="text"
            value={workingConditions || ''}
            onChange={this.handleChangeInput}
            fullWidth
            margin="normal"
          />

          <div className={`${styles.CheckboxGroup} ${styles.type}`}>
            <h3 className={styles.typeTitle}>
              Тип деятельности для розничной торговли:
            </h3>
            <MyCheckbox
              handleChange={this.handleChangeCheckbox('isInternetShop')}
              value={isInternetShop}
              label="Интернет-магазин"
            />
            <MyCheckbox
              handleChange={this.handleChangeCheckbox('isOfflineShop')}
              value={isOfflineShop}
              label="Оффлайн-магазин"
            />
            <MyCheckbox
              handleChange={this.handleChangeCheckbox('retailNetwork')}
              value={retailNetwork}
              label="Розничная сеть"
            />
          </div>

          <div className={`${styles.CheckboxGroup} ${styles.type}`}>
            <h3 className={styles.typeTitle}>
              Тип деятельности для оптовой торговли:
            </h3>
            <MyCheckbox
              handleChange={this.handleChangeCheckbox('distributor')}
              value={distributor}
              label="Дистрибьютор"
            />
            <MyCheckbox
              handleChange={this.handleChangeCheckbox('manufacturer')}
              value={manufacturer}
              label="Производитель"
            />
            <MyCheckbox
              handleChange={this.handleChangeCheckbox('importer')}
              value={importer}
              label="Импортер"
            />
            <MyCheckbox
              handleChange={this.handleChangeCheckbox('dealer')}
              value={dealer}
              label="Дилер"
            />
            <MyCheckbox
              handleChange={this.handleChangeCheckbox('subDealer')}
              value={subDealer}
              label="Субдилер"
            />
            <MyCheckbox
              handleChange={this.handleChangeCheckbox('exporter')}
              value={exporter}
              label="Экспортер"
            />
            <MyCheckbox
              handleChange={this.handleChangeCheckbox('officialRepresentative')}
              value={officialRepresentative}
              label="Официальный представитель"
            />
          </div>
        </div>

        <div className={styles.secondColumn}>
          <div>
            <div className={styles.logo}>
              <div className={styles.logoImg}>
                <img src={logoDecoded ? logoDecoded : nike} alt="nike" />
              </div>
              <div className={styles.logoInfo}>
                <h3 className={styles.title}>Логотип</h3>
                <p>Логотип должен быть в формате: JPEG,SVG,PNG</p>

                <Dropzone onDrop={this.onDrop} accept=".png, .svg, .jpg, .jpeg">
                  {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps({ className: 'dropzone' })}>
                      <input {...getInputProps()} />
                      <MyButton
                        title="Загрузить логотип"
                        myvariant="green"
                        startIcon={<CloudUploadIcon />}
                        fullWidth
                      />
                    </div>
                  )}
                </Dropzone>
              </div>
            </div>

            <div className="section-title">
              <h3 className={styles.title}>Контактные данные</h3>
            </div>
            <TextField
              label="Телефон"
              name="phone"
              type="text"
              value={phone || ''}
              onChange={this.handleChangeInput}
              fullWidth
              margin="normal"
            />
            <TextField
              label="E-mail"
              name="email"
              type="text"
              value={email || ''}
              onChange={this.handleChangeInput}
              fullWidth
              margin="normal"
            />
          </div>

          <MyButton
            title="Сохранить"
            myvariant="green"
            type="submit"
            className={styles.loginFormButton}
          />
        </div>
      </form>
    );
  }
}

export default GeneralInformation;
