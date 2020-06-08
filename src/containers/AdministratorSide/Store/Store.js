import React, { Component } from 'react';
import 'antd/dist/antd.css';
import styles from './Store.module.css';
import nike from '../../../img/nike.jpg';
import { Button } from 'antd';
import { updateStore, getMyStore } from '../../../actions/storeActions';
import Dropzone from 'react-dropzone';

class Store extends Component {
  state = {
    headerPhonesNumber: [],
    footerPhonesNumber: [],
    domainName: '',
    instagram: '',
    facebook: '',
    linkedin: '',
    domainSubdomain: 'SDM',
    updateImage: false
  };

  handleChangeInput = name => ({ target: { value } }) => {
    if (name === 'headerPhonesNumber' || name === 'footerPhonesNumber') {
      this.setState({
        [name]: [{ number: value }]
      });
    } else {
      this.setState({
        [name]: value
      });
    }
  };

  getStorInfo = async () => {
    const res = await getMyStore();
    console.log('res',res)
    this.setState(res);
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
    reader.onload = function() {
      cb(reader.result);
    };
    reader.onerror = function(error) {
      throw Error('Error: ', error);
    };
  }

  handleSave = async e => {
    e.preventDefault();

    let newStore = { ...this.state };

    newStore.domainSubdomain = 'SDM';

    if (!this.state.updateImage) {
      delete newStore.logoDecoded;
    }

    await updateStore(newStore);

    this.setState({
      updateImage: false
    });
  };

  componentDidMount() {
    this.getStorInfo();
  }

  render() {
    const {
      headerPhonesNumber,
      footerPhonesNumber,
      domainName,
      instagram,
      facebook,
      linkedin,
      logoDecoded
    } = this.state;
    return (
      <div className="page">
        <h3 className="page-title">Управление интернет магазином</h3>

        <form className="page-content" onSubmit={this.handleSave}>
          <div className={styles.domen}>
            <div>
              {/*<div className={styles.inputsGroup}>*/}
              {/*<label>Домен или поддомен</label>*/}
              {/*<select>*/}
              {/*<option>Домен</option>*/}
              {/*<option>Поддомен</option>*/}
              {/*</select>*/}
              {/*</div>*/}
              <div>
                <label>Имя поддомена</label>
                <input
                  type="text"
                  value={domainName}
                  onChange={this.handleChangeInput('domainName')}
                />
              </div>
            </div>
            {/*<div className={styles.radioBtns}>*/}
            {/*<div className={styles.radio}>*/}
            {/*<input type="radio" id="radio01" name="radio"/>*/}
            {/*<label htmlFor="radio01">Топ продаж</label>*/}
            {/*</div>*/}
            {/*<div className={styles.radio}>*/}
            {/*<input type="radio" id="radio02" name="radio"/>*/}
            {/*<label htmlFor="radio02">Без товара</label>*/}
            {/*</div>*/}
            {/*</div>*/}
          </div>

          <h4 className={styles.formTitle}>Информация в «Хэдере»</h4>
          <div className={styles.headerInfo}>
            <div>
              <div className={styles.input}>
                <label>Номер телефона 1 (до 6 включительно)</label>
                <input
                  type="tel"
                  placeholder="+38 (096) 933 - 45 - 43"
                  value={
                    headerPhonesNumber.length > 0
                      ? headerPhonesNumber[0].number
                      : ''
                  }
                  onChange={this.handleChangeInput('headerPhonesNumber')}
                />
                {/*<button className={styles.add} onClick={this.add}>+</button>*/}
              </div>

              {/*<div className={styles.input}>*/}
              {/*<label>Раздел навигации 1 (до 6 включительно)</label>*/}
              {/*<input type="text" placeholder="Доставка и оплата"/>*/}
              {/*/!*<button className={styles.add} onClick={this.add}>+</button>*!/*/}
              {/*</div>*/}

              {/*<div className={styles.input}>*/}
              {/*<label>Функция Call-back</label>*/}
              {/*<select>*/}
              {/*<option>Включена</option>*/}
              {/*<option>выключена</option>*/}
              {/*</select>*/}
              {/*</div>*/}
            </div>

            <div className={styles.logo}>
              <div className={styles.logoImg}>
                <img src={logoDecoded ? logoDecoded : nike} alt="nike" />
              </div>
              <div className={styles.logoInfo}>
                <h4 className={styles.formTitle}>Логотип</h4>
                <p>Логотип должен быть в формате: JPEG,SVG,PNG</p>

                <Dropzone onDrop={this.onDrop} accept=".png, .svg, .jpg, .jpeg">
                  {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps({ className: 'dropzone' })}>
                      <input {...getInputProps()} />
                      <Button style={{ width: 250, height: 40, color: '#fff' }}>
                        Загрузить логотип
                      </Button>
                    </div>
                  )}
                </Dropzone>
              </div>
            </div>
          </div>

          <h4 className={styles.formTitle}>Информация в «Футере»</h4>

          <div className={styles.footerInfo}>
            <div className={styles.input}>
              <label>Номер телефона 1 (до 6 включительно)</label>
              <input
                type="tel"
                placeholder="+38 (096) 933 - 45 - 43"
                value={
                  footerPhonesNumber.length > 0
                    ? footerPhonesNumber[0].number
                    : ''
                }
                onChange={this.handleChangeInput('footerPhonesNumber')}
              />
              {/*<button className={styles.add} onClick={this.add}>+</button>*/}
            </div>

            {/*<div className={styles.input}>*/}
            {/*<label>Раздел навигации 1 (до 6 включительно)</label>*/}
            {/*<input type="text" placeholder="Доставка и оплата"/>*/}
            {/*/!*<button className={styles.add} onClick={this.add}>+</button>*!/*/}
            {/*</div>*/}

            <div className={styles.input}>
              <label>Facebook</label>
              <input
                type="text"
                value={facebook}
                onChange={this.handleChangeInput('facebook')}
              />
            </div>
            <div className={styles.input}>
              <label>Instagram</label>
              <input
                type="text"
                value={instagram}
                onChange={this.handleChangeInput('instagram')}
              />
            </div>
            <div className={styles.input}>
              <label>Linkedin</label>
              <input
                type="text"
                value={linkedin}
                onChange={this.handleChangeInput('linkedin')}
              />
            </div>
          </div>

          {/*<h4 className={styles.formTitle}>Выберите дизайн-шаблон</h4>*/}
          {/*<div className={styles.choiceDesign}>*/}
          {/*<label>*/}
          {/*<input type="radio" name="template" value="blue"/>*/}
          {/*<img src={nike}/>*/}
          {/*</label>*/}
          {/*<label>*/}
          {/*<input type="radio" name="template" value="pink"/>*/}
          {/*<img src={nike}/>*/}
          {/*</label>*/}
          {/*<label>*/}
          {/*<input type="radio" name="template" value="purple"/>*/}
          {/*<img src={nike}/>*/}
          {/*</label>*/}
          {/*<label>*/}
          {/*<input type="radio" name="template" value="orange"/>*/}
          {/*<img src={nike}/>*/}
          {/*</label>*/}

          {/*</div>*/}
          <Button style={{ width: 250, height: 40, color: '#fff' }}>
            Создать
          </Button>
        </form>
      </div>
    );
  }
}

export default Store;
